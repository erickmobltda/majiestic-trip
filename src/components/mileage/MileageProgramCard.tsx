import { Pencil, Trash2, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import type { MileageProgram } from '@/types/mileage'

interface Props {
  program: MileageProgram
  onEdit: (program: MileageProgram) => void
  onDelete: (id: string) => void
}

export function MileageProgramCard({ program, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">{program.programName}</p>
              <p className="text-xs text-muted-foreground">{program.airline}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(program)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove program?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove <strong>{program.programName}</strong> from your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(program.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-2xl font-bold">{program.currentMiles.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">miles / points</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {program.tier && <Badge variant="secondary">{program.tier}</Badge>}
          {program.memberNumber && (
            <Badge variant="outline" className="font-mono text-xs">
              #{program.memberNumber}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
