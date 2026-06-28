import { useFieldArray } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { X, User, Baby } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TravelerFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}

export function TravelerFields({ control }: TravelerFieldsProps) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'travelers',
  })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Travelers</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ type: 'adult' })}
          >
            <User className="mr-1 h-3.5 w-3.5" />
            Add Adult
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ type: 'child', age: 10 })}
          >
            <Baby className="mr-1 h-3.5 w-3.5" />
            Add Child
          </Button>
        </div>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">Add at least one traveler.</p>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => {
          const traveler = field as { id: string; type: 'adult' | 'child'; age?: number }
          return (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 p-2 rounded-md border bg-muted/30">
                <Select
                  value={traveler.type}
                  onValueChange={(v) => update(index, { ...traveler, type: v as 'adult' | 'child' })}
                >
                  <SelectTrigger className="w-28 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adult</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                  </SelectContent>
                </Select>

                {traveler.type === 'child' && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Age:</span>
                    <Input
                      type="number"
                      min="0"
                      max="17"
                      className="w-16 h-8"
                      defaultValue={traveler.age ?? 10}
                      onChange={(e) =>
                        update(index, { ...traveler, age: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                )}

                <span className="text-xs text-muted-foreground ml-auto">
                  {traveler.type === 'adult' ? 'Adult' : `Child (age ${traveler.age ?? '?'})`}
                </span>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )
        })}
      </div>

      {fields.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {fields.filter((f) => (f as unknown as { type: string }).type === 'adult').length} adult(s),{' '}
          {fields.filter((f) => (f as unknown as { type: string }).type === 'child').length} child(ren)
        </p>
      )}
    </div>
  )
}
