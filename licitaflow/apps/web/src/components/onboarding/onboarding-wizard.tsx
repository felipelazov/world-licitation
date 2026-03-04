'use client'

import { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, Building2, Filter, FileUp, Calculator } from 'lucide-react'

interface OnboardingWizardProps {
  onComplete: (data: {
    companyName: string
    cnpj: string
    segment: string
    region: string
    capacity: string
    keywords: string[]
  }) => Promise<void>
}

const STEPS = [
  { id: 1, title: 'Dados da Empresa', icon: Building2 },
  { id: 2, title: 'Filtros de Monitoramento', icon: Filter },
  { id: 3, title: 'Documentos', icon: FileUp },
  { id: 4, title: 'Planilha de Custo', icon: Calculator },
]

const DEFAULT_KEYWORDS = [
  'cesta basica',
  'generos alimenticios',
  'alimentacao escolar',
  'merenda',
  'kit alimentacao',
]

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [companyName, setCompanyName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [segment, setSegment] = useState('cesta_basica')
  const [region, setRegion] = useState('')
  const [capacity, setCapacity] = useState('')
  const [keywords, setKeywords] = useState<string[]>(DEFAULT_KEYWORDS)
  const [saving, setSaving] = useState(false)

  async function handleComplete() {
    setSaving(true)
    await onComplete({ companyName, cnpj, segment, region, capacity, keywords })
    setSaving(false)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-1">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isActive = step === s.id
          const isDone = step > s.id

          return (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
                isActive ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' :
                isDone ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                'bg-[var(--muted)] text-[var(--muted-foreground)]'
              }`}>
                {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                <span className="text-xs font-medium hidden sm:inline">{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-1 h-0.5 w-6 ${step > s.id ? 'bg-green-500' : 'bg-[var(--muted)]'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1: Dados da empresa */}
      {step === 1 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Dados da Empresa</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Essas informações nos ajudam a personalizar sua experiência.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Razão Social</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">CNPJ</label>
              <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0000-00"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Segmento</label>
              <select value={segment} onChange={(e) => setSegment(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]">
                <option value="cesta_basica">Cesta Básica</option>
                <option value="alimentacao_escolar">Alimentação Escolar (PNAE)</option>
                <option value="generos_alimenticios">Gêneros Alimentícios</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Região de Entrega</label>
              <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Ex: Grande SP, Campinas"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Capacidade mensal (ex: 3.000 cestas/mês)</label>
              <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Filtros */}
      {step === 2 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Filtros de Monitoramento</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Selecione as palavras-chave para buscar editais automaticamente.
          </p>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => {
                  setKeywords((prev) =>
                    prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
                  )
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  keywords.includes(kw)
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Documentos */}
      {step === 3 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Documentos de Habilitação</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Você pode fazer upload agora ou depois. Acesse <strong>Documentos</strong> no menu lateral a qualquer momento.
          </p>
          <div className="rounded-lg border border-dashed border-[var(--border)] p-8 text-center">
            <FileUp className="mx-auto mb-2 h-8 w-8 text-[var(--muted-foreground)]" />
            <p className="text-sm text-[var(--muted-foreground)]">Upload disponível na tela de Documentos</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Pule este passo se preferir fazer depois.</p>
          </div>
        </div>
      )}

      {/* Step 4: Planilha */}
      {step === 4 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Planilha de Custo Base</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Uma planilha modelo de cesta básica será criada automaticamente. Você pode editá-la depois na <strong>Calculadora</strong>.
          </p>
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/10">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Template "Cesta Básica" com 17 itens será criado automaticamente.
            </p>
            <p className="text-xs text-green-600 dark:text-green-300 mt-1">
              Inclui: matéria-prima, embalagem, mão de obra, frete e custos fixos.
            </p>
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-50 hover:bg-[var(--muted)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            Próximo
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? 'Configurando...' : 'Concluir Setup'}
            <Check className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
