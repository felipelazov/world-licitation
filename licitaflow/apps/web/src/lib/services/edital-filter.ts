/**
 * Filtro inteligente de relevancia para editais.
 * Calcula score 0-100 baseado em keywords, UF e valor.
 */

import type { PNCPContratacao } from './pncp-api'
import type { PregaoLegado } from './compras-gov-api'

const DEFAULT_KEYWORDS = [
  'cesta basica',
  'cesta básica',
  'generos alimenticios',
  'gêneros alimentícios',
  'kit alimentacao',
  'kit alimentação',
  'alimentos nao pereciveis',
  'alimentos não perecíveis',
  'cesta de alimentos',
  'alimentacao escolar',
  'alimentação escolar',
  'merenda escolar',
  'generos alimenticios pereciveis',
  'gêneros alimentícios perecíveis',
  'hortifrutigranjeiros',
]

// Palavras que indicam alta relevancia
const HIGH_RELEVANCE_KEYWORDS = [
  'cesta basica',
  'cesta básica',
  'kit alimentacao',
  'kit alimentação',
  'cesta de alimentos',
  'generos alimenticios',
  'gêneros alimentícios',
  'alimentacao escolar',
  'alimentação escolar',
  'merenda escolar',
]

// Palavras que reduzem relevancia (nao e o que fornecemos)
const NEGATIVE_KEYWORDS = [
  'servico de alimentacao',
  'serviço de alimentação',
  'restaurante',
  'refeicao',
  'refeição',
  'catering',
  'cozinha industrial',
  'equipamentos',
]

export interface FilterConfig {
  keywords: string[]
  ufs: string[]
  valorMin?: number
  valorMax?: number
  relevanceThreshold: number
}

export interface FilterResult {
  contratacao: PNCPContratacao
  score: number
  matchedKeywords: string[]
  reasons: string[]
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Calcula score de relevancia (0-100) para um edital.
 */
export function calculateRelevanceScore(
  contratacao: PNCPContratacao,
  config: FilterConfig
): FilterResult {
  const objeto = contratacao.objetoCompra || ''
  const complemento = contratacao.informacaoComplementar || ''
  const textoCompleto = `${objeto} ${complemento}`
  const textoNorm = normalizeText(textoCompleto)

  let score = 0
  const matchedKeywords: string[] = []
  const reasons: string[] = []
  const keywords = config.keywords.length > 0 ? config.keywords : DEFAULT_KEYWORDS

  // === KEYWORD MATCH (0-60 pontos) ===
  for (const kw of keywords) {
    const kwNorm = normalizeText(kw)
    if (textoNorm.includes(kwNorm)) {
      matchedKeywords.push(kw)

      // High relevance keywords valem mais
      const isHigh = HIGH_RELEVANCE_KEYWORDS.some(hk => normalizeText(hk) === kwNorm)
      score += isHigh ? 20 : 10
    }
  }
  score = Math.min(score, 60)

  if (matchedKeywords.length > 0) {
    reasons.push(`Keywords: ${matchedKeywords.join(', ')}`)
  }

  // === NEGATIVE KEYWORDS (-20 pontos) ===
  for (const nk of NEGATIVE_KEYWORDS) {
    if (textoNorm.includes(normalizeText(nk))) {
      score -= 20
      reasons.push(`Negativo: "${nk}" encontrado`)
      break
    }
  }

  // === UF MATCH (0-20 pontos) ===
  if (config.ufs.length > 0) {
    const editalUf = contratacao.unidadeOrgao?.ufSigla
    if (editalUf && config.ufs.includes(editalUf)) {
      score += 20
      reasons.push(`UF match: ${editalUf}`)
    }
  } else {
    // Sem filtro de UF = bonus padrao
    score += 10
  }

  // === VALOR ESTIMADO (0-15 pontos) ===
  const valor = contratacao.valorTotalEstimado
  if (valor && valor > 0) {
    const dentroMin = !config.valorMin || valor >= config.valorMin
    const dentroMax = !config.valorMax || valor <= config.valorMax
    if (dentroMin && dentroMax) {
      score += 15
      reasons.push(`Valor OK: R$${valor.toLocaleString('pt-BR')}`)
    } else {
      reasons.push(`Valor fora do range: R$${valor.toLocaleString('pt-BR')}`)
    }
  }

  // === MODALIDADE BONUS (0-5 pontos) ===
  if (contratacao.modalidadeId === 6) {
    score += 5
    reasons.push('Pregao eletronico')
  }

  // Clamp 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    contratacao,
    score,
    matchedKeywords,
    reasons,
  }
}

/**
 * Filtra lista de contratacoes e retorna apenas as relevantes,
 * ordenadas por score decrescente.
 */
export function filterEditais(
  contratacoes: PNCPContratacao[],
  config: FilterConfig
): FilterResult[] {
  return contratacoes
    .map(c => calculateRelevanceScore(c, config))
    .filter(r => r.score >= config.relevanceThreshold)
    .sort((a, b) => b.score - a.score)
}

// ==========================================
// COMPRAS.GOV — Pregoes Legados
// ==========================================

export interface PregaoFilterResult {
  pregao: PregaoLegado
  score: number
  matchedKeywords: string[]
}

/**
 * Calcula score de relevancia para pregao legado do Compras.gov.
 */
export function calculatePregaoScore(
  pregao: PregaoLegado,
  config: FilterConfig
): PregaoFilterResult {
  const textoNorm = normalizeText(pregao.objetoCompra || '')
  let score = 0
  const matchedKeywords: string[] = []
  const keywords = config.keywords.length > 0 ? config.keywords : DEFAULT_KEYWORDS

  // Keyword match (0-60)
  for (const kw of keywords) {
    const kwNorm = normalizeText(kw)
    if (textoNorm.includes(kwNorm)) {
      matchedKeywords.push(kw)
      const isHigh = HIGH_RELEVANCE_KEYWORDS.some(hk => normalizeText(hk) === kwNorm)
      score += isHigh ? 20 : 10
    }
  }
  score = Math.min(score, 60)

  // Negative keywords (-20)
  for (const nk of NEGATIVE_KEYWORDS) {
    if (textoNorm.includes(normalizeText(nk))) {
      score -= 20
      break
    }
  }

  // UF match (0-20)
  if (config.ufs.length > 0 && pregao.ufOrgao) {
    if (config.ufs.includes(pregao.ufOrgao)) {
      score += 20
    }
  } else {
    score += 10
  }

  // Valor (0-15)
  if (pregao.valorEstimado && pregao.valorEstimado > 0) {
    const dentroMin = !config.valorMin || pregao.valorEstimado >= config.valorMin
    const dentroMax = !config.valorMax || pregao.valorEstimado <= config.valorMax
    if (dentroMin && dentroMax) score += 15
  }

  score = Math.max(0, Math.min(100, score))

  return { pregao, score, matchedKeywords }
}

/**
 * Filtra pregoes legados por relevancia.
 */
export function filterPregoes(
  pregoes: PregaoLegado[],
  config: FilterConfig
): PregaoFilterResult[] {
  return pregoes
    .map(p => calculatePregaoScore(p, config))
    .filter(r => r.score >= config.relevanceThreshold)
    .sort((a, b) => b.score - a.score)
}

/**
 * Converte pregao legado para formato de insert no Supabase.
 */
export function pregaoToEditalInsert(result: PregaoFilterResult, tenantId: string, sourceId: string) {
  const p = result.pregao
  const externalId = `COMPRASGOV-${p.numeroPregao}-${p.anoCompra}`
  return {
    tenant_id: tenantId,
    source_id: sourceId,
    external_id: externalId,
    pncp_id: externalId,
    numero: p.numeroPregao,
    orgao: p.nomeOrgao || 'Nao informado',
    orgao_cnpj: null,
    objeto: p.objetoCompra,
    modalidade: 'Pregao Eletronico (Legado)',
    valor_estimado: p.valorEstimado || null,
    uf: p.ufOrgao || null,
    municipio_ibge: null,
    local_entrega: p.ufOrgao || null,
    data_publicacao: p.dataEdital || null,
    data_sessao: null,
    link_sistema_origem: null,
    portal_url: null,
    relevance_score: result.score,
    status: 'novo',
    raw_data: p,
    synced_at: new Date().toISOString(),
  }
}

// ==========================================
// PNCP — Conversao
// ==========================================

/**
 * Converte resultado do filtro para formato de insert no Supabase.
 */
export function toEditalInsert(result: FilterResult, tenantId: string, sourceId: string) {
  const c = result.contratacao
  return {
    tenant_id: tenantId,
    source_id: sourceId,
    external_id: c.numeroControlePNCP,
    pncp_id: c.numeroControlePNCP,
    numero: c.numeroCompra,
    orgao: c.orgaoEntidade?.razaoSocial || 'Nao informado',
    orgao_cnpj: c.orgaoEntidade?.cnpj,
    objeto: c.objetoCompra,
    modalidade: c.modalidadeNome || `Modalidade ${c.modalidadeId}`,
    valor_estimado: c.valorTotalEstimado || null,
    uf: c.unidadeOrgao?.ufSigla || null,
    municipio_ibge: c.unidadeOrgao?.codigoIbge || null,
    local_entrega: c.unidadeOrgao?.municipioNome
      ? `${c.unidadeOrgao.municipioNome} - ${c.unidadeOrgao.ufSigla}`
      : null,
    data_publicacao: c.dataPublicacaoPncp || null,
    data_sessao: c.dataAberturaProposta || null,
    link_sistema_origem: c.linkSistemaOrigem || null,
    portal_url: c.linkSistemaOrigem || null,
    relevance_score: result.score,
    status: 'novo',
    raw_data: c,
    synced_at: new Date().toISOString(),
  }
}
