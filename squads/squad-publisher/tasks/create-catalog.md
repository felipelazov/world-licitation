# Task: create-catalog

> **Command:** `*catalog`
> **Agent:** doc-chief (routes to pipeline)
> **Purpose:** Criar catalogo de produtos profissional

---

## Overview

Cria um catalogo de produtos completo passando por todos os especialistas do squad.

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `source` | No | `supabase` (padrao) ou `manual` |
| `category` | No | Filtro de categoria |
| `format` | No | `A4` (padrao), `Letter` |

## Execution

### Phase 1: Briefing (doc-chief)
1. Identificar publico-alvo
2. Definir objetivo do catalogo
3. Coletar/puxar dados dos produtos
4. Definir tom visual

### Phase 2: Information Architecture (Tufte)
1. Inventariar todos os dados disponiveis
2. Classificar hierarquia (primario/secundario/terciario)
3. Agrupar por categoria (adjacencia espacial)
4. Eliminar chartjunk
5. Definir fluxo de leitura

### Phase 3: Design System (Vignelli)
1. Definir paleta tipografica (max 2 familias)
2. Definir paleta de cores (max 4 cores)
3. Definir grid base
4. Definir sistema de espacamento
5. Criar componentes (product card, header, footer)

### Phase 4: Grid & Layout (Muller-Brockmann)
1. Construir grid multi-pagina
2. Definir page types (cover, index, product, closing)
3. Definir ritmo visual entre paginas
4. Calcular numero de paginas

### Phase 5: Typography (Lupton)
1. Aplicar hierarquia tipografica
2. Verificar legibilidade (measure, leading, contraste)
3. Definir specs por componente

### Phase 6: Refinement (Bringhurst)
1. Verificar ritmo vertical (baseline)
2. Verificar escala tipografica
3. Verificar textura do texto
4. Ajustar detalhes finos

## Output

Documento de especificacao completo contendo:
- Arquitetura de informacao
- Design system (tipo, cor, spacing)
- Grid system com page types
- Specs tipograficos
- ASCII wireframes de cada page type
- Lista de produtos organizada

## Success Criteria

| Metric | Target |
|--------|--------|
| Data-ink ratio | > 80% |
| Baseline alignment | 100% |
| Measure | 45-75 chars |
| Hierarquia | 4+ niveis distintos |
| Consistencia | 100% entre paginas |

## Veto Conditions

- Sem briefing = nao comeca
- Menos de 3 produtos = nao justifica catalogo
- Sem dados de produto (nome + preco minimo) = nao comeca
