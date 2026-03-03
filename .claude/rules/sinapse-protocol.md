---
paths: "**/*"
---

# Protocolo de Sinapse — World OS v1.0

## O Que E Este Protocolo

Este protocolo define como TODOS os squad-chiefs (e agentes que operam como chiefs) se conectam ao `project-state.yaml` na raiz do projeto. Ele garante que:

- Todo agente SABE o que aconteceu antes de agir
- Todo agente REGISTRA o que decidiu ao concluir
- Squads se comunicam via sinapses, nao via o usuario

---

## REGRA 1: Leitura na Ativacao

**QUANDO:** Qualquer squad-chief e ativado (via skill, comando ou roteamento do Maestro)
**ACAO:** ANTES de mostrar o greeting, ler `project-state.yaml` e extrair:

### 1.1 Decisoes Relevantes
Filtrar `decisoes[]` onde `impacta` contem o ID do meu squad.
Mostrar no greeting como "CONTEXTO DO PROJETO".

### 1.2 Sinapses Pendentes
Filtrar `sinapses[]` onde `para` == meu squad ID E `status` == "pendente".
Mostrar no greeting como "SINAPSES RECEBIDAS".

### 1.3 Contexto do Negocio
Ler secao `negocio` e incluir campos preenchidos relevantes ao meu dominio.

### 1.4 Fase Atual
Verificar em `progresso.fases[]` qual fase corresponde ao meu squad e qual o status.

### Formato de Exibicao no Greeting

Apos o greeting normal do chief, ADICIONAR este bloco:

```
─── CONTEXTO DO PROJETO ─────────────────────
Projeto: {projeto.nome} | Cliente: {projeto.cliente}
Fase: {fase.nome} ({fase.status})

[Se houver decisoes relevantes:]
Decisoes que impactam este squad:
* {decisao} ({autor}, {data})

[Se houver sinapses pendentes:]
Sinapses recebidas:
-> De {de}: {decisao}
   Acao esperada: {acao}

[Se negocio tiver campos preenchidos relevantes:]
Contexto: {campos relevantes do negocio}
──────────────────────────────────────────────
```

Se o `project-state.yaml` nao existir ou estiver vazio, NAO mostrar este bloco.
O chief funciona normalmente sem o estado — o protocolo e aditivo, nao bloqueante.

---

## REGRA 2: Escrita na Conclusao

**QUANDO:** O squad-chief conclui uma sessao de trabalho significativa (decisao tomada, fase avancada, deliverable entregue)
**ACAO:** Atualizar `project-state.yaml` com:

### 2.1 Registrar Decisoes
Para cada decisao significativa tomada durante a sessao:

```yaml
decisoes:
  - decisao: "Descricao clara da decisao"
    contexto: "Por que essa decisao foi tomada"
    autor: "{agent-id que conduziu}"
    squad: "{squad-id}"
    fase: "{fase-id correspondente}"
    data: "{YYYY-MM-DD}"
    impacta:
      - "{squad-id-que-precisa-saber}"
```

**O que e uma decisao significativa:**
- Definicao de posicionamento, publico, oferta, preco
- Escolha de estrategia, abordagem, tecnologia
- Aprovacao ou rejeicao de conceito
- Qualquer output que outros squads vao precisar

**O que NAO e decisao:**
- Perguntas feitas durante a sessao
- Consideracoes intermediarias
- Detalhes tecnicos internos do squad

### 2.2 Criar Sinapses
Para cada decisao que impacta outro squad:

```yaml
sinapses:
  - id: "SIN-{numero sequencial}"
    de: "{meu-squad-id}"
    para: "{squad-destino}"
    decisao: "O que foi decidido"
    contexto: "Por que o destino precisa saber"
    acao: "O que o destino deve fazer com isso"
    data: "{YYYY-MM-DD}"
    status: "pendente"
```

### 2.3 Atualizar Contexto do Negocio
Se a sessao definiu algo que pertence a secao `negocio`, atualizar o campo correspondente.

Mapeamento squad → campos do negocio:

<!-- WORLD-SYNC-START: squad-negocio-mapping -->
| Squad | Campos que pode escrever |
|-------|--------------------------|
| squad-adm | (nao escreve em negocio — escreve apenas decisoes) |
| squad-advisor (sinek) | why, how, what, causa, publico_alvo, posicionamento |
| squad-advisor (hormozi) | oferta_principal, preco, dream_outcome, garantia, diferenciais |
| squad-advisor (jobs) | produto_core, features_essenciais, features_cortadas |
| squad-agency | servicos, ferramentas, automacoes |
| squad-content-distillery | pilares_conteudo, plataformas, frequencia |
| squad-creator | (nao escreve em negocio — escreve apenas decisoes) |
| squad-customer-success | metricas_retencao, churn_rate, nps, health_score, fluxo_onboarding_cliente |
| squad-design | tom_de_voz, personalidade_marca, cores, tipografia, logo_descricao |
| squad-franchise | (nao escreve em negocio — escreve apenas decisoes) |
| squad-marketing | canais_aquisicao, estrategia_marketing, metricas_trafego, orcamento_marketing, campanhas_ativas |
| squad-ops | (nao escreve em negocio — escreve apenas decisoes) |
| squad-product | roadmap, features_mvp, metricas_produto, business_dna_status, business_dna_score, business_dna_date, prd_status |
| squad-reino | (nao escreve em negocio — escreve apenas decisoes) |
| squad-sales | meta_vendas, ticket_medio, canal_vendas, funil, scripts_venda, cadencia_prospeccao |
| squad-zona-genialidade | (nao escreve em negocio — escreve apenas decisoes) |
| squad-automation | (nao escreve em negocio — escreve apenas decisoes) |
| squad-creator-fundamentals | (nao escreve em negocio — escreve apenas decisoes) |
| squad-publisher | (nao escreve em negocio — escreve apenas decisoes) |
<!-- WORLD-SYNC-END: squad-negocio-mapping -->

### 2.4 Atualizar Progresso da Fase
Se o trabalho avancou a fase:

```yaml
progresso:
  fases:
    - id: "{fase-id}"
      status: "em_andamento"  # ou "concluido" se fase completa
```

### 2.5 Atualizar Ultima Sessao

```yaml
ultima_sessao:
  data: "{YYYY-MM-DD}"
  squad: "{squad-id}"
  agent: "{agent-id principal}"
  fase: "{fase-id}"
  resumo: "Resumo em 1-2 frases do que foi feito"
  proximo_passo: "O que deveria acontecer na proxima sessao"
  decisoes_tomadas:
    - "Decisao 1"
    - "Decisao 2"
```

---

## REGRA 3: Consumir Sinapses

**QUANDO:** Um squad-chief le uma sinapse pendente endereçada a ele.
**ACAO:** Marcar a sinapse como `entregue`:

```yaml
sinapses:
  - id: "SIN-001"
    status: "entregue"  # era "pendente"
```

Isso acontece automaticamente na LEITURA (Regra 1). Quando o chief exibe a sinapse no greeting, ela e marcada como entregue.

---

## REGRA 4: Graceful Degradation

O protocolo de sinapse e ADITIVO. Nunca bloqueante.

| Situacao | Comportamento |
|----------|--------------|
| `project-state.yaml` nao existe | Chief funciona normalmente sem contexto |
| `project-state.yaml` esta vazio | Chief funciona normalmente sem contexto |
| Erro ao ler o arquivo | Logar aviso, continuar sem contexto |
| Erro ao escrever no arquivo | Informar usuario, sugerir escrita manual |
| Nenhuma decisao relevante | Nao mostrar bloco de contexto |
| Nenhuma sinapse pendente | Nao mostrar bloco de sinapses |

**Principio:** O sistema NUNCA para por causa do protocolo. Ele MELHORA quando o protocolo esta ativo, mas funciona sem ele.

---

## REGRA 5: Squad-Chiefs Conhecidos

Os seguintes agents DEVEM seguir este protocolo:

<!-- WORLD-SYNC-START: squad-chiefs-table -->
| Chief | Squad ID | Skill de Ativacao |
|-------|----------|-------------------|
| ray-dalio-adm-chief | squad-adm | `/squad-adm:agents:ray-dalio-adm-chief` |
| advisor-chief | squad-advisor | `/squad-advisor:agents:advisor-chief` |
| ia-agency-chief | squad-agency | `/squad-agency:agents:ia-agency-chief` |
| distillery-chief | squad-content-distillery | `/squad-content-distillery:agents:distillery-chief` |
| squad-chief | squad-creator | `/squad-creator:agents:squad-chief` |
| lincoln-murphy | squad-customer-success | `/squad-customer-success:agents:lincoln-murphy` |
| design-chief | squad-design | `/squad-design:agents:design-chief` |
| franchise-chief | squad-franchise | `/squad-franchise:agents:franchise-chief` |
| thiago-finch | squad-marketing | `/squad-marketing:agents:thiago-finch` |
| ops-chief | squad-ops | `/squad-ops:agents:ops-chief` |
| marty-cagan | squad-product | `/squad-product:agents:marty-cagan` |
| jesus-cristo | squad-reino | `/squad-reino:agents:jesus-cristo` |
| alex-hormozi | squad-sales | `/squad-sales:agents:alex-hormozi` |
| zona-genialidade-chief | squad-zona-genialidade | `/squad-zona-genialidade:agents:zona-genialidade-chief` |
| automation-chief | squad-automation | `/squad-automation:agents:automation-chief` |
| forge-chief | squad-creator-fundamentals | `/squad-creator-fundamentals:agents:forge-chief` |
| doc-chief | squad-publisher | `/squad-publisher:agents:doc-chief` |
<!-- WORLD-SYNC-END: squad-chiefs-table -->

Agentes individuais (nao-chiefs) NAO escrevem no estado diretamente.
Apenas chiefs escrevem. Agentes individuais contribuem ATRAVES do chief.

Excecao: quando um agente individual e ativado diretamente pelo Maestro (via `/world-os`), ele assume responsabilidade de escrita como se fosse chief.

---

## REGRA 6: Quality Gates (Checklists Automaticos)

O protocolo de sinapse integra-se com o sistema de quality gates da pasta `checklists/`.
Quality gates sao checklists de nivel de projeto que validam transicoes e saude do sistema.

### 6.1 Triggers Automaticos

Os checklists sao SUGERIDOS automaticamente pelo Maestro nos momentos abaixo.
Sao SUGESTOES, nao bloqueios — seguem o principio de graceful degradation (Regra 4).

| Evento | Checklist | Quem sugere | Condicao |
|--------|-----------|-------------|----------|
| Apos `*init` concluir | `new-project-setup.md` | Maestro | Sempre |
| Antes da primeira fase | `client-discovery.md` | Maestro | Se intake tem campos criticos vazios |
| Squad-chief conclui fase (Regra 2) | `phase-transition.md` | Maestro | Se proxima fase e de squad diferente |
| A cada 4 sessoes | `mid-project-health.md` | Maestro | Conta via `ultima_sessao.data` |
| Sinapses pendentes > 5 | `sinapse-quality.md` | Maestro | Conta sinapses com status `pendente` |
| Fase business-dna concluida | `business-dna-validation.md` | Maestro | Fase business-dna muda para `concluido` |
| Todas as fases concluidas | `project-delivery.md` | Maestro | Nenhuma fase `pendente` ou `em_andamento` |

### 6.2 Responsabilidade de Execucao

- **Maestro** sugere e executa checklists de projeto (pasta `checklists/`)
- **Squad-chiefs** executam checklists internos do squad (pasta `squads/squad-*/checklists/`)
- Checklists de projeto sao cross-squad — nenhum chief individual tem visao completa

### 6.3 Integracao com Escrita (Regra 2)

Quando um squad-chief conclui sessao significativa (Regra 2), o Maestro DEVE verificar:

1. Se a fase mudou de status → sugerir `*transition`
2. Se ha mais de 5 sinapses pendentes → sugerir `*sinapse-audit`
3. Se ha 4+ sessoes desde ultimo health check → sugerir `*health`

Essa verificacao acontece quando o Maestro e ativado via `*status` ou `/world-os`.

### 6.4 Registro de Quality Gates Executados

Quando um checklist de projeto e executado, registrar no `project-state.yaml`:

```yaml
quality_gates:
  - checklist: "phase-transition"
    data: "YYYY-MM-DD"
    score: "28/33"
    resultado: "APROVADO"
    fase_contexto: "proposito → produto"
```

Isso permite ao Maestro saber quando foi o ultimo health check, ultimo audit, etc.

### 6.5 Graceful Degradation

Como todos os outros aspectos do protocolo:

| Situacao | Comportamento |
|----------|--------------|
| Checklist nao existe na pasta | Avisar, continuar sem gate |
| Score abaixo do threshold | Sugerir correcao, NAO bloquear |
| Usuario ignora sugestao | Registrar que foi ignorado, continuar |
| Erro ao executar checklist | Logar aviso, continuar normalmente |

**Principio:** Quality gates MELHORAM a qualidade quando usados, mas NUNCA bloqueiam o trabalho.

---

## Exemplo Completo: Fluxo Advisor → Design

### 1. Sinek conclui sessao no Advisor Squad

O advisor-chief escreve no `project-state.yaml`:

```yaml
decisoes:
  - decisao: "Posicionamento definido: Consultoria IA para PMEs"
    contexto: "Golden Circle aplicado. WHY claro."
    autor: "simon-sinek"
    squad: "squad-advisor"
    fase: "proposito"
    data: "2026-02-24"
    impacta:
      - "squad-design"
      - "squad-content-distillery"
      - "squad-agency"

sinapses:
  - id: "SIN-001"
    de: "squad-advisor"
    para: "squad-design"
    decisao: "Posicionamento definido"
    contexto: "Identidade visual deve refletir autoridade + acessibilidade"
    acao: "Usar tom profissional-acessivel. Cores devem transmitir confianca."
    data: "2026-02-24"
    status: "pendente"

negocio:
  why: "Democratizar IA para pequenas empresas"
  publico_alvo: "PMEs com 5-50 funcionarios"
  posicionamento: "Consultoria IA acessivel e pratica"

progresso:
  fases:
    - id: "proposito"
      status: "concluido"

ultima_sessao:
  data: "2026-02-24"
  squad: "squad-advisor"
  agent: "simon-sinek"
  fase: "proposito"
  resumo: "WHY definido. Posicionamento claro. Golden Circle completo."
  proximo_passo: "Definir oferta com Hormozi ou iniciar identidade visual"
```

### 2. Design Chief e ativado na proxima sessao

O design-chief le o `project-state.yaml` e mostra:

```
Design Chief aqui.

─── CONTEXTO DO PROJETO ─────────────────────
Projeto: Agencia IA | Cliente: Felipe
Fase: Identidade Visual (pendente)

Decisoes que impactam este squad:
* Posicionamento: Consultoria IA para PMEs (sinek, 2026-02-24)

Sinapses recebidas:
-> De squad-advisor: Posicionamento definido
   Acao: Usar tom profissional-acessivel. Cores devem transmitir confianca.

Contexto: WHY: Democratizar IA para pequenas empresas
──────────────────────────────────────────────

10 especialistas prontos. Descreva o que precisa.
```

A sinapse SIN-001 e marcada como `entregue`.

---

## Resumo do Circuito

```
Maestro le Estado → mostra dashboard
         |
Usuario diz "continuar"
         |
Maestro ativa squad-chief + injeta contexto
         |
Squad-chief LE estado (Regra 1)
         |
Squad-chief TRABALHA com contexto
         |
Squad-chief ESCREVE no estado (Regra 2)
         |
Sinapses criadas para proximos squads
         |
Loop → Maestro le Estado novamente
```
