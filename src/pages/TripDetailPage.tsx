import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Users,
  Calendar,
  Plane,
  ArrowRight,
  Bookmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { TripForm } from '@/components/trips/TripForm'
import { FlightSearchPanel } from '@/components/flights/FlightSearchPanel'
import { useTrips } from '@/hooks/useTrips'
import { useMileagePrograms } from '@/hooks/useMileagePrograms'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/components/ui/use-toast'
import type { Trip } from '@/types/trip'
import type { RankedFlightResult } from '@/types/flight'
import { format } from 'date-fns'

const statusVariant: Record<string, 'default' | 'success' | 'secondary' | 'outline'> = {
  planning: 'secondary',
  booked: 'success',
  completed: 'outline',
}

export function TripDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { trips, loading, updateTrip, deleteTrip, saveFlightToTrip } = useTrips(user?.uid ?? null)
  const { programs } = useMileagePrograms(user?.uid ?? null)
  const [editOpen, setEditOpen] = useState(false)

  const trip = trips.find((t) => t.id === id)

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>
  }

  if (!trip) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Trip not found.</p>
        <Button asChild variant="link" className="mt-2">
          <Link to="/trips">Back to trips</Link>
        </Button>
      </div>
    )
  }

  async function handleUpdate(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) {
    await updateTrip(trip!.id, data)
    toast({ title: 'Trip updated' })
  }

  async function handleDelete() {
    await deleteTrip(trip!.id)
    toast({ title: 'Trip deleted' })
    navigate('/trips')
  }

  async function handleSaveFlight(ranked: RankedFlightResult) {
    await saveFlightToTrip(trip!.id, {
      source: ranked.result.source,
      data: ranked.result.rawData,
    })
  }

  const adultCount = trip.travelers.filter((t) => t.type === 'adult').length
  const childCount = trip.travelers.filter((t) => t.type === 'child').length

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/trips">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold">{trip.name}</h1>
            <Badge variant={statusVariant[trip.status]}>{trip.status}</Badge>
            {trip.savedFlight && (
              <Badge variant="info">
                <Bookmark className="mr-1 h-3 w-3" />
                Flight saved
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this trip?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete <strong>{trip.name}</strong> and all its saved data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 font-mono text-lg font-semibold">
              <span>{trip.departureAirport}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span>{trip.destinations.map((d) => d.airport).join(' → ')}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {trip.destinations.map((d) => `${d.city}, ${d.country}`).join(' → ')}
            </p>
            <Badge variant="outline" className="mt-2 capitalize">{trip.tripType}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Travelers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">
                {adultCount} adult{adultCount !== 1 ? 's' : ''}
                {childCount > 0 && `, ${childCount} child${childCount !== 1 ? 'ren' : ''}`}
              </span>
            </div>
            {trip.travelers.filter((t) => t.type === 'child').map((t, i) => (
              <p key={i} className="text-sm text-muted-foreground mt-1">
                Child age: {t.age ?? 'N/A'}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">
                  {trip.dates.startDate
                    ? format(new Date(trip.dates.startDate), 'MMM d, yyyy')
                    : 'TBD'}
                  {trip.dates.endDate &&
                    ` → ${format(new Date(trip.dates.endDate), 'MMM d, yyyy')}`}
                </p>
                {trip.dates.flexible && (
                  <p className="text-xs text-muted-foreground">
                    Flexible ±{trip.dates.flexDays ?? 2} days
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {trip.notes && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{trip.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Find Flights</h2>
        </div>
        <FlightSearchPanel
          trip={trip}
          userPrograms={programs}
          onSaveFlight={handleSaveFlight}
        />
      </div>

      <TripForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        trip={trip}
      />
    </div>
  )
}
