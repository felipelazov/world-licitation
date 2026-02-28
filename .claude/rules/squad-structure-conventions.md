---
paths: "squads/**"
---

# Convencao de Estrutura de Squads — World OS v1.0

## Estrutura Padrao

Todo squad DEVE ter os seguintes diretorios e arquivos:

```
squads/squad-{nome}/
├── agents/          ← Definicoes de agentes (obrigatorio)
├── tasks/           ← Tasks executaveis (obrigatorio)
├── checklists/      ← Checklists de qualidade (obrigatorio)
├── templates/       ← Templates de output (obrigatorio)
├── workflows/       ← Pipelines e fluxos (obrigatorio)
├── config.yaml      ← Configuracao do squad (obrigatorio)
└── README.md        ← Documentacao do squad (obrigatorio)
```

## Diretorios Opcionais

Os seguintes diretorios sao **opcionais** — criar apenas quando houver conteudo real:

| Diretorio | Quando usar | Squads que usam |
|-----------|-------------|-----------------|
| `data/` | Dados de referencia, padroes, standards | adm, agency, content-distillery, creator, design, zona-genialidade |
| `docs/` | Documentacao interna extensa do squad | content-distillery, creator, design |
| `minds/` | Pesquisa de mentes clonadas (cognitive models) | creator, ops |

**Regra:** NAO criar diretorios opcionais vazios. Se o squad nao tem dados de referencia, nao precisa de `data/`. Pasta vazia sem conteudo real so polui a estrutura.

## Casos Especiais

### squad-creator (Sub-sistema)

O squad-creator tem complexidade acima do padrao porque e o squad que **cria outros squads**. Diretorios extras justificados:

| Diretorio | Justificativa |
|-----------|---------------|
| `config/` | Configuracoes internas de criacao |
| `scripts/` | Scripts de automacao de clonagem |
| `skills/` | Skills customizadas (squad architect) |
| `utils/` | Utilitarios de processamento |
| `minds/` | Laboratorio de pesquisa de mentes |

Arquivos extras: `package.json` (dependencias proprias), `.state.json` (persistencia de estado entre sessoes), `CHANGELOG.md` (historico de versoes).

Esta complexidade e intencional e documentada — NAO simplificar.

## Naming Conventions

| Tipo | Padrao | Exemplo |
|------|--------|---------|
| Agentes | kebab-case, nome-do-especialista | `dave-ramsey-financeiro.md` |
| Tasks | kebab-case, descritivo | `financial-health-check.md` |
| Checklists | kebab-case com sufixo `-checklist` | `compliance-audit-checklist.md` |
| Templates | kebab-case com sufixo `-tmpl` | `contract-review-report-tmpl.md` |
| Workflows | kebab-case, `.yaml` ou `.md` (ver workflow-file-conventions.md) | `adm-operations-pipeline.yaml` |

## Decisao Arquitetural

Esta convencao foi definida em 2026-02-26 durante auditoria estrutural do World OS. A regra "diretorios opcionais so quando houver conteudo" evita proliferacao de pastas vazias e mantém cada squad limpo e navegavel. Squads com necessidades especiais (como squad-creator) documentam seus extras no README.
