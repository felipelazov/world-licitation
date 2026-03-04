'use client'

interface BidEntry {
  id: string
  value: number
  is_mine: boolean
  competitor_label: string | null
  bid_time: string
  notes: string | null
}

interface BidLogProps {
  bids: BidEntry[]
}

function formatTime(dateStr: string): string {
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(dateStr))
}

export function BidLog({ bids }: BidLogProps) {
  if (bids.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] py-6 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">Nenhum lance registrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-1.5 max-h-60 overflow-y-auto">
      {bids.map((bid) => (
        <div
          key={bid.id}
          className={`flex items-center justify-between rounded px-3 py-1.5 text-sm ${
            bid.is_mine
              ? 'bg-blue-50 dark:bg-blue-900/20'
              : 'bg-[var(--muted)]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-foreground)]">{formatTime(bid.bid_time)}</span>
            <span className={`font-medium ${bid.is_mine ? 'text-blue-700 dark:text-blue-400' : 'text-[var(--foreground)]'}`}>
              R$ {bid.value.toFixed(2)}
            </span>
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">
            {bid.is_mine ? '(eu)' : bid.competitor_label ?? '(concorrente)'}
          </span>
        </div>
      ))}
    </div>
  )
}
