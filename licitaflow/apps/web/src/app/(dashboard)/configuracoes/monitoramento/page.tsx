'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, Save, ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { SUGGESTED_KEYWORDS } from '@/components/radar/filter-form'

const UF_OPTIONS = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
  'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO',
]

const MODALIDADE_OPTIONS = [
  { value: 1, label: 'Leilao' },
  { value: 2, label: 'Dialogo Competitivo' },
  { value: 3, label: 'Concurso' },
  { value: 4, label: 'Concorrencia' },
  { value: 5, label: 'Tomada de Precos' },
  { value: 6, label: 'Pregao Eletronico' },
  { value: 7, label: 'Pregao Presencial' },
  { value: 8, label: 'Dispensa de Licitacao' },
  { value: 9, label: 'Inexigibilidade' },
]

interface MonitoringConfig {
  ufs: string[]
  keywords: string[]
  modalidades: number[]
  valor_min: number | null
  valor_max: number | null
  relevance_threshold: number
  sync_enabled: boolean
  notify_on_new_edital: boolean
}

const DEFAULT_CONFIG: MonitoringConfig = {
  ufs: ['SP'],
  keywords: ['cesta basica', 'generos alimenticios', 'kit alimentacao'],
  modalidades: [6],
  valor_min: null,
  valor_max: null,
  relevance_threshold: 40,
  sync_enabled: true,
  notify_on_new_edital: true,
}

export default function MonitoramentoPage() {
  const [config, setConfig] = useState<MonitoringConfig>(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newKeyword, setNewKeyword] = useState('')

  const loadConfig = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/monitoring')
      const json = await res.json()
      if (json.data) {
        setConfig({
          ufs: json.data.ufs || [],
          keywords: json.data.keywords || [],
          modalidades: json.data.modalidades || [6],
          valor_min: json.data.valor_min,
          valor_max: json.data.valor_max,
          relevance_threshold: json.data.relevance_threshold || 40,
          sync_enabled: json.data.sync_enabled ?? true,
          notify_on_new_edital: json.data.notify_on_new_edital ?? true,
        })
      }
    } catch {
      // use defaults
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadConfig()
  }, [loadConfig])

  async function handleSave() {
    setSaving(true)
    try {
      await fetch('/api/monitoring', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      // silently fail
    }
    setSaving(false)
  }

  function toggleUf(uf: string) {
    setConfig(prev => ({
      ...prev,
      ufs: prev.ufs.includes(uf)
        ? prev.ufs.filter(u => u !== uf)
        : [...prev.ufs, uf],
    }))
  }

  function toggleModalidade(mod: number) {
    setConfig(prev => ({
      ...prev,
      modalidades: prev.modalidades.includes(mod)
        ? prev.modalidades.filter(m => m !== mod)
        : [...prev.modalidades, mod],
    }))
  }

  function addKeyword() {
    const kw = newKeyword.trim().toLowerCase()
    if (kw && !config.keywords.includes(kw)) {
      setConfig(prev => ({ ...prev, keywords: [...prev.keywords, kw] }))
      setNewKeyword('')
    }
  }

  function removeKeyword(kw: string) {
    setConfig(prev => ({ ...prev, keywords: prev.keywords.filter(k => k !== kw) }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/configuracoes"
          className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Monitoramento de Editais</h1>
          <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
            Define o que o sistema busca nos portais publicos (PNCP). Esses criterios controlam a sincronizacao automatica.
          </p>
        </div>
      </div>

      {/* Sync toggle */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Sincronizacao automatica</h3>
          <p className="text-xs text-[var(--muted-foreground)]">Buscar novos editais nos portais publicos</p>
        </div>
        <button
          onClick={() => setConfig(prev => ({ ...prev, sync_enabled: !prev.sync_enabled }))}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            config.sync_enabled ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
          }`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            config.sync_enabled ? 'left-[22px]' : 'left-0.5'
          }`} />
        </button>
      </div>

      {/* UFs */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Estados (UFs)</h2>
        <p className="text-xs text-[var(--muted-foreground)]">Selecione os estados que deseja monitorar</p>
        <div className="flex flex-wrap gap-1.5">
          {UF_OPTIONS.map(uf => (
            <button
              key={uf}
              onClick={() => toggleUf(uf)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                config.ufs.includes(uf)
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
            >
              {uf}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Palavras-chave</h2>
        <p className="text-xs text-[var(--muted-foreground)]">Termos para identificar editais relevantes ao seu negocio</p>
        <div className="flex flex-wrap gap-1.5">
          {config.keywords.map(kw => (
            <span
              key={kw}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {kw}
              <button onClick={() => removeKeyword(kw)} className="hover:text-red-500">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
            placeholder="Adicionar palavra-chave..."
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm outline-none focus:border-[var(--primary)]"
          />
          <button
            onClick={addKeyword}
            className="flex items-center gap-1 rounded-lg bg-[var(--muted)] px-3 py-1.5 text-sm text-[var(--foreground)] hover:bg-[var(--accent)]"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar
          </button>
        </div>
        {SUGGESTED_KEYWORDS.filter(s => !config.keywords.includes(s)).length > 0 && (
          <div>
            <span className="text-xs text-[var(--muted-foreground)]">Sugestoes:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {SUGGESTED_KEYWORDS.filter(s => !config.keywords.includes(s)).map(s => (
                <button
                  key={s}
                  onClick={() => setConfig(prev => ({ ...prev, keywords: [...prev.keywords, s] }))}
                  className="rounded-full border border-dashed border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modalidades */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Modalidades de Licitacao</h2>
        <div className="flex flex-wrap gap-1.5">
          {MODALIDADE_OPTIONS.map(mod => (
            <button
              key={mod.value}
              onClick={() => toggleModalidade(mod.value)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                config.modalidades.includes(mod.value)
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      {/* Valor range + threshold */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Filtros de Valor</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Valor minimo (R$)</label>
            <input
              type="number"
              value={config.valor_min ?? ''}
              onChange={(e) => setConfig(prev => ({ ...prev, valor_min: e.target.value ? Number(e.target.value) : null }))}
              placeholder="Sem minimo"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Valor maximo (R$)</label>
            <input
              type="number"
              value={config.valor_max ?? ''}
              onChange={(e) => setConfig(prev => ({ ...prev, valor_max: e.target.value ? Number(e.target.value) : null }))}
              placeholder="Sem maximo"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Score minimo (0-100)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={config.relevance_threshold}
              onChange={(e) => setConfig(prev => ({ ...prev, relevance_threshold: Number(e.target.value) || 0 }))}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      {/* Notificacoes toggle */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Notificar novos editais</h3>
          <p className="text-xs text-[var(--muted-foreground)]">Receber alerta quando editais relevantes forem encontrados</p>
        </div>
        <button
          onClick={() => setConfig(prev => ({ ...prev, notify_on_new_edital: !prev.notify_on_new_edital }))}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            config.notify_on_new_edital ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
          }`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            config.notify_on_new_edital ? 'left-[22px]' : 'left-0.5'
          }`} />
        </button>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saved ? 'Salvo!' : 'Salvar Configuracoes'}
      </button>
    </div>
  )
}
