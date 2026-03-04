// @licitaflow/db — Supabase client e tipos

export { createClient, createBrowserClient, createServiceClient } from './client'
export type { Database, Json } from './types'

// Schema exports — Story 2.1
export {
  EDITAL_STATUS_VALUES,
  MODALIDADE_VALUES,
  isValidEditalStatus,
  isValidModalidade,
} from './schema/editals'
export type { EditalStatusValue, ModalidadeValue } from './schema/editals'
export type { FilterConfig } from './schema/filters'

// Schema exports — Story 3.1
export {
  ANALYSIS_DECISION_VALUES,
  isValidAnalysisDecision,
  DEFAULT_ELIMINATORY_CRITERIA,
  DEFAULT_SCORING_CRITERIA,
  buildEmptyCriteria,
} from './schema/analyses'
export type {
  AnalysisDecision,
  EliminatoryCriterion,
  ScoringCriterion,
  Criterion,
  AnalysisCriteria,
  AnalysisRow,
  AnalysisInsert,
} from './schema/analyses'

// Query helpers — Story 2.1
export {
  getEditals,
  getEditalById,
  createEdital,
  upsertEdital,
  updateEditalStatus,
  getEditalSources,
  getEditalSourceBySlug,
  getEditalFilters,
  createEditalFilter,
} from './queries/editals'
export type { GetEditalsOptions, CreateEditalInput } from './queries/editals'

// Query helpers — Story 3.1
export {
  createAnalysis,
  getAnalysisByEdital,
  getAnalysesByEdital,
  updateAnalysisDecision,
  updateAnalysisCriteria,
  listAnalyses,
  getAnalysisStats,
} from './queries/analyses'
export type { ListAnalysesOptions } from './queries/analyses'

// Schema exports — Story 4.1
export {
  DOCUMENT_STATUS_VALUES,
  ALERT_TYPE_VALUES,
  isValidDocumentStatus,
  DEFAULT_ALERT_THRESHOLDS,
  HABILITACAO_CATEGORIES,
} from './schema/documents'
export type {
  DocumentStatusValue,
  AlertTypeValue,
  DocumentRow as DocRow,
  DocumentInsertInput,
  DocumentCategoryRow,
  DocumentAlertRow,
} from './schema/documents'

// Query helpers — Story 4.1
export {
  listDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getExpiringDocuments,
  getDocumentStats,
  getDocumentCategories,
  getCategoryDocCount,
  getDocumentAlerts,
  createDocumentAlert,
  markAlertSent,
  getPendingAlerts,
} from './queries/documents'
export type { ListDocumentsOptions } from './queries/documents'

// Schema exports — Story 5.1
export {
  COST_CATEGORY_VALUES,
  COST_CATEGORY_LABELS,
  isValidCostCategory,
  CESTA_BASICA_TEMPLATE,
} from './schema/costs'
export type {
  CostCategoryValue,
  CostSheetRow,
  CostSheetInsertInput,
  CostItemRow as CostItemDbRow,
  CostItemInsertInput,
} from './schema/costs'

// Query helpers — Story 5.1
export {
  listCostSheets,
  getCostSheetById,
  createCostSheet,
  updateCostSheet,
  deleteCostSheet,
  duplicateCostSheet,
  getCostItems,
  createCostItem,
  updateCostItem,
  deleteCostItem,
  bulkCreateCostItems,
  calculateCostTotals,
} from './queries/costs'
export type { ListCostSheetsOptions, CostTotals } from './queries/costs'

// Schema exports — Story 6.1
export {
  BIDDING_STATUS_VALUES,
  BIDDING_RESULT_VALUES,
  isValidBiddingResult,
} from './schema/bidding'
export type {
  BiddingStatusValue,
  BiddingResultValue,
  BiddingSessionRow,
  BiddingSessionInsertInput,
  BidRow as BidDbRow,
  BidInsertInput,
} from './schema/bidding'

// Query helpers — Story 6.1
export {
  listBiddingSessions,
  getBiddingSessionById,
  getBiddingSessionByEdital,
  createBiddingSession,
  updateBiddingSession,
  getBids,
  createBid,
  getLowestBid,
  getMyLastBid,
} from './queries/bidding'

// Schema exports — Story 7.1
export {
  NOTIFICATION_TYPE_VALUES,
  NOTIFICATION_CHANNEL_VALUES,
  DEFAULT_NOTIFICATION_PREFERENCES,
} from './schema/notifications'
export type {
  NotificationTypeValue,
  NotificationChannelValue,
  NotificationRow,
  NotificationInsertInput,
  NotificationPreferenceRow,
} from './schema/notifications'

// Query helpers — Story 7.1
export {
  listNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
  getNotificationPreferences,
  upsertNotificationPreference,
} from './queries/notifications'

// Import type for re-export
import type { Database } from './types'

// Re-export table types for convenience — Story 1.2 (base)
export type Tenant = Database['public']['Tables']['tenants']['Row']
export type TenantInsert = Database['public']['Tables']['tenants']['Insert']
export type TenantUpdate = Database['public']['Tables']['tenants']['Update']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']

// Story 1.3 — Core tables
export type EditalSource = Database['public']['Tables']['edital_sources']['Row']
export type EditalSourceInsert = Database['public']['Tables']['edital_sources']['Insert']

export type Edital = Database['public']['Tables']['editals']['Row']
export type EditalInsert = Database['public']['Tables']['editals']['Insert']
export type EditalUpdate = Database['public']['Tables']['editals']['Update']

export type EditalFilter = Database['public']['Tables']['edital_filters']['Row']
export type EditalFilterInsert = Database['public']['Tables']['edital_filters']['Insert']
export type EditalFilterUpdate = Database['public']['Tables']['edital_filters']['Update']

export type EditalAnalysis = Database['public']['Tables']['edital_analyses']['Row']
export type EditalAnalysisInsert = Database['public']['Tables']['edital_analyses']['Insert']
export type EditalAnalysisUpdate = Database['public']['Tables']['edital_analyses']['Update']

export type DocumentCategory = Database['public']['Tables']['document_categories']['Row']

export type Document = Database['public']['Tables']['documents']['Row']
export type DocumentInsert = Database['public']['Tables']['documents']['Insert']
export type DocumentUpdate = Database['public']['Tables']['documents']['Update']

export type DocumentAlert = Database['public']['Tables']['document_alerts']['Row']
export type DocumentAlertInsert = Database['public']['Tables']['document_alerts']['Insert']

export type CostSheet = Database['public']['Tables']['cost_sheets']['Row']
export type CostSheetInsert = Database['public']['Tables']['cost_sheets']['Insert']
export type CostSheetUpdate = Database['public']['Tables']['cost_sheets']['Update']

export type CostItem = Database['public']['Tables']['cost_items']['Row']
export type CostItemInsert = Database['public']['Tables']['cost_items']['Insert']
export type CostItemUpdate = Database['public']['Tables']['cost_items']['Update']

export type BiddingSession = Database['public']['Tables']['bidding_sessions']['Row']
export type BiddingSessionInsert = Database['public']['Tables']['bidding_sessions']['Insert']
export type BiddingSessionUpdate = Database['public']['Tables']['bidding_sessions']['Update']

export type Bid = Database['public']['Tables']['bids']['Row']
export type BidInsert = Database['public']['Tables']['bids']['Insert']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

export type NotificationPreference = Database['public']['Tables']['notification_preferences']['Row']
export type NotificationPreferenceInsert = Database['public']['Tables']['notification_preferences']['Insert']
export type NotificationPreferenceUpdate = Database['public']['Tables']['notification_preferences']['Update']
