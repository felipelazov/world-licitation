'use client'

import { useState } from 'react'

const RESULT_OPTIONS = [
  { value: 'adjudicado', label: 'Adjudicado', color: 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'classificado', label: 'Classificado (não vencedor)', color: 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'nao_classificado', label: 'Não Classificado', color: 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { value: 'desclassificado', label: 'Desclassificado', color: 'text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400' },
  { value: 'deserto', label: 'Deserto', color: 'text-gray-700 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400' },
  { value: 'fracassado', label: 'Fracassado', color: 'text-gray-700 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400' },
]

interface ResultFormProps {
  onSubmit: (data: {
    result: string
    finalPrice: number | null
    finalMarginPct: number | null
    classificationPosition: number | null
    observations: string
  }) => void
  isLoading?: boolean
}

export function ResultForm({ onSubmit, isLoading = false }: ResultFormProps) {
  const [result, setResult] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const [finalMarginPct, setFinalMarginPct] = useState('')
  const [position, setPosition] = useState('')
  const [observations, setObservations] = useState('')

  function handleSubmit() {
    if (!result) return
    onSubmit({
      result,
      finalPrice: finalPrice ? parseFloat(finalPrice) : null,
      finalMarginPct: finalMarginPct ? parseFloat(finalMarginPct) : null,
      classificationPosition: position ? parseInt(position) : null,
      observations,
    })
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-4">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Resultado do Pregão</h3>

      {/* Resultado */}
      <div className="flex flex-wrap gap-2">
        {RESULT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setResult(opt.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              result === opt.value ? opt.color : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Campos extras */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs text-[var(--muted-foreground)]">Preço Final (R$)</label>
          <input
            type="number"
            value={finalPrice}
            onChange={(e) => setFinalPrice(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            step={0.01}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--muted-foreground)]">Margem Final (%)</label>
          <input
            type="number"
            value={finalMarginPct}
            onChange={(e) => setFinalMarginPct(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            step={0.1}
          />
        </div>
        {result === 'classificado' && (
          <div>
            <label className="mb-1 block text-xs text-[var(--muted-foreground)]">Posição</label>
            <input
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              min={1}
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--muted-foreground)]">Observações</label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          rows={2}
          placeholder="Notas sobre o pregão..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!result || isLoading}
        className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? 'Salvando...' : 'Registrar Resultado'}
      </button>
    </div>
  )
}
