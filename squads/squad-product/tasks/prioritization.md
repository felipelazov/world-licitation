# prioritization

> Task da Melissa Perri (PM) — Priorizacao de Oportunidades

**Task ID:** prioritization
**Owner:** melissa-perri
**Squad:** squad-product
**Pattern:** PD-DI-004

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Backlog de oportunidades / features / requests |
| **Output** | Stack rank priorizado + justificativa por outcome |
| **Pre-conditions** | Oportunidades mapeadas + metricas disponiveis |
| **Trigger** | Antes de cada ciclo de desenvolvimento, ou quando backlog cresce demais |

---

## Overview

Priorizacao e onde o build trap comeca — quando priorizamos por quem grita mais alto, por opiniao do HiPPO (Highest Paid Person's Opinion), ou por lista de features de competidores. Perri prioriza por IMPACTO NO OUTCOME, usando dados de discovery e metricas reais.

---

## Action Items

### Step 1: Listar Candidatos
- Reunir todas as oportunidades/features/requests pendentes
- Fonte: opportunity mapping, feedback de sales, feedback de CS, request de stakeholders
- Padronizar formato: problema + outcome esperado + evidencia

### Step 2: Classificar por Impacto no Outcome
- Para cada item: qual outcome estrategico ele impacta?
- Se nao impacta nenhum outcome → questionar se deveria existir
- Estimar impacto: ALTO / MEDIO / BAIXO baseado em dados

### Step 3: Estimar Esforco e Confianca
- Esforco: P (pequeno) / M (medio) / G (grande) / GG (muito grande)
- Confianca na estimativa de impacto: ALTA (dados) / MEDIA (hipotese testada) / BAIXA (intuicao)
- Itens com baixa confianca → precisam de discovery antes de priorizar

### Step 4: Stack Rank
- Priorizar: Alto impacto + Baixo esforco + Alta confianca primeiro
- Itens com baixa confianca nao entram no "Now" — vao para discovery
- Maximo 3-5 items no "Now" — foco sobre amplitude

### Step 5: Comunicar e Justificar
- Cada item priorizado tem justificativa baseada em outcome
- Items despriorizados tem explicacao (nao "depois a gente ve")
- Publicar stack rank para transparencia

---

## Acceptance Criteria

1. Todos os items tem outcome associado
2. Priorizacao baseada em dados (nao opiniao ou politica)
3. Items com baixa confianca redirecionados para discovery
4. Stack rank tem maximo 5 items no "Now"
5. Justificativa documentada para top 5 e bottom 5

---

## Veto Conditions

- NAO priorizar por "quem pediu" — CEO pediu nao e criterio de priorizacao
- NAO usar apenas esforco como criterio — feature facil sem impacto e desperdicio
- NAO priorizar feature de competidor sem discovery — "eles tem" nao e validacao

---

## Output Example

```yaml
prioritization:
  data: "2026-02-25"
  criterio: "Impacto no outcome × Confianca / Esforco"
  stack_rank:
    - rank: 1
      item: "Setup guiado com IA"
      outcome: "Activation rate +20pp"
      impacto: "ALTO"
      esforco: "M"
      confianca: "ALTA (discovery validado)"
      justificativa: "Discovery com 10 usuarios validou. 80% completaram setup."

    - rank: 2
      item: "Hook loop para dashboard"
      outcome: "D30 retention +10pp"
      impacto: "ALTO"
      esforco: "M"
      confianca: "MEDIA (hipotese testada parcial)"
      justificativa: "Nir Eyal projetou hook model. Precisa A/B test."

    - rank: 3
      item: "Integracao com WhatsApp"
      outcome: "Engagement +15%"
      impacto: "MEDIO"
      esforco: "G"
      confianca: "BAIXA (request de 3 clientes)"
      justificativa: "Mover para discovery antes de priorizar."

  despriorizados:
    - item: "Dark mode"
      motivo: "Nenhum outcome estrategico. Nice-to-have."
    - item: "Relatorio PDF exportavel"
      motivo: "Pedido por 1 cliente enterprise. Nao e nosso publico (PME)."
```

---

## Handoff

- Items priorizados → roadmap (atualizar Now/Next/Later)
- Items de discovery → discovery task
- Items de retention → nir-eyal
