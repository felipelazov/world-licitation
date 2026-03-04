# Licitation — World OS

> Projeto Matrix Licitacao Publica - Cesta Basica — Operações de Produto, Marketing, Vendas e CS com Agentes IA de Elite

**Cliente:** Licitation
**Segmento:** Licitacao Publica - Cesta Basica
**Criado:** 2026-03-04
**Baseado em:** World OS Matrix

---

## O que é isso?

Você tem um **sistema operacional inteligente** para rodar seu negócio. 8 squads especializados (Produto, Marketing, Vendas, CS, Design, Conteúdo, Franquias, Zona de Genialidade) orquestrados por agentes IA world-class.

Cada squad tem **chefs de elite** em seu domínio:
- **squad-product:** Marty Cagan, Melissa Perri, April Dunford, Nir Eyal
- **squad-sales:** Alex Hormozi, Jeremy Miner, Jacco van der Kooij, Jeb Blount
- **squad-customer-success:** Lincoln Murphy, Wayne McCulloch, Shep Hyken, Joey Coleman, Donna Weber
- ... e mais 5 squads

---

## Como começar

1. **Leia SETUP.md** — passo-a-passo inicial
2. **Abra `.claude/CLAUDE.md`** — regras e padrões do projeto
3. **Ative um squad** — exemplo: `/squad-product:agents:marty-cagan`
4. **Use `/world-os`** — dashboard e orquestração

---

## Estrutura

```
/Users/felipeoliveira/Desktop/world-licitation/
├── .claude/
│   ├── CLAUDE.md (regras do projeto)
│   ├── commands/ (skills/atalhos)
│   ├── rules/ (protocolos globais)
│   └── projects/.../memory/ (sua memória persistente)
│
├── squads/ (8 squads especializados)
│   ├── squad-product/
│   ├── squad-sales/
│   ├── squad-customer-success/
│   ├── squad-marketing/
│   ├── squad-design/
│   ├── squad-content-distillery/
│   ├── squad-franchise/
│   └── squad-zona-genialidade/
│
├── docs/
│   ├── stories/ (desenvolvimento orientado a histórias)
│   ├── prd/ (product requirement documents)
│   └── architecture/ (design do sistema)
│
├── project-state.yaml (estado vivo do projeto)
├── client-config.yaml (configurações do cliente)
└── README.md (este arquivo)
```

---

## Como funciona

### Protocolo Sinapse
Squads se comunicam via **sinapses** — um protocolo simples de 5 campos:
- **De:** qual squad enviou
- **Para:** qual squad recebe
- **Decisão:** o que foi decidido
- **Contexto:** por que foi decidido
- **Ação:** o que o squad destino deve fazer

Veja em `.claude/rules/sinapse-protocol.md`

### Estado Vivo
`project-state.yaml` é o **coração** do projeto:
- Decisões tomadas
- Sinapses pendentes
- Contexto do negócio
- Progresso em 8 fases

Squads **leem** no início, **escrevem** ao concluir.

---

## Primeiros Passos

**Opção A: Explorar o Dashboard**
```
/world-os
```
Mostra estado do projeto, recomenda próximos passos, roteia para squad correto.

**Opção B: Ativar um Squad**
```
/squad-product:agents:marty-cagan
```
Marty Cagan (Chief de Produto) toma conta. Você describe o que precisa, ele roteia pros especialistas certos.

**Opção C: Ler a Documentação**
- SETUP.md — roteiro detalhado
- .claude/CLAUDE.md — regras técnicas
- squads/squad-*/README.md — o que cada squad faz

---

## Dúvidas?

Tudo está documentado. Se não entender algo, pergunte ao `/world-os` — ele é o maestro que orquestra tudo.

---

*Bem-vindo ao World OS, Licitation! 🚀*
