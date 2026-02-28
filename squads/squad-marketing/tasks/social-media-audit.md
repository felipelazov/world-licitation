# Task: Auditoria de Redes Sociais

**Task ID:** squad-marketing/social-media-audit
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 45 minutos
**Agent:** gary-vaynerchuk

---

## Proposito

Conduzir uma auditoria completa da presenca em redes sociais do cliente. Analisar perfis, mix de conteudo, engajamento, posicionamento e benchmarks contra concorrentes. O output e um Relatorio de Auditoria Social com plano de acao priorizado para os proximos 30 dias.

---

## Inputs

```yaml
obrigatorios:
  instagram_handle:
    field: "@ do Instagram principal"
    format: "string"
    required: true

  plataformas:
    field: "Plataformas ativas (Instagram, YouTube, TikTok, LinkedIn, Twitter/X)"
    format: "list"
    required: true

  objetivo:
    field: "Objetivo principal com redes sociais"
    format: "string"
    required: true

opcionais:
  concorrentes:
    field: "@ de 2-3 concorrentes ou referencias"
    format: "list"
    required: false

  metricas_atuais:
    field: "Seguidores, media de curtidas, media de views"
    format: "object"
    required: false

  frequencia_postagem:
    field: "Quantas vezes posta por semana atualmente"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Scan de Perfis (8 min)

Coletar dados de cada plataforma ativa:

**Perguntas ao usuario:**
1. Qual o link do seu perfil principal? (Instagram, etc.)
2. Voce tem acesso ao Instagram Insights / Analytics?
3. Ha quanto tempo publica conteudo consistentemente?
4. Ja investiu em trafego pago nas redes?

**Analise por perfil:**
- Bio: clareza, CTA, link, proposta de valor
- Visual: consistencia, qualidade, identidade
- Conteudo recente: ultimos 9-12 posts
- Highlights/destaques: organizacao e relevancia

### Step 2: Analise de Mix de Conteudo (10 min)

Classificar os ultimos 20 posts em:
- **Educativo** (ensina algo) — % do total
- **Inspiracional** (motiva, storytelling) — % do total
- **Promocional** (vende, CTA direto) — % do total
- **Entretenimento** (humor, trends, relatable) — % do total
- **Autoridade** (prova social, resultados, cases) — % do total

**Perguntas ao usuario:**
1. Qual tipo de conteudo voce sente que performa melhor?
2. Voce segue algum calendario editorial ou posta "quando da"?
3. Quanto tempo gasta por semana criando conteudo?

Identificar gaps e desequilibrios no mix.

### Step 3: Avaliacao de Engajamento (8 min)

Calcular metricas-chave:
- **Engagement Rate:** (curtidas + comentarios) / seguidores x 100
- **View Rate:** views / seguidores x 100 (Reels/Stories)
- **Save Rate:** salvamentos / alcance (indicador de valor)
- **Share Rate:** compartilhamentos / alcance (indicador de viralidade)

**Benchmarks por faixa de seguidores:**
| Seguidores | ER Bom | ER Excelente |
|-----------|--------|--------------|
| < 10K | > 3% | > 6% |
| 10-50K | > 2% | > 4% |
| 50-100K | > 1.5% | > 3% |
| > 100K | > 1% | > 2% |

Identificar os 3 melhores e 3 piores posts por engajamento.

### Step 4: Benchmark vs Concorrentes (10 min)

**Perguntas ao usuario:**
1. Quem sao seus 2-3 concorrentes diretos ou referencias que admira?
2. O que voce acha que eles fazem melhor que voce?
3. Tem algo que voce faz que eles NAO fazem?

Para cada concorrente, comparar:
- Frequencia de postagem
- Tipo de conteudo predominante
- Engagement rate estimado
- Formato mais usado (carrossel, reels, stories)
- Tom de comunicacao
- Diferenciais visiveis

### Step 5: Recomendacoes e Plano de Acao (9 min)

Gerar plano priorizado:

```
AUDITORIA SOCIAL — [nome/marca]

DIAGNOSTICO GERAL: [nota 1-10] / 10

TOP 3 PONTOS FORTES:
1. [ponto forte]
2. [ponto forte]
3. [ponto forte]

TOP 3 GAPS CRITICOS:
1. [gap] — Impacto: [Alto/Medio/Baixo]
2. [gap] — Impacto: [Alto/Medio/Baixo]
3. [gap] — Impacto: [Alto/Medio/Baixo]

PLANO DE ACAO 30 DIAS:
Semana 1: [acao prioritaria — quick win]
Semana 2: [acao de estrutura]
Semana 3: [acao de conteudo]
Semana 4: [acao de escala]

MIX IDEAL RECOMENDADO:
- Educativo: X%
- Inspiracional: X%
- Promocional: X%
- Entretenimento: X%
- Autoridade: X%

FREQUENCIA RECOMENDADA: X posts/semana
FORMATOS PRIORITARIOS: [formatos]
```

---

## Output

```yaml
file: "squads/squad-marketing/data/{slug}-social-media-audit.yaml"
format: "yaml"
conteudo:
  auditoria:
    cliente: "{nome}"
    data: "{data}"
    plataformas_analisadas:
      - plataforma: "{nome}"
        seguidores: {numero}
        engagement_rate: "{X}%"
        bio_score: "{1-10}"
        visual_score: "{1-10}"
    mix_conteudo:
      educativo: "{X}%"
      inspiracional: "{X}%"
      promocional: "{X}%"
      entretenimento: "{X}%"
      autoridade: "{X}%"
    diagnostico: "{nota 1-10}"
    gaps_criticos:
      - gap: "{descricao}"
        impacto: "alto | medio | baixo"
    plano_acao:
      semana_1: "{acao}"
      semana_2: "{acao}"
      semana_3: "{acao}"
      semana_4: "{acao}"
    proximo_passo: "content-strategy"
```

---

## Quality Gate

- [ ] Todas as plataformas ativas foram analisadas
- [ ] Mix de conteudo calculado com percentuais
- [ ] Engagement rate calculado com benchmark
- [ ] Pelo menos 2 concorrentes comparados
- [ ] Top 3 gaps criticos identificados
- [ ] Plano de acao de 30 dias com acoes semanais
- [ ] Frequencia e formatos recomendados definidos

---

## Veto Conditions

- Se cliente nao tem nenhum perfil ativo → Redirecionar para task de criacao de perfil
- Se dados de engajamento insuficientes (< 10 posts) → Fazer auditoria parcial, focar em setup
- Se cliente nao tem concorrentes claros → Usar referencias de mercado similar

---

**Task Status:** Ready for Production
