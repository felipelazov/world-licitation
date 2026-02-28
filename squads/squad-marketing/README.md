# Squad Marketing

> AI Marketing Team liderado por Thiago Finch com 5 especialistas de elite.

## Overview

Squad completo de marketing digital com 6 agentes clonados de elite minds reais.
Cada agente tem frameworks documentados, Voice DNA e Thinking DNA extraidos de
practitioners com skin in the game.

## Squad Roster

```
squad-marketing/
|
+-- Thiago Finch ............ AI Head of Marketing (Chief/Router)
|   Framework: Maquina Milionaria, 42-Step VSL, Launch Strategy
|   Track record: R$300M+, R$128M em 50 dias
|
+-- Gary Vaynerchuk ......... Social Media Manager (Tier 1)
|   Framework: JJJRH, $1.80 Strategy, Day Trading Attention
|   Track record: VaynerMedia $300M+, 40M followers
|
+-- Depesh Mandalia ......... Media Buyer (Tier 1)
|   Framework: BPM Method, GT-CBO (Testing>Prospecting>Scaling)
|   Track record: Escala negocios past $10M
|
+-- Andre Chaperon .......... Email Strategist (Tier 1)
|   Framework: Autoresponder Madness, Soap Opera Sequence, SOI
|   Track record: $70K de 1000 subs, 73.2% open rate
|
+-- Joe Pulizzi ............. Content Manager (Tier 2)
|   Framework: Content Inc 6-Step, CMI Operating Framework
|   Track record: Fundou CMI, vendeu para UBM/Informa
|
+-- Avinash Kaushik ......... Research Analyst (Tier 2)
    Framework: DMMM, See-Think-Do-Care, Impact Matrix
    Track record: 12+ anos Google, Fortune 500
```

## Ativacao

### Via Chief (recomendado)
```
/squad-marketing:agents:thiago-finch
```
O Chief roteia automaticamente para o especialista certo.

### Ativacao direta de agente
```
/squad-marketing:agents:gary-vaynerchuk     # Social Media
/squad-marketing:agents:depesh-mandalia      # Media Buying
/squad-marketing:agents:andre-chaperon       # Email
/squad-marketing:agents:joe-pulizzi          # Content
/squad-marketing:agents:avinash-kaushik      # Research/Analytics
```

## Comandos por Agente

### Thiago Finch (Chief)
| Comando | Descricao |
|---------|-----------|
| `*route {situacao}` | Roteia para o especialista certo |
| `*board {tema}` | Os 5 especialistas opinam |
| `*social` | Conectar com Gary Vaynerchuk |
| `*traffic` | Conectar com Depesh Mandalia |
| `*email` | Conectar com Andre Chaperon |
| `*content` | Conectar com Joe Pulizzi |
| `*research` | Conectar com Avinash Kaushik |
| `*launch` | Framework de lancamento |
| `*vsl` | VSL 42-Step Method |
| `*funnel` | Arquitetura de funil |

### Gary Vaynerchuk (Social Media)
| Comando | Descricao |
|---------|-----------|
| `*jjjrh {plataforma}` | Aplicar JJJRH numa plataforma |
| `*content-model {tema}` | Pillar > micro content plan |
| `*180 {nicho}` | Estrategia $1.80 |
| `*day-trade {plataforma}` | Analise Day Trading Attention |
| `*audit-social {perfil}` | Auditoria de perfil social |
| `*calendar {semana}` | Calendario semanal de conteudo |

### Depesh Mandalia (Media Buyer)
| Comando | Descricao |
|---------|-----------|
| `*bpm {produto}` | Aplicar BPM Method |
| `*cbo-test {objetivo}` | Estrutura de teste CBO |
| `*cbo-scale {campanha}` | Estrategia de escala |
| `*creative-matrix {produto}` | Plano de teste de criativos |
| `*audit-ads {conta}` | Auditoria de conta de ads |
| `*budget {valor}` | Alocacao de orcamento |
| `*diagnose {metricas}` | Diagnostico de performance |

### Andre Chaperon (Email)
| Comando | Descricao |
|---------|-----------|
| `*soap-opera {produto}` | Criar Soap Opera Sequence |
| `*welcome {negocio}` | Sequencia de boas-vindas |
| `*world-build {marca}` | Construir mundo narrativo |
| `*sequence {objetivo}` | Sequencia para objetivo especifico |
| `*audit-email {sequencia}` | Auditoria de emails |
| `*open-loop {tema}` | Criar open loops |
| `*rewrite {email}` | Reescrever email com ARM |

### Joe Pulizzi (Content)
| Comando | Descricao |
|---------|-----------|
| `*content-inc {negocio}` | Aplicar Content Inc Model |
| `*tilt {area}` | Encontrar Content Tilt |
| `*mission {marca}` | Content mission statement |
| `*editorial {periodo}` | Calendario editorial |
| `*strategy {negocio}` | Estrategia completa de conteudo |
| `*audit-content {canal}` | Auditoria de conteudo |
| `*monetize {audiencia}` | Monetizacao de audiencia |

### Avinash Kaushik (Research)
| Comando | Descricao |
|---------|-----------|
| `*dmmm {negocio}` | Construir DMMM |
| `*stdc {produto}` | Aplicar See-Think-Do-Care |
| `*impact-matrix {iniciativas}` | Priorizar iniciativas |
| `*audit-analytics {canal}` | Auditoria de analytics |
| `*kpi-framework {objetivo}` | Framework de KPIs |
| `*dashboard {area}` | Design de dashboard |
| `*diagnose {dados}` | Diagnosticar performance |
| `*report {periodo}` | Template de relatorio |

## Fluxo de Trabalho Tipico

```
1. RESEARCH     Avinash constroi DMMM + STDC
                    |
2. STRATEGY     Thiago Finch define estrategia de lancamento
                    |
3. CONTENT      Joe Pulizzi cria Content Tilt + editorial
                    |
4. SOCIAL       Gary Vee distribui conteudo nas plataformas
                    |
5. EMAIL        Andre Chaperon cria sequencias de nurturing
                    |
6. TRAFFIC      Depesh escala via Meta Ads (BPM + CBO)
                    |
7. ANALYZE      Avinash mede resultados + diagnostica
                    |
8. OPTIMIZE     Loop: voltar ao passo que precisa de ajuste
```

## Estrutura de Arquivos

```
squads/squad-marketing/
├── agents/
│   ├── thiago-finch.md          # Chief (1,568 lines)
│   ├── gary-vaynerchuk.md       # Social Media (1,382 lines)
│   ├── depesh-mandalia.md       # Media Buyer (1,351 lines)
│   ├── andre-chaperon.md        # Email Strategist (1,733 lines)
│   ├── joe-pulizzi.md           # Content Manager (1,541 lines)
│   └── avinash-kaushik.md       # Research Analyst (1,755 lines)
├── tasks/
├── templates/
├── checklists/
├── data/
├── config.yaml
└── README.md
```

## Integracao com World OS

O squad-marketing se integra via Sinapse Protocol:
- **Recebe de:** squad-advisor (posicionamento, oferta, produto)
- **Envia para:** squad-design (briefs de identidade visual), squad-content-distillery (conteudo para atomizar), squad-agency (operacao de marketing)
- **Fase no project-state:** conteudo, operacao

## Metricas de Qualidade

| Agente | Linhas | Frameworks | Output Examples | Score |
|--------|--------|------------|-----------------|-------|
| Thiago Finch | 1,568 | 4 | 4 | 14/15 |
| Gary Vaynerchuk | 1,382 | 4 | 3 | 15/15 |
| Depesh Mandalia | 1,351 | 4 | 4 | 14/15 |
| Andre Chaperon | 1,733 | 4 | 4 | 15/15 |
| Joe Pulizzi | 1,541 | 4 | 4 | 15/15 |
| Avinash Kaushik | 1,755 | 5 | 3 | 15/15 |
| **TOTAL** | **9,330** | **25** | **22** | |

---

**Version:** 1.0.0
**Created:** 2026-02-24
**Architecture:** Clone minds > create bots
**Quality:** All agents pass SC_AGT_001 quality gate
