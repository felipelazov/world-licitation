// Schema de Planilhas de Custo

export const COST_CATEGORY_VALUES = [
  'materia_prima',
  'mao_de_obra',
  'embalagem',
  'frete',
  'impostos',
  'custos_fixos',
  'outros',
] as const
export type CostCategoryValue = (typeof COST_CATEGORY_VALUES)[number]

export const COST_CATEGORY_LABELS: Record<CostCategoryValue, string> = {
  materia_prima: 'Matéria-Prima',
  mao_de_obra: 'Mão de Obra',
  embalagem: 'Embalagem',
  frete: 'Frete',
  impostos: 'Impostos',
  custos_fixos: 'Custos Fixos',
  outros: 'Outros',
}

export function isValidCostCategory(value: string): value is CostCategoryValue {
  return COST_CATEGORY_VALUES.includes(value as CostCategoryValue)
}

export interface CostSheetRow {
  id: string
  tenant_id: string
  edital_id: string | null
  name: string
  description: string | null
  is_template: boolean
  reference_price: number | null
  desired_margin_pct: number
  floor_margin_pct: number
  tax_rate_pct: number
  created_at: string
  updated_at: string
}

export interface CostSheetInsertInput {
  name: string
  edital_id?: string
  description?: string
  is_template?: boolean
  reference_price?: number
  desired_margin_pct?: number
  floor_margin_pct?: number
  tax_rate_pct?: number
}

export interface CostItemRow {
  id: string
  cost_sheet_id: string
  category: CostCategoryValue
  description: string
  quantity: number
  unit: string
  unit_cost: number
  sort_order: number
  created_at: string
}

export interface CostItemInsertInput {
  cost_sheet_id: string
  category: CostCategoryValue
  description: string
  quantity: number
  unit: string
  unit_cost: number
  sort_order?: number
}

// Template padrão de cesta básica
export const CESTA_BASICA_TEMPLATE: Omit<CostItemInsertInput, 'cost_sheet_id'>[] = [
  // Matéria-prima (alimentos)
  { category: 'materia_prima', description: 'Arroz tipo 1 (5kg)', quantity: 1, unit: 'pct', unit_cost: 22.90, sort_order: 1 },
  { category: 'materia_prima', description: 'Feijão carioca (1kg)', quantity: 2, unit: 'pct', unit_cost: 7.50, sort_order: 2 },
  { category: 'materia_prima', description: 'Açúcar cristal (2kg)', quantity: 1, unit: 'pct', unit_cost: 8.90, sort_order: 3 },
  { category: 'materia_prima', description: 'Óleo de soja (900ml)', quantity: 2, unit: 'un', unit_cost: 5.80, sort_order: 4 },
  { category: 'materia_prima', description: 'Farinha de trigo (1kg)', quantity: 1, unit: 'pct', unit_cost: 5.20, sort_order: 5 },
  { category: 'materia_prima', description: 'Macarrão espaguete (500g)', quantity: 2, unit: 'pct', unit_cost: 3.50, sort_order: 6 },
  { category: 'materia_prima', description: 'Leite em pó integral (400g)', quantity: 1, unit: 'un', unit_cost: 14.90, sort_order: 7 },
  { category: 'materia_prima', description: 'Café torrado e moído (250g)', quantity: 1, unit: 'pct', unit_cost: 10.50, sort_order: 8 },
  { category: 'materia_prima', description: 'Sal refinado (1kg)', quantity: 1, unit: 'pct', unit_cost: 2.50, sort_order: 9 },
  { category: 'materia_prima', description: 'Extrato de tomate (340g)', quantity: 2, unit: 'un', unit_cost: 4.30, sort_order: 10 },
  { category: 'materia_prima', description: 'Sardinha em lata (125g)', quantity: 2, unit: 'un', unit_cost: 6.90, sort_order: 11 },
  { category: 'materia_prima', description: 'Fubá de milho (1kg)', quantity: 1, unit: 'pct', unit_cost: 4.80, sort_order: 12 },
  // Embalagem
  { category: 'embalagem', description: 'Caixa de papelão (cesta)', quantity: 1, unit: 'un', unit_cost: 4.50, sort_order: 13 },
  { category: 'embalagem', description: 'Fita adesiva', quantity: 0.5, unit: 'rolo', unit_cost: 3.00, sort_order: 14 },
  // Mão de obra
  { category: 'mao_de_obra', description: 'Montagem (rateio por cesta)', quantity: 1, unit: 'un', unit_cost: 5.00, sort_order: 15 },
  // Frete
  { category: 'frete', description: 'Frete de entrega (rateio)', quantity: 1, unit: 'un', unit_cost: 8.00, sort_order: 16 },
  // Impostos
  { category: 'impostos', description: 'Impostos sobre venda (Simples Nacional %)', quantity: 1, unit: '%', unit_cost: 0, sort_order: 17 },
  // Custos fixos
  { category: 'custos_fixos', description: 'Rateio aluguel/luz/água', quantity: 1, unit: 'un', unit_cost: 3.00, sort_order: 18 },
]
