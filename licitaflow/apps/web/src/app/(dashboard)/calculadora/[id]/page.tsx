'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { CostSheetForm } from '@/components/calculadora/cost-sheet-form'
import type { CostItemData } from '@/components/calculadora/cost-item-row'

export default function EditarPlanilhaPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const sheetId = params.id as string

  const [sheet, setSheet] = useState<any>(null)
  const [items, setItems] = useState<CostItemData[]>([])
  const [editals, setEditals] = useState<{ id: string; title: string; estimated_value: number | null }[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    const [sheetRes, itemsRes, editalsRes] = await Promise.all([
      supabase.from('cost_sheets').select('*, editals(title, estimated_value)').eq('id', sheetId).single(),
      supabase.from('cost_items').select('*').eq('cost_sheet_id', sheetId).order('sort_order', { ascending: true }),
      supabase.from('editals').select('id, title, estimated_value').order('created_at', { ascending: false }).limit(50),
    ])

    setSheet(sheetRes.data)
    setItems(
      (itemsRes.data ?? []).map((item: any) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_cost: item.unit_cost,
        sort_order: item.sort_order,
      }))
    )
    setEditals((editalsRes.data ?? []) as any)
    setLoading(false)
  }, [supabase, sheetId])

  useEffect(() => {
    loadData()
  }, [loadData])

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

    // Atualizar planilha
    await supabase
      .from('cost_sheets')
      .update({
        name: data.name,
        edital_id: data.editalId,
        desired_margin_pct: data.desiredMarginPct,
        floor_margin_pct: data.floorMarginPct,
        tax_rate_pct: data.taxRatePct,
        reference_price: data.referencePrice,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sheetId)

    // Deletar itens antigos e reinserir
    await supabase.from('cost_items').delete().eq('cost_sheet_id', sheetId)

    if (data.items.length > 0) {
      await supabase.from('cost_items').insert(
        data.items.map((item, idx) => ({
          cost_sheet_id: sheetId,
          category: item.category,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_cost: item.unit_cost,
          sort_order: idx,
        }))
      )
    }

    setSaving(false)
    router.push('/calculadora')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  if (!sheet) {
    return (
      <div className="space-y-4">
        <Link href="/calculadora" className="flex items-center gap-2 text-sm text-[var(--primary)] hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <p className="text-sm text-[var(--muted-foreground)]">Planilha não encontrada.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/calculadora" className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Editar Planilha</h1>
      </div>

      <CostSheetForm
        initialName={sheet.name}
        initialItems={items}
        initialDesiredMargin={sheet.desired_margin_pct}
        initialFloorMargin={sheet.floor_margin_pct}
        initialTaxRate={sheet.tax_rate_pct}
        initialReferencePrice={sheet.reference_price}
        editalId={sheet.edital_id}
        editals={editals}
        onSave={handleSave}
        isLoading={saving}
      />
    </div>
  )
}
