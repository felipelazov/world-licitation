/**
 * Compras.gov.br API Client — Dados Abertos
 * API publica, sem autenticacao.
 * Docs: https://dadosabertos.compras.gov.br/swagger-ui/index.html
 */

const COMPRAS_GOV_BASE_URL = 'https://dadosabertos.compras.gov.br'
const RATE_LIMIT_MS = 500

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(20000),
      })

      if (response.ok) return response

      if (response.status >= 500 && attempt < retries) {
        await sleep(1000 * attempt)
        continue
      }

      throw new Error(`Compras.gov API error: ${response.status} ${response.statusText}`)
    } catch (error) {
      if (attempt === retries) throw error
      await sleep(1000 * attempt)
    }
  }
  throw new Error('Compras.gov API: max retries exceeded')
}

function formatDateComprasGov(date: Date): string {
  return date.toISOString().split('T')[0] // YYYY-MM-DD
}

// ==========================================
// PESQUISA DE PRECO
// ==========================================

export interface PrecoMaterial {
  codigoItemCatalogo: string
  descricaoItem: string
  precoUnitario: number
  quantidade: number
  valorTotal: number
  dataCompra: string
  nomeOrgao: string
  ufOrgao: string
  municipioOrgao: string
}

/**
 * Consulta historico de precos praticados para um material/item.
 */
export async function fetchHistoricoPrecos(params: {
  codigoItem?: string
  descricao?: string
  estado?: string
  dataInicial: Date
  dataFinal: Date
  pagina?: number
}): Promise<{ resultado: PrecoMaterial[]; totalRegistros: number }> {
  const { codigoItem, descricao, estado, dataInicial, dataFinal, pagina = 1 } = params

  const searchParams = new URLSearchParams({
    dataCompraInicio: formatDateComprasGov(dataInicial),
    dataCompraFim: formatDateComprasGov(dataFinal),
    pagina: String(pagina),
    tamanhoPagina: '50',
  })

  if (codigoItem) searchParams.set('codigoItemCatalogo', codigoItem)
  if (descricao) searchParams.set('descricaoItem', descricao)
  if (estado) searchParams.set('estado', estado)

  const url = `${COMPRAS_GOV_BASE_URL}/modulo-pesquisa-preco/1_consultarMaterial?${searchParams}`

  try {
    const response = await fetchWithRetry(url)
    return await response.json()
  } catch {
    return { resultado: [], totalRegistros: 0 }
  }
}

// ==========================================
// PREGOES (LEGADO)
// ==========================================

export interface PregaoLegado {
  numeroPregao: string
  anoCompra: number
  nomeOrgao: string
  ufOrgao: string
  objetoCompra: string
  dataEdital: string
  situacaoPregao: string
  valorEstimado: number
}

/**
 * Consulta pregoes do sistema legado (Lei 8.666).
 */
export async function fetchPregoes(params: {
  dataInicial: Date
  dataFinal: Date
  uasg?: string
  pagina?: number
}): Promise<{ resultado: PregaoLegado[]; totalRegistros: number }> {
  const { dataInicial, dataFinal, uasg, pagina = 1 } = params

  const searchParams = new URLSearchParams({
    dt_data_edital_inicial: formatDateComprasGov(dataInicial),
    dt_data_edital_final: formatDateComprasGov(dataFinal),
    pagina: String(pagina),
    tamanhoPagina: '50',
  })

  if (uasg) searchParams.set('co_uasg', uasg)

  const url = `${COMPRAS_GOV_BASE_URL}/modulo-legado/3_consultarPregoes?${searchParams}`

  try {
    const response = await fetchWithRetry(url)
    return await response.json()
  } catch {
    return { resultado: [], totalRegistros: 0 }
  }
}

// ==========================================
// CONTRATACOES LEI 14.133
// ==========================================

/**
 * Consulta contratacoes pela nova lei (complementar ao PNCP).
 */
export async function fetchContratacoes14133(params: {
  dataInicial: Date
  dataFinal: Date
  modalidade?: string
  uf?: string
  pagina?: number
}): Promise<{ resultado: unknown[]; totalRegistros: number }> {
  const { dataInicial, dataFinal, modalidade, uf, pagina = 1 } = params

  const searchParams = new URLSearchParams({
    dataPublicacaoPncpInicial: formatDateComprasGov(dataInicial),
    dataPublicacaoPncpFinal: formatDateComprasGov(dataFinal),
    pagina: String(pagina),
    tamanhoPagina: '50',
  })

  if (modalidade) searchParams.set('codigoModalidade', modalidade)
  if (uf) searchParams.set('unidadeOrgaoUfSigla', uf)

  const url = `${COMPRAS_GOV_BASE_URL}/modulo-contratacoes/1_consultarContratacoes_PNCP_14133?${searchParams}`

  try {
    const response = await fetchWithRetry(url)
    return await response.json()
  } catch {
    return { resultado: [], totalRegistros: 0 }
  }
}
