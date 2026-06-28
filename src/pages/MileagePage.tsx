import { useState } from 'react'
import { Plus, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MileageProgramCard } from '@/components/mileage/MileageProgramCard'
import { MileageProgramForm } from '@/components/mileage/MileageProgramForm'
import { useMileagePrograms } from '@/hooks/useMileagePrograms'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/components/ui/use-toast'
import type { MileageProgram } from '@/types/mileage'

export function MileagePage() {
  const { user } = useAuth()
  const { programs, loading, addProgram, updateProgram, deleteProgram } = useMileagePrograms(
    user?.uid ?? null
  )
  const [formOpen, setFormOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<MileageProgram | null>(null)

  function handleEdit(program: MileageProgram) {
    setEditingProgram(program)
    setFormOpen(true)
  }

  function handleClose() {
    setFormOpen(false)
    setEditingProgram(null)
  }

  async function handleSave(data: Omit<MileageProgram, 'id' | 'updatedAt'>) {
    try {
      if (editingProgram) {
        await updateProgram(editingProgram.id, data)
        toast({ title: 'Program updated' })
      } else {
        await addProgram(data)
        toast({ title: 'Program added' })
      }
    } catch {
      toast({ title: 'Error saving program', variant: 'destructive' })
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProgram(id)
      toast({ title: 'Program removed' })
    } catch {
      toast({ title: 'Error removing program', variant: 'destructive' })
    }
  }

  const totalMiles = programs.reduce((sum, p) => sum + p.currentMiles, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mileage Programs</h1>
          <p className="text-sm text-muted-foreground">
            {programs.length} program{programs.length !== 1 ? 's' : ''} · {totalMiles.toLocaleString()} total miles
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          ))}
        </div>
      ) : programs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <CreditCard className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-semibold mb-1">No programs yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your loyalty programs to use their miles when searching for award flights.
          </p>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first program
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <MileageProgramCard
              key={program.id}
              program={program}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <MileageProgramForm
        open={formOpen}
        onClose={handleClose}
        onSave={handleSave}
        program={editingProgram}
      />
    </div>
  )
}
