'use client'

import { useState, useMemo, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { calculateMargin } from '@licitaflow/shared'
import { CostItemRow, type CostItemData } from './cost-item-row'
import { CostSummary } from './cost-summary'
import { MarginDisplay } from './margin-display'
import { PriceSimulator } from './price-simulator'

const CATEGORY_LABELS: Record<string, string> = {
  materia_prima: 'Matéria-Prima',
  mao_de_obra: 'Mão de Obra',
  embalagem: 'Embalagem',
  frete: 'Frete',
  impostos: 'Impostos',
  custos_fixos: 'Custos Fixos',
  outros: 'Outros',
}

const CATEGORIES = Object.entries(CATEGORY_LABELS)

interface CostSheetFormProps {
  initialName?: string
  initialItems?: CostItemData[]
  initialDesiredMargin?: number
  initialFloorMargin?: number
  initialTaxRate?: number
  initialReferencePrice?: number
  editalId?: string
  editals?: { id: string; title: string; estimated_value: number | null }[]
  onSave: (data: {
    name: string
    editalId: string | null
    desiredMarginPct: number
    floorMarginPct: number
    taxRatePct: number
    referencePrice: number | null
    items: CostItemData[]
  }) => Promise<void>
  isLoading?: boolean
}

let nextId = 1

export function CostSheetForm({
  initialName = '',
  initialItems = [],
  initialDesiredMargin = 15,
  initialFloorMargin = 5,
  initialTaxRate = 6,
  initialReferencePrice,
  editalId: initialEditalId,
  editals = [],
  onSave,
  isLoading = false,
}: CostSheetFormProps) {
  const [name, setName] = useState(initialName)
  const [editalId, setEditalId] = useState(initialEditalId ?? '')
  const [desiredMargin, setDesiredMargin] = useState(initialDesiredMargin)
  const [floorMargin, setFloorMargin] = useState(initialFloorMargin)
  const [taxRate, setTaxRate] = useState(initialTaxRate)
  const [referencePrice, setReferencePrice] = useState(initialReferencePrice ?? 0)
  const [items, setItems] = useState<CostItemData[]>(
    initialItems.length > 0 ? initialItems : []
  )
  const [simulatorPrice, setSimulatorPrice] = useState(0)

  // Atualizar preço referência quando selecionar edital
  const handleEditalChange = useCallback((id: string) => {
    setEditalId(id)
    if (id) {
      const edital = editals.find((e) => e.id === id)
      if (edital?.estimated_value) {
        setReferencePrice(edital.estimated_value)
      }
    }
  }, [editals])

  function addItem(category: string) {
    const newItem: CostItemData = {
      id: `new-${nextId++}`,
      category,
      description: '',
      quantity: 1,
      unit: 'un',
      unit_cost: 0,
      sort_order: items.length,
    }
    setItems((prev) => [...prev, newItem])
  }

  function updateItem(id: string, field: string, value: string | number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Cálculos
  const costTotals = useMemo(() => {
    const byCategory = new Map<string, number>()
    let totalCost = 0

    for (const item of items) {
      const itemTotal = item.quantity * item.unit_cost
      totalCost += itemTotal
      byCategory.set(item.category, (byCategory.get(item.category) ?? 0) + itemTotal)
    }

    return { byCategory, totalCost, itemCount: items.length }
  }, [items])

  const marginResult = useMemo(() => {
    return calculateMargin({
      totalCost: costTotals.totalCost,
      desiredMarginPct: desiredMargin,
      floorMarginPct: floorMargin,
      taxRatePct: taxRate,
      referencePrice: referencePrice || undefined,
    })
  }, [costTotals.totalCost, desiredMargin, floorMargin, taxRate, referencePrice])

  // Atualizar simulador quando margem muda
  useMemo(() => {
    if (simulatorPrice === 0 && marginResult.sellingPrice > 0) {
      setSimulatorPrice(marginResult.sellingPrice)
    }
  }, [marginResult.sellingPrice, simulatorPrice])

  const canSave = name && items.length > 0 && !isLoading

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* Coluna principal */}
      <div className="space-y-5">
        {/* Header fields */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Nome da Planilha *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Cesta Básica — Pregão 123/2026"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          {editals.length > 0 && (
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Vincular a Edital</label>
              <select
                value={editalId}
                onChange={(e) => handleEditalChange(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              >
                <option value="">Nenhum</option>
                {editals.map((e) => (
                  <option key={e.id} value={e.id}>{e.title}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Parâmetros de margem */}
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Margem Desejada (%)</label>
            <input
              type="number"
              value={desiredMargin}
              onChange={(e) => setDesiredMargin(parseFloat(e.target.value) || 0)}
              min={0}
              max={100}
              step={0.5}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Margem Piso (%)</label>
            <input
              type="number"
              value={floorMargin}
              onChange={(e) => setFloorMargin(parseFloat(e.target.value) || 0)}
              min={0}
              max={100}
              step={0.5}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Alíquota Imposto (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              min={0}
              max={100}
              step={0.1}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Preço Referência (R$)</label>
            <input
              type="number"
              value={referencePrice}
              onChange={(e) => setReferencePrice(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* Itens por categoria */}
        {CATEGORIES.map(([catKey, catLabel]) => {
          const catItems = items.filter((i) => i.category === catKey)
          if (catItems.length === 0 && items.length > 0) return null

          return (
            <div key={catKey} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{catLabel}</h3>
                <button
                  onClick={() => addItem(catKey)}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[var(--primary)] hover:bg-[var(--muted)]"
                >
                  <Plus className="h-3 w-3" />
                  Adicionar
                </button>
              </div>

              {catItems.length > 0 && (
                <>
                  {/* Header */}
                  <div className="grid grid-cols-[1fr_80px_70px_100px_90px_36px] gap-2 text-xs text-[var(--muted-foreground)]">
                    <span>Descrição</span>
                    <span className="text-right">Qtd</span>
                    <span className="text-center">Un</span>
                    <span className="text-right">Custo Unit.</span>
                    <span className="text-right">Total</span>
                    <span />
                  </div>
                  {catItems.map((item) => (
                    <CostItemRow
                      key={item.id}
                      item={item}
                      onChange={updateItem}
                      onDelete={deleteItem}
                    />
                  ))}
                </>
              )}
            </div>
          )
        })}

        {/* Botão de adicionar primeira categoria */}
        {items.length === 0 && (
          <div className="rounded-lg border border-dashed border-[var(--border)] p-6 text-center">
            <p className="text-sm text-[var(--muted-foreground)] mb-3">
              Comece adicionando itens de custo por categoria
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => addItem(key)}
                  className="flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs hover:bg-[var(--muted)]"
                >
                  <Plus className="h-3 w-3" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Salvar */}
        <div className="flex justify-end border-t border-[var(--border)] pt-4">
          <button
            onClick={() => onSave({
              name,
              editalId: editalId || null,
              desiredMarginPct: desiredMargin,
              floorMarginPct: floorMargin,
              taxRatePct: taxRate,
              referencePrice: referencePrice || null,
              items,
            })}
            disabled={!canSave}
            className="rounded-lg bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar Planilha'}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <CostSummary
          byCategory={costTotals.byCategory}
          totalCost={costTotals.totalCost}
          itemCount={costTotals.itemCount}
        />

        {costTotals.totalCost > 0 && (
          <>
            <MarginDisplay result={marginResult} />
            <PriceSimulator
              costWithTax={marginResult.costWithTax}
              price={simulatorPrice}
              onPriceChange={setSimulatorPrice}
              floorPrice={marginResult.floorPrice}
            />
          </>
        )}
      </div>
    </div>
  )
}
