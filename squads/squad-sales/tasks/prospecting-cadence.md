# Task: Sistema de Prospecao com Cadencia Diaria

**Task ID:** squad-sales/prospecting-cadence
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 45 minutos
**Agent:** jeb-blount

---

## Proposito

Desenhar um sistema completo de prospecao com cadencia diaria estruturada. O output e um Prospecting Playbook que define exatamente quantos contatos fazer, por quais canais, com quais scripts, e quais KPIs acompanhar para manter o pipeline sempre cheio.

---

## Inputs

```yaml
obrigatorios:
  icp:
    field: "Perfil do Cliente Ideal (ICP)"
    format: "string"
    required: true
    example: "PMEs de servicos com 10-50 funcionarios, faturamento R$100k-500k/mes"

  canais_disponiveis:
    field: "Canais de prospecao disponiveis"
    format: "lista (telefone, email, WhatsApp, LinkedIn, Instagram, presencial)"
    required: true

  tempo_diario:
    field: "Tempo disponivel por dia para prospecao"
    format: "string"
    required: true
    example: "2 horas"

opcionais:
  ticket_medio:
    field: "Ticket medio da venda"
    format: "string"
    required: false

  meta_mensal:
    field: "Meta de vendas mensal"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Definir ICP Detalhado (10 min)

Aprofundar o Perfil do Cliente Ideal:
- **Demografia:** segmento, porte, faturamento, localizacao
- **Psicografia:** dores principais, desejos, medos, objecoes comuns
- **Comportamento:** onde buscam informacao, como compram, ciclo de decisao
- **Qualificacao:** criterios BANT (Budget, Authority, Need, Timeline)
- **Red flags:** sinais de que NAO e um bom lead

Perguntas para o usuario:
1. Quem e seu melhor cliente hoje? Descreva ele.
2. Qual o problema que ele tinha antes de comprar de voce?
3. O que fez ele escolher voce e nao o concorrente?
4. Quanto tempo levou da primeira conversa ate fechar?

### Step 2: Calcular Pipeline Math (8 min)

Calcular a matematica reversa do pipeline:
- **Meta mensal** de receita
- **Ticket medio** por venda
- **Deals necessarios** = Meta / Ticket medio
- **Taxa de fechamento** estimada (%)
- **Propostas necessarias** = Deals / Taxa de fechamento
- **Reunioes necessarias** = Propostas / Taxa de conversao reuniao→proposta
- **Contatos necessarios** = Reunioes / Taxa de conversao contato→reuniao

Exemplo de calculo:
```
Meta: R$50.000/mes | Ticket: R$5.000 | Deals: 10
Fechamento: 25% → Propostas: 40
Reuniao→Proposta: 50% → Reunioes: 80
Contato→Reuniao: 10% → Contatos: 800/mes = 40/dia
```

### Step 3: Desenhar Cadencia Diaria (10 min)

Estruturar o bloco diario de prospecao com base no tempo disponivel:
- **Power Hour:** bloco focado de ligacoes/contatos (sem interrupcao)
- **Distribuicao por canal:** quantos contatos por canal por dia
- **Sequencia de touches:** quantos toques ate descartar (recomendado: 8-12)
- **Horarios ideais** por canal (ligacao, email, social)
- **Rotina semanal:** dias focados em novos leads vs follow-up

Modelo de cadencia (8 touches em 14 dias):
```
Dia 1: Ligacao + Email
Dia 3: LinkedIn/Social
Dia 5: Ligacao + WhatsApp
Dia 7: Email com valor (conteudo/caso)
Dia 9: Ligacao
Dia 11: Social + Email
Dia 13: Ligacao final
Dia 14: Break-up message
```

### Step 4: Criar Scripts de Abordagem Fria (12 min)

Desenvolver scripts para cada canal:
- **Telefone:** abertura em 30 segundos que gera curiosidade (nao pitch)
- **Email frio:** subject line + corpo em 3 linhas (problema→solucao→CTA)
- **WhatsApp:** mensagem curta e direta com prova social
- **LinkedIn:** pedido de conexao + mensagem de valor
- **Tratamento de objecoes:** top 5 objecoes com turnaround scripts

Framework para cada script:
1. **Pattern interrupt** — quebrar a expectativa
2. **Relevancia** — por que estou falando com VOCE
3. **Prova** — resultado com cliente similar
4. **CTA** — proximo passo claro e pequeno

### Step 5: Definir KPIs de Atividade (5 min)

Definir metricas de acompanhamento diario/semanal:
- **Atividades diarias:** ligacoes feitas, emails enviados, mensagens social
- **Resultados diarios:** contatos efetivos, reunioes agendadas
- **Metricas semanais:** propostas enviadas, deals fechados
- **Taxas de conversao:** contato→reuniao, reuniao→proposta, proposta→deal
- **Pipeline value:** valor total em cada estagio

---

## Output

```yaml
file: "squads/squad-sales/data/{slug}-prospecting-playbook.md"
format: "markdown"
conteudo:
  - icp_detalhado
  - pipeline_math_calculado
  - cadencia_diaria_estruturada
  - scripts_por_canal
  - objecao_turnaround_scripts
  - kpi_targets
  - rotina_semanal
```

---

## Quality Gate: QG-SALES-001

- [ ] ICP definido com criterios de qualificacao BANT
- [ ] Pipeline math calculado com numeros reais do negocio
- [ ] Cadencia diaria cabe no tempo disponivel informado
- [ ] Minimo 3 scripts de abordagem fria (um por canal)
- [ ] Top 5 objecoes com turnaround scripts
- [ ] KPIs de atividade definidos com metas diarias/semanais
- [ ] Sequencia de touches definida (minimo 8 toques)

---

## Veto Conditions

- Se ICP indefinido ou generico demais → Refinar antes de prosseguir
- Se tempo diario < 30 minutos → Alertar que resultado sera limitado
- Se nenhum canal de contato direto disponivel → Recomendar social selling primeiro

---

**Task Status:** Ready for Production
