#!/usr/bin/env node

/**
 * World OS — Duplicate for New Client
 *
 * Clones the matrix project and configures it for a new client.
 *
 * Usage (Interactive):
 *   npm run duplicate-for-client
 *
 * Usage (Direct):
 *   npm run duplicate-for-client -- "Client Name" "Segment" "folder-name" (optional)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Color output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.error(`${colors.red}✗${colors.reset} ${msg}`),
  prompt: (msg) => process.stdout.write(`${colors.cyan}?${colors.reset} ${msg}`),
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to ask questions
function ask(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}?${colors.reset} ${question} `, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Sanitize name for folder
function sanitizeFolder(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Main function
async function main() {
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}🌍 World OS — Duplicar para Novo Cliente${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);

  let clientName = process.argv[2];
  let clientSegment = process.argv[3];
  let folderName = process.argv[4];

  // Ask for client name if not provided
  if (!clientName) {
    clientName = await ask('Nome do cliente:');
    if (!clientName) {
      log.error('Nome do cliente é obrigatório');
      process.exit(1);
    }
  }

  // Ask for segment if not provided
  if (!clientSegment) {
    clientSegment = await ask('Segmento/Indústria:');
    if (!clientSegment) {
      log.error('Segmento é obrigatório');
      process.exit(1);
    }
  }

  // Generate suggested folder name
  const suggestedFolder = `world-${sanitizeFolder(clientName)}`;

  // Ask for folder name if not provided
  if (!folderName) {
    folderName = await ask(`Nome da pasta [${suggestedFolder}]:`);
    if (!folderName) {
      folderName = suggestedFolder;
    }
  }

  // Ensure folder name starts with 'world-'
  if (!folderName.startsWith('world-')) {
    folderName = `world-${folderName}`;
  }

  console.log('');
  log.info(`Cliente: ${clientName}`);
  log.info(`Segmento: ${clientSegment}`);
  log.info(`Pasta: ${folderName}\n`);

  // Close readline before proceeding
  rl.close();

  // Always output to desktop
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const desktopPath = path.join(homeDir, 'Desktop');
  const clientProjectPath = path.join(desktopPath, folderName);

  // Check if folder already exists
  if (fs.existsSync(clientProjectPath)) {
    log.error(`Pasta '${folderName}' já existe no desktop!`);
    process.exit(1);
  }

  try {
    // Step 1: Clone the matrix
    log.info('Step 1: Clonando projeto matriz...');
    execSync(`cp -r "${path.dirname(__dirname)}" "${clientProjectPath}"`, {
      stdio: 'inherit'
    });
    log.success('Projeto clonado');

    // Copy hook files
    const hooksDir = path.join(clientProjectPath, '.claude', 'hooks');
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    const initAdvisorSource = path.join(__dirname, '..', '.claude', 'INIT-ADVISOR.md');
    const hooksJsonSource = path.join(__dirname, '..', '.claude', 'hooks.json');
    const autoInitSource = path.join(__dirname, '..', '.claude', 'AUTO-INIT.md');

    if (fs.existsSync(initAdvisorSource)) {
      fs.copyFileSync(initAdvisorSource, path.join(clientProjectPath, '.claude', 'INIT-ADVISOR.md'));
    }
    if (fs.existsSync(hooksJsonSource)) {
      fs.copyFileSync(hooksJsonSource, path.join(clientProjectPath, '.claude', 'hooks.json'));
    }
    if (fs.existsSync(autoInitSource)) {
      fs.copyFileSync(autoInitSource, path.join(clientProjectPath, '.claude', 'AUTO-INIT.md'));
    }
    console.log('');

    // Step 2: Copy conselho command
    log.info('Step 2: Configurando Board de Conselheiros...');
    const conselhoFile = path.join(__dirname, '..', '.claude', 'commands', 'conselho.md');
    if (fs.existsSync(conselhoFile)) {
      fs.copyFileSync(
        conselhoFile,
        path.join(clientProjectPath, 'squad-advisor.md')
      );
      log.success('Board de Conselheiros pronto');
    }

    // Step 3: Fill templates
    log.info('Step 3: Preenchendo templates...');

    const now = new Date().toISOString().split('T')[0];
    const templateVars = {
      CLIENT_NAME: clientName,
      CLIENT_SEGMENT: clientSegment,
      PROJECT_PATH: clientProjectPath,
      CREATION_DATE: now,
      MATRIX_PATH: path.dirname(__dirname),
    };

    // Helper to replace vars
    const replaceVars = (content) => {
      let result = content;
      Object.entries(templateVars).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{${key}}`, 'g'), value);
      });
      return result;
    };

    // Fill README.md
    const readmeTemplate = fs.readFileSync(
      path.join(clientProjectPath, 'new-readme.template.md'),
      'utf8'
    );
    fs.writeFileSync(
      path.join(clientProjectPath, 'README.md'),
      replaceVars(readmeTemplate)
    );
    fs.unlinkSync(path.join(clientProjectPath, 'new-readme.template.md'));
    log.success('README.md preenchido');

    // Fill SETUP.md
    const setupTemplate = fs.readFileSync(
      path.join(clientProjectPath, 'new-setup.template.md'),
      'utf8'
    );
    fs.writeFileSync(
      path.join(clientProjectPath, 'SETUP.md'),
      replaceVars(setupTemplate)
    );
    fs.unlinkSync(path.join(clientProjectPath, 'new-setup.template.md'));
    log.success('SETUP.md preenchido');

    // Fill client-config.yaml
    const configTemplate = fs.readFileSync(
      path.join(clientProjectPath, 'new-client-config.template.yaml'),
      'utf8'
    );
    fs.writeFileSync(
      path.join(clientProjectPath, 'client-config.yaml'),
      replaceVars(configTemplate)
    );
    fs.unlinkSync(path.join(clientProjectPath, 'new-client-config.template.yaml'));
    log.success('client-config.yaml preenchido');

    // Fill project-state.yaml
    const projectStateFile = path.join(clientProjectPath, 'project-state.yaml');
    const projectStateTemplate = fs.readFileSync(projectStateFile, 'utf8');
    fs.writeFileSync(
      projectStateFile,
      replaceVars(projectStateTemplate)
    );
    log.success('project-state.yaml preenchido');

    // Fill WELCOME.md
    const welcomeTemplatePath = path.join(clientProjectPath, '.claude', 'new-welcome.template.md');
    if (fs.existsSync(welcomeTemplatePath)) {
      const welcomeTemplate = fs.readFileSync(welcomeTemplatePath, 'utf8');
      fs.writeFileSync(
        path.join(clientProjectPath, '.claude', 'WELCOME.md'),
        replaceVars(welcomeTemplate)
      );
      fs.unlinkSync(welcomeTemplatePath);
      log.success('WELCOME.md preenchido');
    }

    // Add auto-activation to CLAUDE.md with force-activation marker
    const claudeMdPath = path.join(clientProjectPath, '.claude', 'CLAUDE.md');
    if (fs.existsSync(claudeMdPath)) {
      const claudeMdContent = fs.readFileSync(claudeMdPath, 'utf8');
      // Add auto-activation section at the top with special marker
      const autoActivation = `<!-- ⚡ AUTO-INIT: EXECUTE IMMEDIATELY ⚡ -->
<!-- SKILL: /squad-advisor:agents:advisor-chief -->
<!-- ACTION: Activate advisor board on project open -->

🧠 **Board de Conselheiros Ativo — ${clientName}**

Seu conselho de elite está pronto e esperando por você:
- 💡 Simon Sinek (Propósito & Liderança)
- 💰 Alex Hormozi (Monetização & Escala)
- 🍎 Steve Jobs (Produto & Design)

Comece descrevendo seu desafio!

---

`;
      const updatedContent = autoActivation + claudeMdContent;
      fs.writeFileSync(claudeMdPath, updatedContent);
      log.success('Auto-ativação 100% configurada');
    }

    console.log('');

    // Step 4: Summary
    log.success('✨ Novo projeto pronto!\n');
    console.log(`${colors.green}═════════════════════════════════════${colors.reset}`);
    console.log(`${colors.green}Próximos Passos:${colors.reset}`);
    console.log(`
1. Navegue até o projeto:
   cd ${clientProjectPath}

2. Abra no Claude Code:
   code .

3. Ative o conselho:
   /squad-advisor:agents:advisor-chief

4. Comece a construir! Leia README.md e SETUP.md para guia completo.
`);
    console.log(`${colors.green}═════════════════════════════════════${colors.reset}\n`);

  } catch (error) {
    log.error(`Erro: ${error.message}`);
    process.exit(1);
  }
}

main();
