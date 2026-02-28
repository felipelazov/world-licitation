'use strict';

const path = require('path');

const TARGET_FILE = path.resolve(__dirname, '..', '..', 'deliverables', 'README.md');

// Mapeamento fase → descricao curta dos deliverables
const FASE_DESCRICAO = {
  'descoberta': 'Perfil de genialidade, assessment, blueprint',
  'proposito': 'Golden Circle, WHY, posicionamento, causa',
  'produto': 'Grand Slam Offer, pricing, value equation',
  'visao-produto': 'Features essenciais, roadmap simplificado',
  'business-dna': 'Business DNA Blueprint, briefs por squad, scorecard',
  'identidade': 'Logo, cores, tipografia, design system, tokens',
  'conteudo': 'Pilares, calendario, templates, atomizacao',
  'vendas': 'Funil, prospeccao, closing, metas de revenue',
  'aquisicao': 'Canais, campanhas, email sequences, analytics',
  'retencao': 'Onboarding, health score, churn prevention',
  'operacao': 'Processos, automacoes, ferramentas, SOPs',
  'escala': 'Modelo de franquia, manuais, expansao',
};

// Mapeamento fase → squad responsavel (com detalhe de agente quando relevante)
const FASE_SQUAD = {
  'descoberta': 'squad-zona-genialidade',
  'proposito': 'squad-advisor (Sinek)',
  'produto': 'squad-advisor (Hormozi)',
  'visao-produto': 'squad-advisor (Jobs)',
  'business-dna': 'squad-product (Marty Cagan)',
  'identidade': 'squad-design',
  'conteudo': 'squad-content-distillery',
  'vendas': 'squad-sales',
  'aquisicao': 'squad-marketing',
  'retencao': 'squad-customer-success',
  'operacao': 'squad-agency',
  'escala': 'squad-franchise',
};

/**
 * Gera a arvore de estrutura de deliverables.
 */
function generateDeliverablesStructure(model) {
  const { fases } = model;

  const lines = ['```', 'deliverables/'];

  // Calcular padding para alinhar as setas
  const maxIdLen = Math.max(...fases.map(f => f.id.length));

  for (let i = 0; i < fases.length; i++) {
    const fase = fases[i];
    const isLast = i === fases.length - 1;
    const prefix = isLast ? '└── ' : '├── ';
    const desc = FASE_DESCRICAO[fase.id] || fase.descricao || '';
    const padding = ' '.repeat(maxIdLen - fase.id.length + 8);
    lines.push(`${prefix}${fase.id}/${padding}← ${desc}`);
  }

  lines.push('```');
  return lines.join('\n');
}

/**
 * Gera a tabela "Quem Escreve Onde".
 */
function generateQuemEscreveOnde(model) {
  const { fases } = model;

  const lines = [
    '| Pasta | Squad Responsavel |',
    '|-------|-------------------|',
  ];

  for (const fase of fases) {
    const squad = FASE_SQUAD[fase.id] || fase.squad || '(nao definido)';
    lines.push(`| ${fase.id}/ | ${squad} |`);
  }

  return lines.join('\n');
}

/**
 * Retorna todas as secoes geradas para deliverables/README.md.
 */
function generate(model) {
  return {
    'deliverables-structure': generateDeliverablesStructure(model),
    'quem-escreve-onde': generateQuemEscreveOnde(model),
  };
}

module.exports = { generate, TARGET_FILE };
