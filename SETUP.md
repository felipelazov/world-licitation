# Setup — World OS para Licitation

> Guia passo-a-passo para ativar seu World OS

**Data de Criação:** 2026-03-04
**Cliente:** Licitation
**Segmento:** Licitacao Publica - Cesta Basica

---

## ✅ Seu Projeto Já Tem

- ✅ 8 squads especializados (Produto, Vendas, CS, Marketing, etc)
- ✅ 40+ agentes de elite (Marty Cagan, Alex Hormozi, Lincoln Murphy, etc)
- ✅ 100+ tasks executáveis
- ✅ Protocolo Sinapse para comunicação entre squads
- ✅ Estado vivo do projeto (project-state.yaml)
- ✅ Memória persistente por sessão

---

## 🚀 Primeiros Passos

### 1. Entenda o Projeto (5 minutos)

Leia:
- **README.md** — visão geral
- **.claude/CLAUDE.md** — regras técnicas (opcional, avançado)

### 2. Configure Básico (2 minutos)

Edite `client-config.yaml`:
```yaml
cliente:
  nome: Licitation
  segmento: Licitacao Publica - Cesta Basica

# Preencha mais conforme você conhecer seu negócio
```

### 3. Ative o Dashboard (1 minuto)

Execute no Claude Code:
```
/world-os
```

Isso mostra:
- Estado atual do projeto
- Progresso em 8 fases
- Próximos passos recomendados
- Qual squad ativar

### 4. Escolha seu Ponto de Entrada

**Se quer começar com ESTRATÉGIA:**
```
/squad-advisor:agents:advisor-chief
```
Simon Sinek vai ajudar você a definir WHY, HOW, WHAT do seu negócio.

**Se quer começar com PRODUTO:**
```
/squad-product:agents:marty-cagan
```
Marty Cagan vai estruturar visão de produto e descoberta.

**Se quer começar com VENDAS:**
```
/squad-sales:agents:alex-hormozi
```
Alex Hormozi vai estruturar oferta e estratégia de preço.

**Se quer começar com CS:**
```
/squad-customer-success:agents:lincoln-murphy
```
Lincoln Murphy vai estruturar estratégia de retenção.

---

## 📋 Estrutura de Pastas

Quando você clonou, recebeu:

```
world-Licitation/
├── .claude/                    ← Configuração do Claude Code
│   ├── CLAUDE.md              (regras do projeto)
│   ├── commands/              (skills/atalhos)
│   ├── rules/                 (protocolos globais)
│   └── mcp-strategy.md        (como usar web search, GitHub, etc)
│
├── squads/                     ← 8 squads especializados
│   ├── squad-product/
│   ├── squad-sales/
│   ├── squad-customer-success/
│   ├── squad-marketing/
│   ├── squad-design/
│   ├── squad-content-distillery/
│   ├── squad-franchise/
│   └── squad-zona-genialidade/
│
├── docs/                       ← Documentação
│   ├── stories/               (desenvolvimento orientado a histórias)
│   ├── prd/                   (product requirements)
│   └── architecture/          (design do sistema)
│
├── project-state.yaml         ← Estado vivo (IMPORTANTE!)
├── client-config.yaml         ← Configuração do cliente
├── README.md                  (este está lendo)
└── SETUP.md                   (você está aqui)
```

---

## 🔄 Como o Project State Funciona

**`project-state.yaml`** é o "coração" do seu projeto. Contém:

```yaml
projeto:
  nome: Licitation
  cliente: Licitation
  segmento: Licitacao Publica - Cesta Basica

decisoes:        # Decisões tomadas (histórico)
sinapses:        # Comunicação entre squads (fila)
negocio:         # Contexto vivo (WHY, oferta, preço, etc)
progresso:       # 8 fases de desenvolvimento
ultima_sessao:   # Resumo da última operação
```

**Como funciona:**
1. Você ativa um squad
2. O squad **lê** project-state.yaml no início
3. O squad **trabalha** e toma decisões
4. O squad **escreve** as decisões de volta
5. Próximo squad **lê** e vê as decisões anteriores

É um circuito fechado!

---

## 🎯 Os 8 Squads Explicados

| Squad | Chief | O que faz |
|-------|-------|----------|
| **squad-advisor** | Simon Sinek | Estratégia, WHY, posicionamento de marca |
| **squad-product** | Marty Cagan | Visão de produto, discovery, roadmap |
| **squad-sales** | Alex Hormozi | Oferta, preço, pitch, estratégia de vendas |
| **squad-customer-success** | Lincoln Murphy | Retenção, health score, growth loops |
| **squad-marketing** | Gary Vaynerchuk | Campanhas, conteúdo, growth hacking |
| **squad-design** | Marty Neumeier | Identidade visual, UX, brand guidelines |
| **squad-content-distillery** | distillery-chief | Atomizar conhecimento em conteúdo multi-canal |
| **squad-zona-genialidade** | zona-genialidade-chief | Descobrir zona de genialidade (seu diferencial único) |

---

## 💡 Dica Profissional

Não ative todos os squads no dia 1. Recomendamos:

**Semana 1:**
- `/squad-advisor:agents:advisor-chief` — defina WHY, HOW, WHAT
- Preencha `project-state.yaml` com contexto de negócio

**Semana 2:**
- `/squad-product:agents:marty-cagan` — estruture produto
- OU `/squad-sales:agents:alex-hormozi` — estruture oferta

**Semana 3+:**
- Ative outros squads conforme necessidade

Cada ativação manda **sinapses** para outros squads. O sistema é inteligente: trabalham juntos automaticamente.

---

## 🆘 Problemas Comuns

**P: Onde inicio?**
R: Rode `/world-os`. O maestro te recomenda o próximo passo.

**P: Como squads se comunicam?**
R: Via **sinapses** em project-state.yaml. Automático.

**P: Posso ativar múltiplos squads ao mesmo tempo?**
R: Sim, mas em sessões separadas. Cada um trabalha independente.

**P: Meus dados ficam salvos?**
R: Sim! project-state.yaml + memory persistem entre sessões.

**P: Posso customizar os squads?**
R: Sim! Edite `.claude/CLAUDE.md` e regras específicas em `squads/squad-*/`

---

## 📞 Próximo Passo

**Agora:**
1. Abra o projeto no Claude Code
2. Rode `/world-os`
3. Siga as recomendações do maestro

**Que comece a mágica! 🚀**

---

*Setup criado em 2026-03-04 para Licitation*
