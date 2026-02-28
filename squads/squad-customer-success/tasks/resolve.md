# Task: Resolve Ticket

**Task ID:** `cs-sp-resolve`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Resolve Ticket |
| **status** | `pending` |
| **responsible_executor** | shep-hyken (Suporte) |
| **execution_type** | `Hybrid` |
| **input** | Ticket N1 classificado |
| **output** | Solucao aplicada + documentada |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 15-45min

---

## Overview

Resolucao direta de tickets N1 (duvidas simples e problemas conhecidos). A resolucao deve ser rapida, precisa e empática. Cada resolucao deve ser documentada para alimentar a base de conhecimento e reduzir tickets futuros.

---

## Input

- **Ticket classificado N1** (support ticket)
  - Required: Yes
  - Source: Task `ticket-triage`
  - Descricao: Ticket com nivel, prioridade e contexto
- **Base de conhecimento** (KB)
  - Required: Yes
  - Source: Notion/KB interna
  - Descricao: Artigos de solucao, FAQ, tutoriais
- **Historico do cliente** (CRM)
  - Required: Yes
  - Source: CRM
  - Descricao: Interacoes anteriores, configuracao, plano

---

## Output

- **Solucao aplicada** (support ticket)
  - Destination: Cliente + sistema de suporte
  - Format: Resposta com solucao detalhada
- **Resolucao documentada** (KB entry)
  - Destination: Base de conhecimento
  - Format: Artigo de solucao (novo ou atualizado)
- **Satisfacao verificada** (feedback)
  - Destination: CRM
  - Format: Confirmacao do cliente + CSAT

---

## Precondicoes

- [ ] Ticket classificado como N1 (task `ticket-triage` completa)
- [ ] Acesso a base de conhecimento
- [ ] Historico do cliente disponivel no CRM

---

## Action Items

### Step 1: Buscar Solucao na Base de Conhecimento

Sempre buscar primeiro. Nunca inventar.

- [ ] Pesquisar na KB por palavras-chave do ticket
- [ ] Verificar se existe artigo de solucao para o problema
- [ ] Verificar se solucao se aplica ao plano/versao do cliente
- [ ] Se solucao encontrada: adaptar linguagem para o contexto do cliente
- [ ] Se solucao NAO encontrada: investigar antes de responder

**Regra de ouro:** Se nao sabe a resposta, diga que vai verificar. NUNCA invente.

### Step 2: Aplicar Solucao

Resolver o problema do cliente de forma clara e empática.

- [ ] Escrever resposta com tom empático e profissional
- [ ] Explicar a solucao passo a passo (nao assumir conhecimento tecnico)
- [ ] Incluir screenshots ou links de apoio quando possivel
- [ ] Se a solucao requer acao do cliente, detalhar cada passo
- [ ] Se a solucao requer acao interna, executar e informar o cliente

**Estrutura da resposta:**
```
1. Reconhecer o problema (empatia)
2. Explicar a causa (se relevante)
3. Apresentar a solucao (passo a passo)
4. Confirmar que esta disponivel para duvidas
```

### Step 3: Documentar Resolucao

Alimentar a KB para evitar trabalho repetido.

- [ ] Se artigo de KB existe: verificar se precisa atualizacao
- [ ] Se artigo NAO existe: criar novo artigo de solucao
- [ ] Registrar resolucao no ticket (como foi resolvido)
- [ ] Adicionar tags ao ticket para analise de padroes
- [ ] Calcular tempo de resolucao

### Step 4: Verificar Satisfacao

Confirmar que o problema foi realmente resolvido.

- [ ] Perguntar ao cliente se a solucao resolveu o problema
- [ ] Se sim: fechar ticket + coletar CSAT (1-5 estrelas)
- [ ] Se nao: reabrir investigacao (pode reclassificar para N2)
- [ ] Agradecer ao cliente pela paciencia
- [ ] Registrar CSAT no CRM

---

## Acceptance Criteria

- [ ] **AC-01:** Solucao aplicada dentro do SLA (N1 = 2h)
- [ ] **AC-02:** Resposta segue estrutura definida (empatia + causa + solucao + disponibilidade)
- [ ] **AC-03:** Resolucao documentada na KB (artigo novo ou atualizado)
- [ ] **AC-04:** Cliente confirmou que problema foi resolvido
- [ ] **AC-05:** CSAT coletado e registrado (target >= 4/5)

---

## Veto Conditions

- NAO inventar solucao que nao esta validada
- NAO prometer resultado sem certeza de que funciona
- NAO fechar ticket sem confirmacao do cliente
- NAO usar linguagem tecnica sem explicacao
- NAO copiar/colar resposta generica sem personalizar

---

## Output Example

```yaml
resolution_record:
  ticket_id: "TK-2026-0340"
  cliente: "Maria Santos"
  empresa: "Digital First Ltda"
  problema: "Nao consigo exportar relatorio em PDF"
  classificacao: "N1"
  resolucao:
    fonte: "KB-ART-045 (Exportacao de relatorios)"
    solucao_aplicada: "Orientacao para usar navegador Chrome (Firefox tem bug conhecido)"
    tempo_resolucao: "12min"
    dentro_sla: true
  kb_atualizado: true
  kb_artigo: "KB-ART-045 (adicionado nota sobre Firefox)"
  satisfacao:
    cliente_confirmou: true
    csat: 5
    comentario: "Rapido e direto. Obrigada!"
  status: "resolvido"
```

---

## Tools

| Tool | Uso |
|------|-----|
| Intercom | Comunicacao com cliente e gestao do ticket |
| Notion (KB) | Busca e criacao de artigos de solucao |
| CRM | Registro de resolucao e CSAT |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task (se nao resolvido)** | `escalate` (reclassificar para N2) |
| **Next Task (se resolvido)** | Ticket fechado, sem handoff |
| **Trigger** | Cliente confirma resolucao ou problema persiste |
| **Executor** | shep-hyken |

### Handoff Checklist (se escalar)

- [ ] Tentativa de resolucao N1 documentada
- [ ] Motivo da reclassificacao explicado
- [ ] Contexto atualizado no ticket

---

## Error Handling

### Solucao nao encontrada na KB

- **Trigger:** Problema nao documentado e nao obvio
- **Detection:** Busca na KB retorna zero resultados relevantes
- **Recovery:** Investigar diretamente. Se nao resolver em 30min, reclassificar para N2 e escalar.
- **Prevention:** Manter KB atualizada. Task `report` identifica gaps na KB.

### Cliente insatisfeito com a solucao

- **Trigger:** CSAT <= 2 ou cliente expressa frustração
- **Detection:** Feedback negativo ou tom de mensagem
- **Recovery:** Pedir desculpas, investigar mais a fundo, oferecer call. Se necessario, escalar para CS Head.
- **Prevention:** Solucoes claras, empatia genuina, follow-up proativo

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
