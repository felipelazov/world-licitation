# Retention Health Checklist

**Purpose:** Validar a saude da operacao de retencao de clientes. Cobre health score, engajamento, deteccao de churn e identificacao de upsell. Aplicavel mensalmente como auditoria do processo de retencao.
**Pattern:** CS-RT (Retention Patterns)
**Quality Gate:** BLOCKING para health score e churn prevention. ADVISORY para engagement e upsell.
**Owner:** joey-coleman (CS / Retencao)

---

## 1. Health Score — Integridade e Qualidade

### Dados e Cobertura

- [ ] Health score calculado para 100% dos clientes ativos (zero clientes sem score)
- [ ] Dados de uso do produto atualizados (defasagem maxima: 7 dias)
- [ ] Dados de satisfacao atualizados (CSAT/NPS dos ultimos 30 dias)
- [ ] Dados de suporte cruzados com historico de tickets
- [ ] Dados de engajamento atualizados (ultimo contato, respostas)
- [ ] Dados contratuais corretos (plano, data de renovacao, valor)

### Formula e Calculo

- [ ] Todas as 5 dimensoes com dados reais (nao estimados):
  - [ ] Uso do produto (30%) — frequencia de login, funcionalidades, tempo ativo
  - [ ] Satisfacao (25%) — CSAT medio, NPS, reclamacoes
  - [ ] Suporte (20%) — tickets/mes, tempo resolucao, reaberturas
  - [ ] Engajamento (15%) — ultimo contato, respostas, participacao
  - [ ] Contrato (10%) — tempo de vida, upgrades, pagamentos em dia
- [ ] Pesos aplicados corretamente (somam 100%)
- [ ] Score final entre 0 e 100 para cada cliente
- [ ] Classificacao por zona correta:
  - [ ] Saudavel: 80-100 (Verde)
  - [ ] Atencao: 60-79 (Amarelo)
  - [ ] Risco: 40-59 (Laranja)
  - [ ] Critico: 0-39 (Vermelho)

### Consistencia

- [ ] Nenhum score visivelmente inconsistente com a realidade conhecida
- [ ] Movimentacoes de zona documentadas (quem subiu, quem caiu)
- [ ] Motivo da movimentacao identificado para cada mudanca
- [ ] Historico de health score preservado (comparacao com periodos anteriores)

### Distribuicao

- [ ] Relatorio health-score-report gerado e distribuido
- [ ] CS Head recebeu visao agregada + individual
- [ ] Clientes em risco com acao recomendada documentada
- [ ] Oportunidades de upsell sinalizadas para deteccao

**Score Health Score:** ___/24 itens

---

## 2. Engajamento — Proatividade e Qualidade

### Cobertura

- [ ] Todos os clientes contatados dentro da frequencia definida:
  - [ ] VIP (80+, Enterprise/Pro): contato quinzenal ou mais frequente
  - [ ] Ativo (60-79): contato mensal
  - [ ] Silencioso (30+ dias sem contato): contato imediato
- [ ] Zero clientes sem contato ha mais de 45 dias (exceto churned)
- [ ] Calendario de contatos atualizado com proximo contato por cliente

### Qualidade dos Contatos

- [ ] Contatos personalizados (nenhum copy/paste generico)
- [ ] Cada contato traz valor (novidade, dica, convite — nao apenas "checking in")
- [ ] Perguntas feitas ao cliente (nao apenas informar)
- [ ] Tom adequado ao perfil do cliente (formal/informal)
- [ ] Feedback do cliente registrado no CRM apos cada contato

### Segmentacao

- [ ] Base segmentada corretamente por zona + plano + ultimo contato
- [ ] Comunicacao diferente para cada segmento
- [ ] Clientes em risco (score < 60) NAO recebendo engagement padrao (direcionados para churn prevention)
- [ ] Clientes VIP recebendo atencao diferenciada

### Insights

- [ ] Sinais de upsell identificados e registrados durante engajamento
- [ ] Sinais de risco identificados e escalados
- [ ] Feedback relevante compartilhado com CS Head
- [ ] Necessidades de produto coletadas e reportadas

**Score Engajamento:** ___/17 itens

---

## 3. Churn Prevention — Deteccao e Acao

### Deteccao Precoce

- [ ] Sinais de alerta primarios monitorados ativamente:
  - [ ] Queda de uso > 50% no ultimo mes
  - [ ] Zero logins em 15+ dias
  - [ ] CSAT <= 2 em 2+ tickets consecutivos
  - [ ] Pedido direto de cancelamento
  - [ ] Pagamento atrasado > 15 dias
  - [ ] Ticket critico sem resolucao > 5 dias
- [ ] Sinais de alerta secundarios monitorados:
  - [ ] Mencao de concorrente
  - [ ] Mudanca de decision maker
  - [ ] Queda de engajamento (nao responde contatos)
  - [ ] Uso apenas de funcionalidades basicas
- [ ] Frequencia de monitoramento adequada (minimo semanal)

### Diagnostico

- [ ] Causa raiz identificada ANTES de qualquer acao para cada cliente em risco
- [ ] Causa raiz categorizada (Produto, Suporte, Expectativa, Financeiro, Externo, Concorrencia)
- [ ] Historico do cliente revisado antes do contato de recuperacao
- [ ] Abordagem alinhada com CS Head para clientes zona Vermelha

### Acao de Recuperacao

- [ ] Contato de recuperacao realizado em ate 48h apos deteccao do risco
- [ ] Abordagem seguiu o playbook (diagnosticar primeiro, oferecer depois)
- [ ] Ouviu o cliente ANTES de apresentar solucao
- [ ] Solucao endereca a causa raiz (nao e band-aid)
- [ ] Desconto/oferta de retencao aprovada pelo CS Head (quando aplicavel)
- [ ] Nenhum desconto dado sem aprovacao
- [ ] Nenhuma promessa feita que nao pode ser cumprida
- [ ] Plano de acao concreto compartilhado com o cliente

### Acompanhamento

- [ ] Follow-ups semanais agendados e realizados para cada cliente em recuperacao
- [ ] Impacto no health score verificado apos 2 semanas
- [ ] Se retido: health check agendado em 30 dias
- [ ] Se churned: motivo primario e secundario registrados no CRM
- [ ] Se churned: pesquisa de saida realizada

### Documentacao e Aprendizado

- [ ] Resultado documentado para cada caso (retido/churned/observacao)
- [ ] Motivos de churn categorizados no CRM
- [ ] Retrospectiva mensal de churn realizada
- [ ] Playbook atualizado com novos cenarios aprendidos
- [ ] Acoes que funcionaram documentadas para replicacao

**Score Churn Prevention:** ___/29 itens

---

## 4. Upsell Detection — Identificacao e Qualificacao

### Identificacao de Sinais

- [ ] Sinais de expansao monitorados em clientes saudaveis (score 80+):
  - [ ] Uso no limite do plano (usuarios, funcionalidades, armazenamento)
  - [ ] Pergunta sobre feature de plano superior
  - [ ] Crescimento do time do cliente
  - [ ] Pedido de customizacao/integracao
  - [ ] Elogio publico ou referral
  - [ ] Alta frequencia de uso (top 10%)
  - [ ] Participacao ativa em eventos/community
- [ ] Sinais registrados no CRM com data e evidencia
- [ ] Nenhum cliente em risco (score < 60) abordado para upsell

### Qualificacao

- [ ] Teste de 5 perguntas aplicado antes de passar para Vendas:
  - [ ] O cliente TEM a necessidade? (evidencia real)
  - [ ] O cliente SABE que tem a necessidade? (mencionou)
  - [ ] A solucao RESOLVE a necessidade? (match real)
  - [ ] O timing e ADEQUADO? (nao forcar)
  - [ ] O valor e CLARO? (ROI demonstravel)
- [ ] Somente oportunidades com 5/5 passadas para SDR
- [ ] Oportunidade documentada com formato completo (contexto, sinais, recomendacao, valor)

### Handoff para Vendas

- [ ] SDR notificado com contexto suficiente para abordar
- [ ] Tom e preferencias do cliente informados ao SDR
- [ ] CS disponivel como advisor durante processo de vendas
- [ ] Acompanhamento do resultado (converteu, nao converteu, motivo)
- [ ] Se nao converteu: motivo registrado, reavaliar em 60 dias

**Score Upsell Detection:** ___/18 itens

---

## 5. Metricas Gerais de Retencao

### Targets vs Realizado

- [ ] Health score medio >= 75
- [ ] % clientes saudaveis (zona Verde) >= 60%
- [ ] % clientes em risco (zona Laranja + Vermelha) <= 15%
- [ ] Churn rate mensal <= 5%
- [ ] Save rate (clientes retidos / clientes em risco) >= 70%
- [ ] NPS medio >= 50
- [ ] Time to first value medio <= 14 dias
- [ ] Expansion revenue on track vs meta

### Processo

- [ ] Health check executado na frequencia definida (quinzenal ou mensal)
- [ ] Engagement executado conforme calendario
- [ ] Relatorio semanal de suporte gerado e distribuido
- [ ] Playbook de churn atualizado (ultima revisao < 30 dias)
- [ ] Retrospectiva mensal de churn realizada

### Sinapses Cross-Squad

- [ ] Problemas recorrentes de suporte sinalizados para Produto
- [ ] Oportunidades de upsell passadas para Vendas (SDR)
- [ ] Feedback de clientes compartilhado com times relevantes
- [ ] Alertas de clientes insatisfeitos compartilhados na equipe de CS

**Score Metricas Gerais:** ___/16 itens

---

## Score Final de Retencao

| Area | Itens | Score | % |
|------|-------|-------|---|
| Health Score | /24 | ___ | ___% |
| Engajamento | /17 | ___ | ___% |
| Churn Prevention | /29 | ___ | ___% |
| Upsell Detection | /18 | ___ | ___% |
| Metricas Gerais | /16 | ___ | ___% |
| **TOTAL** | **/104** | **___** | **___%** |

### Avaliacao

| Score | Status | Acao |
|-------|--------|------|
| >= 90% | Excelente | Manter e otimizar. Compartilhar boas praticas. |
| 75-89% | Bom | Focar nas areas abaixo de 80%. Plano de melhoria pontual. |
| 60-74% | Atencao | Plano de melhoria obrigatorio. Revisao semanal com CS Head. |
| < 60% | Critico | Revisao completa do processo de retencao. Acao emergencial. |

---

## Sign-off Mensal

| Responsavel | Status | Data | Observacoes |
|-------------|--------|------|-------------|
| joey-coleman (CS/Retencao) | ___ | ___ | ___ |
| shep-hyken (Suporte) | ___ | ___ | ___ |
| donna-weber (Onboarding) | ___ | ___ | ___ |
| lincoln-murphy (CS Head) | ___ | ___ | ___ |

---

**Checklist Version:** 1.0.0
**Pattern Reference:** CS-RT (Retention Patterns)
**Created:** 2026-02-24
**Part of:** squads/squad-customer-success
**Frequencia de aplicacao:** Mensal (primeira semana do mes)
