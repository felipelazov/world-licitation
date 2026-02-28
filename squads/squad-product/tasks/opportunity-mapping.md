# opportunity-mapping

> Task da Melissa Perri (PM) — Mapeamento de Oportunidades

**Task ID:** opportunity-mapping
**Owner:** melissa-perri
**Squad:** squad-product
**Pattern:** PD-DI-002

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Dados de discovery / feedback / metricas |
| **Output** | Opportunity Solution Tree + recomendacoes priorizadas |
| **Pre-conditions** | Ao menos 1 ciclo de discovery completo ou dados suficientes |
| **Trigger** | Apos discovery session, revisao trimestral, ou acumulo de feedback |

---

## Overview

O Opportunity Mapping usa o Opportunity Solution Tree (Teresa Torres) integrado com o Product Kata (Perri) para organizar visualmente: Outcome desejado → Oportunidades → Solucoes → Experimentos. Transforma dados dispersos em uma arvore de decisao clara.

---

## Action Items

### Step 1: Definir Desired Outcome
- Qual metrica de negocio queremos mover?
- Qual comportamento do usuario queremos mudar?
- Esse outcome esta alinhado com a product vision? (validar com Cagan)

### Step 2: Mapear Oportunidades
- Listar todas as oportunidades que podem levar ao outcome
- Oportunidades vem de: discovery, feedback de CS, dados de analytics, feedback de sales
- Agrupar oportunidades por tema
- Priorizar por: impacto estimado × frequencia × severidade

### Step 3: Gerar Solucoes por Oportunidade
- Para cada oportunidade top, brainstorm 3+ solucoes possiveis
- Solucoes podem ser: feature, melhoria, integracao, remocao, redesign
- NAO escolher solucao ainda — mapear opcoes

### Step 4: Definir Experimentos
- Para cada solucao candidata, definir experimento de validacao
- Priorizar: menor esforco que valida/invalida a hipotese mais arriscada
- Estimar effort vs confidence para cada experimento

### Step 5: Documentar e Comunicar
- Montar Opportunity Solution Tree visual
- Destacar top 3 oportunidades com solucoes recomendadas
- Compartilhar com squad para input

---

## Acceptance Criteria

1. Desired outcome e mensuravel e alinhado com vision
2. Pelo menos 5 oportunidades mapeadas com dados de suporte
3. Top 3 oportunidades tem 2+ solucoes candidatas cada
4. Cada solucao tem experimento de validacao proposto
5. Tree documentada e compartilhada com o squad

---

## Veto Conditions

- NAO pular direto para solucoes sem mapear oportunidades — solucao sem problema e build trap
- NAO priorizar por "gut feeling" — usar dados de discovery e metricas
- NAO mapear mais de 15 oportunidades de uma vez — foco sobre amplitude

---

## Output Example

```yaml
opportunity_tree:
  desired_outcome: "Aumentar retention D30 de 45% para 55%"
  oportunidades:
    - id: "OPP-001"
      descricao: "Usuarios nao descobrem features alem do basico"
      evidencia: "72% dos usuarios usam apenas 2 de 8 features"
      impacto: "ALTO"
      solucoes:
        - "Progressive disclosure de features"
        - "Onboarding contextual per-feature"
        - "Weekly digest de features nao usadas"
      experimento_recomendado: "Prototipo de onboarding contextual com 15 usuarios"
    - id: "OPP-002"
      descricao: "Usuarios nao voltam apos primeira semana"
      evidencia: "D7 drop de 70% para 52%"
      impacto: "ALTO"
      solucoes:
        - "Email trigger baseado em inatividade"
        - "Hook loop com recompensa variavel"
        - "Notificacao de progresso/milestone"
      experimento_recomendado: "A/B test de hook loop (delegar para nir-eyal)"
  recomendacao: "Focar em OPP-001 e OPP-002 — juntas cobrem 80% do gap de retention"
```

---

## Handoff

- Oportunidades priorizadas → roadmap (proxima task Perri)
- Oportunidades de retention → nir-eyal (hook design)
- Oportunidades de positioning → april-dunford (messaging)
