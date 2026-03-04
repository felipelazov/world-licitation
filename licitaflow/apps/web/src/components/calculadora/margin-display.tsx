'use client'

import type { MarginResult } from '@licitaflow/shared'

const ZONE_COLORS = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/10',
    text: 'text-green-700 dark:text-green-400',
    bar: 'bg-green-500',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/10',
    text: 'text-yellow-700 dark:text-yellow-400',
    bar: 'bg-yellow-500',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/10',
    text: 'text-red-700 dark:text-red-400',
    bar: 'bg-red-500',
  },
}

interface MarginDisplayProps {
  result: MarginResult
}

export function MarginDisplay({ result }: MarginDisplayProps) {
  const colors = ZONE_COLORS[result.zone]

  return (
    <div className={`rounded-lg border border-[var(--border)] p-4 space-y-4 ${colors.bg}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Cálculo de Margem</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
          {result.zoneLabel}
        </span>
      </div>

      {/* Barra de margem */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
          <span>0%</span>
          <span>Margem: {result.desiredMarginPct}%</span>
          <span>30%+</span>
        </div>
        <div className="h-3 rounded-full bg-[var(--muted)] overflow-hidden relative">
          {/* Zona vermelha 0-5% */}
          <div className="absolute left-0 top-0 h-full bg-red-200 dark:bg-red-900/40" style={{ width: '16.7%' }} />
          {/* Zona amarela 5-10% */}
          <div className="absolute top-0 h-full bg-yellow-200 dark:bg-yellow-900/40" style={{ left: '16.7%', width: '16.7%' }} />
          {/* Zona verde 10%+ */}
          <div className="absolute top-0 h-full bg-green-200 dark:bg-green-900/40" style={{ left: '33.3%', width: '66.7%' }} />
          {/* Indicador */}
          <div
            className={`absolute top-0 h-full ${colors.bar} opacity-80 rounded-full transition-all`}
            style={{ width: `${Math.min(Math.max(result.desiredMarginPct / 30, 0), 1) * 100}%` }}
          />
        </div>
      </div>

      {/* Valores */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Custo Total (c/ impostos)</p>
          <p className="font-semibold text-[var(--foreground)]">R$ {result.costWithTax.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Preço de Venda</p>
          <p className="font-semibold text-[var(--foreground)]">R$ {result.sellingPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Preço Piso</p>
          <p className="font-semibold text-red-600 dark:text-red-400">R$ {result.floorPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Margem em R$</p>
          <p className={`font-semibold ${colors.text}`}>R$ {result.desiredMarginValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Referência */}
      {result.referencePrice && (
        <div className="border-t border-[var(--border)] pt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Preço Referência Edital</span>
            <span className="font-medium text-[var(--foreground)]">R$ {result.referencePrice.toFixed(2)}</span>
          </div>
          {result.referenceDiffPct !== null && (
            <p className={`text-xs mt-1 ${result.referenceDiffPct <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {result.referenceDiffPct > 0 ? '+' : ''}{result.referenceDiffPct.toFixed(1)}% em relação à referência
              ({result.referenceDiffValue! > 0 ? '+' : ''}R$ {result.referenceDiffValue!.toFixed(2)})
            </p>
          )}
        </div>
      )}
    </div>
  )
}
