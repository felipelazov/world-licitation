'use client'

import { useState } from 'react'
import { Check, X, AlertTriangle } from 'lucide-react'

interface ChecklistItem {
  id: string
  label: string
  autoChecked: boolean
  isCritical: boolean
}

interface PreSessionChecklistProps {
  items: ChecklistItem[]
  onClose: () => void
  onStart: () => void
}

export function PreSessionChecklist({ items, onClose, onStart }: PreSessionChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    return new Set(items.filter((i) => i.autoChecked).map((i) => i.id))
  })

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const criticalMissing = items.filter((i) => i.isCritical && !checked.has(i.id))
  const totalChecked = checked.size
  const totalItems = items.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-[var(--card)] shadow-xl">
        <div className="border-b border-[var(--border)] px-4 py-3">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">Checklist Pré-Sessão</h3>
          <p className="text-xs text-[var(--muted-foreground)]">
            {totalChecked}/{totalItems} itens conferidos
          </p>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 space-y-2">
          {items.map((item) => {
            const isChecked = checked.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                  isChecked
                    ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/10'
                    : item.isCritical
                      ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10'
                      : 'border-[var(--border)]'
                }`}
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                  isChecked ? 'bg-green-500 text-white' : 'border border-[var(--border)]'
                }`}>
                  {isChecked && <Check className="h-3 w-3" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--foreground)]">{item.label}</p>
                  {item.autoChecked && (
                    <p className="text-xs text-green-600 dark:text-green-400">Verificado automaticamente</p>
                  )}
                </div>
                {item.isCritical && !isChecked && (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                )}
              </button>
            )
          })}
        </div>

        {criticalMissing.length > 0 && (
          <div className="mx-4 mb-3 rounded-lg bg-red-50 p-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <strong>Atenção:</strong> {criticalMissing.length} item(ns) crítico(s) não conferido(s).
          </div>
        )}

        <div className="flex justify-end gap-2 border-t border-[var(--border)] px-4 py-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]"
          >
            Cancelar
          </button>
          <button
            onClick={onStart}
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            {criticalMissing.length > 0 ? 'Iniciar mesmo assim' : 'Iniciar Sessão'}
          </button>
        </div>
      </div>
    </div>
  )
}
