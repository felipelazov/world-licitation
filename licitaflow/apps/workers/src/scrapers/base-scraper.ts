// Base Scraper — lógica comum para todos os scrapers

import type { ScraperConfig, ScraperResult, EditalRaw } from './types'
import { DEFAULT_SCRAPER_CONFIG } from './types'

export abstract class BaseScraper {
  protected config: ScraperConfig & typeof DEFAULT_SCRAPER_CONFIG
  protected errors: string[] = []
  protected source: string

  constructor(source: string, config: ScraperConfig) {
    this.source = source
    this.config = {
      ...DEFAULT_SCRAPER_CONFIG,
      ...config,
    }
  }

  // Subclasses implementam a lógica de scraping
  protected abstract scrapeEditals(): Promise<EditalRaw[]>

  // Executa scraper com retry, rate limiting e error handling
  async execute(): Promise<ScraperResult> {
    const startTime = Date.now()
    this.errors = []

    let editals: EditalRaw[] = []

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        editals = await this.scrapeEditals()
        break
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        this.errors.push(`Attempt ${attempt}/${this.config.maxRetries}: ${message}`)

        if (attempt === this.config.maxRetries) {
          this.log('error', `All ${this.config.maxRetries} attempts failed`)
        } else {
          // Backoff exponencial
          const backoff = this.config.rateLimitMs * Math.pow(2, attempt - 1)
          this.log('warn', `Attempt ${attempt} failed, retrying in ${backoff}ms`)
          await this.sleep(backoff)
        }
      }
    }

    const duration = Date.now() - startTime
    this.log('info', `Scraping completed in ${duration}ms. Found ${editals.length} editals.`)

    return {
      source: this.source,
      editals,
      scrapedAt: new Date(),
      errors: this.errors,
      stats: {
        found: editals.length,
        new: 0, // Atualizado pelo worker após upsert
        updated: 0,
        errors: this.errors.length,
      },
    }
  }

  // Rate limiting helper
  protected async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Rate limit entre requests
  protected async rateLimit(): Promise<void> {
    await this.sleep(this.config.rateLimitMs)
  }

  // Logging estruturado
  protected log(level: 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>): void {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      source: this.source,
      message,
      ...data,
    }
    if (level === 'error') {
      console.error(JSON.stringify(entry))
    } else {
      console.log(JSON.stringify(entry))
    }
  }

  // Helper: filtra editais por keywords
  protected matchesKeywords(edital: EditalRaw): boolean {
    if (this.config.keywords.length === 0) return true

    const searchText = `${edital.objeto} ${edital.orgao}`.toLowerCase()
    return this.config.keywords.some((kw) =>
      searchText.includes(kw.toLowerCase())
    )
  }

  // Helper: parse valor estimado de string
  protected parseValue(valueStr: string | null | undefined): number | null {
    if (!valueStr) return null

    // Remove R$, pontos de milhar, troca vírgula por ponto
    const cleaned = valueStr
      .replace(/R\$\s*/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()

    const value = parseFloat(cleaned)
    return isNaN(value) ? null : value
  }

  // Helper: parse data brasileira (DD/MM/YYYY)
  protected parseDateBR(dateStr: string | null | undefined): Date | null {
    if (!dateStr) return null

    // DD/MM/YYYY ou DD/MM/YYYY HH:mm
    const match = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/)
    if (!match) return null

    const [, day, month, year, hours = '0', minutes = '0'] = match
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    )

    return isNaN(date.getTime()) ? null : date
  }
}
