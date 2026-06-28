import type { AwardFlightResult, FlightSegment } from '@/types/flight'
import { enrichAwardResults } from '@/lib/flightRanker'
import type { MileageProgram } from '@/types/mileage'

// Award flights are fetched through our Cloudflare Worker proxy (see /worker),
// which holds the seats.aero key server-side and adds CORS headers. The proxy
// calls seats.aero's CACHED search endpoint (Pro keys can't use /live, which
// requires a commercial agreement), so the response shape is the cached
// Availability record: mileage costs are strings, and per-cabin airline/direct
// fields live on the record itself rather than in nested trips.
const API_BASE = import.meta.env.VITE_API_BASE_URL

export interface SeatsaeroSearchParams {
  originAirport: string
  destinationAirport: string
  departureDate: string
  source: string
  seatCount: number
}

interface SeatsaeroAvailabilityTrip {
  OriginAirport?: string
  DestinationAirport?: string
  DepartureDateTime?: string
  ArrivalDateTime?: string
  FlightNumber?: string
  Carrier?: string
  TotalDuration?: number
}

// Cached availability record (subset of fields we use).
interface SeatsaeroAvailability {
  ID?: string
  Route?: { OriginAirport?: string; DestinationAirport?: string }
  Date?: string
  Source?: string
  AvailabilityTrips?: SeatsaeroAvailabilityTrip[]
  // per-cabin fields are read dynamically (e.g. YMileageCost, JAirlines); costs
  // come back as numeric strings like "55000".
  [key: string]: unknown
}

const CABINS: Array<{ key: 'Y' | 'W' | 'J' | 'F'; label: string }> = [
  { key: 'Y', label: 'economy' },
  { key: 'W', label: 'premium' },
  { key: 'J', label: 'business' },
  { key: 'F', label: 'first' },
]

export async function searchAwardFlights(
  params: SeatsaeroSearchParams,
  userPrograms: MileageProgram[]
): Promise<AwardFlightResult[]> {
  if (!API_BASE) {
    console.warn('VITE_API_BASE_URL not configured — cannot reach flight proxy')
    return []
  }

  try {
    const url = new URL(`${API_BASE}/api/flights/award`)
    url.searchParams.set('origin_airport', params.originAirport)
    url.searchParams.set('destination_airport', params.destinationAirport)
    url.searchParams.set('departure_date', params.departureDate)
    url.searchParams.set('source', params.source)

    const response = await fetch(url.toString())

    if (response.status === 429) {
      throw new Error('seats.aero daily rate limit reached')
    }
    if (!response.ok) {
      throw new Error(`seats.aero API error: ${response.status}`)
    }

    const data = await response.json()
    const availabilities: SeatsaeroAvailability[] = data?.data ?? []

    const rawResults = availabilities.flatMap((avail) => {
      const results = []

      for (const cabin of CABINS) {
        const available = avail[`${cabin.key}Available`] as boolean | undefined
        const miles = Number(avail[`${cabin.key}MileageCost`])
        if (!available || !miles || miles <= 0) continue

        const direct = avail[`${cabin.key}Direct`] as boolean | undefined
        const airlines = (avail[`${cabin.key}Airlines`] as string | undefined) ?? ''
        const segments = buildSegments(avail, airlines)
        const totalDuration = segments.reduce((sum, s) => sum + s.durationMinutes, 0)

        results.push({
          id: `${avail.ID ?? Math.random()}-${cabin.key}`,
          program: params.source,
          programLabel: getProgramLabel(params.source),
          milesRequired: miles,
          cabin: cabin.label,
          stops: direct ? 0 : Math.max(segments.length - 1, 1),
          totalDurationMinutes: totalDuration || 480,
          segments,
          rawData: avail as Record<string, unknown>,
        })
      }
      return results
    })

    return enrichAwardResults(rawResults, userPrograms)
  } catch (error) {
    console.error('seats.aero search error:', error)
    throw error
  }
}

// Cached search returns segment detail in AvailabilityTrips when present;
// otherwise we synthesize a single route-level segment so the card still shows
// the origin, destination and operating airline.
function buildSegments(avail: SeatsaeroAvailability, airlines: string): FlightSegment[] {
  const trips = avail.AvailabilityTrips ?? []
  if (trips.length > 0) {
    return trips.map((seg) => ({
      departureAirport: seg.OriginAirport ?? '',
      arrivalAirport: seg.DestinationAirport ?? '',
      departureTime: seg.DepartureDateTime ?? '',
      arrivalTime: seg.ArrivalDateTime ?? '',
      airline: seg.Carrier ?? '',
      flightNumber: seg.FlightNumber ?? '',
      durationMinutes: seg.TotalDuration ?? 0,
    }))
  }
  return [
    {
      departureAirport: avail.Route?.OriginAirport ?? '',
      arrivalAirport: avail.Route?.DestinationAirport ?? '',
      departureTime: '',
      arrivalTime: '',
      airline: airlines.split(',')[0]?.trim() ?? '',
      flightNumber: '',
      durationMinutes: 0,
    },
  ]
}

function getProgramLabel(source: string): string {
  const labels: Record<string, string> = {
    united: 'United MileagePlus',
    delta: 'Delta SkyMiles',
    american: 'American AAdvantage',
    alaska: 'Alaska Mileage Plan',
    southwest: 'Southwest Rapid Rewards',
    jetblue: 'JetBlue TrueBlue',
    aeroplan: 'Air Canada Aeroplan',
    ba: 'British Airways Avios',
    emirates: 'Emirates Skywards',
    flyingblue: 'Flying Blue',
    singapore: 'Singapore KrisFlyer',
    avianca: 'LifeMiles',
    turkish: 'Miles&Smiles',
    qantas: 'Qantas FF',
    virgin_atlantic: 'Virgin Atlantic',
  }
  return labels[source] ?? source
}
