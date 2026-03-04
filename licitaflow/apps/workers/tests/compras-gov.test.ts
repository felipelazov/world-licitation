import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ComprasGovScraper } from '../src/scrapers/compras-gov'
import type { ScraperConfig } from '../src/scrapers/types'

// Mock fetch global
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function createMockPNCPResponse(items: Record<string, unknown>[] = []) {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => ({
      data: items,
      totalRegistros: items.length,
      totalPaginas: 1,
      paginaAtual: 1,
    }),
  }
}

const samplePNCPItem = {
  codigoModalidadeContratacao: 6,
  anoCompra: 2026,
  sequencialCompra: 1,
  numeroCompra: 'PE 001/2026',
  orgaoEntidade: {
    razaoSocial: 'Prefeitura Municipal de São Paulo',
    cnpj: '46.395.000/0001-39',
  },
  unidadeOrgao: {
    nomeUnidade: 'Secretaria de Educação',
    codigoUnidade: '260101',
  },
  objetoCompra: 'Aquisição de gêneros alimentícios para merenda escolar - cesta básica',
  valorTotalEstimado: 500000.0,
  dataPublicacaoPncp: '2026-03-01T10:00:00',
  dataAberturaProposta: '2026-03-15T09:00:00',
  dataEncerramentoProposta: '2026-03-15T18:00:00',
  linkSistemaOrigem: 'https://comprasnet.gov.br/livre/Pregao/001-2026',
  modalidadeNome: 'Pregão Eletrônico',
  situacaoCompraId: 1,
  situacaoCompraNome: 'Divulgada no PNCP',
}

describe('ComprasGovScraper', () => {
  const baseConfig: ScraperConfig = {
    keywords: ['cesta basica', 'alimentícios'],
    maxPages: 2,
    rateLimitMs: 0, // sem delay nos testes
    maxRetries: 2,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Silenciar console nos testes
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('scrapes editais from PNCP API', async () => {
    mockFetch
      .mockResolvedValueOnce(createMockPNCPResponse([samplePNCPItem]))
      .mockResolvedValueOnce(createMockPNCPResponse([]))

    const scraper = new ComprasGovScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.source).toBe('compras_gov_br')
    expect(result.editals).toHaveLength(1)
    expect(result.errors).toHaveLength(0)

    const edital = result.editals[0]
    expect(edital.numero).toBe('PE 001/2026')
    expect(edital.orgao).toBe('Secretaria de Educação')
    expect(edital.objeto).toContain('cesta básica')
    expect(edital.valorEstimado).toBe(500000.0)
    expect(edital.modalidade).toBe('Pregão Eletrônico')
    expect(edital.uasg).toBe('260101')
  })

  it('filters by keywords', async () => {
    const nonMatchingItem = {
      ...samplePNCPItem,
      objetoCompra: 'Aquisição de material de escritório',
      orgaoEntidade: {
        ...samplePNCPItem.orgaoEntidade,
        razaoSocial: 'Tribunal de Justiça',
      },
      unidadeOrgao: {
        ...samplePNCPItem.unidadeOrgao,
        nomeUnidade: 'Diretoria Administrativa',
      },
    }

    mockFetch
      .mockResolvedValueOnce(createMockPNCPResponse([samplePNCPItem, nonMatchingItem]))
      .mockResolvedValueOnce(createMockPNCPResponse([]))

    const scraper = new ComprasGovScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(1)
    expect(result.editals[0].objeto).toContain('cesta básica')
  })

  it('handles page-level API errors gracefully', async () => {
    // Page 1 returns an API error, page 2 not requested (page 1 error is non-fatal)
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Internal Server Error' })
      .mockResolvedValueOnce(createMockPNCPResponse([samplePNCPItem]))

    const scraper = new ComprasGovScraper(baseConfig)
    const result = await scraper.execute()

    // Page 1 failed but page 2 worked
    expect(result.editals).toHaveLength(1)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]).toContain('PNCP API error: 500')
  })

  it('returns empty when all retries fail', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    })

    const scraper = new ComprasGovScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(0)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('generates valid externalId', async () => {
    mockFetch
      .mockResolvedValueOnce(createMockPNCPResponse([samplePNCPItem]))
      .mockResolvedValueOnce(createMockPNCPResponse([]))

    const scraper = new ComprasGovScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals[0].externalId).toBe('pncp-46.395.000/0001-39-2026-1')
  })

  it('handles missing optional fields', async () => {
    const minimalItem = {
      anoCompra: 2026,
      sequencialCompra: 2,
      objetoCompra: 'Cesta basica para alimentação escolar',
      dataPublicacaoPncp: '2026-03-01T10:00:00',
    }

    mockFetch
      .mockResolvedValueOnce(createMockPNCPResponse([minimalItem]))
      .mockResolvedValueOnce(createMockPNCPResponse([]))

    const scraper = new ComprasGovScraper({
      ...baseConfig,
      keywords: ['cesta basica'],
    })
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(1)
    const edital = result.editals[0]
    expect(edital.orgao).toBe('Órgão não informado')
    expect(edital.valorEstimado).toBeNull()
    expect(edital.uasg).toBeNull()
    expect(edital.pdfUrl).toBeNull()
  })

  it('paginates through multiple pages', async () => {
    const items1 = Array.from({ length: 50 }, (_, i) => ({
      ...samplePNCPItem,
      sequencialCompra: i + 1,
      numeroCompra: `PE ${String(i + 1).padStart(3, '0')}/2026`,
    }))
    const items2 = [
      {
        ...samplePNCPItem,
        sequencialCompra: 51,
        numeroCompra: 'PE 051/2026',
      },
    ]

    mockFetch
      .mockResolvedValueOnce(createMockPNCPResponse(items1))
      .mockResolvedValueOnce(createMockPNCPResponse(items2))

    const scraper = new ComprasGovScraper(baseConfig)
    const result = await scraper.execute()

    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(result.editals).toHaveLength(51)
  })
})
