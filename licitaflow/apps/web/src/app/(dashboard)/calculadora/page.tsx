'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Calculator, Loader2, Copy, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function CalculadoraPage() {
  const [sheets, setSheets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadSheets = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('cost_sheets')
      .select('*, editals(title)')
      .order('updated_at', { ascending: false })
    setSheets(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadSheets()
  }, [loadSheets])

  async function handleDelete(id: string) {
    if (!confirm('Excluir esta planilha?')) return
    await supabase.from('cost_sheets').delete().eq('id', id)
    loadSheets()
  }

  async function handleDuplicate(id: string, name: string) {
    // Buscar planilha + itens
    const { data: original } = await supabase
      .from('cost_sheets')
      .select('*')
      .eq('id', id)
      .single()

    if (!original) return

    const { data: copy } = await supabase
      .from('cost_sheets')
      .insert({
        name: `${name} (Cópia)`,
        edital_id: (original as any).edital_id,
        description: (original as any).description,
        is_template: false,
        reference_price: (original as any).reference_price,
        desired_margin_pct: (original as any).desired_margin_pct,
        floor_margin_pct: (original as any).floor_margin_pct,
        tax_rate_pct: (original as any).tax_rate_pct,
      })
      .select()
      .single()

    if (!copy) return

    const { data: items } = await supabase
      .from('cost_items')
      .select('*')
      .eq('cost_sheet_id', id)

    if (items && items.length > 0) {
      await supabase.from('cost_items').insert(
        items.map((item: any) => ({
          cost_sheet_id: (copy as any).id,
          category: item.category,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_cost: item.unit_cost,
          sort_order: item.sort_order,
        }))
      )
    }

    loadSheets()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Calculadora de Margem</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Planilhas de custo e simulação de preço para licitações
          </p>
        </div>
        <Link
          href="/calculadora/nova"
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Nova Planilha
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
        </div>
      ) : sheets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <Calculator className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhuma planilha criada</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Crie sua primeira planilha de custo para calcular margem de licitação.
          </p>
          <Link
            href="/calculadora/nova"
            className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Criar Planilha
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {sheets.map((sheet: any) => (
            <div
              key={sheet.id}
              className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 transition-colors hover:border-[var(--primary)]/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]">
                <Calculator className="h-5 w-5 text-[var(--muted-foreground)]" />
              </div>

              <Link href={`/calculadora/${sheet.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-[var(--foreground)]">{sheet.name}</p>
                  {sheet.is_template && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Template
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                  {sheet.editals?.title && <span>Edital: {sheet.editals.title}</span>}
                  <span>Margem: {sheet.desired_margin_pct}%</span>
                  <span>Atualizado: {new Date(sheet.updated_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </Link>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => handleDuplicate(sheet.id, sheet.name)}
                  className="rounded p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                  title="Duplicar"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(sheet.id)}
                  className="rounded p-1.5 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                  title="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
