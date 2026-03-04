'use client'

import { Search, SlidersHorizontal } from 'lucide-react'

const STATUS_FILTERS = [
  { value: '', label: 'Todos' },
  { value: 'valido', label: 'Válidos' },
  { value: 'vencendo', label: 'Vencendo' },
  { value: 'vencido', label: 'Vencidos' },
  { value: 'pendente', label: 'Pendentes' },
]

interface DocumentListFiltersProps {
  search: string
  status: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function DocumentListFilters({ search, status, onSearchChange, onStatusChange }: DocumentListFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar documento..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-3 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
        {STATUS_FILTERS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStatusChange(opt.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              status === opt.value
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
