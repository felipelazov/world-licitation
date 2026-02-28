# roadmap

> Task da Melissa Perri (PM) — Outcome-Based Roadmap

**Task ID:** roadmap
**Owner:** melissa-perri
**Squad:** squad-product
**Pattern:** PD-DI-003

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Oportunidades priorizadas + estrategia de produto |
| **Output** | Outcome-based roadmap trimestral |
| **Pre-conditions** | Opportunity mapping completo + vision alignment feito |
| **Trigger** | Trimestral, ou quando mudanca significativa de estrategia |

---

## Overview

"Companies end up in the build trap when they misunderstand value." O roadmap outcome-based foca em RESULTADOS que queremos atingir, nao features que queremos entregar. Formato Now/Next/Later com metricas por tema, nao datas por feature.

---

## Action Items

### Step 1: Definir Temas Estrategicos
- Extrair 2-4 temas do opportunity mapping e vision alignment
- Cada tema conecta a um outcome mensuravel
- Validar temas com Cagan (Chief)

### Step 2: Montar Roadmap Now/Next/Later
- **Now (0-6 semanas):** Oportunidades em discovery/desenvolvimento ativo — alta confianca
- **Next (6-12 semanas):** Oportunidades priorizadas aguardando discovery — media confianca
- **Later (12+ semanas):** Oportunidades identificadas mas nao validadas — baixa confianca
- Para cada item: outcome esperado, metrica, confidence level

### Step 3: Definir Metricas por Tema
- Cada tema tem 1-2 metricas primarias (leading indicators)
- Cada tema tem 1 metrica de impacto (lagging indicator)
- Definir baseline atual e target

### Step 4: Validar e Comunicar
- Review com squad-product completo
- Validar alignment com product vision
- Comunicar para squads dependentes via sinapse
- Publicar roadmap acessivel (nao escondido em doc)

---

## Acceptance Criteria

1. Roadmap organizado por outcomes, NAO por features
2. Formato Now/Next/Later com confidence levels
3. Cada tema tem metricas definidas com baseline e target
4. Alinhado com product vision (Cagan validou)
5. Comunicado para squads dependentes

---

## Veto Conditions

- NAO criar roadmap de features com datas — isso e Gantt chart, nao product roadmap
- NAO prometer datas para itens "Next" ou "Later" — confianca e baixa demais
- NAO incluir items sem outcome claro — "melhorar UX" nao e outcome, "aumentar activation rate de X para Y" e

---

## Output Example

```yaml
roadmap:
  trimestre: "Q1 2026"
  temas:
    - tema: "Ativacao Rapida"
      outcome: "Aumentar activation rate de 35% para 55%"
      metrica_primaria: "% usuarios que completam setup em <10min"
      metrica_impacto: "D7 retention"
      now:
        - "Setup guiado com IA (em desenvolvimento)"
        - "Simplificacao do onboarding flow (em discovery)"
      next:
        - "Progressive disclosure de features avancadas"
      later:
        - "Auto-configuracao baseada em industry"

    - tema: "Retencao por Habito"
      outcome: "Aumentar D30 retention de 45% para 55%"
      metrica_primaria: "DAU/MAU ratio"
      metrica_impacto: "Churn rate mensal"
      now:
        - "Hook model para dashboard diario (nir-eyal projetando)"
      next:
        - "Weekly digest de insights personalizados"
      later:
        - "Gamification de milestones de uso"
```

---

## Handoff

- Roadmap aprovado → squad inteiro (alinhamento)
- Itens de retention → nir-eyal (projetar hooks)
- Itens de positioning → april-dunford (ajustar narrativa se necessario)
- Comunicacao externa → squad-marketing / squad-content-distillery via sinapse
