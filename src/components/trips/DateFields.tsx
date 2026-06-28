import { useState } from 'react'
import type { UseFormRegister, UseFormSetValue, FieldValues } from 'react-hook-form'
import { Calendar, Shuffle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface DateFieldsProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  tripType: string
  defaultFlexible?: boolean
}

export function DateFields({ register, setValue, tripType, defaultFlexible = false }: DateFieldsProps) {
  const [flexible, setFlexible] = useState(defaultFlexible)

  function toggleFlexible(value: boolean) {
    setFlexible(value)
    setValue('dates.flexible', value)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label>Travel Dates</Label>
        <div className="flex rounded-md border overflow-hidden">
          <button
            type="button"
            className={cn(
              'px-3 py-1 text-xs transition-colors',
              !flexible ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            )}
            onClick={() => toggleFlexible(false)}
          >
            <Calendar className="inline h-3 w-3 mr-1" />
            Fixed
          </button>
          <button
            type="button"
            className={cn(
              'px-3 py-1 text-xs transition-colors',
              flexible ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            )}
            onClick={() => toggleFlexible(true)}
          >
            <Shuffle className="inline h-3 w-3 mr-1" />
            Flexible
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="startDate" className="text-xs">
            {tripType === 'round-trip' ? 'Departure date' : 'Travel date'}
          </Label>
          <Input
            id="startDate"
            type="date"
            {...register('dates.startDate')}
          />
        </div>

        {(tripType === 'round-trip' || flexible) && (
          <div className="space-y-1.5">
            <Label htmlFor="endDate" className="text-xs">
              {tripType === 'round-trip' ? 'Return date' : 'Latest date'}
            </Label>
            <Input
              id="endDate"
              type="date"
              {...register('dates.endDate')}
            />
          </div>
        )}
      </div>

      {flexible && (
        <div className="space-y-1.5">
          <Label htmlFor="flexDays" className="text-xs">
            Flexibility range (±days)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="flexDays"
              type="number"
              min="1"
              max="7"
              defaultValue={2}
              className="w-20"
              {...register('dates.flexDays', { valueAsNumber: true })}
            />
            <span className="text-xs text-muted-foreground">
              days before/after the selected date
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
