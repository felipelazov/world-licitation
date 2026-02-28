'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..', '..');
const MAP_FILE = path.join(ROOT, 'figma-organogram-map.yaml');

/**
 * Valida que o figma-organogram-map.yaml cobre todos os squads
 * e que cada entrada tem os IDs preenchidos.
 */
function validate(model) {
  const { squads } = model;
  const issues = [];

  // Ler o mapa do Figma
  let mapping = null;
  try {
    const content = fs.readFileSync(MAP_FILE, 'utf8');
    mapping = yaml.load(content);
  } catch {
    issues.push({
      severity: 'warn',
      message: 'figma-organogram-map.yaml nao encontrado ou invalido',
    });
    return {
      name: 'Figma Map',
      total: 0,
      expected: Object.keys(squads).length,
      ok: false,
      issues,
      summary: 'MISSING (arquivo nao encontrado)',
    };
  }

  const mappings = mapping.mappings || {};
  const mappedIds = new Set(Object.keys(mappings));
  const stateIds = new Set(Object.keys(squads));

  let unmappedCount = 0;
  let emptyNodeCount = 0;

  // Squads no state sem entrada no mapa
  for (const id of stateIds) {
    if (!mappedIds.has(id)) {
      unmappedCount++;
      issues.push({
        severity: 'warn',
        message: `Squad "${id}" nao tem entrada no figma-organogram-map.yaml`,
      });
    }
  }

  // Entradas no mapa sem squad no state (stale)
  for (const id of mappedIds) {
    if (!stateIds.has(id)) {
      issues.push({
        severity: 'warn',
        message: `Figma map tem "${id}" mas squad nao existe no project-state.yaml (stale)`,
      });
    }
  }

  // Entradas com IDs vazios (pendentes de build)
  const requiredNodes = ['frame_id', 'name_node', 'domain_node', 'chief_node', 'agents_node', 'status_node', 'agent_count_node'];

  for (const [id, nodes] of Object.entries(mappings)) {
    if (!stateIds.has(id)) continue;

    const emptyNodes = requiredNodes.filter(key => !nodes[key]);
    if (emptyNodes.length > 0) {
      emptyNodeCount++;
      issues.push({
        severity: 'info',
        message: `Squad "${id}" tem ${emptyNodes.length} node(s) vazio(s) — precisa de rebuild no Figma`,
      });
    }
  }

  const warnCount = issues.filter(i => i.severity === 'warn').length;
  const mapped = stateIds.size - unmappedCount;
  const built = mapped - emptyNodeCount;

  return {
    name: 'Figma Map',
    total: mappedIds.size,
    expected: stateIds.size,
    ok: warnCount === 0,
    issues,
    summary: warnCount === 0
      ? `OK (${mapped}/${stateIds.size} mapped${emptyNodeCount > 0 ? `, ${emptyNodeCount} pending build` : ''})`
      : `${warnCount} issues (${unmappedCount} unmapped)`,
  };
}

module.exports = { validate };
