# Task: Plano de Marketing Para Rede de Franquias

**Task ID:** franchise/franchise-marketing-plan
**Version:** 1.0.0
**Execution Type:** Interativo (50% Human / 50% Agent)
**Duration:** 60-90 minutos
**Agent:** denis-santini

---

## Proposito

Construir um Plano de Marketing completo para uma rede de franquias, abrangendo os 5 Pilares do Marketing Para Franquias, avaliacao dos 7 Franquehabitos da rede, governanca do fundo de marketing, estrategia de inauguracao de novas unidades, calendario integrado, alocacao de orcamento e KPIs. O output equilibra as necessidades do franqueador e dos franqueados, respeita a diversidade regional do Brasil e capacita a rede para execucao.

---

## Inputs

```yaml
obrigatorios:
  nome_rede:
    field: "Nome da rede de franquias"
    format: "string"
    required: true

  segmento:
    field: "Segmento de atuacao (alimentacao, servicos, varejo, educacao, saude, etc.)"
    format: "string"
    required: true

  numero_unidades:
    field: "Numero de unidades em operacao"
    format: "number"
    required: true

  regioes_atuacao:
    field: "Estados/regioes onde a rede opera"
    format: "string[]"
    required: true

  estagio_rede:
    field: "Estagio da rede (lancamento / crescimento / maturidade / revitalizacao)"
    format: "enum"
    required: true

opcionais:
  faturamento_medio_unidade:
    field: "Faturamento medio mensal por unidade"
    format: "string"
    required: false

  fundo_marketing_atual:
    field: "Percentual atual do fundo de marketing (se existir)"
    format: "string"
    required: false

  estrutura_marketing:
    field: "Quem gerencia o marketing hoje (equipe interna, agencia, franqueador sozinho)"
    format: "string"
    required: false

  plano_expansao:
    field: "Quantidade de novas unidades previstas para o periodo"
    format: "number"
    required: false

  desafios_atuais:
    field: "Principais desafios de marketing da rede"
    format: "string"
    required: false

  periodo_plano:
    field: "Periodo de vigencia do plano (anual / semestral)"
    format: "string"
    default: "anual"
    required: false
```

---

## Steps

### Step 1: Abertura e Contextualizacao (5 min)

**Tipo:** Agent (apresentacao) + Human (confirmacao)

```
Ola! Sou o Denis Santini — e nos proximos 60 a 90 minutos
vamos construir juntos o Plano de Marketing da [nome_rede].

Minha abordagem e baseada nos 5 Pilares do Marketing Para
Franquias e nos 7 Franquehabitos. Vivi os dois lados do
balcao — como franqueador e como franqueado com 13 lojas —
entao sei que marketing de rede precisa equilibrar o
institucional com o local, o padrao com a flexibilidade.

Vamos trabalhar em 8 etapas. Eu conduzo, voce valida e
complementa. No final, voce sai com um plano completo:
orcamento, calendario, governanca e KPIs.

Pronto para comecar?
```

---

### Step 2: Diagnostico da Rede pelos 5 Pilares (15 min)

**Tipo:** Interativo (Human responde, Agent diagnostica)

O agente conduz a avaliacao de cada pilar com perguntas direcionadas e atribui score de 0 a 10.

#### Pilar 1 — Fundo de Marketing

Perguntas:
1. Existe fundo de marketing formalizado? Qual o percentual sobre faturamento?
2. Como e a gestao do fundo? Existe comite de marketing com representantes dos franqueados?
3. Existe prestacao de contas do fundo? Os franqueados tem visibilidade de onde o dinheiro e aplicado?
4. Qual a satisfacao geral dos franqueados com o fundo? (Alta / Media / Baixa)
5. Como e feita a alocacao? (100% institucional? Tem parcela local? Tem reserva para inauguracoes?)

#### Pilar 2 — Marketing de Inauguracao

Perguntas:
1. Existe plano padrao de marketing de inauguracao para novas unidades?
2. O plano cobre as 3 fases? (pre-abertura, dia D, pos-abertura ate 90 dias)
3. Qual o investimento padrao de marketing por inauguracao? Quem paga? (fundo, franqueado, compartilhado)
4. As ultimas inauguracoes atingiram as metas de clientes nos primeiros 90 dias?
5. Quantas inauguracoes estao previstas para o periodo do plano?

#### Pilar 3 — Comunicacao Institucional

Perguntas:
1. A rede tem comunicacao institucional ativa? (campanhas nacionais, PR, midia)
2. Quais canais sao usados para comunicacao institucional? (TV, radio, OOH, digital, eventos)
3. Existe consistencia de marca entre todas as unidades?
4. Os franqueados se orgulham da comunicacao da rede?
5. Existe endomarketing? (comunicacao interna com franqueados e equipes)

#### Pilar 4 — Comunicacao no Ponto de Venda (PDV)

Perguntas:
1. Os materiais de PDV sao padronizados? (fachada, sinalizacao, cardapios, displays)
2. Com que frequencia os materiais sao atualizados?
3. A experiencia do cliente no PDV e consistente entre unidades? (atendimento, ambientacao, layout)
4. Os franqueados seguem o padrao visual ou ha desvios frequentes?
5. Existe verba especifica para renovacao de materiais de PDV?

#### Pilar 5 — O Papel da Internet e Redes Sociais

Perguntas:
1. A rede tem site institucional com localizador de unidades?
2. Redes sociais corporativas: quais plataformas? Qualidade do conteudo? Frequencia?
3. Quantas unidades tem Google Meu Negocio ativo e otimizado?
4. Os franqueados tem perfis locais nas redes sociais? Ha guidelines para uso da marca?
5. Existe estrategia de midia paga? (centralizada, descentralizada, hibrida)

**Output parcial:** Scorecard dos 5 Pilares

```yaml
scorecard_5_pilares:
  pilar_1_fundo: "X/10 — [observacao]"
  pilar_2_inauguracao: "X/10 — [observacao]"
  pilar_3_institucional: "X/10 — [observacao]"
  pilar_4_pdv: "X/10 — [observacao]"
  pilar_5_digital: "X/10 — [observacao]"
  score_geral: "X/10"
  pilar_prioritario: "[pilar com menor score]"
  gaps_criticos: "[lista de gaps mais urgentes]"
```

---

### Step 3: Avaliacao dos 7 Franquehabitos da Rede (10 min)

**Tipo:** Interativo (Human responde, Agent avalia)

O agente avalia o perfil GERAL dos franqueados da rede (nao individual — para auditoria individual, usar a task `*franquehabitos-audit`). A avaliacao identifica padroes de comportamento dominantes na rede que impactam a execucao do plano de marketing.

#### Habito 1 — Engajar-se com a Marca
Pergunta: "Os franqueados demonstram admiracao e orgulho pela marca? Participam de convencoes e eventos da rede?"

#### Habito 2 — Trabalhar Com e Para o Franqueador
Pergunta: "A relacao franqueador-franqueados e colaborativa? Os franqueados implementam as orientacoes da rede ou resistem?"

#### Habito 3 — Motivar e Valorizar a Equipe
Pergunta: "Os franqueados investem no time? A rotatividade nas unidades e alta, media ou baixa?"

#### Habito 4 — Procurar Solucoes, Nao Culpados
Pergunta: "Quando surgem problemas de marketing ou vendas, os franqueados buscam solucoes ou culpam a rede/mercado?"

#### Habito 5 — Desenvolver e Investir em Acoes Locais
Pergunta: "Os franqueados investem em acoes de marketing local alem do fundo? Conhecem o mercado da sua regiao? Fazem parcerias locais?"

#### Habito 6 — Investir e Reinvestir em Capacitacao
Pergunta: "Os franqueados buscam capacitacao em marketing e gestao? Participam de treinamentos da rede?"

#### Habito 7 — Pensar Grande
Pergunta: "Os franqueados tem metas ambiciosas? Planejam expansao? Buscam ser referencia na rede?"

**Output parcial:** Perfil de Franquehabitos da Rede

```yaml
perfil_franquehabitos_rede:
  habito_1_engajamento: "X/10 — [padrao observado]"
  habito_2_colaboracao: "X/10 — [padrao observado]"
  habito_3_equipe: "X/10 — [padrao observado]"
  habito_4_solucoes: "X/10 — [padrao observado]"
  habito_5_acoes_locais: "X/10 — [padrao observado]"
  habito_6_capacitacao: "X/10 — [padrao observado]"
  habito_7_pensar_grande: "X/10 — [padrao observado]"
  score_geral: "X/10"
  classificacao: "Alta Performance (>7) / Em Desenvolvimento (5-7) / Atencao (<5)"
  habitos_prioritarios: "[habitos que impactam execucao do plano]"
  implicacoes_marketing: "[como o perfil impacta o plano de marketing]"
```

**Regra:** Se o score geral dos Franquehabitos for menor que 5, o agente DEVE incluir um programa de capacitacao robusto no plano (Step 7), pois a rede nao tem maturidade para executar acoes complexas sem acompanhamento.

---

### Step 4: Governanca do Fundo de Marketing (10 min)

**Tipo:** Interativo (Agent propoe estrutura, Human valida e ajusta)

Com base no diagnostico do Pilar 1 e no perfil da rede, o agente propoe ou reestrutura a governanca do fundo.

#### 4.1 — Definicao de Contribuicao

```yaml
contribuicao:
  percentual: "X% sobre faturamento bruto mensal"
  justificativa: "[benchmark do segmento + realidade da rede]"
  base_calculo: "Faturamento bruto mensal de cada unidade"
  cobranca: "Mensal, junto com royalties"
  estimativa_arrecadacao: "R$ X/mes (baseado em {numero_unidades} unidades x faturamento medio)"
```

Perguntas de validacao:
1. O percentual proposto e viavel para a realidade financeira dos franqueados?
2. Ha resistencia esperada ao percentual? Se sim, qual o percentual de transicao?

#### 4.2 — Estrutura do Comite de Marketing

```yaml
comite_marketing:
  composicao:
    franqueador: "X representantes (marketing + diretoria)"
    franqueados: "X representantes eleitos (mandato de 2 anos)"
    convidados: "Agencia de marketing (quando aplicavel, sem voto)"
  reunioes: "Bimestral (6 reunioes/ano)"
  atribuicoes:
    - "Aprovar plano anual de marketing e orcamento"
    - "Definir alocacao institucional vs local"
    - "Acompanhar execucao e resultados mensais"
    - "Aprovar campanhas e fornecedores acima de R$ X"
    - "Avaliar e ajustar estrategia trimestralmente"
  regras:
    - "Decisoes por maioria simples"
    - "Atas registradas e compartilhadas com toda a rede"
    - "Quorum minimo: 60% dos membros"
```

#### 4.3 — Modelo de Alocacao

```yaml
alocacao:
  institucional:
    percentual: "40-50%"
    escopo: "Branding, midia nacional, PR, campanhas de awareness, endomarketing"
  digital:
    percentual: "20-30%"
    escopo: "Site, redes sociais corp, SEO, midia paga institucional, conteudo"
  acoes_locais:
    percentual: "15-25%"
    escopo: "Verba co-participativa para acoes regionais dos franqueados"
    modelo: "Franqueado solicita, comite aprova, rede co-financia 50%"
  inauguracoes:
    percentual: "5-10%"
    escopo: "Kit padrao de marketing de inauguracao para novas unidades"
  reserva:
    percentual: "3-5%"
    escopo: "Oportunidades nao planejadas, crises, sazonalidades"
```

Pergunta de validacao:
1. A alocacao proposta reflete as prioridades da rede? O que ajustaria?

#### 4.4 — Modelo de Transparencia e Prestacao de Contas

```yaml
transparencia:
  report_mensal:
    formato: "Dashboard simplificado"
    conteudo: "Receita do fundo, top 3 investimentos, resultado destaque"
    distribuicao: "Email + portal do franqueado"
  report_trimestral:
    formato: "Report completo"
    conteudo:
      - "Receita total do fundo"
      - "Despesas detalhadas por categoria"
      - "Resultados mensurados por campanha/acao"
      - "Saldo e projecao para proximo trimestre"
      - "Comparativo planejado vs executado"
    distribuicao: "Apresentacao na reuniao do comite + envio para toda rede"
  auditoria:
    frequencia: "Anual"
    escopo: "Auditoria independente das contas do fundo"
```

**Principio central:** *"O fundo pertence a REDE, nao ao franqueador. Transparencia total e a base da confianca."*

---

### Step 5: Estrategia de Marketing de Inauguracao (10 min)

**Tipo:** Interativo (Agent propoe modelo, Human ajusta para realidade da rede)

O agente constroi o modelo padrao de marketing de inauguracao da rede, cobrindo os 90 dias criticos.

#### 5.1 — Fase Pre-Abertura (60 a 30 dias antes)

```yaml
pre_abertura:
  periodo: "60 a 30 dias antes da abertura"
  acoes:
    comunicacao_em_breve:
      descricao: "Sinalizacao na fachada + anuncio nas redes sociais da rede"
      responsavel: "Franqueador (materiais) + Franqueado (instalacao)"
      investimento_estimado: "R$ X"
    construcao_audiencia_local:
      descricao: "Criacao de perfil local, campanha geolocalizada, parcerias com influenciadores regionais"
      responsavel: "Franqueado com apoio da rede"
      investimento_estimado: "R$ X"
    lista_vip:
      descricao: "Landing page ou WhatsApp para cadastro de primeiros clientes"
      responsavel: "Rede (ferramenta) + Franqueado (divulgacao)"
      investimento_estimado: "R$ X"
    relacoes_comunidade:
      descricao: "Visita a comercio vizinho, parcerias locais, contato com imprensa regional"
      responsavel: "Franqueado"
      investimento_estimado: "R$ X"
    treinamento_equipe:
      descricao: "Capacitacao da equipe em atendimento, produto e comunicacao da marca"
      responsavel: "Franqueador (conteudo) + Franqueado (execucao)"
      investimento_estimado: "Incluido no onboarding"
  meta: "[numero] cadastros de interesse antes da abertura"
```

#### 5.2 — Fase Inauguracao (Dia D + primeira semana)

```yaml
inauguracao:
  periodo: "Dia D + 7 dias"
  acoes:
    evento_inauguracao:
      descricao: "Evento de abertura com experiencia memoravel — adaptar ao perfil regional"
      responsavel: "Franqueado com apoio da rede"
      investimento_estimado: "R$ X"
    promocao_abertura:
      descricao: "Oferta especial limitada no tempo para gerar volume inicial"
      responsavel: "Rede (define) + Franqueado (executa)"
      investimento_estimado: "R$ X"
    midia_paga_intensiva:
      descricao: "Ads geolocalizados (Instagram, Google, Waze) na primeira semana"
      responsavel: "Rede (central) ou Franqueado (local com guidelines)"
      investimento_estimado: "R$ X"
    cadastro_clientes:
      descricao: "Programa de fidelidade ou cadastro desde o dia 1"
      responsavel: "Franqueado"
      investimento_estimado: "R$ X"
  meta: "[numero] atendimentos na primeira semana"
```

#### 5.3 — Fase Pos-Abertura (Dia 8 ao dia 90)

```yaml
pos_abertura:
  periodo: "Dia 8 ao dia 90"
  acoes:
    retencao:
      descricao: "Acoes de retencao dos primeiros clientes (follow-up, fidelidade, NPS)"
      responsavel: "Franqueado"
      investimento_estimado: "R$ X"
    consolidacao_digital:
      descricao: "Google Meu Negocio otimizado, incentivo a avaliacoes, midia paga de sustentacao"
      responsavel: "Franqueado com apoio da rede"
      investimento_estimado: "R$ X"
    integracao_rede:
      descricao: "Insercao gradual nas campanhas nacionais e calendario institucional"
      responsavel: "Rede"
      investimento_estimado: "Incluido no fundo"
    avaliacao_performance:
      descricao: "Report de 30/60/90 dias — performance vs metas de inauguracao"
      responsavel: "Rede + Franqueado"
      investimento_estimado: "-"
  meta: "[numero] atendimentos/mes ao final do dia 90, NPS > X"
```

Perguntas de validacao:
1. O investimento total por inauguracao e compativel com a realidade da rede?
2. Quem financia cada fase? (fundo, franqueado, compartilhado)
3. Existem particularidades regionais que impactam o modelo? (ex: inauguracao no Norte vs Sudeste)

**Principio:** *"Inauguracao nao e um dia — e um processo de 90 dias."*

---

### Step 6: Estrategia Integrada e Calendario (10 min)

**Tipo:** Agent (propoe) + Human (valida)

O agente constroi a estrategia integrada organizando as acoes por trimestre e equilibrando o institucional com o local.

#### 6.1 — Estrategia Institucional (nivel rede)

```yaml
estrategia_institucional:
  posicionamento: "[como a marca quer ser percebida pelo mercado]"
  campanhas_anuais:
    - nome: "[campanha 1]"
      periodo: "Q1"
      objetivo: "[awareness / vendas / sazonalidade]"
      canais: "[lista]"
      orcamento: "R$ X"
    - nome: "[campanha 2]"
      periodo: "Q2"
      # ...
  comunicacao_permanente:
    redes_sociais: "[frequencia, plataformas, tom]"
    pr_assessoria: "[acoes planejadas]"
    endomarketing: "[comunicacao interna]"
```

#### 6.2 — Estrategia Local (nivel unidade/regiao)

```yaml
estrategia_local:
  guidelines: "[o que e OBRIGATORIO e o que e FLEXIVEL para o franqueado]"
  toolkit_franqueado:
    - "Templates de posts para redes sociais"
    - "Banco de imagens e videos da marca"
    - "Modelos de acoes locais aprovados"
    - "Checklist de Google Meu Negocio"
    - "Script de parcerias locais"
  acoes_locais_sugeridas:
    - tipo: "Parcerias com comercio do entorno"
      frequencia: "Mensal"
      investimento: "R$ X por acao"
    - tipo: "Influenciadores regionais"
      frequencia: "Trimestral"
      investimento: "R$ X por acao"
    - tipo: "Eventos na unidade"
      frequencia: "Trimestral"
      investimento: "R$ X por acao"
    - tipo: "Acoes de bairro/comunidade"
      frequencia: "Mensal"
      investimento: "R$ X por acao"
  processo_aprovacao: "Franqueado submete proposta → Comite avalia em ate 5 dias uteis → Liberacao de co-financiamento"
```

#### 6.3 — Calendario Integrado

```yaml
calendario_integrado:
  Q1:
    institucional: "[campanhas, acoes de rede]"
    local: "[janela para acoes locais, sazonalidades regionais]"
    inauguracoes_previstas: "[numero]"
    orcamento_estimado: "R$ X"

  Q2:
    institucional: "[campanhas, acoes de rede]"
    local: "[janela para acoes locais, sazonalidades regionais]"
    inauguracoes_previstas: "[numero]"
    orcamento_estimado: "R$ X"

  Q3:
    institucional: "[campanhas, acoes de rede]"
    local: "[janela para acoes locais, sazonalidades regionais]"
    inauguracoes_previstas: "[numero]"
    orcamento_estimado: "R$ X"

  Q4:
    institucional: "[campanhas, acoes de rede]"
    local: "[janela para acoes locais, sazonalidades regionais]"
    inauguracoes_previstas: "[numero]"
    orcamento_estimado: "R$ X"
```

**Regra regional:** *"O Brasil e um pais continental e precisamos personalizar as acoes com as cores do lugar."* O calendario DEVE considerar sazonalidades regionais (Carnaval, festas juninas, datas locais) e nao apenas datas nacionais.

Perguntas de validacao:
1. O calendario respeita as sazonalidades do seu segmento?
2. Ha datas ou eventos regionais que devemos incluir?
3. O equilibrio institucional vs local esta adequado?

---

### Step 7: Programa de Capacitacao de Franqueados (5 min)

**Tipo:** Agent (propoe com base nos Franquehabitos) + Human (valida)

Com base na avaliacao dos 7 Franquehabitos (Step 3), o agente define o programa de capacitacao em marketing.

```yaml
programa_capacitacao:
  objetivo: "Capacitar franqueados para execucao eficaz do plano de marketing, tanto no institucional quanto no local"
  formato: "[webinar mensal / workshop trimestral / trilha online / mentoria em grupo]"
  temas_prioritarios:
    - tema: "[definido pelo habito mais fraco]"
      justificativa: "[por que esse tema e prioritario]"
      formato: "[tipo de capacitacao]"
      frequencia: "[mensal, trimestral]"
    # ... demais temas baseados nos gaps identificados
  temas_recorrentes:
    - "Como usar o toolkit de marketing local da rede"
    - "Google Meu Negocio: otimizacao e avaliacoes"
    - "Redes sociais: criacao de conteudo local dentro das guidelines"
    - "Como planejar e executar acoes de bairro/comunidade"
    - "Leitura de KPIs e ajuste de acoes"
  responsavel: "Departamento de marketing do franqueador"
  investimento: "Coberto pelo fundo (parcela institucional / endomarketing)"
```

**Principio:** *"O franqueado nunca esta pronto, e preciso continuar aprendendo sempre."*

---

### Step 8: KPIs e Metas (5 min)

**Tipo:** Interativo (Agent propoe metricas, Human define metas numericas)

#### 8.1 — KPIs da Rede (Macro)

```yaml
kpis_rede:
  - nome: "Score Geral dos 5 Pilares"
    meta: "Atingir X/10 ao final do periodo (hoje: Y/10)"
    medicao: "Diagnostico semestral"

  - nome: "Satisfacao dos franqueados com o fundo de marketing"
    meta: "NPS > X"
    medicao: "Pesquisa trimestral"

  - nome: "Taxa de aderencia ao padrao de marca"
    meta: "> X% das unidades em conformidade"
    medicao: "Auditoria de PDV semestral"

  - nome: "Performance media de inauguracao (primeiros 90 dias)"
    meta: "X% das novas unidades atingindo meta de faturamento do dia 90"
    medicao: "Report por inauguracao"
```

#### 8.2 — KPIs por Unidade (Micro)

```yaml
kpis_unidade:
  - nome: "Faturamento mensal"
    meta: "R$ X/mes (media da rede + crescimento)"
    medicao: "Mensal"

  - nome: "Ticket medio"
    meta: "R$ X"
    medicao: "Mensal"

  - nome: "Avaliacoes no Google"
    meta: "Minimo X avaliacoes com nota media >= Y"
    medicao: "Mensal"

  - nome: "Acoes locais realizadas"
    meta: "Minimo X acoes/trimestre"
    medicao: "Trimestral"

  - nome: "NPS da unidade"
    meta: "> X"
    medicao: "Trimestral"
```

#### 8.3 — KPIs do Fundo de Marketing

```yaml
kpis_fundo:
  - nome: "Taxa de execucao do orcamento"
    meta: "> 90% do planejado executado"
    medicao: "Trimestral"

  - nome: "Retorno sobre investimento do fundo"
    meta: "Crescimento de X% no faturamento da rede atribuivel a acoes do fundo"
    medicao: "Semestral"

  - nome: "Indice de transparencia"
    meta: "100% dos reports entregues no prazo"
    medicao: "Mensal"
```

#### 8.4 — KPIs Digitais

```yaml
kpis_digitais:
  - nome: "% de unidades com Google Meu Negocio ativo e otimizado"
    meta: "> X%"
    medicao: "Mensal"

  - nome: "Engajamento das redes sociais corporativas"
    meta: "Taxa de engajamento > X%"
    medicao: "Mensal"

  - nome: "Trafego do site institucional"
    meta: "X visitas/mes com Y% de conversao no localizador"
    medicao: "Mensal"

  - nome: "Nota media Google das unidades"
    meta: "> X estrelas"
    medicao: "Mensal"
```

Perguntas de validacao:
1. As metas numericas sao realistas para o estagio atual da rede?
2. Ha KPIs especificos do segmento que devemos incluir?
3. Quem sera responsavel pela coleta e acompanhamento de cada KPI?

---

### Step 9: Consolidacao e Entrega (5 min)

**Tipo:** Agent (consolida) + Human (aprova)

O agente consolida todos os outputs em um Plano de Marketing unico:

```
[Nome da rede], aqui esta o seu Plano de Marketing completo.

RESUMO EXECUTIVO:
- Diagnostico: [score geral 5 Pilares] — Pilar prioritario: [nome]
- Franquehabitos da rede: [score geral] — [classificacao]
- Fundo de marketing: [percentual]% = R$ [valor]/mes
- Inauguracoes no periodo: [numero] unidades
- Investimento total planejado: R$ [valor] no periodo
- Pilar de maior oportunidade: [nome do pilar]

PROXIMOS PASSOS:
1. Aprovar regimento do fundo de marketing (se novo/reestruturado)
2. Eleger comite de marketing
3. Comunicar plano para toda a rede
4. Iniciar programa de capacitacao
5. Executar calendario Q1

"Franqueado de alta performance e aquele que caminha, sonha
e constroi junto com a franqueadora." Agora e hora de
caminhar juntos.
```

---

## Output

```yaml
file: "squads/franchise/data/planos/{slug}-marketing-plan.yaml"
format: "yaml"
conteudo:
  plano_marketing:
    rede: "{nome_rede}"
    segmento: "{segmento}"
    unidades: {numero_unidades}
    regioes: "{regioes_atuacao}"
    estagio: "{estagio_rede}"
    periodo: "{periodo_plano}"
    data_criacao: "{data}"

    diagnostico_5_pilares:
      pilar_1_fundo:
        score: "X/10"
        gaps: "[lista]"
        acoes: "[lista]"
      pilar_2_inauguracao:
        score: "X/10"
        gaps: "[lista]"
        acoes: "[lista]"
      pilar_3_institucional:
        score: "X/10"
        gaps: "[lista]"
        acoes: "[lista]"
      pilar_4_pdv:
        score: "X/10"
        gaps: "[lista]"
        acoes: "[lista]"
      pilar_5_digital:
        score: "X/10"
        gaps: "[lista]"
        acoes: "[lista]"
      score_geral: "X/10"
      pilar_prioritario: "[nome]"

    perfil_franquehabitos:
      habito_1_engajamento: "X/10"
      habito_2_colaboracao: "X/10"
      habito_3_equipe: "X/10"
      habito_4_solucoes: "X/10"
      habito_5_acoes_locais: "X/10"
      habito_6_capacitacao: "X/10"
      habito_7_pensar_grande: "X/10"
      score_geral: "X/10"
      classificacao: "[Alta Performance / Em Desenvolvimento / Atencao]"

    governanca_fundo:
      percentual: "X%"
      arrecadacao_estimada: "R$ X/mes"
      comite: "{estrutura}"
      alocacao:
        institucional: "X%"
        digital: "X%"
        acoes_locais: "X%"
        inauguracoes: "X%"
        reserva: "X%"
      prestacao_contas: "{modelo}"

    marketing_inauguracao:
      investimento_por_unidade: "R$ X"
      financiamento: "{modelo}"
      fases:
        pre_abertura: "{resumo acoes}"
        inauguracao: "{resumo acoes}"
        pos_abertura: "{resumo acoes}"
      metas_90_dias: "{metas}"

    estrategia_institucional:
      posicionamento: "{descricao}"
      campanhas: "[lista por trimestre]"
      canais: "[lista]"
      orcamento: "R$ X"

    estrategia_local:
      guidelines: "{resumo}"
      toolkit: "[lista]"
      acoes_sugeridas: "[lista]"
      orcamento_por_unidade: "R$ X"

    calendario_integrado:
      q1: "{resumo}"
      q2: "{resumo}"
      q3: "{resumo}"
      q4: "{resumo}"

    capacitacao:
      programa: "{descricao}"
      temas_prioritarios: "[lista]"
      frequencia: "{descricao}"

    kpis:
      rede: "[lista de KPIs com metas]"
      unidade: "[lista de KPIs com metas]"
      fundo: "[lista de KPIs com metas]"
      digital: "[lista de KPIs com metas]"

    orcamento_total:
      fundo_anual: "R$ X"
      inauguracoes: "R$ X"
      capacitacao: "R$ X"
      total: "R$ X"

    proximos_passos:
      - "{acao 1 com prazo}"
      - "{acao 2 com prazo}"
      - "{acao 3 com prazo}"
```

---

## Quality Gate: QG-FR-001

- [ ] Diagnostico dos 5 Pilares completo com score e gap analysis para cada pilar
- [ ] 7 Franquehabitos avaliados com score e implicacoes para o plano
- [ ] Fundo de marketing estruturado com governanca (comite, regimento, prestacao de contas)
- [ ] Alocacao do fundo definida (institucional / digital / local / inauguracoes / reserva)
- [ ] Modelo de marketing de inauguracao com as 3 fases (pre-abertura, dia D, pos-abertura)
- [ ] Estrategia equilibra institucional e local com guidelines claros
- [ ] Calendario integrado cobrindo 4 trimestres
- [ ] Regionalizacao considerada (Brasil como pais continental)
- [ ] Programa de capacitacao de franqueados definido
- [ ] KPIs mensurabeis por pilar, por unidade, do fundo e digitais
- [ ] Orcamento total com alocacao por categoria
- [ ] Proximos passos com prazos definidos

---

## Veto Conditions

Condicoes que IMPEDEM a finalizacao do plano — o agente DEVE interromper e resolver antes de prosseguir:

### Veto 1: Dados Insuficientes da Rede
- **Gatilho:** Numero de unidades, regioes de atuacao ou segmento nao informados
- **Acao:** Coletar dados obrigatorios antes de iniciar diagnostico. *"Diagnostico sem dados e achismo."*

### Veto 2: Fundo Sem Governanca
- **Gatilho:** Plano recomenda cobranca de fundo de marketing sem definir comite, regimento e prestacao de contas
- **Acao:** Estruturar governanca completa. *"Fundo sem governanca e receita para revolta."*

### Veto 3: Marketing 100% Centralizado
- **Gatilho:** Plano concentra todas as decisoes e execucao no franqueador sem participacao dos franqueados
- **Acao:** Incluir mecanismos de participacao (comite, acoes locais, toolkit). *"Nem franqueador nem franqueado devem dominar a alocacao."*

### Veto 4: Ignorar Diversidade Regional
- **Gatilho:** Plano propoe acoes identicas para todas as regioes sem considerar adaptacao local
- **Acao:** Incluir janelas para regionalizacao e guidelines para adaptacao. *"O Brasil e um pais continental."*

### Veto 5: Inauguracao como Evento de 1 Dia
- **Gatilho:** Marketing de inauguracao cobre apenas o dia de abertura
- **Acao:** Expandir para o modelo completo de 90 dias (pre-abertura, dia D, pos-abertura). *"Inauguracao nao e um dia — e um processo de 90 dias."*

### Veto 6: Franqueado Tratado Apenas como Executor
- **Gatilho:** Plano nao inclui capacitacao de franqueados nem incentivo a acoes locais
- **Acao:** Incluir programa de capacitacao e mecanismos de empoderamento local. *"Franqueado de alta performance investe em acoes locais."*

### Veto 7: KPIs Ausentes ou Nao Mensurabeis
- **Gatilho:** Plano nao define metricas de sucesso ou define metricas vagas ("melhorar o marketing")
- **Acao:** Definir KPIs especificos com meta numerica, responsavel e frequencia de medicao

### Veto 8: Desequilibrio Franqueador-Franqueado
- **Gatilho:** Plano beneficia claramente apenas um lado (franqueador OU franqueado)
- **Acao:** Revisar para garantir equilibrio. *"Marketing de franquia e sobre a REDE, nao sobre o franqueador ou o franqueado individualmente."*

---

## Handoffs

| Para | Quando | Contexto |
|------|--------|----------|
| @greg-nathan | Diagnostico revela conflito profundo na relacao franqueador-franqueado que impede execucao do plano | E-Factor, 6-Stage Model |
| @scott-greenberg | Franquehabitos revelam problemas de lideranca e mindset que vao alem de marketing | Wealthy Franchisee, 30-Second Leadership |
| @joe-mathews | Plano identifica necessidade de gerar leads para venda de novas franquias | KASH Model, Tipping Point |
| @michael-gerber | PDV requer sistematizacao de operacoes para suportar a experiencia de marca | E-Myth, Franchise Prototype |
| @marcelo-cherto | Aspectos legais do fundo de marketing ou da COF precisam de revisao | Lei de Franquias 13.966/2019 |
| Design Squad (@marty-neumeier) | Identidade visual da rede precisa de trabalho antes de executar comunicacao institucional | Brand Gap, Zag |

---

**Task Status:** Ready for Production
