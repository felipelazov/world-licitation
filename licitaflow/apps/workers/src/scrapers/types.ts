// Tipos compartilhados entre scrapers

export interface EditalRaw {
  externalId: string
  numero: string
  uasg: string | null
  orgao: string
  objeto: string
  valorEstimado: number | null
  dataSessao: Date | null
  dataPublicacao: Date
  modalidade: string
  portalUrl: string
  pdfUrl: string | null
  rawData: Record<string, unknown>
}

export interface ScraperResult {
  source: string
  editals: EditalRaw[]
  scrapedAt: Date
  errors: string[]
  stats: {
    found: number
    new: number
    updated: number
    errors: number
  }
}

export interface ScraperConfig {
  keywords: string[]
  maxPages?: number
  dateFrom?: Date
  dateTo?: Date
  rateLimitMs?: number
  maxRetries?: number
  userAgent?: string
}

export const DEFAULT_SCRAPER_CONFIG: Required<Pick<ScraperConfig, 'maxPages' | 'rateLimitMs' | 'maxRetries' | 'userAgent'>> = {
  maxPages: 5,
  rateLimitMs: 2000,
  maxRetries: 3,
  userAgent: 'LicitaFlow/1.0 (+https://licitaflow.com.br)',
}
