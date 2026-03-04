'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, FileSpreadsheet } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { CostSheetForm } from '@/components/calculadora/cost-sheet-form'
import type { CostItemData } from '@/components/calculadora/cost-item-row'

// Template cesta básica
const CESTA_BASICA_ITEMS: CostItemData[] = [
  { id: 'tpl-1', category: 'materia_prima', description: 'Arroz tipo 1 (5kg)', quantity: 1, unit: 'pct', unit_cost: 22.90, sort_order: 1 },
  { id: 'tpl-2', category: 'materia_prima', description: 'Feijão carioca (1kg)', quantity: 2, unit: 'pct', unit_cost: 7.50, sort_order: 2 },
  { id: 'tpl-3', category: 'materia_prima', description: 'Açúcar cristal (2kg)', quantity: 1, unit: 'pct', unit_cost: 8.90, sort_order: 3 },
  { id: 'tpl-4', category: 'materia_prima', description: 'Óleo de soja (900ml)', quantity: 2, unit: 'un', unit_cost: 5.80, sort_order: 4 },
  { id: 'tpl-5', category: 'materia_prima', description: 'Farinha de trigo (1kg)', quantity: 1, unit: 'pct', unit_cost: 5.20, sort_order: 5 },
  { id: 'tpl-6', category: 'materia_prima', description: 'Macarrão espaguete (500g)', quantity: 2, unit: 'pct', unit_cost: 3.50, sort_order: 6 },
  { id: 'tpl-7', category: 'materia_prima', description: 'Leite em pó integral (400g)', quantity: 1, unit: 'un', unit_cost: 14.90, sort_order: 7 },
  { id: 'tpl-8', category: 'materia_prima', description: 'Café torrado e moído (250g)', quantity: 1, unit: 'pct', unit_cost: 10.50, sort_order: 8 },
  { id: 'tpl-9', category: 'materia_prima', description: 'Sal refinado (1kg)', quantity: 1, unit: 'pct', unit_cost: 2.50, sort_order: 9 },
  { id: 'tpl-10', category: 'materia_prima', description: 'Extrato de tomate (340g)', quantity: 2, unit: 'un', unit_cost: 4.30, sort_order: 10 },
  { id: 'tpl-11', category: 'materia_prima', description: 'Sardinha em lata (125g)', quantity: 2, unit: 'un', unit_cost: 6.90, sort_order: 11 },
  { id: 'tpl-12', category: 'materia_prima', description: 'Fubá de milho (1kg)', quantity: 1, unit: 'pct', unit_cost: 4.80, sort_order: 12 },
  { id: 'tpl-13', category: 'embalagem', description: 'Caixa de papelão (cesta)', quantity: 1, unit: 'un', unit_cost: 4.50, sort_order: 13 },
  { id: 'tpl-14', category: 'embalagem', description: 'Fita adesiva', quantity: 0.5, unit: 'rolo', unit_cost: 3.00, sort_order: 14 },
  { id: 'tpl-15', category: 'mao_de_obra', description: 'Montagem (rateio por cesta)', quantity: 1, unit: 'un', unit_cost: 5.00, sort_order: 15 },
  { id: 'tpl-16', category: 'frete', description: 'Frete de entrega (rateio)', quantity: 1, unit: 'un', unit_cost: 8.00, sort_order: 16 },
  { id: 'tpl-17', category: 'custos_fixos', description: 'Rateio aluguel/luz/água', quantity: 1, unit: 'un', unit_cost: 3.00, sort_order: 17 },
]

export default function NovaPlanilhaPage() {
  const router = useRouter()
  const supabase = createClient()
  const [editals, setEditals] = useState<{ id: string; title: string; estimated_value: number | null }[]>([])
  const [saving, setSaving] = useState(false)
  const [useTemplate, setUseTemplate] = useState<boolean | null>(null)

  const loadEditals = useCallback(async () => {
    const { data } = await supabase
      .from('editals')
      .select('id, title, estimated_value')
      .order('created_at', { ascending: false })
      .limit(50)
    setEditals((data ?? []) as any)
  }, [supabase])

  useEffect(() => {
    loadEditals()
  }, [loadEditals])

  async function handleSave(data: {
    name: string
    editalId: string | null
    desiredMarginPct: number
    floorMarginPct: number
    taxRatePct: number
    referencePrice: number | null
    items: CostItemData[]
  }) {
    setSaving(true)

    const { data: sheet, error } = await supabase
      .from('cost_sheets')
      .insert({
        name: data.name,
        edital_id: data.editalId,
        desired_margin_pct: data.desiredMarginPct,
        floor_margin_pct: data.floorMarginPct,
        tax_rate_pct: data.taxRatePct,
        reference_price: data.referencePrice,
        is_template: false,
      })
      .select()
      .single()

    if (error || !sheet) {
      console.error('Error creating sheet:', error)
      setSaving(false)
      return
    }

    // Inserir itens
    if (data.items.length > 0) {
      await supabase.from('cost_items').insert(
        data.items.map((item, idx) => ({
          cost_sheet_id: (sheet as any).id,
          category: item.category,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_cost: item.unit_cost,
          sort_order: idx,
        }))
      )
    }

    router.push(`/calculadora/${(sheet as any).id}`)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/calculadora" className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Nova Planilha de Custo</h1>
      </div>

      {/* Escolha template vs vazio */}
      {useTemplate === null ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => setUseTemplate(true)}
            className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-[var(--border)] p-8 text-center hover:border-[var(--primary)] transition-colors"
          >
            <FileSpreadsheet className="h-10 w-10 text-[var(--primary)]" />
            <div>
              <p className="font-semibold text-[var(--foreground)]">Template Cesta Básica</p>
              <p className="text-xs text-[var(--muted-foreground)]">17 itens pré-preenchidos com preços médios</p>
            </div>
          </button>
          <button
            onClick={() => setUseTemplate(false)}
            className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-[var(--border)] p-8 text-center hover:border-[var(--primary)] transition-colors"
          >
            <Loader2 className="h-10 w-10 text-[var(--muted-foreground)]" />
            <div>
              <p className="font-semibold text-[var(--foreground)]">Planilha em Branco</p>
              <p className="text-xs text-[var(--muted-foreground)]">Monte do zero com suas próprias categorias</p>
            </div>
          </button>
        </div>
      ) : (
        <CostSheetForm
          initialName={useTemplate ? 'Cesta Básica — Pregão' : ''}
          initialItems={useTemplate ? CESTA_BASICA_ITEMS : []}
          editals={editals}
          onSave={handleSave}
          isLoading={saving}
        />
      )}
    </div>
  )
}
