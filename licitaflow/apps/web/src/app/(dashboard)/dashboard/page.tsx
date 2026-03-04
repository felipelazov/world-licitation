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
  Loader2,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ReadinessChecklist, type ReadinessItem } from '@/components/onboarding/readiness-checklist'

interface DashboardStats {
  editaisRadar: number
  analisesPendentes: number
  docsValidos: number
  pregoesAtivos: number
}

interface AlertItem {
  id: string
  type: 'certidao' | 'pregao' | 'edital'
  message: string
  severity: 'warning' | 'danger' | 'info'
}

const quickActions = [
  { label: 'Buscar Editais', href: '/radar', icon: Radar },
  { label: 'Verificar Documentos', href: '/documentos', icon: FolderOpen },
  { label: 'Calculadora de Custo', href: '/calculadora', icon: Calculator },
  { label: 'Notificacoes', href: '/notificacoes', icon: Bell },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [readiness, setReadiness] = useState<ReadinessItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadDashboard = useCallback(async () => {
    setLoading(true)

    const [editaisRes, analisesRes, docsRes, pregoesRes, docsAlertRes, pregoesAlertRes] =
      await Promise.all([
        // Total editais no radar
        supabase.from('editals').select('*', { count: 'exact', head: true }),
        // Analises pendentes (sem decisao)
        supabase
          .from('edital_analyses')
          .select('*', { count: 'exact', head: true })
          .is('decision', null),
        // Documentos validos
        supabase
          .from('documents')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'valido'),
        // Pregoes ativos
        supabase
          .from('bidding_sessions')
          .select('*', { count: 'exact', head: true })
          .in('status', ['agendado', 'em_andamento']),
        // Docs vencendo/vencidos para alertas
        supabase
          .from('documents')
          .select('id, name, status, expires_at')
          .in('status', ['vencendo', 'vencido'])
          .order('expires_at', { ascending: true })
          .limit(5),
        // Pregoes proximos (hoje/amanha)
        supabase
          .from('bidding_sessions')
          .select('id, edital_number, session_date, status')
          .eq('status', 'agendado')
          .order('session_date', { ascending: true })
          .limit(5),
      ])

    setStats({
      editaisRadar: editaisRes.count ?? 0,
      analisesPendentes: analisesRes.count ?? 0,
      docsValidos: docsRes.count ?? 0,
      pregoesAtivos: pregoesRes.count ?? 0,
    })

    // Build alerts
    const alertItems: AlertItem[] = []

    if (docsAlertRes.data) {
      for (const doc of docsAlertRes.data as any[]) {
        alertItems.push({
          id: `doc-${doc.id}`,
          type: 'certidao',
          message: `${doc.name} — ${doc.status === 'vencido' ? 'VENCIDO' : 'vencendo em breve'}`,
          severity: doc.status === 'vencido' ? 'danger' : 'warning',
        })
      }
    }

    if (pregoesAlertRes.data) {
      for (const p of pregoesAlertRes.data as any[]) {
        const sessionDate = new Date(p.session_date)
        const today = new Date()
        const diffDays = Math.ceil((sessionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

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
    const sicafCheck = (docsRes.count ?? 0) > 0
    const certidonesValidas = (docsRes.count ?? 0) >= 5
    const costSheetRes = await supabase.from('cost_sheets').select('*', { count: 'exact', head: true })
    const filterRes = await supabase.from('edital_filters').select('*', { count: 'exact', head: true })

    setReadiness([
      { id: 'docs', label: 'Documentos enviados', checked: sicafCheck, autoChecked: true, link: '/documentos' },
      { id: 'certidoes', label: 'Certidoes validas (5+)', checked: certidonesValidas, autoChecked: true, link: '/documentos' },
      { id: 'planilha', label: 'Planilha de custo criada', checked: (costSheetRes.count ?? 0) > 0, autoChecked: true, link: '/calculadora' },
      { id: 'filtros', label: 'Filtros de edital configurados', checked: (filterRes.count ?? 0) > 0, autoChecked: true, link: '/radar/filtros' },
      { id: 'edital', label: 'Primeiro edital analisado', checked: (analisesRes.count ?? 0) > 0 || ((editaisRes.count ?? 0) > 0 && (analisesRes.count ?? 0) === 0 && false), autoChecked: true, link: '/radar' },
    ])

    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const statCards = [
    { label: 'Editais no Radar', value: stats?.editaisRadar ?? 0, icon: Radar, color: 'text-blue-500' },
    { label: 'Analises Pendentes', value: stats?.analisesPendentes ?? 0, icon: ClipboardCheck, color: 'text-yellow-500' },
    { label: 'Documentos Validos', value: stats?.docsValidos ?? 0, icon: FolderOpen, color: 'text-green-500' },
    { label: 'Pregoes Ativos', value: stats?.pregoesAtivos ?? 0, icon: Zap, color: 'text-purple-500' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
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
          <div key={stat.label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Readiness Checklist */}
      {readiness.length > 0 && readiness.some((r) => !r.checked) && (
        <ReadinessChecklist items={readiness} />
      )}

      {/* Quick Actions + Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

        {/* Alerts */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Alertas
          </h2>
          {alerts.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-[var(--muted-foreground)]">
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
      </div>
    </div>
  )
}
