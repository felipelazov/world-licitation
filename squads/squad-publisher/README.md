# Publisher Squad — Elite Minds for Professional Document Design

**Version:** 1.0.0
**Command:** `/squad-publisher`
**Type:** Specialist Squad
**Independence:** 100% Self-Contained

---

## Overview

Squad especializado em criar documentos profissionais de alto nivel — catalogos de produtos, apresentacoes institucionais, relatorios e materiais de onboarding. Baseado nos 5 maiores nomes do mundo em design editorial, tipografia, grids e arquitetura de informacao.

---

## Tier System

### Orchestrator

| Agent | Command | Specialty |
|-------|---------|-----------|
| **Publisher Chief** | `@doc-chief` | Recebe briefing, roteia para especialistas, valida output |

### Tier 0 — Foundation

| Agent | Command | Specialty |
|-------|---------|-----------|
| **Edward Tufte** | `@edward-tufte` | Arquitetura de informacao — o que mostrar, hierarquia, data-ink ratio |

### Tier 1 — Masters

| Agent | Command | Specialty |
|-------|---------|-----------|
| **Massimo Vignelli** | `@massimo-vignelli` | Design system — tipografia, cor, grid, consistencia (The Vignelli Canon) |
| **Josef Muller-Brockmann** | `@josef-muller-brockmann` | Grid e layout multi-pagina — proporcao, ritmo, modularidade |

### Tier 2 — Specialists

| Agent | Command | Specialty |
|-------|---------|-----------|
| **Ellen Lupton** | `@ellen-lupton` | Tipografia e composicao — hierarquia, contraste, legibilidade |
| **Robert Bringhurst** | `@robert-bringhurst` | Refinamento tipografico — ritmo vertical, escala, polish final |

---

## Quick Start

```bash
# Ativar o squad
/squad-publisher

# Ativar agente especifico
/squad-publisher:agents:doc-chief
/squad-publisher:agents:edward-tufte
/squad-publisher:agents:massimo-vignelli
```

---

## Routing Guide

| Pedido | Roteado Para |
|--------|-------------|
| "Quero criar um catalogo" | doc-chief → pipeline completo (5 agentes) |
| "Preciso de uma apresentacao" | doc-chief → Tufte → Vignelli → Lupton |
| "Quero estruturar informacao" | edward-tufte |
| "Preciso de um design system" | massimo-vignelli |
| "Preciso de grid para 20 paginas" | josef-muller-brockmann |
| "Revisar tipografia" | ellen-lupton |
| "Polish final antes de publicar" | robert-bringhurst |

---

## Workflows

### Catalogo de Produtos (wf-catalog)
```
doc-chief (briefing)
  → edward-tufte (arquitetura de informacao)
    → massimo-vignelli (design system)
      → josef-muller-brockmann (grid multi-pagina)
        → ellen-lupton (tipografia)
          → robert-bringhurst (refinamento)
            → doc-chief (spec final)
```

### Apresentacao Institucional (wf-presentation)
```
doc-chief (briefing)
  → edward-tufte (estrutura narrativa)
    → massimo-vignelli (design system)
      → ellen-lupton (tipografia)
        → doc-chief (spec final)
```

---

## Integracao com BM PRO

O squad puxa dados reais do sistema:

| Documento | Fonte de Dados |
|-----------|---------------|
| Catalogo de produtos | `products` + `stock_levels` + precos (Supabase) |
| Apresentacao BM PRO | `docs/BM-PRO.md` + funcionalidades |
| Catalogo por categoria | `products` filtrado |
| Tabela de precos | `products` + margem |

---

## Project Structure

```
squads/squad-publisher/
├── agents/           (6 agents)
│   ├── doc-chief.md
│   ├── edward-tufte.md
│   ├── massimo-vignelli.md
│   ├── josef-muller-brockmann.md
│   ├── ellen-lupton.md
│   └── robert-bringhurst.md
├── tasks/            (3 tasks)
│   ├── create-catalog.md
│   ├── create-presentation.md
│   └── create-document.md
├── workflows/        (2 workflows)
│   ├── wf-catalog.yaml
│   └── wf-presentation.yaml
├── templates/        (2 templates)
│   ├── catalog-spec-tmpl.md
│   └── presentation-spec-tmpl.md
├── checklists/       (1 checklist)
│   └── document-quality-checklist.md
├── config.yaml
└── README.md
```

---

## Elite Minds — Fontes

| Agent | Obra Principal | Contribuicao |
|-------|---------------|-------------|
| Edward Tufte | The Visual Display of Quantitative Information (1983) | Data-ink ratio, chartjunk, small multiples |
| Massimo Vignelli | The Vignelli Canon (2010) | Design sistematico, disciplina, atemporalidade |
| Josef Muller-Brockmann | Grid Systems in Graphic Design (1981) | Grid modular, proporcao, ritmo visual |
| Ellen Lupton | Thinking with Type (2004) | Tipografia pratica, hierarquia, composicao |
| Robert Bringhurst | The Elements of Typographic Style (1992) | Ritmo vertical, escala, refinamento |

---

**Maintained By:** AIOS Squad Creator
**Created:** 2026-03-03
**Independence:** 100% Self-Contained
