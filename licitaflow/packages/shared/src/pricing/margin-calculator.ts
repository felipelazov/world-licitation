// Calculadora de Margem — função pura para cálculo de preço e margem

export interface MarginInput {
  totalCost: number
  desiredMarginPct: number  // Ex: 15 = 15%
  floorMarginPct: number    // Ex: 5 = 5%
  taxRatePct: number        // Ex: 6 = 6% (Simples Nacional)
  referencePrice?: number   // Preço de referência do edital
}

export interface MarginResult {
  // Preços
  totalCost: number
  taxAmount: number
  costWithTax: number
  sellingPrice: number        // Preço de venda desejado
  floorPrice: number          // Preço mínimo (piso)

  // Margens
  desiredMarginPct: number
  desiredMarginValue: number  // Margem em R$
  floorMarginPct: number
  floorMarginValue: number

  // Comparação com referência
  referencePrice: number | null
  referenceDiffPct: number | null  // +/- % em relação ao preço referência
  referenceDiffValue: number | null

  // Classificação
  zone: 'green' | 'yellow' | 'red'  // Verde = saudável, Amarelo = apertado, Vermelho = prejuízo
  zoneLabel: string
}

export function calculateMargin(input: MarginInput): MarginResult {
  const { totalCost, desiredMarginPct, floorMarginPct, taxRatePct, referencePrice } = input

  // Calculo de imposto sobre custo
  const taxAmount = totalCost * (taxRatePct / 100)
  const costWithTax = totalCost + taxAmount

  // Preço de venda = custo com imposto / (1 - margem desejada)
  const sellingPrice = costWithTax / (1 - desiredMarginPct / 100)
  const floorPrice = costWithTax / (1 - floorMarginPct / 100)

  // Margens em R$
  const desiredMarginValue = sellingPrice - costWithTax
  const floorMarginValue = floorPrice - costWithTax

  // Comparação com referência
  let referenceDiffPct: number | null = null
  let referenceDiffValue: number | null = null

  if (referencePrice && referencePrice > 0) {
    referenceDiffValue = sellingPrice - referencePrice
    referenceDiffPct = ((sellingPrice - referencePrice) / referencePrice) * 100
  }

  // Zona de classificação baseada na margem desejada
  let zone: 'green' | 'yellow' | 'red'
  let zoneLabel: string

  if (desiredMarginPct >= 10) {
    zone = 'green'
    zoneLabel = 'Margem saudável'
  } else if (desiredMarginPct >= floorMarginPct) {
    zone = 'yellow'
    zoneLabel = 'Margem apertada'
  } else {
    zone = 'red'
    zoneLabel = 'Margem insuficiente'
  }

  return {
    totalCost,
    taxAmount: round(taxAmount),
    costWithTax: round(costWithTax),
    sellingPrice: round(sellingPrice),
    floorPrice: round(floorPrice),
    desiredMarginPct,
    desiredMarginValue: round(desiredMarginValue),
    floorMarginPct,
    floorMarginValue: round(floorMarginValue),
    referencePrice: referencePrice ?? null,
    referenceDiffPct: referenceDiffPct !== null ? round(referenceDiffPct) : null,
    referenceDiffValue: referenceDiffValue !== null ? round(referenceDiffValue) : null,
    zone,
    zoneLabel,
  }
}

/**
 * Calcula a margem resultante dado um preço de venda e custo
 */
export function calculateMarginFromPrice(
  sellingPrice: number,
  costWithTax: number
): { marginPct: number; marginValue: number; zone: 'green' | 'yellow' | 'red' } {
  if (sellingPrice <= 0) {
    return { marginPct: -100, marginValue: -costWithTax, zone: 'red' }
  }

  const marginValue = sellingPrice - costWithTax
  const marginPct = (marginValue / sellingPrice) * 100

  let zone: 'green' | 'yellow' | 'red'
  if (marginPct >= 10) zone = 'green'
  else if (marginPct >= 5) zone = 'yellow'
  else zone = 'red'

  return { marginPct: round(marginPct), marginValue: round(marginValue), zone }
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}
