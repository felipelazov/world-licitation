'use client'

import { Pencil, Trash2, Power } from 'lucide-react'

interface FilterCardProps {
  filter: {
    id: string
    name: string
    keywords: string[]
    active: boolean
    config?: Record<string, unknown>
  }
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggle: (id: string, active: boolean) => void
}

export function FilterCard({ filter, onEdit, onDelete, onToggle }: FilterCardProps) {
  const config = filter.config as {
    regions?: string[]
    min_value?: number
    max_value?: number
    modalidades?: string[]
  } | undefined

  return (
    <div
      className={`rounded-lg border p-4 transition-colors ${
        filter.active
          ? 'border-green-500/30 bg-green-500/5'
          : 'border-[var(--border)] bg-[var(--card)] opacity-60'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                filter.active ? 'bg-green-500' : 'bg-[var(--muted-foreground)]'
              }`}
            />
            <h3 className="font-medium text-[var(--foreground)]">{filter.name}</h3>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {filter.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--primary)]"
              >
                {kw}
              </span>
            ))}
          </div>

          {(config?.regions?.length || config?.min_value || config?.max_value) && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--muted-foreground)]">
              {config?.regions?.length ? (
                <span>Regiões: {config.regions.join(', ')}</span>
              ) : null}
              {config?.min_value || config?.max_value ? (
                <span>
                  Valor:{' '}
                  {config?.min_value ? `R$ ${config.min_value.toLocaleString('pt-BR')}` : '—'}
                  {' — '}
                  {config?.max_value ? `R$ ${config.max_value.toLocaleString('pt-BR')}` : '—'}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggle(filter.id, !filter.active)}
            className={`rounded p-1.5 transition-colors hover:bg-[var(--muted)] ${
              filter.active ? 'text-green-500' : 'text-[var(--muted-foreground)]'
            }`}
            title={filter.active ? 'Desativar' : 'Ativar'}
          >
            <Power className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(filter.id)}
            className="rounded p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(filter.id)}
            className="rounded p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
            title="Excluir"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
