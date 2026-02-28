'use strict';

/**
 * Valida que todos os presets cobrem todas as fases.
 */
function validate(model) {
  const { presets, fases } = model;
  const faseIds = fases.map(f => f.id);
  const issues = [];

  for (const [presetId, preset] of Object.entries(presets)) {
    if (!preset.fases) {
      issues.push({
        severity: 'warn',
        message: `Preset "${presetId}" nao define fases`,
      });
      continue;
    }

    const presetFaseIds = Object.keys(preset.fases);

    // Verificar fases faltando no preset
    for (const faseId of faseIds) {
      if (!presetFaseIds.includes(faseId)) {
        issues.push({
          severity: 'warn',
          message: `Preset "${presetId}" nao cobre fase "${faseId}"`,
        });
      }
    }

    // Verificar fases extras no preset que nao existem no state
    for (const faseId of presetFaseIds) {
      if (!faseIds.includes(faseId)) {
        issues.push({
          severity: 'warn',
          message: `Preset "${presetId}" referencia fase inexistente "${faseId}"`,
        });
      }
    }
  }

  return {
    name: 'Presets',
    total: Object.keys(presets).length,
    expected: Object.keys(presets).length,
    ok: issues.length === 0,
    issues,
    summary: issues.length === 0
      ? `OK (${Object.keys(presets).length}/${Object.keys(presets).length} cover all phases)`
      : `${issues.length} issues found`,
  };
}

module.exports = { validate };
