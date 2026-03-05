/**
 * PNCP API Client — Portal Nacional de Contratacoes Publicas
 * API publica, sem autenticacao.
 * Docs: https://pncp.gov.br/api/consulta/swagger-ui/index.html
 */

const PNCP_BASE_URL = 'https://pncp.gov.br/api/consulta'
const MAX_PAGE_SIZE = 50
const RATE_LIMIT_MS = 500 // 2 req/s

// Codigos de modalidade
export const MODALIDADES = {
  PREGAO_ELETRONICO: 6,
  PREGAO_PRESENCIAL: 7,
  DISPENSA: 8,
  INEXIGIBILIDADE: 9,
  CONCORRENCIA_ELETRONICA: 4,
} as const

export interface PNCPContratacao {
  orgaoEntidade: {
    cnpj: string
    razaoSocial: string
    esferaId: string
    poderId: string
  }
  unidadeOrgao: {
    ufNome: string
    ufSigla: string
    municipioNome: string
    codigoIbge: string
    nomeUnidade: string
    codigoUnidade: string
  }
  anoCompra: number
  sequencialCompra: number
  numeroCompra: string
  numeroControlePNCP: string
  objetoCompra: string
  informacaoComplementar: string
  linkSistemaOrigem: string
  modalidadeId: number
  modalidadeNome: string
  situacaoCompraId: number
  situacaoCompraNome: string
  valorTotalEstimado: number
  valorTotalHomologado: number
  dataPublicacaoPncp: string
  dataAberturaProposta: string
  dataEncerramentoProposta: string
  dataInclusao: string
  dataAtualizacao: string
  existeResultado: boolean
  srpiNaoInformado: boolean
}

export interface PNCPResponse {
  data: PNCPContratacao[]
  totalRegistros: number
  totalPaginas: number
  numeroPagina: number
  paginasRestantes: number
  empty: boolean
}

export interface PNCPSearchParams {
  dataInicial: string  // YYYYMMDD
  dataFinal: string    // YYYYMMDD
  codigoModalidadeContratacao: number
  uf?: string
  codigoMunicipioIbge?: string
  pagina?: number
  tamanhoPagina?: number
}

function formatDatePNCP(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(15000),
      })

      if (response.status === 204) {
        return new Response(JSON.stringify({ data: [], totalRegistros: 0, totalPaginas: 0, numeroPagina: 1, paginasRestantes: 0, empty: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (response.ok) return response

      if (response.status >= 500 && attempt < retries) {
        await sleep(1000 * attempt)
        continue
      }

      throw new Error(`PNCP API error: ${response.status} ${response.statusText}`)
    } catch (error) {
      if (attempt === retries) throw error
      await sleep(1000 * attempt)
    }
  }
  throw new Error('PNCP API: max retries exceeded')
}

/**
 * Busca contratacoes por data de publicacao no PNCP.
 * Retorna todas as paginas automaticamente.
 */
export async function fetchEditaisByDate(params: {
  dataInicial: Date
  dataFinal: Date
  modalidade?: number
  uf?: string
  municipioIbge?: string
}): Promise<PNCPContratacao[]> {
  const { dataInicial, dataFinal, modalidade = MODALIDADES.PREGAO_ELETRONICO, uf, municipioIbge } = params

  const searchParams = new URLSearchParams({
    dataInicial: formatDatePNCP(dataInicial),
    dataFinal: formatDatePNCP(dataFinal),
    codigoModalidadeContratacao: String(modalidade),
    tamanhoPagina: String(MAX_PAGE_SIZE),
    pagina: '1',
  })

  if (uf) searchParams.set('uf', uf)
  if (municipioIbge) searchParams.set('codigoMunicipioIbge', municipioIbge)

  const allResults: PNCPContratacao[] = []
  let pagina = 1
  let totalPaginas = 1

  do {
    searchParams.set('pagina', String(pagina))
    const url = `${PNCP_BASE_URL}/v1/contratacoes/publicacao?${searchParams}`

    const response = await fetchWithRetry(url)
    const json: PNCPResponse = await response.json()

    if (json.empty || !json.data?.length) break

    allResults.push(...json.data)
    totalPaginas = json.totalPaginas
    pagina++

    if (pagina <= totalPaginas) {
      await sleep(RATE_LIMIT_MS)
    }
  } while (pagina <= totalPaginas)

  return allResults
}

/**
 * Busca contratacoes com proposta ainda aberta.
 */
export async function fetchEditaisPropostaAberta(params: {
  dataInicial: Date
  dataFinal: Date
  modalidade?: number
  uf?: string
}): Promise<PNCPContratacao[]> {
  const { dataInicial, dataFinal, modalidade = MODALIDADES.PREGAO_ELETRONICO, uf } = params

  const searchParams = new URLSearchParams({
    dataInicial: formatDatePNCP(dataInicial),
    dataFinal: formatDatePNCP(dataFinal),
    codigoModalidadeContratacao: String(modalidade),
    tamanhoPagina: String(MAX_PAGE_SIZE),
    pagina: '1',
  })

  if (uf) searchParams.set('uf', uf)

  const allResults: PNCPContratacao[] = []
  let pagina = 1
  let totalPaginas = 1

  do {
    searchParams.set('pagina', String(pagina))
    const url = `${PNCP_BASE_URL}/v1/contratacoes/proposta?${searchParams}`

    const response = await fetchWithRetry(url)
    const json: PNCPResponse = await response.json()

    if (json.empty || !json.data?.length) break

    allResults.push(...json.data)
    totalPaginas = json.totalPaginas
    pagina++

    if (pagina <= totalPaginas) {
      await sleep(RATE_LIMIT_MS)
    }
  } while (pagina <= totalPaginas)

  return allResults
}

/**
 * Busca detalhe de uma contratacao especifica.
 */
export async function fetchDetalheContratacao(cnpj: string, ano: number, sequencial: number): Promise<PNCPContratacao> {
  const url = `${PNCP_BASE_URL}/v1/orgaos/${cnpj}/compras/${ano}/${sequencial}`
  const response = await fetchWithRetry(url)
  return response.json()
}

/**
 * Busca editais por multiplas modalidades e UFs.
 * Util para sync completa.
 */
export async function fetchEditaisMultiplos(params: {
  dataInicial: Date
  dataFinal: Date
  modalidades: number[]
  ufs: string[]
}): Promise<PNCPContratacao[]> {
  const { dataInicial, dataFinal, modalidades, ufs } = params
  const allResults: PNCPContratacao[] = []
  const seen = new Set<string>()

  for (const modalidade of modalidades) {
    for (const uf of ufs) {
      const results = await fetchEditaisByDate({
        dataInicial,
        dataFinal,
        modalidade,
        uf,
      })

      for (const item of results) {
        const key = item.numeroControlePNCP
        if (!seen.has(key)) {
          seen.add(key)
          allResults.push(item)
        }
      }

      await sleep(RATE_LIMIT_MS)
    }
  }

  return allResults
}
