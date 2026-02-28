/**
 * sync-organogram.js
 *
 * Le project-state.yaml e gera um JSON estruturado com a arvore
 * completa do organograma para sincronizacao com o Figma.
 *
 * Uso:
 *   node scripts/sync-organogram.js                   # stdout JSON
 *   node scripts/sync-organogram.js --pretty           # stdout JSON formatado
 *   node scripts/sync-organogram.js --output out.json   # salva em arquivo
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const STATE_FILE = path.join(ROOT, 'project-state.yaml');
const MAP_FILE = path.join(ROOT, 'figma-organogram-map.yaml');

function loadYaml(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

function countAgents(squads) {
  let total = 0;
  for (const squad of Object.values(squads)) {
    total += (squad.agents || []).length;
    if (squad.chief) total += 1;
  }
  return total;
}

function getPhaseForSquad(fases, squadId) {
  if (!fases) return null;
  return fases.find(f => f.squad === squadId) || null;
}

function calcProgress(fases) {
  if (!fases || fases.length === 0) return 0;
  let totalPeso = 0;
  let pesoConcluido = 0;
  for (const fase of fases) {
    totalPeso += fase.peso || 0;
    if (fase.status === 'concluido') {
      pesoConcluido += fase.peso || 0;
    } else if (fase.status === 'em_andamento') {
      pesoConcluido += (fase.peso || 0) * 0.5;
    }
  }
  return totalPeso > 0 ? Math.round((pesoConcluido / totalPeso) * 100) : 0;
}

function buildOrganogramTree(state) {
  const squads = state.squads || {};
  const fases = (state.progresso && state.progresso.fases) || [];
  const projeto = state.projeto || {};

  const squadNodes = Object.entries(squads).map(([squadId, squad]) => {
    const fase = getPhaseForSquad(fases, squadId);
    const agentNames = (squad.agents || []);

    return {
      id: squadId,
      domain: squad.domain || '',
      chief: squad.chief || '',
      agents: agentNames,
      agent_count: agentNames.length + (squad.chief ? 1 : 0),
      tasks: squad.tasks || [],
      phase: fase ? {
        id: fase.id,
        name: fase.nome,
        status: fase.status,
        weight: fase.peso,
        description: fase.descricao || ''
      } : null
    };
  });

  return {
    meta: {
      generated_at: new Date().toISOString(),
      source: 'project-state.yaml',
      version: projeto.matriz_versao || '1.0'
    },
    root: {
      name: projeto.nome || 'World OS',
      client: projeto.cliente || '',
      start_date: projeto.inicio || '',
      progress: {
        overall: calcProgress(fases),
        current_phase: (state.progresso && state.progresso.fase_atual) || '',
        phases_total: fases.length,
        phases_completed: fases.filter(f => f.status === 'concluido').length,
        phases_in_progress: fases.filter(f => f.status === 'em_andamento').length,
        phases_pending: fases.filter(f => f.status === 'pendente').length
      },
      total_squads: Object.keys(squads).length,
      total_agents: countAgents(squads)
    },
    squads: squadNodes,
    phases: fases.map(f => ({
      id: f.id,
      name: f.nome,
      squad: f.squad,
      chief: f.chief,
      agent: f.agent || null,
      status: f.status,
      weight: f.peso,
      description: f.descricao || ''
    }))
  };
}

function buildDiffReport(tree, mapping) {
  if (!mapping || !mapping.mappings) return null;

  const mapped = Object.keys(mapping.mappings);
  const current = tree.squads.map(s => s.id);
  const unmapped = current.filter(id => !mapped.includes(id));
  const stale = mapped.filter(id => !current.includes(id));

  return {
    mapped_count: mapped.length,
    current_count: current.length,
    unmapped_squads: unmapped,
    stale_mappings: stale,
    sync_ready: unmapped.length === 0 && stale.length === 0
  };
}

function main() {
  const args = process.argv.slice(2);
  const pretty = args.includes('--pretty');
  const outputIdx = args.indexOf('--output');
  const outputFile = outputIdx >= 0 ? args[outputIdx + 1] : null;
  const showDiff = args.includes('--diff');

  const state = loadYaml(STATE_FILE);
  if (!state) {
    console.error('Erro: project-state.yaml nao encontrado em', STATE_FILE);
    process.exit(1);
  }

  const tree = buildOrganogramTree(state);

  if (showDiff) {
    const mapping = loadYaml(MAP_FILE);
    tree.diff = buildDiffReport(tree, mapping);
  }

  const json = pretty ? JSON.stringify(tree, null, 2) : JSON.stringify(tree);

  if (outputFile) {
    const outPath = path.resolve(outputFile);
    fs.writeFileSync(outPath, json, 'utf8');
    console.log('Organograma exportado para:', outPath);
  } else {
    console.log(json);
  }
}

main();
