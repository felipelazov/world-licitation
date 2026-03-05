'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

export const SUGGESTED_KEYWORDS = [
  'cesta basica',
  'generos alimenticios',
  'kit alimentacao',
  'merenda escolar',
  'alimentacao escolar',
  'alimentos nao pereciveis',
  'cesta de alimentos',
  'hortifruti',
  'carne bovina',
  'leite',
]

const REGIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
]

const MODALIDADES = [
  { value: 'pregao_eletronico', label: 'Pregão Eletrônico' },
  { value: 'pregao_presencial', label: 'Pregão Presencial' },
  { value: 'concorrencia', label: 'Concorrência' },
  { value: 'chamada_publica', label: 'Chamada Pública' },
  { value: 'dispensa', label: 'Dispensa' },
]

interface FilterFormData {
  name: string
  keywords: string[]
  regions: string[]
  modalidades: string[]
  min_value: string
  max_value: string
}

interface FilterFormProps {
  initialData?: {
    id?: string
    name: string
    keywords: string[]
    regioes?: string[] | null
    modalidades?: string[] | null
    valor_min?: number | null
    valor_max?: number | null
  }
  onSubmit: (data: {
    name: string
    keywords: string[]
    regioes: string[]
    modalidades: string[]
    valor_min: number | null
    valor_max: number | null
  }) => void
  onCancel: () => void
  isLoading?: boolean
}

export function FilterForm({ initialData, onSubmit, onCancel, isLoading }: FilterFormProps) {
  const [form, setForm] = useState<FilterFormData>({
    name: initialData?.name ?? '',
    keywords: initialData?.keywords ?? [],
    regions: initialData?.regioes ?? [],
    modalidades: initialData?.modalidades ?? ['pregao_eletronico'],
    min_value: initialData?.valor_min?.toString() ?? '',
    max_value: initialData?.valor_max?.toString() ?? '',
  })
  const [keywordInput, setKeywordInput] = useState('')
  const [error, setError] = useState('')

  function addKeyword(kw: string) {
    const trimmed = kw.trim().toLowerCase()
    if (!trimmed || form.keywords.includes(trimmed)) return
    setForm((prev) => ({ ...prev, keywords: [...prev.keywords, trimmed] }))
    setKeywordInput('')
  }

  function removeKeyword(kw: string) {
    setForm((prev) => ({ ...prev, keywords: prev.keywords.filter((k) => k !== kw) }))
  }

  function toggleRegion(region: string) {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }))
  }

  function toggleModalidade(mod: string) {
    setForm((prev) => ({
      ...prev,
      modalidades: prev.modalidades.includes(mod)
        ? prev.modalidades.filter((m) => m !== mod)
        : [...prev.modalidades, mod],
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Nome do filtro é obrigatório')
      return
    }
    if (form.keywords.length === 0) {
      setError('Adicione pelo menos 1 palavra-chave')
      return
    }

    onSubmit({
      name: form.name.trim(),
      keywords: form.keywords,
      regioes: form.regions,
      modalidades: form.modalidades,
      valor_min: form.min_value ? parseFloat(form.min_value) : null,
      valor_max: form.max_value ? parseFloat(form.max_value) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-[var(--destructive)]/10 px-4 py-2 text-sm text-[var(--destructive)]">
          {error}
        </div>
      )}

      {/* Nome */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Nome do Filtro
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Ex: Cesta Básica SP"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Palavras-chave */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Palavras-chave
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addKeyword(keywordInput)
              }
            }}
            placeholder="Digite e pressione Enter"
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
          <button
            type="button"
            onClick={() => addKeyword(keywordInput)}
            className="rounded-lg bg-[var(--primary)] px-3 py-2 text-sm text-[var(--primary-foreground)] hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {form.keywords.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {form.keywords.map((kw) => (
              <span
                key={kw}
                className="flex items-center gap-1 rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--primary)]"
              >
                {kw}
                <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-[var(--destructive)]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Sugestões */}
        <div className="mt-2">
          <span className="text-xs text-[var(--muted-foreground)]">Sugestões:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {SUGGESTED_KEYWORDS.filter((s) => !form.keywords.includes(s)).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addKeyword(s)}
                className="rounded-full border border-dashed border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Regiões */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Regiões (opcional)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => toggleRegion(r)}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                form.regions.includes(r)
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Faixa de valor */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Faixa de valor estimado (opcional)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={form.min_value}
            onChange={(e) => setForm((prev) => ({ ...prev, min_value: e.target.value }))}
            placeholder="R$ mínimo"
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
          />
          <span className="text-[var(--muted-foreground)]">—</span>
          <input
            type="number"
            value={form.max_value}
            onChange={(e) => setForm((prev) => ({ ...prev, max_value: e.target.value }))}
            placeholder="R$ máximo"
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Modalidades */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Modalidades
        </label>
        <div className="flex flex-wrap gap-2">
          {MODALIDADES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => toggleModalidade(m.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                form.modalidades.includes(m.value)
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : initialData?.id ? 'Salvar' : 'Criar Filtro'}
        </button>
      </div>
    </form>
  )
}
