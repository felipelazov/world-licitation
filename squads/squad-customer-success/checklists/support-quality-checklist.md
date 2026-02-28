# Support Quality Checklist

**Purpose:** Validar a qualidade do atendimento de suporte em todas as etapas: triagem, resolucao, escalacao e reporting. Aplicavel a cada ticket individual e ao processo como um todo.
**Pattern:** CS-SP (Support Patterns)
**Quality Gate:** BLOCKING para SLA e resolucao. ADVISORY para documentacao.
**Owner:** shep-hyken (Suporte)

---

## 1. Qualidade da Triagem (task ticket-triage)

### Leitura e Contexto

- [ ] Ticket lido por completo (nao apenas o assunto)
- [ ] Historico do cliente consultado no CRM antes de classificar
- [ ] Health score do cliente verificado
- [ ] Tickets anteriores do mesmo cliente revisados (problema recorrente?)
- [ ] Contexto suficiente para classificacao precisa

### Classificacao

- [ ] Nivel atribuido (N1/N2/N3) com base em criterios objetivos, nao intuicao
- [ ] Justificativa da classificacao registrada no ticket
- [ ] Nivel condizente com a complexidade real do problema:
  - [ ] N1: Duvida simples ou problema com solucao conhecida na KB
  - [ ] N2: Problema que requer investigacao tecnica
  - [ ] N3: Problema critico que impacta operacao do cliente
- [ ] Nenhum N3 classificado como N1 por pressa
- [ ] Nenhum N1 classificado como N3 por pressao do cliente

### Priorizacao

- [ ] Prioridade calculada com base nos 5 fatores definidos:
  - [ ] Nivel do ticket (40%)
  - [ ] Health score do cliente (25%)
  - [ ] Plano do cliente (15%)
  - [ ] Recorrencia do problema (10%)
  - [ ] Impacto no negocio (10%)
- [ ] Prioridade final atribuida: Critica, Alta, Media ou Baixa
- [ ] Prioridade registrada no ticket

### Direcionamento

- [ ] Direcao definida: Resolve (N1) ou Escalate (N2/N3)
- [ ] Tags e categorias aplicadas ao ticket
- [ ] Tempo de triagem <= 15 minutos
- [ ] Triagem completa antes de SLA de primeira resposta estourar

**Score da Triagem:** ___/17 itens

---

## 2. Qualidade da Resolucao (task resolve)

### Busca de Solucao

- [ ] Base de conhecimento consultada ANTES de responder
- [ ] Solucao encontrada e validada para o contexto do cliente
- [ ] Se solucao nao encontrada: investigacao feita (nao inventada)
- [ ] Nenhuma informacao falsa ou nao verificada compartilhada

### Resposta ao Cliente

- [ ] Estrutura da resposta seguida:
  - [ ] Reconhecimento do problema (empatia)
  - [ ] Explicacao da causa (se relevante e util)
  - [ ] Solucao passo a passo (clara, sem jargao desnecessario)
  - [ ] Disponibilidade para mais duvidas
- [ ] Tom empático e profissional (nao robotico, nao informal demais)
- [ ] Resposta personalizada (nao copy/paste generico)
- [ ] Screenshots ou links de apoio incluidos quando necessario
- [ ] Passos do cliente claramente numerados e sequenciais
- [ ] Linguagem acessivel (explicou termos tecnicos quando usou)

### Documentacao

- [ ] Resolucao registrada no ticket (como foi resolvido)
- [ ] Base de conhecimento atualizada (artigo novo ou existente)
- [ ] Tags atualizadas no ticket para analise de padroes
- [ ] Tempo de resolucao registrado

### Verificacao

- [ ] Cliente confirmou que o problema foi resolvido
- [ ] CSAT coletado (1-5)
- [ ] Ticket fechado somente apos confirmacao do cliente
- [ ] Se nao resolvido: reclassificado para N2 e escalado

### SLA

- [ ] Primeira resposta dentro do SLA:
  - [ ] N1: <= 2h
  - [ ] N2: <= 4h
  - [ ] N3: <= 30min
- [ ] Resolucao dentro do SLA:
  - [ ] N1: <= 8h
  - [ ] N2: <= 24h
  - [ ] N3: <= 4h

**Score da Resolucao:** ___/22 itens

---

## 3. Qualidade da Escalacao (task escalate)

### Contexto

- [ ] Problema descrito em detalhe tecnico suficiente
- [ ] O que ja foi tentado documentado (tentativas anteriores)
- [ ] Screenshots, logs ou evidencias incluidos
- [ ] Impacto no cliente descrito (o que ele nao consegue fazer)
- [ ] Urgencia clara (SLA restante informado)
- [ ] Formato de escalacao seguido:
  - [ ] Ticket ID, cliente, empresa, plano
  - [ ] Health score do cliente
  - [ ] Nivel e prioridade
  - [ ] Problema detalhado
  - [ ] Tentativas anteriores
  - [ ] Evidencias
  - [ ] Impacto
  - [ ] SLA restante

### Encaminhamento

- [ ] Especialista/time correto identificado (conforme matriz de escalacao)
- [ ] Ticket enviado pelo canal oficial (ClickUp, Slack)
- [ ] Especialista confirmou recebimento
- [ ] Prazo de resolucao alinhado com especialista

### Comunicacao com Cliente

- [ ] Cliente informado sobre a escalacao em ate 30min
- [ ] Explicacao clara do motivo (sem jargao tecnico)
- [ ] Prazo estimado compartilhado (com buffer de 20%)
- [ ] Canal de atualizacoes definido

### Acompanhamento

- [ ] Follow-ups agendados conforme nivel:
  - [ ] N3: A cada 4h
  - [ ] N2: A cada 24h
- [ ] Follow-ups realizados nos prazos definidos
- [ ] Cliente atualizado a cada marco de progresso
- [ ] Se prazo vai estourar: cliente informado ANTES (nao depois)

### Fechamento

- [ ] Resolucao aplicada e verificada com o cliente
- [ ] CSAT coletado
- [ ] Resolucao documentada no ticket e na KB
- [ ] Se recorrente: sinalizado para task report

**Score da Escalacao:** ___/24 itens

---

## 4. Qualidade do Reporting (task report)

### Completude dos Dados

- [ ] Dados de pelo menos 5 dias uteis compilados
- [ ] Metricas extraidas de fonte oficial (sistema de suporte)
- [ ] CSAT com taxa de resposta >= 50%
- [ ] Nenhuma metrica omitida (transparencia total)

### Metricas Obrigatorias

- [ ] Total de tickets (abertos, resolvidos, pendentes)
- [ ] Distribuicao por nivel (N1, N2, N3)
- [ ] Distribuicao por categoria
- [ ] Tempo medio de primeira resposta
- [ ] Tempo medio de resolucao
- [ ] CSAT medio
- [ ] SLA compliance por nivel e metrica
- [ ] Tickets que estouraram SLA com motivos

### Analise

- [ ] Top 5 problemas recorrentes identificados com frequencia e impacto
- [ ] Gaps na base de conhecimento identificados
- [ ] Clientes com mais tickets listados
- [ ] Clientes insatisfeitos (CSAT <= 3) sinalizados
- [ ] Comparacao com semana anterior (tendencias)
- [ ] Wins da semana destacados
- [ ] Riscos da semana destacados

### Distribuicao

- [ ] Relatorio enviado ao CS Head (lincoln-murphy)
- [ ] Problemas recorrentes enviados ao time de Produto (sinapse cross-squad)
- [ ] Clientes insatisfeitos sinalizados para CS/Retencao (joey-coleman)
- [ ] Relatorio entregue toda segunda-feira ate 12h

**Score do Reporting:** ___/19 itens

---

## 5. Checklist Geral de Qualidade de Suporte

### Atitude e Tom

- [ ] Respostas demonstram empatia genuina
- [ ] Tom profissional mas acolhedor (nao robotico)
- [ ] Paciencia mesmo com clientes frustrados ou repetitivos
- [ ] Nenhuma resposta defensiva ou culpando o cliente
- [ ] Proatividade (antecipar perguntas, oferecer extra)

### Processo

- [ ] SLA cumprido em >= 90% dos tickets
- [ ] CSAT medio >= 4.0/5.0
- [ ] Backlog de tickets < 20% do volume semanal
- [ ] Base de conhecimento atualizada semanalmente
- [ ] Nenhum ticket abandonado (todos com resolucao ou encaminhamento)

### Aprendizado Continuo

- [ ] Problemas recorrentes identificados e reportados
- [ ] KB expandida com base em novos problemas resolvidos
- [ ] Feedback de clientes usado para melhorar respostas
- [ ] Criterios de classificacao revisados se necessario
- [ ] Scripts de resposta atualizados com base em resultados

---

## Score Final de Qualidade

| Area | Itens | Score | % |
|------|-------|-------|---|
| Triagem | /17 | ___ | ___% |
| Resolucao | /22 | ___ | ___% |
| Escalacao | /24 | ___ | ___% |
| Reporting | /19 | ___ | ___% |
| Geral | /15 | ___ | ___% |
| **TOTAL** | **/97** | **___** | **___%** |

### Avaliacao

| Score | Status | Acao |
|-------|--------|------|
| >= 90% | Excelente | Manter padrao |
| 75-89% | Bom | Melhorar areas fracas |
| 60-74% | Atencao | Plano de melhoria obrigatorio |
| < 60% | Critico | Revisao completa do processo de suporte |

---

**Checklist Version:** 1.0.0
**Pattern Reference:** CS-SP (Support Patterns)
**Created:** 2026-02-24
**Part of:** squads/squad-customer-success
