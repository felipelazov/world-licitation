# Task: Blueprint de Campanha Meta Ads

**Task ID:** squad-marketing/campaign-meta-ads
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 60 minutos
**Agent:** depesh-mandalia

---

## Proposito

Criar a estrutura completa de uma campanha Meta Ads (Facebook/Instagram) do zero. Inclui arquitetura de audiencia, estrategia de criativos, estrutura de campanha no modelo Test→Prospect→Scale, alocacao de budget e KPIs de controle. O output e um Campaign Blueprint pronto para implementacao no Ads Manager.

---

## Inputs

```yaml
obrigatorios:
  produto_oferta:
    field: "Produto ou oferta que sera anunciado"
    format: "string"
    required: true

  budget_mensal:
    field: "Budget mensal disponivel para ads (R$)"
    format: "number"
    required: true

  publico_alvo:
    field: "Descricao do publico-alvo ideal"
    format: "string"
    required: true

  objetivo:
    field: "Objetivo da campanha (leads, vendas, trafego, awareness)"
    format: "string"
    required: true

opcionais:
  pixel_instalado:
    field: "Pixel do Meta ja esta instalado e com dados?"
    format: "boolean"
    required: false

  historico_ads:
    field: "Ja rodou ads antes? Resultados anteriores?"
    format: "string"
    required: false

  url_destino:
    field: "URL da landing page ou pagina de vendas"
    format: "url"
    required: false

  criativos_existentes:
    field: "Tem criativos prontos? (videos, imagens)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Diagnostico do Cenario (10 min)

**Perguntas ao usuario:**
1. Qual exatamente o produto/oferta? Qual o preco?
2. Qual o budget mensal disponivel? (R$)
3. Ja rodou Meta Ads antes? Se sim, qual foi o melhor resultado?
4. Pixel esta instalado? Tem dados de conversao?
5. Qual o CPA (custo por aquisicao) maximo aceitavel?
6. Tem landing page pronta? Qual a URL?

**Avaliar:**
- Maturidade do pixel (frio / morno / quente)
- Budget vs objetivo (realista ou nao)
- Funil existente vs necessidade de criar

### Step 2: Arquitetura de Audiencia (12 min)

Definir as 3 camadas de audiencia:

**Camada 1 — Audiencia Fria (Prospecao)**
- Interesses relevantes ao nicho
- Lookalikes (se houver base)
- Broad (sem segmentacao — deixar algoritmo)

**Camada 2 — Audiencia Morna (Engajamento)**
- Engajou com perfil nos ultimos 30/60/90 dias
- Visitou site nos ultimos 30 dias
- Assistiu 50%+ de videos

**Camada 3 — Audiencia Quente (Retargeting)**
- Visitou pagina de vendas/LP
- Adicionou ao carrinho
- Iniciou checkout sem concluir

**Perguntas ao usuario:**
1. Voce tem lista de emails ou telefones de clientes? Quantos?
2. Qual o tamanho da sua audiencia no Instagram? (seguidores)
3. Tem videos publicados com mais de 1000 views?

### Step 3: Estrategia de Criativos (12 min)

Definir mix de criativos por tipo:

| Tipo | Formato | Objetivo | Quantidade |
|------|---------|----------|------------|
| Hook Visual | Video 15s | Parar o scroll | 3 variacoes |
| Prova Social | Imagem/Video | Gerar confianca | 2 variacoes |
| Educativo | Carrossel | Gerar valor | 2 variacoes |
| Oferta Direta | Imagem | Converter | 2 variacoes |
| UGC Style | Video | Autenticidade | 2 variacoes |

**Perguntas ao usuario:**
1. Voce tem depoimentos de clientes em video?
2. Consegue gravar videos de 15-30 segundos?
3. Tem resultados/numeros que pode mostrar como prova?

**Para cada criativo, definir:**
- Hook (primeiros 3 segundos)
- Corpo da mensagem
- CTA (call to action)
- Formato (1:1, 9:16, 4:5)

### Step 4: Estrutura de Campanha — Test→Prospect→Scale (15 min)

**FASE 1: TEST (Semana 1-2)**
```
Campanha: [TESTE] {Produto}
├── Ad Set 1: Interesse A (budget diario: R$ X)
│   ├── Criativo 1 (Hook A + Oferta)
│   ├── Criativo 2 (Prova Social)
│   └── Criativo 3 (UGC)
├── Ad Set 2: Interesse B (budget diario: R$ X)
│   ├── Criativo 1
│   ├── Criativo 2
│   └── Criativo 3
└── Ad Set 3: Broad (budget diario: R$ X)
    ├── Criativo 1
    ├── Criativo 2
    └── Criativo 3
```

**FASE 2: PROSPECT (Semana 3-4)**
- Escalar ad sets vencedores (+20% budget/dia)
- Matar ad sets com CPA > 2x meta
- Criar lookalikes dos compradores

**FASE 3: SCALE (Mes 2+)**
- CBO com ad sets vencedores
- Horizontal scaling (novos interesses)
- Vertical scaling (+budget nos winners)

**Regras de decisao:**
- CTR < 1% → trocar criativo
- CPA > 2x meta apos 50 cliques → matar ad set
- ROAS > 2x → escalar +20%/dia
- Frequencia > 3 → renovar criativos

### Step 5: Budget e KPIs (11 min)

**Alocacao de budget:**
```
Budget Total: R$ {valor}/mes

Fase TEST (40% do budget):
  - {N} ad sets x R$ {valor}/dia x 14 dias

Fase PROSPECT (35% do budget):
  - Ad sets vencedores x R$ {valor}/dia

Fase RETARGETING (25% do budget):
  - Audiencia quente x R$ {valor}/dia
```

**KPIs de controle:**
| KPI | Meta | Alerta |
|-----|------|--------|
| CPA | R$ {valor} | > R$ {valor} |
| CTR | > 1.5% | < 1% |
| ROAS | > {X}x | < 1x |
| CPM | < R$ {valor} | > R$ {valor} |
| Frequencia | < 2.5 | > 3 |
| Hook Rate | > 25% | < 15% |

---

## Output

```yaml
file: "squads/squad-marketing/data/{slug}-campaign-blueprint.yaml"
format: "yaml"
conteudo:
  campaign_blueprint:
    cliente: "{nome}"
    produto: "{produto}"
    objetivo: "{objetivo}"
    budget_mensal: "R$ {valor}"
    data: "{data}"
    audiencias:
      fria: ["{interesses}"]
      morna: ["{engajamento}"]
      quente: ["{retargeting}"]
    criativos:
      - tipo: "{tipo}"
        formato: "{formato}"
        hook: "{hook}"
        cta: "{cta}"
    estrutura:
      fase_test:
        budget_diario: "R$ {valor}"
        ad_sets: {numero}
        duracao: "14 dias"
      fase_prospect:
        budget_diario: "R$ {valor}"
        criterio_escala: "+20%/dia se CPA < meta"
      fase_retargeting:
        budget_diario: "R$ {valor}"
    kpis:
      cpa_meta: "R$ {valor}"
      roas_meta: "{X}x"
      ctr_meta: "{X}%"
    proximo_passo: "implementar-no-ads-manager"
```

---

## Quality Gate

- [ ] Produto e oferta claramente definidos com preco
- [ ] 3 camadas de audiencia mapeadas (fria, morna, quente)
- [ ] Minimo 5 criativos definidos com hooks e CTAs
- [ ] Estrutura Test→Prospect→Scale documentada
- [ ] Budget alocado por fase com valores diarios
- [ ] KPIs definidos com metas e alertas
- [ ] CPA maximo aceitavel calculado

---

## Veto Conditions

- Se budget < R$ 500/mes → Recomendar apenas organico, ads nao viavel
- Se nao tem landing page → Criar LP antes de rodar ads
- Se pixel nao instalado → Instalar pixel como pre-requisito
- Se produto nao tem prova social → Coletar depoimentos antes de escalar

---

**Task Status:** Ready for Production
