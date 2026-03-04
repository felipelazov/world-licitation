// Scraper — BEC-SP (Bolsa Eletrônica de Compras de São Paulo)
// 100% headless (Playwright) — sem API pública

import { BaseScraper } from './base-scraper'
import type { ScraperConfig, EditalRaw } from './types'

// URLs do BEC-SP
const BEC_BASE_URL = 'https://www.bec.sp.gov.br'
const BEC_PREGAO_URL = `${BEC_BASE_URL}/BEC_Pesquisa_OC.aspx`

// Playwright import dinâmico para não bloquear quando não instalado
async function getPlaywright() {
  try {
    const pw = await import('playwright')
    return pw.chromium
  } catch {
    throw new Error('Playwright not installed. Run: pnpm add playwright')
  }
}

interface BECPregaoRow {
  numero: string
  orgao: string
  objeto: string
  valorEstimado: string | null
  dataSessao: string | null
  dataPublicacao: string | null
  link: string
}

export class BecSpScraper extends BaseScraper {
  constructor(config: ScraperConfig) {
    super('bec_sp', config)
  }

  protected async scrapeEditals(): Promise<EditalRaw[]> {
    const chromium = await getPlaywright()
    const browser = await chromium.launch({ headless: true })

    try {
      const context = await browser.newContext({
        userAgent: this.config.userAgent,
      })
      const page = await context.newPage()

      // Timeout para páginas lentas
      page.setDefaultTimeout(30000)

      const allEditals: EditalRaw[] = []

      for (let pageNum = 1; pageNum <= this.config.maxPages; pageNum++) {
        try {
          const rows = await this.scrapePage(page, pageNum)

          if (rows.length === 0) {
            this.log('info', `Page ${pageNum}: no results, stopping`)
            break
          }

          const parsed = rows
            .map((row) => this.parseRow(row))
            .filter((e): e is EditalRaw => e !== null)
            .filter((e) => this.matchesKeywords(e))

          allEditals.push(...parsed)

          this.log('info', `Page ${pageNum}: ${rows.length} rows, ${parsed.length} matched`)

          if (pageNum < this.config.maxPages) {
            await this.rateLimit()
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          this.errors.push(`Page ${pageNum}: ${message}`)
          this.log('error', `Page ${pageNum} failed`, { error: message })
        }
      }

      return allEditals
    } finally {
      await browser.close()
    }
  }

  private async scrapePage(page: import('playwright').Page, pageNum: number): Promise<BECPregaoRow[]> {
    if (pageNum === 1) {
      await page.goto(BEC_PREGAO_URL, { waitUntil: 'networkidle' })

      // Detectar CAPTCHA
      const captcha = await page.locator('[id*="captcha"], [class*="captcha"]').count()
      if (captcha > 0) {
        throw new Error('CAPTCHA detected — manual intervention required')
      }
    } else {
      // Navegar para próxima página (botão de paginação)
      const nextBtn = page.locator(`a[href*="Page$${pageNum}"], [data-page="${pageNum}"]`)
      if (await nextBtn.count() === 0) {
        return []
      }
      await nextBtn.first().click()
      await page.waitForLoadState('networkidle')
    }

    // Extrair linhas da tabela de pregões
    // page.evaluate roda no browser context (document é global lá)
    const rows: BECPregaoRow[] = await page.evaluate(() => {
      /* eslint-disable no-undef */
      const table = document.querySelector('table.grid, table[id*="Grid"], table.resultado')
      if (!table) return [] as { numero: string; orgao: string; objeto: string; valorEstimado: string | null; dataSessao: string | null; dataPublicacao: string | null; link: string }[]

      const trs = table.querySelectorAll('tbody tr, tr:not(:first-child)')
      const results: { numero: string; orgao: string; objeto: string; valorEstimado: string | null; dataSessao: string | null; dataPublicacao: string | null; link: string }[] = []

      trs.forEach((tr: Element) => {
        const cells = tr.querySelectorAll('td')
        if (cells.length < 4) return

        const link = tr.querySelector('a') as HTMLAnchorElement | null
        results.push({
          numero: cells[0]?.textContent?.trim() ?? '',
          orgao: cells[1]?.textContent?.trim() ?? '',
          objeto: cells[2]?.textContent?.trim() ?? '',
          valorEstimado: cells[3]?.textContent?.trim() ?? null,
          dataSessao: cells[4]?.textContent?.trim() ?? null,
          dataPublicacao: cells[5]?.textContent?.trim() ?? null,
          link: link?.href ?? '',
        })
      })

      return results
    })

    return rows
  }

  private parseRow(row: BECPregaoRow): EditalRaw | null {
    try {
      if (!row.numero || !row.objeto) return null

      const externalId = `bec-sp-${row.numero.replace(/\s+/g, '-')}`

      return {
        externalId,
        numero: row.numero,
        uasg: null,
        orgao: row.orgao || 'Órgão não informado',
        objeto: row.objeto,
        valorEstimado: this.parseValue(row.valorEstimado),
        dataSessao: this.parseDateBR(row.dataSessao),
        dataPublicacao: this.parseDateBR(row.dataPublicacao) ?? new Date(),
        modalidade: 'pregao_eletronico',
        portalUrl: row.link || BEC_PREGAO_URL,
        pdfUrl: null,
        rawData: row as unknown as Record<string, unknown>,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      this.errors.push(`Parse error: ${message}`)
      return null
    }
  }
}
