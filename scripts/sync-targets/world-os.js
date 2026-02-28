'use strict';

const path = require('path');

const TARGET_FILE = path.resolve(__dirname, '..', '..', '.claude', 'commands', 'world-os.md');

/**
 * Gera a secao keywords-to-squad a partir do modelo.
 */
function generateKeywordsToSquad(model) {
  const { squads, squadConfigs } = model;

  // Mapeamento fixo de keywords por squad (derivado do dominio e config)
  const keywordMap = {
    'squad-advisor': {
      keywords: 'estrategia|posicionamento|proposito|why|oferta|preco|produto|foco|simplificar',
      comment: 'Advisor',
    },
    'squad-design': {
      keywords: 'design|logo|marca|identidade|visual|thumbnail|foto|edicao|componente|token',
      comment: 'Design',
    },
    'squad-content-distillery': {
      keywords: 'conteudo|video|youtube|podcast|atomizar|framework|distribuicao',
      comment: 'Content',
    },
    'squad-agency': {
      keywords: 'agencia|cliente|diagnostico|automacao|trafego|proposta',
      comment: 'Agency',
    },
    'squad-sales': {
      keywords: 'vendas|funil|prospeccao|closing|revenue|ticket|comercial|pipeline',
      comment: 'Sales',
    },
    'squad-marketing': {
      keywords: 'marketing|trafego|campanha|anuncio|meta ads|google ads|email marketing|cac|roas',
      comment: 'Marketing',
    },
    'squad-customer-success': {
      keywords: 'retencao|churn|onboarding cliente|health score|nps|customer success|cs|upsell',
      comment: 'Customer Success',
    },
    'squad-franchise': {
      keywords: 'franquia|escala|rede|replicar|operacao|formatacao',
      comment: 'Franchise',
    },
    'squad-product': {
      keywords: 'dna|blueprint|product review|roadmap|features|prd|mvp',
      comment: 'Product',
    },
    'squad-reino': {
      keywords: 'biblia|fe|oracao|sabedoria|jesus|espiritualidade',
      comment: 'Reino',
    },
    'squad-zona-genialidade': {
      keywords: 'talento|genialidade|perfil|assessment|zona|autoconhecimento',
      comment: 'Zona Genialidade',
    },
    'squad-creator': {
      keywords: 'criar squad|novo squad|clonar mente|novo agente',
      comment: 'Creator',
    },
  };

  const lines = ['```yaml', 'keywords_to_squad:'];

  // Gerar em ordem alfabetica dos squads que existem no state
  const sortedSquadIds = Object.keys(squads).sort();

  for (const squadId of sortedSquadIds) {
    const mapping = keywordMap[squadId];
    if (mapping) {
      lines.push(`  # ${mapping.comment}`);
      lines.push(`  ${mapping.keywords}: "${squadId}"`);
      lines.push('');
    }
  }

  // Remover ultima linha vazia
  if (lines[lines.length - 1] === '') lines.pop();
  lines.push('```');

  return lines.join('\n');
}

/**
 * Gera a secao tipo-preset-mapping a partir dos presets descobertos.
 */
function generateTipoPresetMapping(model) {
  const { presets } = model;

  // Mapeamento fixo de keywords por tipo de preset
  const presetKeywords = {
    'franchise': 'franquia, escalar, rede, unidades, replicar',
    'agency': 'agencia, servico, clientes, recorrente, consultoria',
    'personal': 'marca pessoal, creator, autoridade, influencia, conteudo proprio',
    'corporate': 'empresa, corporativo, interno, departamento, processos',
    'saas': 'app, plataforma, saas, software, produto digital',
    'ecommerce': 'loja, ecommerce, vender online, produtos',
    'infoproduto': 'curso, mentoria, infoproduto, lancamento, ebook, comunidade paga',
    'servico-local': 'clinica, escritorio, salao, restaurante, academia, local, presencial',
  };

  const presetFileMap = {
    'franchise': 'presets/franchise.yaml',
    'agency': 'presets/agency.yaml',
    'personal': 'presets/personal-brand.yaml',
    'corporate': 'presets/corporate.yaml',
    'saas': 'presets/saas.yaml',
    'ecommerce': 'presets/ecommerce.yaml',
    'infoproduto': 'presets/infoproduto.yaml',
    'servico-local': 'presets/servico-local.yaml',
  };

  const lines = [
    '| Palavras-chave na descricao | Tipo | Preset |',
    '|----------------------------|------|--------|',
  ];

  const sortedIds = Object.keys(presets).sort();

  for (const id of sortedIds) {
    const keywords = presetKeywords[id] || id;
    const file = presetFileMap[id] || `presets/${id}.yaml`;
    lines.push(`| ${keywords} | ${id} | \`${file}\` |`);
  }

  lines.push('| (nenhum match claro) | custom | (todas as fases ativas, confirmar com usuario) |');

  return lines.join('\n');
}

/**
 * Gera a secao checklist-commands a partir dos checklists descobertos.
 */
function generateChecklistCommands(model) {
  const { checklists } = model;

  // Mapeamento fixo de comandos e descricoes por checklist
  const checklistInfo = {
    'new-project-setup': { command: '*setup', when: 'Apos `*init` — valida que o projeto nasceu completo' },
    'client-discovery': { command: '*discovery', when: 'Antes da primeira fase — valida intake do cliente' },
    'phase-transition': { command: '*transition', when: 'Entre fases — valida que fase atual entregou tudo' },
    'mid-project-health': { command: '*health', when: 'A cada 3-4 sessoes — auditoria preventiva' },
    'sinapse-quality': { command: '*sinapse-audit', when: 'A cada 3-4 sessoes — auditoria de sinapses' },
    'project-delivery': { command: '*delivery', when: 'No final — valida entrega completa' },
    'business-dna-validation': { command: '*dna-validate', when: 'Apos Business DNA — valida completude do blueprint' },
  };

  const lines = [
    '| Comando | Checklist | Quando usar |',
    '|---------|-----------|-------------|',
  ];

  const sortedChecklists = [...checklists].sort((a, b) => {
    const orderA = Object.keys(checklistInfo).indexOf(a.id);
    const orderB = Object.keys(checklistInfo).indexOf(b.id);
    return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
  });

  for (const cl of sortedChecklists) {
    const info = checklistInfo[cl.id];
    if (info) {
      lines.push(`| \`${info.command}\` | \`${cl.file}\` | ${info.when} |`);
    } else {
      lines.push(`| \`*${cl.id}\` | \`${cl.file}\` | (sem descricao) |`);
    }
  }

  return lines.join('\n');
}

/**
 * Retorna todas as secoes geradas para world-os.md.
 */
function generate(model) {
  return {
    'keywords-to-squad': generateKeywordsToSquad(model),
    'tipo-preset-mapping': generateTipoPresetMapping(model),
    'checklist-commands': generateChecklistCommands(model),
  };
}

module.exports = { generate, TARGET_FILE };
