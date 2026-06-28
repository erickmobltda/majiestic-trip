import { Skeleton } from '@/components/ui/skeleton'
import { FlightResultCard } from '@/components/flights/FlightResultCard'
import type { RankedFlightResult } from '@/types/flight'
import type { SavedFlight } from '@/types/trip'

interface Props {
  results: RankedFlightResult[]
  isLoadingAward: boolean
  isLoadingCash: boolean
  savedFlight?: SavedFlight
  onSave: (ranked: RankedFlightResult) => void
}

export function FlightResultList({ results, isLoadingAward, isLoadingCash, savedFlight, onSave }: Props) {
  if (isLoadingAward && results.length === 0) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg border space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p className="text-sm">No flight results yet. Search to find options.</p>
      </div>
    )
  }

  function isSaved(ranked: RankedFlightResult): boolean {
    if (!savedFlight) return false
    return savedFlight.source === ranked.result.source
  }

  return (
    <div className="space-y-3">
      {isLoadingCash && (
        <p className="text-xs text-muted-foreground animate-pulse">Loading cash prices...</p>
      )}
      {results.map((ranked) => (
        <FlightResultCard
          key={ranked.result.id}
          ranked={ranked}
          isSaved={isSaved(ranked)}
          onSave={onSave}
        />
      ))}
    </div>
  )
}
