# /sync-organogram — Figma Organogram Sync

Sincroniza o organograma do Figma com os dados reais do projeto (project-state.yaml).

---

## Pre-requisitos

Antes de executar qualquer operacao:

1. **Figma Desktop** deve estar aberto com o arquivo do organograma
2. **Plugin companion** (Figma to Claude) deve estar rodando no Figma
3. O MCP **ClaudeTalkToFigma** deve estar habilitado (`claude mcp list` para verificar)

---

## Instrucoes por Operacao

O usuario vai chamar este comando com um argumento: `map`, `sync`, `pull` ou `status`.
Identifique o argumento pelo contexto da mensagem. Se nao especificado, pergunte.

**Direcoes do sync:**
- `sync` = Projeto → Figma (push: dados do projeto atualizam o Figma)
- `pull` = Figma → Projeto (pull: mudancas no Figma atualizam o project-state.yaml)

---

### Operacao: MAP (Mapeamento Inicial)

**Objetivo:** Escanear o Figma e mapear cada node do organograma a um campo do projeto.

**Passos:**

1. **Conectar ao Figma:**
   - Usar tool `get_document_info` para verificar conexao
   - Se falhar, instruir o usuario a abrir o plugin companion no Figma Desktop

2. **Escanear estrutura:**
   - Usar `get_document_structure` ou `scan_page_for_text_nodes` para obter todos os text nodes da pagina ativa
   - Listar os nodes encontrados com seus IDs e textos atuais

3. **Identificar nodes do organograma:**
   - Procurar por frames/grupos que correspondam a squads (nomes como "squad-advisor", "Advisor", etc.)
   - Para cada squad encontrado, identificar sub-nodes: nome, domain, chief, agents, status, count

4. **Confirmar com o usuario:**
   - Mostrar tabela de mapeamento proposto:
     ```
     Squad              | Node ID      | Texto Atual
     -------------------|-------------|-------------
     squad-advisor      | 42:123      | "Strategic Business Advisory"
     ...
     ```
   - Pedir confirmacao ou correcoes

5. **Salvar mapeamento:**
   - Ler o arquivo `figma-organogram-map.yaml` na raiz do projeto
   - Preencher os IDs encontrados em cada campo
   - Salvar `figma_file_key` e `channel_id` obtidos da conexao
   - Atualizar o arquivo com os mapeamentos confirmados

6. **Verificar:**
   - Mostrar resumo: "X squads mapeados de Y total"
   - Alertar se algum squad do project-state.yaml nao foi encontrado no Figma

---

### Operacao: SYNC (Sincronizacao de Dados)

**Objetivo:** Atualizar os textos no Figma com os dados atuais do projeto.

**Passos:**

1. **Carregar dados:**
   - Executar `node scripts/sync-organogram.js --pretty --diff` via Bash
   - Isso retorna o JSON com a arvore completa + diff report

2. **Carregar mapeamento:**
   - Ler `figma-organogram-map.yaml`
   - Verificar que `figma_file_key` e `channel_id` estao preenchidos
   - Se nao, instruir usuario a rodar `/sync-organogram map` primeiro

3. **Verificar diff:**
   - Se `diff.sync_ready` == false, alertar sobre squads nao mapeados ou mapeamentos obsoletos
   - Perguntar se quer continuar mesmo assim

4. **Conectar ao Figma:**
   - Usar `get_document_info` para confirmar conexao

5. **Preparar updates:**
   - Para cada squad no mapeamento que tenha IDs preenchidos:
     - `name_node` ← squad display name (formato titulo)
     - `domain_node` ← squad.domain
     - `chief_node` ← squad.chief
     - `agents_node` ← lista de agents separada por "\n" ou ", "
     - `agent_count_node` ← numero total de agents (chief + agents)
     - `status_node` ← fase.status se houver fase vinculada

   - Para o root:
     - `title_node` ← projeto.nome ou "World OS"
     - `client_node` ← projeto.cliente
     - `progress_node` ← progresso.overall + "%"
     - `phase_node` ← progresso.current_phase

6. **Executar updates:**
   - Usar `set_multiple_text_contents` do MCP para batch update (mais eficiente)
   - Formato: array de `{nodeId, text}` para cada node mapeado
   - Se `set_multiple_text_contents` nao estiver disponivel, usar `set_text_content` individual para cada node

7. **Confirmar:**
   - Mostrar resumo:
     ```
     Sync completo:
     - Squads atualizados: X
     - Nodes modificados: Y
     - Erros: Z (se houver)
     - Timestamp: YYYY-MM-DD HH:MM
     ```

---

### Operacao: STATUS (Verificar Estado)

**Objetivo:** Mostrar o estado atual do mapeamento e diferencas pendentes.

**Passos:**

1. **Carregar dados:**
   - Executar `node scripts/sync-organogram.js --pretty --diff` via Bash

2. **Carregar mapeamento:**
   - Ler `figma-organogram-map.yaml`

3. **Mostrar dashboard:**
   ```
   ─── ORGANOGRAM SYNC STATUS ──────────────────────
   Figma File: {figma_file_key || "NAO CONFIGURADO"}
   Channel:    {channel_id || "NAO CONECTADO"}

   Squads no projeto: {total}
   Squads mapeados:   {mapped} / {total}
   Nao mapeados:      {lista ou "nenhum"}
   Mapeamentos obsoletos: {lista ou "nenhum"}

   Progresso geral: {overall}%
   Fase atual:      {current_phase}

   Status: {PRONTO PARA SYNC | PRECISA MAPEAR | PARCIALMENTE MAPEADO}
   ─────────────────────────────────────────────────
   ```

4. **Sugerir acao:**
   - Se nao mapeado: "Execute `/sync-organogram map` para configurar"
   - Se parcialmente mapeado: "X squads sem mapeamento. Execute map para completar"
   - Se pronto: "Execute `/sync-organogram sync` para atualizar o Figma"

---

### Operacao: PULL (Figma → Projeto)

**Objetivo:** Ler mudancas feitas no Figma e aplicar no project-state.yaml.

**Passos:**

1. **Verificar pre-requisitos:**
   - `figma-organogram-map.yaml` deve ter IDs preenchidos
   - WebSocket server rodando (porta 3055)
   - Plugin ativo no Figma

2. **Executar diff (modo preview):**
   - Rodar: `node scripts/figma-pull-organogram.js <channel_id>`
   - O script le TODOS os text nodes mapeados no Figma
   - Compara com os dados atuais do project-state.yaml
   - Mostra um diff detalhado com todas as diferencas

3. **Mostrar diff para o usuario:**
   ```
   DIFF: Figma → Projeto

   ~ squad-advisor.domain
     local:  "Strategic Business Advisory"
     figma:  "Strategic Business & Innovation Advisory"

   + squad-marketing.agents
     adicionados: [novo-agente]

   - squad-ops.agents
     removidos: [agente-removido]

   ~ squad-design fase "identidade"
     local:  "pendente"
     figma:  "em_andamento"

   Total: 4 mudanca(s) detectada(s)
   ```

4. **Pedir confirmacao:**
   - Perguntar ao usuario: "Quer aplicar essas X mudancas no project-state.yaml?"
   - Se SIM: rodar `node scripts/figma-pull-organogram.js <channel_id> --apply`
   - Se NAO: nao fazer nada

5. **O que o pull detecta:**

   | Mudanca no Figma | Acao no Projeto |
   |-------------------|-----------------|
   | Texto do domain alterado | Atualiza `squads.{id}.domain` |
   | Texto do chief alterado | Atualiza `squads.{id}.chief` |
   | Agente adicionado na lista | Adiciona em `squads.{id}.agents[]` |
   | Agente removido da lista | Remove de `squads.{id}.agents[]` |
   | Status da fase alterado | Atualiza `progresso.fases[].status` |
   | Squad novo no mapeamento | Cria novo squad em `squads` |

6. **Confirmar resultado:**
   ```
   Pull completo:
   - Mudancas aplicadas: X
   - project-state.yaml atualizado
   ```

**Importante:** O pull NUNCA apaga squads automaticamente. Ele so adiciona, atualiza ou remove agentes. Deletar um squad inteiro requer acao manual.

---

## Tratamento de Erros

| Erro | Acao |
|------|------|
| MCP nao conectado | Instruir: "Abra o Figma Desktop, importe o plugin companion, e inicie o plugin" |
| Plugin nao rodando | Instruir: "No Figma, va em Plugins > Development > Import from manifest" |
| Node ID invalido | Alertar e sugerir re-mapeamento com `/sync-organogram map` |
| project-state.yaml vazio | Informar que nao ha dados para sincronizar |
| figma-organogram-map.yaml sem IDs | Instruir a rodar map primeiro |

---

## Notas Tecnicas

- O script `scripts/sync-organogram.js` e o data source — ele le o YAML e gera JSON
- O MCP ClaudeTalkToFigma se comunica via WebSocket na porta 3055
- O plugin companion no Figma precisa estar ativo para receber comandos
- Cada node no Figma tem um ID unico que persiste entre sessoes
- Use `set_multiple_text_contents` para batch updates (menos chamadas MCP)
