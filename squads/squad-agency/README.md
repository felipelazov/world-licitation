# IA Agency OS

> Agencia de solucoes de IA para PMEs — por quem ja construiu empresas de verdade.

---

## O Que e Este Squad?

Squad CUSTOMIZADO para Felipe Lazov operar sua agencia de IA para PMEs. Combina:

- **Creator-OS** — Criacao de produtos, mentorias e conteudo sobre IA
- **AI Studio** — Construcao tecnica de agentes, automacoes e apps
- **Business Experience** — 5+ anos empreendendo (loja online, mercados, consultoria)

**Diferencial:** NAO e mais um "especialista em IA". E um EMPRESARIO que usa IA para resolver problemas reais de negocios, porque JA viveu esses problemas.

---

## Quick Start

```
/IAAgencyOS:agents:ia-agency-chief    # Ativar o squad completo
/IAAgencyOS:tasks:diagnostico-cliente  # Rodar diagnostico de cliente
/IAAgencyOS:tasks:proposta-comercial   # Gerar proposta comercial
/IAAgencyOS:tasks:conteudo-diario      # Criar conteudo do dia
/IAAgencyOS:tasks:onboarding-cliente   # Fazer onboarding de novo cliente
```

---

## Agentes

| Agente | Tier | Funcao | Felipe Faz? |
|--------|------|--------|-------------|
| **ia-agency-chief** | Orchestrator | Roteia clientes, gerencia pipeline, coordena agentes | Sim |
| **estrategista-negocios** | Tier 0 | Diagnostica processos do cliente e prescreve solucoes de IA | Sim (Genialidade) |
| **construtor-agentes** | Tier 1 | Desenvolve agentes WhatsApp, automacoes, apps | Sim → Delegar |
| **gestor-conteudo** | Tier 1 | Cria conteudo sobre IA para PMEs (posicionamento) | Sim (Quick Wins) |
| **gestor-operacional** | Tier 2 | Admin, financeiro, atendimento, processos | DELEGAR |

---

## Tasks

| Task | Descricao | Tipo |
|------|-----------|------|
| **diagnostico-cliente** | Diagnostico completo do negocio do cliente + prescricao de IA | Interativo |
| **proposta-comercial** | Gera proposta comercial personalizada | Hibrido |
| **conteudo-diario** | Cria post diario sobre IA para PMEs | Autonomo |
| **onboarding-cliente** | Onboarding de novo cliente (checklist + setup) | Interativo |

---

## Pipeline do Cliente

```
LEAD (warm outreach / conteudo)
  |
  v
DIAGNOSTICO (30 min)
  Task: diagnostico-cliente
  Agent: estrategista-negocios
  Output: Mapa de processos + oportunidades IA
  |
  v
PROPOSTA (automatica)
  Task: proposta-comercial
  Agent: ia-agency-chief
  Output: Proposta PDF personalizada
  |
  v
ONBOARDING (1h)
  Task: onboarding-cliente
  Agent: gestor-operacional
  Output: Cliente setup completo
  |
  v
ENTREGA (30 dias)
  Agent: construtor-agentes
  Output: Solucao IA funcionando
  |
  v
ACOMPANHAMENTO (mensal)
  Agent: gestor-operacional
  Output: Report + otimizacoes
```

---

## Perfil do Operador

Este squad foi desenhado para o perfil especifico de Felipe Lazov:

- **Hamilton:** Creator-Mechanic (Dynamo) — cria rapido, melhora no caminho
- **Kolbe:** 5-7-8-5 — Quick Start 8 (comeca muitas coisas, quer que todas funcionem)
- **Clifton:** Strategic Thinking dominante (Ideation, Strategic, Learner)
- **Hogshead:** Maverick Leader (Innovation + Power) — gera fascinacao por ideias ousadas
- **Hendricks:** Zona de Genialidade = Criar + Ensinar + Estrategizar
- **Hormozi:** Value Score 2.0 → meta 6.0+ com redesign de oferta

---

## Monetizacao

| Metrica | Valor |
|---------|-------|
| Ticket Medio | R$2.500/mes |
| Meta Clientes (90 dias) | 10 |
| Meta Receita (90 dias) | R$20.000/mes |
| Meta Receita (6 meses) | R$50-100k/mes |
| Canal Primario | Free Content (1 post/dia) |
| Canal Secundario | Warm Outreach (rede existente) |
| Grand Slam Offer | "Seu negocio rodando com IA em 30 dias" |

---

## Estrutura

```
squads/ia-agency-os/
├── config.yaml
├── README.md
├── agents/
│   ├── ia-agency-chief.md
│   ├── estrategista-negocios.md
│   ├── construtor-agentes.md
│   ├── gestor-conteudo.md
│   └── gestor-operacional.md
├── tasks/
│   ├── diagnostico-cliente.md
│   ├── proposta-comercial.md
│   ├── conteudo-diario.md
│   └── onboarding-cliente.md
└── data/
    └── ia-agency-kb.md
```

---

## Roadmap 30-60-90

**Mes 1 — Validacao:**
- Listar 20 empresarios da rede
- Oferecer diagnostico gratuito de IA
- Fechar 3-5 clientes a R$2.500/mes
- Documentar cases

**Mes 2 — Otimizacao:**
- Ajustar oferta com feedback dos clientes
- Criar processo padrao de entrega
- Comecar conteudo diario
- Escalar para 10 clientes

**Mes 3 — Escala:**
- Contratar primeiro VA operacional
- Focar no estrategico (Zona de Genialidade)
- Ativar canal secundario (paid ads se CAC < LTV/3)
- Meta: R$25.000/mes

---

*Squad gerado pelo pipeline Zona de Genialidade + Squad Creator*
*Perfil: Felipe Lazov | Data: 2026-02-21 | Versao: 1.0.0*
