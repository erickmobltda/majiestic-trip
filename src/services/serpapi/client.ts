import type { CashFlightResult, FlightSegment } from '@/types/flight'

// Cash flights are fetched through our Cloudflare Worker proxy (see /worker),
// which holds the SerpApi key server-side and adds CORS headers.
const API_BASE = import.meta.env.VITE_API_BASE_URL

export interface SerpApiSearchParams {
  departureId: string
  arrivalId: string
  outboundDate: string
  returnDate?: string
  type: 1 | 2
  adults: number
  children: number
  currency?: string
}

interface SerpApiFlightSegment {
  departure_airport?: { id?: string; time?: string }
  arrival_airport?: { id?: string; time?: string }
  duration?: number
  airline?: string
  airline_logo?: string
  flight_number?: string
}

interface SerpApiFlight {
  flights?: SerpApiFlightSegment[]
  total_duration?: number
  price?: number
  airline?: string
  airline_logo?: string
  booking_token?: string
  layovers?: Array<{ duration?: number }>
}

interface SerpApiResponse {
  best_flights?: SerpApiFlight[]
  other_flights?: SerpApiFlight[]
  error?: string
}

export async function searchCashFlights(
  params: SerpApiSearchParams
): Promise<CashFlightResult[]> {
  if (!API_BASE) {
    console.warn('VITE_API_BASE_URL not configured — cannot reach flight proxy')
    return []
  }

  const url = new URL(`${API_BASE}/api/flights/cash`)
  url.searchParams.set('departure_id', params.departureId)
  url.searchParams.set('arrival_id', params.arrivalId)
  url.searchParams.set('outbound_date', params.outboundDate)
  url.searchParams.set('type', String(params.type))
  url.searchParams.set('adults', String(params.adults))
  if (params.children > 0) url.searchParams.set('children', String(params.children))
  if (params.returnDate) url.searchParams.set('return_date', params.returnDate)
  url.searchParams.set('currency', params.currency ?? 'USD')

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`SerpApi error: ${response.status}`)
    }

    const data: SerpApiResponse = await response.json()

    if (data.error) {
      throw new Error(`SerpApi: ${data.error}`)
    }

    const allFlights = [...(data.best_flights ?? []), ...(data.other_flights ?? [])]

    return allFlights.map((flight, idx) => {
      const segments = buildSegments(flight.flights ?? [])
      const stops = Math.max((flight.flights?.length ?? 1) - 1, 0)

      return {
        id: `serpapi-${idx}-${Date.now()}`,
        source: 'serpapi' as const,
        priceUSD: flight.price ?? 0,
        airline: flight.airline ?? segments[0]?.airline ?? 'Unknown',
        airlineLogo: flight.airline_logo,
        stops,
        totalDurationMinutes: flight.total_duration ?? segments.reduce((s, seg) => s + seg.durationMinutes, 0),
        segments,
        bookingToken: flight.booking_token,
        rawData: flight as Record<string, unknown>,
      }
    })
  } catch (error) {
    console.error('SerpApi search error:', error)
    throw error
  }
}

function buildSegments(flights: SerpApiFlightSegment[]): FlightSegment[] {
  return flights.map((f) => ({
    departureAirport: f.departure_airport?.id ?? '',
    arrivalAirport: f.arrival_airport?.id ?? '',
    departureTime: f.departure_airport?.time ?? '',
    arrivalTime: f.arrival_airport?.time ?? '',
    airline: f.airline ?? '',
    flightNumber: f.flight_number ?? '',
    durationMinutes: f.duration ?? 0,
  }))
}
