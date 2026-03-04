import { describe, it, expect } from 'vitest'
import {
  EDITAL_STATUS,
  DOCUMENT_STATUS,
  BIDDING_RESULT,
  PLANS,
  ROLES,
  NOTIFICATION_TYPES,
} from '../index'

describe('shared constants', () => {
  it('EDITAL_STATUS has all expected values', () => {
    expect(EDITAL_STATUS.NOVO).toBe('novo')
    expect(EDITAL_STATUS.GO).toBe('go')
    expect(EDITAL_STATUS.NO_GO).toBe('no_go')
    expect(EDITAL_STATUS.ADJUDICADO).toBe('adjudicado')
    expect(Object.keys(EDITAL_STATUS)).toHaveLength(10)
  })

  it('DOCUMENT_STATUS has 4 states', () => {
    expect(DOCUMENT_STATUS.VALIDO).toBe('valido')
    expect(DOCUMENT_STATUS.VENCENDO).toBe('vencendo')
    expect(DOCUMENT_STATUS.VENCIDO).toBe('vencido')
    expect(DOCUMENT_STATUS.PENDENTE).toBe('pendente')
    expect(Object.keys(DOCUMENT_STATUS)).toHaveLength(4)
  })

  it('BIDDING_RESULT has 7 results', () => {
    expect(Object.keys(BIDDING_RESULT)).toHaveLength(7)
    expect(BIDDING_RESULT.ADJUDICADO).toBe('adjudicado')
  })

  it('PLANS has 4 tiers', () => {
    expect(Object.values(PLANS)).toEqual(['free', 'starter', 'pro', 'enterprise'])
  })

  it('ROLES has 4 levels', () => {
    expect(Object.values(ROLES)).toEqual(['admin', 'manager', 'operator', 'viewer'])
  })

  it('NOTIFICATION_TYPES has all types', () => {
    expect(NOTIFICATION_TYPES.EDITAL_NOVO).toBe('edital_novo')
    expect(NOTIFICATION_TYPES.CERTIDAO_VENCENDO).toBe('certidao_vencendo')
    expect(Object.keys(NOTIFICATION_TYPES).length).toBeGreaterThan(0)
  })
})
