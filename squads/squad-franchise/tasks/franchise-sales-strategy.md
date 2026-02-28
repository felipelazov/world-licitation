# Task: Franchise Sales Strategy

**Task ID:** franchise/franchise-sales-strategy
**Version:** 1.0.0
**Execution Type:** Interativo (50% Human / 50% Agent)
**Duration:** 60-90 minutos
**Agent:** joe-mathews

---

## Proposito

Construir uma estrategia completa de franchise sales para um franqueador, transformando o processo de venda de unidades em uma maquina sistematica e previsivel. O output e um Franchise Sales Strategy Document com diagnostico numerico, buyer generation model, processo de franchise development, metricas-alvo e roadmap de execucao --- tudo fundamentado no KASH Model, Tipping Point Analysis, Franchisee Lifecycle e Franchisor Lifecycle.

---

## Inputs

```yaml
obrigatorios:
  nome_rede:
    field: "Nome da rede de franquia"
    format: "string"
    required: true

  numero_unidades:
    field: "Numero atual de unidades em operacao"
    format: "integer"
    required: true

  meta_expansao:
    field: "Meta de novas unidades e prazo (ex: 50 unidades em 12 meses)"
    format: "string"
    required: true

  quem_vende:
    field: "Quem vende as franquias hoje (CEO, VP, equipe, broker)"
    format: "string"
    required: true

opcionais:
  faturamento_medio_unidade:
    field: "Faturamento medio mensal por unidade"
    format: "string"
    required: false

  margem_liquida_media:
    field: "Margem liquida media das unidades"
    format: "string"
    required: false

  lead_volume_mensal:
    field: "Volume de leads por mes e principais fontes"
    format: "string"
    required: false

  application_to_close_ratio:
    field: "Percentual de applications que resultam em award"
    format: "string"
    required: false

  nps_franqueados:
    field: "Net Promoter Score entre franqueados"
    format: "string"
    required: false

  taxa_franquia:
    field: "Valor da taxa de franquia"
    format: "string"
    required: false

  investimento_total:
    field: "Investimento total do franqueado para abrir unidade"
    format: "string"
    required: false

  budget_marketing_fd:
    field: "Budget mensal para marketing de franchise development"
    format: "string"
    required: false

  payback_medio:
    field: "Payback medio das unidades em meses"
    format: "string"
    required: false

  segmento:
    field: "Segmento de atuacao da rede"
    format: "string"
    required: false
```

---

## Steps

### FASE 1: DIAGNOSTICO (25-30 min) — 80% Human / 20% Agent

#### Step 1: Abertura e Enquadramento (3 min)

```
Joe Mathews aqui. CEO da Franchise Performance Group.

Nos proximos 60-90 minutos vou construir COM voce uma estrategia
completa de franchise sales para a [nome_rede].

Nao vamos falar de "vender mais franquias". Vamos falar de CONSTRUIR
UM SISTEMA --- um buyer generation model que produz candidatos
qualificados de forma previsivel e converte com consistencia.

Eu preciso de numeros reais. Sem numeros, nao existe diagnostico.
Vamos comecar?
```

#### Step 2: Franchisor Lifecycle Stage Identification (5 min)

Perguntas:
1. Quantas unidades a rede tem em operacao hoje?
2. Ha quantos anos opera como franqueadora?
3. Qual a estrutura da equipe de franchise development? (CEO vende? Tem VP? Equipe dedicada?)
4. Em quantos estados/regioes esta presente?
5. Qual o principal desafio que enfrenta para crescer?

**Processamento do Agente:**
Classificar o franqueador nos 7 Lifecycle Stages:
- Early Stage (1-10 unidades)
- Emerging (10-50 unidades)
- Regional (50-150 unidades)
- National (150-500 unidades)
- Iconic (500+ unidades)
- Turnaround (performance em declinio)
- Resurgent (pos-turnaround)

Validar se as taticas atuais sao compativeis com o estagio identificado. Sinalizar mismatch se houver.

#### Step 3: Unit Economics Assessment (5 min)

Perguntas:
1. Qual o faturamento medio mensal por unidade?
2. Qual a margem liquida media?
3. Qual o payback medio (meses para recuperar investimento)?
4. Qual a variacao de performance entre a melhor e a pior unidade?
5. Quantas unidades estao abaixo do breakeven hoje?

**Processamento do Agente:**
Avaliar unit economics contra benchmarks:
- Payback < 24 meses = Forte
- Margem liquida > 15% = Forte
- Variacao < 30% entre unidades = Consistente
- Unidades abaixo do breakeven < 10% = Saudavel

**RED FLAG CHECK:** Se unit economics for fraco (payback > 36 meses OU margem < 10% OU >20% das unidades abaixo do breakeven), ACIONAR VETO-001.

#### Step 4: Franchisee Satisfaction Assessment (5 min)

Perguntas:
1. Qual o NPS da rede entre franqueados? (Se nao tem, estimar: de 0 a 10, seus franqueados recomendam a marca?)
2. Qual o turnover de franqueados (% que saem por ano)?
3. Seus franqueados participam ativamente de convencoes e comites?
4. Se um candidato ligar para 5 franqueados aleatorios, o que eles vao ouvir?
5. Tem franqueados que indicam novos candidatos espontaneamente?

**Processamento do Agente:**
Avaliar satisfacao contra benchmarks:
- NPS > 50 = Excelente (validacao forte)
- NPS 30-50 = Bom (validacao positiva)
- NPS < 30 = Critico (validacao negativa)

**RED FLAG CHECK:** Se NPS < 30 OU turnover > 15% OU franqueados nao recomendam, ACIONAR VETO-002.

#### Step 5: Franchise Development Metrics Audit (5 min)

Perguntas:
1. Quantos leads recebe por mes? De quais fontes?
2. Qual o custo medio por lead?
3. Quantos leads viram application? (lead-to-application rate)
4. Quantas applications viram franqueados? (application-to-close ratio)
5. Qual o tempo medio do primeiro contato ate assinatura? (time to close)
6. Usa CRM para franchise development?
7. Tem processo documentado de franchise development?

**Processamento do Agente:**
Avaliar metricas contra benchmarks de Joe Mathews:
- Lead-to-application rate: 5-15% = Saudavel. < 3% = Problema de qualificacao
- Application-to-close ratio: > 15% = Bom. < 10% = Processo quebrado
- Time to close: 60-90 dias = Ideal. > 120 dias = Problema de urgencia/processo
- Cost per lead: Varia por canal. Rastrear por fonte = obrigatorio

#### Step 6: Tipping Point Diagnosis (5 min)

**Processamento do Agente (com dados coletados):**

Pontuar cada um dos 5 elementos do Tipping Point (1-10):

| Elemento | Score | Justificativa |
|----------|-------|---------------|
| 1. Strong Unit Economics | /10 | Baseado em Step 3 |
| 2. Validated Operations Model | /10 | Manual, treinamento, suporte, tecnologia |
| 3. Proven Franchisee Satisfaction | /10 | Baseado em Step 4 |
| 4. Effective Lead Gen & Conversion | /10 | Baseado em Step 5 |
| 5. Clear Value Proposition | /10 | Diferencial, comparativo, financing |

**Tipping Point Proximity Score: __/50**

Interpretacao:
- < 25: Longe do Tipping Point. Foco em fortalecer gaps.
- 25-35: Se aproximando. 1-2 elementos precisam de trabalho.
- 36-45: No Tipping Point. Escalar franchise development.
- > 45: Alem do Tipping Point. Crescimento exponencial natural.

Apresentar resultado ao franqueador e validar percepao.

---

### FASE 2: ESTRATEGIA (20-30 min) — 30% Human / 70% Agent

#### Step 7: KASH Model — Sales Team Assessment (8 min)

Perguntas sobre quem vende as franquias:
1. Quem e responsavel por franchise development? (perfil, experiencia, dedicacao)
2. Essa pessoa tem experiencia em franchise sales ou e vendedor generico?
3. Qual o nivel de conhecimento sobre unit economics, FDD/COF, processo de franchise?
4. Qual a atitude em relacao a follow-up? Persiste ou desiste facil?
5. Quais skills de vendas domina? (discovery, qualificacao, apresentacao, negociacao)
6. Quais habitos de pipeline management tem? (CRM diario, follow-up sistematico, metricas)

**Processamento do Agente:**

KASH Assessment da Equipe de Franchise Development:

| Componente | Score | Diagnostico | Acao |
|------------|-------|-------------|------|
| Knowledge | /10 | Sabe unit economics? Conhece lifecycle? Domina FDD? | Treinamento especifico |
| Attitude | /10 | Candidate-centric ou transacional? Persiste? | Mentoria + alinhamento |
| Skills | /10 | Discovery? Qualificacao? Apresentacao? Negociacao? | Roleplay + coaching |
| Habits | /10 | CRM diario? Follow-up sistematico? Metricas? | Processo + accountability |

**KASH Total: __/40**
- >= 28: Alta performance. Otimizar.
- 20-27: Potencial. Investir em gaps.
- < 20: Intervencao urgente. Considerar novo hire.

#### Step 8: Buyer Generation Model Design (8 min)

**Processamento do Agente (com inputs do franqueador sobre budget e canais):**

Perguntas complementares:
1. Qual o budget disponivel para marketing de franchise development?
2. Quais canais ja usa e quais gostaria de usar?
3. Tem material de vendas atualizado (site, apresentacao, video)?
4. Tem programa de referral para franqueados?

Construir modelo multi-pilar:

**PILAR 1: Referral Engine (meta: 25-35% dos leads)**
- Programa de indicacao de franqueados (estrutura e bonus)
- Rede profissional (corretores, consultores, contadores)
- Alumni de Discovery Days que nao fecharam

**PILAR 2: Owned Channels (meta: 25-35% dos leads)**
- Website dedicado para oportunidade de franquia
- SEO e conteudo para candidatos
- Email nurture para leads nao prontos
- Social media (historias de franqueados, unit economics)

**PILAR 3: Paid Channels (meta: 20-30% dos leads)**
- Google Ads (search intent)
- Facebook/Instagram Ads (targeting empreendedores)
- Portais de franquia (ABF, Guia de Franquias)

**PILAR 4: Events & PR (meta: 10-20% dos leads)**
- ABF Expo e eventos regionais
- Webinars para candidatos
- PR em publicacoes de negocios

Para cada pilar: canal, meta de leads, budget, CPL-alvo.

#### Step 9: Franchise Development Process Design (7 min)

**Processamento do Agente:**

Desenhar processo de 5 etapas adaptado ao lifecycle stage:

**Etapa 1: Inquiry (0-48h)**
- Resposta automatizada imediata
- Call de qualificacao em 24h
- Filtro: capital, perfil, motivacao
- Candidate Quality Score minimo para avancar

**Etapa 2: Application (48h - 7 dias)**
- Application form detalhado
- Background check basico
- Financial qualification
- Decisao: avanca ou descarta com feedback

**Etapa 3: Discovery Process (7-30 dias)**
- 2-3 calls de aprofundamento (discovery, nao pitch)
- Envio de FDD/COF
- Validacao com franqueados existentes (curadoria)
- Material de unit economics

**Etapa 4: Discovery Day (30-45 dias)**
- Visita a sede e unidades em operacao
- Apresentacao de unit economics ao vivo
- Q&A com franqueados satisfeitos (selecionados)
- Experiencia candidate-friendly

**Etapa 5: Decision & Award (45-75 dias)**
- Proposta formal com territorio
- Opcoes de financiamento candidato-amigavel
- Negociacao final
- Award da franquia

Para cada etapa: responsavel, SLA, metricas, scripts-chave.

#### Step 10: Franchisee Lifecycle Planning (7 min)

**Processamento do Agente:**

Para cada fase do Franchisee Lifecycle, definir estrategia de suporte que protege unit economics e satisfacao (alimentando Tipping Point):

| Fase | Duracao | KASH Focus | Acoes Criticas | Metrica de Sucesso |
|------|---------|------------|----------------|-------------------|
| 1. The Launch | 0-6 meses | Knowledge + Skills | Onboarding, buddy system, check-ins semanais | 90% seguem SOP no mes 3 |
| 2. The Grind | 6-18 meses | Attitude + Habits | Suporte intensificado, mastermind, plano 90 dias | < 15% em "Fight/Quit" |
| 3. Winning | 18-36 meses | Skills + Habits | Reconhecimento, comite, discussao multi-unit | NPS > 50 nesta coorte |
| 4. The Zone | 36+ meses | Attitude (engajamento) | Novos desafios, lideranca formal, innovation council | Retencao > 95% |
| 5. The Goodbye | Variavel | Knowledge (transferencia) | Exit planning, transferencia estruturada, valuation | Transicao < 90 dias |

Pergunta ao franqueador:
1. Qual a distribuicao atual dos seus franqueados por fase?
2. Tem programa de suporte diferenciado por fase?
3. Qual a taxa de saida nao planejada (% por ano)?

---

### FASE 3: PLANO DE ACAO E METAS (15-20 min) — 20% Human / 80% Agent

#### Step 11: Metricas-Alvo e Dashboard (5 min)

**Processamento do Agente:**

Construir painel de metricas-alvo baseado na meta de expansao:

```
META: [X] novas unidades em [Y] meses = [Z] vendas/mes

PIPELINE NECESSARIO (regra 3x):
- Candidatos em Discovery: [Z x 3]/mes
- Applications necessarias: [Z x 5]/mes
- Leads necessarios: [Z x 30-50]/mes

METRICAS-ALVO:
| Metrica | Atual | Meta | Gap |
|---------|-------|------|-----|
| Lead volume total/mes | | | |
| Cost per lead medio | | | |
| Lead-to-application rate | | | |
| Application-to-close ratio | | | |
| Time to close (dias) | | | |
| Franchisee NPS | | | |
| First-year survival rate | | | |
| Candidate Quality Score medio | | | |
```

#### Step 12: Roadmap de Execucao (8 min)

**Processamento do Agente:**

Construir roadmap em 3 horizontes baseado no Tipping Point Score:

**Horizonte 1: Fundacao (Meses 1-3)**
Prioridade: resolver gaps criticos do Tipping Point
- [ ] Acao 1: [baseada no elemento mais fraco]
- [ ] Acao 2: [segunda prioridade]
- [ ] Acao 3: [terceira prioridade]
- Meta: [metrica especifica]
- Investimento: R$ [valor]

**Horizonte 2: Construcao (Meses 4-6)**
Prioridade: construir buyer generation model e processo
- [ ] Acao 1: [buyer generation model ativo]
- [ ] Acao 2: [processo de franchise development rodando]
- [ ] Acao 3: [equipe treinada/contratada]
- Meta: [metrica especifica]
- Investimento: R$ [valor]

**Horizonte 3: Escala (Meses 7-12)**
Prioridade: escalar o que funciona e otimizar
- [ ] Acao 1: [escalar canais que convertem]
- [ ] Acao 2: [expandir equipe se necessario]
- [ ] Acao 3: [programas avancados: multi-unit, area developer]
- Meta: [metrica especifica]
- Investimento: R$ [valor]

**Tipping Point Score projetado por horizonte:**
- Atual: __/50
- Pos-Horizonte 1: __/50
- Pos-Horizonte 2: __/50
- Pos-Horizonte 3: __/50

#### Step 13: Investimento e ROI (3 min)

**Processamento do Agente:**

```
INVESTIMENTO TOTAL (12 meses):

Equipe:
- [cargo]: R$ [valor]/mes x 12 = R$ [valor]
- [cargo]: R$ [valor]/mes x 12 = R$ [valor]

Marketing:
- Buyer generation budget: R$ [valor]/mes x 12 = R$ [valor]
- Eventos: R$ [valor]/ano

Ferramentas:
- CRM/automacao: R$ [valor]/mes x 12 = R$ [valor]

TOTAL INVESTIMENTO ANUAL: R$ [valor]

RETORNO PROJETADO:
- [X] vendas em 12 meses x R$ [taxa] = R$ [valor] em taxas
- Royalties recorrentes: R$ [valor]/mes (crescente)

ROI DO INVESTIMENTO: [X]x

CENARIOS:
| Cenario | Vendas/12m | Receita Taxas | ROI |
|---------|-----------|---------------|-----|
| Conservador (70% da meta) | | | |
| Base (100% da meta) | | | |
| Otimista (130% da meta) | | | |
```

#### Step 14: Fechamento e Proximos Passos (3 min)

```
[Nome], aqui esta o que construimos juntos:

DIAGNOSTICO:
- Lifecycle Stage: [estagio] com [X] unidades
- Tipping Point Score: [X]/50 ([interpretacao])
- Gargalo #1: [descricao]
- Gargalo #2: [descricao]

ESTRATEGIA:
- Buyer Generation Model com [X] pilares
- Processo de Franchise Development em 5 etapas
- Meta: [X] vendas/mes com pipeline de [Y] candidatos
- Investimento: R$ [valor]/mes | ROI projetado: [X]x

PROXIMOS 30 DIAS:
1. [acao prioritaria #1]
2. [acao prioritaria #2]
3. [acao prioritaria #3]

Lembre: it's not a lead problem, it's a conversion problem.
Vamos construir essa maquina de franchise sales.
```

---

## Output

```yaml
file: "squads/franchise/data/strategies/{slug}-franchise-sales-strategy.yaml"
format: "yaml"
conteudo:
  franchise_sales_strategy:
    rede: "{nome_rede}"
    data: "{data}"
    agente: "joe-mathews"

    diagnostico:
      franchisor_lifecycle_stage: "{estagio}"
      numero_unidades: {numero}
      meta_expansao: "{meta}"
      anos_franqueadora: {numero}

      unit_economics:
        faturamento_medio: "R$ {valor}"
        margem_liquida: "{percentual}"
        payback_meses: {numero}
        variacao_performance: "{percentual}"
        unidades_abaixo_breakeven: "{percentual}"
        score: "{forte/medio/fraco}"

      franchisee_satisfaction:
        nps: {numero}
        turnover_anual: "{percentual}"
        validacao_positiva: "{sim/parcial/nao}"
        score: "{excelente/bom/critico}"

      franchise_development_metrics:
        lead_volume_mensal: {numero}
        fontes_principais: ["{fonte1}", "{fonte2}"]
        cost_per_lead: "R$ {valor}"
        lead_to_application_rate: "{percentual}"
        application_to_close_ratio: "{percentual}"
        time_to_close_dias: {numero}
        tem_crm: "{sim/nao}"
        processo_documentado: "{sim/nao}"

      tipping_point:
        unit_economics: {1-10}
        operations_model: {1-10}
        franchisee_satisfaction: {1-10}
        lead_gen_conversion: {1-10}
        value_proposition: {1-10}
        total_score: {5-50}
        interpretacao: "{pre_tipping/approaching/at_tipping/beyond_tipping}"

    kash_sales_team:
      knowledge: {1-10}
      attitude: {1-10}
      skills: {1-10}
      habits: {1-10}
      total: {4-40}
      diagnostico: "{alta_performance/potencial/intervencao_urgente}"
      acoes:
        - componente: "{K/A/S/H}"
          gap: "{descricao}"
          acao: "{descricao}"

    buyer_generation_model:
      pilares:
        - pilar: "Referral Engine"
          meta_percentual: "{percentual}"
          canais: ["{canal1}", "{canal2}"]
          leads_meta_mensal: {numero}
          budget_mensal: "R$ {valor}"
        - pilar: "Owned Channels"
          meta_percentual: "{percentual}"
          canais: ["{canal1}", "{canal2}"]
          leads_meta_mensal: {numero}
          budget_mensal: "R$ {valor}"
        - pilar: "Paid Channels"
          meta_percentual: "{percentual}"
          canais: ["{canal1}", "{canal2}"]
          leads_meta_mensal: {numero}
          budget_mensal: "R$ {valor}"
        - pilar: "Events & PR"
          meta_percentual: "{percentual}"
          canais: ["{canal1}", "{canal2}"]
          leads_meta_mensal: {numero}
          budget_mensal: "R$ {valor}"

    franchise_development_process:
      etapas:
        - etapa: 1
          nome: "Inquiry"
          sla: "0-48h"
          responsavel: "{quem}"
          metricas: ["{metrica1}"]
        - etapa: 2
          nome: "Application"
          sla: "48h-7 dias"
          responsavel: "{quem}"
          metricas: ["{metrica1}"]
        - etapa: 3
          nome: "Discovery Process"
          sla: "7-30 dias"
          responsavel: "{quem}"
          metricas: ["{metrica1}"]
        - etapa: 4
          nome: "Discovery Day"
          sla: "30-45 dias"
          responsavel: "{quem}"
          metricas: ["{metrica1}"]
        - etapa: 5
          nome: "Decision & Award"
          sla: "45-75 dias"
          responsavel: "{quem}"
          metricas: ["{metrica1}"]

    franchisee_lifecycle_plan:
      - fase: "The Launch"
        duracao: "0-6 meses"
        kash_focus: "Knowledge + Skills"
        acoes: ["{acao1}", "{acao2}"]
        metrica_sucesso: "{metrica}"
      - fase: "The Grind"
        duracao: "6-18 meses"
        kash_focus: "Attitude + Habits"
        acoes: ["{acao1}", "{acao2}"]
        metrica_sucesso: "{metrica}"
      - fase: "Winning"
        duracao: "18-36 meses"
        kash_focus: "Skills + Habits"
        acoes: ["{acao1}", "{acao2}"]
        metrica_sucesso: "{metrica}"
      - fase: "The Zone"
        duracao: "36+ meses"
        kash_focus: "Attitude (engajamento)"
        acoes: ["{acao1}", "{acao2}"]
        metrica_sucesso: "{metrica}"
      - fase: "The Goodbye"
        duracao: "Variavel"
        kash_focus: "Knowledge (transferencia)"
        acoes: ["{acao1}", "{acao2}"]
        metrica_sucesso: "{metrica}"

    metricas_alvo:
      vendas_por_mes: {numero}
      pipeline_discovery: {numero}
      applications_por_mes: {numero}
      leads_por_mes: {numero}
      lead_to_application_rate: "{percentual}"
      application_to_close_ratio: "{percentual}"
      time_to_close_dias: {numero}
      cost_per_lead_alvo: "R$ {valor}"
      nps_alvo: {numero}

    roadmap:
      horizonte_1:
        periodo: "Meses 1-3"
        foco: "Fundacao"
        acoes: ["{acao1}", "{acao2}", "{acao3}"]
        meta: "{metrica}"
        investimento: "R$ {valor}"
        tipping_point_projetado: {numero}
      horizonte_2:
        periodo: "Meses 4-6"
        foco: "Construcao"
        acoes: ["{acao1}", "{acao2}", "{acao3}"]
        meta: "{metrica}"
        investimento: "R$ {valor}"
        tipping_point_projetado: {numero}
      horizonte_3:
        periodo: "Meses 7-12"
        foco: "Escala"
        acoes: ["{acao1}", "{acao2}", "{acao3}"]
        meta: "{metrica}"
        investimento: "R$ {valor}"
        tipping_point_projetado: {numero}

    investimento_e_roi:
      investimento_mensal_total: "R$ {valor}"
      investimento_anual_total: "R$ {valor}"
      cenarios:
        conservador:
          vendas_12m: {numero}
          receita_taxas: "R$ {valor}"
          roi: "{X}x"
        base:
          vendas_12m: {numero}
          receita_taxas: "R$ {valor}"
          roi: "{X}x"
        otimista:
          vendas_12m: {numero}
          receita_taxas: "R$ {valor}"
          roi: "{X}x"

    handoffs_identificados:
      - agente: "{@agent}"
        razao: "{descricao}"
        prioridade: "{alta/media/baixa}"

    proximos_passos:
      - acao: "{descricao}"
        prazo: "{prazo}"
        responsavel: "{quem}"
```

---

## Quality Gate: QG-FRAN-001

- [ ] Franchisor Lifecycle Stage identificado com evidencias
- [ ] Unit economics avaliado com numeros reais (nao estimativas vagas)
- [ ] Franchisee satisfaction avaliada (NPS ou proxy)
- [ ] Tipping Point Score calculado com os 5 elementos pontuados
- [ ] KASH Assessment da equipe de franchise development completo
- [ ] Buyer generation model com minimo 3 pilares e metas por pilar
- [ ] Processo de franchise development desenhado em 5 etapas com SLAs
- [ ] Franchisee Lifecycle plan com acoes por fase
- [ ] Metricas-alvo definidas com benchmarks e gaps identificados
- [ ] Roadmap em 3 horizontes com acoes, metas e investimentos
- [ ] ROI projetado com 3 cenarios (conservador, base, otimista)
- [ ] Proximos 30 dias com 3 acoes prioritarias concretas
- [ ] Nenhuma red flag critica ignorada (unit economics fraco OU NPS critico tratados)
- [ ] Handoffs identificados para problemas fora do escopo de franchise sales

---

## Veto Conditions

### VETO-001: Unit Economics Inviavel
**Trigger:** Payback > 36 meses OU margem liquida < 10% OU > 20% das unidades abaixo do breakeven
**Acao:** PARAR construcao de estrategia de vendas. Unit economics e a ferramenta #1 de vendas --- sem ela, todo marketing e desperdicado.
**Prescricao:** "Voce nao pode vender seu caminho para fora de uma historia ruim de unit economics. Antes de investir R$ 1 em franchise development, precisamos fortalecer a operacao. Handoff para @michael-gerber para sistematizacao operacional."
**Handoff:** @michael-gerber (Operations Systemization)

### VETO-002: Franchisee Satisfaction Critica
**Trigger:** NPS < 30 OU turnover anual > 15% OU franqueados ativamente desaconselham a marca
**Acao:** PARAR ou LIMITAR vendas. Candidatos VAO ligar para franqueados existentes. Se ouvirem reclamacoes, game over.
**Prescricao:** "A melhor ferramenta de vendas que voce tem e um franqueado lucrativo que ama a marca. Hoje, seus franqueados nao sao sua forca de vendas --- sao seu maior obstáculo. Precisamos resolver isso ANTES de escalar."
**Handoff:** @greg-nathan (Franchisee Satisfaction / E-Factor)

### VETO-003: Lifecycle Stage Mismatch Critico
**Trigger:** Taticas de franchise development completamente incompativeis com o lifecycle stage (ex: CEO vendendo em rede com 100+ unidades, ou VP de Franchise Development em rede com 5 unidades)
**Acao:** Alertar sobre mismatch e adaptar TODA a estrategia ao estagio correto antes de prosseguir.
**Prescricao:** "Cada estagio do franqueador exige uma estrategia diferente de franchise development. Voce esta usando taticas de [estagio errado] numa rede [estagio real]. Isso explica por que os resultados nao vem."

### VETO-004: Sem Dados Para Diagnostico
**Trigger:** Franqueador nao sabe numero de unidades, faturamento medio, ou quantos leads recebe
**Acao:** PARAR. Sem numeros, nao existe diagnostico.
**Prescricao:** "Measure everything. What you don't measure, you can't improve. Antes de construir uma estrategia de franchise sales, preciso de dados basicos. Volte quando tiver pelo menos: unidades, faturamento medio, leads/mes e application-to-close ratio."
**Recomendacao:** Implementar tracking basico por 30-60 dias e retornar com dados.

### VETO-005: Franqueador em Turnaround Querendo Vender
**Trigger:** Rede em declinio (perda de unidades, insatisfacao generalizada, marca perdendo relevancia) mas quer acelerar vendas
**Acao:** BLOQUEAR vendas. Vender com rede insatisfeita e a forma mais rapida de destruir a marca.
**Prescricao:** "PARE de vender ate resolver os problemas internos. Cada franqueado novo que entra numa rede em crise se torna mais um franqueado insatisfeito. Foque em satisfacao, reformule unit economics, reconquiste confianca."
**Handoff:** @greg-nathan (satisfaction) + @michael-gerber (operations)

---

## Handoff Rules

| Condicao Detectada | Handoff Para | Contexto |
|-------------------|-------------|----------|
| Unit economics precisa de trabalho | @michael-gerber | Operacoes nao sistematizadas, modelo precisa fortalecimento |
| Franqueados insatisfeitos | @greg-nathan | Satisfacao critica, validacao comprometida |
| Precisa de campanha de marketing | @denis-santini | Buyer generation model pronto, precisa alimentar pipeline |
| Franqueados nao performam (execucao) | @scott-greenberg | Modelo solido mas execucao fraca |
| Questoes legais BR (COF, Lei de Franquias) | @marcelo-cherto | Compliance legal necessario |
| Franchisability nao validada | @mark-siebert | Modelo nunca foi avaliado formalmente |

---

## Frameworks Utilizados

| Framework | Fonte | Aplicacao na Task |
|-----------|-------|------------------|
| KASH Model (Knowledge, Attitude, Skills, Habits) | Joe Mathews / FPG | Step 7: Assessment da equipe de franchise development |
| Franchise Sales Tipping Point (5 Elements) | "The Franchise Sales Tipping Point" | Step 6: Diagnostico de proximidade + Roadmap |
| Franchisee Lifecycle (5 Phases) | "Street Smart Franchising" | Step 10: Planejamento de suporte por fase |
| Franchisor Lifecycle (7 Stages) | Franchise Performance Group | Step 2: Identificacao de estagio + adequacao de taticas |
| Buyer Generation vs Lead Generation | FPG Methodology | Step 8: Construcao do modelo multi-pilar |

---

**Task Status:** Ready for Production
