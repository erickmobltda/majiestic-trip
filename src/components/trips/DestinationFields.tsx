import { useFieldArray } from 'react-hook-form'
import type { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { Plus, X, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AirportCombobox } from '@/components/trips/AirportCombobox'
import type { Airport } from '@/lib/airports'

interface DestinationFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>
  tripType: string
}

export function DestinationFields({ control, setValue, watch, tripType }: DestinationFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'destinations',
  })

  const maxDestinations = tripType === 'multi-city' ? 10 : 1
  const canAdd = fields.length < maxDestinations && tripType === 'multi-city'

  const destinations = watch('destinations') as { airport: string; country: string; airportName: string }[]

  function handleAirportChange(index: number, airport: Airport | null) {
    if (airport) {
      setValue(`destinations.${index}.airport`, airport.code, { shouldValidate: true })
      setValue(`destinations.${index}.country`, airport.country)
      setValue(`destinations.${index}.airportName`, airport.name)
    } else {
      setValue(`destinations.${index}.airport`, '', { shouldValidate: true })
      setValue(`destinations.${index}.country`, '')
      setValue(`destinations.${index}.airportName`, '')
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Destinations</Label>
        {canAdd && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ country: '', airport: '', airportName: '' })}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add destination
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 p-3 rounded-md border bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                {tripType === 'multi-city' ? `Destination ${index + 1}` : 'Destination'}
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => remove(index)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>

            <AirportCombobox
              value={destinations?.[index]?.airport ?? ''}
              onChange={(airport) => handleAirportChange(index, airport)}
              placeholder="Search destination airport..."
            />
            {destinations?.[index]?.country && (
              <p className="text-xs text-muted-foreground pl-1">{destinations[index].country}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
