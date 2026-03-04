'use client'

import { Check, X, AlertTriangle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { HabilitacaoResult } from '@licitaflow/shared'

interface HabilitacaoChecklistProps {
  result: HabilitacaoResult
  editalId: string
}

const STATUS_ICONS = {
  ok: { icon: Check, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  expiring: { icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  expired: { icon: X, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  missing: { icon: X, color: 'text-gray-400', bg: 'bg-gray-100 dark:bg-gray-900/30' },
}

export function HabilitacaoChecklist({ result, editalId }: HabilitacaoChecklistProps) {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className={`rounded-lg p-3 ${result.isReady ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
        <p className={`text-sm font-semibold ${result.isReady ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
          {result.isReady
            ? 'Habilitação completa!'
            : `Faltam ${result.totalMissing + result.totalExpired} documento${result.totalMissing + result.totalExpired > 1 ? 's' : ''}`}
        </p>
        <p className="text-xs text-[var(--muted-foreground)]">
          {result.totalOk}/{result.totalRequired} documentos obrigatórios em dia
        </p>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {result.items.map((item, index) => {
          const config = STATUS_ICONS[item.status]
          const Icon = config.icon

          return (
            <div key={index} className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-3">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[var(--foreground)]">{item.requirement.name}</p>
                  {!item.requirement.required && (
                    <span className="text-[10px] text-[var(--muted-foreground)]">Opcional</span>
                  )}
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{item.requirement.description}</p>

                {item.matchedDocument ? (
                  <p className="mt-1 text-xs text-[var(--primary)]">
                    Vinculado: {item.matchedDocument.name}
                  </p>
                ) : (
                  <Link
                    href="/documentos"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
                  >
                    Fazer upload
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
