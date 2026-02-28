# Squad Advisor — Strategic Business Advisory

Board de conselheiros pessoais de elite. 3 mentes visionarias para decisoes estrategicas de negocios, produto e lideranca.

## Estrutura

```
squad-advisor/
├── agents/
│   ├── advisor-chief.md      ← Orquestrador do board
│   ├── simon-sinek.md        ← Proposito, Golden Circle, Infinite Game
│   ├── alex-hormozi.md       ← Monetizacao, Ofertas, $100M Offers
│   └── steve-jobs.md         ← Produto, Foco, Simplicidade
├── tasks/
│   ├── strategic-advisory.md  ← Sessao individual com 1 advisor
│   └── board-meeting.md       ← Board com os 3 advisors opinando
├── checklists/
│   ├── golden-circle-checklist.md      ← Validacao de proposito (Sinek)
│   ├── grand-slam-offer-checklist.md   ← Validacao de oferta (Hormozi)
│   ├── product-vision-checklist.md     ← Validacao de visao (Jobs)
│   └── board-meeting-checklist.md      ← Qualidade do board meeting
├── templates/
│   ├── golden-circle-tmpl.md           ← Documento de proposito
│   ├── grand-slam-offer-tmpl.md        ← Documento de oferta
│   ├── product-vision-tmpl.md          ← Documento de visao de produto
│   └── board-meeting-tmpl.md           ← Ata de board meeting
├── workflows/
│   └── strategic-advisory-pipeline.yaml ← Pipeline: Proposito → Oferta → Visao
└── config.yaml
```

## Pipeline

O squad-advisor opera em 3 fases sequenciais do pipeline World OS:

```
[Fase 2] Proposito (Sinek) → [Fase 3] Produto (Hormozi) → [Fase 4] Visao (Jobs)
         QG-ADV-001                  QG-ADV-002                  QG-ADV-003
```

Cada fase tem quality gate com checklist. Se nao passa, nao segue.

## Ativacao

```
/squad-advisor:agents:advisor-chief   ← Orquestrador (roteia pro advisor certo)
/squad-advisor:agents:simon-sinek     ← Sessao direta com Sinek
/squad-advisor:agents:alex-hormozi    ← Sessao direta com Hormozi
/squad-advisor:agents:steve-jobs      ← Sessao direta com Jobs
/squad-advisor:tasks:strategic-advisory ← Sessao com routing automatico
/squad-advisor:tasks:board-meeting     ← Board com os 3
```

## Sinapses

Este squad GERA sinapses para praticamente todos os outros:

| Decisao | Impacta |
|---------|---------|
| WHY, posicionamento, tom | squad-design, squad-content-distillery, squad-sales |
| Oferta, preco, garantia | squad-design, squad-sales, squad-marketing |
| Features essenciais, cut list | squad-design, squad-ops, squad-content-distillery |
