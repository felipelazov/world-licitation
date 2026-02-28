# Task: Onboarding de Novo Cliente

**Task ID:** ia-agency-os/onboarding-cliente
**Version:** 1.0.0
**Execution Type:** Interativo (Agent guia, Felipe/VA executa)
**Duration:** 1 hora
**Agent:** gestor-operacional

---

## Proposito

Fazer o onboarding completo de um novo cliente que aceitou a proposta comercial. Garantir que tudo esta configurado, alinhado e pronto para a fase de entrega comecar no dia seguinte. Zero surpresas.

---

## Inputs

```yaml
obrigatorios:
  proposta_path:
    field: "Path da proposta aprovada"
    format: "string"
    required: true

  dados_cliente:
    field: "Nome, CNPJ, email, telefone, WhatsApp"
    format: "object"
    required: true
```

---

## Precondicoes

- [ ] Proposta comercial aceita pelo cliente
- [ ] Dados do cliente coletados (nome, CNPJ, contatos)
- [ ] Felipe ou VA disponivel para executar

---

## Steps

### Step 1: Contrato e Pagamento (15 min)

```
[ ] Gerar contrato a partir do template padrao
[ ] Enviar contrato para assinatura digital
[ ] Cliente assinou contrato
[ ] Emitir fatura do primeiro mes
[ ] Enviar fatura via WhatsApp/email
[ ] Pagamento confirmado
[ ] Aplicar regra dos 30% (separar reserva)
```

### Step 2: Setup Tecnico (20 min)

```
[ ] Criar pasta do cliente em data/clientes/{slug}/
[ ] Configurar WhatsApp Business do cliente (se aplicavel)
[ ] Criar acesso ao dashboard (se aplicavel)
[ ] Configurar workspace n8n do cliente
[ ] Testar conexoes e integracoes basicas
[ ] Documentar credenciais em local seguro
```

### Step 3: Alinhamento (15 min)

```
[ ] Agendar kickoff com construtor-agentes
[ ] Compartilhar cronograma de entrega com cliente
[ ] Definir canal de comunicacao (WhatsApp grupo)
[ ] Alinhar expectativas:
    - O que sera entregue
    - Quando sera entregue
    - Como sera medido o resultado
    - Quem e o ponto de contato
[ ] Enviar welcome message/email com resumo
```

### Step 4: Registro no Pipeline (10 min)

```
[ ] Atualizar pipeline do ia-agency-chief
[ ] Registrar cliente ativo no dashboard financeiro
[ ] Agendar primeiro report mensal (30 dias)
[ ] Notificar construtor-agentes sobre novo projeto
```

---

## Output

```yaml
file: "squads/ia-agency-os/data/clientes/{slug}-onboarding.yaml"
format: "yaml"
conteudo:
  onboarding:
    cliente: "{nome}"
    empresa: "{empresa}"
    cnpj: "{cnpj}"
    data_inicio: "{data}"

    contrato:
      status: "assinado"
      data_assinatura: "{data}"

    financeiro:
      primeiro_pagamento: "confirmado"
      valor_mensal: "R$ {valor}"
      reserva_30: "R$ {valor}"

    setup_tecnico:
      whatsapp: "configurado | n/a"
      dashboard: "configurado | n/a"
      n8n: "configurado"

    alinhamento:
      kickoff_agendado: "{data}"
      cronograma_compartilhado: true
      canal_comunicacao: "{WhatsApp grupo | outro}"

    status: "onboarded"
    proximo_passo: "kickoff com construtor-agentes em {data}"
```

---

## Quality Gate: QG-IAOS-003

- [ ] Contrato assinado
- [ ] Primeiro pagamento confirmado
- [ ] 30% separado em reserva
- [ ] Setup tecnico completo
- [ ] Kickoff agendado
- [ ] Cronograma compartilhado com cliente
- [ ] Canal de comunicacao definido
- [ ] Welcome message enviada

---

## Veto Conditions

- Se pagamento nao confirmado → NAO iniciar setup tecnico
- Se contrato nao assinado → NAO agendar kickoff
- Se expectativas nao alinhadas → Agendar call extra antes do kickoff

---

## Welcome Message Template

```
Ola [nome]! Bem-vindo a IA Agency OS! 🚀

Seu projeto esta oficialmente ativo. Aqui esta o resumo:

📋 O que vamos fazer: [descricao da solucao]
📅 Cronograma: [semana 1, 2, 3, 4]
👤 Seu contato: Felipe Lazov (WhatsApp: xxx)
📊 Primeiro resultado esperado: [quick win em 7 dias]

Proximo passo: Kickoff em [data] as [hora].

Qualquer duvida, manda mensagem aqui!

— Felipe | IA Agency OS
```

---

**Task Status:** Ready for Production
