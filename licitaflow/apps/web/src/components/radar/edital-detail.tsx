'use client'

import { useState } from 'react'
import {
  Building2,
  Calendar,
  DollarSign,
  ExternalLink,
  MapPin,
  Tag,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react'
import { StatusBadge } from './status-badge'
import { EditalTimeline } from './edital-timeline'
import { PdfViewer } from './pdf-viewer'
import { Countdown } from '@licitaflow/ui'
import Link from 'next/link'

interface EditalDetailProps {
  edital: {
    id: string
    title: string
    object: string
    agency: string
    estimated_value: number | null
    session_date: string | null
    publication_date: string
    status: string
    portal_url: string
    modalidade: string
    pdf_url: string | null
    uasg: string | null
    delivery_location: string | null
    raw_data: Record<string, unknown> | null
    edital_sources?: { name: string; slug: string } | null
  }
  onStatusChange: (newStatus: string) => void
}

function formatCurrency(value: number | null): string {
  if (!value) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function formatDatetime(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

const MODALIDADE_LABELS: Record<string, string> = {
  pregao_eletronico: 'Pregão Eletrônico',
  pregao_presencial: 'Pregão Presencial',
  concorrencia: 'Concorrência',
  tomada_precos: 'Tomada de Preços',
  convite: 'Convite',
  dispensa: 'Dispensa',
  inexigibilidade: 'Inexigibilidade',
  chamada_publica: 'Chamada Pública',
}

const STATUS_ACTIONS: Record<string, { label: string; target: string; variant: 'primary' | 'secondary' | 'danger' }[]> = {
  novo: [
    { label: 'Analisar', target: 'analisando', variant: 'primary' },
    { label: 'Descartar', target: 'descartado', variant: 'danger' },
  ],
  analisando: [
    { label: 'Marcar GO', target: 'go', variant: 'primary' },
    { label: 'Marcar NO-GO', target: 'no_go', variant: 'danger' },
  ],
  go: [
    { label: 'Criar Proposta', target: 'proposta_enviada', variant: 'primary' },
  ],
  proposta_enviada: [
    { label: 'Entrou em Pregão', target: 'em_pregao', variant: 'primary' },
  ],
  em_pregao: [
    { label: 'Adjudicado', target: 'adjudicado', variant: 'primary' },
    { label: 'Não Adjudicado', target: 'nao_adjudicado', variant: 'danger' },
  ],
  adjudicado: [
    { label: 'Contrato Assinado', target: 'contrato', variant: 'primary' },
  ],
}

export function EditalDetail({ edital, onStatusChange }: EditalDetailProps) {
  const [showMetadata, setShowMetadata] = useState(false)
  const actions = STATUS_ACTIONS[edital.status] ?? []

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main content — 2 cols */}
      <div className="space-y-6 lg:col-span-2">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={edital.status} size="md" />
            {edital.edital_sources && (
              <span className="text-sm text-[var(--muted-foreground)]">
                {edital.edital_sources.name}
              </span>
            )}
          </div>
          <h1 className="mt-2 text-xl font-bold text-[var(--foreground)]">{edital.title}</h1>
        </div>

        {/* Dados principais */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
          {/* Objeto */}
          <div>
            <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              Objeto
            </h3>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{edital.object}</p>
          </div>

          {/* Grid de dados */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <InfoItem icon={Building2} label="Órgão" value={edital.agency} />
            <InfoItem icon={DollarSign} label="Valor Estimado" value={formatCurrency(edital.estimated_value)} />
            <InfoItem icon={Tag} label="Modalidade" value={MODALIDADE_LABELS[edital.modalidade] ?? edital.modalidade} />
            {edital.uasg && <InfoItem icon={FileText} label="UASG" value={edital.uasg} />}
            <InfoItem icon={Calendar} label="Publicação" value={formatDate(edital.publication_date)} />
            <div>
              <InfoItem icon={Clock} label="Sessão" value={formatDatetime(edital.session_date)} />
              <Countdown date={edital.session_date} size="sm" />
            </div>
            {edital.delivery_location && (
              <InfoItem icon={MapPin} label="Local de Entrega" value={edital.delivery_location} />
            )}
          </div>

          {/* Portal link */}
          <a
            href={edital.portal_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir no portal original
          </a>
        </div>

        {/* PDF Viewer */}
        <PdfViewer url={edital.pdf_url} />

        {/* Metadata colapsável */}
        {edital.raw_data && Object.keys(edital.raw_data).length > 0 && (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)]">
            <button
              onClick={() => setShowMetadata(!showMetadata)}
              className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]"
            >
              <span>Dados do Scraping</span>
              {showMetadata ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showMetadata && (
              <div className="border-t border-[var(--border)] px-5 py-3">
                <pre className="overflow-x-auto text-xs text-[var(--muted-foreground)]">
                  {JSON.stringify(edital.raw_data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar — 1 col */}
      <div className="space-y-6">
        {/* Ações */}
        {actions.length > 0 && (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Ações</h3>
            {actions.map((action) => (
              <button
                key={action.target}
                onClick={() => onStatusChange(action.target)}
                className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  action.variant === 'primary'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90'
                    : action.variant === 'danger'
                      ? 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40'
                      : 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Countdown grande */}
        {edital.session_date && (
          <Countdown date={edital.session_date} size="lg" />
        )}

        {/* Timeline */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
          <EditalTimeline currentStatus={edital.status} />
        </div>

        {/* Link para análise GO/NO-GO */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-2">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Análise GO/NO-GO</h3>
          <Link
            href={`/analises/${edital.id}`}
            className="block w-full rounded-lg border border-[var(--border)] px-4 py-2 text-center text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            {edital.status === 'go' || edital.status === 'no_go' ? 'Ver Análise' : 'Fazer Análise'}
          </Link>
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{value}</p>
    </div>
  )
}
