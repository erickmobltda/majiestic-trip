import { Link } from 'react-router-dom'
import { Map, CreditCard, Plane, TrendingUp, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TripCard } from '@/components/trips/TripCard'
import { useTrips } from '@/hooks/useTrips'
import { useMileagePrograms } from '@/hooks/useMileagePrograms'
import { useAuth } from '@/hooks/useAuth'

export function DashboardPage() {
  const { user } = useAuth()
  const { trips, loading: tripsLoading } = useTrips(user?.uid ?? null)
  const { programs, loading: programsLoading } = useMileagePrograms(user?.uid ?? null)

  const activeTrips = trips.filter((t) => t.status === 'planning' || t.status === 'booked')
  const totalMiles = programs.reduce((sum, p) => sum + p.currentMiles, 0)
  const recentTrips = trips.slice(0, 4)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-sm text-muted-foreground">Here's an overview of your travel plans.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {tripsLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <div className="text-3xl font-bold">{trips.length}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Trips</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {tripsLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <div className="text-3xl font-bold">{activeTrips.length}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Miles</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {programsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-3xl font-bold">{totalMiles.toLocaleString()}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              across {programs.length} program{programs.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Trips</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/trips">View all</Link>
            </Button>
          </div>

          {tripsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-lg border p-4 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : recentTrips.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">No trips yet</p>
              <Button asChild size="sm">
                <Link to="/trips">
                  <Plus className="mr-1.5 h-4 w-4" />
                  Plan your first trip
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {recentTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mileage Programs</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/mileage">Manage</Link>
            </Button>
          </div>

          {programsLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : programs.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <CreditCard className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground mb-2">No programs added</p>
              <Button asChild size="sm" variant="outline">
                <Link to="/mileage">Add program</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {programs.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div>
                    <p className="text-sm font-medium">{p.programName}</p>
                    <p className="text-xs text-muted-foreground">{p.airline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{p.currentMiles.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">miles</p>
                  </div>
                </div>
              ))}
              {programs.length > 5 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{programs.length - 5} more
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
