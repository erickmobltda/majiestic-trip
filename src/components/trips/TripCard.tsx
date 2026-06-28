import { Link } from 'react-router-dom'
import { MapPin, Users, Calendar, ArrowRight, Bookmark } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Trip } from '@/types/trip'
import { format } from 'date-fns'

interface Props {
  trip: Trip
}

const statusVariant: Record<string, 'default' | 'success' | 'secondary' | 'outline'> = {
  planning: 'secondary',
  booked: 'success',
  completed: 'outline',
}

export function TripCard({ trip }: Props) {
  const primaryDest = trip.destinations[0]
  const adultCount = trip.travelers.filter((t) => t.type === 'adult').length
  const childCount = trip.travelers.filter((t) => t.type === 'child').length

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold">{trip.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <MapPin className="h-3.5 w-3.5" />
              {primaryDest
                ? `${primaryDest.city}, ${primaryDest.country}`
                : 'Destination not set'}
              {trip.destinations.length > 1 && (
                <span className="text-xs">+{trip.destinations.length - 1} more</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {trip.savedFlight && (
              <Badge variant="info">
                <Bookmark className="h-3 w-3 mr-1" />
                Flight saved
              </Badge>
            )}
            <Badge variant={statusVariant[trip.status]}>{trip.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {adultCount > 0 && `${adultCount} adult${adultCount !== 1 ? 's' : ''}`}
            {childCount > 0 && `, ${childCount} child${childCount !== 1 ? 'ren' : ''}`}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {trip.dates.startDate ? format(new Date(trip.dates.startDate), 'MMM d, yyyy') : 'Date TBD'}
            {trip.dates.flexible && <span className="text-xs">(flexible)</span>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-mono">{trip.departureAirport || '???'}</span>
            <ArrowRight className="h-3 w-3" />
            {trip.destinations.map((d) => d.airport || '???').join(' → ')}
          </div>
          <Button asChild size="sm" variant="outline">
            <Link to={`/trips/${trip.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
