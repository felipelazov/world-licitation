# Task: Deliver First Value

**Task ID:** `cs-on-first-value`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Deliver First Value |
| **status** | `pending` |
| **responsible_executor** | donna-weber (Onboarding Specialist) |
| **execution_type** | `Hybrid` |
| **input** | Cliente configurado |
| **output** | Primeira vitoria documentada + feedback coletado |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 1-2h

---

## Overview

Guiar o cliente ate a primeira vitoria concreta e mensuravel. Este e o momento mais critico do onboarding — a experiencia do "aha moment" que transforma ceticos em defensores. A primeira vitoria deve ser rapida, visivel e conectada diretamente a dor que motivou a compra.

---

## Input

- **Registro de setup** (CRM entry)
  - Required: Yes
  - Source: Task `setup-account`
  - Descricao: Conta configurada, funcionalidades ativas, materiais enviados
- **Dores do cliente** (text)
  - Required: Yes
  - Source: Contexto de venda (task `welcome-client`)
  - Descricao: Problema principal que motivou a compra
- **Plano contratado** (text)
  - Required: Yes
  - Source: CRM
  - Descricao: Servico/plano e funcionalidades disponiveis

---

## Output

- **Primeira vitoria documentada** (document)
  - Destination: CRM + pasta do cliente
  - Format: Descricao do resultado alcancado com evidencia
- **Feedback do cliente** (text)
  - Destination: CRM
  - Format: Depoimento/avaliacao do cliente sobre a experiencia
- **Case study seed** (document)
  - Destination: Pasta de marketing (se autorizado)
  - Format: Rascunho de caso de sucesso para uso futuro

---

## Precondicoes

- [ ] Setup completo (task `setup-account` finalizada)
- [ ] Cliente com acesso funcional a plataforma/servico
- [ ] Quick win identificado (resultado rapido e mensuravel)
- [ ] Metricas de baseline coletadas (antes da intervencao)

---

## Action Items

### Step 1: Identificar Quick Win

Selecionar a vitoria mais rapida e impactante possivel.

- [ ] Revisar dor principal do cliente (por que comprou)
- [ ] Mapear funcionalidades disponiveis no plano contratado
- [ ] Identificar resultado que pode ser alcancado em 3-7 dias
- [ ] Validar que o quick win e mensuravel (numero, %, tempo economizado)
- [ ] Definir baseline: como esta ANTES da intervencao

**Criterios para escolher o quick win:**
1. Diretamente ligado a dor que motivou a compra
2. Alcancavel em 3-7 dias (nao semanas)
3. Resultado visivel e mensuravel
4. Nao depende de terceiros
5. Cliente consegue perceber a diferenca

### Step 2: Guiar Cliente ate o Resultado

Acompanhar ativamente ate o resultado ser alcancado.

- [ ] Compartilhar plano do quick win com o cliente
- [ ] Agendar check-ins (diarios ou a cada 2 dias)
- [ ] Remover bloqueios conforme surgem
- [ ] Documentar progresso em cada check-in
- [ ] Ajustar abordagem se necessario (pivotar quick win se estiver travando)

### Step 3: Documentar a Vitoria

Registrar formalmente o resultado alcancado.

- [ ] Capturar metricas: antes vs depois
- [ ] Descrever o resultado em linguagem do cliente (nao tecnica)
- [ ] Registrar data de alcance do first value
- [ ] Calcular "time to first value" (dias desde fechamento)
- [ ] Salvar evidencia (screenshot, relatorio, depoimento)

### Step 4: Coletar Feedback

Aproveitar o momento positivo para capturar feedback.

- [ ] Perguntar: "O que mais te surpreendeu?"
- [ ] Perguntar: "O que poderia ter sido melhor?"
- [ ] Perguntar: "Voce recomendaria para um colega? Por que?"
- [ ] Solicitar permissao para usar como case study
- [ ] Registrar NPS informal (0-10)
- [ ] Identificar se ha interesse em funcionalidades adicionais (sinal de upsell)

---

## Acceptance Criteria

- [ ] **AC-01:** Primeira vitoria alcancada com evidencia mensuravel (metrica antes vs depois)
- [ ] **AC-02:** Time to first value <= 14 dias apos fechamento da venda
- [ ] **AC-03:** Feedback do cliente coletado e registrado no CRM
- [ ] **AC-04:** Cliente expressou satisfacao com o resultado (NPS >= 7)
- [ ] **AC-05:** Registro completo no CRM com evidencia, feedback e metricas

---

## Veto Conditions

- NAO marcar first value sem evidencia concreta e mensuravel
- NAO considerar "setup feito" como first value — precisa ser RESULTADO de negocio
- NAO forcar quick win que nao conecta com a dor do cliente
- NAO seguir para handoff sem feedback coletado

---

## Output Example

```yaml
first_value_record:
  cliente: "Joao Silva"
  empresa: "Tech Solutions Ltda"
  quick_win:
    descricao: "Automatizacao de relatorios diarios"
    baseline: "4h/dia gastas fazendo relatorios manualmente"
    resultado: "15min/dia com relatorio automatico"
    melhoria: "93% de reducao no tempo"
    data_alcance: "2026-03-01"
  metricas:
    time_to_first_value_dias: 5
    data_fechamento: "2026-02-24"
    data_first_value: "2026-03-01"
  feedback:
    surpresa: "Nao imaginava que seria tao rapido"
    melhoria: "Gostaria de mais opcoes de customizacao"
    recomendaria: "Sim, ja recomendei para 2 colegas"
    nps: 9
    case_study_autorizado: true
  status: "first_value_alcancado"
  proximo_passo: "handoff"
```

---

## Tools

| Tool | Uso |
|------|-----|
| CRM | Registro de metricas e progresso |
| Intercom | Comunicacao e check-ins |
| Zoom | Calls de acompanhamento |
| WhatsApp | Follow-ups rapidos |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `handoff` |
| **Trigger** | First value documentado + feedback coletado |
| **Executor** | donna-weber |

### Handoff Checklist

- [ ] Primeira vitoria alcancada e documentada
- [ ] Feedback do cliente registrado
- [ ] NPS coletado
- [ ] Time to first value calculado

---

## Error Handling

### Quick win nao alcancado em 7 dias

- **Trigger:** Cliente nao atingiu resultado esperado no prazo
- **Detection:** Check-in de 7 dias sem progresso mensuravel
- **Recovery:** Pivotar para quick win mais simples. Se nao resolver em 14 dias, escalar para CS Head.
- **Prevention:** Escolher quick wins realistas e dentro do controle do cliente

### Cliente desengajado

- **Trigger:** Cliente para de responder check-ins
- **Detection:** 2+ check-ins sem resposta
- **Recovery:** Contato via canal alternativo. Se persistir, escalar para CS Head como risco.
- **Prevention:** Check-ins curtos e objetivos. Mostrar progresso a cada interacao.

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
