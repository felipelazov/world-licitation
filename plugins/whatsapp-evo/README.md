# Plugin: WhatsApp Evolution API — Bot & Messaging

Configuracao e templates para integracao com WhatsApp via Evolution API.
Usado para atendimento, onboarding de clientes, notificacoes e automacoes conversacionais.

## Estrutura

```
plugins/whatsapp-evo/
├── README.md
├── config.yaml           ← Configuracao da instancia Evolution API
├── templates/            ← Templates de mensagens e fluxos
│   ├── onboarding/       ← Mensagens de boas-vindas e onboarding
│   ├── follow-up/        ← Cadencias de follow-up automatico
│   ├── support/          ← Fluxos de atendimento/suporte
│   └── notifications/    ← Alertas e notificacoes transacionais
└── flows/                ← Fluxos conversacionais (chatbot)
```

## Como Usar

1. Configurar instancia Evolution API no `config.yaml`
2. Squad-chief (ia-agency-chief ou gestor-operacional) define quais fluxos o projeto precisa
3. Importar templates de mensagem e ajustar para o contexto do cliente
4. Conectar com n8n para automacoes (webhook triggers)

## Templates Disponiveis

> Preencher conforme templates forem criados.

| Template | Pasta | Descricao |
|----------|-------|-----------|
| — | — | Nenhum template ainda |

## Conexao com World OS

- **Fases:** operacao, retencao, vendas
- **Squads:** squad-agency (setup), squad-customer-success (atendimento), squad-sales (prospeccao)
- **Deliverables relacionados:**
  - `deliverables/operacao/automation-map.md` — lista automacoes WhatsApp
  - `deliverables/retencao/onboarding-playbook.md` — fluxo de onboarding que pode usar WhatsApp
  - `deliverables/vendas/prospecting-cadence.md` — cadencia que pode incluir WhatsApp

## Evolution API

- **Docs:** https://doc.evolution-api.com
- **Protocolo:** REST API + WebSocket
- **Autenticacao:** API Key por instancia
- **Limite:** 1 numero por instancia (WhatsApp Business ou pessoal)
