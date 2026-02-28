'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Valida que cada checklist tem comando no Maestro + trigger no protocolo.
 */
function validate(model) {
  const { checklists } = model;
  const issues = [];

  // Ler world-os.md para verificar comandos
  const worldOsPath = path.join(ROOT, '.claude', 'commands', 'world-os.md');
  let worldOsContent = '';
  try {
    worldOsContent = fs.readFileSync(worldOsPath, 'utf8');
  } catch {
    issues.push({
      severity: 'error',
      message: 'Nao foi possivel ler world-os.md',
    });
  }

  // Ler sinapse-protocol.md para verificar triggers
  const protocolPath = path.join(ROOT, '.claude', 'rules', 'sinapse-protocol.md');
  let protocolContent = '';
  try {
    protocolContent = fs.readFileSync(protocolPath, 'utf8');
  } catch {
    issues.push({
      severity: 'error',
      message: 'Nao foi possivel ler sinapse-protocol.md',
    });
  }

  for (const cl of checklists) {
    // Verificar se checklist tem comando no Maestro
    const checklistRef = `checklists/${cl.id}.md`;
    if (worldOsContent && !worldOsContent.includes(checklistRef)) {
      issues.push({
        severity: 'warn',
        message: `Checklist "${cl.id}" nao tem comando registrado no Maestro (world-os.md)`,
      });
    }

    // Verificar se checklist tem trigger no protocolo
    if (protocolContent && !protocolContent.includes(`${cl.id}.md`)) {
      issues.push({
        severity: 'warn',
        message: `Checklist "${cl.id}" nao tem trigger registrado no protocolo (sinapse-protocol.md)`,
      });
    }
  }

  const warnCount = issues.filter(i => i.severity === 'warn').length;

  return {
    name: 'Checklists',
    total: checklists.length,
    expected: checklists.length,
    ok: warnCount === 0,
    issues,
    summary: warnCount === 0
      ? `OK (${checklists.length}/${checklists.length} registered)`
      : `${warnCount} issues found`,
  };
}

module.exports = { validate };
