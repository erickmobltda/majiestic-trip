import { AlertCircle, Search, Plane, DollarSign, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FlightResultList } from '@/components/flights/FlightResultList'
import { useFlightSearch } from '@/hooks/useFlightSearch'
import { toast } from '@/components/ui/use-toast'
import type { Trip } from '@/types/trip'
import type { MileageProgram } from '@/types/mileage'
import type { RankedFlightResult } from '@/types/flight'

interface Props {
  trip: Trip
  userPrograms: MileageProgram[]
  onSaveFlight: (ranked: RankedFlightResult) => Promise<void>
}

export function FlightSearchPanel({ trip, userPrograms, onSaveFlight }: Props) {
  const {
    results,
    isLoading,
    isLoadingAward,
    isLoadingCash,
    awardError,
    cashError,
    search,
    searchAwardOnly,
    searchCashOnly,
    estimatedCallCount,
  } = useFlightSearch(trip, userPrograms)

  const canSearch =
    trip.departureAirport &&
    trip.destinations.length > 0 &&
    trip.destinations[0]?.airport &&
    trip.dates.startDate

  async function handleSearchAll() {
    if (estimatedCallCount > 20) {
      const ok = window.confirm(
        `This will use ~${estimatedCallCount} seats.aero API calls (limit: 1,000/day). Continue?`
      )
      if (!ok) return
    }
    try {
      await search()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Search failed'
      toast({ title: 'Search failed', description: msg, variant: 'destructive' })
    }
  }

  async function handleSearchAward() {
    try {
      await searchAwardOnly()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Award search failed'
      toast({ title: 'Award search failed', description: msg, variant: 'destructive' })
    }
  }

  async function handleSearchCash() {
    try {
      await searchCashOnly()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Cash search failed'
      toast({ title: 'Cash search failed', description: msg, variant: 'destructive' })
    }
  }

  async function handleSave(ranked: RankedFlightResult) {
    try {
      await onSaveFlight(ranked)
      toast({ title: 'Flight saved!', description: 'Your preferred flight has been saved to this trip.' })
    } catch {
      toast({ title: 'Error saving flight', variant: 'destructive' })
    }
  }

  if (!canSearch) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center space-y-2">
        <Plane className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Complete the trip details (departure airport, destination airport, and start date) to search for flights.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSearchAll} disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          {isLoading ? 'Searching...' : 'Search All (Award + Cash)'}
        </Button>
        <Button variant="outline" onClick={handleSearchAward} disabled={isLoading}>
          <Award className="mr-2 h-4 w-4" />
          Award Only
        </Button>
        <Button variant="outline" onClick={handleSearchCash} disabled={isLoading}>
          <DollarSign className="mr-2 h-4 w-4" />
          Cash Prices Only
        </Button>
      </div>

      {userPrograms.filter((p) => p.currentMiles > 0).length === 0 && (
        <div className="flex items-center gap-2 rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Add mileage programs with miles to search for award flights.
        </div>
      )}

      {awardError && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Award search: {awardError}
        </div>
      )}

      {cashError && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Cash search: {cashError}
        </div>
      )}

      <FlightResultList
        results={results}
        isLoadingAward={isLoadingAward}
        isLoadingCash={isLoadingCash}
        savedFlight={trip.savedFlight}
        onSave={handleSave}
      />
    </div>
  )
}
