'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Glob simplificado que suporta patterns basicos (* e **).
 * Nao depende de pacotes externos.
 */
function glob(pattern, cwd) {
  const parts = pattern.split('/');
  const results = [];
  _walk(cwd, parts, 0, results);
  return results.sort();
}

function _walk(dir, parts, depth, results) {
  if (depth >= parts.length) {
    results.push(dir);
    return;
  }

  const part = parts[depth];

  if (part === '**') {
    // Match zero or more directories
    _walk(dir, parts, depth + 1, results);
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          _walk(path.join(dir, entry.name), parts, depth, results);
        }
      }
    } catch { /* ignore */ }
    return;
  }

  // Convert glob pattern to regex
  const regex = new RegExp(
    '^' + part.replace(/\./g, '\\.').replace(/\*/g, '[^/]*') + '$'
  );

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (regex.test(entry.name)) {
        const fullPath = path.join(dir, entry.name);
        if (depth === parts.length - 1) {
          results.push(fullPath);
        } else if (entry.isDirectory()) {
          _walk(fullPath, parts, depth + 1, results);
        }
      }
    }
  } catch { /* ignore */ }
}

module.exports = { glob };
