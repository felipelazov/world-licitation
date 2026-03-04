import { describe, it, expect } from 'vitest'
import { calculateMargin, calculateMarginFromPrice } from '../margin-calculator'

describe('calculateMargin', () => {
  it('deve calcular preço de venda com margem desejada', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 20,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    // 100 / (1 - 0.20) = 125
    expect(result.sellingPrice).toBe(125)
    expect(result.desiredMarginValue).toBe(25)
  })

  it('deve calcular preço piso com margem mínima', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 20,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    // 100 / (1 - 0.05) = 105.26
    expect(result.floorPrice).toBe(105.26)
  })

  it('deve incluir imposto no cálculo', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 15,
      floorMarginPct: 5,
      taxRatePct: 6,
    })

    expect(result.taxAmount).toBe(6)
    expect(result.costWithTax).toBe(106)
    // 106 / (1 - 0.15) = 124.71
    expect(result.sellingPrice).toBe(124.71)
  })

  it('deve classificar margem saudável (verde)', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 15,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    expect(result.zone).toBe('green')
    expect(result.zoneLabel).toBe('Margem saudável')
  })

  it('deve classificar margem apertada (amarelo)', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 7,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    expect(result.zone).toBe('yellow')
    expect(result.zoneLabel).toBe('Margem apertada')
  })

  it('deve classificar margem insuficiente (vermelho)', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 3,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    expect(result.zone).toBe('red')
    expect(result.zoneLabel).toBe('Margem insuficiente')
  })

  it('deve calcular diferença com preço referência', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 15,
      floorMarginPct: 5,
      taxRatePct: 0,
      referencePrice: 130,
    })

    // Selling = 117.65, ref = 130 → diff = -12.35 → -9.5%
    expect(result.referencePrice).toBe(130)
    expect(result.referenceDiffValue).toBeLessThan(0) // Abaixo da ref
    expect(result.referenceDiffPct).toBeLessThan(0)
  })

  it('deve retornar null quando sem preço referência', () => {
    const result = calculateMargin({
      totalCost: 100,
      desiredMarginPct: 15,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    expect(result.referencePrice).toBeNull()
    expect(result.referenceDiffPct).toBeNull()
    expect(result.referenceDiffValue).toBeNull()
  })

  it('deve lidar com custo zero', () => {
    const result = calculateMargin({
      totalCost: 0,
      desiredMarginPct: 15,
      floorMarginPct: 5,
      taxRatePct: 0,
    })

    expect(result.sellingPrice).toBe(0)
    expect(result.floorPrice).toBe(0)
  })
})

describe('calculateMarginFromPrice', () => {
  it('deve calcular margem a partir do preço de venda', () => {
    const result = calculateMarginFromPrice(125, 100)
    // (125 - 100) / 125 = 20%
    expect(result.marginPct).toBe(20)
    expect(result.marginValue).toBe(25)
    expect(result.zone).toBe('green')
  })

  it('deve retornar margem negativa quando preço < custo', () => {
    const result = calculateMarginFromPrice(90, 100)
    expect(result.marginPct).toBeLessThan(0)
    expect(result.marginValue).toBe(-10)
    expect(result.zone).toBe('red')
  })

  it('deve classificar zona amarela', () => {
    const result = calculateMarginFromPrice(108, 100)
    // (108-100)/108 = 7.41%
    expect(result.zone).toBe('yellow')
  })

  it('deve lidar com preço zero', () => {
    const result = calculateMarginFromPrice(0, 100)
    expect(result.marginPct).toBe(-100)
    expect(result.zone).toBe('red')
  })
})
