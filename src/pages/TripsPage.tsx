import { useState } from 'react'
import { Plus, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TripCard } from '@/components/trips/TripCard'
import { TripForm } from '@/components/trips/TripForm'
import { useTrips } from '@/hooks/useTrips'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/components/ui/use-toast'
import type { Trip } from '@/types/trip'

export function TripsPage() {
  const { user } = useAuth()
  const { trips, loading, addTrip } = useTrips(user?.uid ?? null)
  const [formOpen, setFormOpen] = useState(false)

  async function handleSave(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      await addTrip(data)
      toast({ title: 'Trip created!' })
    } catch (err) {
      console.error('Failed to create trip:', err)
      toast({ title: 'Error creating trip', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Trips</h1>
          <p className="text-sm text-muted-foreground">
            {trips.length} trip{trips.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Plan New Trip
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Map className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-semibold mb-1">No trips yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Plan your first trip and start finding the best flight deals.
          </p>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Plan your first trip
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}

      <TripForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
