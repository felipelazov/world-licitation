// Matcher de documentos para habilitação
// Dado um conjunto de documentos exigidos, verifica quais já existem no repositório

export interface RequiredDocument {
  name: string
  categorySlug: string
  description: string
  required: boolean
}

export interface ExistingDocument {
  id: string
  name: string
  categorySlug: string | null
  status: string
  expiresAt: string | null
}

export interface ChecklistItem {
  requirement: RequiredDocument
  matchedDocument: ExistingDocument | null
  status: 'ok' | 'expiring' | 'expired' | 'missing'
}

export interface HabilitacaoResult {
  items: ChecklistItem[]
  totalRequired: number
  totalOk: number
  totalMissing: number
  totalExpired: number
  isReady: boolean
}

// Standard documents required for most licitações de alimentos
export const STANDARD_HABILITACAO_DOCS: RequiredDocument[] = [
  // Certidões Negativas
  { name: 'CND Federal (Tributos e Dívida Ativa)', categorySlug: 'certidoes-negativas', description: 'Certidão conjunta RFB/PGFN', required: true },
  { name: 'CND Estadual', categorySlug: 'certidoes-negativas', description: 'Certidão negativa de débitos estaduais', required: true },
  { name: 'CND Municipal', categorySlug: 'certidoes-negativas', description: 'Certidão negativa de débitos municipais', required: true },
  { name: 'CRF/FGTS', categorySlug: 'certidoes-negativas', description: 'Certificado de regularidade do FGTS', required: true },
  { name: 'CNDT (Trabalhista)', categorySlug: 'certidoes-negativas', description: 'Certidão negativa de débitos trabalhistas', required: true },

  // Documentos Societários
  { name: 'Contrato Social', categorySlug: 'documentos-societarios', description: 'Contrato social e última alteração', required: true },
  { name: 'Cartão CNPJ', categorySlug: 'documentos-societarios', description: 'Comprovante de inscrição no CNPJ', required: true },

  // Qualificação Técnica
  { name: 'Atestado de Capacidade Técnica', categorySlug: 'qualificacao-tecnica', description: 'Atestado comprovando experiência no fornecimento', required: true },

  // Documentos Fiscais
  { name: 'Balanço Patrimonial', categorySlug: 'documentos-fiscais', description: 'Balanço do último exercício social', required: true },

  // Licenças e Alvarás
  { name: 'Alvará Sanitário (VISA)', categorySlug: 'licencas-alvaras', description: 'Licença da Vigilância Sanitária - OBRIGATÓRIO para alimentos', required: true },
  { name: 'Licença Ambiental', categorySlug: 'licencas-alvaras', description: 'Licença ambiental de operação (se aplicável)', required: false },
]

export function matchHabilitacao(
  requirements: RequiredDocument[],
  existingDocs: ExistingDocument[],
  sessionDate?: string
): HabilitacaoResult {
  const items: ChecklistItem[] = requirements.map((req) => {
    // Find matching document by category + name similarity
    const matched = existingDocs.find((doc) => {
      if (doc.categorySlug !== req.categorySlug) return false
      // Simple name matching — contains or similar
      const reqLower = req.name.toLowerCase()
      const docLower = doc.name.toLowerCase()
      return docLower.includes(reqLower) || reqLower.includes(docLower) ||
        docLower.split(' ').some((word) => word.length > 3 && reqLower.includes(word))
    })

    if (!matched) {
      return { requirement: req, matchedDocument: null, status: 'missing' as const }
    }

    // Check if document will be valid on session date
    if (matched.status === 'vencido') {
      return { requirement: req, matchedDocument: matched, status: 'expired' as const }
    }

    if (sessionDate && matched.expiresAt) {
      const sessionMs = new Date(sessionDate).getTime()
      const expiryMs = new Date(matched.expiresAt).getTime()
      if (expiryMs < sessionMs) {
        return { requirement: req, matchedDocument: matched, status: 'expired' as const }
      }
    }

    if (matched.status === 'vencendo') {
      return { requirement: req, matchedDocument: matched, status: 'expiring' as const }
    }

    return { requirement: req, matchedDocument: matched, status: 'ok' as const }
  })

  const requiredItems = items.filter((i) => i.requirement.required)
  const totalRequired = requiredItems.length
  const totalOk = requiredItems.filter((i) => i.status === 'ok' || i.status === 'expiring').length
  const totalMissing = requiredItems.filter((i) => i.status === 'missing').length
  const totalExpired = requiredItems.filter((i) => i.status === 'expired').length

  return {
    items,
    totalRequired,
    totalOk,
    totalMissing,
    totalExpired,
    isReady: totalMissing === 0 && totalExpired === 0,
  }
}
