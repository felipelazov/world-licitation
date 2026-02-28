# Onboarding de Cliente — Registro Completo

**Projeto:** {nome_projeto}
**Cliente:** {nome_cliente}
**Empresa:** {nome_empresa}
**Data do Onboarding:** {YYYY-MM-DD}
**Agente:** gestor-operacional
**Proposta Aceita:** {referencia da proposta}
**Versao:** {1.0}

---

## Fase 1: Contrato e Pagamento (15 min)

### Contrato

| Campo | Status | Detalhe |
|-------|--------|---------|
| Tipo de contrato | {Prestacao de servico / SaaS / Hibrido} | |
| Plataforma de assinatura | {DocuSign / ClickSign / PandaDoc / outro} | |
| Data da assinatura | {YYYY-MM-DD} | |
| Assinado pelo cliente? | [ ] SIM | |
| Assinado por Felipe? | [ ] SIM | |
| Link do contrato | {url_ou_referencia} | |

### Pagamento

| Campo | Status | Detalhe |
|-------|--------|---------|
| Setup fee | R$ {valor} | |
| Pagamento confirmado? | [ ] SIM | Data: {YYYY-MM-DD} |
| Forma de pagamento | {Pix / Cartao / Boleto} | |
| Nota fiscal emitida? | [ ] SIM | Numero: {nf_numero} |
| Reserva 30% separada? | [ ] SIM | R$ {valor_reserva} |
| Recorrencia configurada? | [ ] SIM / [ ] N/A | Valor: R$ {recorrente}/mes |

---

## Fase 2: Setup Tecnico (20 min)

### Ambiente do Cliente

| Ferramenta | Status | Detalhes de Config |
|-----------|--------|-------------------|
| WhatsApp Business | [ ] Configurado | Numero: {numero} / Evolution API: {status} |
| Dashboard | [ ] Criado | URL: {url} / Login: {configurado} |
| n8n Workflow | [ ] Configurado | Workspace: {nome} / Flows: {lista} |
| Integracao 1 | [ ] Conectada | {Nome}: {detalhes} |
| Integracao 2 | [ ] Conectada | {Nome}: {detalhes} |
| Integracao 3 | [ ] Conectada | {Nome}: {detalhes} |

### Testes Realizados

| Teste | Resultado | Observacao |
|-------|-----------|-----------|
| Envio de mensagem WhatsApp | [ ] OK [ ] FALHA | {obs} |
| Resposta automatica do bot | [ ] OK [ ] FALHA | {obs} |
| Dashboard carregando | [ ] OK [ ] FALHA | {obs} |
| Workflow n8n executando | [ ] OK [ ] FALHA | {obs} |
| Integracoes respondendo | [ ] OK [ ] FALHA | {obs} |

### Credenciais Documentadas

| Servico | Onde Esta Documentado | Quem Tem Acesso |
|---------|----------------------|-----------------|
| {servico_1} | {local_seguro} | {pessoas} |
| {servico_2} | {local_seguro} | {pessoas} |
| {servico_3} | {local_seguro} | {pessoas} |

> **REGRA:** Credenciais NUNCA ficam no chat. Sempre em password manager ou doc seguro.

---

## Fase 3: Alinhamento com Cliente (15 min)

### Kickoff

| Campo | Detalhe |
|-------|---------|
| Data do kickoff | {YYYY-MM-DD} |
| Horario | {HH:MM} |
| Formato | {Call / Presencial / WhatsApp} |
| Participantes | {Quem do lado do cliente + quem da agencia} |
| Agenda | 1. Apresentacao da timeline / 2. Alinhar expectativas / 3. Proximos passos |

### Expectativas Alinhadas

| Item | Responsabilidade da Agencia | Responsabilidade do Cliente |
|------|---------------------------|---------------------------|
| Construcao da solucao | SIM | NAO |
| Fornecer dados e acessos | NAO | SIM |
| Responder duvidas em 24h | SIM | SIM |
| Testes e validacao | SIM (tecnico) | SIM (funcional) |
| Publicacao em producao | SIM | Aprovacao final |

### Comunicacao

| Campo | Detalhe |
|-------|---------|
| Canal principal | {WhatsApp grupo / Slack / Email} |
| Frequencia de updates | {Semanal / 2x semana / diario} |
| Contato do cliente | {Nome: tel: email:} |
| Contato da agencia | {Felipe: tel: email:} |
| Horario de atendimento | {HH:MM - HH:MM, dias uteis} |
| SLA de resposta | {Max 24h para perguntas, 48h para demandas} |

### Timeline Compartilhada

| Semana | Entregavel | Checkpoint com Cliente |
|--------|-----------|----------------------|
| Semana 1 | Quick win: {descricao} | {data} — Validacao do quick win |
| Semana 2 | {entregavel} | {data} — Status update |
| Semana 3 | {entregavel} | {data} — Status update |
| Semana 4 | Entrega final + treinamento | {data} — Aceite final |

---

## Fase 4: Registro no Pipeline (10 min)

### Dados do Cliente no Pipeline

```yaml
cliente:
  nome: "{nome_cliente}"
  empresa: "{nome_empresa}"
  contato: "{telefone}"
  email: "{email}"
  status: "onboarded"
  data_inicio: "{YYYY-MM-DD}"
  proposta: "{referencia}"
  valor_setup: {valor}
  valor_recorrente: {valor}
  quick_win_prazo: "{YYYY-MM-DD}"
  entrega_final_prazo: "{YYYY-MM-DD}"
  canal_comunicacao: "{canal}"
  proximo_report: "{YYYY-MM-DD}"
  notas: "{observacoes relevantes}"
```

### Alertas Configurados

| Alerta | Trigger | Canal |
|--------|---------|-------|
| Follow-up 48h | Cliente sem contato > 48h | {WhatsApp / Email} |
| Checkpoint semanal | Toda {dia_da_semana} | {Canal} |
| Report mensal | Dia {X} de cada mes | {Canal} |
| Quick win deadline | 7 dias apos inicio | {Canal} |

---

## Quality Gate: QG-IAOS-003

| Check | Status |
|-------|--------|
| Contrato assinado | [ ] |
| Pagamento confirmado | [ ] |
| 30% reservado | [ ] |
| Setup tecnico completo | [ ] |
| Kickoff agendado | [ ] |
| Quick win com escopo e responsavel | [ ] |
| Score total | {X}/25 |
| Resultado | {APROVADO/ATENCAO/ALERTA/REPROVADO} |

---

## Prontidao pra Entrega

| Item | Status | Responsavel |
|------|--------|-------------|
| Quick win (7 dias) definido | [ ] | construtor-agentes |
| Briefing tecnico pronto | [ ] | ia-agency-chief |
| Recursos alocados | [ ] | gestor-operacional |
| Felipe sabe o proximo passo | [ ] | ia-agency-chief |

---

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Onboarding realizado | gestor-operacional |
