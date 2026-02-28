# Task: Desenhar Estrutura de Sistema

**Task ID:** squad-ops/design-system-structure
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 60-120 minutos
**Agent:** architect

---

## Proposito

Transformar um mapa de processo (output do Process Mapper) em estrutura concreta de sistema: pastas, listas, campos, status e views. Cada fase vira folder, cada etapa vira lista, cada dado critico vira campo obrigatorio. Status NUNCA volta. View NUNCA mistura executores.

**REGRA INVIOLAVEL:** Architect NUNCA cria automacoes e NUNCA mapeia processos. Desenha ESTRUTURA que outros executam dentro. [SOURCE: Pedro Valerio]

---

## Inputs

```yaml
obrigatorios:
  mapa_processo:
    field: "Mapa do processo (output de map-process, QG >= 70%)"
    format: "markdown com etapas, responsaveis, gaps, vetos"
    required: true
  ferramenta:
    field: "Ferramenta de gestao (ClickUp, Notion, Asana, etc)"
    format: "string"
    required: true
  roles_equipe:
    field: "Cargos/funcoes da equipe que vai operar"
    format: "lista de roles com nomes"
    required: true
```

---

## Steps

### Step 1: Definir Hierarquia de Pastas/Listas (15-25 min)
Criar hierarquia que ESPELHA o processo: Space = area macro, Folder = fase, List = etapa. Folder vazio = folder orfao = remover. Numeracao sequencial seguindo ordem do processo.

### Step 2: Desenhar Status Workflow (10-20 min)
Para CADA lista: fluxo de status UNIDIRECIONAL (so avanca, nunca volta). Cada transicao com condicao de avanco. Se precisa "voltar", cria nova task com link pra original. Documentar transicoes BLOQUEADAS.
**VETO:** Status que pode voltar = workflow errado. [SOURCE: Pedro Valerio]

### Step 3: Criar Campos Customizados (10-20 min)
Para CADA lista: campo que controla qualidade = OBRIGATORIO. Campo desnecessario = REMOVER. Definir tipo, opcoes, default e validacao. Campo opcional que importa = campo que sera vazio.
**VETO:** Campo data-critical marcado como opcional = erro de design. [SOURCE: Pedro Valerio]

### Step 4: Definir Views por Executor (10-15 min)
Para CADA executor: view dedicada. Filtro por assignee, agrupamento por status, ordenacao por due date. Apenas campos relevantes para a funcao visiveis.
**VETO:** View que mostra tarefas de outro executor = view poluida. [SOURCE: Pedro Valerio]

### Step 5: Desenhar SLAs e Escalation Paths (10-20 min)
Para CADA etapa: SLA numerico (horas/dias, nunca "em breve"), warning (80%), breach action, escalation L1->L2->L3. Para CADA handoff: trigger automatico, SLA do handoff, zero gap entre etapas.

---

## Output

Documento `deliverables/ops/{slug}-system-architecture.md` contendo:
- **Hierarquia:** Space > Folder > List (espelhando processo)
- **Status flows:** fluxo por lista, transicoes permitidas, backward BLOQUEADO
- **Campos:** lista, campo, tipo, obrigatorio, validacao
- **Views:** executor, filtro, agrupamento, campos visiveis
- **SLAs:** etapa, SLA numerico, warning, breach, escalation
- **Handoffs:** de, para, trigger, SLA do handoff

---

## Quality Gate

- [ ] Hierarquia de folders espelha hierarquia do processo (ARC001)
- [ ] TODOS os status flows sao unidirecionais (ARC002)
- [ ] TODOS os campos data-critical sao obrigatorios (ARC003)
- [ ] CADA executor tem view dedicada exclusiva (ARC004)
- [ ] Templates tem instrucoes inline (ARC005)
- [ ] CADA etapa tem exatamente UM responsavel (ARC006)
- [ ] TODOS os SLAs sao numericos e mensuraveis (ARC007)
- [ ] TODOS os handoffs tem trigger definido (ARC008)
- [ ] Score >= 70% para handoff ao Automation Architect

---

**Task Status:** Ready for Production
