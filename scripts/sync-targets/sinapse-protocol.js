'use strict';

const path = require('path');

const TARGET_FILE = path.resolve(__dirname, '..', '..', '.claude', 'rules', 'sinapse-protocol.md');

/**
 * Gera a tabela de squad-chiefs a partir do modelo.
 */
function generateSquadChiefsTable(model) {
  const { squads } = model;

  const lines = [
    '| Chief | Squad ID | Skill de Ativacao |',
    '|-------|----------|-------------------|',
  ];

  const sortedSquadIds = Object.keys(squads).sort();

  for (const squadId of sortedSquadIds) {
    const squad = squads[squadId];
    const chief = squad.chief;
    if (chief) {
      lines.push(`| ${chief} | ${squadId} | \`/${squadId}:agents:${chief}\` |`);
    }
  }

  return lines.join('\n');
}

/**
 * Gera a tabela de mapeamento squad → campos do negocio.
 */
function generateSquadNegocioMapping(model) {
  const { squads, negocioFields } = model;

  const lines = [
    '| Squad | Campos que pode escrever |',
    '|-------|--------------------------|',
  ];

  const sortedSquadIds = Object.keys(squads).sort();

  for (const squadId of sortedSquadIds) {
    const fields = negocioFields[squadId] || squads[squadId].negocio_fields || [];

    if (Array.isArray(fields) && fields.length > 0) {
      // Caso especial: squad-advisor tem sub-agentes com diferentes campos
      if (squadId === 'squad-advisor') {
        const sinekFields = ['why', 'how', 'what', 'causa', 'publico_alvo', 'posicionamento'];
        const hormoziFields = ['oferta_principal', 'preco', 'dream_outcome', 'garantia', 'diferenciais'];
        const jobsFields = ['produto_core', 'features_essenciais', 'features_cortadas'];

        const sinekFiltered = sinekFields.filter(f => fields.includes(f));
        const hormoziFiltered = hormoziFields.filter(f => fields.includes(f));
        const jobsFiltered = jobsFields.filter(f => fields.includes(f));

        if (sinekFiltered.length > 0) {
          lines.push(`| ${squadId} (sinek) | ${sinekFiltered.join(', ')} |`);
        }
        if (hormoziFiltered.length > 0) {
          lines.push(`| ${squadId} (hormozi) | ${hormoziFiltered.join(', ')} |`);
        }
        if (jobsFiltered.length > 0) {
          lines.push(`| ${squadId} (jobs) | ${jobsFiltered.join(', ')} |`);
        }
      } else {
        lines.push(`| ${squadId} | ${fields.join(', ')} |`);
      }
    } else {
      lines.push(`| ${squadId} | (nao escreve em negocio — escreve apenas decisoes) |`);
    }
  }

  return lines.join('\n');
}

/**
 * Retorna todas as secoes geradas para sinapse-protocol.md.
 */
function generate(model) {
  return {
    'squad-chiefs-table': generateSquadChiefsTable(model),
    'squad-negocio-mapping': generateSquadNegocioMapping(model),
  };
}

module.exports = { generate, TARGET_FILE };
