# Task: Arquitetura de Revenue Operations

**Task ID:** squad-sales/revenue-architecture
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 60 minutos
**Agent:** jacco-van-der-kooij

---

## Proposito

Desenhar a arquitetura completa de Revenue Operations (RevOps) do negocio. O output e um Revenue Architecture Blueprint que mapeia pipeline, metricas leading/lagging, modelo de forecasting e pontos de handoff entre marketing, vendas e customer success para criar uma maquina de receita previsivel.

---

## Inputs

```yaml
obrigatorios:
  receita_atual:
    field: "Receita recorrente mensal atual (MRR)"
    format: "string"
    required: true
    example: "R$50.000/mes"

  tamanho_time:
    field: "Tamanho do time comercial"
    format: "string"
    required: true
    example: "3 vendedores + 1 SDR"

  ferramentas_vendas:
    field: "Ferramentas de vendas em uso"
    format: "lista"
    required: true
    example: "CRM (Pipedrive), WhatsApp, Planilha"

  meta_crescimento:
    field: "Meta de crescimento (proximo trimestre/semestre)"
    format: "string"
    required: true
    example: "Dobrar MRR em 6 meses"

opcionais:
  churn_rate:
    field: "Taxa de churn mensal"
    format: "string"
    required: false

  cac_atual:
    field: "Custo de aquisicao atual (CAC)"
    format: "string"
    required: false

  ltv_medio:
    field: "Lifetime value medio"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Mapear Modelo de Receita Atual (12 min)

Diagnosticar o estado atual da operacao de receita:
- **Revenue streams:** fontes de receita (recorrente, setup, upsell, servicos)
- **Unit economics:** ticket medio, CAC, LTV, payback period
- **Eficiencia:** receita por vendedor, deals por mes por vendedor
- **Gaps:** onde esta vazando receita (churn, downsell, pipeline morto)

Perguntas para o usuario:
1. De onde vem cada real de receita hoje?
2. Quanto custa trazer um cliente novo (tempo + dinheiro)?
3. Quanto tempo um cliente fica com voce em media?
4. Qual vendedor performa melhor e por que?
5. Onde voce perde mais deals no processo?

### Step 2: Definir Estagios do Pipeline (12 min)

Desenhar pipeline com estagios claros e criterios de passagem:

```
Lead → MQL → SQL → Reuniao → Proposta → Negociacao → Fechado Ganho / Perdido
```

Para cada estagio definir:
- **Criterio de entrada:** o que qualifica o lead para este estagio
- **Criterio de saida:** o que move para o proximo estagio
- **Responsavel:** quem (SDR, AE, closer) opera neste estagio
- **SLA de tempo:** tempo maximo neste estagio
- **Taxa de conversao esperada:** % historico ou benchmark

Modelo de pipeline stages:
| Estagio | Criterio de Entrada | SLA | Conversao Esperada | Responsavel |
|---------|--------------------|----|-------------------|-------------|
| Lead | Contato capturado | 24h | 100% → MQL: 30% | Marketing |
| MQL | Fit + interesse minimo | 48h | MQL → SQL: 50% | SDR |
| SQL | BANT qualificado | 72h | SQL → Reuniao: 70% | SDR |
| Reuniao | Agenda confirmada | 7d | Reuniao → Proposta: 60% | AE |
| Proposta | Necessidade validada | 5d | Proposta → Nego: 50% | AE |
| Negociacao | Proposta recebida | 7d | Nego → Ganho: 60% | AE/Closer |

### Step 3: Desenhar Framework de Metricas (12 min)

Estruturar metricas em duas categorias:

**Leading Indicators (Preditivas — medem esforco):**
- Atividades diarias (ligacoes, emails, reunioes)
- Leads gerados por semana
- Pipeline criado (valor) por semana
- Velocidade de pipeline (dias entre estagios)
- Cobertura de pipeline (pipeline / quota — ideal: 3-4x)

**Lagging Indicators (Resultado — medem output):**
- Receita fechada (MRR novo)
- Win rate (%)
- Ciclo de venda medio (dias)
- CAC (Custo de Aquisicao de Cliente)
- LTV / CAC ratio (saudavel: > 3:1)
- Net Revenue Retention (NRR)
- Churn rate

**Dashboard structure:**
```
PAINEL DIARIO:    Atividades | Reunioes agendadas | Pipeline criado
PAINEL SEMANAL:   Deals movidos | Win rate | Forecast accuracy
PAINEL MENSAL:    MRR | Churn | CAC | LTV | NRR | Revenue per rep
```

### Step 4: Criar Modelo de Forecasting (12 min)

Construir modelo de previsao de receita baseado em dados:

**Metodo 1 — Pipeline Weighted:**
```
Forecast = SUM(deal_value * probabilidade_por_estagio)

Exemplo:
Reuniao (20%): R$10.000 × 0.20 = R$2.000
Proposta (40%): R$15.000 × 0.40 = R$6.000
Negociacao (70%): R$8.000 × 0.70 = R$5.600
Forecast total: R$13.600
```

**Metodo 2 — Historico + Tendencia:**
```
Forecast = Media_3_meses × (1 + taxa_crescimento_mensal)
```

**Metodo 3 — Capacity-based:**
```
Forecast = vendedores × deals/vendedor/mes × ticket_medio × win_rate
```

Recomendacao: usar os 3 metodos e comparar para calibrar.

### Step 5: Definir Handoff Points (12 min)

Mapear transicoes criticas entre times:

**Marketing → Vendas (MQL → SQL):**
- Criterios de passagem do lead
- SLA de tempo para primeiro contato (ideal: < 5 min)
- Feedback loop: vendas reporta qualidade dos leads

**Vendas → Customer Success (Fechamento → Onboarding):**
- Informacoes transferidas (expectativas, escopo, timeline)
- Kickoff call structure
- SLA de inicio do onboarding (ideal: < 48h)

**Customer Success → Vendas (Expansion):**
- Sinais de upsell/cross-sell identificados por CS
- Processo de handoff para expansion sales
- Revenue share ou atribuicao

Para cada handoff definir:
- O que e transferido (dados, contexto, responsabilidade)
- Quem entrega e quem recebe
- SLA de tempo
- Como medir sucesso do handoff

---

## Output

```yaml
file: "squads/squad-sales/data/{slug}-revenue-architecture.md"
format: "markdown"
conteudo:
  - diagnostico_modelo_receita
  - pipeline_stages_com_criterios
  - framework_metricas_leading_lagging
  - modelo_forecasting_3_metodos
  - handoff_points_mkt_sales_cs
  - dashboard_structure
```

---

## Quality Gate: QG-SALES-003

- [ ] Modelo de receita mapeado com unit economics
- [ ] Pipeline com minimo 5 estagios e criterios de passagem
- [ ] Metricas leading E lagging definidas com targets
- [ ] Modelo de forecasting com pelo menos 2 metodos
- [ ] Handoff points definidos com SLAs
- [ ] Dashboard structure para acompanhamento diario/semanal/mensal
- [ ] Numeros baseados em dados reais (nao estimativas genericas)

---

## Veto Conditions

- Se receita atual desconhecida → Levantar dados minimos antes de prosseguir
- Se nenhuma ferramenta de CRM → Recomendar implementacao antes de RevOps
- Se time < 2 pessoas → Simplificar para modelo solo-founder

---

**Task Status:** Ready for Production
