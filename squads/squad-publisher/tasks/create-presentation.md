# Task: create-presentation

> **Command:** `*presentation`
> **Agent:** doc-chief (routes to pipeline)
> **Purpose:** Criar apresentacao institucional profissional

---

## Overview

Cria uma apresentacao profissional (onboarding, pitch, relatorio) com o pipeline Tufte → Vignelli → Lupton.

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `subject` | Yes | Assunto (ex: "Onboarding BM PRO") |
| `audience` | Yes | Publico-alvo |
| `tone` | No | `professional` (padrao), `friendly`, `premium` |

## Execution

### Phase 1: Briefing (doc-chief)
1. Definir publico e objetivo
2. Coletar conteudo fonte (docs/BM-PRO.md ou manual)
3. Definir tom e numero estimado de paginas

### Phase 2: Information Architecture (Tufte)
1. Definir fluxo narrativo (problema → solucao → acao)
2. Hierarquizar informacao para o publico especifico
3. Eliminar informacao irrelevante para o publico
4. Definir conteudo por secao

### Phase 3: Design System (Vignelli)
1. Paleta tipografica e de cores
2. Grid para slides/paginas
3. Componentes de slide (titulo, conteudo, screenshot, dados)

### Phase 4: Typography (Lupton)
1. Hierarquia tipografica por tipo de slide
2. Legibilidade
3. Composicao visual

## Output

Spec completo da apresentacao com:
- Estrutura narrativa (secoes e conteudo)
- Design system visual
- Specs tipograficos por tipo de slide
- Wireframes ASCII de cada tipo de slide

## Veto Conditions

- Sem publico definido = nao comeca
- Sem conteudo fonte = nao comeca
