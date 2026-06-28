import { CENTS_PER_MILE } from '@/lib/constants'
import type { MileageProgram } from '@/types/mileage'
import type {
  AwardFlightResult,
  CashFlightResult,
  FlightResult,
  RankedFlightResult,
} from '@/types/flight'

interface RawAwardResult {
  id: string
  program: string
  programLabel: string
  milesRequired: number
  cabin: string
  stops: number
  totalDurationMinutes: number
  segments: AwardFlightResult['segments']
  rawData: Record<string, unknown>
}

export function enrichAwardResults(
  rawResults: RawAwardResult[],
  userPrograms: MileageProgram[]
): AwardFlightResult[] {
  return rawResults.map((r) => {
    const userProgram = userPrograms.find((p) => p.seatsaeroSource === r.program)
    const cpm = CENTS_PER_MILE[r.program] ?? 1.2
    const estimatedValueUSD = (r.milesRequired * cpm) / 100
    const currentMiles = userProgram?.currentMiles ?? 0
    const affordabilityRatio = Math.min(currentMiles / Math.max(r.milesRequired, 1), 1)

    return {
      ...r,
      source: 'seatsaero' as const,
      estimatedValueUSD,
      affordabilityRatio,
    }
  })
}

export function rankFlights(
  awardResults: AwardFlightResult[],
  cashResults: CashFlightResult[],
  maxResults = 5
): RankedFlightResult[] {
  const all: FlightResult[] = [...awardResults, ...cashResults]
  if (all.length === 0) return []

  const prices = all.map((r) =>
    r.source === 'seatsaero' ? r.estimatedValueUSD : r.priceUSD
  )
  const durations = all.map((r) => r.totalDurationMinutes)
  const stopCounts = all.map((r) => r.stops)

  const referencePrice = Math.min(...prices)
  const maxDuration = Math.max(...durations, 1)
  const maxStops = Math.max(...stopCounts, 1)

  const scored = all.map((r) => {
    const price = r.source === 'seatsaero' ? r.estimatedValueUSD : r.priceUSD
    const affordability = r.source === 'seatsaero' ? r.affordabilityRatio : 1.0
    const normalizedPrice = referencePrice > 0 ? price / referencePrice : 1
    const durationFactor = r.totalDurationMinutes / maxDuration
    const stopsFactor = 1 - r.stops / maxStops

    const score =
      (1 - Math.min(normalizedPrice, 3) / 3) * 0.5 +
      affordability * 0.25 +
      (1 - durationFactor) * 0.15 +
      stopsFactor * 0.1

    return { result: r, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const deduplicated: typeof scored = []
  const seen = new Set<string>()
  for (const item of scored) {
    const key = dedupeKey(item.result)
    if (!seen.has(key)) {
      seen.add(key)
      deduplicated.push(item)
    }
    if (deduplicated.length >= maxResults) break
  }

  return deduplicated.map((item, index) => ({
    rank: index + 1,
    score: item.score,
    result: item.result,
  }))
}

function dedupeKey(r: FlightResult): string {
  const segKey = r.segments
    .map((s) => `${s.departureAirport}-${s.arrivalAirport}-${s.departureTime}`)
    .join('|')
  return `${r.source}:${segKey}`
}
