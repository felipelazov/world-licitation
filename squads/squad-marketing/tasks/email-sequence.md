# Task: Sequencia de Emails Estrategica

**Task ID:** squad-marketing/email-sequence
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 50 minutos
**Agent:** andre-chaperon

---

## Proposito

Criar uma sequencia de emails completa (welcome, lancamento ou nurture) usando a metodologia Soap Opera Sequence (SOS) e ARM (Autoresponder Madness). O output e uma sequencia de 5-7 emails com outlines de copy, subject lines, CTAs e timing de envio. Emails que constroem relacionamento antes de vender.

---

## Inputs

```yaml
obrigatorios:
  tipo_sequencia:
    field: "Tipo de sequencia (welcome, lancamento, nurture, reengajamento)"
    format: "string"
    required: true

  audiencia:
    field: "Para quem sao os emails (descricao do publico)"
    format: "string"
    required: true

  produto:
    field: "Produto/servico que sera promovido"
    format: "string"
    required: true

  tom:
    field: "Tom de comunicacao (profissional, casual, direto, storytelling)"
    format: "string"
    required: true

opcionais:
  lead_magnet:
    field: "Lead magnet que gerou o opt-in"
    format: "string"
    required: false

  preco:
    field: "Preco do produto/servico"
    format: "string"
    required: false

  urgencia:
    field: "Existe deadline real? (lancamento, vagas limitadas)"
    format: "string"
    required: false

  plataforma_email:
    field: "Ferramenta de email (ActiveCampaign, Mailchimp, ConvertKit)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Nivel de Consciencia da Audiencia (8 min)

Mapear onde a audiencia esta no Awareness Spectrum (Eugene Schwartz):

| Nivel | Descricao | Abordagem no Email |
|-------|-----------|-------------------|
| Unaware | Nao sabe que tem um problema | Storytelling sobre a dor |
| Problem Aware | Sabe do problema, nao da solucao | Agitar a dor, mostrar consequencias |
| Solution Aware | Sabe que existe solucao, nao conhece a sua | Educar sobre sua abordagem unica |
| Product Aware | Conhece seu produto, nao decidiu | Prova social, objecoes, comparacao |
| Most Aware | Pronto para comprar | Oferta direta, urgencia, garantia |

**Perguntas ao usuario:**
1. Como essa pessoa chegou na sua lista? (lead magnet, webinar, compra anterior?)
2. Essa pessoa ja conhece voce ou e contato frio?
3. Qual a principal dor/frustacao que essa pessoa tem?
4. O que essa pessoa ja tentou para resolver o problema?

### Step 2: Estrategia da Sequencia (10 min)

**Para Welcome Sequence (SOS — Soap Opera Sequence):**
```
Email 1: "O Cenario" — Historia que gera conexao + entrega lead magnet
Email 2: "O Drama" — Aprofunda a dor + backstory pessoal
Email 3: "A Epifania" — Momento de virada + framework/insight
Email 4: "A Prova" — Resultados de outras pessoas + credibilidade
Email 5: "A Oferta" — Apresentacao natural do produto
Email 6: "A Urgencia" — Deadline + escassez real
Email 7: "O Ultimo Chamado" — Ultima chance + resumo de beneficios
```

**Para Nurture Sequence (ARM — Autoresponder Madness):**
```
Email 1: "Open Loop" — Historia que abre curiosidade
Email 2: "Valor Puro" — Framework ou insight acionavel
Email 3: "Case Study" — Historia de transformacao
Email 4: "Contrarian" — Opiniao que desafia o senso comum
Email 5: "Bridge" — Conecta valor ao produto naturalmente
```

**Perguntas ao usuario:**
1. Voce tem uma historia pessoal de transformacao relacionada ao produto?
2. Tem cases/depoimentos de clientes que posso usar?
3. Qual a principal objecao que as pessoas tem antes de comprar?
4. Existe uma crenca limitante que precisa ser quebrada?

### Step 3: Outline de Cada Email (15 min)

Para cada email da sequencia, definir:

```
EMAIL {N}: "{Titulo interno}"
Timing: Dia {X} apos opt-in | Horario: {HH:MM}

Subject Line (3 opcoes):
  A: "{subject}"
  B: "{subject}"
  C: "{subject}"

Preview Text: "{preview}"

Estrutura:
  Hook (1-2 linhas): {como abre o email}
  Corpo (narrativa): {resumo do conteudo — 3-5 bullets}
  Transicao: {como conecta ao CTA}
  CTA: {acao desejada + link}

PS: {bonus, urgencia ou curiosidade extra}

Objetivo deste email: {awareness level shift esperado}
```

**Perguntas ao usuario (a cada 2-3 emails):**
1. Isso soa como voce falaria? O tom esta certo?
2. Quer adicionar alguma historia ou exemplo especifico aqui?
3. O CTA faz sentido neste ponto da sequencia?

### Step 4: Subject Lines e Timing (8 min)

**Regras para subject lines:**
- Maximo 50 caracteres (ideal 30-40)
- Sem ALL CAPS ou excesso de pontuacao
- Curiosidade > clickbait
- Personalizar com {primeiro_nome} quando relevante
- Testar emoji vs sem emoji

**Timing entre emails:**
| Tipo Sequencia | Espacamento |
|----------------|-------------|
| Welcome | Dia 0, 1, 3, 5, 7, 9, 11 |
| Lancamento | Dia 0, 1, 2, 3, 4 (acelerado) |
| Nurture | Dia 0, 3, 7, 10, 14 (relaxado) |
| Reengajamento | Dia 0, 2, 5, 10 |

**Horarios recomendados:**
- B2B: 8h-9h ou 17h-18h (terça a quinta)
- B2C: 10h-11h ou 19h-20h (qualquer dia)

### Step 5: CTAs e Metricas de Sucesso (9 min)

**CTA progressivo ao longo da sequencia:**
| Email | CTA Type | Exemplo |
|-------|----------|---------|
| 1-2 | Micro-commitment | "Responda este email" |
| 3-4 | Engajamento | "Leia este artigo" / "Assista este video" |
| 5-6 | Conversao | "Conheca o [produto]" |
| 7 | Urgencia | "Ultima chance — garanta sua vaga" |

**Metricas de sucesso por email:**
| Metrica | Meta Boa | Meta Excelente |
|---------|----------|----------------|
| Open Rate | > 30% | > 45% |
| Click Rate | > 3% | > 6% |
| Reply Rate | > 1% | > 3% |
| Unsub Rate | < 1% | < 0.5% |

---

## Output

```yaml
file: "squads/squad-marketing/data/{slug}-email-sequence.yaml"
format: "yaml"
conteudo:
  email_sequence:
    cliente: "{nome}"
    tipo: "{welcome | lancamento | nurture | reengajamento}"
    audiencia: "{descricao}"
    produto: "{produto}"
    tom: "{tom}"
    data: "{data}"
    awareness_level: "{nivel inicial da audiencia}"
    total_emails: {5-7}
    emails:
      - numero: 1
        titulo_interno: "{titulo}"
        timing: "Dia 0 — {horario}"
        subject_lines:
          - "{subject A}"
          - "{subject B}"
          - "{subject C}"
        preview_text: "{preview}"
        hook: "{abertura}"
        corpo_resumo: "{3-5 bullets do conteudo}"
        cta: "{acao + link}"
        ps: "{bonus/urgencia}"
        objetivo: "{shift de awareness esperado}"
    metricas_alvo:
      open_rate: "> 30%"
      click_rate: "> 3%"
      reply_rate: "> 1%"
    proximo_passo: "configurar-na-plataforma"
```

---

## Quality Gate

- [ ] Nivel de consciencia da audiencia mapeado
- [ ] Tipo de sequencia escolhido com justificativa
- [ ] Minimo 5 emails com outlines completos
- [ ] 3 opcoes de subject line por email
- [ ] CTAs progressivos (micro → conversao)
- [ ] Timing entre emails definido
- [ ] Tom consistente em toda a sequencia
- [ ] Metricas de sucesso definidas

---

## Veto Conditions

- Se nao tem lista de emails → Criar estrategia de captacao antes
- Se produto nao tem preco definido → Definir oferta antes da sequencia de venda
- Se audiencia e 100% fria sem lead magnet → Começar com sequencia de nurture, nao venda
- Se tom solicitado nao combina com audiencia → Alertar e sugerir ajuste

---

**Task Status:** Ready for Production
