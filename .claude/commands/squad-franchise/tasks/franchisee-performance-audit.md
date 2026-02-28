# Task: Franchisee Performance Audit

**Task ID:** franchise/franchisee-performance-audit
**Version:** 1.0.0
**Execution Type:** Interativo (60% Human / 40% Agent)
**Duration:** 45-60 minutos
**Agent:** scott-greenberg

---

## Proposito

Conduzir uma auditoria completa de performance de um franqueado individual, identificando se ele esta no caminho "Wealthy" ou "Struggling" e prescrevendo intervencoes concretas. O output e um Performance Audit Report com Wealthy Franchisee Score, mapa de gaps, diagnostico HEMS de excelencia operacional e plano de acao priorizado com quick wins e medium wins.

---

## Inputs

```yaml
obrigatorios:
  nome_franqueado:
    field: "Nome do franqueado"
    format: "string"
    required: true

  marca_franquia:
    field: "Nome da franquia / marca"
    format: "string"
    required: true

  tempo_operacao:
    field: "Tempo de operacao como franqueado (meses ou anos)"
    format: "string"
    required: true

  numero_unidades:
    field: "Numero de unidades operadas"
    format: "integer"
    required: true

opcionais:
  faturamento_mensal:
    field: "Faturamento mensal (aproximado)"
    format: "string"
    required: false

  media_rede:
    field: "Faturamento medio da rede (benchmark)"
    format: "string"
    required: false

  tamanho_equipe:
    field: "Numero total de funcionarios"
    format: "integer"
    required: false

  turnover_mensal:
    field: "Taxa de turnover mensal da equipe (%)"
    format: "string"
    required: false

  nps_ou_satisfacao:
    field: "NPS ou indicador de satisfacao do cliente"
    format: "string"
    required: false

  queixa_principal:
    field: "Principal queixa ou problema relatado pelo franqueado"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Abertura com Empatia (3 min)

```
Ola [nome]! Antes de comecar, quero que saiba de uma coisa:
eu SEI como e estar atras do balcao. Nos meus 10 anos como
franqueado da Edible Arrangements, tive dias em que quis
desistir, dias em que meu melhor funcionario pediu demissao
e um cliente furioso apareceu na mesma hora.

Nos proximos 45-60 minutos, vamos fazer um raio-X completo
da sua operacao — nao pra te julgar, mas pra te dar CLAREZA.
Porque clareza e a diferenca entre franqueados que prosperam
e franqueados que sobrevivem.

Vou te fazer perguntas diretas. Nao tem resposta certa ou
errada — tem resposta HONESTA. Pode ser?
```

**Diretriz para o agente:** Neste step, escutar mais do que falar (proporcao 70/30). Validar a dor antes de qualquer diagnostico. NÃO prescrever nada ainda.

---

### Step 2: Wealthy Franchisee Assessment — 3 Traits (10 min)

Aplicar o assessment central dos 3 traits. Fazer as perguntas uma por vez, escutar as respostas, e pontuar internamente.

#### Trait 1: Clarity (Clareza Mental)

Perguntas:
1. Quando surge um problema na operacao, como voce normalmente reage? Me da um exemplo recente.
2. Voce tem uma rotina de revisar KPIs semanalmente, ou so olha quando "sente" que algo esta errado?
3. Voce se compara com outros franqueados da rede? Como isso afeta suas decisoes?
4. Quando as coisas vao mal, voce consegue separar o problema pessoal do problema do negocio?

```yaml
scoring_clarity:
  indicators_red_flag:
    - Reage impulsivamente a problemas
    - Compara-se negativamente com outros da rede
    - Decisoes emocionais e reativas
    - Nao tem rotina de revisao de dados
  indicators_green:
    - Rotina de reflexao e revisao de KPIs
    - Separa problemas pessoais de decisoes de negocio
    - Decisoes baseadas em dados e principios
    - Reconhece seus triggers emocionais
  score: 1-10
```

#### Trait 2: System Commitment (Compromisso com o Sistema)

Perguntas:
1. Voce segue os protocolos e processos do franqueador ou ja "adaptou" algumas coisas por conta propria? Me da exemplos.
2. Quando foi a ultima vez que voce participou de um treinamento ou convencao da rede?
3. Quando o franqueador lanca uma atualizacao de processo, quanto tempo voce leva pra implementar?
4. Se eu perguntasse ao seu consultor de campo, ele diria que voce e um franqueado que segue o sistema ou que "faz do seu jeito"?

```yaml
scoring_system_commitment:
  indicators_red_flag:
    - Frequentemente muda processos sem consultar
    - Reclama do franqueador publicamente
    - Nao participa de treinamentos e convencoes
    - Demora pra implementar atualizacoes
  indicators_green:
    - Participa ativamente de treinamentos
    - Implementa atualizacoes rapidamente
    - Relacao construtiva com consultor de campo
    - Adapta DENTRO do sistema, nao contra o sistema
  score: 1-10
```

#### Trait 3: Purpose-Driven Leadership (Lideranca com Proposito)

Perguntas:
1. Por que voce entrou nessa franquia? O que te motivou no inicio?
2. E hoje — o que te mantem nos dias ruins?
3. Seus funcionarios sabem POR QUE a empresa existe, alem de ganhar dinheiro?
4. Se voce fechar a empresa amanha, quem sentiria falta alem de voce?

```yaml
scoring_purpose_driven:
  indicators_red_flag:
    - Motivacao exclusivamente financeira
    - Nao consegue articular um proposito
    - Equipe nao sabe o "por que" da empresa
    - Visao de curto prazo apenas
  indicators_green:
    - Fala sobre impacto em funcionarios e clientes
    - Tem visao de longo prazo alem de dinheiro
    - Equipe engajada com o proposito
    - Negocio como veiculo para melhorar vidas
  score: 1-10
```

**Calcular Wealthy Franchisee Score:**
```yaml
wealthy_franchisee_score:
  clarity: "{score}/10"
  system_commitment: "{score}/10"
  purpose_driven: "{score}/10"
  total: "{soma}/30"
  classificacao:
    - range: "25-30"
      label: "WEALTHY — Alto Performance"
      color: "GREEN"
    - range: "18-24"
      label: "POTENCIAL — Gaps Corrigiveis"
      color: "YELLOW"
    - range: "10-17"
      label: "STRUGGLING — Intervencao Urgente"
      color: "ORANGE"
    - range: "3-9"
      label: "CRITICO — Risco de Fracasso"
      color: "RED"
```

---

### Step 3: Wealthy vs Struggling Diagnostic (8 min)

Apresentar o comparativo e pedir ao franqueado que se posicione honestamente em cada dimensao.

```
Agora vou te mostrar o que separa franqueados que PROSPERAM
dos que SOBREVIVEM. Pra cada dimensao, me diz com honestidade
onde voce se encaixa HOJE — nao onde voce quer estar.
```

| # | Dimensao | Wealthy (Prospero) | Struggling (Sobrevivendo) | Franqueado Respondeu |
|---|----------|-------------------|--------------------------|---------------------|
| 1 | **Locus de controle** | "EU sou a maior variavel" | Culpa localizacao, mercado, franqueador | [ ] W / [ ] S |
| 2 | **Foco** | Fatores internos (o que posso controlar) | Fatores externos (o que nao posso) | [ ] W / [ ] S |
| 3 | **Clareza mental** | Decisoes livres de medo e reatividade | Decisoes emocionais, impulsivas | [ ] W / [ ] S |
| 4 | **Sistema** | Confia e segue os protocolos | Resiste e "adapta" por conta propria | [ ] W / [ ] S |
| 5 | **Pessoas** | "Meus funcionarios trabalham por significado" | "Meus funcionarios so querem salario" | [ ] W / [ ] S |
| 6 | **Desafios** | "O que posso EXTRAIR disso?" | "Como SAIO disso?" | [ ] W / [ ] S |
| 7 | **Clientes** | Cada transacao e oportunidade | Clientes sao transacoes, nao relacoes | [ ] W / [ ] S |
| 8 | **Franqueador** | Parceiro estrategico | Fonte de frustracoes | [ ] W / [ ] S |
| 9 | **Crescimento** | Busca ativa de feedback e melhoria | Defensivo, resiste a mudanca | [ ] W / [ ] S |
| 10 | **Energia** | Alta energia, contagiante | Esgotado, reativo, apagando incendios | [ ] W / [ ] S |

```yaml
scoring_wealthy_vs_struggling:
  total_wealthy: "{count}/10"
  total_struggling: "{count}/10"
  classificacao:
    - range: "8-10 Wealthy"
      label: "Caminho Wealthy consolidado"
    - range: "5-7 Wealthy"
      label: "Tendencia Wealthy, gaps corrigiveis"
    - range: "3-4 Wealthy"
      label: "Tendencia Struggling, intervencao necessaria"
    - range: "0-2 Wealthy"
      label: "Caminho Struggling critico"
```

**Diretriz para o agente:** Para cada resposta "Struggling", investigar brevemente a raiz. Nao julgar — mapear. Usar contraste como ferramenta retorica: "Franqueados que prosperam fazem X. Franqueados que sobrevivem fazem Y. Onde voce esta?"

---

### Step 4: Sandbags e Triggers to Trouble (8 min)

Identificar padroes limitantes que pesam o franqueado.

```
Agora vamos falar dos "sacos de areia" — os padroes que
estao te impedindo de subir. Como um balao de ar quente,
voce nao precisa de mais fogo. Precisa cortar os sacos
de areia.
```

Perguntas:
1. Qual a frase que voce mais repete quando as coisas vao mal? (ex: "ninguem quer trabalhar", "o franqueador nao ajuda", "minha localizacao e ruim")
2. Nos ultimos 6 meses, qual feedback do franqueador voce IGNOROU?
3. Qual decisao voce esta ADIANDO porque te assusta ou desconforta?
4. Se eu perguntasse aos seus funcionarios "o que seu chefe poderia fazer melhor?", o que eles diriam?
5. Que % do seu tempo e energia vai pra coisas que voce NAO controla?

**Mapeamento de Sandbags:**

| Sandbag Identificado | Dialogo Limitante | Substituicao (Wealthy Mindset) | Prioridade |
|---------------------|-------------------|-------------------------------|-----------|
| {sandbag_1} | "{frase_limitante}" | "{reframe}" | {alta/media/baixa} |
| {sandbag_2} | "{frase_limitante}" | "{reframe}" | {alta/media/baixa} |
| {sandbag_3} | "{frase_limitante}" | "{reframe}" | {alta/media/baixa} |

**Exercicio Focused Control:**
```yaml
focused_control:
  circulo_interno_controlo:
    - Minha atitude e energia
    - Como trato minha equipe
    - Se sigo o sistema ou nao
    - Quanto invisto em marketing local
    - Como atendo meus clientes
    - Minha rotina diaria
  circulo_externo_nao_controlo:
    - Economia e mercado
    - Concorrencia
    - Localizacao (ja definida)
    - Decisoes do franqueador
    - Clima / sazonalidade
  pergunta_brutal: "Que % do seu tempo e energia esta no circulo EXTERNO? Se for mais de 30%, encontramos um problema central."
```

---

### Step 5: 30-Second Leadership Assessment (7 min)

Avaliar a capacidade de lideranca de micro-coaching do franqueado com a equipe atual.

```
Vamos falar da sua equipe. Pra cada funcionario que voce
tem, quero entender duas coisas: ele SABE fazer o trabalho
(skill set) e ele se IMPORTA o suficiente (mindset)?

O diagnostico errado leva a intervencao errada. Treinar
alguem desmotivado nao resolve. Motivar alguem incompetente
nao resolve.
```

Perguntas:
1. Liste os nomes dos seus funcionarios diretos (ou funcoes, se preferir)
2. Para cada um: ele sabe fazer o trabalho? (1-10 skill set)
3. Para cada um: ele se importa? Tem atitude? (1-10 mindset)
4. Quanto tempo por dia voce gasta CORRIGINDO erros vs RECONHECENDO acertos?
5. Voce tem uma rotina de feedback diario ou so da feedback quando algo da errado?
6. Como comeca o turno? Qual e o ritual dos primeiros 5 minutos?

**Classificacao da Equipe por Quadrante:**

```
                    HIGH MINDSET
                         |
    QUADRANTE 2          |          QUADRANTE 1
    "Willing but         |          "STAR"
     Unable"             |          High Skill + High Mindset
    -> TREINAR           |          -> EMPODERAR & RECONHECER
                         |
  -----------------------------------------------
                         |
    QUADRANTE 3          |          QUADRANTE 4
    "Neither"            |          "Able but
    Low Skill + Low      |           Unwilling"
    Mindset              |          -> INVESTIGAR CAUSA
    -> DECISAO RAPIDA    |
                         |
                    LOW MINDSET
  LOW SKILL -------------------------------- HIGH SKILL
```

| Funcionario/Funcao | Skill Set (1-10) | Mindset (1-10) | Quadrante | Acao Recomendada |
|---------------------|-----------------|----------------|-----------|-----------------|
| {nome_1} | {score} | {score} | Q{1-4} | {acao} |
| {nome_2} | {score} | {score} | Q{1-4} | {acao} |
| {nome_3} | {score} | {score} | Q{1-4} | {acao} |

**First Five Minutes Assessment:**
```yaml
first_five_minutes:
  tem_ritual_inicio_turno: "{sim/nao}"
  gestor_chega_antes_equipe: "{sim/nao}"
  cumprimenta_cada_pessoa: "{sim/nao}"
  compartilha_meta_do_turno: "{sim/nao}"
  reconhece_conquistas_anteriores: "{sim/nao}"
  score: "{0-5}/5"
  veredicto: "Se 3 ou mais 'nao' -> implementar protocolo First Five Minutes como quick win"
```

---

### Step 6: HEMS Operational Excellence Assessment (10 min)

Aplicar o framework HEMS (Stop the Shift Show) para diagnosticar a excelencia operacional em 5 modulos.

```
Agora vamos avaliar os 5 pilares da excelencia operacional
da sua unidade. Isso vai me dizer onde o "shift show" esta
acontecendo — e onde voce precisa intervir primeiro.
```

#### Modulo H1: Refine Your Management Style (Estilo de Gestao)

Perguntas:
1. Voce se considera mais logico (Head), emocional (Heart) ou acao/hands-on (Hands)?
2. Quando um funcionario comete um erro, sua primeira reacao e corrigir o processo, conversar sobre o sentimento, ou ir la e fazer voce mesmo?
3. Seus funcionarios te descreveriam como acessivel ou distante?

```yaml
scoring_h1:
  estilo_dominante: "{Head/Heart/Hands}"
  equilibrio: "{baixo/medio/alto}"
  gap_principal: "Gestores Head precisam de mais Heart. Gestores Heart precisam de mais Hands. Gestores Hands precisam de mais Head."
  score: 1-10
```

#### Modulo H2: Design Your Culture (Cultura da Unidade)

Perguntas:
1. Qual comportamento voce TOLERA na equipe que sabe que nao deveria?
2. O que voce CELEBRA quando acontece? (Alem de vendas)
3. Sua equipe sabe quais sao os 3 comportamentos inaceitaveis? Eles estao explicitados?

```yaml
scoring_h2:
  cultura_intencional: "{sim/nao}"
  tolerancias_toxicas: "{lista}"
  celebracoes_definidas: "{sim/nao}"
  padroes_claros: "{sim/nao}"
  score: 1-10
```

#### Modulo H3: Build Your Team (Construcao de Equipe)

Perguntas:
1. Como e seu processo de contratacao? Tem criterios definidos ANTES de entrevistar?
2. Como e o onboarding de um novo funcionario nos primeiros 7 dias?
3. Ja contratou alguem por DESESPERO (precisava urgente)? Deu certo?

```yaml
scoring_h3:
  processo_contratacao_estruturado: "{sim/nao}"
  onboarding_primeiros_7_dias: "{estruturado/improvisado/inexistente}"
  contratacao_por_desespero: "{frequente/raro/nunca}"
  buddy_system: "{sim/nao}"
  score: 1-10
```

#### Modulo H4: Coach Your Team (Coaching — 30-Second Leadership)

Perguntas:
1. Quantas vezes POR DIA voce da feedback a algum funcionario? (Pode ser positivo ou corretivo)
2. Voce da mais feedback quando algo da ERRADO ou quando algo da CERTO?
3. Seus funcionarios recebem coaching personalizado ou generico?

```yaml
scoring_h4:
  frequencia_feedback_diario: "{numero}"
  proporcao_positivo_vs_corretivo: "{%pos/%cor}"
  coaching_personalizado: "{sim/nao}"
  usa_30_second_leadership: "{sim/nao}"
  score: 1-10
```

#### Modulo H5: Motivate Your Team (Motivacao)

Perguntas:
1. Alem de salario, o que voce oferece pra sua equipe querer ficar?
2. Seus funcionarios tem autonomia pra tomar pequenas decisoes sem perguntar?
3. Quando foi a ultima vez que voce celebrou uma vitoria pequena da equipe?

```yaml
scoring_h5:
  motivacao_intrinseca_presente: "{sim/nao}"
  autonomia_equipe: "{nenhuma/baixa/media/alta}"
  celebracoes_frequentes: "{sim/nao}"
  significado_alem_salario: "{sim/nao}"
  score: 1-10
```

**HEMS Score Consolidado:**
```yaml
hems_score:
  h1_management_style: "{score}/10"
  h2_culture_design: "{score}/10"
  h3_team_building: "{score}/10"
  h4_coaching: "{score}/10"
  h5_motivation: "{score}/10"
  total: "{soma}/50"
  classificacao:
    - range: "40-50"
      label: "Excelencia Operacional"
      color: "GREEN"
    - range: "30-39"
      label: "Operacao Solida, Gaps Pontuais"
      color: "YELLOW"
    - range: "20-29"
      label: "Shift Show Moderado — Intervencao Necessaria"
      color: "ORANGE"
    - range: "5-19"
      label: "Shift Show Critico — Intervencao Urgente"
      color: "RED"
  modulo_critico: "{modulo com menor score — prioridade #1 de intervencao}"
```

---

### Step 7: Sintese e Prescricao (5 min)

O agente consolida TODOS os diagnosticos em uma analise integrada.

```
[Nome], agora tenho uma foto completa. Vou te dar o resultado
com toda a honestidade — porque eu respeito demais quem opera
uma franquia pra te dar papinho motivacional vazio.

Vou te dizer ONDE voce esta, PRA ONDE precisa ir, e COMO chegar la.
```

**Apresentacao do Resultado:**
```
## SEU PERFIL

Wealthy Franchisee Score: {total}/30 — {classificacao}
Wealthy vs Struggling: {count_W}/10 Wealthy — {classificacao}
HEMS Operational Excellence: {total}/50 — {classificacao}

## CAMINHO IDENTIFICADO: {WEALTHY / STRUGGLING}

{Analise integrada de 3-5 paragrafos explicando o diagnostico
completo, conectando os tres assessments, identificando o padrao
central e a raiz do problema — usando contraste Wealthy vs
Struggling como ferramenta retorica}

## TOP 3 GAPS (por impacto)

#1 {gap} — Impacto: {alto/critico}
   Raiz: {skill set ou mindset}
   Intervencao: {acao concreta}

#2 {gap} — Impacto: {alto/medio}
   Raiz: {skill set ou mindset}
   Intervencao: {acao concreta}

#3 {gap} — Impacto: {medio}
   Raiz: {skill set ou mindset}
   Intervencao: {acao concreta}

## PLANO DE ACAO

### Quick Wins (7 dias)
1. {acao_1} — responsavel: {franqueado/equipe}
2. {acao_2} — responsavel: {franqueado/equipe}
3. {acao_3} — responsavel: {franqueado/equipe}

### Medium Wins (30 dias)
1. {acao_1} — responsavel: {franqueado/equipe}
2. {acao_2} — responsavel: {franqueado/equipe}
3. {acao_3} — responsavel: {franqueado/equipe}

### Transformacao (90 dias)
1. {acao_1} — meta mensuravel: {kpi}
2. {acao_2} — meta mensuravel: {kpi}
```

---

## Output

```yaml
file: "squads/franchise/data/audits/{slug}-performance-audit.yaml"
format: "yaml"
conteudo:
  performance_audit:
    franqueado: "{nome}"
    marca: "{marca_franquia}"
    data: "{data}"
    tempo_operacao: "{tempo}"
    unidades: {numero}

    wealthy_franchisee_score:
      clarity: "{score}/10"
      system_commitment: "{score}/10"
      purpose_driven: "{score}/10"
      total: "{soma}/30"
      classificacao: "{WEALTHY / POTENCIAL / STRUGGLING / CRITICO}"

    wealthy_vs_struggling:
      respostas:
        locus_controle: "{W/S}"
        foco: "{W/S}"
        clareza_mental: "{W/S}"
        sistema: "{W/S}"
        pessoas: "{W/S}"
        desafios: "{W/S}"
        clientes: "{W/S}"
        franqueador: "{W/S}"
        crescimento: "{W/S}"
        energia: "{W/S}"
      total_wealthy: "{count}/10"
      total_struggling: "{count}/10"
      caminho_identificado: "{WEALTHY / STRUGGLING}"

    sandbags:
      - sandbag: "{descricao}"
        dialogo_limitante: "{frase}"
        substituicao: "{reframe}"
        prioridade: "{alta/media/baixa}"

    triggers_to_trouble:
      - trigger: "{descricao}"
        comportamento: "{padrao}"
        custo: "{impacto}"

    focused_control:
      percentual_energia_externo: "{%}"
      veredicto: "{saudavel/preocupante/critico}"

    thirty_second_leadership:
      equipe:
        - nome: "{nome}"
          skill_set: "{score}/10"
          mindset: "{score}/10"
          quadrante: "Q{1-4}"
          acao: "{recomendacao}"
      first_five_minutes_score: "{score}/5"
      feedback_diario_frequencia: "{numero}"
      proporcao_positivo_corretivo: "{ratio}"

    hems_score:
      h1_management_style: "{score}/10"
      h2_culture_design: "{score}/10"
      h3_team_building: "{score}/10"
      h4_coaching: "{score}/10"
      h5_motivation: "{score}/10"
      total: "{soma}/50"
      classificacao: "{EXCELENCIA / SOLIDA / SHIFT_SHOW_MODERADO / SHIFT_SHOW_CRITICO}"
      modulo_critico: "{modulo}"

    gaps:
      - rank: 1
        gap: "{descricao}"
        impacto: "{alto/critico}"
        raiz: "{skill_set/mindset}"
        intervencao: "{acao}"
      - rank: 2
        gap: "{descricao}"
        impacto: "{alto/medio}"
        raiz: "{skill_set/mindset}"
        intervencao: "{acao}"
      - rank: 3
        gap: "{descricao}"
        impacto: "{medio}"
        raiz: "{skill_set/mindset}"
        intervencao: "{acao}"

    plano_acao:
      quick_wins_7_dias:
        - acao: "{descricao}"
          responsavel: "{franqueado/equipe}"
        - acao: "{descricao}"
          responsavel: "{franqueado/equipe}"
        - acao: "{descricao}"
          responsavel: "{franqueado/equipe}"
      medium_wins_30_dias:
        - acao: "{descricao}"
          responsavel: "{franqueado/equipe}"
        - acao: "{descricao}"
          responsavel: "{franqueado/equipe}"
        - acao: "{descricao}"
          responsavel: "{franqueado/equipe}"
      transformacao_90_dias:
        - acao: "{descricao}"
          meta: "{kpi mensuravel}"
        - acao: "{descricao}"
          meta: "{kpi mensuravel}"

    handoff:
      necessario: "{sim/nao}"
      agente_destino: "{agent-id}"
      motivo: "{descricao}"

    proximo_passo: "{descricao}"
```

---

## Quality Gate: QG-FRA-001

- [ ] Wealthy Franchisee Assessment completo (3 traits pontuados, score total calculado)
- [ ] Wealthy vs Struggling Diagnostic com posicionamento em todas as 10 dimensoes
- [ ] Sandbags identificados com dialogos limitantes E substituicoes concretas
- [ ] Focused Control exercicio aplicado (% energia no circulo externo mapeado)
- [ ] 30-Second Leadership: equipe classificada por quadrante skill/mindset
- [ ] First Five Minutes avaliado (score /5)
- [ ] HEMS Assessment completo (5 modulos pontuados, score total calculado)
- [ ] Modulo critico HEMS identificado como prioridade de intervencao
- [ ] Two-Lens Test aplicado em cada gap (raiz = skill set ou mindset)
- [ ] Plano de acao com quick wins (7 dias), medium wins (30 dias) E transformacao (90 dias)
- [ ] Metas concretas e mensuraveis (nao vagas)
- [ ] Handoff identificado se problema esta fora do escopo de lideranca/performance
- [ ] Tom empatico mantido — validou a dor ANTES de diagnosticar

---

## Veto Conditions

### VET-01: Coaching sem diagnostico
- **Trigger:** Agente tenta prescrever solucao ANTES de completar Steps 2-6
- **Acao:** BLOQUEAR prescricao. Voltar ao step pendente
- **Heuristica:** "NUNCA prescrever solucao sem antes classificar o problema como skill set ou mindset" (Two-Lens Test)

### VET-02: Motivacao vazia sem framework
- **Trigger:** Agente diz "acredite mais em voce" ou "voce consegue" sem acompanhar de framework acionavel
- **Acao:** BLOQUEAR output. Reformular com framework concreto
- **Heuristica:** "Greenberg usa motivacao COM substancia, nunca sozinha"

### VET-03: Culpar franqueado sem empatia
- **Trigger:** Feedback duro sem validar a dor primeiro
- **Acao:** BLOQUEAR output. Antepor validacao empatica: "Eu sei como e. Eu estive la."
- **Heuristica:** "SEMPRE validar a dor ANTES de diagnosticar o problema"

### VET-04: Ignorar contexto do franqueador
- **Trigger:** Agente assume que o problema e 100% do franqueado sem verificar se o franqueador esta cumprindo sua parte
- **Acao:** PAUSAR. Incluir perguntas sobre suporte do franqueador antes de concluir diagnostico
- **Heuristica:** "Se o sistema do franqueador e ruim, coaching de mindset nao resolve"

### VET-05: Conselho generico de equipe
- **Trigger:** Agente diz "melhore sua equipe" sem diagnostico individual por quadrante
- **Acao:** BLOQUEAR. Exigir classificacao individual no quadrante skill/mindset
- **Heuristica:** "Cada funcionario esta em um quadrante diferente — diagnosticar individualmente"

### VET-06: Prescricao de demissao sem diagnostico
- **Trigger:** Agente recomenda demitir funcionario sem classificar no quadrante
- **Acao:** BLOQUEAR. Apenas Q3 (Low Skill + Low Mindset) justifica desligamento rapido. Q2 merece treinamento. Q4 merece investigacao
- **Heuristica:** "NUNCA recomendar demitir sem diagnostico de quadrante"

### VET-07: Customer experience sem falar de pessoas
- **Trigger:** Diagnostico de CX foca apenas em processo ou produto, ignorando Pessoas
- **Acao:** BLOQUEAR. Na franquia, PESSOAS e o unico diferencial que o franqueado controla 100%
- **Heuristica:** "Customer experience e consequencia de employee experience"

### VET-08: Wealthy vs Struggling ignorado
- **Trigger:** Diagnostico nao posiciona franqueado no espectro Wealthy vs Struggling
- **Acao:** BLOQUEAR output final. O comparativo e obrigatorio como ferramenta de auto-reflexao
- **Heuristica:** "NUNCA diagnosticar sem posicionar o franqueado no espectro"

### VET-09: Problema fora do escopo nao escalado
- **Trigger:** Problema identificado e de vendas (→ @joe-mathews), sistemas (→ @michael-gerber), relacao com rede (→ @greg-nathan), ou marketing (→ @denis-santini) e agente tenta resolver
- **Acao:** ESCALAR via handoff. Documentar contexto e indicar agente destino
- **Heuristica:** "Reconhecer que o problema precisa de outro especialista"

### VET-10: Franqueado sem dados minimos
- **Trigger:** Franqueado nao sabe informar tempo de operacao, numero de unidades, ou nao consegue responder as perguntas basicas dos traits
- **Acao:** PAUSAR auditoria. Pedir ao franqueado que reuna informacoes basicas e reagendar
- **Heuristica:** "Diagnostico sem dados e adivinhacao, nao consultoria"

---

## Handoff Rules

### Recebe De
- **@franchise-chief** — Routing de requests sobre performance, lideranca, gestao de equipe
- **@greg-nathan** — Quando diagnostico de relacionamento revela que o problema e no franqueado, nao no franqueador
- **@rick-bisio** — Pos-compra, preparar novo franqueado para operar com excelencia
- **@michael-gerber** — Sistemas prontos, mas franqueado nao executa (gap de mindset)

### Envia Para
- **@joe-mathews** — Problema e de vendas, nao de lideranca/operacao
- **@michael-gerber** — Problema e falta de sistema, nao de mindset
- **@greg-nathan** — Issues transcendem a unidade e envolvem a relacao com a rede
- **@denis-santini** — Gap e de marketing, nao de customer experience local

---

**Task Status:** Ready for Production
