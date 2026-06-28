import type { AwardFlightResult, FlightSegment } from '@/types/flight'
import { enrichAwardResults } from '@/lib/flightRanker'
import type { MileageProgram } from '@/types/mileage'

const BASE_URL = 'https://seats.aero/partnerapi'

export interface SeatsaeroSearchParams {
  originAirport: string
  destinationAirport: string
  departureDate: string
  source: string
  seatCount: number
}

interface SeatsaeroAvailability {
  ID?: string
  Route?: {
    OriginAirport?: string
    DestinationAirport?: string
  }
  Date?: string
  Source?: string
  YMileageCost?: number
  WMileageCost?: number
  JMileageCost?: number
  FMileageCost?: number
  YAvailable?: boolean
  WAvailable?: boolean
  JAvailable?: boolean
  FAvailable?: boolean
  Trips?: SeatsaeroTrip[]
}

interface SeatsaeroTrip {
  ID?: string
  AvailabilityTrips?: SeatsaeroSegment[]
}

interface SeatsaeroSegment {
  OriginAirport?: string
  DestinationAirport?: string
  DepartureDateTime?: string
  ArrivalDateTime?: string
  FlightNumber?: string
  Carrier?: string
  Duration?: number
}

export async function searchAwardFlights(
  params: SeatsaeroSearchParams,
  userPrograms: MileageProgram[]
): Promise<AwardFlightResult[]> {
  const apiKey = import.meta.env.VITE_SEATSAERO_API_KEY
  if (!apiKey) {
    console.warn('seats.aero API key not configured')
    return []
  }

  try {
    const response = await fetch(`${BASE_URL}/live`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Partner-Authorization': apiKey,
      },
      body: JSON.stringify({
        origin_airport: params.originAirport,
        destination_airport: params.destinationAirport,
        departure_date: params.departureDate,
        source: params.source,
        seat_count: params.seatCount,
      }),
    })

    if (response.status === 429) {
      throw new Error('seats.aero daily rate limit reached')
    }

    if (!response.ok) {
      throw new Error(`seats.aero API error: ${response.status}`)
    }

    const data = await response.json()
    const availabilities: SeatsaeroAvailability[] = data?.data ?? data ?? []

    const rawResults = availabilities.flatMap((avail) => {
      const results = []
      const cabins: Array<{ key: 'Y' | 'W' | 'J' | 'F'; label: string; costKey: keyof SeatsaeroAvailability; availKey: keyof SeatsaeroAvailability }> = [
        { key: 'Y', label: 'economy', costKey: 'YMileageCost', availKey: 'YAvailable' },
        { key: 'W', label: 'premium', costKey: 'WMileageCost', availKey: 'WAvailable' },
        { key: 'J', label: 'business', costKey: 'JMileageCost', availKey: 'JAvailable' },
        { key: 'F', label: 'first', costKey: 'FMileageCost', availKey: 'FAvailable' },
      ]

      for (const cabin of cabins) {
        const miles = avail[cabin.costKey] as number | undefined
        const available = avail[cabin.availKey] as boolean | undefined
        if (!available || !miles || miles <= 0) continue

        const segments = buildSegments(avail.Trips ?? [])
        const totalDuration = segments.reduce((sum, s) => sum + s.durationMinutes, 0)

        results.push({
          id: `${avail.ID ?? Math.random()}-${cabin.key}`,
          program: params.source,
          programLabel: getProgramLabel(params.source),
          milesRequired: miles,
          cabin: cabin.label,
          stops: Math.max(segments.length - 1, 0),
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

function buildSegments(trips: SeatsaeroTrip[]): FlightSegment[] {
  return trips.flatMap((trip) =>
    (trip.AvailabilityTrips ?? []).map((seg) => ({
      departureAirport: seg.OriginAirport ?? '',
      arrivalAirport: seg.DestinationAirport ?? '',
      departureTime: seg.DepartureDateTime ?? '',
      arrivalTime: seg.ArrivalDateTime ?? '',
      airline: seg.Carrier ?? '',
      flightNumber: seg.FlightNumber ?? '',
      durationMinutes: seg.Duration ?? 0,
    }))
  )
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
