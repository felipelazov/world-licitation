# PRD-001 — LicitaFlow: Plataforma SaaS de Gestao Licitatoria

> **Status:** Draft
> **Autor:** Orion (AIOS Master) + Licitacao Chief
> **Data:** 2026-03-04
> **Versao:** 1.0

---

## 1. Visao do Produto

### 1.1 Problema

Fornecedores que participam de licitacoes publicas enfrentam:

- **Monitoramento manual** de editais em multiplos portais (Compras.gov.br, BEC, Licitacoes-e, portais municipais)
- **Controle por planilha** de documentos, certidoes e suas validades
- **Calculo de margem** na mao, arriscando vender no prejuizo
- **Zero inteligencia competitiva** — nao sabem precos historicos nem concorrentes
- **Perda de editais** por nao monitorar diariamente
- **Inabilitacao** por certidao vencida que ninguem lembrou de renovar
- **Descontrole na execucao** — entregas, NFs e pagamentos em cadernos/planilhas

### 1.2 Solucao

**LicitaFlow** — Plataforma SaaS que automatiza e centraliza todo o ciclo licitatorio:
da prospeccao do edital ate o recebimento do pagamento.

### 1.3 Proposta de Valor

> "Nunca mais perca um edital, uma certidao ou uma margem."

| Para quem | Valor |
|---|---|
| Fornecedor iniciante | Guia completo + checklist automatizado pra primeira licitacao |
| Fornecedor ativo | Automacao de monitoramento + controle financeiro |
| Empresa com equipe | Multi-usuario + dashboard gerencial + relatorios |

### 1.4 Visao Futura

Comecar com foco em **fornecedores de alimentos/cesta basica**, expandir para qualquer segmento de licitacao (TI, saude, construcao, servicos).

---

## 2. Publico-Alvo

### 2.1 Personas

**Persona 1 — Carlos, o Fornecedor Solo**
- Dono de empresa de cesta basica, 1-5 funcionarios
- Faz tudo sozinho: prospecta, monta proposta, participa do pregao, entrega
- Dor principal: nao tem tempo de monitorar editais todo dia
- Necessidade: automacao e alertas

**Persona 2 — Renata, a Gerente de Licitacoes**
- Trabalha em empresa media (20-100 funcionarios)
- Gerencia 10-30 processos simultaneos
- Dor principal: controle de documentos e prazos
- Necessidade: dashboard + gestao de equipe

**Persona 3 — Marcos, o Empresario**
- Dono de empresa grande, multiplos CNPJs
- Quer visao gerencial: taxa de adjudicacao, margem, faturamento
- Dor principal: falta de visibilidade e relatorios
- Necessidade: BI + multi-empresa

### 2.2 Segmentos de Mercado

| Fase | Segmento | TAM Estimado |
|---|---|---|
| V1 (lancamento) | Fornecedores de alimentos / cesta basica | ~50.000 empresas |
| V2 (expansao) | Todos os segmentos de licitacao | ~500.000 empresas |
| V3 (escala) | Escritorios de assessoria em licitacao | ~10.000 escritorios |

---

## 3. Arquitetura de Modulos

### 3.1 Mapa de Modulos

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LICITAFLOW — SaaS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  M1: RADAR   │  │ M2: ANALISE  │  │ M3: DOCS     │              │
│  │  Monitoramento│  │ GO / NO-GO   │  │ Repositorio  │              │
│  │  de Editais  │→│ Scoring      │→│ + Alertas    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│         │                │                   │                      │
│         ▼                ▼                   ▼                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ M4: PROPOSTA │  │ M5: PREGAO   │  │ M6: CONTRATO │              │
│  │ Calculadora  │→│ Assistente   │→│ Gestao       │              │
│  │ de Margem    │  │ de Sessao    │  │ Pos-Vitoria  │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│         │                                    │                      │
│         ▼                                    ▼                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ M7: FINANC.  │  │ M8: INTEL    │  │ M9: ALERTAS  │              │
│  │ Faturamento  │  │ Historico &  │  │ Notificacoes │              │
│  │ & Pagamento  │  │ Inteligencia │  │ & Automacoes │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ M10: IA      │  │ M11: ADMIN   │  │ M12: ONBOARD │              │
│  │ Triagem      │  │ Multi-tenant │  │ Wizard       │              │
│  │ Automatica   │  │ & Billing    │  │ Primeiro uso │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Especificacao de Modulos

### M1 — Radar de Editais (Monitoramento Automatico)

**Objetivo:** Encontrar editais relevantes automaticamente nos portais governamentais.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M1-F01 | Scraper Compras.gov.br | P0 | Monitoramento automatico do portal federal |
| M1-F02 | Scraper BEC-SP | P0 | Bolsa Eletronica de Compras SP |
| M1-F03 | Scraper Licitacoes-e | P1 | Portal do Banco do Brasil |
| M1-F04 | Scraper PNCP | P1 | Portal Nacional de Contratacoes Publicas |
| M1-F05 | Scrapers municipais | P2 | Portais de prefeituras (sob demanda) |
| M1-F06 | Filtros personalizados | P0 | Objeto, regiao, valor, modalidade |
| M1-F07 | Feed de editais | P0 | Lista cronologica com status (novo, analisado, descartado) |
| M1-F08 | Alerta push/email | P0 | Notificacao quando edital novo bate com filtros |
| M1-F09 | Download automatico de PDF | P1 | Baixa edital e anexos automaticamente |
| M1-F10 | Frequencia configuravel | P0 | A cada 1h, 4h, 12h, 24h |

**Fontes de dados:**

| Portal | Metodo | Frequencia | Complexidade |
|---|---|---|---|
| Compras.gov.br | API publica + scraping | 1-4h | Media |
| BEC-SP | Scraping | 4-12h | Alta (sem API) |
| Licitacoes-e | Scraping | 4-12h | Alta |
| PNCP | API publica | 1-4h | Baixa (API boa) |
| Portais municipais | Scraping customizado | 12-24h | Muito alta (cada um diferente) |

---

### M2 — Analise GO/NO-GO

**Objetivo:** Avaliar rapidamente se um edital vale a participacao.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M2-F01 | Checklist 10 pontos | P0 | Formulario estruturado de analise |
| M2-F02 | Scoring automatico | P0 | Pontuacao baseada nas respostas |
| M2-F03 | Decisao GO/NO-GO | P0 | Recomendacao automatica com justificativa |
| M2-F04 | Historico de decisoes | P0 | Registro de todos os GO/NO-GO com motivos |
| M2-F05 | Comparacao com historico | P1 | "Editais similares voce ganhou 3 de 5" |
| M2-F06 | IA — Analise de PDF | P2 | Extrai dados do edital automaticamente |
| M2-F07 | Alerta de prazo | P0 | Contagem regressiva pra sessao do pregao |

**Criterios de analise (10 pontos):**

1. Objeto compativel (eliminatorio)
2. Quantidade viavel (eliminatorio)
3. Local de entrega no raio (eliminatorio)
4. Prazo de entrega viavel (eliminatorio)
5. Habilitacao atingivel (eliminatorio)
6. Valor estimado permite margem (1-5)
7. Clausulas restritivas (1-5)
8. Historico do orgao (1-5)
9. Concorrencia estimada (1-5)
10. Risco x retorno (1-5)

---

### M3 — Repositorio de Documentos + Alertas

**Objetivo:** Centralizar todos os documentos e alertar sobre vencimentos.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M3-F01 | Upload de documentos | P0 | PDF, imagem — organizado por categoria |
| M3-F02 | Categorias padrao | P0 | Juridica, fiscal, tecnica, economico-financeira |
| M3-F03 | Data de validade | P0 | Campo obrigatorio com data de vencimento |
| M3-F04 | Alerta de vencimento | P0 | Push/email X dias antes (configuravel) |
| M3-F05 | Status do documento | P0 | Valido / Vencendo / Vencido / Pendente |
| M3-F06 | Checklist de habilitacao | P0 | Modelo por tipo de edital |
| M3-F07 | Vinculo com edital | P1 | "Pra esse edital, falta: CRF e atestado" |
| M3-F08 | Renovacao automatica | P2 | Emite certidoes online automaticamente |
| M3-F09 | Compartilhamento | P1 | Enviar pacote de docs pro pregoeiro |
| M3-F10 | Versionamento | P1 | Historico de versoes de cada documento |

**Alertas padrao:**

| Documento | Alerta antecipado |
|---|---|
| Certificado digital | 30 dias |
| Alvara sanitario | 60 dias |
| CND Federal | 30 dias |
| CND Estadual | 30 dias |
| CND Municipal | 15 dias |
| CRF/FGTS | 10 dias (validade 30 dias!) |
| CNDT Trabalhista | 30 dias |

---

### M4 — Calculadora de Margem e Proposta

**Objetivo:** Calcular custo real, definir piso de margem e formatar proposta.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M4-F01 | Planilha de custo | P0 | Materia-prima, mao de obra, embalagem, frete, impostos |
| M4-F02 | Custo por item | P0 | Detalhar custo de cada produto da cesta |
| M4-F03 | Margem configuravel | P0 | % desejada + piso minimo |
| M4-F04 | Calculo de impostos | P1 | Simples, Lucro Presumido, Lucro Real |
| M4-F05 | Simulador de cenarios | P1 | "Se baixar 5%, margem fica em X%" |
| M4-F06 | Preco de referencia | P0 | Importar do edital / ata anterior |
| M4-F07 | Historico de custos | P1 | Evolucao do custo no tempo |
| M4-F08 | Gerador de proposta | P1 | PDF formatado conforme modelo do edital |
| M4-F09 | Alerta de piso | P0 | "Preco abaixo do piso! Margem negativa." |
| M4-F10 | Multi-item/lote | P0 | Calcular por item individual e por lote |

---

### M5 — Assistente de Pregao

**Objetivo:** Painel de apoio durante a sessao do pregao eletronico.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M5-F01 | Painel de sessao | P0 | Tela dedicada pro pregao com piso, margem, lances |
| M5-F02 | Piso visivel | P0 | Indicador vermelho quando preco se aproxima do piso |
| M5-F03 | Registro de lances | P1 | Log de todos os lances dados e dos concorrentes |
| M5-F04 | Timer | P0 | Contagem regressiva de cada fase |
| M5-F05 | Calculadora ao vivo | P0 | "Se der lance de X, margem fica Y%" |
| M5-F06 | Estrategia sugerida | P2 | IA sugere proximo lance com base no comportamento |
| M5-F07 | Checklist pre-sessao | P0 | Verificar docs, acesso, internet, planilha |
| M5-F08 | Resultado e analise | P0 | Registrar resultado + analise pos-pregao |
| M5-F09 | Historico de sessoes | P1 | Todos os pregoes participados com resultado |
| M5-F10 | Notificacao de abertura | P0 | Lembrete 1h e 15min antes da sessao |

---

### M6 — Gestao de Contratos

**Objetivo:** Controlar o ciclo pos-adjudicacao: homologacao, assinatura, vigencia, aditivos.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M6-F01 | Pipeline de contrato | P0 | Adjudicacao → Homologacao → Convocacao → Assinatura |
| M6-F02 | Dados do contrato | P0 | Numero, orgao, valor, vigencia, fiscal |
| M6-F03 | Cronograma de entrega | P0 | Calendario com datas e quantidades |
| M6-F04 | Alerta de prazos | P0 | Vencimento de contrato, prazo de assinatura |
| M6-F05 | Controle de ata (SRP) | P0 | Saldo consumido vs total da ata |
| M6-F06 | Aditivos | P1 | Registro de aditivos (prazo, valor, quantidade) |
| M6-F07 | Reequilibrio | P1 | Pedido de reajuste com calculo e documentos |
| M6-F08 | Dados do fiscal | P0 | Nome, telefone, email do fiscal do contrato |
| M6-F09 | Vinculo com edital | P0 | Rastreabilidade: edital → pregao → contrato |
| M6-F10 | Encerramento | P0 | Checklist de encerramento de contrato |

---

### M7 — Financeiro (Faturamento e Pagamento)

**Objetivo:** Controlar NFs emitidas, pagamentos recebidos e inadimplencia de orgaos.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M7-F01 | Registro de NF | P0 | Numero, valor, data emissao, contrato vinculado |
| M7-F02 | Status de pagamento | P0 | Emitida → Atestada → Liquidada → Paga |
| M7-F03 | Alerta de atraso | P0 | Dias em atraso com destaque por gravidade |
| M7-F04 | Previsao de recebimento | P1 | Fluxo de caixa projetado |
| M7-F05 | Dashboard financeiro | P0 | Faturamento, recebido, a receber, atrasado |
| M7-F06 | Relatorio por periodo | P0 | Mensal, trimestral, anual |
| M7-F07 | Relatorio por orgao | P1 | Qual orgao paga melhor/pior |
| M7-F08 | Exportacao contabil | P1 | CSV/Excel pro contador |
| M7-F09 | Gestao de empenhos | P1 | Numero do empenho vinculado a NF |
| M7-F10 | Historico completo | P0 | Todos os recebimentos com filtros |

---

### M8 — Inteligencia Competitiva

**Objetivo:** Historico de precos, concorrentes e metricas pra tomar decisoes melhores.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M8-F01 | Historico de precos | P0 | Precos praticados por item/orgao/regiao |
| M8-F02 | Base de concorrentes | P1 | CNPJs que participam dos mesmos editais |
| M8-F03 | Comportamento de precos | P1 | Tendencia de preco ao longo do tempo |
| M8-F04 | Taxa de adjudicacao | P0 | Minha taxa de vitoria por segmento |
| M8-F05 | Margem media real | P0 | Margem efetiva (considerando custos reais) |
| M8-F06 | Ranking de orgaos | P1 | Quais orgaos sao melhores pra fornecer |
| M8-F07 | Mapa de calor | P2 | Regioes com mais editais do meu segmento |
| M8-F08 | Previsao de demanda | P2 | IA prevendo picos de editais |
| M8-F09 | Benchmark de mercado | P2 | Como meus precos se comparam ao mercado |
| M8-F10 | Exportacao de relatorios | P1 | PDF/Excel com analises |

---

### M9 — Alertas e Automacoes

**Objetivo:** Sistema de notificacoes inteligentes que evita esquecimentos.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M9-F01 | Push mobile | P0 | Notificacoes no celular |
| M9-F02 | Email | P0 | Resumo diario/semanal |
| M9-F03 | WhatsApp (API) | P2 | Alertas via WhatsApp Business |
| M9-F04 | Edital novo | P0 | Quando edital bate com filtros |
| M9-F05 | Certidao vencendo | P0 | X dias antes do vencimento |
| M9-F06 | Pregao amanha | P0 | Lembrete D-1 e D-0 |
| M9-F07 | Pagamento atrasado | P0 | Dias em atraso |
| M9-F08 | Entrega programada | P0 | Lembrete de entrega no cronograma |
| M9-F09 | Contrato vencendo | P0 | 30/15/7 dias antes |
| M9-F10 | Centro de notificacoes | P0 | Historico de todas as notificacoes |

---

### M10 — IA e Automacao Inteligente

**Objetivo:** Usar IA pra reduzir trabalho manual e aumentar inteligencia.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M10-F01 | Leitura de edital (PDF) | P1 | Extrai dados estruturados do PDF do edital |
| M10-F02 | GO/NO-GO automatico | P2 | IA sugere decisao com base no perfil do usuario |
| M10-F03 | Sugestao de preco | P2 | Preco sugerido com base em historico |
| M10-F04 | Alerta de risco | P1 | Identifica clausulas problematicas no edital |
| M10-F05 | Resumo de edital | P1 | Resumo em 5 bullets do edital de 50 paginas |
| M10-F06 | Chat assistente | P2 | Perguntas sobre o edital em linguagem natural |
| M10-F07 | Classificacao automatica | P1 | Categoriza edital por segmento, regiao, valor |
| M10-F08 | Match score | P1 | "Esse edital tem 87% de match com seu perfil" |
| M10-F09 | Predicao de resultado | P3 | Probabilidade de vencer baseado em historico |
| M10-F10 | Geracao de proposta | P2 | Gera proposta formatada automaticamente |

---

### M11 — Admin, Multi-tenant e Billing

**Objetivo:** Infraestrutura SaaS — usuarios, planos, cobranca.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M11-F01 | Cadastro de empresa | P0 | CNPJ, razao social, segmento, regiao |
| M11-F02 | Multi-usuario | P0 | Dono + operadores + visualizadores |
| M11-F03 | Multi-empresa | P1 | Um login gerencia multiplos CNPJs |
| M11-F04 | Roles e permissoes | P0 | Admin, gerente, operador, viewer |
| M11-F05 | Planos de assinatura | P0 | Free, Starter, Pro, Enterprise |
| M11-F06 | Billing / pagamento | P0 | Stripe ou Pagar.me — cartao + boleto + pix |
| M11-F07 | Trial gratuito | P0 | 14 dias com acesso total |
| M11-F08 | Onboarding wizard | P0 | Setup guiado no primeiro acesso |
| M11-F09 | Audit log | P1 | Registro de acoes dos usuarios |
| M11-F10 | API publica | P3 | Integracao com ERPs e sistemas externos |

---

### M12 — Onboarding e Educacao

**Objetivo:** Guiar o usuario do zero ate a primeira participacao.

**Funcionalidades:**

| ID | Feature | Prioridade | Descricao |
|---|---|---|---|
| M12-F01 | Wizard de setup | P0 | Passo a passo: dados da empresa, documentos, filtros |
| M12-F02 | Checklist de prontidao | P0 | "Faltam 3 itens pra voce poder licitar" |
| M12-F03 | Guia de documentos | P0 | Explicacao + link de cada documento |
| M12-F04 | Video tutoriais | P2 | Curtos (2-5min) por funcionalidade |
| M12-F05 | Base de conhecimento | P1 | FAQ + glossario + artigos |
| M12-F06 | Simulador de pregao | P2 | Pregao ficticio pra treinar |
| M12-F07 | Progresso gamificado | P2 | "Voce completou 70% do setup!" |
| M12-F08 | Templates prontos | P1 | Modelos de proposta, declaracoes, atestados |
| M12-F09 | Dicas contextuais | P1 | Tooltips e sugestoes dentro da plataforma |
| M12-F10 | Suporte in-app | P1 | Chat de suporte ou chatbot |

---

## 5. Planos e Pricing (Modelo SaaS)

| Plano | Preco/mes | Inclui |
|---|---|---|
| **Free** | R$0 | 1 empresa, 3 editais/mes, dashboard basico, docs |
| **Starter** | R$97 | 1 empresa, editais ilimitados, alertas, calculadora |
| **Pro** | R$197 | 3 empresas, IA, historico, inteligencia competitiva |
| **Enterprise** | R$497+ | Ilimitado, API, multi-usuario, suporte premium |

**Modelo de receita adicional:**
- Scrapers de portais municipais avulsos: R$29/portal/mes
- Pack de IA avancada (analise de PDF, predicao): add-on R$99/mes
- Consultoria humana (marketplace): comissao por lead

---

## 6. Stack Tecnica Proposta

### 6.1 Arquitetura Geral

```
┌─────────────┐    ┌─────────────┐    ┌──────────────────┐
│  Web App     │    │  Mobile App │    │  Scraper Workers  │
│  (Next.js)   │    │  (React     │    │  (Node.js)        │
│              │    │   Native)   │    │                   │
└──────┬───────┘    └──────┬──────┘    └────────┬──────────┘
       │                   │                    │
       └─────────┬─────────┘                    │
                 │                              │
          ┌──────▼──────┐              ┌────────▼─────────┐
          │   API Layer  │              │  Queue / Cron     │
          │  (Next.js    │◄────────────│  (BullMQ +        │
          │   API Routes │              │   Redis)          │
          │   or tRPC)   │              └──────────────────┘
          └──────┬───────┘
                 │
          ┌──────▼───────┐
          │   Database    │
          │  (Supabase    │
          │   PostgreSQL) │
          └──────┬───────┘
                 │
          ┌──────▼───────┐
          │   Storage     │
          │  (Supabase    │
          │   Storage /   │
          │   S3)         │
          └──────────────┘
```

### 6.2 Stack Detalhada

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Frontend Web** | Next.js 15 + React 19 | SSR, App Router, performance |
| **UI Kit** | shadcn/ui + Tailwind CSS | Componentes prontos, customizaveis |
| **Mobile** | React Native (Expo) | Compartilha logica com web, push nativo |
| **API** | Next.js API Routes + tRPC | Type-safe, mesmo deploy |
| **Database** | Supabase (PostgreSQL) | Auth, RLS, Realtime, Storage incluso |
| **Auth** | Supabase Auth | Email, Google, Magic Link |
| **Queue** | BullMQ + Redis | Jobs de scraping, alertas, cron |
| **Scraping** | Playwright + Cheerio | Headless browser pra portais JS-heavy |
| **IA** | Claude API (Anthropic) | Analise de PDF, NLP, sugestoes |
| **Push** | Expo Notifications + OneSignal | Push mobile e web |
| **Email** | Resend | Transacional + alertas |
| **Pagamento** | Stripe (internacional) + Pagar.me (BR) | Cartao, boleto, pix |
| **Hosting** | Vercel (web) + Railway/Fly.io (workers) | Edge deploy, workers 24/7 |
| **Monitoring** | Sentry + Axiom | Erros + logs |
| **Analytics** | PostHog | Produto analytics, funnels |

### 6.3 Decisoes Arquiteturais

| Decisao | Escolha | Alternativa descartada | Motivo |
|---|---|---|---|
| Monorepo | Turborepo | Repos separados | Compartilhar tipos e logica web/mobile |
| ORM | Drizzle | Prisma | Mais leve, melhor com Supabase |
| State (web) | Zustand + TanStack Query | Redux | Simplicidade |
| State (mobile) | TanStack Query + MMKV | AsyncStorage | Performance |
| Realtime | Supabase Realtime | Socket.io | Ja integrado |
| PDF parsing | pdf-parse + Claude | Tabula | IA entende contexto melhor |

---

## 7. Modelo de Dados (Entidades Core)

```
Tenant (empresa)
├── Users (usuarios da empresa)
├── Documents (certidoes, contratos, atestados)
│   └── DocumentAlerts (alertas de vencimento)
├── CostSheets (planilhas de custo)
│   └── CostItems (itens de custo)
├── Editals (editais monitorados)
│   ├── EditalAnalysis (analise GO/NO-GO)
│   ├── EditalDocuments (PDFs do edital)
│   └── Proposals (propostas enviadas)
├── BiddingSessions (sessoes de pregao)
│   └── Bids (lances dados)
├── Contracts (contratos/atas)
│   ├── Deliveries (entregas programadas)
│   ├── Invoices (notas fiscais)
│   └── Payments (pagamentos recebidos)
├── Competitors (concorrentes identificados)
├── PriceHistory (historico de precos)
├── Notifications (centro de notificacoes)
└── Subscription (plano + billing)
```

---

## 8. Requisitos Nao-Funcionais

| Requisito | Especificacao |
|---|---|
| **Performance** | Dashboard carrega em < 2s. Feed de editais em < 1s. |
| **Disponibilidade** | 99.5% uptime (scrapers podem ter downtime isolado) |
| **Seguranca** | Multi-tenant com RLS. Dados encriptados at-rest e in-transit. |
| **LGPD** | Consentimento, direito ao esquecimento, DPO definido |
| **Escalabilidade** | Suportar 10.000 tenants na V1 |
| **Backup** | Diario automatico, retencao 30 dias |
| **Mobile** | iOS 15+ e Android 10+ |
| **Browser** | Chrome, Firefox, Safari, Edge (ultimas 2 versoes) |
| **Acessibilidade** | WCAG 2.1 AA |
| **i18n** | Portugues BR (V1). Espanhol (V2 — LATAM). |

---

## 9. Roadmap de Entregas

### V1 — MVP (8-12 semanas)

**Objetivo:** Fornecedor consegue monitorar editais, controlar docs e participar do primeiro pregao.

| Modulo | Features incluidas |
|---|---|
| M1 Radar | Compras.gov.br + BEC-SP, filtros, feed, alertas |
| M2 Analise | Checklist 10 pontos, scoring, GO/NO-GO |
| M3 Docs | Upload, categorias, validade, alertas de vencimento |
| M4 Proposta | Planilha de custo, margem, piso |
| M5 Pregao | Painel basico com piso visivel e timer |
| M9 Alertas | Push + email (edital novo, certidao vencendo, pregao amanha) |
| M11 Admin | Cadastro, auth, 1 plano pago + free |
| M12 Onboard | Wizard de setup + checklist de prontidao |

### V2 — Growth (semanas 13-20)

| Modulo | Features incluidas |
|---|---|
| M6 Contratos | Pipeline completo, cronograma, ata de registro |
| M7 Financeiro | NFs, pagamentos, dashboard financeiro |
| M8 Intel | Historico de precos, taxa de adjudicacao |
| M11 Admin | Multi-usuario, multi-empresa, planos |
| Mobile | App React Native com push nativo |

### V3 — Intelligence (semanas 21-30)

| Modulo | Features incluidas |
|---|---|
| M10 IA | Leitura de PDF, resumo, match score |
| M8 Intel | Concorrentes, mapa de calor, benchmark |
| M1 Radar | PNCP, Licitacoes-e, portais municipais |
| M9 Alertas | WhatsApp API |
| M11 Admin | API publica, billing completo |

---

## 10. Metricas de Sucesso

| Metrica | Meta V1 | Meta V2 |
|---|---|---|
| Usuarios cadastrados | 500 | 2.000 |
| Usuarios pagantes | 50 (10%) | 300 (15%) |
| MRR | R$4.850 | R$45.000 |
| Editais monitorados/dia | 100+ | 500+ |
| NPS | >= 40 | >= 50 |
| Churn mensal | < 8% | < 5% |
| Tempo pro primeiro GO | < 24h apos cadastro | < 12h |

---

## 11. Riscos e Mitigacoes

| Risco | Impacto | Probabilidade | Mitigacao |
|---|---|---|---|
| Portal muda estrutura HTML | Scraper quebra | Alta | Monitoria + alerta + fix rapido |
| Portal bloqueia scraping | Sem dados | Media | Rotacao de IP, headless, API oficial |
| Concorrente estabelecido | Market share | Media | Foco em UX + nicho alimentos |
| LGPD / dados sensíveis | Multa | Baixa | RLS + encriptacao + DPO |
| Complexidade de portais municipais | Escopo explode | Alta | Comecar so com federal + SP |
| Custo de infra de scraping | Margem | Media | Workers sob demanda, cache agressivo |

---

## 12. Concorrentes Conhecidos

| Concorrente | Foco | Preco | Diferencial nosso |
|---|---|---|---|
| Licitanet | Monitoramento | ~R$200/mes | Eles so monitoram. Nos gerenciamos o ciclo todo. |
| Portal de Licitacoes | Monitoramento | ~R$100-300/mes | Mesmo acima. |
| Licitar Digital | Monitoramento + docs | ~R$150/mes | Nos temos calculadora, pregao, financeiro, IA. |
| Compras.gov.br | Portal oficial | Gratuito | Sem gestao, sem alertas, sem inteligencia. |

**Posicionamento:** Nao somos so monitoramento. Somos gestao completa do ciclo licitatorio.

---

*PRD gerado por Orion (AIOS Master) + Licitacao Chief*
*LicitaFlow — Plataforma SaaS de Gestao Licitatoria*
*Versao 1.0 — 2026-03-04*
