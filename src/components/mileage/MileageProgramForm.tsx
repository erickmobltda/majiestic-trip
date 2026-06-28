import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { MILEAGE_PROGRAMS_LIST } from '@/lib/constants'
import type { MileageProgram } from '@/types/mileage'

const schema = z.object({
  seatsaeroSource: z.string().min(1, 'Select a program'),
  currentMiles: z.number().min(0, 'Must be 0 or more'),
  memberNumber: z.string().optional(),
  tier: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: Omit<MileageProgram, 'id' | 'updatedAt'>) => Promise<void>
  program?: MileageProgram | null
}

export function MileageProgramForm({ open, onClose, onSave, program }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { currentMiles: 0 },
  })

  const selectedSource = watch('seatsaeroSource')
  const selectedProgram = MILEAGE_PROGRAMS_LIST.find((p) => p.seatsaeroSource === selectedSource)

  useEffect(() => {
    if (open) {
      reset({
        seatsaeroSource: program?.seatsaeroSource ?? '',
        currentMiles: program?.currentMiles ?? 0,
        memberNumber: program?.memberNumber ?? '',
        tier: program?.tier ?? '',
      })
    }
  }, [open, program, reset])

  async function onSubmit(data: FormData) {
    const prog = MILEAGE_PROGRAMS_LIST.find((p) => p.seatsaeroSource === data.seatsaeroSource)
    await onSave({
      programName: prog?.label ?? data.seatsaeroSource,
      airline: prog?.airline ?? '',
      seatsaeroSource: data.seatsaeroSource,
      currentMiles: data.currentMiles,
      memberNumber: data.memberNumber || undefined,
      tier: data.tier || undefined,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{program ? 'Edit Mileage Program' : 'Add Mileage Program'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Program</Label>
            <Select
              value={selectedSource}
              onValueChange={(v) => setValue('seatsaeroSource', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a loyalty program" />
              </SelectTrigger>
              <SelectContent>
                {MILEAGE_PROGRAMS_LIST.map((p) => (
                  <SelectItem key={p.seatsaeroSource} value={p.seatsaeroSource}>
                    {p.label} ({p.airline})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.seatsaeroSource && (
              <p className="text-xs text-destructive">{errors.seatsaeroSource.message}</p>
            )}
          </div>

          {selectedProgram && (
            <p className="text-xs text-muted-foreground">
              seats.aero source: <code>{selectedProgram.seatsaeroSource}</code>
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="currentMiles">Current Miles / Points</Label>
            <Input
              id="currentMiles"
              type="number"
              min="0"
              placeholder="0"
              {...register('currentMiles', { valueAsNumber: true })}
            />
            {errors.currentMiles && (
              <p className="text-xs text-destructive">{errors.currentMiles.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="memberNumber">Member # (optional)</Label>
              <Input
                id="memberNumber"
                placeholder="123456789"
                {...register('memberNumber')}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tier">Status tier (optional)</Label>
              <Input
                id="tier"
                placeholder="Gold, Platinum..."
                {...register('tier')}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : program ? 'Save changes' : 'Add program'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
