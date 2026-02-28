# Task: Setup de Framework de Medicao (DMMM)

**Task ID:** squad-marketing/analytics-setup
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 50 minutos
**Agent:** avinash-kaushik

---

## Proposito

Criar o framework completo de medicao de marketing digital usando o modelo DMMM (Digital Marketing & Measurement Model) de Avinash Kaushik. Definir KPIs por canal, estrutura de dashboard, mapeamento See-Think-Do-Care e metas mensais. O output e um Measurement Framework com spec de dashboard pronto para implementacao.

---

## Inputs

```yaml
obrigatorios:
  objetivos_negocio:
    field: "Objetivos de negocio (ex: gerar leads, aumentar vendas, construir audiencia)"
    format: "list"
    required: true

  plataformas_ativas:
    field: "Plataformas e canais ativos (Instagram, Meta Ads, Email, Site, etc.)"
    format: "list"
    required: true

  ferramentas:
    field: "Ferramentas disponiveis (Google Analytics, Meta Ads Manager, Hotjar, etc.)"
    format: "list"
    required: true

opcionais:
  metricas_atuais:
    field: "Metricas que ja acompanha hoje"
    format: "list"
    required: false

  budget_marketing:
    field: "Budget total de marketing mensal"
    format: "number"
    required: false

  maturidade_dados:
    field: "Nivel de maturidade em dados (iniciante, intermediario, avancado)"
    format: "string"
    required: false

  historico_vendas:
    field: "Faturamento mensal medio ou numero de vendas/mes"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Mapeamento See-Think-Do-Care (10 min)

Framework de Avinash Kaushik — mapear a jornada do cliente em 4 estagios:

| Estagio | Audiencia | Intencao | Canais | Metricas |
|---------|-----------|----------|--------|----------|
| **SEE** | Maior audiencia qualificada | Nenhuma (awareness) | Social, YouTube, Display | Alcance, impressoes, views |
| **THINK** | Audiencia com intencao inicial | Considerando | Blog, SEO, Social Ads | Engajamento, tempo no site, CTR |
| **DO** | Audiencia pronta para agir | Alta intencao | Search Ads, LP, Email | Conversoes, CPA, ROAS |
| **CARE** | Clientes existentes | Fidelizacao | Email, WhatsApp, CRM | LTV, recompra, NPS |

**Perguntas ao usuario:**
1. Qual estagio gera mais receita hoje? (SEE, THINK, DO ou CARE?)
2. Onde voce acha que esta perdendo mais clientes na jornada?
3. Voce tem estrategia especifica para clientes que ja compraram?
4. Quanto do seu budget vai para aquisicao vs retencao?

Para cada estagio, listar:
- Canais ativos
- Conteudo/acao que o cliente recebe
- Metrica primaria de sucesso

### Step 2: Definir KPIs por Canal (12 min)

Para cada plataforma/canal ativo, definir metricas em 3 niveis:

**Nivel 1 — Metricas de Vaidade (monitorar, nao decidir)**
- Seguidores, likes, impressoes, page views

**Nivel 2 — Metricas de Desempenho (otimizar)**
- Engagement rate, CTR, bounce rate, tempo no site, email open rate

**Nivel 3 — Metricas de Negocio (decidir)**
- Leads, CPA, ROAS, receita, LTV, CAC

**Perguntas ao usuario:**
1. Quais metricas voce olha hoje para saber se esta indo bem?
2. Voce sabe seu CAC (custo de aquisicao de cliente)?
3. Sabe o LTV (valor do cliente ao longo do tempo)?
4. Qual metrica, se melhorasse 20%, teria mais impacto no negocio?

**Tabela por canal:**
```
CANAL: {nome}
├── Metrica de Vaidade: {metrica}
├── Metrica de Desempenho: {metrica} — Meta: {valor}
├── Metrica de Negocio: {metrica} — Meta: {valor}
└── Frequencia de medicao: {diaria | semanal | mensal}
```

### Step 3: Estrutura do Dashboard (12 min)

Definir dashboard em 3 visoes:

**Visao 1: Dashboard Executivo (olhar diario — 30 segundos)**
```
┌─────────────────────────────────────────────┐
│  DASHBOARD EXECUTIVO — {Mes/Ano}            │
├─────────────┬─────────────┬─────────────────┤
│ Leads: {N}  │ CPA: R${X}  │ Receita: R${X}  │
│ meta: {N}   │ meta: R${X} │ meta: R${X}     │
├─────────────┴─────────────┴─────────────────┤
│ ROAS: {X}x  │ Budget: R${X}/{X}             │
│ trend: ↑/↓  │ gasto: {X}%                   │
└─────────────────────────────────────────────┘
```

**Visao 2: Dashboard de Canais (olhar semanal — 5 minutos)**
- Performance por canal (tabela comparativa)
- Top 3 conteudos da semana
- Budget por canal vs resultado

**Visao 3: Dashboard de Funil (olhar mensal — 15 minutos)**
- Funil completo: Impressoes → Cliques → Leads → Vendas
- Taxa de conversao entre cada etapa
- Gargalo identificado (onde mais perde)

**Perguntas ao usuario:**
1. Onde voce gostaria de ver esse dashboard? (Google Sheets, Notion, ferramenta propria)
2. Quem mais precisa ter acesso a esses dados?
3. Voce prefere dados em tempo real ou relatorios periodicos?

### Step 4: Metas e Benchmarks (8 min)

Definir metas mensais realistas:

**Calculo reverso (de receita para metricas):**
```
Meta de receita: R$ {valor}/mes
Ticket medio: R$ {valor}
Vendas necessarias: {N}
Taxa de conversao: {X}%
Leads necessarios: {N}
CPA aceitavel: R$ {valor}
Budget necessario: R$ {valor}
```

**Benchmarks por canal:**
| Canal | Metrica | Benchmark Iniciante | Benchmark Avancado |
|-------|---------|--------------------|--------------------|
| Instagram | Engagement Rate | 2-3% | 5%+ |
| Meta Ads | CTR | 1-1.5% | 2.5%+ |
| Meta Ads | CPA | Depende do nicho | — |
| Email | Open Rate | 20-25% | 35%+ |
| Email | Click Rate | 2-3% | 5%+ |
| Site | Bounce Rate | < 60% | < 40% |
| Site | Conversao LP | 2-5% | 10%+ |

### Step 5: Plano de Implementacao (8 min)

**Semana 1: Setup basico**
- [ ] Instalar/verificar Google Analytics 4
- [ ] Configurar eventos de conversao
- [ ] Verificar pixel do Meta
- [ ] Criar planilha/dashboard base

**Semana 2: Tracking avancado**
- [ ] UTMs padronizados para todos os links
- [ ] Parametros de rastreamento por campanha
- [ ] Configurar goals no GA4
- [ ] Integrar com plataforma de email

**Semana 3: Primeira medicao**
- [ ] Popular dashboard com dados reais
- [ ] Baseline de 30 dias para cada metrica
- [ ] Identificar quick wins (metricas mais faceis de melhorar)

**Semana 4: Otimizacao**
- [ ] Review do primeiro mes completo
- [ ] Ajustar metas se necessario
- [ ] Definir cadencia de revisao (semanal/mensal)

**Convencao de UTMs:**
```
utm_source: {plataforma} (instagram, meta-ads, email, google)
utm_medium: {tipo} (social, cpc, email, organic)
utm_campaign: {campanha} (lancamento-jan, nurture-q1)
utm_content: {criativo} (video-a, carrossel-01)
```

---

## Output

```yaml
file: "squads/squad-marketing/data/{slug}-measurement-framework.yaml"
format: "yaml"
conteudo:
  measurement_framework:
    cliente: "{nome}"
    data: "{data}"
    see_think_do_care:
      see:
        canais: ["{canais}"]
        metrica_primaria: "{metrica}"
      think:
        canais: ["{canais}"]
        metrica_primaria: "{metrica}"
      do:
        canais: ["{canais}"]
        metrica_primaria: "{metrica}"
      care:
        canais: ["{canais}"]
        metrica_primaria: "{metrica}"
    kpis_por_canal:
      - canal: "{nome}"
        vaidade: "{metrica}"
        desempenho: "{metrica}"
        negocio: "{metrica}"
        meta: "{valor}"
        frequencia: "{diaria | semanal | mensal}"
    dashboard:
      executivo:
        metricas: ["{metricas}"]
        frequencia: "diaria"
      canais:
        metricas: ["{metricas}"]
        frequencia: "semanal"
      funil:
        metricas: ["{metricas}"]
        frequencia: "mensal"
      ferramenta: "{Google Sheets | Notion | outra}"
    metas_mensais:
      receita: "R$ {valor}"
      leads: {numero}
      cpa: "R$ {valor}"
      roas: "{X}x"
    implementacao:
      semana_1: ["setup GA4", "pixel", "dashboard"]
      semana_2: ["UTMs", "goals", "integracoes"]
      semana_3: ["baseline", "dados reais"]
      semana_4: ["review", "otimizacao"]
    proximo_passo: "implementar-tracking"
```

---

## Quality Gate

- [ ] Mapeamento See-Think-Do-Care completo para todos os canais
- [ ] KPIs definidos em 3 niveis (vaidade, desempenho, negocio)
- [ ] Estrutura de dashboard com 3 visoes definidas
- [ ] Metas mensais calculadas com calculo reverso
- [ ] Benchmarks por canal documentados
- [ ] Plano de implementacao de 4 semanas
- [ ] Convencao de UTMs definida

---

## Veto Conditions

- Se nao tem nenhuma ferramenta de analytics → Instalar GA4 como pre-requisito
- Se nao tem site → Adaptar framework apenas para social + ads
- Se maturidade de dados = zero → Simplificar para 3 metricas essenciais (leads, CPA, receita)
- Se budget de marketing = zero → Focar apenas em metricas organicas

---

**Task Status:** Ready for Production
