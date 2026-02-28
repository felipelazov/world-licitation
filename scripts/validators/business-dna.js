'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Valida integridade da fase business-dna no World OS.
 */
function validate(model) {
  const { fases, playbooks, checklists, presets } = model;
  const issues = [];

  // 1. Fase business-dna existe no state
  const dnaFase = fases.find(f => f.id === 'business-dna');
  if (!dnaFase) {
    issues.push({
      severity: 'warn',
      message: 'Fase "business-dna" nao existe em project-state.yaml > progresso.fases',
    });
  }

  // 2. Diretorio deliverables/business-dna/ existe
  const deliverablesDir = path.join(ROOT, 'deliverables', 'business-dna');
  if (!fs.existsSync(deliverablesDir)) {
    issues.push({
      severity: 'warn',
      message: 'Diretorio deliverables/business-dna/ nao existe',
    });
  }

  // 3. Playbook playbooks/business-dna.md existe
  const playbookExists = playbooks.some(p => p.id === 'business-dna');
  if (!playbookExists) {
    issues.push({
      severity: 'warn',
      message: 'Playbook playbooks/business-dna.md nao existe',
    });
  }

  // 4. Checklist checklists/business-dna-validation.md existe
  const checklistExists = checklists.some(c => c.id === 'business-dna-validation');
  if (!checklistExists) {
    issues.push({
      severity: 'warn',
      message: 'Checklist checklists/business-dna-validation.md nao existe',
    });
  }

  // 5. Template em squad-product/templates/ existe
  const templatePath = path.join(ROOT, 'squads', 'squad-product', 'templates', 'business-dna-blueprint-tmpl.md');
  if (!fs.existsSync(templatePath)) {
    issues.push({
      severity: 'warn',
      message: 'Template squads/squad-product/templates/business-dna-blueprint-tmpl.md nao existe',
    });
  }

  // 6. Todos os 8 presets incluem business-dna
  for (const [presetId, preset] of Object.entries(presets)) {
    if (preset.fases && !preset.fases['business-dna']) {
      issues.push({
        severity: 'warn',
        message: `Preset "${presetId}" nao inclui fase "business-dna"`,
      });
    }
  }

  const warnCount = issues.filter(i => i.severity === 'warn').length;
  const checks = 5 + Object.keys(presets).length; // 5 fixed checks + 1 per preset

  return {
    name: 'Business DNA',
    total: checks,
    ok: warnCount === 0,
    issues,
    summary: warnCount === 0
      ? `OK (${checks}/${checks} checks passed)`
      : `${warnCount} issue(s) found`,
  };
}

module.exports = { validate };
