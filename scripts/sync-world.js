'use strict';

const path = require('path');
const { buildModel } = require('./lib/registry-reader');
const { syncFile, diffFile } = require('./lib/section-replacer');

// Sync targets
const worldOs = require('./sync-targets/world-os');
const sinapseProtocol = require('./sync-targets/sinapse-protocol');
const deliverablesReadme = require('./sync-targets/deliverables-readme');
const clientIntake = require('./sync-targets/client-intake');

// Validators
const presetsValidator = require('./validators/presets');
const playbooksValidator = require('./validators/playbooks');
const checklistsValidator = require('./validators/checklists');
const completenessValidator = require('./validators/completeness');
const figmaMapValidator = require('./validators/figma-map');
const businessDnaValidator = require('./validators/business-dna');

// ─── Helpers ──────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

function relPath(absPath) {
  return path.relative(ROOT, absPath);
}

function pad(str, len) {
  return str + ' '.repeat(Math.max(0, len - str.length));
}

function statusIcon(status) {
  switch (status) {
    case 'in_sync': return 'IN SYNC';
    case 'out_of_sync': return 'OUT OF SYNC';
    case 'missing_markers': return 'MISSING MARKERS';
    case 'missing_file': return 'MISSING FILE';
    default: return status;
  }
}

// ─── Commands ─────────────────────────────────────────────

function runValidate() {
  const model = buildModel();

  console.log('');
  console.log('World OS Sync Validation');
  console.log('========================');
  console.log(`Sources: ${model.counts.squads} squads, ${model.counts.fases} phases`);

  // Gather all sections from all targets
  const targets = [
    { name: relPath(worldOs.TARGET_FILE), generator: worldOs },
    { name: relPath(sinapseProtocol.TARGET_FILE), generator: sinapseProtocol },
    { name: relPath(deliverablesReadme.TARGET_FILE), generator: deliverablesReadme },
    { name: relPath(clientIntake.TARGET_FILE), generator: clientIntake },
  ];

  let totalSections = 0;
  let outOfSync = 0;

  console.log('');

  for (const target of targets) {
    const sections = target.generator.generate(model);
    totalSections += Object.keys(sections).length;

    console.log(`  ${target.name}`);

    const results = diffFile(target.generator.TARGET_FILE, sections);

    for (const result of results) {
      const dots = '.'.repeat(Math.max(1, 30 - result.sectionId.length));
      const status = statusIcon(result.status);
      const marker = result.status === 'in_sync' ? '' : ' *';
      console.log(`    ${result.sectionId} ${dots} ${status}${marker}`);

      if (result.status !== 'in_sync') {
        outOfSync++;
      }
    }
  }

  console.log(`\nDerived: ${totalSections} sections across ${targets.length} files`);

  // Run validators
  console.log('\nValidators:');

  const validators = [
    presetsValidator,
    playbooksValidator,
    checklistsValidator,
    completenessValidator,
    figmaMapValidator,
    businessDnaValidator,
  ];

  let totalIssues = outOfSync;

  for (const validator of validators) {
    const result = validator.validate(model);
    const dots = '.'.repeat(Math.max(1, 18 - result.name.length));
    const icon = result.ok ? 'OK' : 'WARN';
    console.log(`  ${result.name} ${dots} ${icon} (${result.summary})`);

    if (!result.ok) {
      for (const issue of result.issues) {
        if (issue.severity === 'warn' || issue.severity === 'error') {
          console.log(`    - ${issue.message}`);
          totalIssues++;
        }
      }
    }
  }

  console.log('');

  if (totalIssues === 0) {
    console.log('Result: All in sync');
  } else {
    console.log(`Result: ${totalIssues} issue(s) found`);
  }

  console.log('');
  return totalIssues === 0 ? 0 : 1;
}

function runDiff() {
  const model = buildModel();

  const targets = [
    { name: relPath(worldOs.TARGET_FILE), generator: worldOs },
    { name: relPath(sinapseProtocol.TARGET_FILE), generator: sinapseProtocol },
    { name: relPath(deliverablesReadme.TARGET_FILE), generator: deliverablesReadme },
    { name: relPath(clientIntake.TARGET_FILE), generator: clientIntake },
  ];

  console.log('');
  console.log('World OS Sync Diff');
  console.log('==================');

  let anyDiff = false;

  for (const target of targets) {
    const sections = target.generator.generate(model);
    const results = diffFile(target.generator.TARGET_FILE, sections);

    const outOfSyncResults = results.filter(r => r.status !== 'in_sync');

    if (outOfSyncResults.length > 0) {
      anyDiff = true;
      console.log(`\n--- ${target.name} ---`);

      for (const result of outOfSyncResults) {
        console.log(`\n  Section: ${result.sectionId} (${statusIcon(result.status)})`);

        if (result.current !== undefined && result.expected !== undefined) {
          // Show simplified diff
          const currentLines = result.current.split('\n');
          const expectedLines = result.expected.split('\n');

          console.log('  Current:');
          for (const line of currentLines.slice(0, 5)) {
            console.log(`    - ${line}`);
          }
          if (currentLines.length > 5) {
            console.log(`    ... (${currentLines.length - 5} more lines)`);
          }

          console.log('  Expected:');
          for (const line of expectedLines.slice(0, 5)) {
            console.log(`    + ${line}`);
          }
          if (expectedLines.length > 5) {
            console.log(`    ... (${expectedLines.length - 5} more lines)`);
          }
        }
      }
    }
  }

  if (!anyDiff) {
    console.log('\nNo differences found. Everything is in sync.');
  }

  console.log('');
  return anyDiff ? 1 : 0;
}

function runSync() {
  const model = buildModel();

  const targets = [
    { name: relPath(worldOs.TARGET_FILE), generator: worldOs },
    { name: relPath(sinapseProtocol.TARGET_FILE), generator: sinapseProtocol },
    { name: relPath(deliverablesReadme.TARGET_FILE), generator: deliverablesReadme },
    { name: relPath(clientIntake.TARGET_FILE), generator: clientIntake },
  ];

  console.log('');
  console.log('World OS Sync');
  console.log('=============');

  let totalChanged = 0;

  for (const target of targets) {
    const sections = target.generator.generate(model);
    const { changed } = syncFile(target.generator.TARGET_FILE, sections);

    const status = changed ? 'UPDATED' : 'no changes';
    console.log(`  ${pad(target.name, 45)} ${status}`);

    if (changed) totalChanged++;
  }

  console.log('');

  if (totalChanged === 0) {
    console.log('No files needed updating. Everything was already in sync.');
  } else {
    console.log(`${totalChanged} file(s) updated.`);
  }

  console.log('');
  return 0;
}

// ─── Main ─────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--validate')) {
    process.exit(runValidate());
  } else if (args.includes('--diff')) {
    process.exit(runDiff());
  } else if (args.includes('--sync') || args.length === 0) {
    process.exit(runSync());
  } else {
    console.log('Usage: sync-world.js [--validate | --diff | --sync]');
    console.log('');
    console.log('  --validate   Check if everything is in sync (read-only)');
    console.log('  --diff       Show what would change');
    console.log('  --sync       Apply changes (default)');
    process.exit(1);
  }
}

main();
