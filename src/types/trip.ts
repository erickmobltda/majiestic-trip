export type TripStatus = 'planning' | 'booked' | 'completed'
export type TripType = 'one-way' | 'round-trip' | 'multi-city'
export type TravelerType = 'adult' | 'child'

export interface Traveler {
  type: TravelerType
  age?: number
}

export interface Destination {
  country: string
  airport: string
  airportName: string
}

export interface TripDates {
  flexible: boolean
  startDate: string
  endDate: string
  flexDays?: number
}

export interface SavedFlight {
  source: 'seatsaero' | 'serpapi'
  data: Record<string, unknown>
  savedAt: Date
}

export interface Trip {
  id: string
  name: string
  status: TripStatus
  tripType: TripType
  departureAirport: string
  destinations: Destination[]
  travelers: Traveler[]
  dates: TripDates
  notes?: string
  savedFlight?: SavedFlight
  createdAt: Date
  updatedAt: Date
}
