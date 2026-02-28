'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { glob } = require('./glob-sync');

const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Le e parseia um arquivo YAML. Retorna null se nao existir.
 */
function readYaml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  } catch {
    return null;
  }
}

/**
 * Descobre arquivos por glob pattern relativo ao root.
 */
function discover(pattern) {
  return glob(pattern, ROOT);
}

/**
 * Le o project-state.yaml e extrai o modelo completo.
 */
function readProjectState() {
  const state = readYaml(path.join(ROOT, 'project-state.yaml'));
  if (!state) return null;
  return state;
}

/**
 * Le todos os config.yaml dos squads.
 */
function readSquadConfigs() {
  const configs = {};
  const configFiles = discover('squads/squad-*/config.yaml');

  for (const file of configFiles) {
    const config = readYaml(file);
    if (config && config.squad) {
      const squadId = `squad-${config.squad.id}`;
      configs[squadId] = config;
    }
  }

  return configs;
}

/**
 * Descobre presets na pasta presets/.
 */
function readPresets() {
  const presets = {};
  const files = discover('presets/*.yaml');

  for (const file of files) {
    const preset = readYaml(file);
    if (preset && preset.preset) {
      presets[preset.preset.id] = preset;
    }
  }

  return presets;
}

/**
 * Descobre checklists na pasta checklists/.
 */
function readChecklists() {
  const files = discover('checklists/*.md');
  return files.map(file => {
    const name = path.basename(file, '.md');
    return { id: name, file: path.relative(ROOT, file) };
  });
}

/**
 * Descobre playbooks na pasta playbooks/.
 */
function readPlaybooks() {
  const files = discover('playbooks/*.md');
  return files.map(file => {
    const name = path.basename(file, '.md');
    return { id: name, file: path.relative(ROOT, file) };
  });
}

/**
 * Descobre skills em .claude/commands/squad-*.
 */
function readSkills() {
  const dirs = discover('.claude/commands/squad-*');
  return dirs.filter(d => fs.statSync(d).isDirectory()).map(d => path.basename(d));
}

/**
 * Monta o modelo unificado completo.
 */
function buildModel() {
  const state = readProjectState();
  const squadConfigs = readSquadConfigs();
  const presets = readPresets();
  const checklists = readChecklists();
  const playbooks = readPlaybooks();
  const skills = readSkills();

  // Extrair fases do state
  const fases = state && state.progresso && state.progresso.fases
    ? state.progresso.fases
    : [];

  // Extrair squads do state
  const squads = state && state.squads ? state.squads : {};

  // Extrair negocio_fields dos squads no state (se existirem)
  const negocioFields = {};
  if (state && state.squads) {
    for (const [squadId, squadData] of Object.entries(state.squads)) {
      if (squadData.negocio_fields) {
        negocioFields[squadId] = squadData.negocio_fields;
      }
    }
  }

  return {
    state,
    fases,
    squads,
    squadConfigs,
    negocioFields,
    presets,
    checklists,
    playbooks,
    skills,
    counts: {
      squads: Object.keys(squads).length,
      fases: fases.length,
      presets: Object.keys(presets).length,
      checklists: checklists.length,
      playbooks: playbooks.length,
      skills: skills.length,
    },
  };
}

module.exports = { buildModel, readProjectState, readSquadConfigs, readPresets, readChecklists, readPlaybooks, readSkills, ROOT };
