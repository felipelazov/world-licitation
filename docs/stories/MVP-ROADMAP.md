# MVP Roadmap — LicitaFlow V1

> 8 Epics | 42 Stories | Estimativa: 8-12 semanas
> Referencia: PRD-001-licitacao-saas.md

---

## Visao Geral dos Epics

```
EPIC 1: Fundacao          ████████░░  Semana 1-2    (Infra, Auth, DB, Multi-tenant)
EPIC 2: Radar de Editais  ████████░░  Semana 2-4    (Scrapers, Filtros, Feed)
EPIC 3: Analise GO/NO-GO  ████░░░░░░  Semana 3-4    (Checklist, Scoring)
EPIC 4: Repositorio Docs  ████░░░░░░  Semana 3-5    (Upload, Validade, Alertas)
EPIC 5: Calculadora       ████░░░░░░  Semana 5-6    (Custo, Margem, Proposta)
EPIC 6: Pregao            ████░░░░░░  Semana 6-8    (Painel, Timer, Piso)
EPIC 7: Alertas           ████░░░░░░  Semana 7-9    (Push, Email, Centro)
EPIC 8: Onboarding        ████░░░░░░  Semana 9-10   (Wizard, Checklist, Guia)
```

---

## EPIC 1 — Fundacao (Semana 1-2)

> Infra base: monorepo, database, auth, layout, multi-tenant

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 1.1 | Setup monorepo Turborepo (web + mobile + packages) | P0 | [ ] |
| 1.2 | Setup Supabase (projeto, schema base, RLS) | P0 | [ ] |
| 1.3 | Modelo de dados core (tenants, users, subscriptions) | P0 | [ ] |
| 1.4 | Auth (cadastro, login, magic link, Google) | P0 | [ ] |
| 1.5 | Layout base web (sidebar, header, tema, responsivo) | P0 | [ ] |
| 1.6 | Setup de testes e CI (Vitest, Playwright, GitHub Actions) | P1 | [ ] |

---

## EPIC 2 — Radar de Editais (Semana 2-4)

> Monitoramento automatico de editais nos portais governamentais

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 2.1 | Modelo de dados: editais, filtros, fontes | P0 | [ ] |
| 2.2 | Scraper Compras.gov.br (API + headless) | P0 | [ ] |
| 2.3 | Scraper BEC-SP (headless browser) | P0 | [ ] |
| 2.4 | Worker de scraping (BullMQ + Redis + cron) | P0 | [ ] |
| 2.5 | Tela de filtros personalizados (objeto, regiao, valor, modalidade) | P0 | [ ] |
| 2.6 | Feed de editais (lista cronologica com status e filtros) | P0 | [ ] |
| 2.7 | Detalhe do edital (dados extraidos + PDF original) | P0 | [ ] |
| 2.8 | Download automatico de PDF do edital e anexos | P1 | [ ] |

---

## EPIC 3 — Analise GO/NO-GO (Semana 3-4)

> Avaliacao estruturada de viabilidade de participacao

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 3.1 | Modelo de dados: analises, criterios, decisoes | P0 | [ ] |
| 3.2 | Formulario de analise (10 criterios: 5 eliminatorios + 5 scoring) | P0 | [ ] |
| 3.3 | Engine de scoring e recomendacao GO/NO-GO | P0 | [ ] |
| 3.4 | Historico de analises com filtros | P0 | [ ] |
| 3.5 | Contagem regressiva pra sessao do pregao | P0 | [ ] |

---

## EPIC 4 — Repositorio de Documentos (Semana 3-5)

> Gestao centralizada de documentos com alertas de vencimento

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 4.1 | Modelo de dados: documentos, categorias, alertas | P0 | [ ] |
| 4.2 | Upload e visualizacao de documentos (PDF, imagem) | P0 | [ ] |
| 4.3 | Categorias padrao (juridica, fiscal, tecnica, economica) | P0 | [ ] |
| 4.4 | Campo de validade + status automatico (valido/vencendo/vencido) | P0 | [ ] |
| 4.5 | Engine de alertas de vencimento (cron + notificacao) | P0 | [ ] |
| 4.6 | Checklist de habilitacao por edital | P0 | [ ] |

---

## EPIC 5 — Calculadora de Margem (Semana 5-6)

> Planilha de custo, calculo de margem e piso de lance

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 5.1 | Modelo de dados: planilhas de custo, itens, margens | P0 | [ ] |
| 5.2 | Planilha de custo (materia-prima, mao de obra, embalagem, frete, impostos) | P0 | [ ] |
| 5.3 | Calculo de margem e piso de lance | P0 | [ ] |
| 5.4 | Alerta visual quando preco fica abaixo do piso | P0 | [ ] |
| 5.5 | Vinculo planilha ↔ edital (custo por edital) | P0 | [ ] |

---

## EPIC 6 — Assistente de Pregao (Semana 6-8)

> Painel de apoio durante a sessao do pregao eletronico

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 6.1 | Modelo de dados: sessoes, lances, resultados | P0 | [ ] |
| 6.2 | Painel de sessao (piso visivel, margem ao vivo, timer) | P0 | [ ] |
| 6.3 | Calculadora ao vivo ("se lance X, margem fica Y%") | P0 | [ ] |
| 6.4 | Checklist pre-sessao (docs, acesso, internet, planilha) | P0 | [ ] |
| 6.5 | Registro de resultado + analise pos-pregao | P0 | [ ] |

---

## EPIC 7 — Alertas e Notificacoes (Semana 7-9)

> Sistema de notificacoes push, email e centro de notificacoes

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 7.1 | Modelo de dados: notificacoes, preferencias, canais | P0 | [ ] |
| 7.2 | Infra de envio push (Expo Notifications / OneSignal) | P0 | [ ] |
| 7.3 | Infra de envio email (Resend — templates transacionais) | P0 | [ ] |
| 7.4 | Triggers: edital novo, certidao vencendo, pregao amanha, pagamento atrasado | P0 | [ ] |
| 7.5 | Centro de notificacoes in-app (historico + marcar como lido) | P0 | [ ] |
| 7.6 | Preferencias de notificacao (canal, frequencia, tipos) | P0 | [ ] |

---

## EPIC 8 — Onboarding (Semana 9-10)

> Setup guiado, checklist de prontidao e educacao

| Story | Titulo | Prioridade | Status |
|---|---|---|---|
| 8.1 | Wizard de setup (dados empresa, segmento, regiao, capacidade) | P0 | [ ] |
| 8.2 | Checklist de prontidao ("faltam X itens pra licitar") | P0 | [ ] |
| 8.3 | Guia de documentos (explicacao + link de cada documento) | P0 | [ ] |
| 8.4 | Templates prontos (proposta, declaracoes, atestado) | P1 | [ ] |
| 8.5 | Dicas contextuais e tooltips | P1 | [ ] |
| 8.6 | Tela de boas-vindas + tour guiado | P0 | [ ] |

---

## Dependencias entre Epics

```
EPIC 1 (Fundacao)
  ├──→ EPIC 2 (Radar) — precisa de DB e auth
  ├──→ EPIC 3 (Analise) — precisa de DB
  ├──→ EPIC 4 (Docs) — precisa de DB e storage
  │
  EPIC 2 ──→ EPIC 3 (analise vinculada a edital)
  EPIC 3 ──→ EPIC 5 (custo vinculado a edital analisado)
  EPIC 4 ──→ EPIC 6 (docs checklist pre-pregao)
  EPIC 5 ──→ EPIC 6 (piso de margem no painel)
  │
  EPIC 1 ──→ EPIC 7 (alertas precisam de infra)
  EPIC 2,3,4 ──→ EPIC 7 (triggers vem dos modulos)
  │
  EPIC 1 ──→ EPIC 8 (onboarding precisa de auth + layout)
  EPIC 4 ──→ EPIC 8 (checklist de docs no onboarding)
```

---

## Metricas de Conclusao do MVP

- [ ] Usuario consegue cadastrar e logar
- [ ] Editais de Compras.gov.br e BEC-SP aparecem automaticamente
- [ ] Usuario filtra editais por objeto, regiao e valor
- [ ] Usuario faz analise GO/NO-GO com scoring
- [ ] Usuario sobe documentos e recebe alerta de vencimento
- [ ] Usuario calcula custo e define piso de margem
- [ ] Usuario tem painel de apoio durante pregao
- [ ] Usuario recebe push e email de edital novo
- [ ] Primeiro uso tem wizard guiado
- [ ] Plano free e pago funcionando
