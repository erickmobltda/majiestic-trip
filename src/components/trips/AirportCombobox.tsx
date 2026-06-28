import { useState } from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { searchAirports, findAirportByCode, type Airport } from '@/lib/airports'

interface AirportComboboxProps {
  value: string
  onChange: (airport: Airport | null) => void
  placeholder?: string
  className?: string
}

export function AirportCombobox({ value, onChange, placeholder = 'Search airport...', className }: AirportComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selected = value ? findAirportByCode(value) : null
  const results = searchAirports(query)

  function handleSelect(airport: Airport) {
    onChange(airport)
    setOpen(false)
    setQuery('')
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between font-normal', !selected && 'text-muted-foreground', className)}
        >
          {selected ? (
            <span className="flex items-center gap-2 truncate">
              <span className="font-mono font-semibold text-foreground">{selected.code}</span>
              <span className="truncate text-sm">{selected.name}</span>
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
          <span className="ml-2 flex shrink-0 items-center gap-1">
            {selected && (
              <span
                role="button"
                onClick={handleClear}
                className="rounded p-0.5 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type code, city, or country..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {query.length === 0 ? 'Start typing to search airports.' : 'No airports found.'}
            </CommandEmpty>
            {results.length > 0 && (
              <CommandGroup>
                {results.map((airport) => (
                  <CommandItem
                    key={airport.code}
                    value={airport.code}
                    onSelect={() => handleSelect(airport)}
                    className="gap-2"
                  >
                    <Check
                      className={cn('h-4 w-4 shrink-0', selected?.code === airport.code ? 'opacity-100' : 'opacity-0')}
                    />
                    <span className="font-mono font-semibold w-10 shrink-0">{airport.code}</span>
                    <span className="flex-1 truncate text-sm">{airport.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{airport.country}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
