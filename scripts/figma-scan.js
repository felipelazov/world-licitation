/**
 * figma-scan.js
 *
 * Conecta ao WebSocket do plugin Figma e escaneia a estrutura do documento.
 * Usa o mesmo protocolo do MCP server (command + params).
 *
 * Uso: node scripts/figma-scan.js <channel_id> <command> [params_json]
 *
 * Comandos:
 *   get_document_info    — Info do documento
 *   get_page_nodes       — Nodes da pagina ativa
 *   get_selection         — Nodes selecionados
 *   get_node_info         — Info de um node (params: {"nodeId":"123:456"})
 *   scan_text_nodes       — Todos text nodes da pagina
 *   read_text_content     — Le texto de um node (params: {"nodeId":"123:456"})
 *   get_styles            — Estilos do documento
 *   ping                  — Verifica conexao
 */

const WebSocket = require('ws');
const { randomUUID } = require('crypto');

const PORT = 3055;
const CHANNEL = process.argv[2];
const COMMAND = process.argv[3] || 'get_document_info';
const PARAMS_JSON = process.argv[4] || '{}';

if (!CHANNEL) {
  console.error('Uso: node scripts/figma-scan.js <channel_id> <command> [params_json]');
  process.exit(1);
}

let params;
try {
  params = JSON.parse(PARAMS_JSON);
} catch (e) {
  params = {};
}

const ws = new WebSocket(`ws://localhost:${PORT}`);
let joined = false;
let commandSent = false;
let responseTimeout;
const messageId = randomUUID();

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'join',
    channel: CHANNEL,
    id: `join_${Date.now()}`
  }));
});

ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());

  // Aguardar confirmacao de join
  if (msg.type === 'system') {
    if (!joined && msg.channel === CHANNEL) {
      joined = true;
    }
    // Apos join, enviar comando
    if (joined && !commandSent) {
      commandSent = true;
      const payload = {
        id: messageId,
        command: COMMAND,
        params: params
      };
      ws.send(JSON.stringify({
        type: 'message',
        channel: CHANNEL,
        message: payload
      }));

      responseTimeout = setTimeout(() => {
        console.error('Timeout: Figma nao respondeu em 20s');
        ws.close();
        process.exit(1);
      }, 20000);
    }
    return;
  }

  // Resposta do Figma (broadcast de volta)
  if (msg.type === 'broadcast' && msg.sender !== 'You') {
    clearTimeout(responseTimeout);
    console.log(JSON.stringify(msg.message, null, 2));
    ws.close();
    process.exit(0);
  }
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err.message);
  process.exit(1);
});

ws.on('close', () => {
  if (!joined) {
    console.error('Conexao fechada antes de entrar no channel');
    process.exit(1);
  }
});
