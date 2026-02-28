# Task: Generate Support Report

**Task ID:** `cs-sp-report`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Generate Support Report |
| **status** | `pending` |
| **responsible_executor** | shep-hyken (Suporte) |
| **execution_type** | `Hybrid` |
| **input** | Metricas da semana |
| **output** | Relatorios (SLA, satisfacao) + problemas recorrentes |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 1-2h

---

## Overview

Compilacao semanal das metricas de suporte para gerar visibilidade sobre performance, satisfacao e padroes de problemas. O relatorio alimenta decisoes de produto (bugs recorrentes), operacoes (processos ineficientes) e CS (clientes insatisfeitos). E o radar do suporte.

---

## Input

- **Tickets da semana** (support data)
  - Required: Yes
  - Source: Sistema de suporte (Intercom/Zendesk/Freshdesk)
  - Descricao: Todos os tickets abertos, resolvidos e pendentes no periodo
- **CSAT coletado** (feedback data)
  - Required: Yes
  - Source: Sistema de suporte
  - Descricao: Avaliacoes de satisfacao do periodo
- **SLA tracking** (metrics)
  - Required: Yes
  - Source: Sistema de suporte
  - Descricao: Tempos de resposta e resolucao vs SLA definido

---

## Output

- **Relatorio semanal de suporte** (document)
  - Destination: CS Head (lincoln-murphy) + stakeholders
  - Format: Template `weekly-support-report.md` preenchido
- **Lista de problemas recorrentes** (document)
  - Destination: Time de Produto (sinapse cross-squad)
  - Format: Problemas com frequencia, impacto e sugestao de resolucao
- **Alertas de clientes insatisfeitos** (notification)
  - Destination: CS/Retencao (joey-coleman)
  - Format: Lista de clientes com CSAT <= 3

---

## Precondicoes

- [ ] Pelo menos 5 dias uteis de dados acumulados
- [ ] Acesso ao sistema de suporte com metricas
- [ ] CSAT coletado em pelo menos 50% dos tickets resolvidos

---

## Action Items

### Step 1: Compilar Metricas

Extrair numeros brutos do periodo.

- [ ] Total de tickets abertos no periodo
- [ ] Total de tickets resolvidos no periodo
- [ ] Total de tickets pendentes (backlog)
- [ ] Distribuicao por nivel (N1, N2, N3)
- [ ] Distribuicao por categoria (produto, integracao, duvida, billing)
- [ ] Tempo medio de primeira resposta
- [ ] Tempo medio de resolucao
- [ ] CSAT medio do periodo
- [ ] Tickets por cliente (identificar top demandantes)

### Step 2: Calcular Performance de SLA

Comparar metricas reais com os targets definidos.

| Metrica | Target SLA | Como Medir |
|---------|-----------|------------|
| Primeira resposta (N1) | <= 2h | Tempo entre abertura e primeira resposta |
| Primeira resposta (N2) | <= 4h | Tempo entre abertura e primeira resposta |
| Primeira resposta (N3) | <= 30min | Tempo entre abertura e primeira resposta |
| Resolucao (N1) | <= 8h | Tempo entre abertura e resolucao |
| Resolucao (N2) | <= 24h | Tempo entre abertura e resolucao |
| Resolucao (N3) | <= 4h | Tempo entre abertura e resolucao |
| CSAT | >= 4.0/5.0 | Media de avaliacoes do periodo |

- [ ] Calcular % de compliance por metrica de SLA
- [ ] Identificar tickets que estouraram SLA e motivos
- [ ] Calcular tendencia vs semana anterior (melhorando ou piorando)

### Step 3: Identificar Padroes

Encontrar problemas recorrentes e oportunidades de melhoria.

- [ ] Agrupar tickets por categoria/tag
- [ ] Identificar top 5 problemas mais reportados
- [ ] Para cada problema recorrente: calcular frequencia, impacto e esforco de resolucao
- [ ] Identificar gaps na base de conhecimento (problemas sem artigo KB)
- [ ] Identificar clientes com mais tickets (possivel insatisfacao)
- [ ] Identificar clientes com CSAT <= 3 (alerta para CS/Retencao)

**Formato para problemas recorrentes → Produto:**
```
PROBLEMA: [descricao]
FREQUENCIA: [X tickets/semana]
IMPACTO: [o que o cliente nao consegue fazer]
CLIENTES AFETADOS: [quantidade]
SUGESTAO: [como resolver na raiz]
```

### Step 4: Gerar Relatorio e Distribuir

Compilar tudo e enviar para stakeholders.

- [ ] Preencher template `weekly-support-report.md`
- [ ] Incluir graficos/tabelas quando possivel
- [ ] Destacar wins da semana (resolucoes excepcionais, CSAT alto)
- [ ] Destacar riscos (SLA estourado, clientes insatisfeitos, tendencias negativas)
- [ ] Enviar para CS Head (lincoln-murphy)
- [ ] Enviar problemas recorrentes para Produto (sinapse)
- [ ] Enviar alertas de clientes insatisfeitos para CS (joey-coleman)

---

## Acceptance Criteria

- [ ] **AC-01:** Relatorio gerado semanalmente (toda segunda-feira ate 12h)
- [ ] **AC-02:** Todas as metricas de SLA calculadas com % de compliance
- [ ] **AC-03:** Top 5 problemas recorrentes identificados com frequencia e impacto
- [ ] **AC-04:** Clientes com CSAT <= 3 sinalizados para CS/Retencao
- [ ] **AC-05:** Relatorio distribuido para CS Head, Produto e CS/Retencao

---

## Veto Conditions

- NAO reportar sem dados de pelo menos 5 dias uteis
- NAO omitir metricas ruins (transparencia total)
- NAO apresentar numeros sem contexto (sempre comparar com target e tendencia)
- NAO gerar relatorio apenas com numeros — incluir analise e recomendacoes

---

## Output Example

```yaml
weekly_report:
  periodo: "2026-02-17 a 2026-02-21"
  metricas:
    tickets_abertos: 47
    tickets_resolvidos: 43
    tickets_pendentes: 12
    distribuicao_nivel:
      n1: 32
      n2: 12
      n3: 3
    tempo_medio_primeira_resposta: "1.2h"
    tempo_medio_resolucao: "5.4h"
    csat_medio: 4.3
  sla_compliance:
    primeira_resposta_n1: "94%"
    primeira_resposta_n2: "88%"
    primeira_resposta_n3: "100%"
    resolucao_n1: "91%"
    resolucao_n2: "83%"
    resolucao_n3: "100%"
  problemas_recorrentes:
    - problema: "Exportacao PDF falha no Firefox"
      frequencia: "8 tickets/semana"
      impacto: "Cliente nao consegue gerar relatorios"
      clientes_afetados: 6
      sugestao: "Fix no frontend para suporte Firefox"
    - problema: "Integracao com Zapier desconecta"
      frequencia: "5 tickets/semana"
      impacto: "Automacoes param de funcionar"
      clientes_afetados: 4
      sugestao: "Revisar token de autenticacao"
  alertas_cs:
    clientes_insatisfeitos:
      - cliente: "Digital First Ltda"
        csat: 2
        tickets_semana: 4
        motivo: "Mesmo problema 3 vezes sem resolucao definitiva"
  status: "relatorio_gerado"
```

---

## Tools

| Tool | Uso |
|------|-----|
| Sheets | Compilacao e calculo de metricas |
| Sistema de suporte | Extracao de dados brutos |
| CRM | Cruzamento com dados de clientes |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | Sinapses cross-squad |
| **Trigger** | Relatorio finalizado |
| **Destinations** | CS Head, Produto (problemas recorrentes), CS/Retencao (alertas) |

### Handoff Checklist

- [ ] Relatorio completo e revisado
- [ ] Problemas recorrentes formatados para Produto
- [ ] Alertas de clientes sinalizados para CS/Retencao
- [ ] Relatorio distribuido para todos stakeholders

---

## Error Handling

### Dados incompletos

- **Trigger:** Sistema de suporte sem dados de alguns dias
- **Detection:** Lacunas nos dados ao compilar
- **Recovery:** Reportar com dados disponiveis + nota sobre incompletude. Investigar causa da lacuna.
- **Prevention:** Verificar integridade dos dados no inicio da semana

### CSAT muito baixo

- **Trigger:** CSAT medio < 3.5 na semana
- **Detection:** Calculo de metricas revela tendencia negativa
- **Recovery:** Alerta urgente para CS Head com analise de causas raiz. Plano de acao imediato.
- **Prevention:** Monitoramento diario de CSAT, nao apenas semanal

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
