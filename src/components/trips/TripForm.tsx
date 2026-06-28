import { useEffect } from 'react'
import { useForm, type Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { TravelerFields } from '@/components/trips/TravelerFields'
import { DestinationFields } from '@/components/trips/DestinationFields'
import { DateFields } from '@/components/trips/DateFields'
import { AirportCombobox } from '@/components/trips/AirportCombobox'
import type { Airport } from '@/lib/airports'
import type { Trip, TripType, TripStatus } from '@/types/trip'

const schema = z.object({
  name: z.string().min(1, 'Trip name is required'),
  status: z.enum(['planning', 'booked', 'completed']),
  tripType: z.enum(['one-way', 'round-trip', 'multi-city']),
  departureAirport: z.string().min(3, 'Select a departure airport'),
  destinations: z
    .array(
      z.object({
        country: z.string(),
        airport: z.string().min(3, 'Select a destination airport'),
        airportName: z.string(),
      })
    )
    .min(1, 'At least one destination'),
  travelers: z.array(z.object({ type: z.enum(['adult', 'child']), age: z.number().optional() })).min(1),
  dates: z.object({
    flexible: z.boolean(),
    startDate: z.string().min(1, 'Start date required'),
    endDate: z.string().optional(),
    flexDays: z.number().optional(),
  }),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  trip?: Trip | null
}

export function TripForm({ open, onClose, onSave, trip }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      status: 'planning',
      tripType: 'round-trip',
      departureAirport: '',
      destinations: [{ country: '', airport: '', airportName: '' }],
      travelers: [{ type: 'adult' }],
      dates: { flexible: false, startDate: '', endDate: '', flexDays: 2 },
      notes: '',
    },
  })

  const tripType = watch('tripType')
  const departureAirport = watch('departureAirport')

  useEffect(() => {
    if (open) {
      if (trip) {
        reset({
          name: trip.name,
          status: trip.status,
          tripType: trip.tripType,
          departureAirport: trip.departureAirport,
          destinations: trip.destinations,
          travelers: trip.travelers,
          dates: {
            flexible: trip.dates.flexible,
            startDate: trip.dates.startDate,
            endDate: trip.dates.endDate,
            flexDays: trip.dates.flexDays ?? 2,
          },
          notes: trip.notes ?? '',
        })
      } else {
        reset({
          name: '',
          status: 'planning',
          tripType: 'round-trip',
          departureAirport: '',
          destinations: [{ country: '', airport: '', airportName: '' }],
          travelers: [{ type: 'adult' }],
          dates: { flexible: false, startDate: '', endDate: '', flexDays: 2 },
          notes: '',
        })
      }
    }
  }, [open, trip, reset])

  function handleDepartureChange(airport: Airport | null) {
    setValue('departureAirport', airport?.code ?? '', { shouldValidate: true })
  }

  async function onSubmit(data: FormData) {
    await onSave({
      name: data.name,
      status: data.status as TripStatus,
      tripType: data.tripType as TripType,
      departureAirport: data.departureAirport.toUpperCase(),
      destinations: data.destinations.map((d) => ({
        country: d.country,
        airport: d.airport.toUpperCase(),
        airportName: d.airportName,
      })),
      travelers: data.travelers,
      dates: {
        flexible: Boolean(data.dates.flexible),
        startDate: data.dates.startDate,
        endDate: data.dates.endDate ?? '',
        flexDays: data.dates.flexDays,
      },
      notes: data.notes || undefined,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{trip ? 'Edit Trip' : 'Plan a New Trip'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Trip Name</Label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Japan Adventure 2025"
                {...register('name')}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Trip Type</Label>
                <Select value={tripType} onValueChange={(v) => setValue('tripType', v as TripType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round-trip">Round Trip</SelectItem>
                    <SelectItem value="one-way">One Way</SelectItem>
                    <SelectItem value="multi-city">Multi-City</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  defaultValue="planning"
                  onValueChange={(v) => setValue('status', v as TripStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Departure Airport</Label>
              <AirportCombobox
                value={departureAirport}
                onChange={handleDepartureChange}
                placeholder="Search departure airport..."
              />
              {errors.departureAirport && (
                <p className="text-xs text-destructive">{errors.departureAirport.message}</p>
              )}
            </div>
          </div>

          <Separator />

          <DestinationFields
            control={control as unknown as Control<FieldValues>}
            setValue={setValue as unknown as import('react-hook-form').UseFormSetValue<import('react-hook-form').FieldValues>}
            watch={watch as unknown as import('react-hook-form').UseFormWatch<import('react-hook-form').FieldValues>}
            tripType={tripType}
          />

          <Separator />

          <TravelerFields control={control as unknown as Control<FieldValues>} />

          <Separator />

          <DateFields
            register={register as unknown as import('react-hook-form').UseFormRegister<import('react-hook-form').FieldValues>}
            setValue={setValue as unknown as import('react-hook-form').UseFormSetValue<import('react-hook-form').FieldValues>}
            tripType={tripType}
            defaultFlexible={trip?.dates.flexible ?? false}
          />

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <textarea
              id="notes"
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Any special requirements or preferences..."
              {...register('notes')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : trip ? 'Save changes' : 'Create trip'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

