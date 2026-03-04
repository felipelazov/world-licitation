'use client'

const CATEGORY_LABELS: Record<string, string> = {
  materia_prima: 'Matéria-Prima',
  mao_de_obra: 'Mão de Obra',
  embalagem: 'Embalagem',
  frete: 'Frete',
  impostos: 'Impostos',
  custos_fixos: 'Custos Fixos',
  outros: 'Outros',
}

interface CostSummaryProps {
  byCategory: Map<string, number>
  totalCost: number
  itemCount: number
}

export function CostSummary({ byCategory, totalCost, itemCount }: CostSummaryProps) {
  const categories = Array.from(byCategory.entries()).sort(([, a], [, b]) => b - a)

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Resumo de Custos</h3>

      <div className="space-y-1.5">
        {categories.map(([cat, value]) => {
          const pct = totalCost > 0 ? (value / totalCost) * 100 : 0
          return (
            <div key={cat} className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">{CATEGORY_LABELS[cat] ?? cat}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--muted-foreground)]">{pct.toFixed(0)}%</span>
                <span className="font-medium text-[var(--foreground)] w-24 text-right">R$ {value.toFixed(2)}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-[var(--border)] pt-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--foreground)]">Custo Total</span>
        <span className="text-lg font-bold text-[var(--foreground)]">R$ {totalCost.toFixed(2)}</span>
      </div>

      <p className="text-xs text-[var(--muted-foreground)]">{itemCount} itens na planilha</p>
    </div>
  )
}
