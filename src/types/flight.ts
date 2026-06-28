export interface FlightSegment {
  departureAirport: string
  arrivalAirport: string
  departureTime: string
  arrivalTime: string
  airline: string
  flightNumber: string
  durationMinutes: number
}

export interface AwardFlightResult {
  id: string
  source: 'seatsaero'
  program: string
  programLabel: string
  milesRequired: number
  cabin: string
  stops: number
  totalDurationMinutes: number
  segments: FlightSegment[]
  estimatedValueUSD: number
  affordabilityRatio: number
  rawData: Record<string, unknown>
}

export interface CashFlightResult {
  id: string
  source: 'serpapi'
  priceUSD: number
  airline: string
  airlineLogo?: string
  stops: number
  totalDurationMinutes: number
  segments: FlightSegment[]
  bookingToken?: string
  rawData: Record<string, unknown>
}

export type FlightResult = AwardFlightResult | CashFlightResult

export interface RankedFlightResult {
  rank: number
  score: number
  result: FlightResult
}
