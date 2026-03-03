# Squad Automation

> Converte automacoes n8n em aplicacoes nativas AIOS e cria novas automacoes do zero.

## Visao Geral

O squad-automation transforma fluxos n8n existentes e ideias de automacao em aplicacoes nativas AIOS com executores inteligentes (humano, agente, worker, clone).

### O que faz

- **Converter fluxos n8n** → Recebe JSON exportado do n8n e gera aplicacao nativa
- **Criar automacoes novas** → Recebe ideia e constroi do zero
- **Melhorar automacoes** → Audita e sugere melhorias com ROI
- **Descobrir oportunidades** → Analisa o negocio e propoe automacoes

### Executores

| Tipo | Quando Usar | Exemplo |
|------|-------------|---------|
| **worker** | Tarefa deterministica, API, data transform | HTTP request, DB insert, CRON job |
| **agente** | Tarefa cognitiva, IA, decisao complexa | Qualificar lead, gerar resumo |
| **humano** | Aprovacao, input manual, julgamento | Aprovar proposta, preencher form |
| **clone** | Expertise especifica, persona | Copy no estilo X, analise com framework Y |

## Agentes

| Agente | Role | Tier |
|--------|------|------|
| `automation-chief` | Orchestrador — triage, routing, delivery | Orchestrator |
| `n8n-converter` | Parse JSON n8n → AIOS spec | Tier 1 |
| `app-builder` | Spec → aplicacao nativa | Tier 1 |
| `automation-strategist` | Audit, melhorias, discovery | Tier 2 |

## Pipeline

```
Demanda → Analysis (Chief) → Conversion (Converter) → Build (Builder) → Review (Strategist) → ENTREGA
```

Cada fase tem quality gate com threshold de 70%.

## Como Usar

### Converter fluxo n8n
1. Exportar workflow do n8n como JSON
2. Ativar: `/squad-automation:agents:automation-chief`
3. Colar JSON: `*convert {json}`
4. Pipeline roda automaticamente ate entrega

### Criar automacao nova
1. Ativar: `/squad-automation:agents:automation-chief`
2. Descrever ideia: `*build {descricao}`
3. Responder perguntas de contexto
4. Receber app nativa

### Melhorar automacao existente
1. Ativar: `/squad-automation:agents:automation-chief`
2. `*improve {nome_da_automacao}`
3. Receber audit + melhorias com ROI

### Descobrir oportunidades
1. Ativar: `/squad-automation:agents:automation-chief`
2. `*suggest`
3. Descrever o negocio
4. Receber mapa de oportunidades priorizado

## Estrutura

```
squads/squad-automation/
├── agents/
│   ├── automation-chief.md        # Orchestrador
│   ├── n8n-converter.md           # JSON parser + mapper
│   ├── app-builder.md             # App constructor
│   └── automation-strategist.md   # Auditor + strategist
├── tasks/
│   ├── convert-n8n-flow.md        # Task: converter fluxo n8n
│   ├── create-automation-app.md   # Task: construir app nativa
│   ├── suggest-improvements.md    # Task: sugerir melhorias
│   └── discover-automations.md    # Task: descobrir oportunidades
├── checklists/
│   ├── conversion-quality-checklist.md    # QG: conversao
│   ├── automation-quality-checklist.md    # QG: 10-point audit
│   └── app-build-checklist.md             # QG: build
├── templates/
│   ├── conversion-spec-tmpl.yaml   # Template: spec de conversao
│   ├── automation-app-tmpl.yaml    # Template: spec de app nova
│   └── audit-report-tmpl.md        # Template: relatorio de audit
├── workflows/
│   └── convert-and-build.yaml      # Pipeline: demanda → entrega
├── config.yaml                     # Configuracao do squad
└── README.md                       # Este arquivo
```

## Comandos Rapidos

| Comando | Descricao |
|---------|-----------|
| `*convert {json}` | Converter fluxo n8n |
| `*build {ideia}` | Criar automacao nova |
| `*improve {nome}` | Melhorar automacao |
| `*suggest` | Sugerir novas automacoes |
| `*audit {nome}` | Auditar qualidade |
| `*pipeline` | Pipeline completo |

---

**Squad:** squad-automation | **Version:** 1.0.0 | **Created:** 2026-03-03
