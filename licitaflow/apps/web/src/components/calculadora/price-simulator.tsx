'use client'

import { useMemo } from 'react'
import { calculateMarginFromPrice } from '@licitaflow/shared'

const ZONE_COLORS = {
  green: 'text-green-700 dark:text-green-400',
  yellow: 'text-yellow-700 dark:text-yellow-400',
  red: 'text-red-700 dark:text-red-400',
}

interface PriceSimulatorProps {
  costWithTax: number
  price: number
  onPriceChange: (price: number) => void
  floorPrice: number
}

export function PriceSimulator({ costWithTax, price, onPriceChange, floorPrice }: PriceSimulatorProps) {
  const result = useMemo(() => {
    return calculateMarginFromPrice(price, costWithTax)
  }, [price, costWithTax])

  // Range do slider: do custo até 2x o custo
  const minPrice = Math.floor(costWithTax * 0.8)
  const maxPrice = Math.ceil(costWithTax * 2)

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Simulador de Preço</h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">Preço de venda</span>
          <div className="flex items-center gap-1">
            <span className="text-sm text-[var(--muted-foreground)]">R$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
              className="w-24 rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-sm text-right outline-none focus:border-[var(--primary)]"
              min={0}
              step={0.5}
            />
          </div>
        </div>

        <input
          type="range"
          value={price}
          onChange={(e) => onPriceChange(parseFloat(e.target.value))}
          min={minPrice}
          max={maxPrice}
          step={0.5}
          className="w-full accent-[var(--primary)]"
        />

        <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
          <span>R$ {minPrice.toFixed(0)}</span>
          <span>R$ {maxPrice.toFixed(0)}</span>
        </div>
      </div>

      {/* Resultado */}
      <div className="flex items-center justify-between rounded-lg bg-[var(--muted)] p-3">
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Margem resultante</p>
          <p className={`text-lg font-bold ${ZONE_COLORS[result.zone]}`}>
            {result.marginPct.toFixed(1)}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--muted-foreground)]">Lucro por unidade</p>
          <p className={`text-lg font-bold ${ZONE_COLORS[result.zone]}`}>
            R$ {result.marginValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Aviso de piso */}
      {price < floorPrice && (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">
          Preço abaixo do piso (R$ {floorPrice.toFixed(2)}). Margem insuficiente!
        </p>
      )}
    </div>
  )
}
