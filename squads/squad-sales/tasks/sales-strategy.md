# Task: Estrategia de Vendas e Estrutura de Time

**Task ID:** squad-sales/sales-strategy
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 50 minutos
**Agent:** alex-hormozi

---

## Proposito

Definir a estrategia completa de vendas com foco em oferta irresistivel, scripts de fechamento e estrutura de time. O output e um Sales Strategy Document que combina a Value Equation (forca da oferta), o CLOSER Framework (scripts de venda), estrutura de papeis do time e sistema de accountability com KPIs claros.

---

## Inputs

```yaml
obrigatorios:
  oferta_produto:
    field: "Oferta ou produto principal"
    format: "string"
    required: true
    example: "Consultoria de IA para PMEs — setup + mensalidade"

  taxa_conversao_atual:
    field: "Taxa de conversao atual (leads → clientes)"
    format: "string"
    required: true
    example: "10%"

  meta_receita:
    field: "Meta de receita mensal"
    format: "string"
    required: true
    example: "R$100.000/mes"

  tamanho_time:
    field: "Tamanho atual do time de vendas"
    format: "string"
    required: true
    example: "2 vendedores + 1 closer"

opcionais:
  ticket_medio:
    field: "Ticket medio atual"
    format: "string"
    required: false

  custo_aquisicao:
    field: "CAC atual"
    format: "string"
    required: false

  canais_aquisicao:
    field: "Canais de aquisicao atuais"
    format: "lista"
    required: false
```

---

## Steps

### Step 1: Analisar Forca da Oferta — Value Equation (10 min)

Avaliar a oferta usando a Value Equation do Hormozi:
```
VALUE = (Dream Outcome × Perceived Likelihood of Achievement)
        ÷ (Time Delay × Effort & Sacrifice)
```

Para cada componente, diagnosticar:

**Dream Outcome (Resultado dos Sonhos):**
- O resultado prometido e desejavel o suficiente?
- O cliente QUER esse resultado ou apenas PRECISA?
- Score 1-10: quao atraente e o resultado?

**Perceived Likelihood (Probabilidade Percebida):**
- O cliente acredita que vai funcionar PRA ELE?
- Voce tem provas sociais, cases, garantias?
- Score 1-10: quao crivel e a promessa?

**Time Delay (Tempo ate Resultado):**
- Quanto tempo ate o cliente ver o primeiro resultado?
- Tem quick win nos primeiros 7 dias?
- Score 1-10: quao rapido e o resultado? (10 = instantaneo)

**Effort & Sacrifice (Esforco Necessario):**
- Quanto trabalho o cliente precisa fazer?
- Voce faz POR ele ou COM ele?
- Score 1-10: quao facil e pra ele? (10 = zero esforco)

Recomendacoes para maximizar cada componente.

### Step 2: Desenhar Scripts CLOSER Framework (15 min)

Construir o script de vendas usando o framework CLOSER:

**C — Clarify (Clarificar):**
Entender a situacao atual do prospect.
```
"Me conta, como funciona {processo} no seu negocio hoje?"
"Ha quanto tempo voce esta lidando com isso?"
"O que te fez buscar uma solucao agora?"
```

**L — Label (Rotular):**
Nomear o problema para o prospect se identificar.
```
"Entao o que voce esta me dizendo e que {reframe do problema}.
Isso e super comum em {segmento}. A maioria dos nossos clientes
chegou exatamente nessa situacao."
```

**O — Overview (Visao Geral):**
Mostrar o caminho da solucao (nao o produto, o CAMINHO).
```
"O que a gente faz e {processo em 3 passos}.
Passo 1: {quick win}
Passo 2: {implementacao}
Passo 3: {resultado final}
A maioria dos clientes ve resultado em {prazo}."
```

**S — Sell the Vacation (Vender as Ferias):**
Pintar o quadro do futuro.
```
"Imagina daqui {prazo}: {cenario ideal detalhado}.
Isso e o que {nome do cliente case} conseguiu em {prazo real}."
```

**E — Explain Away Concerns (Resolver Preocupacoes):**
Tratar objecoes antes que elas surjam.
```
"A maioria das pessoas nesse ponto tem 2 preocupacoes:
1. {objecao comum 1} — e por isso que {solucao}
2. {objecao comum 2} — e exatamente por isso que {garantia}
Alguma outra preocupacao?"
```

**R — Reinforce the Decision (Reforcar a Decisao):**
Confirmar a venda e eliminar remorso.
```
"Voce tomou uma otima decisao. Aqui esta o que vai acontecer:
{proximo passo 1}, {proximo passo 2}, {proximo passo 3}.
Nosso time vai te contatar em {prazo} para comecar."
```

### Step 3: Definir Papeis do Time de Vendas (10 min)

Estruturar os papeis conforme o tamanho do time:

**Solo Founder (1 pessoa):**
- Faz tudo: prospecao + qualificacao + fechamento + CS
- Foco: automatizar prospecao, maximizar fechamento

**Time Pequeno (2-3 pessoas):**
| Papel | Responsabilidade | Meta Principal |
|-------|-----------------|----------------|
| SDR | Prospecao + qualificacao | Reunioes agendadas/dia |
| Closer/AE | Reunioes + fechamento | Deals fechados/semana |
| CS/Ops | Onboarding + retencao | Churn rate < X% |

**Time Medio (4-8 pessoas):**
| Papel | Responsabilidade | Meta Principal |
|-------|-----------------|----------------|
| SDR(s) | Outbound prospecting | Reunioes qualificadas |
| BDR | Inbound lead response | Speed-to-lead < 5 min |
| AE(s) | Demos + fechamento | Revenue fechado |
| Sales Manager | Coaching + forecast | Win rate do time |
| CS | Retencao + expansion | NRR > 100% |

Para cada papel definir: atividades diarias, metricas, compensation plan.

### Step 4: Definir KPI Targets por Papel (8 min)

Estabelecer metas claras e mensuraveis:

**KPIs de Atividade (Leading — controle diario):**
| Papel | KPI | Target |
|-------|-----|--------|
| SDR | Ligacoes/dia | {calculado} |
| SDR | Emails/dia | {calculado} |
| SDR | Reunioes agendadas/semana | {calculado} |
| AE | Demos realizadas/semana | {calculado} |
| AE | Propostas enviadas/semana | {calculado} |

**KPIs de Resultado (Lagging — controle semanal/mensal):**
| Papel | KPI | Target |
|-------|-----|--------|
| SDR | SQL gerados/mes | {calculado} |
| AE | Deals fechados/mes | {calculado} |
| AE | Revenue fechado/mes | {calculado} |
| AE | Win rate | > {X}% |
| Time | CAC | < R${valor} |
| Time | Ciclo de venda | < {dias} dias |

Targets calculados de tras pra frente a partir da meta de receita.

### Step 5: Criar Sistema de Accountability (7 min)

Desenhar sistema de acompanhamento e responsabilidade:

**Daily Standup (15 min — todo dia):**
```
1. Quantas atividades fiz ontem? (vs target)
2. Quantas reunioes tenho hoje?
3. Algum deal travado que preciso de ajuda?
```

**Weekly Review (30 min — toda segunda):**
```
1. Pipeline: valor total por estagio
2. Forecast: o que vai fechar essa semana?
3. Win/Loss: por que ganhamos? Por que perdemos?
4. Coaching: 1 call review por vendedor
```

**Monthly Business Review (60 min — primeiro dia util):**
```
1. Meta vs realizado
2. Unit economics: CAC, LTV, payback
3. Pipeline health: cobertura, velocidade, conversao
4. Ajustes: o que mudar no proximo mes?
```

**Scoreboard publico:**
- Ranking de atividades (nao so resultado)
- Celebracao de wins (sino, post, bonus)
- Transparencia total: todos veem os numeros de todos

---

## Output

```yaml
file: "squads/squad-sales/data/{slug}-sales-strategy.md"
format: "markdown"
conteudo:
  - analise_value_equation
  - scripts_closer_framework
  - estrutura_time_papeis
  - kpi_targets_por_papel
  - sistema_accountability
  - cadencias_reuniao_definidas
```

---

## Quality Gate: QG-SALES-004

- [ ] Value Equation analisada com score por componente
- [ ] Scripts CLOSER completos (6 etapas com dialogos)
- [ ] Papeis do time definidos com responsabilidades claras
- [ ] KPIs de atividade E resultado por papel com targets numericos
- [ ] Sistema de accountability com cadencia diaria/semanal/mensal
- [ ] Targets calculados a partir da meta de receita (nao inventados)
- [ ] Scripts adaptados ao produto/servico especifico do usuario

---

## Veto Conditions

- Se oferta nao definida → Rodar value-equation antes de scripts
- Se meta de receita irreal para o time atual → Alertar e ajustar
- Se time = 1 pessoa → Simplificar para modelo solo-founder

---

**Task Status:** Ready for Production
