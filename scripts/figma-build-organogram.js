/**
 * figma-build-organogram.js
 *
 * Cria o organograma sincronizavel no Figma, ABAIXO do conteudo existente.
 * Le dados de project-state.yaml e cria frames + textos no Figma.
 *
 * Uso: node scripts/figma-build-organogram.js <channel_id>
 */

const WebSocket = require('ws');
const { randomUUID } = require('crypto');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const CHANNEL = process.argv[2];
if (!CHANNEL) {
  console.error('Uso: node scripts/figma-build-organogram.js <channel_id>');
  process.exit(1);
}

// Carregar dados do projeto
const stateFile = path.join(__dirname, '..', 'project-state.yaml');
const state = yaml.load(fs.readFileSync(stateFile, 'utf8'));
const squads = state.squads || {};
const fases = (state.progresso && state.progresso.fases) || [];
const projeto = state.projeto || {};

// Layout config
const START_Y = 5500;     // Abaixo do organograma existente (bottom = 4662)
const START_X = -6000;
const CARD_W = 340;
const CARD_H = 280;
const GAP_X = 60;
const GAP_Y = 60;
const COLS = 4;           // 4 colunas

// Cores
const COLORS = {
  bg: { r: 0.07, g: 0.07, b: 0.12, a: 1 },        // fundo escuro
  card: { r: 0.12, g: 0.12, b: 0.2, a: 1 },         // card
  title: { r: 1, g: 1, b: 1, a: 1 },                 // branco
  subtitle: { r: 0.6, g: 0.65, b: 0.8, a: 1 },       // cinza claro
  accent: { r: 0.4, g: 0.6, b: 1, a: 1 },            // azul
  pending: { r: 0.5, g: 0.5, b: 0.5, a: 1 },         // cinza
  in_progress: { r: 1, g: 0.8, b: 0.2, a: 1 },       // amarelo
  concluido: { r: 0.2, g: 0.9, b: 0.4, a: 1 },       // verde
  header: { r: 0.15, g: 0.15, b: 0.25, a: 1 },       // header
};

function getStatusColor(status) {
  if (status === 'concluido') return COLORS.concluido;
  if (status === 'em_andamento') return COLORS.in_progress;
  return COLORS.pending;
}

function getPhaseForSquad(squadId) {
  return fases.find(f => f.squad === squadId) || null;
}

function formatAgentName(name) {
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// WebSocket communication
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
    if (!joined && msg.channel === CHANNEL) {
      joined = true;
    }
    // Verifica se e resposta de join com id
    if (msg.message && typeof msg.message === 'object' && msg.message.id) {
      const cb = pendingCallbacks.get(msg.message.id);
      if (cb) {
        pendingCallbacks.delete(msg.message.id);
        cb.resolve(msg.message.result);
      }
    }
    return;
  }

  if (msg.type === 'broadcast' && msg.sender !== 'You') {
    const response = msg.message;
    if (response && response.id) {
      const cb = pendingCallbacks.get(response.id);
      if (cb) {
        pendingCallbacks.delete(response.id);
        cb.resolve(response.result);
      }
    }
  }
});

async function waitForJoin() {
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (joined) {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
}

async function createFrame(name, x, y, w, h, fillColor, parentId) {
  const params = { x, y, width: w, height: h, name, fillColor };
  if (parentId) params.parentId = parentId;
  return sendCommand('create_frame', params);
}

async function createText(text, x, y, opts = {}) {
  const params = {
    x, y, text,
    fontSize: opts.fontSize || 14,
    fontWeight: opts.fontWeight || 400,
    fontColor: opts.fontColor || COLORS.title,
    name: opts.name || text.substring(0, 30),
  };
  if (opts.parentId) params.parentId = opts.parentId;
  if (opts.width) params.width = opts.width;
  return sendCommand('create_text', params);
}

async function createRect(x, y, w, h, fillColor, opts = {}) {
  const params = { x, y, width: w, height: h, name: opts.name || 'rect', fillColor };
  if (opts.parentId) params.parentId = opts.parentId;
  return sendCommand('create_rectangle', params);
}

// ── Build ──

async function build() {
  console.log('Conectando ao Figma...');
  await waitForJoin();
  console.log('Conectado. Criando organograma...\n');

  const createdNodes = {};
  const squadEntries = Object.entries(squads);

  // 1. Header frame
  const totalW = COLS * (CARD_W + GAP_X) - GAP_X;
  console.log('Criando header...');

  const headerResult = await createFrame(
    'World OS — Sync Organogram',
    START_X, START_Y,
    totalW, 120,
    COLORS.header
  );
  const headerId = headerResult?.id;

  await createText(
    `WORLD OS — Organograma Sincronizado`,
    20, 15,
    { fontSize: 28, fontWeight: 700, fontColor: COLORS.title, parentId: headerId, name: 'sync-title' }
  );

  const projectName = projeto.nome || '(projeto nao configurado)';
  const overallProgress = fases.length > 0
    ? Math.round(fases.filter(f => f.status === 'concluido').length / fases.length * 100)
    : 0;

  await createText(
    `Projeto: ${projectName}  |  Progresso: ${overallProgress}%  |  ${squadEntries.length} squads  |  Sync: ${new Date().toISOString().split('T')[0]}`,
    20, 60,
    { fontSize: 14, fontWeight: 400, fontColor: COLORS.subtitle, parentId: headerId, name: 'sync-subtitle', width: totalW - 40 }
  );

  createdNodes['root'] = {
    frame_id: headerId,
    title_node: 'sync-title',
    progress_node: 'sync-subtitle',
  };

  // 2. Squad cards
  const cardsStartY = START_Y + 120 + GAP_Y;
  console.log(`Criando ${squadEntries.length} cards de squads...\n`);

  for (let i = 0; i < squadEntries.length; i++) {
    const [squadId, squad] = squadEntries[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = START_X + col * (CARD_W + GAP_X);
    const y = cardsStartY + row * (CARD_H + GAP_Y);

    const phase = getPhaseForSquad(squadId);
    const statusColor = phase ? getStatusColor(phase.status) : COLORS.pending;
    const agentNames = (squad.agents || []);
    const totalAgents = agentNames.length + (squad.chief ? 1 : 0);

    console.log(`  [${i+1}/${squadEntries.length}] ${squadId} (${totalAgents} agentes)`);

    // Card frame
    const cardResult = await createFrame(
      `sync-${squadId}`,
      x, y, CARD_W, CARD_H,
      COLORS.card
    );
    const cardId = cardResult?.id;

    // Status indicator (barra colorida no topo)
    await createRect(0, 0, CARD_W, 6, statusColor, {
      parentId: cardId,
      name: `status-${squadId}`
    });

    // Squad name
    const displayName = squadId.replace('squad-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const nameResult = await createText(
      displayName,
      16, 20,
      { fontSize: 20, fontWeight: 700, fontColor: COLORS.title, parentId: cardId, name: `name-${squadId}` }
    );

    // Domain
    const domainResult = await createText(
      squad.domain || '',
      16, 48,
      { fontSize: 11, fontWeight: 400, fontColor: COLORS.subtitle, parentId: cardId, name: `domain-${squadId}`, width: CARD_W - 32 }
    );

    // Chief
    const chiefName = squad.chief ? formatAgentName(squad.chief) : '(sem chief)';
    const chiefResult = await createText(
      `Chief: ${chiefName}`,
      16, 75,
      { fontSize: 12, fontWeight: 600, fontColor: COLORS.accent, parentId: cardId, name: `chief-${squadId}` }
    );

    // Phase + status
    const phaseText = phase ? `${phase.nome} (${phase.status})` : 'Sem fase vinculada';
    const phaseResult = await createText(
      phaseText,
      16, 100,
      { fontSize: 11, fontWeight: 400, fontColor: statusColor, parentId: cardId, name: `phase-${squadId}`, width: CARD_W - 32 }
    );

    // Agent count
    const countResult = await createText(
      `${totalAgents} agentes`,
      16, 125,
      { fontSize: 12, fontWeight: 600, fontColor: COLORS.title, parentId: cardId, name: `count-${squadId}` }
    );

    // Agent list
    const agentList = agentNames.map(formatAgentName).join('\n');
    const agentsResult = await createText(
      agentList || '(nenhum agente)',
      16, 148,
      { fontSize: 10, fontWeight: 400, fontColor: COLORS.subtitle, parentId: cardId, name: `agents-${squadId}`, width: CARD_W - 32 }
    );

    createdNodes[squadId] = {
      frame_id: cardId,
      name_node: nameResult?.id,
      domain_node: domainResult?.id,
      chief_node: chiefResult?.id,
      agents_node: agentsResult?.id,
      status_node: phaseResult?.id,
      agent_count_node: countResult?.id,
    };
  }

  console.log('\nOrganograma criado com sucesso.');
  console.log(`Posicao: x=${START_X}, y=${START_Y} (abaixo do organograma existente)`);
  console.log(`\nNode IDs para mapeamento:`);
  console.log(JSON.stringify(createdNodes, null, 2));

  ws.close();
}

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'join',
    channel: CHANNEL,
    id: `join_${Date.now()}`
  }));
  build().catch(err => {
    console.error('Erro:', err);
    ws.close();
    process.exit(1);
  });
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err.message);
  process.exit(1);
});
