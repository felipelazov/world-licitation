# Task: Welcome Client

**Task ID:** `cs-on-welcome-client`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Welcome Client |
| **status** | `pending` |
| **responsible_executor** | donna-weber (Onboarding Specialist) |
| **execution_type** | `Hybrid` |
| **input** | Cliente fechado (de Vendas) |
| **output** | Boas-vindas enviadas + proximos passos comunicados |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 0.5-1h

---

## Overview

Primeira interacao formal com o cliente apos o fechamento da venda. O objetivo e causar uma excelente primeira impressao, definir expectativas claras e garantir que o cliente tenha tudo o que precisa para iniciar a jornada. Este e o momento de transformar o comprador em parceiro.

---

## Input

- **Dados do cliente** (object)
  - Required: Yes
  - Source: squad-sales (SDR/Closer)
  - Campos: nome, empresa, email, telefone, WhatsApp, plano contratado, data de fechamento
- **Proposta aprovada** (document)
  - Required: Yes
  - Source: squad-sales
  - Descricao: Proposta comercial aceita com escopo definido
- **Contexto da venda** (text)
  - Required: Yes
  - Source: squad-sales (handoff notes)
  - Descricao: Dores do cliente, expectativas, promessas feitas, objecoes superadas

---

## Output

- **Email de boas-vindas enviado** (email)
  - Destination: Cliente (email principal)
  - Format: Template `welcome-package.md` preenchido
- **Proximos passos documentados** (document)
  - Destination: CRM + cliente
  - Format: Lista com datas, responsaveis e entregaveis
- **Registro de onboarding criado** (CRM entry)
  - Destination: CRM
  - Format: Card/registro com dados completos do cliente

---

## Precondicoes

- [ ] Dados completos do cliente recebidos de Vendas
- [ ] Proposta comercial assinada/aceita
- [ ] Contexto de venda documentado (dores, expectativas, promessas)
- [ ] Template de welcome-package disponivel

---

## Action Items

### Step 1: Validar Dados do Cliente

Verificar se todos os dados necessarios foram recebidos de Vendas. Se faltar algo, solicitar ANTES de seguir.

- [ ] Confirmar nome completo e empresa
- [ ] Confirmar email e telefone/WhatsApp
- [ ] Confirmar plano/servico contratado
- [ ] Confirmar promessas feitas durante a venda
- [ ] Confirmar expectativa de resultado do cliente

### Step 2: Preparar Pacote de Boas-Vindas

Usar o template `welcome-package.md` e personalizar para o cliente.

- [ ] Preencher dados do cliente no template
- [ ] Personalizar mensagem de boas-vindas com referencia as dores do cliente
- [ ] Listar proximos passos com datas concretas
- [ ] Anexar materiais iniciais (guia de uso, FAQ, contatos)
- [ ] Revisar tom: acolhedor, profissional, sem jargao tecnico desnecessario

### Step 3: Enviar Boas-Vindas

Comunicar em todos os canais combinados.

- [ ] Enviar email de boas-vindas com pacote completo
- [ ] Enviar mensagem de WhatsApp confirmando recebimento do email
- [ ] Confirmar que o cliente recebeu e entendeu os proximos passos

### Step 4: Alinhar Expectativas

Garantir que cliente e equipe estao na mesma pagina.

- [ ] Reforcar o que sera entregue (escopo)
- [ ] Reforcar o que NAO esta no escopo
- [ ] Confirmar canais de comunicacao (email, WhatsApp, Zoom)
- [ ] Confirmar horarios disponiveis para calls
- [ ] Definir data da call de setup (proximo passo)

---

## Acceptance Criteria

- [ ] **AC-01:** Email de boas-vindas enviado em ate 24h apos fechamento da venda
- [ ] **AC-02:** Proximos passos listados com datas especificas (nao vagas)
- [ ] **AC-03:** Cliente confirmou recebimento do welcome (email ou WhatsApp)
- [ ] **AC-04:** Call de setup agendada com data e horario definidos
- [ ] **AC-05:** Registro de onboarding criado no CRM com dados completos

---

## Veto Conditions

- NAO enviar welcome sem dados completos do cliente (nome, email, plano, contexto de venda)
- NAO enviar welcome sem proposta aprovada/assinada
- NAO prometer datas que nao foram validadas com a equipe
- NAO usar linguagem generica — sempre personalizar com o contexto do cliente

---

## Output Example

```yaml
welcome_record:
  cliente: "Joao Silva"
  empresa: "Tech Solutions Ltda"
  email: "joao@techsolutions.com"
  whatsapp: "+55 11 99999-0000"
  plano: "Pro Mensal"
  data_fechamento: "2026-02-24"
  welcome_enviado: true
  data_welcome: "2026-02-24"
  proximos_passos:
    - passo: "Call de setup"
      data: "2026-02-26"
      responsavel: "donna-weber"
    - passo: "Configuracao da conta"
      data: "2026-02-26"
      responsavel: "donna-weber"
    - passo: "Primeira vitoria"
      data: "2026-03-03"
      responsavel: "donna-weber"
  status: "welcome_enviado"
  proximo_passo: "setup-account"
```

---

## Tools

| Tool | Uso |
|------|-----|
| Email | Envio do welcome-package |
| WhatsApp | Confirmacao e comunicacao rapida |
| CRM | Registro do cliente e status |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `setup-account` |
| **Trigger** | Cliente confirmou recebimento do welcome |
| **Executor** | donna-weber |

### Handoff Checklist

- [ ] Email de boas-vindas enviado e confirmado
- [ ] Call de setup agendada
- [ ] Dados do cliente completos no CRM
- [ ] Contexto de venda documentado no registro

---

## Error Handling

### Cliente nao responde ao welcome

- **Trigger:** 48h sem resposta apos envio
- **Detection:** Sem confirmacao de recebimento
- **Recovery:** Enviar follow-up via WhatsApp. Se 72h sem resposta, escalar para CS Head.
- **Prevention:** Enviar via multiplos canais (email + WhatsApp)

### Dados incompletos de Vendas

- **Trigger:** Handoff de vendas sem dados essenciais
- **Detection:** Checklist de precondicoes falha
- **Recovery:** Solicitar dados faltantes ao SDR/Closer antes de iniciar
- **Prevention:** Checklist de handoff obrigatorio no squad-sales

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
