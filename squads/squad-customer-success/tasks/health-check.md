# Task: Run Health Check

**Task ID:** `cs-rt-health-check`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Run Health Check |
| **status** | `pending` |
| **responsible_executor** | joey-coleman (CS / Retencao) |
| **execution_type** | `Hybrid` |
| **input** | Base de clientes ativos |
| **output** | Health score atualizado + riscos identificados |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 2-4h

---

## Overview

Avaliacao periodica da saude de todos os clientes ativos. O health score combina metricas de uso, satisfacao, suporte e engajamento para classificar cada cliente em zonas de risco. Clientes saudaveis sao candidatos a upsell. Clientes em risco precisam de acao imediata. Nenhum cliente deve ser surpresa.

---

## Input

- **Base de clientes ativos** (CRM data)
  - Required: Yes
  - Source: CRM
  - Descricao: Lista de todos os clientes ativos com dados de contrato
- **Metricas de uso** (analytics)
  - Required: Yes
  - Source: Plataforma/produto
  - Descricao: Frequencia de login, funcionalidades usadas, tempo de uso
- **Dados de suporte** (support data)
  - Required: Yes
  - Source: Task `report` / sistema de suporte
  - Descricao: Tickets abertos, CSAT, tempo de resolucao
- **Dados de engajamento** (CRM data)
  - Required: Yes
  - Source: CRM / email / WhatsApp
  - Descricao: Ultimo contato, respostas a emails, participacao em eventos

---

## Output

- **Health score atualizado** (document)
  - Destination: CRM + template `health-score-report.md`
  - Format: Score por cliente + classificacao por zona
- **Lista de riscos** (document)
  - Destination: CS Head (lincoln-murphy)
  - Format: Clientes em risco com motivo e acao recomendada
- **Oportunidades de upsell** (document)
  - Destination: Task `upsell-detection`
  - Format: Clientes saudaveis com sinais de expansao

---

## Precondicoes

- [ ] Dados de uso atualizados (maximo 7 dias defasados)
- [ ] Dados de suporte atualizados (task `report` semanal)
- [ ] Acesso ao CRM com dados de contrato e engajamento

---

## Action Items

### Step 1: Coletar Metricas por Conta

Reunir todos os dados necessarios para cada cliente.

- [ ] Extrair metricas de uso da plataforma por cliente
- [ ] Extrair dados de suporte por cliente (tickets, CSAT)
- [ ] Extrair dados de engajamento (ultimo contato, respostas)
- [ ] Extrair dados contratuais (plano, data de renovacao, valor)
- [ ] Consolidar tudo em uma unica visao por cliente

### Step 2: Calcular Health Score

Aplicar formula padrao para cada cliente.

**Formula do Health Score (0-100):**

| Dimensao | Peso | Metricas | Score |
|----------|------|----------|-------|
| **Uso do produto** | 30% | Frequencia de login, funcionalidades usadas, tempo ativo | 0-100 |
| **Satisfacao** | 25% | CSAT medio, NPS, reclamacoes | 0-100 |
| **Suporte** | 20% | Tickets/mes, tempo resolucao, tickets reabertos | 0-100 |
| **Engajamento** | 15% | Ultimo contato, respostas, participacao em eventos | 0-100 |
| **Contrato** | 10% | Tempo de vida, upgrades, pagamentos em dia | 0-100 |

**Health Score = (Uso x 0.30) + (Satisfacao x 0.25) + (Suporte x 0.20) + (Engajamento x 0.15) + (Contrato x 0.10)**

- [ ] Calcular score de cada dimensao por cliente
- [ ] Calcular health score final ponderado
- [ ] Classificar cliente por zona

### Step 3: Classificar por Zona de Risco

Categorizar cada cliente com base no health score.

| Zona | Score | Cor | Acao |
|------|-------|-----|------|
| **Saudavel** | 80-100 | Verde | Manter, buscar upsell |
| **Atencao** | 60-79 | Amarelo | Monitorar, contato proativo |
| **Risco** | 40-59 | Laranja | Acao de recuperacao imediata |
| **Critico** | 0-39 | Vermelho | Escalacao para CS Head, plano de salvacao |

- [ ] Atribuir zona a cada cliente
- [ ] Identificar mudancas de zona desde ultima avaliacao (quem subiu, quem caiu)
- [ ] Priorizar acoes para clientes em zona Laranja e Vermelha

### Step 4: Documentar e Distribuir

Gerar relatorio e acionar stakeholders.

- [ ] Preencher template `health-score-report.md` com dados atualizados
- [ ] Listar clientes em risco com motivo e acao recomendada
- [ ] Listar clientes saudaveis com sinais de expansao (para task `upsell-detection`)
- [ ] Atualizar health score no CRM
- [ ] Enviar relatorio para CS Head (lincoln-murphy)
- [ ] Disparar alertas para clientes Criticos

---

## Acceptance Criteria

- [ ] **AC-01:** Health score calculado para 100% dos clientes ativos
- [ ] **AC-02:** Formula de health score aplicada consistentemente (5 dimensoes ponderadas)
- [ ] **AC-03:** Clientes classificados por zona (Verde/Amarelo/Laranja/Vermelho)
- [ ] **AC-04:** Clientes em risco (Laranja/Vermelho) com motivo e acao recomendada
- [ ] **AC-05:** Relatorio entregue ao CS Head com visao agregada e individual

---

## Veto Conditions

- NAO gerar health score sem dados de uso E satisfacao (minimo 2 dimensoes com dados reais)
- NAO classificar cliente sem calcular score (nao usar "achismo")
- NAO ignorar mudancas negativas de zona (queda de Verde para Amarelo precisa de atencao)
- NAO reportar apenas agregado — precisa ter visao individual por cliente

---

## Output Example

```yaml
health_check:
  data: "2026-02-24"
  total_clientes: 28
  distribuicao_zona:
    saudavel: 15
    atencao: 8
    risco: 4
    critico: 1
  health_score_medio: 72
  mudancas_desde_ultima:
    melhoraram: 3
    pioraram: 2
    estavel: 23
  clientes_risco:
    - cliente: "Startup XYZ"
      score: 45
      zona: "Risco"
      motivos:
        - "Login caiu 60% no ultimo mes"
        - "CSAT 2.5 nos ultimos 3 tickets"
      acao: "Contato proativo imediato (task churn-prevention)"
    - cliente: "Digital Corp"
      score: 35
      zona: "Critico"
      motivos:
        - "Zero logins em 15 dias"
        - "Pagamento atrasado"
      acao: "Escalacao imediata para CS Head"
  oportunidades_upsell:
    - cliente: "Tech Solutions"
      score: 92
      sinais: ["Uso maximo de funcionalidades", "Pediu feature do plano Enterprise"]
  status: "health_check_completo"
```

---

## Tools

| Tool | Uso |
|------|-----|
| CRM | Dados de clientes, contrato e engajamento |
| Planilha health | Calculo e historico de health scores |
| Plataforma/produto | Metricas de uso |
| Sistema de suporte | Dados de tickets e CSAT |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task (saudaveis)** | `upsell-detection` |
| **Next Task (risco)** | `churn-prevention` |
| **Next Task (rotina)** | `engagement` |
| **Trigger** | Health check completo |
| **Executor** | joey-coleman |

### Handoff Checklist

- [ ] Health scores atualizados no CRM
- [ ] Relatorio gerado e distribuido
- [ ] Clientes em risco sinalizados com acao
- [ ] Oportunidades de upsell identificadas

---

## Error Handling

### Dados de uso indisponiveis

- **Trigger:** Plataforma nao fornece dados de uso no periodo
- **Detection:** Metricas de uso vazias ou desatualizadas
- **Recovery:** Gerar health score parcial (sem dimensao uso) com nota. Buscar dados alternativos.
- **Prevention:** Automatizar extracao de metricas de uso semanalmente

### Health score inconsistente

- **Trigger:** Score nao reflete realidade conhecida do cliente
- **Detection:** CS percebe que classificacao nao condiz com interacoes recentes
- **Recovery:** Revisar metricas, ajustar pesos se necessario, adicionar nota qualitativa.
- **Prevention:** Revisar formula de health score trimestralmente

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
