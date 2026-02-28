# Plugin: n8n — Workflow Automation Templates

Templatesde workflows n8n prontos para uso em projetos clonados da matriz.
Cada template resolve um caso comum de automacao definido na fase de operacao.

## Estrutura

```
plugins/n8n/
├── README.md
├── templates/           ← Workflows exportados (.json)
│   ├── onboarding/      ← Fluxos de onboarding de cliente
│   ├── notifications/   ← Alertas e notificacoes
│   ├── crm/             ← Integracao com CRM
│   └── content/         ← Automacao de publicacao
└── config.yaml          ← Configuracao base (credentials, env vars)
```

## Como Usar

1. Squad-chief (ia-agency-chief) define quais automacoes o projeto precisa na fase `operacao`
2. Verificar se existe template aqui antes de criar do zero (REUSE > CREATE)
3. Importar o `.json` no n8n do cliente
4. Ajustar credentials e variaveis conforme `config.yaml`

## Templates Disponiveis

> Preencher conforme templates forem criados.

| Template | Pasta | Descricao |
|----------|-------|-----------|
| — | — | Nenhum template ainda |

## Conexao com World OS

- **Fase:** operacao
- **Squad:** squad-agency
- **Deliverable:** `deliverables/operacao/automation-map.md` lista quais automacoes usar
- **Config:** Credentials e env vars NUNCA vao no template — vao no `config.yaml` local do projeto
