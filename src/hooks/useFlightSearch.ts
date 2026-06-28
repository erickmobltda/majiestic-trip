import { useState, useCallback } from 'react'
import type { Trip } from '@/types/trip'
import type { MileageProgram } from '@/types/mileage'
import type { RankedFlightResult } from '@/types/flight'
import { searchAwardFlights } from '@/services/seatsaero/client'
import { searchCashFlights } from '@/services/serpapi/client'
import { rankFlights } from '@/lib/flightRanker'
import { format } from 'date-fns'

export type SearchMode = 'all' | 'award' | 'cash' | null

interface FlightSearchState {
  results: RankedFlightResult[]
  isLoadingAward: boolean
  isLoadingCash: boolean
  awardError: string | null
  cashError: string | null
  searchedMode: SearchMode
}

export function useFlightSearch(trip: Trip, userPrograms: MileageProgram[]) {
  const [state, setState] = useState<FlightSearchState>({
    results: [],
    isLoadingAward: false,
    isLoadingCash: false,
    awardError: null,
    cashError: null,
    searchedMode: null,
  })

  const searchAward = useCallback(async () => {
    // Award availability is independent of how many miles you hold — your
    // balance only affects affordability. So search every program that maps to
    // a seats.aero source, regardless of currentMiles.
    const searchablePrograms = userPrograms.filter((p) => p.seatsaeroSource)
    if (searchablePrograms.length === 0) return []

    setState((s) => ({ ...s, isLoadingAward: true, awardError: null }))

    const destination = trip.destinations[0]
    const departureDate = trip.dates.startDate

    const searchPromises = searchablePrograms.map((program) =>
      searchAwardFlights(
        {
          originAirport: trip.departureAirport,
          destinationAirport: destination.airport,
          departureDate,
          source: program.seatsaeroSource,
          seatCount: trip.travelers.length || 1,
        },
        userPrograms
      ).catch(() => [])
    )

    try {
      const results = await Promise.all(searchPromises)
      setState((s) => ({ ...s, isLoadingAward: false }))
      return results.flat()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Award search failed'
      setState((s) => ({ ...s, isLoadingAward: false, awardError: msg }))
      return []
    }
  }, [trip, userPrograms])

  const searchCash = useCallback(async () => {
    setState((s) => ({ ...s, isLoadingCash: true, cashError: null }))

    const destination = trip.destinations[0]
    const adults = trip.travelers.filter((t) => t.type === 'adult').length || 1
    const children = trip.travelers.filter((t) => t.type === 'child').length

    const params = {
      departureId: trip.departureAirport,
      arrivalId: destination.airport,
      outboundDate: trip.dates.startDate,
      returnDate: trip.tripType === 'round-trip' ? trip.dates.endDate : undefined,
      type: (trip.tripType === 'round-trip' ? 1 : 2) as 1 | 2,
      adults,
      children,
    }

    try {
      const results = await searchCashFlights(params)
      setState((s) => ({ ...s, isLoadingCash: false }))
      return results
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Cash price search failed'
      setState((s) => ({ ...s, isLoadingCash: false, cashError: msg }))
      return []
    }
  }, [trip])

  const search = useCallback(async () => {
    setState((s) => ({ ...s, results: [], awardError: null, cashError: null, searchedMode: 'all' }))

    const [awardResults, cashResults] = await Promise.all([searchAward(), searchCash()])
    const ranked = rankFlights(awardResults, cashResults)
    setState((s) => ({ ...s, results: ranked }))
  }, [searchAward, searchCash])

  const searchAwardOnly = useCallback(async () => {
    setState((s) => ({ ...s, results: [], awardError: null, searchedMode: 'award' }))
    const awardResults = await searchAward()
    const ranked = rankFlights(awardResults, [])
    setState((s) => ({ ...s, results: ranked }))
  }, [searchAward])

  const searchCashOnly = useCallback(async () => {
    setState((s) => ({ ...s, results: [], cashError: null, searchedMode: 'cash' }))
    const cashResults = await searchCash()
    const ranked = rankFlights([], cashResults)
    setState((s) => ({ ...s, results: ranked }))
  }, [searchCash])

  const reset = useCallback(() => {
    setState({
      results: [],
      isLoadingAward: false,
      isLoadingCash: false,
      awardError: null,
      cashError: null,
      searchedMode: null,
    })
  }, [])

  const estimatedCallCount = userPrograms.filter((p) => p.seatsaeroSource).length

  return {
    ...state,
    isLoading: state.isLoadingAward || state.isLoadingCash,
    search,
    searchAwardOnly,
    searchCashOnly,
    reset,
    estimatedCallCount,
  }
}

export function formatSearchDate(date: string): string {
  try {
    return format(new Date(date), 'MMM d, yyyy')
  } catch {
    return date
  }
}
