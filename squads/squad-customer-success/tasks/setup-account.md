# Task: Setup Account

**Task ID:** `cs-on-setup-account`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Setup Account |
| **status** | `pending` |
| **responsible_executor** | donna-weber (Onboarding Specialist) |
| **execution_type** | `Hybrid` |
| **input** | Cliente recebeu welcome |
| **output** | Configuracao feita + materiais enviados |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 1-2h

---

## Overview

Configuracao completa da conta do cliente na plataforma/servico. Inclui call de setup guiada, configuracao tecnica, envio de materiais de apoio e verificacao de acessos. O objetivo e que o cliente saia da call com tudo funcionando e sabendo usar o basico.

---

## Input

- **Registro de onboarding** (CRM entry)
  - Required: Yes
  - Source: Task `welcome-client`
  - Descricao: Dados do cliente, plano, proximos passos definidos
- **Call de setup agendada** (calendar event)
  - Required: Yes
  - Source: Task `welcome-client`
  - Descricao: Data, horario e link da call confirmados
- **Materiais de apoio** (documents)
  - Required: Yes
  - Source: Templates do squad
  - Descricao: Guias, tutoriais, FAQ, videos Loom

---

## Output

- **Conta configurada** (system)
  - Destination: Plataforma/servico
  - Format: Conta ativa com configuracoes aplicadas
- **Materiais de apoio enviados** (documents)
  - Destination: Cliente (email/Notion)
  - Format: Links para guias, videos Loom, FAQ
- **Checklist de setup completo** (document)
  - Destination: CRM
  - Format: Registro de tudo que foi configurado
- **Gravacao da call** (video)
  - Destination: Pasta do cliente
  - Format: Link Zoom/Loom

---

## Precondicoes

- [ ] Welcome completo (task `welcome-client` finalizada)
- [ ] Call de setup agendada e confirmada pelo cliente
- [ ] Materiais de apoio preparados e atualizados
- [ ] Acessos de admin/configuracao disponiveis

---

## Action Items

### Step 1: Preparar Call de Setup

Antes da call, preparar tudo que sera necessario.

- [ ] Revisar dados do cliente e plano contratado
- [ ] Preparar ambiente de configuracao (credenciais, acessos)
- [ ] Separar materiais de apoio relevantes para o plano do cliente
- [ ] Preparar roteiro da call (agenda + tempo por topico)
- [ ] Testar link da call (Zoom/Google Meet)

### Step 2: Conduzir Call de Setup

Call guiada onde o cliente configura a conta com acompanhamento.

- [ ] Iniciar gravacao da call
- [ ] Confirmar agenda e tempo disponivel do cliente
- [ ] Guiar configuracao passo a passo (screen share)
- [ ] Permitir que o cliente faca as acoes (nao fazer por ele)
- [ ] Responder duvidas em tempo real
- [ ] Verificar que cada etapa esta funcionando antes de avancar

### Step 3: Enviar Materiais de Apoio

Apos a call, enviar tudo que o cliente precisa para usar sozinho.

- [ ] Enviar gravacao da call
- [ ] Enviar guia de uso rapido (Quick Start)
- [ ] Enviar FAQ com duvidas mais comuns
- [ ] Enviar video Loom complementar (se aplicavel)
- [ ] Enviar contatos de suporte para duvidas

### Step 4: Verificar Acesso e Funcionalidade

Garantir que tudo esta funcionando corretamente.

- [ ] Cliente consegue fazer login
- [ ] Funcionalidades principais estao acessiveis
- [ ] Configuracoes especificas do plano estao aplicadas
- [ ] Cliente sabe onde buscar ajuda
- [ ] Definir proximo marco: primeira vitoria (first value)

---

## Acceptance Criteria

- [ ] **AC-01:** Call de setup realizada com gravacao disponivel
- [ ] **AC-02:** Cliente consegue acessar e usar funcionalidades basicas sozinho
- [ ] **AC-03:** Materiais de apoio enviados (guia, FAQ, videos)
- [ ] **AC-04:** Checklist de configuracao 100% completo no CRM
- [ ] **AC-05:** Proximo passo definido: primeira vitoria com data estimada

---

## Veto Conditions

- NAO fazer setup sem welcome completo (task `welcome-client` deve estar finalizada)
- NAO configurar conta sem a presenca/participacao do cliente
- NAO avançar para proximo topico sem verificar que o anterior esta funcionando
- NAO encerrar call sem confirmar que o cliente sabe usar o basico

---

## Output Example

```yaml
setup_record:
  cliente: "Joao Silva"
  empresa: "Tech Solutions Ltda"
  data_setup: "2026-02-26"
  call:
    realizada: true
    duracao: "45min"
    gravacao_url: "https://zoom.us/rec/abc123"
    participantes: ["Joao Silva", "Donna Weber"]
  configuracao:
    conta_ativa: true
    funcionalidades_configuradas:
      - "Dashboard principal"
      - "Integracoes basicas"
      - "Notificacoes"
    acesso_verificado: true
  materiais_enviados:
    - "Guia de Uso Rapido v2.0"
    - "FAQ - Perguntas Frequentes"
    - "Video: Como usar o dashboard (Loom)"
    - "Gravacao da call de setup"
  status: "setup_completo"
  proximo_passo: "first-value"
  data_estimada_first_value: "2026-03-03"
```

---

## Tools

| Tool | Uso |
|------|-----|
| Zoom | Call de setup com screen share |
| Loom | Videos tutoriais complementares |
| Notion | Materiais de apoio e documentacao |
| CRM | Registro de configuracao e status |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `first-value` |
| **Trigger** | Setup completo + cliente com acesso verificado |
| **Executor** | donna-weber |

### Handoff Checklist

- [ ] Conta configurada e funcionando
- [ ] Cliente confirmou que consegue usar sozinho
- [ ] Materiais de apoio recebidos
- [ ] Meta de primeira vitoria definida com data

---

## Error Handling

### Cliente nao comparece a call

- **Trigger:** No-show na call agendada
- **Detection:** Cliente nao entra na call em 10min
- **Recovery:** Enviar WhatsApp. Reagendar em ate 48h. Se 2 no-shows, escalar para CS Head.
- **Prevention:** Enviar lembrete 24h e 1h antes da call

### Problemas tecnicos durante setup

- **Trigger:** Configuracao falha durante a call
- **Detection:** Funcionalidade nao funciona como esperado
- **Recovery:** Documentar problema, abrir ticket N2, reagendar continuacao do setup
- **Prevention:** Testar ambiente antes da call

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
