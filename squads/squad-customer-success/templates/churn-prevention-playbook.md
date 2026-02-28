# Churn Prevention Playbook

**Versao:** 1.0.0
**Ultima Atualizacao:** {last_updated}
**Responsavel:** {cs_head}
**Aprovado por:** {approved_by}

---

## Quando Usar Este Playbook

Este playbook e ativado quando um cliente entra na zona de risco (health score < 60) ou quando sinais de churn sao detectados. Cada cenario tem sinais especificos, acoes pre-aprovadas e scripts de comunicacao.

**Regra de ouro:** Diagnosticar ANTES de agir. Entender a causa raiz antes de oferecer qualquer solucao.

---

## Sinais de Churn — Deteccao Precoce

### Sinais de Alerta Primarios (acao em 48h)

| # | Sinal | Como Detectar | Urgencia |
|---|-------|--------------|----------|
| 1 | Queda de uso > 50% no ultimo mes | Metricas de plataforma (logins, acoes, tempo) | Alta |
| 2 | Zero logins em 15+ dias | Dashboard de uso | Alta |
| 3 | CSAT <= 2 em 2+ tickets consecutivos | Sistema de suporte | Alta |
| 4 | Pedido direto de cancelamento | Email, chat ou telefone | Critica |
| 5 | Pagamento atrasado > 15 dias | Financeiro/billing | Media-Alta |
| 6 | Ticket critico sem resolucao > 5 dias | Sistema de suporte | Alta |

### Sinais de Alerta Secundarios (acao em 1 semana)

| # | Sinal | Como Detectar | Urgencia |
|---|-------|--------------|----------|
| 7 | Mencao de concorrente | Interacoes de suporte ou engajamento | Media |
| 8 | Mudanca de decision maker | CRM, LinkedIn, contatos | Media |
| 9 | Queda de engajamento (nao responde emails/WhatsApp) | CRM, historico de contatos | Media |
| 10 | Uso apenas de funcionalidades basicas | Analytics de produto | Baixa-Media |
| 11 | Nao participou dos ultimos 3 eventos/webinars | Lista de presenca | Baixa |
| 12 | Equipe do cliente encolheu | Informacoes durante interacoes | Media |

---

## Cenarios e Acoes Pre-Aprovadas

### Cenario 1: Queda de Uso

**Causa tipica:** Cliente nao esta encontrando valor, time desengajou, prioridades mudaram.

**Diagnostico (perguntar):**
- "Como tem sido a rotina de uso da ferramenta no time?"
- "Houve alguma mudanca de prioridade ou projeto?"
- "Ha algo que podemos fazer diferente para se encaixar melhor no dia a dia?"

**Acoes pre-aprovadas:**

| Acao | Condicao | Aprovacao |
|------|----------|-----------|
| Sessao de re-onboarding (30min) | Cliente aceita call | CS |
| Envio de cases de uso relevantes | Sempre | CS |
| Criacao de workflow customizado | Cliente tem necessidade especifica | CS Head |
| Extensao de trial de feature premium (7 dias) | Pode reengajar | CS Head |

**Script de abordagem:**
```
Ola {client_name},

Percebi que o uso da plataforma diminuiu nas ultimas semanas
e queria entender como posso ajudar.

As vezes uma pequena mudanca na forma de usar pode fazer uma
grande diferenca nos resultados. Posso agendar 30 minutos
para revisarmos juntos?

Tenho alguns cases de clientes com perfil parecido que podem
trazer ideias novas.

{cs_manager}
```

---

### Cenario 2: Insatisfacao com Suporte

**Causa tipica:** Tickets demoram, solucao nao resolve, comunicacao ruim.

**Diagnostico (perguntar):**
- "Sei que teve dificuldades recentes com nosso suporte. Pode me contar mais?"
- "O que esperava que tivesse acontecido diferente?"
- "Como posso garantir que isso nao se repita?"

**Acoes pre-aprovadas:**

| Acao | Condicao | Aprovacao |
|------|----------|-----------|
| Atendimento prioritario (30 dias) | CSAT <= 2 repetido | CS |
| Review completo dos tickets pendentes | Tickets abertos > 3 | CS + Suporte |
| Canal direto com especialista | Problema tecnico complexo | CS Head |
| Credit de servico (valor definido) | Impacto comprovado no negocio | CS Head |

**Script de abordagem:**
```
Ola {client_name},

Vi que suas ultimas experiencias com nosso suporte nao foram
como esperamos entregar. Quero pedir desculpas pessoalmente
e garantir que vamos corrigir isso.

Ja revisei seus tickets em aberto e quero alinhar uma solucao
para cada um deles. Tem disponibilidade para uma call de 20 minutos?

A partir de agora, voce tera atendimento prioritario por 30 dias
enquanto trabalhamos para resolver tudo.

{cs_manager}
```

---

### Cenario 3: Problema de Produto

**Causa tipica:** Feature faltando, bug impactante, UX confusa, performance ruim.

**Diagnostico (perguntar):**
- "Qual funcionalidade esta fazendo mais falta no dia a dia?"
- "Esse problema esta impedindo algum processo critico?"
- "Se pudesse mudar uma coisa no produto, qual seria?"

**Acoes pre-aprovadas:**

| Acao | Condicao | Aprovacao |
|------|----------|-----------|
| Escalar para Produto com deadline | Bug que impacta operacao | CS Head |
| Workaround documentado | Enquanto bug nao e corrigido | CS |
| Acesso antecipado a beta | Feature no roadmap | CS Head + Produto |
| Sessao de feedback com PM | Feature request recorrente | CS Head |

**Script de abordagem:**
```
Ola {client_name},

Entendo a frustacao com {specific_issue}. Quero ser
transparente sobre o que estamos fazendo:

1. O problema ja foi escalado para nosso time de produto
2. Prazo estimado de resolucao: {estimated_timeline}
3. Enquanto isso, preparei um workaround: {workaround_link}

Posso te ligar rapidamente para garantir que o workaround
funcione no seu caso?

{cs_manager}
```

---

### Cenario 4: Expectativa Desalinhada

**Causa tipica:** Vendas prometeu algo diferente, cliente esperava mais, escopo mal definido.

**Diagnostico (perguntar):**
- "O que voce esperava receber quando contratou?"
- "Ha algo que voce entendeu que estaria incluido e nao esta?"
- "Como posso alinhar melhor o que podemos entregar?"

**Acoes pre-aprovadas:**

| Acao | Condicao | Aprovacao |
|------|----------|-----------|
| Sessao de realinhamento de expectativas | Sempre | CS |
| Upgrade de plano com desconto (30 dias) | Expectativa era de plano superior | CS Head |
| Extensao de prazo de resultado | Meta era irrealista | CS |
| Feedback para Vendas (sinapse) | Promessa nao cumprivel | CS Head |

**Script de abordagem:**
```
Ola {client_name},

Quero garantir que estamos na mesma pagina sobre o que
podemos entregar juntos.

Gostaria de agendar 30 minutos para revisar suas
expectativas e alinhar um plano de acao concreto para
os proximos 30 dias, com metas claras e realistas.

Meu objetivo e que voce tenha resultados reais, nao
apenas promessas.

{cs_manager}
```

---

### Cenario 5: Problema Financeiro

**Causa tipica:** Orcamento cortado, crise, mudanca de prioridades financeiras.

**Diagnostico (perguntar):**
- "Houve alguma mudanca no orcamento ou prioridades?"
- "O valor esta sendo um problema ou e a percepcao de retorno?"
- "Existe um plano que se encaixaria melhor no momento?"

**Acoes pre-aprovadas:**

| Acao | Condicao | Aprovacao |
|------|----------|-----------|
| Downgrade de plano (sem cancelar) | Cliente quer reduzir custo | CS |
| Pausa temporaria (30-60 dias) | Crise temporaria comprovada | CS Head |
| Desconto de retencao (ate 20%) | Cliente de 6+ meses, health score era 70+ | CS Head |
| Plano de pagamento flexivel | Pagamento atrasado por fluxo de caixa | CS Head + Financeiro |

**Script de abordagem:**
```
Ola {client_name},

Entendo que momentos de ajuste financeiro acontecem e
quero encontrar uma forma de voce continuar tendo acesso
ao valor que ja esta usando.

Tenho algumas opcoes que podem ajudar:
- Ajustar o plano ao que faz mais sentido agora
- Flexibilizar o pagamento temporariamente

Prefiro adaptar do que perder voce como cliente.
Podemos conversar sobre isso?

{cs_manager}
```

---

### Cenario 6: Pedido Direto de Cancelamento

**Causa tipica:** Combinacao de fatores ou decisao ja tomada.

**Diagnostico (perguntar):**
- "Posso perguntar o que motivou essa decisao?"
- "Ha algo que poderiamos ter feito diferente?"
- "Se pudesse resolver uma unica coisa, voce ficaria?"

**Acoes pre-aprovadas:**

| Acao | Condicao | Aprovacao |
|------|----------|-----------|
| Call de retencao (CS Head) | Valor alto ou cliente estrategico | CS Head |
| Oferta de retencao personalizada | Causa raiz pode ser resolvida | CS Head |
| Processamento do cancelamento | Cliente decidido e irredutivel | CS |
| Pesquisa de saida detalhada | Sempre (mesmo se cancelar) | CS |

**Regras para o pedido de cancelamento:**
```
1. NUNCA dificultar o cancelamento (respeitar a decisao)
2. SEMPRE perguntar o motivo (mesmo que cancele)
3. Se ha causa raiz resolvivel: oferecer solucao UMA VEZ
4. Se cliente decidiu: processar, agradecer e aprender
5. Registrar motivo real (nao o generico) no CRM
```

**Script de abordagem:**
```
Ola {client_name},

Recebi seu pedido e quero primeiro agradecer pelo tempo
que foi nosso cliente.

Antes de processar, posso te fazer uma pergunta?
Gostaria de entender o que motivou essa decisao para
que possamos melhorar.

Se houver algo que possamos resolver, gostaria de ter
essa chance. Se a decisao ja esta tomada, respeito
totalmente e vou garantir uma transicao tranquila.

{cs_manager}
```

---

## Ofertas de Retencao — Tabela de Aprovacao

| Oferta | Valor Maximo | Quem Aprova | Condicao |
|--------|-------------|-------------|----------|
| Sessao extra de treinamento | Custo interno | CS | Sempre |
| Extensao de trial de feature | 7-14 dias | CS Head | Cliente de 3+ meses |
| Desconto 10% por 3 meses | 10% do MRR x 3 | CS Head | Cliente de 6+ meses |
| Desconto 20% por 3 meses | 20% do MRR x 3 | CS Head + Diretor | Cliente de 12+ meses, high value |
| Downgrade temporario | Diferenca de plano | CS | Sempre |
| Pausa de cobranca | Ate 60 dias | CS Head + Financeiro | Crise comprovada |
| Credit de servico | Ate R$ {credit_limit} | CS Head | Falha comprovada do lado da empresa |

**Regra absoluta:** Desconto so e valido se acompanhado de plano de acao para resolver a causa raiz. Desconto sem resolucao = adiamento de churn.

---

## Processo de Saida (quando churn acontece)

Se o cliente decidiu cancelar e a decisao e definitiva:

- [ ] Processar cancelamento conforme prazo contratual
- [ ] Enviar pesquisa de saida detalhada
- [ ] Registrar motivo primario e secundario no CRM
- [ ] Exportar dados do cliente (se solicitado)
- [ ] Agradecer formalmente pela parceria
- [ ] Registrar aprendizado para retrospectiva mensal
- [ ] Agendar contato em 90 dias ("win-back" — checar se quer voltar)

---

## Metricas de Retencao

| Metrica | Como Medir | Meta |
|---------|-----------|------|
| **Save Rate** | Clientes retidos / Clientes em risco | >= 70% |
| **Churn Rate Mensal** | Clientes perdidos / Total clientes | <= 5% |
| **Tempo Medio de Recuperacao** | Dias entre deteccao e resolucao | <= 14 dias |
| **Motivo Mais Comum de Churn** | Analise de causas no CRM | Reduzir #1 em 20% |
| **Revenue Saved** | MRR retido que estava em risco | Registrar mensalmente |

---

## Retrospectiva Mensal de Churn

Todo mes, revisar:

- [ ] Quantos clientes entraram em risco?
- [ ] Quantos foram salvos? Quais acoes funcionaram?
- [ ] Quantos cancelaram? Quais motivos?
- [ ] O que mudou no produto/servico que causou churn?
- [ ] O que podemos prevenir no proximo mes?
- [ ] Atualizar este playbook com novos cenarios/scripts

---

_Template: churn-prevention-playbook v1.0_
_Squad: squad-customer-success_
_Owner: joey-coleman_
_Aprovacao: CS Head (lincoln-murphy)_
_Revisao: Mensal_
