// Schema de Análises GO/NO-GO — tipos e validação

// ─── Decision values ─────────────────────────────────────────
export const ANALYSIS_DECISION_VALUES = ['go', 'no_go', 'pendente'] as const
export type AnalysisDecision = (typeof ANALYSIS_DECISION_VALUES)[number]

export function isValidAnalysisDecision(decision: string): decision is AnalysisDecision {
  return ANALYSIS_DECISION_VALUES.includes(decision as AnalysisDecision)
}

// ─── Criteria types ──────────────────────────────────────────
export interface EliminatoryCriterion {
  id: string
  type: 'eliminatory'
  label: string
  description: string
  answer: boolean | null // true = atende, false = não atende, null = não avaliado
  observation: string
}

export interface ScoringCriterion {
  id: string
  type: 'scoring'
  label: string
  description: string
  score: number | null // 1-5
  observation: string
}

export type Criterion = EliminatoryCriterion | ScoringCriterion

export interface AnalysisCriteria {
  eliminatory: EliminatoryCriterion[]
  scoring: ScoringCriterion[]
}

// ─── Analysis row (matches DB) ───────────────────────────────
export interface AnalysisRow {
  id: string
  tenant_id: string
  edital_id: string
  analyzed_by: string | null
  decision: AnalysisDecision | null
  score_total: number | null
  justificativa: string | null
  criteria: AnalysisCriteria
  analyzed_at: string
  created_at: string
}

export interface AnalysisInsert {
  edital_id: string
  analyzed_by?: string
  decision?: AnalysisDecision
  score_total?: number
  justificativa?: string
  criteria: AnalysisCriteria
}

// ─── Default criteria template (segmento alimentos) ──────────
export const DEFAULT_ELIMINATORY_CRITERIA: Omit<EliminatoryCriterion, 'answer' | 'observation'>[] = [
  {
    id: 'elim_objeto',
    type: 'eliminatory',
    label: 'Objeto compatível',
    description: 'O objeto do edital é compatível com o que fornecemos (cesta básica, gêneros alimentícios)?',
  },
  {
    id: 'elim_quantidade',
    type: 'eliminatory',
    label: 'Quantidade viável',
    description: 'A quantidade exigida está dentro da nossa capacidade de produção e entrega?',
  },
  {
    id: 'elim_local',
    type: 'eliminatory',
    label: 'Local de entrega',
    description: 'O local de entrega está dentro do nosso raio logístico viável?',
  },
  {
    id: 'elim_prazo',
    type: 'eliminatory',
    label: 'Prazo de entrega',
    description: 'O prazo de entrega é factível considerando produção + logística?',
  },
  {
    id: 'elim_habilitacao',
    type: 'eliminatory',
    label: 'Habilitação atingível',
    description: 'Conseguimos atender todas as exigências de habilitação (SICAF, certidões, alvará sanitário)?',
  },
]

export const DEFAULT_SCORING_CRITERIA: Omit<ScoringCriterion, 'score' | 'observation'>[] = [
  {
    id: 'score_margem',
    type: 'scoring',
    label: 'Margem estimada',
    description: 'O valor estimado permite margem saudável após custos (1=margem negativa, 5=margem excelente)?',
  },
  {
    id: 'score_clausulas',
    type: 'scoring',
    label: 'Cláusulas contratuais',
    description: 'As cláusulas são razoáveis, sem penalidades abusivas ou riscos excessivos?',
  },
  {
    id: 'score_historico',
    type: 'scoring',
    label: 'Histórico do órgão',
    description: 'O órgão tem histórico de pagamento em dia e boa relação com fornecedores?',
  },
  {
    id: 'score_concorrencia',
    type: 'scoring',
    label: 'Nível de concorrência',
    description: 'A concorrência esperada é baixa/moderada (1=muitos concorrentes, 5=pouca concorrência)?',
  },
  {
    id: 'score_risco_retorno',
    type: 'scoring',
    label: 'Risco vs Retorno',
    description: 'A relação risco/retorno geral é favorável (1=alto risco, baixo retorno, 5=baixo risco, alto retorno)?',
  },
]

export function buildEmptyCriteria(): AnalysisCriteria {
  return {
    eliminatory: DEFAULT_ELIMINATORY_CRITERIA.map((c) => ({
      ...c,
      answer: null,
      observation: '',
    })),
    scoring: DEFAULT_SCORING_CRITERIA.map((c) => ({
      ...c,
      score: null,
      observation: '',
    })),
  }
}
