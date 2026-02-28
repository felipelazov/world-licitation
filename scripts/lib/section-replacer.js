'use strict';

const fs = require('fs');
const path = require('path');

const START_TAG = '<!-- WORLD-SYNC-START:';
const END_TAG = '<!-- WORLD-SYNC-END:';
const YAML_START_TAG = '# WORLD-SYNC-START:';
const YAML_END_TAG = '# WORLD-SYNC-END:';

/**
 * Extrai o ID de um marcador.
 */
function extractId(line, prefix) {
  const after = line.slice(prefix.length).trim();
  return after.replace(/\s*-->$/, '').trim();
}

/**
 * Substitui o conteudo entre marcadores WORLD-SYNC-START/END em um arquivo.
 * Retorna { changed, content } onde changed indica se houve mudanca.
 */
function replaceSections(fileContent, sections, isYaml) {
  const startTag = isYaml ? YAML_START_TAG : START_TAG;
  const endTag = isYaml ? YAML_END_TAG : END_TAG;

  const lines = fileContent.split('\n');
  const result = [];
  let currentSection = null;
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    if (trimmed.startsWith(startTag)) {
      const id = extractId(trimmed, startTag);
      currentSection = id;
      result.push(line);

      if (sections[id] !== undefined) {
        // Coletar conteudo atual entre marcadores
        const oldLines = [];
        let j = i + 1;
        while (j < lines.length) {
          const nextTrimmed = lines[j].trimStart();
          if (nextTrimmed.startsWith(endTag) && extractId(nextTrimmed, endTag) === id) {
            break;
          }
          oldLines.push(lines[j]);
          j++;
        }

        const oldContent = oldLines.join('\n');
        const newContent = sections[id];

        if (oldContent !== newContent) {
          changed = true;
        }

        // Inserir novo conteudo
        if (newContent) {
          result.push(newContent);
        }

        // Pular linhas antigas ate o END tag
        i = j - 1; // O loop incrementara i
      }
      continue;
    }

    if (trimmed.startsWith(endTag)) {
      const id = extractId(trimmed, endTag);
      if (id === currentSection) {
        currentSection = null;
        result.push(line);
        continue;
      }
    }

    if (currentSection && sections[currentSection] !== undefined) {
      // Pular linhas antigas — ja foram substituidas
      continue;
    }

    result.push(line);
  }

  return { changed, content: result.join('\n') };
}

/**
 * Le um arquivo, substitui secoes marcadas, e escreve de volta.
 * Retorna { changed, sections } indicando quais secoes foram atualizadas.
 */
function syncFile(filePath, sections) {
  const isYaml = filePath.endsWith('.yaml') || filePath.endsWith('.yml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { changed, content } = replaceSections(fileContent, sections, isYaml);

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return { changed };
}

/**
 * Le um arquivo e compara as secoes atuais com as esperadas.
 * Retorna um array de { sectionId, status } para cada secao.
 */
function diffFile(filePath, sections) {
  const isYaml = filePath.endsWith('.yaml') || filePath.endsWith('.yml');

  if (!fs.existsSync(filePath)) {
    return Object.keys(sections).map(id => ({
      sectionId: id,
      status: 'missing_file',
    }));
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const startTag = isYaml ? YAML_START_TAG : START_TAG;
  const endTag = isYaml ? YAML_END_TAG : END_TAG;

  const lines = fileContent.split('\n');
  const results = [];
  const foundSections = new Set();

  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const trimmed = line.trimStart();

    if (trimmed.startsWith(startTag)) {
      const id = extractId(trimmed, startTag);
      currentSection = id;
      currentLines = [];
      foundSections.add(id);
      continue;
    }

    if (trimmed.startsWith(endTag)) {
      const id = extractId(trimmed, endTag);
      if (id === currentSection && sections[id] !== undefined) {
        const currentContent = currentLines.join('\n');
        const expectedContent = sections[id];
        results.push({
          sectionId: id,
          status: currentContent === expectedContent ? 'in_sync' : 'out_of_sync',
          current: currentContent,
          expected: expectedContent,
        });
      }
      currentSection = null;
      currentLines = [];
      continue;
    }

    if (currentSection) {
      currentLines.push(line);
    }
  }

  // Verificar secoes esperadas que nao existem no arquivo
  for (const id of Object.keys(sections)) {
    if (!foundSections.has(id)) {
      results.push({
        sectionId: id,
        status: 'missing_markers',
      });
    }
  }

  return results;
}

module.exports = { replaceSections, syncFile, diffFile };
