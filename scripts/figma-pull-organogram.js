/**
 * figma-pull-organogram.js
 *
 * Le os nodes mapeados no Figma e compara com project-state.yaml.
 * Mostra um diff e opcionalmente aplica as mudancas.
 *
 * Uso:
 *   node scripts/figma-pull-organogram.js <channel_id>           # mostra diff
 *   node scripts/figma-pull-organogram.js <channel_id> --apply   # aplica mudancas
 */

const WebSocket = require('ws');
const { randomUUID } = require('crypto');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const CHANNEL = process.argv[2];
const APPLY = process.argv.includes('--apply');

if (!CHANNEL) {
  console.error('Uso: node scripts/figma-pull-organogram.js <channel_id> [--apply]');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '..');
const STATE_FILE = path.join(ROOT, 'project-state.yaml');
const MAP_FILE = path.join(ROOT, 'figma-organogram-map.yaml');

// Carregar dados locais
const state = yaml.load(fs.readFileSync(STATE_FILE, 'utf8'));
const mapping = yaml.load(fs.readFileSync(MAP_FILE, 'utf8'));

// WebSocket
const ws = new WebSocket('ws://localhost:3055');
let joined = false;
const pendingCallbacks = new Map();

function sendCommand(command, params = {}) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    pendingCallbacks.set(id, { resolve, reject });
    ws.send(JSON.stringify({
      type: 'message',
      channel: CHANNEL,
      message: { id, command, params }
    }));
    setTimeout(() => {
      if (pendingCallbacks.has(id)) {
        pendingCallbacks.delete(id);
        reject(new Error(`Timeout: ${command}`));
      }
    }, 30000);
  });
}

ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.type === 'system') {
    if (!joined && msg.channel === CHANNEL) joined = true;
    if (msg.message && typeof msg.message === 'object' && msg.message.id) {
      const cb = pendingCallbacks.get(msg.message.id);
      if (cb) { pendingCallbacks.delete(msg.message.id); cb.resolve(msg.message.result); }
    }
    return;
  }
  if (msg.type === 'broadcast' && msg.sender !== 'You') {
    const response = msg.message;
    if (response && response.id) {
      const cb = pendingCallbacks.get(response.id);
      if (cb) { pendingCallbacks.delete(response.id); cb.resolve(response.result); }
    }
  }
});

async function waitForJoin() {
  return new Promise((resolve) => {
    const check = setInterval(() => { if (joined) { clearInterval(check); resolve(); } }, 100);
  });
}

// ── Helpers ──

function toAgentId(displayName) {
  return displayName.trim().toLowerCase().replace(/\s+/g, '-');
}

function toDisplayName(agentId) {
  return agentId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

async function readTextNode(nodeId) {
  if (!nodeId) return '';
  try {
    const result = await sendCommand('get_node_info', { nodeId });
    // characters pode estar em result diretamente ou em result.characters
    if (!result) return '';
    if (typeof result === 'string') return result;
    if (result.characters) return result.characters;
    // Se e um objeto com children, buscar texto nos filhos
    if (result.children) {
      for (const child of result.children) {
        if (child.characters) return child.characters;
      }
    }
    return '';
  } catch (err) {
    console.error(`    Erro lendo node ${nodeId}: ${err.message}`);
    return '';
  }
}

// Batch: le todos os nodes de uma vez usando get_nodes_info
async function readAllTextNodes(nodeIds) {
  const validIds = nodeIds.filter(id => id);
  if (validIds.length === 0) return {};
  try {
    const result = await sendCommand('get_nodes_info', { nodeIds: validIds });
    const texts = {};
    if (Array.isArray(result)) {
      for (const node of result) {
        if (node && node.id) {
          texts[node.id] = node.characters || '';
        }
      }
    }
    return texts;
  } catch {
    // Fallback: ler um por um
    const texts = {};
    for (const id of validIds) {
      texts[id] = await readTextNode(id);
    }
    return texts;
  }
}

// ── Pull ──

async function pull() {
  console.log('Conectando ao Figma...');
  await waitForJoin();
  console.log('Conectado. Lendo nodes do Figma...\n');

  const changes = [];
  const mappings = mapping.mappings || {};

  // Coletar todos node IDs para batch reading
  const allNodeIds = [];
  const nodeToSquadField = {};

  for (const [squadId, nodes] of Object.entries(mappings)) {
    if (!nodes.frame_id) continue;
    for (const [field, nodeId] of Object.entries(nodes)) {
      if (field === 'frame_id' || !nodeId) continue;
      allNodeIds.push(nodeId);
      nodeToSquadField[nodeId] = { squadId, field };
    }
  }

  console.log(`  Lendo ${allNodeIds.length} nodes em batch...`);

  // Tentar batch, fallback para individual
  let allTexts = await readAllTextNodes(allNodeIds);

  // Se batch retornou vazio, fallback individual
  if (Object.keys(allTexts).length === 0) {
    console.log('  Batch vazio, lendo individualmente...');
    for (const nodeId of allNodeIds) {
      allTexts[nodeId] = await readTextNode(nodeId);
    }
  }

  console.log(`  ${Object.values(allTexts).filter(t => t).length} nodes com texto lidos.\n`);

  // Processar cada squad
  for (const [squadId, nodes] of Object.entries(mappings)) {
    if (!nodes.frame_id) continue;

    const localSquad = state.squads && state.squads[squadId];
    const getText = (field) => allTexts[nodes[field]] || '';

    if (!localSquad) {
      const domain = getText('domain_node');
      const chief = getText('chief_node');
      const agentsText = getText('agents_node');
      const agents = agentsText
        .split('\n')
        .map(a => a.trim())
        .filter(a => a && a !== '(nenhum agente)')
        .map(toAgentId);

      changes.push({
        type: 'ADD_SQUAD',
        squadId,
        data: {
          domain: domain || '',
          chief: chief ? toAgentId(chief.replace('Chief: ', '')) : '',
          agents,
          tasks: []
        }
      });
      continue;
    }

    // Domain
    const figmaDomain = getText('domain_node');
    if (figmaDomain && figmaDomain !== localSquad.domain) {
      changes.push({
        type: 'UPDATE',
        squadId,
        field: 'domain',
        local: localSquad.domain,
        figma: figmaDomain
      });
    }

    // Chief
    const figmaChief = getText('chief_node');
    const chiefId = figmaChief ? toAgentId(figmaChief.replace('Chief: ', '')) : '';
    if (chiefId && chiefId !== localSquad.chief) {
      changes.push({
        type: 'UPDATE',
        squadId,
        field: 'chief',
        local: localSquad.chief,
        figma: chiefId
      });
    }

    // Agents
    const figmaAgentsText = getText('agents_node');
    if (figmaAgentsText) {
      const figmaAgents = figmaAgentsText
        .split('\n')
        .map(a => a.trim())
        .filter(a => a && a !== '(nenhum agente)')
        .map(toAgentId);
      const localAgents = localSquad.agents || [];

      const added = figmaAgents.filter(a => !localAgents.includes(a));
      const removed = localAgents.filter(a => !figmaAgents.includes(a));

      if (added.length > 0) {
        changes.push({ type: 'AGENTS_ADDED', squadId, agents: added });
      }
      if (removed.length > 0) {
        changes.push({ type: 'AGENTS_REMOVED', squadId, agents: removed });
      }
    }

    // Status (fase)
    const figmaStatus = getText('status_node');
    if (figmaStatus) {
      const fasesArr = (state.progresso && state.progresso.fases) || [];
      const localFase = fasesArr.find(f => f.squad === squadId);
      if (localFase) {
        const statusMatch = figmaStatus.match(/\(([^)]+)\)/);
        if (statusMatch) {
          const figmaFaseStatus = statusMatch[1].trim();
          if (figmaFaseStatus !== localFase.status) {
            changes.push({
              type: 'PHASE_STATUS',
              squadId,
              faseId: localFase.id,
              field: 'status',
              local: localFase.status,
              figma: figmaFaseStatus
            });
          }
        }
      }
    }
  }

  // ── Mostrar diff ──

  console.log('\n═══════════════════════════════════════════');
  console.log('  DIFF: Figma → Projeto');
  console.log('═══════════════════════════════════════════\n');

  if (changes.length === 0) {
    console.log('  Nenhuma diferenca encontrada. Tudo sincronizado.\n');
    ws.close();
    return;
  }

  for (const change of changes) {
    switch (change.type) {
      case 'ADD_SQUAD':
        console.log(`  + NOVO SQUAD: ${change.squadId}`);
        console.log(`    domain: ${change.data.domain}`);
        console.log(`    chief: ${change.data.chief}`);
        console.log(`    agents: [${change.data.agents.join(', ')}]`);
        break;
      case 'UPDATE':
        console.log(`  ~ ${change.squadId}.${change.field}`);
        console.log(`    local:  "${change.local}"`);
        console.log(`    figma:  "${change.figma}"`);
        break;
      case 'AGENTS_ADDED':
        console.log(`  + ${change.squadId}.agents`);
        console.log(`    adicionados: [${change.agents.join(', ')}]`);
        break;
      case 'AGENTS_REMOVED':
        console.log(`  - ${change.squadId}.agents`);
        console.log(`    removidos: [${change.agents.join(', ')}]`);
        break;
      case 'PHASE_STATUS':
        console.log(`  ~ ${change.squadId} fase "${change.faseId}"`);
        console.log(`    local:  "${change.local}"`);
        console.log(`    figma:  "${change.figma}"`);
        break;
    }
    console.log('');
  }

  console.log(`  Total: ${changes.length} mudanca(s) detectada(s)\n`);

  // ── Aplicar ──

  if (!APPLY) {
    console.log('  Para aplicar: node scripts/figma-pull-organogram.js ' + CHANNEL + ' --apply\n');
    ws.close();
    return;
  }

  console.log('  Aplicando mudancas no project-state.yaml...\n');

  for (const change of changes) {
    switch (change.type) {
      case 'ADD_SQUAD':
        if (!state.squads) state.squads = {};
        state.squads[change.squadId] = change.data;
        console.log(`  ✓ Squad ${change.squadId} adicionado`);
        break;

      case 'UPDATE':
        if (state.squads[change.squadId]) {
          state.squads[change.squadId][change.field] = change.figma;
          console.log(`  ✓ ${change.squadId}.${change.field} atualizado`);
        }
        break;

      case 'AGENTS_ADDED':
        if (state.squads[change.squadId]) {
          const agents = state.squads[change.squadId].agents || [];
          state.squads[change.squadId].agents = [...agents, ...change.agents];
          console.log(`  ✓ ${change.squadId}: ${change.agents.length} agente(s) adicionado(s)`);
        }
        break;

      case 'AGENTS_REMOVED':
        if (state.squads[change.squadId]) {
          state.squads[change.squadId].agents = (state.squads[change.squadId].agents || [])
            .filter(a => !change.agents.includes(a));
          console.log(`  ✓ ${change.squadId}: ${change.agents.length} agente(s) removido(s)`);
        }
        break;

      case 'PHASE_STATUS':
        const fases = (state.progresso && state.progresso.fases) || [];
        const fase = fases.find(f => f.id === change.faseId);
        if (fase) {
          fase.status = change.figma;
          console.log(`  ✓ Fase "${change.faseId}" status → ${change.figma}`);
        }
        break;
    }
  }

  // Salvar
  const yamlStr = yaml.dump(state, {
    lineWidth: 120,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false
  });

  // Preservar comentarios do header
  const originalContent = fs.readFileSync(STATE_FILE, 'utf8');
  const headerMatch = originalContent.match(/^(#[\s\S]*?)\n[a-z]/);
  const header = headerMatch ? headerMatch[1] + '\n' : '';

  fs.writeFileSync(STATE_FILE, header + yamlStr, 'utf8');
  console.log('\n  project-state.yaml atualizado com sucesso.\n');

  ws.close();
}

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'join',
    channel: CHANNEL,
    id: `join_${Date.now()}`
  }));
  pull().catch(err => {
    console.error('Erro:', err);
    ws.close();
    process.exit(1);
  });
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err.message);
  process.exit(1);
});
