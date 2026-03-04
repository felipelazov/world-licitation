'use client'

import { Trash2 } from 'lucide-react'

export interface CostItemData {
  id: string
  category: string
  description: string
  quantity: number
  unit: string
  unit_cost: number
  sort_order: number
}

interface CostItemRowProps {
  item: CostItemData
  onChange: (id: string, field: string, value: string | number) => void
  onDelete: (id: string) => void
}

export function CostItemRow({ item, onChange, onDelete }: CostItemRowProps) {
  const total = item.quantity * item.unit_cost

  return (
    <div className="grid grid-cols-[1fr_80px_70px_100px_90px_36px] items-center gap-2">
      <input
        type="text"
        value={item.description}
        onChange={(e) => onChange(item.id, 'description', e.target.value)}
        className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm outline-none focus:border-[var(--primary)]"
        placeholder="Descrição"
      />
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
        className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-right outline-none focus:border-[var(--primary)]"
        min={0}
        step={0.1}
      />
      <input
        type="text"
        value={item.unit}
        onChange={(e) => onChange(item.id, 'unit', e.target.value)}
        className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-center outline-none focus:border-[var(--primary)]"
        placeholder="un"
      />
      <input
        type="number"
        value={item.unit_cost}
        onChange={(e) => onChange(item.id, 'unit_cost', parseFloat(e.target.value) || 0)}
        className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-right outline-none focus:border-[var(--primary)]"
        min={0}
        step={0.01}
      />
      <span className="text-sm font-medium text-right text-[var(--foreground)]">
        R$ {total.toFixed(2)}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        className="flex items-center justify-center rounded p-1.5 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
        title="Remover item"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
