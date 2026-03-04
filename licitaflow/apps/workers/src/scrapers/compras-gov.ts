// Scraper — Compras.gov.br (Portal Nacional de Contratações Públicas)
// Usa a API pública do PNCP + fallback Playwright pra páginas sem API

import { BaseScraper } from './base-scraper'
import type { ScraperConfig, EditalRaw } from './types'

// API do PNCP — https://pncp.gov.br/api/consulta/
const PNCP_API_BASE = 'https://pncp.gov.br/api/consulta/v1'

interface PNCPItem {
  codigoModalidadeContratacao?: number
  anoCompra?: number
  sequencialCompra?: number
  numeroCompra?: string
  orgaoEntidade?: {
    razaoSocial?: string
    cnpj?: string
  }
  unidadeOrgao?: {
    nomeUnidade?: string
    codigoUnidade?: string
  }
  amparoLegal?: {
    descricao?: string
  }
  objetoCompra?: string
  valorTotalEstimado?: number
  valorTotalHomologado?: number
  dataPublicacaoPncp?: string
  dataAberturaProposta?: string
  dataEncerramentoProposta?: string
  linkSistemaOrigem?: string
  modalidadeNome?: string
  situacaoCompraId?: number
  situacaoCompraNome?: string
}

interface PNCPResponse {
  data?: PNCPItem[]
  totalRegistros?: number
  totalPaginas?: number
  paginaAtual?: number
}

export class ComprasGovScraper extends BaseScraper {
  constructor(config: ScraperConfig) {
    super('compras_gov_br', config)
  }

  protected async scrapeEditals(): Promise<EditalRaw[]> {
    const allEditals: EditalRaw[] = []

    for (let page = 1; page <= this.config.maxPages; page++) {
      try {
        const items = await this.fetchFromPNCP(page)

        if (items.length === 0) {
          this.log('info', `Page ${page}: no more results`)
          break
        }

        const parsed = items
          .map((item) => this.parseItem(item))
          .filter((e): e is EditalRaw => e !== null)
          .filter((e) => this.matchesKeywords(e))

        allEditals.push(...parsed)

        this.log('info', `Page ${page}: ${items.length} items, ${parsed.length} matched keywords`)

        if (page < this.config.maxPages) {
          await this.rateLimit()
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        this.errors.push(`Page ${page}: ${message}`)
        this.log('error', `Page ${page} failed`, { error: message })
      }
    }

    return allEditals
  }

  private async fetchFromPNCP(page: number): Promise<PNCPItem[]> {
    // Busca pregões eletrônicos publicados recentemente
    const params = new URLSearchParams({
      dataInicial: this.getDateFrom(),
      dataFinal: this.getDateTo(),
      codigoModalidadeContratacao: '6', // 6 = Pregão Eletrônico
      pagina: String(page),
      tamanhoPagina: '50',
    })

    const url = `${PNCP_API_BASE}/contratacoes/publicacao?${params}`

    this.log('info', `Fetching PNCP API page ${page}`, { url })

    const response = await fetch(url, {
      headers: {
        'User-Agent': this.config.userAgent,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`PNCP API error: ${response.status} ${response.statusText}`)
    }

    const body = (await response.json()) as PNCPResponse

    return body.data ?? []
  }

  private parseItem(item: PNCPItem): EditalRaw | null {
    try {
      const orgao = item.unidadeOrgao?.nomeUnidade
        ?? item.orgaoEntidade?.razaoSocial
        ?? 'Órgão não informado'

      const numero = item.numeroCompra
        ?? `${item.anoCompra}/${item.sequencialCompra}`

      const externalId = `pncp-${item.orgaoEntidade?.cnpj}-${item.anoCompra}-${item.sequencialCompra}`

      return {
        externalId,
        numero,
        uasg: item.unidadeOrgao?.codigoUnidade ?? null,
        orgao,
        objeto: item.objetoCompra ?? '',
        valorEstimado: item.valorTotalEstimado ?? null,
        dataSessao: item.dataAberturaProposta
          ? new Date(item.dataAberturaProposta)
          : null,
        dataPublicacao: item.dataPublicacaoPncp
          ? new Date(item.dataPublicacaoPncp)
          : new Date(),
        modalidade: item.modalidadeNome ?? 'pregao_eletronico',
        portalUrl: item.linkSistemaOrigem ?? `https://pncp.gov.br/app/editais/${externalId}`,
        pdfUrl: null,
        rawData: item as unknown as Record<string, unknown>,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      this.errors.push(`Parse error: ${message}`)
      return null
    }
  }

  private getDateFrom(): string {
    if (this.config.dateFrom) {
      return this.formatDate(this.config.dateFrom)
    }
    // Default: últimos 7 dias
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return this.formatDate(date)
  }

  private getDateTo(): string {
    if (this.config.dateTo) {
      return this.formatDate(this.config.dateTo)
    }
    return this.formatDate(new Date())
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0] // YYYY-MM-DD
  }
}
