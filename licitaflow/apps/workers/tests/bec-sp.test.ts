import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ScraperConfig } from '../src/scrapers/types'

// Mock playwright BEFORE importing BecSpScraper
const mockEvaluate = vi.fn()
const mockGoto = vi.fn()
const mockSetDefaultTimeout = vi.fn()
const mockWaitForLoadState = vi.fn()
const mockLocatorCount = vi.fn()
const mockLocatorClick = vi.fn()
const mockLocatorFirst = vi.fn().mockReturnValue({ click: mockLocatorClick })
const mockLocator = vi.fn().mockReturnValue({ count: mockLocatorCount, first: mockLocatorFirst })
const mockBrowserClose = vi.fn()

const mockPage = {
  goto: mockGoto,
  setDefaultTimeout: mockSetDefaultTimeout,
  waitForLoadState: mockWaitForLoadState,
  evaluate: mockEvaluate,
  locator: mockLocator,
}

vi.mock('playwright', () => ({
  chromium: {
    launch: vi.fn().mockResolvedValue({
      newContext: vi.fn().mockResolvedValue({
        newPage: vi.fn().mockResolvedValue(mockPage),
      }),
      close: mockBrowserClose,
    }),
  },
}))

// Import AFTER mock
import { BecSpScraper } from '../src/scrapers/bec-sp'

// Suppress console in tests
vi.spyOn(console, 'log').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})

describe('BecSpScraper', () => {
  const baseConfig: ScraperConfig = {
    keywords: ['cesta basica', 'alimenticios'],
    maxPages: 1,
    rateLimitMs: 0,
    maxRetries: 1,
  }

  beforeEach(() => {
    mockEvaluate.mockReset()
    mockGoto.mockReset()
    mockBrowserClose.mockReset()
    mockLocatorCount.mockReset()
    mockLocator.mockReturnValue({ count: mockLocatorCount, first: mockLocatorFirst })

    // Default: no captcha
    mockLocatorCount.mockResolvedValue(0)
  })

  it('scrapes editais from BEC-SP page', async () => {
    mockEvaluate.mockResolvedValueOnce([
      {
        numero: 'OC 12345/2026',
        orgao: 'Secretaria de Educação - SP',
        objeto: 'Aquisição de cesta basica para alimentação escolar',
        valorEstimado: 'R$ 250.000,00',
        dataSessao: '15/03/2026 09:00',
        dataPublicacao: '01/03/2026',
        link: 'https://www.bec.sp.gov.br/detalhes/12345',
      },
    ])

    const scraper = new BecSpScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.source).toBe('bec_sp')
    expect(result.editals).toHaveLength(1)

    const edital = result.editals[0]
    expect(edital.numero).toBe('OC 12345/2026')
    expect(edital.orgao).toBe('Secretaria de Educação - SP')
    expect(edital.valorEstimado).toBe(250000)
    expect(edital.externalId).toBe('bec-sp-OC-12345/2026')
    expect(edital.modalidade).toBe('pregao_eletronico')
  })

  it('filters by keywords', async () => {
    mockEvaluate.mockResolvedValueOnce([
      {
        numero: 'OC 111/2026',
        orgao: 'Sec Educação',
        objeto: 'Aquisição de cesta basica',
        valorEstimado: null,
        dataSessao: null,
        dataPublicacao: null,
        link: '',
      },
      {
        numero: 'OC 222/2026',
        orgao: 'Tribunal de Justiça',
        objeto: 'Aquisição de material de escritório',
        valorEstimado: null,
        dataSessao: null,
        dataPublicacao: null,
        link: '',
      },
    ])

    const scraper = new BecSpScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(1)
    expect(result.editals[0].numero).toBe('OC 111/2026')
  })

  it('detects CAPTCHA and reports error', async () => {
    mockLocatorCount.mockResolvedValue(1)

    const scraper = new BecSpScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(0)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors.some((e) => e.includes('CAPTCHA'))).toBe(true)
  })

  it('handles empty results gracefully', async () => {
    mockEvaluate.mockResolvedValueOnce([])

    const scraper = new BecSpScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(0)
  })

  it('parses Brazilian date and currency format', async () => {
    mockEvaluate.mockResolvedValueOnce([
      {
        numero: 'OC 333/2026',
        orgao: 'Prefeitura',
        objeto: 'Cesta basica',
        valorEstimado: 'R$ 100.500,75',
        dataSessao: '20/03/2026 14:30',
        dataPublicacao: '10/03/2026',
        link: '',
      },
    ])

    const scraper = new BecSpScraper(baseConfig)
    const result = await scraper.execute()

    expect(result.editals).toHaveLength(1)
    const edital = result.editals[0]
    expect(edital.valorEstimado).toBe(100500.75)
    expect(edital.dataSessao).toBeInstanceOf(Date)
    expect(edital.dataSessao?.getDate()).toBe(20)
    expect(edital.dataSessao?.getMonth()).toBe(2) // March = 2
    expect(edital.dataSessao?.getHours()).toBe(14)
  })

  it('closes browser after scraping', async () => {
    mockEvaluate.mockResolvedValueOnce([])

    const scraper = new BecSpScraper(baseConfig)
    await scraper.execute()

    expect(mockBrowserClose).toHaveBeenCalled()
  })

  it('closes browser even on error', async () => {
    mockEvaluate.mockRejectedValueOnce(new Error('Page crashed'))

    const scraper = new BecSpScraper(baseConfig)
    await scraper.execute()

    expect(mockBrowserClose).toHaveBeenCalled()
  })
})
