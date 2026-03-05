'use client'

import { useEffect, useState } from 'react'
import {
  X, Building2, Calendar, DollarSign, MapPin, Star, ExternalLink, FileText,
  Scale, Clock, AlertTriangle, CheckCircle2, Loader2, Gavel, Info, Target,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface EditalFull {
  id: string
  numero: string | null
  objeto: string
  orgao: string
  orgao_cnpj: string | null
  valor_estimado: number | null
  data_sessao: string | null
  data_publicacao: string | null
  status: string
  portal_url: string | null
  link_sistema_origem: string | null
  modalidade: string | null
  uf: string | null
  municipio_ibge: string | null
  local_entrega: string | null
  relevance_score: number | null
  pncp_id: string | null
  external_id: string | null
  synced_at: string | null
  raw_data: RawPNCP | null
  edital_sources: { name: string } | null
}

interface RawPNCP {
  processo?: string
  srp?: boolean
  amparoLegal?: { nome: string; descricao: string }
  modalidadeNome?: string
  modoDisputaNome?: string
  situacaoCompraNome?: string
  valorTotalEstimado?: number
  valorTotalHomologado?: number
  dataPublicacaoPncp?: string
  dataAberturaProposta?: string
  dataEncerramentoProposta?: string
  linkSistemaOrigem?: string
  informacaoComplementar?: string
  objetoCompra?: string
  orgaoEntidade?: { cnpj: string; razaoSocial: string; esferaId: string; poderId: string }
  unidadeOrgao?: { ufNome: string; ufSigla: string; municipioNome: string; codigoIbge: string; nomeUnidade: string }
  fontesOrcamentarias?: Array<{ valor: number; fonte: string }>
}

function fmt(value: number | null | undefined): string {
  if (!value) return 'Nao informado'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function fmtDate(d: string | null | undefined): string {
  if (!d) return 'Nao informado'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(d))
}

function diasRestantes(d: string | null | undefined): { text: string; urgent: boolean } {
  if (!d) return { text: 'Sem data definida', urgent: false }
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return { text: `Encerrado ha ${Math.abs(diff)} dia(s)`, urgent: true }
  if (diff === 0) return { text: 'HOJE', urgent: true }
  if (diff <= 3) return { text: `${diff} dia(s) restante(s)`, urgent: true }
  return { text: `${diff} dias restantes`, urgent: false }
}

function getScoreColor(score: number | null): string {
  if (!score) return 'text-gray-400'
  if (score >= 70) return 'text-green-500'
  if (score >= 40) return 'text-yellow-500'
  return 'text-red-400'
}

function getScoreLabel(score: number | null): string {
  if (!score) return 'Sem score'
  if (score >= 70) return 'Alta relevancia'
  if (score >= 40) return 'Media relevancia'
  return 'Baixa relevancia'
}

function getVeredicto(edital: EditalFull): { tipo: 'go' | 'atencao' | 'no_go'; texto: string; motivos: string[] } {
  const motivos: string[] = []
  const score = edital.relevance_score || 0
  const valor = edital.valor_estimado
  const raw = edital.raw_data
  const encerramento = raw?.dataEncerramentoProposta

  // Check prazo
  if (encerramento) {
    const diff = Math.ceil((new Date(encerramento).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (diff < 0) {
      motivos.push('Prazo ja encerrado')
      return { tipo: 'no_go', texto: 'Prazo encerrado', motivos }
    }
    if (diff <= 2) motivos.push(`Prazo apertado: ${diff} dia(s)`)
    else motivos.push(`Prazo OK: ${diff} dias`)
  }

  // Check score
  if (score >= 60) motivos.push(`Score alto (${score}/100) — bom match com seu perfil`)
  else if (score >= 30) motivos.push(`Score medio (${score}/100) — verificar objeto detalhadamente`)
  else motivos.push(`Score baixo (${score}/100) — provavelmente fora do perfil`)

  // Check valor
  if (valor) {
    if (valor > 5000000) motivos.push(`Valor alto (${fmt(valor)}) — verificar capacidade de entrega`)
    else if (valor > 100000) motivos.push(`Valor compativel (${fmt(valor)})`)
    else motivos.push(`Valor pequeno (${fmt(valor)}) — margem pode ser apertada`)
  } else {
    motivos.push('Valor nao informado — verificar no edital completo')
  }

  // Check SRP
  if (raw?.srp) motivos.push('SRP (Registro de Preco) — compromisso sob demanda, menor risco')

  // Check modalidade
  if (raw?.modalidadeNome) motivos.push(`Modalidade: ${raw.modalidadeNome}`)

  // Check disputa
  if (raw?.modoDisputaNome) motivos.push(`Modo de disputa: ${raw.modoDisputaNome}`)

  // Veredicto
  if (score >= 60 && valor && valor < 5000000) {
    return { tipo: 'go', texto: 'Recomendado participar', motivos }
  }
  if (score >= 30) {
    return { tipo: 'atencao', texto: 'Analisar edital completo', motivos }
  }
  return { tipo: 'no_go', texto: 'Provavelmente nao se aplica', motivos }
}

interface Props {
  editalId: string
  onClose: () => void
  onStatusChange?: (id: string, status: string) => void
}

export function EditalModal({ editalId, onClose, onStatusChange }: Props) {
  const [edital, setEdital] = useState<EditalFull | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('editals')
        .select('*, edital_sources(name)')
        .eq('id', editalId)
        .single()
      if (data) setEdital(data as unknown as EditalFull)
      setLoading(false)
    }
    load()
  }, [editalId])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const raw = edital?.raw_data
  const veredicto = edital ? getVeredicto(edital) : null
  const prazoEncerramento = diasRestantes(raw?.dataEncerramentoProposta)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-8 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="text-lg font-bold text-[var(--foreground)]">Analise do Edital</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-[var(--muted)]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--muted-foreground)]" />
          </div>
        ) : edital ? (
          <div className="space-y-6 p-6">

            {/* ============ VEREDICTO ============ */}
            {veredicto && (
              <div className={`rounded-lg border p-4 ${
                veredicto.tipo === 'go'
                  ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : veredicto.tipo === 'atencao'
                    ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                    : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
              }`}>
                <div className="flex items-center gap-2">
                  {veredicto.tipo === 'go' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : veredicto.tipo === 'atencao' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`text-base font-bold ${
                    veredicto.tipo === 'go' ? 'text-green-700 dark:text-green-300'
                      : veredicto.tipo === 'atencao' ? 'text-yellow-700 dark:text-yellow-300'
                        : 'text-red-700 dark:text-red-300'
                  }`}>
                    {veredicto.texto}
                  </span>
                  {edital.relevance_score != null && (
                    <span className={`ml-auto flex items-center gap-1 text-sm font-semibold ${getScoreColor(edital.relevance_score)}`}>
                      <Star className="h-4 w-4" />
                      {edital.relevance_score}/100 — {getScoreLabel(edital.relevance_score)}
                    </span>
                  )}
                </div>
                <ul className="mt-2 space-y-1">
                  {veredicto.motivos.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                      <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ============ PRAZO ============ */}
            {raw?.dataEncerramentoProposta && (
              <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                prazoEncerramento.urgent
                  ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  : 'border-[var(--border)] bg-[var(--muted)]'
              }`}>
                <Clock className={`h-5 w-5 ${prazoEncerramento.urgent ? 'text-red-500' : 'text-[var(--muted-foreground)]'}`} />
                <div>
                  <span className={`text-sm font-semibold ${prazoEncerramento.urgent ? 'text-red-600 dark:text-red-400' : 'text-[var(--foreground)]'}`}>
                    Encerramento de propostas: {fmtDate(raw.dataEncerramentoProposta)}
                  </span>
                  <span className={`ml-2 text-xs ${prazoEncerramento.urgent ? 'text-red-500' : 'text-[var(--muted-foreground)]'}`}>
                    ({prazoEncerramento.text})
                  </span>
                </div>
              </div>
            )}

            {/* ============ O QUE E ============ */}
            <Section icon={<Target className="h-4 w-4" />} title="O que estao comprando">
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{edital.objeto}</p>
              {raw?.informacaoComplementar && (
                <p className="mt-2 text-xs text-[var(--muted-foreground)] leading-relaxed">{raw.informacaoComplementar}</p>
              )}
            </Section>

            {/* ============ QUEM ESTA COMPRANDO ============ */}
            <Section icon={<Building2 className="h-4 w-4" />} title="Quem esta comprando">
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <Info label="Orgao" value={raw?.orgaoEntidade?.razaoSocial || edital.orgao} />
                <Info label="CNPJ" value={raw?.orgaoEntidade?.cnpj ? formatCNPJ(raw.orgaoEntidade.cnpj) : edital.orgao_cnpj || 'Nao informado'} />
                <Info label="Unidade" value={raw?.unidadeOrgao?.nomeUnidade} />
                <Info label="Esfera" value={raw?.orgaoEntidade?.esferaId === 'E' ? 'Estadual' : raw?.orgaoEntidade?.esferaId === 'F' ? 'Federal' : raw?.orgaoEntidade?.esferaId === 'M' ? 'Municipal' : raw?.orgaoEntidade?.esferaId || 'Nao informado'} />
              </div>
            </Section>

            {/* ============ LOCAL E VALOR ============ */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Section icon={<MapPin className="h-4 w-4" />} title="Local">
                <div className="space-y-1 text-sm">
                  <Info label="Cidade" value={raw?.unidadeOrgao?.municipioNome} />
                  <Info label="Estado" value={raw?.unidadeOrgao?.ufNome ? `${raw.unidadeOrgao.ufNome} (${raw.unidadeOrgao.ufSigla})` : edital.uf} />
                  <Info label="IBGE" value={raw?.unidadeOrgao?.codigoIbge || edital.municipio_ibge} />
                </div>
              </Section>

              <Section icon={<DollarSign className="h-4 w-4" />} title="Valores">
                <div className="space-y-1 text-sm">
                  <Info label="Estimado" value={fmt(raw?.valorTotalEstimado || edital.valor_estimado)} />
                  <Info label="Homologado" value={raw?.valorTotalHomologado ? fmt(raw.valorTotalHomologado) : 'Pendente'} />
                  {raw?.srp && <Info label="SRP" value="Sim (Registro de Preco)" />}
                </div>
              </Section>
            </div>

            {/* ============ DATAS ============ */}
            <Section icon={<Calendar className="h-4 w-4" />} title="Datas importantes">
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <Info label="Publicacao PNCP" value={fmtDate(raw?.dataPublicacaoPncp || edital.data_publicacao)} />
                <Info label="Abertura propostas" value={fmtDate(raw?.dataAberturaProposta || edital.data_sessao)} />
                <Info label="Encerramento propostas" value={fmtDate(raw?.dataEncerramentoProposta)} />
                <Info label="Sincronizado em" value={fmtDate(edital.synced_at)} />
              </div>
            </Section>

            {/* ============ DETALHES LEGAIS ============ */}
            <Section icon={<Scale className="h-4 w-4" />} title="Detalhes da licitacao">
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <Info label="Modalidade" value={raw?.modalidadeNome || edital.modalidade} />
                <Info label="Modo de disputa" value={raw?.modoDisputaNome} />
                <Info label="Situacao" value={raw?.situacaoCompraNome} />
                <Info label="Amparo legal" value={raw?.amparoLegal?.nome} />
                <Info label="Numero PNCP" value={edital.pncp_id} />
                <Info label="Processo" value={raw?.processo} />
              </div>
              {raw?.amparoLegal?.descricao && (
                <p className="mt-2 text-xs text-[var(--muted-foreground)] italic">{raw.amparoLegal.descricao}</p>
              )}
            </Section>

            {/* ============ FONTE ============ */}
            <Section icon={<Gavel className="h-4 w-4" />} title="Fonte dos dados">
              <div className="space-y-1 text-sm">
                <Info label="Portal" value={edital.edital_sources?.name || 'PNCP'} />
                <p className="text-xs text-[var(--muted-foreground)]">
                  PNCP = Portal Nacional de Contratacoes Publicas. E o sistema oficial do governo federal onde todos os orgaos publicam suas licitacoes (Lei 14.133/2021).
                </p>
              </div>
            </Section>

            {/* ============ O QUE FAZER ============ */}
            <Section icon={<CheckCircle2 className="h-4 w-4" />} title="Proximos passos">
              <ol className="space-y-2 text-sm">
                <Step n={1} done={edital.status !== 'novo'}>
                  <strong>Marcar como &quot;Analisando&quot;</strong> — voce esta olhando este edital agora
                </Step>
                <Step n={2}>
                  <strong>Ler o edital completo</strong> — acesse o link do sistema de origem e baixe o PDF
                </Step>
                <Step n={3}>
                  <strong>Verificar exigencias de habilitacao</strong> — documentos, certidoes, alvara sanitario
                </Step>
                <Step n={4}>
                  <strong>Calcular custo e margem</strong> — itens, quantidades, frete, embalagem
                </Step>
                <Step n={5}>
                  <strong>Decidir GO ou NO-GO</strong> — marcar aqui no sistema sua decisao
                </Step>
                {raw?.dataEncerramentoProposta && (
                  <Step n={6}>
                    <strong>Enviar proposta ate {fmtDate(raw.dataEncerramentoProposta)}</strong>
                  </Step>
                )}
              </ol>
            </Section>

            {/* ============ ACOES ============ */}
            <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
              {raw?.linkSistemaOrigem && (
                <a
                  href={raw.linkSistemaOrigem}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir no Portal
                </a>
              )}
              {edital.status === 'novo' && onStatusChange && (
                <>
                  <button
                    onClick={() => { onStatusChange(edital.id, 'analisando'); onClose() }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Analisar
                  </button>
                  <button
                    onClick={() => { onStatusChange(edital.id, 'go'); onClose() }}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    GO
                  </button>
                  <button
                    onClick={() => { onStatusChange(edital.id, 'no_go'); onClose() }}
                    className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                  >
                    NO-GO
                  </button>
                  <button
                    onClick={() => { onStatusChange(edital.id, 'descartado'); onClose() }}
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    Descartar
                  </button>
                </>
              )}
            </div>

          </div>
        ) : (
          <div className="py-12 text-center text-[var(--muted-foreground)]">Edital nao encontrado</div>
        )}
      </div>
    </div>
  )
}

// ===== Sub-components =====

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
        <span className="text-[var(--primary)]">{icon}</span>
        {title}
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/50 p-3">
        {children}
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <span className="text-xs text-[var(--muted-foreground)]">{label}: </span>
      <span className="text-[var(--foreground)]">{value || 'Nao informado'}</span>
    </div>
  )
}

function Step({ n, done, children }: { n: number; done?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        done ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
      }`}>
        {done ? '✓' : n}
      </span>
      <span className={`text-[var(--foreground)] ${done ? 'line-through opacity-50' : ''}`}>{children}</span>
    </li>
  )
}

function formatCNPJ(cnpj: string): string {
  const c = cnpj.replace(/\D/g, '')
  if (c.length !== 14) return cnpj
  return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}`
}
