'use strict';

const path = require('path');

const TARGET_FILE = path.resolve(__dirname, '..', '..', 'client-intake.yaml');

/**
 * Gera o enum de tipos de preset para o client-intake.yaml.
 */
function generateTipoEnum(model) {
  const { presets } = model;

  // Mapeamento tipo → descricao
  const descricoes = {
    'franchise': 'Negocio que quer escalar via franquia',
    'agency': 'Agencia ou prestacao de servico recorrente',
    'personal': 'Marca pessoal, creator, autoridade',
    'corporate': 'Operacao interna de empresa',
    'saas': 'Produto digital (SaaS, app, plataforma)',
    'ecommerce': 'Loja online / comercio eletronico',
    'infoproduto': 'Curso, mentoria, ebook, comunidade paga',
    'servico-local': 'Clinica, escritorio, salao, restaurante, academia',
  };

  const lines = ['# Opcoes:'];

  // Ordem: presets descobertos, ordenados
  const sortedIds = Object.keys(presets).sort();

  // Calcular padding para alinhamento
  const maxLen = Math.max(...sortedIds.map(id => id.length));

  for (const id of sortedIds) {
    const desc = descricoes[id] || presets[id].preset?.nome || id;
    const padding = ' '.repeat(maxLen - id.length);
    lines.push(`#   ${id}${padding}      → ${desc}`);
  }

  lines.push('#   custom         → Nenhum dos acima (fases configuradas manualmente)');

  return lines.join('\n');
}

/**
 * Retorna todas as secoes geradas para client-intake.yaml.
 */
function generate(model) {
  return {
    'tipo-enum': generateTipoEnum(model),
  };
}

module.exports = { generate, TARGET_FILE };
