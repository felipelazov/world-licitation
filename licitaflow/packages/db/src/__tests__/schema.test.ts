import { describe, it, expect } from 'vitest'
import {
  EDITAL_STATUS_VALUES,
  MODALIDADE_VALUES,
  isValidEditalStatus,
  isValidModalidade,
} from '../schema/editals'

describe('Edital Schema', () => {
  describe('EDITAL_STATUS_VALUES', () => {
    it('has 10 status values', () => {
      expect(EDITAL_STATUS_VALUES).toHaveLength(10)
    })

    it('contains all expected statuses', () => {
      expect(EDITAL_STATUS_VALUES).toContain('novo')
      expect(EDITAL_STATUS_VALUES).toContain('go')
      expect(EDITAL_STATUS_VALUES).toContain('no_go')
      expect(EDITAL_STATUS_VALUES).toContain('adjudicado')
      expect(EDITAL_STATUS_VALUES).toContain('descartado')
    })
  })

  describe('MODALIDADE_VALUES', () => {
    it('has 8 modalidade values', () => {
      expect(MODALIDADE_VALUES).toHaveLength(8)
    })

    it('contains pregao_eletronico', () => {
      expect(MODALIDADE_VALUES).toContain('pregao_eletronico')
    })

    it('contains chamada_publica', () => {
      expect(MODALIDADE_VALUES).toContain('chamada_publica')
    })
  })

  describe('isValidEditalStatus', () => {
    it('returns true for valid status', () => {
      expect(isValidEditalStatus('novo')).toBe(true)
      expect(isValidEditalStatus('go')).toBe(true)
      expect(isValidEditalStatus('contrato')).toBe(true)
    })

    it('returns false for invalid status', () => {
      expect(isValidEditalStatus('invalid')).toBe(false)
      expect(isValidEditalStatus('')).toBe(false)
      expect(isValidEditalStatus('NOVO')).toBe(false)
    })
  })

  describe('isValidModalidade', () => {
    it('returns true for valid modalidade', () => {
      expect(isValidModalidade('pregao_eletronico')).toBe(true)
      expect(isValidModalidade('dispensa')).toBe(true)
    })

    it('returns false for invalid modalidade', () => {
      expect(isValidModalidade('leilao')).toBe(false)
      expect(isValidModalidade('')).toBe(false)
    })
  })
})
