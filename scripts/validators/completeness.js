'use strict';

const fs = require('fs');
const path = require('path');
const { glob } = require('../lib/glob-sync');

const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Valida cross-check: squads no state == pastas em squads/ == skills em .claude/commands/
 */
function validate(model) {
  const { squads, skills } = model;
  const issues = [];

  // Squads no state
  const stateSquadIds = new Set(Object.keys(squads));

  // Pastas em squads/
  const squadDirs = glob('squads/squad-*', ROOT)
    .filter(d => fs.statSync(d).isDirectory())
    .map(d => path.basename(d));
  const dirSquadIds = new Set(squadDirs);

  // Skills em .claude/commands/squad-*
  const skillSquadIds = new Set(skills);

  // Verificar: squads no state sem pasta correspondente
  for (const id of stateSquadIds) {
    if (!dirSquadIds.has(id)) {
      issues.push({
        severity: 'warn',
        message: `Squad "${id}" esta no project-state.yaml mas nao tem pasta em squads/`,
      });
    }
    if (!skillSquadIds.has(id)) {
      issues.push({
        severity: 'info',
        message: `Squad "${id}" esta no project-state.yaml mas nao tem skill em .claude/commands/`,
      });
    }
  }

  // Verificar: pastas sem entrada no state
  for (const id of dirSquadIds) {
    if (!stateSquadIds.has(id)) {
      issues.push({
        severity: 'warn',
        message: `Pasta "squads/${id}" existe mas squad nao esta no project-state.yaml`,
      });
    }
  }

  // Verificar: skills sem entrada no state
  for (const id of skillSquadIds) {
    if (!stateSquadIds.has(id)) {
      issues.push({
        severity: 'info',
        message: `Skill "${id}" existe em .claude/commands/ mas squad nao esta no project-state.yaml`,
      });
    }
  }

  // Verificar: cada squad tem config.yaml
  for (const id of stateSquadIds) {
    const configPath = path.join(ROOT, 'squads', id, 'config.yaml');
    if (dirSquadIds.has(id) && !fs.existsSync(configPath)) {
      issues.push({
        severity: 'warn',
        message: `Squad "${id}" nao tem config.yaml`,
      });
    }
  }

  const warnCount = issues.filter(i => i.severity === 'warn').length;

  return {
    name: 'Completeness',
    total: stateSquadIds.size,
    dirs: dirSquadIds.size,
    skills: skillSquadIds.size,
    ok: warnCount === 0,
    issues,
    summary: warnCount === 0
      ? `OK (${stateSquadIds.size} squads, ${dirSquadIds.size} dirs, ${skillSquadIds.size} skills)`
      : `WARN (${warnCount} issues)`,
  };
}

module.exports = { validate };
