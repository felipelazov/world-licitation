---
paths: "squads/**/workflows/**"
---

# Convencao de Arquivos de Workflow — World OS v1.0

## Dois Formatos Validos

O projeto usa dois formatos para workflows, cada um com proposito distinto:

### `.yaml` — Workflow Estrutural

**Quando usar:** Workflow compacto, focado em definicao de fases, gates e routing.
**Caracteristicas:** YAML puro, parseavel por maquina, sem prosa longa.
**Tamanho tipico:** 100-700 linhas.

```
Exemplos:
  squads/squad-advisor/workflows/strategic-advisory-pipeline.yaml
  squads/squad-sales/workflows/sales-revenue-pipeline.yaml
  squads/squad-ops/workflows/ops-demand-pipeline.yaml
```

### `.md` — Workflow Documentado

**Quando usar:** Workflow complexo que precisa de documentacao rica — diagramas ASCII, exemplos extensivos, prosa explicativa, contexto educacional.
**Caracteristicas:** Markdown com YAML em frontmatter ou code blocks. Nao parseavel como YAML puro.
**Tamanho tipico:** 500-1500 linhas.

```
Exemplos:
  squads/squad-content-distillery/workflows/full-distillery-pipeline.md
  squads/squad-design/workflows/design-project-workflow.md
  squads/squad-design/workflows/logo-project-workflow.md
```

## Regra de Decisao

```
Workflow novo → precisa de diagramas, exemplos extensivos, prosa educacional?
  SIM → .md (workflow documentado)
  NAO → .yaml (workflow estrutural)
```

## O Que NAO Fazer

- NAO misturar os dois formatos no mesmo arquivo (YAML puro com markdown solto)
- NAO criar `.md` quando um `.yaml` simples resolve
- NAO converter `.md` existente pra `.yaml` so por padronizacao — a documentacao rica tem valor

## Decisao Arquitetural

Esta convencao foi definida conscientemente em 2026-02-26 durante auditoria estrutural do World OS. Os workflows `.md` existentes nos squads content-distillery e design contem documentacao rica (diagramas, exemplos, contexto) que seria perdida ou degradada numa conversao pra YAML puro. Ambos os formatos sao validos e servem propositos diferentes.
