import { useFieldArray } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { Plus, X, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DestinationFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
  tripType: string
}

export function DestinationFields({ control, register, errors, tripType }: DestinationFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'destinations',
  })

  const maxDestinations = tripType === 'multi-city' ? 10 : 1
  const canAdd = fields.length < maxDestinations && tripType === 'multi-city'

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Destinations</Label>
        {canAdd && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ city: '', country: '', airport: '' })}
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

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">City</Label>
                <Input
                  placeholder="Tokyo"
                  className="h-8"
                  {...register(`destinations.${index}.city`)}
                />
                {errors?.destinations?.[index]?.city && (
                  <p className="text-xs text-destructive">{errors.destinations[index].city.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Country</Label>
                <Input
                  placeholder="Japan"
                  className="h-8"
                  {...register(`destinations.${index}.country`)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Airport (IATA)</Label>
                <Input
                  placeholder="NRT"
                  className="h-8 font-mono uppercase"
                  maxLength={3}
                  {...register(`destinations.${index}.airport`)}
                />
                {errors?.destinations?.[index]?.airport && (
                  <p className="text-xs text-destructive">{errors.destinations[index].airport.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
