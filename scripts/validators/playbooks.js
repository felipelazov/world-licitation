'use strict';

/**
 * Valida que existe playbook para cada fase.
 */
function validate(model) {
  const { fases, playbooks } = model;
  const playbookIds = playbooks.map(p => p.id);
  const issues = [];

  for (const fase of fases) {
    if (!playbookIds.includes(fase.id)) {
      issues.push({
        severity: 'warn',
        message: `Fase "${fase.id}" (${fase.nome}) nao tem playbook correspondente`,
      });
    }
  }

  // Playbooks sem fase correspondente
  const faseIds = fases.map(f => f.id);
  for (const pb of playbooks) {
    if (!faseIds.includes(pb.id)) {
      issues.push({
        severity: 'info',
        message: `Playbook "${pb.id}" nao corresponde a nenhuma fase`,
      });
    }
  }

  return {
    name: 'Playbooks',
    total: playbooks.length,
    expected: fases.length,
    ok: issues.filter(i => i.severity === 'warn').length === 0,
    issues,
    summary: issues.filter(i => i.severity === 'warn').length === 0
      ? `OK (${fases.length}/${fases.length} exist)`
      : `${issues.filter(i => i.severity === 'warn').length} missing`,
  };
}

module.exports = { validate };
