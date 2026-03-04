'use client'

import { Check, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export interface ReadinessItem {
  id: string
  label: string
  checked: boolean
  autoChecked: boolean
  link?: string
}

interface ReadinessChecklistProps {
  items: ReadinessItem[]
  onToggle?: (id: string) => void
}

export function ReadinessChecklist({ items, onToggle }: ReadinessChecklistProps) {
  const total = items.length
  const done = items.filter((i) => i.checked).length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Prontidão pra Licitar</h3>
        <span className={`text-lg font-bold ${pct === 100 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {pct}%
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            pct === 100 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <button
              onClick={() => !item.autoChecked && onToggle?.(item.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                item.checked
                  ? 'bg-green-500 text-white'
                  : 'border border-[var(--border)] hover:border-[var(--primary)]'
              } ${item.autoChecked ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {item.checked && <Check className="h-3 w-3" />}
            </button>
            <span className={`text-sm flex-1 ${item.checked ? 'text-[var(--muted-foreground)] line-through' : 'text-[var(--foreground)]'}`}>
              {item.label}
            </span>
            {item.link && !item.checked && (
              <Link href={item.link} className="text-[var(--primary)]">
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
