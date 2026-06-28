import { Award, DollarSign, Clock, PlaneTakeoff, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { RankedFlightResult } from '@/types/flight'
import { CABIN_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface Props {
  ranked: RankedFlightResult
  isSaved: boolean
  onSave: (ranked: RankedFlightResult) => void
}

export function FlightResultCard({ ranked, isSaved, onSave }: Props) {
  const { rank, result } = ranked
  const isAward = result.source === 'seatsaero'

  const durationH = Math.floor(result.totalDurationMinutes / 60)
  const durationM = result.totalDurationMinutes % 60
  const durationStr = `${durationH}h ${durationM}m`

  return (
    <Card className={cn('transition-all', isSaved && 'ring-2 ring-primary')}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
            {rank}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Badge variant={isAward ? 'info' : 'secondary'}>
                  {isAward ? <Award className="mr-1 h-3 w-3" /> : <DollarSign className="mr-1 h-3 w-3" />}
                  {isAward ? 'Award' : 'Cash'}
                </Badge>

                {isAward && result.source === 'seatsaero' && (
                  <>
                    <span className="font-semibold text-primary">
                      {result.milesRequired.toLocaleString()} miles
                    </span>
                    <Badge variant="outline">{CABIN_LABELS[result.cabin] ?? result.cabin}</Badge>
                    <span className="text-xs text-muted-foreground">{result.programLabel}</span>
                  </>
                )}

                {!isAward && result.source === 'serpapi' && (
                  <>
                    <span className="font-semibold text-green-600">
                      ${result.priceUSD.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">{result.airline}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isSaved ? (
                  <Badge variant="success">
                    <BookmarkCheck className="mr-1 h-3 w-3" />
                    Saved
                  </Badge>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => onSave(ranked)}>
                    <Bookmark className="mr-1.5 h-3.5 w-3.5" />
                    Save
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <PlaneTakeoff className="h-3.5 w-3.5" />
                {result.segments.length > 0
                  ? result.segments.map((s, i) => (
                      <span key={i}>
                        {i > 0 && ' → '}
                        {s.departureAirport}
                      </span>
                    ))
                  : 'N/A'}
                {result.segments.length > 0 && (
                  <span>→ {result.segments[result.segments.length - 1].arrivalAirport}</span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {durationStr}
              </div>

              <span>
                {result.stops === 0 ? 'Nonstop' : `${result.stops} stop${result.stops !== 1 ? 's' : ''}`}
              </span>
            </div>

            {result.segments.length > 0 && result.segments[0].departureTime && (
              <div className="text-xs text-muted-foreground">
                Departs: {result.segments[0].departureTime}
              </div>
            )}

            {!isAward && result.source === 'serpapi' && result.bookingToken && (
              <a
                href={`https://www.google.com/travel/flights?tfs=${result.bookingToken}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View on Google Flights
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
