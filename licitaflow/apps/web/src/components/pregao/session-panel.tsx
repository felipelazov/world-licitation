'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { LiveCalculator } from './live-calculator'
import { BidLog } from './bid-log'
import { MarginBar } from './margin-bar'

interface SessionPanelProps {
  session: {
    id: string
    floor_price: number | null
    status: string
    started_at: string | null
  }
  edital: {
    title: string
    agency: string
    session_date: string | null
    estimated_value: number | null
    object: string | null
  }
  costWithTax: number
  floorMarginPct: number
  bids: any[]
  onRegisterBid: (value: number, isMine: boolean, label?: string) => void
}

function formatElapsed(startedAt: string): string {
  const start = new Date(startedAt).getTime()
  const now = Date.now()
  const diff = Math.floor((now - start) / 1000)
  const h = Math.floor(diff / 3600)
  const m = Math.floor((diff % 3600) / 60)
  const s = diff % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function SessionPanel({
  session,
  edital,
  costWithTax,
  floorMarginPct,
  bids,
  onRegisterBid,
}: SessionPanelProps) {
  const [elapsed, setElapsed] = useState('00:00:00')

  useEffect(() => {
    if (!session.started_at || session.status !== 'em_andamento') return
    const interval = setInterval(() => {
      setElapsed(formatElapsed(session.started_at!))
    }, 1000)
    return () => clearInterval(interval)
  }, [session.started_at, session.status])

  const myBids = bids.filter((b: any) => b.is_mine)
  const myLastBid = myBids[0]
  const lowestBid = bids.length > 0
    ? Math.min(...bids.map((b: any) => b.value))
    : null

  const myLastMargin = myLastBid
    ? ((myLastBid.value - costWithTax) / myLastBid.value) * 100
    : null

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-lg bg-[var(--card)] border border-[var(--border)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">{edital.title}</h2>
            <p className="text-sm text-[var(--muted-foreground)]">{edital.agency}</p>
          </div>
          {session.status === 'em_andamento' && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="font-mono text-sm font-bold text-green-700 dark:text-green-400">{elapsed}</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Coluna esquerda: Calculadora + Log */}
        <div className="space-y-4">
          <LiveCalculator
            costWithTax={costWithTax}
            floorPrice={session.floor_price ?? costWithTax * 1.05}
            floorMarginPct={floorMarginPct}
            lowestBid={lowestBid}
            onRegisterBid={(value) => onRegisterBid(value, true)}
          />

          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
            <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">Log de Lances</h3>
            <BidLog bids={bids} />
          </div>
        </div>

        {/* Coluna direita: Resumo */}
        <div className="space-y-4">
          {/* Piso e meu último lance */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--muted-foreground)]">PISO</span>
              <span className="text-lg font-bold text-red-600">
                R$ {(session.floor_price ?? 0).toFixed(2)}
              </span>
            </div>

            {myLastMargin !== null && (
              <MarginBar marginPct={myLastMargin} floorPct={floorMarginPct} />
            )}

            <div className="grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-3 text-sm">
              <div>
                <span className="text-xs text-[var(--muted-foreground)]">Meu último</span>
                <p className="font-bold text-blue-700 dark:text-blue-400">
                  {myLastBid ? `R$ ${myLastBid.value.toFixed(2)}` : '—'}
                </p>
                {myLastMargin !== null && (
                  <p className="text-xs text-[var(--muted-foreground)]">Margem: {myLastMargin.toFixed(1)}%</p>
                )}
              </div>
              <div>
                <span className="text-xs text-[var(--muted-foreground)]">Menor lance</span>
                <p className="font-bold text-[var(--foreground)]">
                  {lowestBid ? `R$ ${lowestBid.toFixed(2)}` : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Dados do edital */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Dados do Edital</h3>
            {edital.object && (
              <div>
                <span className="text-xs text-[var(--muted-foreground)]">Objeto</span>
                <p className="text-sm text-[var(--foreground)]">{edital.object}</p>
              </div>
            )}
            {edital.estimated_value && (
              <div>
                <span className="text-xs text-[var(--muted-foreground)]">Valor Referência</span>
                <p className="text-sm font-medium text-[var(--foreground)]">
                  R$ {edital.estimated_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}
            {edital.session_date && (
              <div>
                <span className="text-xs text-[var(--muted-foreground)]">Data da Sessão</span>
                <p className="text-sm text-[var(--foreground)]">
                  {new Date(edital.session_date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
