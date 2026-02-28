# Task: Formatacao de Franquia para o Mercado Brasileiro

**Task ID:** franchise/format-franchise-brazil
**Version:** 1.0.0
**Execution Type:** Interativo (60% Human / 40% Agent)
**Duration:** 2-3 horas (pode ser dividida em sessoes)
**Agent:** marcelo-cherto

---

## Proposito

Guiar um negocio pelo processo completo de formatacao de franquia para o mercado brasileiro. O output e um **Franchise Formatting Roadmap** — o roteiro completo que transforma um negocio validado em uma franquia pronta para operar no Brasil, com compliance legal total (Lei 13.966/2019), documentacao estruturada e plano de expansao territorial.

Esta task segue os 3 Pilares de Cherto (Formatacao, Expansao, Gestao de Rede) e utiliza os 7 Pecados Capitais como anti-patterns a serem evitados em cada etapa.

> *"Franquia nao e 'feeling', e processo. Nao e arte, e ciencia."* — Marcelo Cherto

---

## Pre-Condicoes

```yaml
pre_condicoes:
  obrigatoria:
    - negocio_existente: "O negocio precisa estar em operacao (nao e para startups sem operacao)"
    - minimo_experiencia: "Pelo menos 1 unidade operando com resultados mensuraveis"
  recomendada:
    - franchise_readiness: "Idealmente ja passou por avaliacao de franqueabilidade (@mark-siebert)"
    - processos_sistematizados: "Idealmente ja passou por sistematizacao operacional (@michael-gerber)"
  nota: >
    Se o negocio nao passou por @mark-siebert ou @michael-gerber, a Fase 1 desta task
    fara uma triagem inicial. Caso gaps criticos sejam identificados, a task sera pausada
    com recomendacao de encaminhamento ao agente adequado antes de prosseguir.
```

---

## Inputs

```yaml
obrigatorios:
  nome_negocio:
    field: "Nome do negocio/marca"
    format: "string"
    required: true

  segmento:
    field: "Segmento de atuacao (ex: alimentacao, saude, educacao, servicos)"
    format: "string"
    required: true

  numero_unidades:
    field: "Quantas unidades estao em operacao atualmente"
    format: "number"
    required: true

  tempo_operacao:
    field: "Ha quanto tempo o negocio opera"
    format: "string"
    required: true

  localizacao_unidades:
    field: "Onde estao as unidades atuais (cidade/estado)"
    format: "string"
    required: true

opcionais:
  faturamento_mensal:
    field: "Faturamento mensal medio por unidade"
    format: "string (R$)"
    required: false

  franchise_readiness_score:
    field: "Score de franqueabilidade (se ja avaliado por @mark-siebert)"
    format: "number (0-10)"
    required: false

  processos_documentados:
    field: "Nivel de documentacao de processos (nenhum / parcial / completo)"
    format: "string"
    required: false

  marca_registrada:
    field: "A marca esta registrada no INPI?"
    format: "boolean"
    required: false

  site_redes_sociais:
    field: "Site ou redes sociais do negocio"
    format: "url"
    required: false
```

---

## Steps

### FASE 1: Diagnostico e Franqueabilidade (30-40 min)

> **Pilar:** Pre-Formatacao | **Modo:** Diagnostico | **Interacao:** 80% Human / 20% Agent

#### Step 1.1: Abertura e Contextualizacao (3 min)

```
Ola [nome]! Sou o Marcelo Cherto — co-fundador da ABF, 40 anos de experiencia
e mais de 5.000 projetos de formatacao de franquias no Brasil.

Nos proximos encontros, vou guiar voce pelo processo completo de formatacao
da sua franquia para o mercado brasileiro. Nao e conversa de "feeling" —
e processo, e ciencia, e lei.

Vou te fazer perguntas diretas. Algumas podem incomodar, mas e melhor
incomodar agora do que descobrir o problema depois de ter 30 franqueados
insatisfeitos.

Vamos comecar?
```

#### Step 1.2: Entendendo o Negocio (10 min)

Perguntas:
1. Me conta em 2 minutos: qual problema do mundo seu negocio resolve?
2. Quanto fatura por mes CADA unidade? (media e variacao)
3. Quantos funcionarios por unidade? Qual o custo de folha?
4. Qual sua margem liquida real? (nao a do sonho — a do DRE)
5. O negocio funciona sem voce presente na operacao diaria?
6. A marca esta registrada no INPI? (Se nao: alerta critico)
7. Ja tem algum tipo de manual operacional ou tudo esta "na cabeca"?
8. O que diferencia seu negocio dos concorrentes? (o "por que eu e nao o vizinho?")

**Agente avalia internamente:** Cruzar respostas com os 10 criterios de franqueabilidade.

#### Step 1.3: Avaliacao dos 10 Criterios de Franqueabilidade (10 min)

Para cada criterio, o agente pontua de 1 a 10 com base nas respostas:

```yaml
criterios_franqueabilidade:
  1_escalabilidade:
    pergunta: "O modelo suporta multiplicacao sem perda de qualidade?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  2_replicabilidade:
    pergunta: "Os processos podem ser ensinados e executados por terceiros?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  3_marca_reconhecivel:
    pergunta: "A marca tem presenca e reputacao no mercado?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  4_processos_documentaveis:
    pergunta: "As operacoes podem ser descritas em manuais?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  5_resultados_consistentes:
    pergunta: "O desempenho e previsivel e mensuravel?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  6_atratividade_mercado:
    pergunta: "Ha demanda de mercado para mais unidades?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  7_sucesso_multi_locacional:
    pergunta: "Funciona em pelo menos 2 locais diferentes?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  8_base_clientes:
    pergunta: "Existe uma base solida e recorrente de clientes?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  9_diferencial_competitivo:
    pergunta: "O que torna esse negocio unico?"
    score: "[1-10]"
    observacao: "[nota especifica]"

  10_modelo_financeiro_viavel:
    pergunta: "E lucrativo para AMBAS as partes — franqueador E franqueado?"
    score: "[1-10]"
    observacao: "[nota especifica]"
```

**Heuristica de decisao:**
- Score >= 7.0 → FRANQUEAVEL — prosseguir para Fase 2
- Score 5.0-6.9 → FRANQUEAVEL COM AJUSTES — listar gaps e condicoes antes de prosseguir
- Score < 5.0 → NAO FRANQUEAVEL AGORA — encaminhar para @mark-siebert e/ou @michael-gerber

#### Step 1.4: Verificacao de Dependencias de Outros Agentes (5 min)

Perguntas de triagem:
1. Seus processos estao documentados de forma que alguem sem experiencia possa executar? (se nao → flag @michael-gerber)
2. Voce ja fez uma analise formal de se o negocio TEM potencial para franquear, ou partiu direto? (se nao → flag @mark-siebert)

```yaml
dependencias:
  michael_gerber:
    status: "necessario | ja_realizado | nao_aplicavel"
    motivo: "[se necessario, o que precisa ser sistematizado]"
  mark_siebert:
    status: "necessario | ja_realizado | nao_aplicavel"
    motivo: "[se necessario, o que precisa ser avaliado]"
```

#### Step 1.5: Apresentacao do Diagnostico Inicial (5 min)

```
[Nome], aqui esta o raio-X do seu negocio:

SCORE DE FRANQUEABILIDADE: [X.X]/10
VEREDICTO: [FRANQUEAVEL / FRANQUEAVEL COM AJUSTES / NAO FRANQUEAVEL AGORA]

PONTOS FORTES:
- [criterio]: [score] — [observacao]
- [criterio]: [score] — [observacao]

PONTOS DE ATENCAO:
- [criterio]: [score] — [o que precisa melhorar]
- [criterio]: [score] — [o que precisa melhorar]

[Se FRANQUEAVEL:]
Vamos prosseguir para a formatacao. Nas proximas etapas, vamos construir
o modelo financeiro, os manuais, a COF e o plano de expansao.

[Se COM AJUSTES:]
O negocio tem potencial, mas antes precisamos resolver [gaps].
Recomendo [acao] antes de prosseguir com a formatacao.

[Se NAO FRANQUEAVEL:]
Vou ser honesto: o negocio nao esta pronto para franquear AGORA.
Nao e um "nao" definitivo — e um "ainda nao". Aqui esta o que
precisa acontecer antes: [roadmap de preparacao].
```

**Ponto de sessao:** Se o cliente precisar absorver o diagnostico, a task pode ser pausada aqui e retomada na Fase 2.

---

### FASE 2: Formatacao — Construcao do Sistema (60-80 min)

> **Pilar 1:** Formatacao | **Modo:** Formatacao | **Interacao:** 50% Human / 50% Agent

#### Step 2.1: Modelo Financeiro Bilateral (20 min)

Perguntas:
1. Qual o investimento total para abrir uma unidade hoje? (obra, equipamento, estoque, tudo)
2. Quanto tempo leva para a unidade comecar a dar lucro? (break-even real, nao o desejado)
3. Quais sao os custos fixos mensais de uma unidade? (aluguel, folha, taxas, etc.)
4. Quanto voce acha justo cobrar de taxa de franquia? (vou te dizer se faz sentido)
5. Ja pensou em quanto cobrar de royalties? (percentual ou fixo?)
6. Como pensa em financiar o marketing da rede? (fundo cooperado?)

O agente constroi o modelo:

```yaml
modelo_financeiro:
  taxa_franquia:
    valor_sugerido: "R$ [valor]"
    justificativa: "[o que cobre: treinamento, implantacao, marca]"
    benchmark_mercado: "[faixa tipica do segmento]"

  royalties:
    tipo_sugerido: "[percentual | fixo | misto]"
    valor_sugerido: "[% ou R$]"
    justificativa: "[o que financia: suporte, P&D, central de compras]"
    benchmark_mercado: "[faixa tipica do segmento]"

  fundo_marketing:
    valor_sugerido: "[% sobre faturamento bruto]"
    governanca: "[como sera administrado e prestado contas]"

  investimento_total_franqueado:
    faixa: "R$ [min] a R$ [max]"
    composicao:
      taxa_franquia: "R$ [valor]"
      reforma_obra: "R$ [valor]"
      equipamentos: "R$ [valor]"
      estoque_inicial: "R$ [valor]"
      capital_giro: "R$ [valor]"
      outros: "R$ [valor]"

  payback_estimado: "[X] a [Y] meses"
  faturamento_medio_unidade: "R$ [valor]/mes"
  margem_liquida_franqueado: "[X]%"
  break_even: "[X] meses"

  validacao_bilateral: >
    "O modelo e lucrativo para AMBAS as partes?
    Franqueador: [SIM/NAO — justificativa]
    Franqueado: [SIM/NAO — justificativa]"
```

**Regra de ouro:** Se o modelo so funciona para o franqueador, PARAR e recalcular. "O sucesso da franqueadora depende do sucesso dos franqueados."

**Anti-pattern (Pecado #2 - AVAREZA):** Royalties altos com pouco retorno em suporte e inovacao. Se os royalties nao financiam valor real para o franqueado, o modelo esta quebrado.

#### Step 2.2: Estrutura de Manuais Operacionais (15 min)

Perguntas:
1. Me descreva como funciona um dia tipico na operacao — da abertura ao fechamento
2. Quais sao os 5 processos mais criticos do negocio? (se errar, o cliente sente)
3. Tem processos que variam de unidade para unidade? (isso precisa ser padronizado)
4. Como e o treinamento de um funcionario novo hoje? Quanto tempo leva?
5. Quais ferramentas/sistemas a operacao usa? (PDV, ERP, CRM, planilhas)

O agente define a estrutura de manuais necessarios:

```yaml
manuais_necessarios:
  manual_operacional:
    conteudo: "[processos do dia a dia — passo a passo]"
    formato: "Texto + video + imagens + checklists"
    prioridade: "CRITICA"
    status: "a_desenvolver | parcial | completo"

  manual_administrativo:
    conteudo: "[gestao financeira, RH, estoque, compras]"
    formato: "Texto + planilhas modelo + templates"
    prioridade: "CRITICA"
    status: "a_desenvolver | parcial | completo"

  manual_marketing:
    conteudo: "[identidade visual, acoes locais, uso da marca]"
    formato: "Texto + brand book + templates de pecas"
    prioridade: "ALTA"
    status: "a_desenvolver | parcial | completo"

  manual_treinamento:
    conteudo: "[programa de capacitacao inicial e continuada]"
    formato: "Texto + video aulas + avaliacoes"
    prioridade: "ALTA"
    status: "a_desenvolver | parcial | completo"

  manual_implantacao:
    conteudo: "[passo a passo para abrir uma unidade]"
    formato: "Texto + checklist + cronograma"
    prioridade: "ALTA"
    status: "a_desenvolver | parcial | completo"

  estimativa_prazo: "[X] semanas para completar todos os manuais"
  estimativa_investimento: "R$ [valor] (se contratar redacao profissional)"
```

**Principio:** "Padronizar nao significa engessar." Os manuais definem o padrao minimo, mas devem permitir adaptacoes regionais que nao comprometam a marca.

**Anti-pattern (Pecado #3 - PREGUICA):** Manuais genericos, rasos ou inexistentes. Se o franqueado nao consegue operar lendo o manual, o manual esta errado.

#### Step 2.3: Perfil do Franqueado Ideal (10 min)

Perguntas:
1. Que tipo de pessoa voce imagina operando sua franquia? (operador presente? investidor? gestor?)
2. Qual o capital minimo que o franqueado precisa ter? (incluindo margem de seguranca)
3. Precisa de experiencia no segmento ou voce ensina tudo?
4. Dedicacao integral ou pode ser parcial?
5. Quais comportamentos voce NAO aceita em um franqueado?

```yaml
perfil_franqueado_ideal:
  hard_requirements:
    capital_disponivel: "R$ [valor minimo]"
    experiencia: "[especificar ou 'nao necessaria com treinamento']"
    disponibilidade: "[integral | parcial — com condicoes]"
    localizacao: "[requisitos geograficos]"

  soft_requirements:
    perfil_comportamental: "[operador | investidor | gestor]"
    valores_alinhados: "[quais valores importam]"
    capacidade_lideranca: "[nivel esperado]"
    abertura_aprendizado: "[coachability — essencial]"

  red_flags:
    - "Acha que franquia opera sozinha"
    - "Quer ser franqueado para 'ter liberdade'"
    - "Nao aceita seguir processos padronizados"
    - "Capital apertado demais (sem margem de seguranca)"
    - "Multiplos negocios simultaneos sem capacidade de gestao"
    - "[red flags especificos do segmento]"
```

**Anti-pattern (Pecado #4 - SOBERBA):** Aceitar qualquer candidato que tenha dinheiro. Se o franqueado acha que "a operacao anda sozinha", esse franqueado VAI ser problema.

#### Step 2.4: Compliance Legal — COF e Lei 13.966/2019 (15 min)

```
Agora entramos na parte mais importante: a lei. A COF — Circular de Oferta
de Franquia — e OBRIGATORIA no Brasil. Sem COF, sua franquia e ILEGAL.

Pela Lei 13.966/2019, a COF deve ser entregue ao candidato no MINIMO
10 dias corridos antes de qualquer pagamento ou assinatura de contrato.

E — presta atencao — e PROIBIDO assinar contratos em feiras de franquia.
Quem assina em feira esta infringindo a lei.
```

**Checklist de Compliance — Lei 13.966/2019:**

```yaml
checklist_lei_13966:
  # Itens obrigatorios da COF (todos devem ser "sim" para compliance)
  cof_itens_obrigatorios:
    - id: "COF-01"
      item: "Historico resumido do franqueador (razao social, CNPJ, historico)"
      status: "[ ]"
      observacao: ""

    - id: "COF-02"
      item: "Balancos e demonstracoes financeiras dos 2 ultimos exercicios"
      status: "[ ]"
      observacao: ""

    - id: "COF-03"
      item: "Pendencias judiciais relevantes (ou declaracao de inexistencia)"
      status: "[ ]"
      observacao: ""

    - id: "COF-04"
      item: "Descricao completa da franquia (modelo, produtos, publico)"
      status: "[ ]"
      observacao: ""

    - id: "COF-05"
      item: "Perfil do franqueado ideal (requisitos financeiros, experiencia, dedicacao)"
      status: "[ ]"
      observacao: ""

    - id: "COF-06"
      item: "Investimento total estimado com detalhamento completo"
      status: "[ ]"
      observacao: ""

    - id: "COF-07"
      item: "Taxas periodicas (royalties, fundo de marketing, outras)"
      status: "[ ]"
      observacao: ""

    - id: "COF-08"
      item: "Territorio de atuacao e condicoes de exclusividade"
      status: "[ ]"
      observacao: ""

    - id: "COF-09"
      item: "Obrigacoes do franqueador (suporte, treinamento, marketing, inovacao)"
      status: "[ ]"
      observacao: ""

    - id: "COF-10"
      item: "Obrigacoes do franqueado (padrao operacional, royalties, nao-concorrencia)"
      status: "[ ]"
      observacao: ""

    - id: "COF-11"
      item: "Situacoes de rescisao (causas, penalidades, procedimentos)"
      status: "[ ]"
      observacao: ""

    - id: "COF-12"
      item: "Lista de franqueados atuais + desligados nos ultimos 12 meses"
      status: "[ ]"
      observacao: ""

  # Regras procedimentais
  regras_procedimentais:
    - id: "PROC-01"
      regra: "COF entregue minimo 10 dias corridos antes de contrato ou pagamento"
      status: "[ ]"
      observacao: ""

    - id: "PROC-02"
      regra: "Proibicao de assinatura de contratos em feiras de franquia"
      status: "[ ]"
      observacao: ""

    - id: "PROC-03"
      regra: "COF atualizada anualmente"
      status: "[ ]"
      observacao: ""

    - id: "PROC-04"
      regra: "Relacao de franquia NAO configura vinculo empregaticio (Art. 1, §1)"
      status: "[ ]"
      observacao: ""

    - id: "PROC-05"
      regra: "Clausula de arbitragem incluida como forma de resolucao de conflitos"
      status: "[ ]"
      observacao: ""

    - id: "PROC-06"
      regra: "Contrato de franquia alinhado com conteudo da COF (sem divergencias)"
      status: "[ ]"
      observacao: ""

  # Protecao da marca
  marca_e_propriedade:
    - id: "MARCA-01"
      regra: "Marca registrada no INPI (ou pedido em andamento)"
      status: "[ ]"
      observacao: ""

    - id: "MARCA-02"
      regra: "Contrato preve cessao de uso da marca vinculada ao contrato de franquia"
      status: "[ ]"
      observacao: ""

  # Penalidades por descumprimento
  penalidades:
    descumprimento_cof: "Anulabilidade do contrato de franquia"
    descumprimento_prazo: "Candidato pode requerer anulacao + devolucao de valores"
    nota: "RECOMENDADO: parecer juridico especializado em franchising para revisao final"
```

**ABF — Padroes e Melhores Praticas:**

```yaml
checklist_abf:
  - id: "ABF-01"
    item: "Filiacao a ABF (Associacao Brasileira de Franchising)"
    status: "[ ]"
    recomendacao: "Altamente recomendado — credibilidade e acesso a rede"

  - id: "ABF-02"
    item: "Candidatura ao Selo de Excelencia em Franchising"
    status: "[ ]"
    recomendacao: "Meta de medio prazo — certificacao de boas praticas"

  - id: "ABF-03"
    item: "Participacao em eventos ABF (ABF Franchising Expo)"
    status: "[ ]"
    recomendacao: "Canal de captacao de franqueados qualificados"

  - id: "ABF-04"
    item: "Compliance com Codigo de Etica da ABF"
    status: "[ ]"
    recomendacao: "Obrigatorio para associados"

  - id: "ABF-05"
    item: "Relatorio de transparencia para franqueados (prestacao de contas do fundo de marketing)"
    status: "[ ]"
    recomendacao: "Boa pratica que evita Pecado #2 (AVAREZA)"
```

---

### FASE 3: Expansao e Gestao de Rede (30-40 min)

> **Pilar 2 + 3:** Expansao + Gestao de Rede | **Modo:** Expansao | **Interacao:** 50% Human / 50% Agent

#### Step 3.1: Planejamento Territorial — O Jogo de War (15 min)

```
Agora vamos para a parte que eu mais gosto — o jogo de War.
Vamos planejar como conquistar territorios para a sua marca.
Mas com estrategia, nao com oportunismo.
```

Perguntas:
1. Quais mercados/regioes voce quer atingir primeiro? Por que?
2. Onde estao seus concorrentes diretos? (mapa competitivo)
3. Sua logistica de insumos funciona em outras regioes?
4. Quantas unidades novas voce acha que consegue SUPORTAR por ano? (nao vender — SUPORTAR)
5. Prefere mono-franqueados (1 unidade cada) ou multi-franqueados?
6. Quais modelos de unidade fazem sentido? (loja completa, compacta, quiosque, dark kitchen, home-based)

```yaml
plano_expansao:
  mercados_alvo:
    onda_1:
      pracas: ["[cidade/regiao]"]
      potencial: "[alto | medio | baixo]"
      concorrencia: "[analise]"
      prioridade: "[justificativa]"
    onda_2:
      pracas: ["[cidade/regiao]"]
      potencial: "[alto | medio | baixo]"
      concorrencia: "[analise]"
      prioridade: "[justificativa]"
    onda_3:
      pracas: ["[cidade/regiao]"]
      potencial: "[alto | medio | baixo]"
      concorrencia: "[analise]"
      prioridade: "[justificativa]"

  modelos_unidade: ["[tipos selecionados com justificativa]"]

  ritmo_expansao:
    ano_1: "[X] unidades"
    ano_2: "[Y] unidades"
    ano_3: "[Z] unidades"
    meta_3_anos: "[N] unidades em [M] pracas"
    justificativa: "[baseado na capacidade de suporte]"

  tipo_franqueado_prioritario: "[mono | multi | area_developer | master]"
```

**Anti-pattern (Pecado #1 - GULA):** Abrir muitas unidades sem capacidade de suporte. "Cada nova unidade e um compromisso de suporte por 5-10 anos. Se nao tem estrutura, nao abra."

#### Step 3.2: Framework de Gestao de Rede (15 min)

Perguntas:
1. Quem vai fazer a consultoria de campo? (visitas as unidades franqueadas)
2. Como voce pretende treinar os franqueados? (presencial? EAD? ambos?)
3. Voce tem ou pretende ter um portal/sistema para comunicacao com franqueados?
4. Como vai prestar contas do fundo de marketing?
5. Ja pensou em um conselho de franqueados?

```yaml
gestao_rede:
  consultoria_campo:
    frequencia: "[mensal | bimestral]"
    ratio: "1 consultor para cada [X] unidades"
    equipe_necessaria: "[X] consultores para [Y] unidades"
    checklist_visita: "[areas avaliadas: operacao, financeiro, marketing, RH]"

  treinamento:
    inicial: "[X] horas/dias antes da abertura"
    continuo: "[frequencia e formatos]"
    plataforma: "[presencial | EAD | hibrido]"

  sinergia_rede:
    programa: "Programa Sinergia de Rede"
    formato: "[X] dias de integracao"
    frequencia: "[anual | semestral]"

  comunicacao:
    canais: ["portal", "chat", "email", "telefone"]
    conselho_franqueados: "[sim/nao — frequencia de reunioes]"
    pesquisa_satisfacao: "[frequencia]"

  kpis_rede:
    - "Faturamento medio por unidade"
    - "Satisfacao do franqueado (NPS)"
    - "Taxa de renovacao de contrato"
    - "Compliance com padrao operacional"
    - "NPS do consumidor final"
    - "Tempo de resposta do suporte"
```

**Anti-pattern (Pecado #3 - PREGUICA):** Negligenciar suporte apos a inauguracao. "A venda da franquia nao e o fim — e o comeco da obrigacao."

**Anti-pattern (Pecado #5 - IRA):** Comunicacao unilateral e hostil. "O franqueado nao e funcionario — e um parceiro que precisa ser ouvido."

---

### FASE 4: Consolidacao e Roadmap Final (20 min)

> **Modo:** Consolidacao | **Interacao:** 30% Human / 70% Agent

#### Step 4.1: Auditoria de Anti-Patterns — 7 Pecados Capitais (10 min)

O agente revisa TODO o plano contra os 7 Pecados Capitais:

```yaml
auditoria_pecados:
  1_gula:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  2_avareza:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  3_preguica:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  4_soberba:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  5_ira:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  6_inveja:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  7_luxuria:
    risco: "[BAIXO | MEDIO | ALTO]"
    evidencia: "[onde no plano este risco existe]"
    mitigacao: "[acao especifica]"

  score_risco_geral: "[BAIXO | MEDIO | ALTO]"
  pecados_dominantes: ["[lista dos pecados com risco ALTO]"]
```

#### Step 4.2: Geracao do Franchise Formatting Roadmap (10 min)

O agente consolida tudo em um roadmap final:

```
[Nome], aqui esta o Franchise Formatting Roadmap completo do seu negocio:

DIAGNOSTICO
- Score de Franqueabilidade: [X.X]/10
- Veredicto: [FRANQUEAVEL / COM AJUSTES]
- Dependencias: [resolvidas / pendentes]

MODELO FINANCEIRO
- Taxa de franquia: R$ [valor]
- Royalties: [tipo] — [valor]
- Investimento total franqueado: R$ [faixa]
- Payback estimado: [X-Y] meses
- Validacao bilateral: [SIM/NAO]

DOCUMENTACAO
- Manuais: [X] de [5] prontos — estimativa: [prazo] para completar
- COF: [status] — compliance Lei 13.966/2019: [X]/[18] itens ok
- Contrato: [status]

EXPANSAO
- Mapa territorial: [X] pracas em [3] ondas
- Ritmo: [X] unidades/ano
- Meta 3 anos: [N] unidades

GESTAO DE REDE
- Consultoria de campo: [estrutura]
- Treinamento: [programa]
- Comunicacao: [canais]

AUDITORIA DE PECADOS
- Risco geral: [BAIXO | MEDIO | ALTO]
- Pecados dominantes: [lista]

PROXIMOS PASSOS (ordem de execucao):
1. [acao] — prazo: [X] semanas
2. [acao] — prazo: [X] semanas
3. [acao] — prazo: [X] semanas
...

INVESTIMENTO ESTIMADO PARA FORMATACAO:
- Documentacao (manuais): R$ [valor]
- Juridico (COF + contrato): R$ [valor]
- Marca (INPI, se necessario): R$ [valor]
- Consultoria (se necessaria): R$ [valor]
- TOTAL: R$ [valor]
- PRAZO TOTAL: [X] meses para estar pronto para operar como franquia

Lembre: franquia nao e 'feeling', e processo. Agora voce tem o processo.
```

---

## Output

```yaml
file: "squads/franchise/data/{slug}-formatting-roadmap.yaml"
format: "yaml"
conteudo:
  roadmap:
    negocio: "{nome}"
    segmento: "{segmento}"
    data: "{data}"
    agente: "marcelo-cherto"

    fase_1_diagnostico:
      score_franqueabilidade: "{X.X}/10"
      veredicto: "franqueavel | franqueavel_com_ajustes | nao_franqueavel"
      criterios: "[10 criterios com scores]"
      dependencias:
        mark_siebert: "{status}"
        michael_gerber: "{status}"

    fase_2_formatacao:
      modelo_financeiro:
        taxa_franquia: "R$ {valor}"
        royalties: "{tipo e valor}"
        investimento_total: "R$ {faixa}"
        payback: "{X-Y} meses"
        validacao_bilateral: "{SIM/NAO}"
      manuais:
        operacional: "{status}"
        administrativo: "{status}"
        marketing: "{status}"
        treinamento: "{status}"
        implantacao: "{status}"
      perfil_franqueado: "{definido}"
      cof:
        status: "{redigida | pendente | parcial}"
        compliance_lei_13966: "{X}/18 itens"
      contrato:
        status: "{redigido | pendente}"
      checklist_abf: "{X}/5 itens"

    fase_3_expansao:
      mapa_territorial:
        ondas: 3
        pracas_totais: "{N}"
      ritmo: "{X} unidades/ano"
      meta_3_anos: "{N} unidades"
      gestao_rede:
        consultoria_campo: "{estrutura}"
        treinamento: "{programa}"
        comunicacao: "{canais}"

    fase_4_consolidacao:
      auditoria_pecados:
        risco_geral: "{BAIXO | MEDIO | ALTO}"
        pecados_dominantes: ["lista"]
      proximos_passos: ["lista ordenada com prazos"]
      investimento_formatacao: "R$ {valor}"
      prazo_total: "{X} meses"

    handoff:
      proximo_agente: "{joe-mathews | greg-nathan | denis-santini}"
      contexto: "{o que o proximo agente precisa saber}"
```

---

## Quality Gate: QG-FR-003 (Compliance Legal)

Este quality gate e BLOCKING — nao pode ser ignorado.

- [ ] Score de franqueabilidade calculado nos 10 criterios
- [ ] Modelo financeiro validado para AMBAS as partes (franqueador E franqueado)
- [ ] Estrutura de manuais operacionais definida (5 manuais mapeados)
- [ ] COF com todos os 12 itens obrigatorios verificados
- [ ] Regras procedimentais da Lei 13.966/2019 verificadas (6 itens)
- [ ] Marca registrada no INPI (ou plano de registro incluido no roadmap)
- [ ] Prazo de 10 dias de entrega da COF respeitado no procedimento
- [ ] Proibicao de assinatura em feiras documentada no processo
- [ ] Contrato de franquia alinhado com COF (sem divergencias)
- [ ] Perfil do franqueado ideal definido com criterios claros e red flags
- [ ] Plano de expansao territorial com capacidade de suporte validada
- [ ] Programa de gestao de rede estruturado
- [ ] Auditoria dos 7 Pecados Capitais realizada
- [ ] Parecer juridico especializado recomendado (e incluido no roadmap de custos)
- [ ] Handoff preparado para proximo agente no pipeline

---

## Veto Conditions

Condicoes que IMPEDEM a continuidade da task. Se qualquer condicao abaixo for verdadeira, a task e BLOQUEADA ate resolucao.

```yaml
veto_conditions:
  # Vetos legais (baseados na Lei 13.966/2019)
  - id: "VETO-LEG-01"
    condicao: "Marca nao registrada no INPI e sem pedido em andamento"
    motivo: "Sem marca registrada, nao ha o que franquear. A marca e o ativo central."
    acao: "Bloquear formatacao. Iniciar processo de registro no INPI imediatamente."
    severidade: "CRITICA"

  - id: "VETO-LEG-02"
    condicao: "Negocio sem demonstracoes financeiras dos 2 ultimos exercicios"
    motivo: "A Lei 13.966/2019 exige balancos dos 2 ultimos exercicios na COF."
    acao: "Bloquear COF. Providenciar contabilidade adequada antes de prosseguir."
    severidade: "CRITICA"

  - id: "VETO-LEG-03"
    condicao: "Franqueador planeja assinar contratos em feiras de franquia"
    motivo: "PROIBIDO pela Lei 13.966/2019. Risco de anulacao contratual."
    acao: "Bloquear expansao. Redesenhar processo de vendas respeitando prazo de 10 dias."
    severidade: "CRITICA"

  - id: "VETO-LEG-04"
    condicao: "COF sem todos os 12 itens obrigatorios"
    motivo: "COF incompleta pode levar a anulabilidade do contrato de franquia."
    acao: "Bloquear comercializacao de franquias. Completar todos os itens da COF."
    severidade: "CRITICA"

  # Vetos financeiros
  - id: "VETO-FIN-01"
    condicao: "Modelo financeiro viavel APENAS para o franqueador"
    motivo: "O sucesso da franqueadora depende do sucesso dos franqueados."
    acao: "Bloquear formatacao. Recalcular modelo financeiro bilateral."
    severidade: "CRITICA"

  - id: "VETO-FIN-02"
    condicao: "Payback estimado superior a 36 meses sem justificativa clara"
    motivo: "Payback longo demais afasta candidatos qualificados e aumenta risco."
    acao: "Revisar modelo financeiro. Buscar reducao de investimento inicial ou aumento de receita."
    severidade: "ALTA"

  # Vetos operacionais
  - id: "VETO-OPS-01"
    condicao: "Zero processos documentados e nenhum manual existente"
    motivo: "Formatar um negocio sem processos documentados e formalizar o caos."
    acao: "Bloquear formatacao. Encaminhar para @michael-gerber (sistematizacao operacional)."
    severidade: "CRITICA"

  - id: "VETO-OPS-02"
    condicao: "Negocio nunca operou fora da unidade original (zero comprovacao multi-locacional)"
    motivo: "Sem prova de que o modelo funciona em mais de 1 local, expansao e aposta, nao estrategia."
    acao: "Bloquear expansao. Recomendar abertura de unidade-piloto antes de franquear."
    severidade: "ALTA"

  - id: "VETO-OPS-03"
    condicao: "Capacidade de suporte insuficiente para o ritmo de expansao planejado"
    motivo: "Pecado Capital #1 (GULA). Expandir sem suporte destroi redes."
    acao: "Reduzir ritmo de expansao ou ampliar equipe de suporte antes de prosseguir."
    severidade: "ALTA"

  # Veto de franqueabilidade
  - id: "VETO-FRANQ-01"
    condicao: "Score de franqueabilidade inferior a 5.0/10"
    motivo: "Negocio nao atende requisitos minimos para formatacao de franquia."
    acao: "Bloquear formatacao. Gerar roadmap de preparacao e encaminhar para agentes adequados."
    severidade: "CRITICA"
```

---

## Pontos de Sessao (Session Breaks)

A task pode ser dividida em ate 3 sessoes:

```yaml
sessoes:
  sessao_1:
    fases: "Fase 1 (Diagnostico + Franqueabilidade)"
    duracao: "30-40 min"
    output_parcial: "Diagnostico inicial com score e veredicto"

  sessao_2:
    fases: "Fase 2 (Formatacao)"
    duracao: "60-80 min"
    output_parcial: "Modelo financeiro + manuais + COF + perfil franqueado"

  sessao_3:
    fases: "Fase 3 + Fase 4 (Expansao + Consolidacao)"
    duracao: "50-60 min"
    output_parcial: "Plano expansao + gestao rede + roadmap final"
```

---

## Handoff

Ao concluir, preparar handoff para o proximo agente no pipeline:

```yaml
handoff:
  de: "marcelo-cherto"
  para: "{proximo_agente}"
  contexto: "Formatacao completa para mercado BR — COF pronta, manuais mapeados, modelo financeiro validado"
  dados_criticos:
    estagio_franquia: "formatada"
    compliance_legal: "[ok | pendencias listadas]"
    modelo_financeiro: "[resumo]"
    proxima_necessidade: "[vendas | marketing | gestao de relacionamento]"
  entregaveis_inclusos:
    - "Franchise Formatting Roadmap ({slug}-formatting-roadmap.yaml)"
  prioridade: "alta | media | baixa"
```

**Encaminhamentos tipicos:**
- Franquia formatada e pronta para vender → @joe-mathews (estrategia de vendas)
- Rede com problemas de relacionamento → @greg-nathan (diagnostico relacional)
- Rede precisa de estrategia de marketing → @denis-santini (marketing para franquias)
- Processos ainda nao sistematizados → @michael-gerber (sistematizacao operacional)

---

**Task Status:** Ready for Production
