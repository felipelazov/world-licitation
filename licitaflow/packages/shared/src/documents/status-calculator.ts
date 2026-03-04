// Calculador de status de documento baseado em validade

export type DocStatus = 'valido' | 'vencendo' | 'vencido' | 'pendente'

export interface StatusCalcInput {
  expiresAt: string | null
  alertDaysBefore?: number
}

export interface StatusCalcResult {
  status: DocStatus
  daysUntilExpiry: number | null
  isExpired: boolean
  isExpiring: boolean
}

export function calculateDocumentStatus(
  input: StatusCalcInput,
  referenceDate: Date = new Date()
): StatusCalcResult {
  const { expiresAt, alertDaysBefore = 30 } = input

  if (!expiresAt) {
    return {
      status: 'pendente',
      daysUntilExpiry: null,
      isExpired: false,
      isExpiring: false,
    }
  }

  const expiry = new Date(expiresAt)
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate())
  const expiryDay = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate())

  const diffMs = expiryDay.getTime() - today.getTime()
  const daysUntilExpiry = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (daysUntilExpiry < 0) {
    return {
      status: 'vencido',
      daysUntilExpiry,
      isExpired: true,
      isExpiring: false,
    }
  }

  if (daysUntilExpiry <= alertDaysBefore) {
    return {
      status: 'vencendo',
      daysUntilExpiry,
      isExpired: false,
      isExpiring: true,
    }
  }

  return {
    status: 'valido',
    daysUntilExpiry,
    isExpired: false,
    isExpiring: false,
  }
}

export function shouldSendAlert(
  daysUntilExpiry: number,
  thresholds: readonly number[] = [30, 15, 7, 1, 0]
): { shouldSend: boolean; alertType: 'vencendo' | 'vencido' | null } {
  if (daysUntilExpiry < 0) {
    return { shouldSend: daysUntilExpiry === -1, alertType: 'vencido' }
  }

  if (thresholds.includes(daysUntilExpiry)) {
    return { shouldSend: true, alertType: 'vencendo' }
  }

  return { shouldSend: false, alertType: null }
}
