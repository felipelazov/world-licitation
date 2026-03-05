'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Radar,
  ClipboardCheck,
  FolderOpen,
  Calculator,
  Zap,
  Bell,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  Star,
  ArrowRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ReadinessChecklist, type ReadinessItem } from '@/components/onboarding/readiness-checklist'

interface DashboardStats {
  editaisRadar: number
  novosHoje: number
  analisesPendentes: number
  docsValidos: number
  pregoesAtivos: number
  valorTotalEstimado: number
  sessoesEstaSemana: number
}

interface AlertItem {
  id: string
  type: 'certidao' | 'pregao' | 'edital'
  message: string
  severity: 'warning' | 'danger' | 'info'
}

interface RecentEdital {
  id: string
  numero: string | null
  objeto: string
  orgao: string
  valor_estimado: number | null
  data_sessao: string | null
  status: string
  relevance_score: number | null
}

const quickActions = [
  { label: 'Buscar Editais', href: '/radar', icon: Radar },
  { label: 'Verificar Documentos', href: '/documentos', icon: FolderOpen },
  { label: 'Calculadora de Custo', href: '/calculadora', icon: Calculator },
  { label: 'Notificacoes', href: '/notificacoes', icon: Bell },
]

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}K`
  return `R$ ${value.toFixed(0)}`
}

function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(new Date(dateStr))
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [readiness, setReadiness] = useState<ReadinessItem[]>([])
  const [recentEditais, setRecentEditais] = useState<RecentEdital[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadDashboard = useCallback(async () => {
    setLoading(true)

    // Buscar config de monitoramento para filtrar por UFs
    let monitoringUfs: string[] = []
    try {
      const res = await fetch('/api/monitoring')
      const json = await res.json()
      if (json.data?.ufs?.length > 0) {
        monitoringUfs = json.data.ufs
      }
    } catch {
      // use no filter
    }

    const today = new Date().toISOString().split('T')[0]
    const weekEnd = new Date()
    weekEnd.setDate(weekEnd.getDate() + 7)
    const weekEndStr = weekEnd.toISOString()

    // Build editals queries with UF filter
    let editaisQ = supabase.from('editals').select('*', { count: 'exact', head: true })
    let novosHojeQ = supabase.from('editals').select('*', { count: 'exact', head: true }).eq('status', 'novo').gte('data_publicacao', today)
    let valorQ = supabase.from('editals').select('valor_estimado').not('valor_estimado', 'is', null)
    let sessoesQ = supabase.from('editals').select('*', { count: 'exact', head: true }).not('data_sessao', 'is', null).gte('data_sessao', today).lte('data_sessao', weekEndStr)
    let recentQ = supabase.from('editals').select('id, numero, objeto, orgao, valor_estimado, data_sessao, status, relevance_score').order('created_at', { ascending: false }).limit(5)

    if (monitoringUfs.length > 0) {
      editaisQ = editaisQ.in('uf', monitoringUfs)
      novosHojeQ = novosHojeQ.in('uf', monitoringUfs)
      valorQ = valorQ.in('uf', monitoringUfs)
      sessoesQ = sessoesQ.in('uf', monitoringUfs)
      recentQ = recentQ.in('uf', monitoringUfs)
    }

    const [
      editaisRes,
      novosHojeRes,
      analisesRes,
      docsRes,
      pregoesRes,
      valorRes,
      sessoesRes,
      recentRes,
      docsAlertRes,
      pregoesAlertRes,
    ] = await Promise.all([
      editaisQ,
      novosHojeQ,
      supabase.from('edital_analyses').select('*', { count: 'exact', head: true }).is('decision', null),
      supabase.from('documents').select('*', { count: 'exact', head: true }).eq('status', 'valido'),
      supabase.from('bidding_sessions').select('*', { count: 'exact', head: true }).in('status', ['agendado', 'em_andamento']),
      valorQ,
      sessoesQ,
      recentQ,
      supabase.from('documents').select('id, name, status, expires_at')
        .in('status', ['vencendo', 'vencido'])
        .order('expires_at', { ascending: true })
        .limit(5),
      supabase.from('bidding_sessions').select('id, edital_number, session_date, status')
        .eq('status', 'agendado')
        .order('session_date', { ascending: true })
        .limit(5),
    ])

    const valorTotal = valorRes.data
      ? valorRes.data.reduce((sum: number, e: { valor_estimado: number }) => sum + (e.valor_estimado || 0), 0)
      : 0

    setStats({
      editaisRadar: editaisRes.count ?? 0,
      novosHoje: novosHojeRes.count ?? 0,
      analisesPendentes: analisesRes.count ?? 0,
      docsValidos: docsRes.count ?? 0,
      pregoesAtivos: pregoesRes.count ?? 0,
      valorTotalEstimado: valorTotal,
      sessoesEstaSemana: sessoesRes.count ?? 0,
    })

    setRecentEditais((recentRes.data as RecentEdital[]) || [])

    // Build alerts
    const alertItems: AlertItem[] = []

    if (docsAlertRes.data) {
      for (const doc of docsAlertRes.data as { id: string; name: string; status: string }[]) {
        alertItems.push({
          id: `doc-${doc.id}`,
          type: 'certidao',
          message: `${doc.name} — ${doc.status === 'vencido' ? 'VENCIDO' : 'vencendo em breve'}`,
          severity: doc.status === 'vencido' ? 'danger' : 'warning',
        })
      }
    }

    if (pregoesAlertRes.data) {
      for (const p of pregoesAlertRes.data as { id: string; edital_number: string; session_date: string }[]) {
        const sessionDate = new Date(p.session_date)
        const todayDate = new Date()
        const diffDays = Math.ceil((sessionDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays <= 1) {
          alertItems.push({
            id: `pregao-${p.id}`,
            type: 'pregao',
            message: `Pregao ${p.edital_number} — ${diffDays <= 0 ? 'HOJE' : 'AMANHA'}`,
            severity: diffDays <= 0 ? 'danger' : 'warning',
          })
        }
      }
    }

    setAlerts(alertItems)

    // Build readiness checklist
    const certidonesValidas = (docsRes.count ?? 0) >= 5
    const costSheetRes = await supabase.from('cost_sheets').select('*', { count: 'exact', head: true })
    const filterRes = await supabase.from('edital_filters').select('*', { count: 'exact', head: true })

    setReadiness([
      { id: 'docs', label: 'Documentos enviados', checked: (docsRes.count ?? 0) > 0, autoChecked: true, link: '/documentos' },
      { id: 'certidoes', label: 'Certidoes validas (5+)', checked: certidonesValidas, autoChecked: true, link: '/documentos' },
      { id: 'planilha', label: 'Planilha de custo criada', checked: (costSheetRes.count ?? 0) > 0, autoChecked: true, link: '/calculadora' },
      { id: 'filtros', label: 'Filtros de edital configurados', checked: (filterRes.count ?? 0) > 0, autoChecked: true, link: '/radar/filtros' },
      { id: 'edital', label: 'Primeiro edital analisado', checked: (analisesRes.count ?? 0) > 0, autoChecked: true, link: '/radar' },
    ])

    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const statCards = [
    { label: 'Editais no Radar', value: stats?.editaisRadar ?? 0, icon: Radar, color: 'text-blue-500', href: '/radar' },
    { label: 'Novos Hoje', value: stats?.novosHoje ?? 0, icon: Star, color: 'text-yellow-500', href: '/radar?status=novo' },
    { label: 'Sessoes esta Semana', value: stats?.sessoesEstaSemana ?? 0, icon: Calendar, color: 'text-purple-500', href: '/radar' },
    { label: 'Valor Total Estimado', value: stats ? formatCurrency(stats.valorTotalEstimado) : '—', icon: DollarSign, color: 'text-green-500', href: '/radar' },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-7 w-40 animate-pulse rounded bg-[var(--muted)]" />
          <div className="mt-2 h-4 w-60 animate-pulse rounded bg-[var(--muted)]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)]" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-48 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)]" />
          <div className="h-48 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Visao geral das suas licitacoes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Readiness Checklist */}
      {readiness.length > 0 && readiness.some((r) => !r.checked) && (
        <ReadinessChecklist items={readiness} />
      )}

      {/* Recent Editais + Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Editais */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
              <Radar className="h-5 w-5 text-blue-500" />
              Editais Recentes
            </h2>
            <Link href="/radar" className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
              Ver todos <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {recentEditais.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-[var(--muted-foreground)]">
              Nenhum edital no radar ainda
            </div>
          ) : (
            <div className="space-y-2">
              {recentEditais.map((edital) => (
                <Link
                  key={edital.id}
                  href={`/radar`}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-2.5 text-sm transition-colors hover:bg-[var(--muted)]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-[var(--foreground)]">
                      {edital.numero || edital.orgao}
                    </p>
                    <p className="truncate text-xs text-[var(--muted-foreground)]">{edital.objeto}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    {edital.valor_estimado && (
                      <p className="text-xs font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(edital.valor_estimado)}
                      </p>
                    )}
                    {edital.data_sessao && (
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {formatDateShort(edital.data_sessao)}
                      </p>
                    )}
                  </div>
                  {edital.relevance_score != null && edital.relevance_score > 0 && (
                    <span className={`flex items-center gap-0.5 shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                      edital.relevance_score >= 70
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : edital.relevance_score >= 40
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      <Star className="h-3 w-3" />
                      {edital.relevance_score}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Alerts + Quick Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alertas
            </h2>
            {alerts.length === 0 ? (
              <div className="flex h-20 items-center justify-center text-sm text-[var(--muted-foreground)]">
                Nenhum alerta no momento
              </div>
            ) : (
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                      alert.severity === 'danger'
                        ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/10 dark:text-red-400'
                        : alert.severity === 'warning'
                          ? 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/10 dark:text-yellow-400'
                          : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/10 dark:text-blue-400'
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{alert.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
              <TrendingUp className="h-5 w-5" />
              Acoes Rapidas
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
                >
                  <action.icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
