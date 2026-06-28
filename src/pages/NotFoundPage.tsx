import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Plane className="h-12 w-12 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-6">
        This page doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go to Dashboard</Link>
      </Button>
    </div>
  )
}
