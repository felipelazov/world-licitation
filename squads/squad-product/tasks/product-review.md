# product-review

> Task do Marty Cagan (Chief) — Sessao de Review de Produto

**Task ID:** product-review
**Owner:** marty-cagan
**Squad:** squad-product
**Pattern:** PD-VS-001

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Estado atual do produto / metricas / feedback dos squads |
| **Output** | Review completo + decisoes + proximos passos documentados |
| **Pre-conditions** | Produto em operacao ou em desenvolvimento com metricas disponiveis |
| **Trigger** | Periodico (semanal/quinzenal) ou sob demanda quando decisao critica e necessaria |

---

## Overview

O Product Review e a sessao mais importante do squad-product. Conduzida pelo Marty Cagan (Chief), ela reune as perspectivas de todos os especialistas para avaliar o estado do produto, tomar decisoes estrategicas, e definir proximos passos. Segue o modelo de Product Review do SVPG: focado em outcomes, nao outputs.

---

## Action Items

### Step 1: Coletar Estado Atual
- Reunir metricas de produto (engagement, retention, conversion, NPS)
- Coletar feedback de squads relacionados (sales, CS, marketing)
- Identificar decisoes pendentes que precisam de resolucao
- Mapear riscos e blockers atuais

### Step 2: Avaliar por Dimensao
- **Product/Market Fit:** O produto resolve o problema certo para o publico certo?
- **Discovery Health:** Estamos validando antes de construir?
- **Delivery Health:** Estamos entregando com qualidade e velocidade?
- **Positioning Clarity:** O mercado entende o que fazemos?
- **Retention Strength:** Usuarios voltam por habito ou por necessidade?

### Step 3: Tomar Decisoes
- Para cada issue identificado, decidir: Resolver agora / Priorizar / Delegar / Aceitar risco
- Documentar cada decisao com contexto e justificativa
- Atribuir dono para cada acao

### Step 4: Definir Proximos Passos
- Listar acoes concretas com dono e prazo
- Identificar dependencias com outros squads
- Criar sinapses para squads impactados (sinapse-protocol)
- Atualizar product-state se necessario

---

## Acceptance Criteria

1. Todas as 5 dimensoes foram avaliadas com dados (nao intuicao)
2. Decisoes documentadas com contexto e justificativa
3. Proximos passos tem dono e prazo definido
4. Sinapses criadas para squads impactados
5. Review report gerado usando template product-review-report.md

---

## Veto Conditions

- NAO conduzir review sem metricas atualizadas — review baseado em "achismo" e proibido
- NAO tomar decisoes de pricing/oferta — isso e squad-advisor (Hormozi)
- NAO definir campanhas ou conteudo — isso e squad-marketing / squad-content-distillery

---

## Output Example

```yaml
product_review:
  data: "2026-02-25"
  dimensoes:
    product_market_fit: "FORTE — NPS 72, recompra 68%"
    discovery_health: "ATENCAO — 3 features lancadas sem validacao"
    delivery_health: "OK — velocity estavel, tech debt sob controle"
    positioning_clarity: "FRACO — 40% dos leads nao entendem diferencial"
    retention_strength: "MODERADO — D30 retention 45%, meta 55%"
  decisoes:
    - decisao: "Pausar novas features e focar em discovery"
      contexto: "3 features lancadas sem validacao = build trap"
      dono: "melissa-perri"
      prazo: "2 semanas"
    - decisao: "Workshop de repositioning urgente"
      contexto: "40% de confusao no mercado e inaceitavel"
      dono: "april-dunford"
      prazo: "1 semana"
  sinapses:
    - para: "squad-marketing"
      decisao: "Positioning vai mudar — aguardar novo canvas"
    - para: "squad-sales"
      decisao: "Novo pitch coming — pausar pitch atual"
```

---

## Tools

- template: product-review-report.md
- input: metricas de produto, feedback squads
- output: review report + decisoes + sinapses

---

## Handoff

- Decisoes de discovery → melissa-perri
- Decisoes de positioning → april-dunford
- Decisoes de retention → nir-eyal
- Sinapses para outros squads → via project-state.yaml

---

## Error Handling

| Erro | Acao |
|------|------|
| Metricas indisponiveis | Solicitar ao squad-ops ou adiar review com justificativa |
| Conflito entre especialistas | Cagan (Chief) tem voto de minerva |
| Decisao impacta outro squad | Criar sinapse ANTES de comunicar decisao |
