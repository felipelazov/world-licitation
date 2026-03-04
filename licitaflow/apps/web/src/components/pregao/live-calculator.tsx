'use client'

import { useState, useMemo } from 'react'
import { calculateMarginFromPrice } from '@licitaflow/shared'
import { MarginBar } from './margin-bar'

interface LiveCalculatorProps {
  costWithTax: number
  floorPrice: number
  floorMarginPct: number
  lowestBid: number | null
  onRegisterBid: (value: number) => void
}

export function LiveCalculator({
  costWithTax,
  floorPrice,
  floorMarginPct,
  lowestBid,
  onRegisterBid,
}: LiveCalculatorProps) {
  const [bidValue, setBidValue] = useState('')

  const value = parseFloat(bidValue) || 0

  const marginResult = useMemo(() => {
    return calculateMarginFromPrice(value, costWithTax)
  }, [value, costWithTax])

  function handleCoverLowest() {
    if (lowestBid && lowestBid > 0) {
      const cover = (lowestBid - 0.01).toFixed(2)
      setBidValue(cover)
    }
  }

  function handleRegister() {
    if (value <= 0) return
    onRegisterBid(value)
    setBidValue('')
  }

  const isBelowFloor = value > 0 && value < floorPrice

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Calculadora ao Vivo</h3>

      <div>
        <label className="mb-1 block text-xs text-[var(--muted-foreground)]">Valor do lance (R$)</label>
        <input
          type="number"
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
          placeholder="0,00"
          className={`w-full rounded-lg border bg-[var(--background)] px-3 py-2 text-lg font-bold outline-none ${
            isBelowFloor
              ? 'border-red-500 text-red-600'
              : 'border-[var(--border)] text-[var(--foreground)] focus:border-[var(--primary)]'
          }`}
          min={0}
          step={0.01}
        />
      </div>

      {/* Resultado em tempo real */}
      {value > 0 && (
        <div className="space-y-2">
          <MarginBar marginPct={marginResult.marginPct} floorPct={floorMarginPct} />

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-xs text-[var(--muted-foreground)]">Margem</span>
              <p className={`font-bold ${
                marginResult.zone === 'green' ? 'text-green-600' :
                marginResult.zone === 'yellow' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {marginResult.marginPct.toFixed(1)}%
              </p>
            </div>
            <div>
              <span className="text-xs text-[var(--muted-foreground)]">Lucro</span>
              <p className={`font-bold ${marginResult.marginValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {marginResult.marginValue.toFixed(2)}
              </p>
            </div>
          </div>

          {isBelowFloor && (
            <p className="text-xs font-semibold text-red-600">
              ABAIXO DO PISO! (Piso: R$ {floorPrice.toFixed(2)})
            </p>
          )}
        </div>
      )}

      {/* Ações */}
      <div className="flex gap-2">
        <button
          onClick={handleRegister}
          disabled={value <= 0}
          className="flex-1 rounded-lg bg-[var(--primary)] py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
        >
          Registrar Lance
        </button>
        {lowestBid && (
          <button
            onClick={handleCoverLowest}
            className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--foreground)] hover:bg-[var(--muted)]"
            title={`Menor lance: R$ ${lowestBid.toFixed(2)}`}
          >
            Cobrir -R$0,01
          </button>
        )}
      </div>
    </div>
  )
}
