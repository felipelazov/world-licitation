// @licitaflow/shared — Tipos, constantes e utils compartilhados

// Edital status
export const EDITAL_STATUS = {
  NOVO: 'novo',
  ANALISANDO: 'analisando',
  GO: 'go',
  NO_GO: 'no_go',
  PROPOSTA_ENVIADA: 'proposta_enviada',
  EM_PREGAO: 'em_pregao',
  ADJUDICADO: 'adjudicado',
  NAO_ADJUDICADO: 'nao_adjudicado',
  CONTRATO: 'contrato',
  DESCARTADO: 'descartado',
} as const

export type EditalStatus = (typeof EDITAL_STATUS)[keyof typeof EDITAL_STATUS]

// Document status
export const DOCUMENT_STATUS = {
  VALIDO: 'valido',
  VENCENDO: 'vencendo',
  VENCIDO: 'vencido',
  PENDENTE: 'pendente',
} as const

export type DocumentStatus = (typeof DOCUMENT_STATUS)[keyof typeof DOCUMENT_STATUS]

// Bidding result
export const BIDDING_RESULT = {
  ADJUDICADO: 'adjudicado',
  CLASSIFICADO: 'classificado',
  NAO_CLASSIFICADO: 'nao_classificado',
  DESCLASSIFICADO: 'desclassificado',
  DESERTO: 'deserto',
  FRACASSADO: 'fracassado',
  PENDENTE: 'pendente',
} as const

export type BiddingResult = (typeof BIDDING_RESULT)[keyof typeof BIDDING_RESULT]

// Subscription plans
export const PLANS = {
  FREE: 'free',
  STARTER: 'starter',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const

export type Plan = (typeof PLANS)[keyof typeof PLANS]

// User roles
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

// Notification types
export const NOTIFICATION_TYPES = {
  EDITAL_NOVO: 'edital_novo',
  CERTIDAO_VENCENDO: 'certidao_vencendo',
  PREGAO_AMANHA: 'pregao_amanha',
  PREGAO_HOJE: 'pregao_hoje',
  PAGAMENTO_ATRASADO: 'pagamento_atrasado',
  ENTREGA_PROGRAMADA: 'entrega_programada',
  CONTRATO_VENCENDO: 'contrato_vencendo',
} as const

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]

// Document status calculator — Story 4.4
export { calculateDocumentStatus, shouldSendAlert } from './documents/status-calculator'
export type { DocStatus, StatusCalcInput, StatusCalcResult } from './documents/status-calculator'

// Habilitacao matcher — Story 4.6
export { matchHabilitacao, STANDARD_HABILITACAO_DOCS } from './documents/habilitacao-matcher'
export type { RequiredDocument, ExistingDocument, ChecklistItem, HabilitacaoResult } from './documents/habilitacao-matcher'

// Scoring engine — Story 3.3
export { calculateScore } from './scoring/go-nogo-engine'
export type {
  ScoringInput,
  ScoringResult,
  GoNoGoDecision,
  EliminatoryCriterionInput,
  ScoringCriterionInput,
} from './scoring/go-nogo-engine'

// Margin calculator — Story 5.3
export { calculateMargin, calculateMarginFromPrice } from './pricing/margin-calculator'
export type { MarginInput, MarginResult } from './pricing/margin-calculator'
