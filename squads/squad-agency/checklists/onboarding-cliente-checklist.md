# Checklist: Onboarding de Cliente — QG-IAOS-003

**Squad:** squad-agency
**Quality Gate:** QG-IAOS-003 — Cliente Onboarded
**Aplicar apos:** Task onboarding-cliente (1 hora total)
**Agente responsavel:** gestor-operacional
**Threshold:** 20/25 = APROVADO

---

## Secao 1: Contrato e Pagamento (6 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 1.1 | Contrato digital assinado por ambas as partes | Obrigatorio | [ ] |
| 1.2 | Escopo descrito no contrato bate com a proposta aprovada | 1 | [ ] |
| 1.3 | Pagamento confirmado (setup fee recebido) | Obrigatorio | [ ] |
| 1.4 | Nota fiscal emitida | 1 | [ ] |
| 1.5 | 30% do valor reservado (regra de reserva nao negociavel) | Obrigatorio | [ ] |
| 1.6 | Recorrencia configurada (se aplicavel) | 1 | [ ] |

> **RISCO se falhar:** Sem contrato = sem protecao legal. Sem pagamento = trabalho de graca. Sem reserva = caixa fragil.

---

## Secao 2: Setup Tecnico (6 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 2.1 | WhatsApp Business configurado (Evolution API / numero do cliente) | 1 | [ ] |
| 2.2 | Dashboard do cliente criado (acesso configurado) | 1 | [ ] |
| 2.3 | Workflow n8n configurado para o cliente | 1 | [ ] |
| 2.4 | Integracoes necessarias conectadas e testadas | 1 | [ ] |
| 2.5 | Ambiente de staging/teste funcional | 1 | [ ] |
| 2.6 | Credenciais documentadas em local seguro (nao no chat) | Obrigatorio | [ ] |

> **RISCO se falhar:** Setup incompleto = primeiros dias travados. Credenciais perdidas = retrabalho.

---

## Secao 3: Alinhamento com Cliente (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 3.1 | Kickoff agendado (data e horario confirmados) | Obrigatorio | [ ] |
| 3.2 | Timeline compartilhada com o cliente (marcos semanais) | 1 | [ ] |
| 3.3 | Canal de comunicacao definido (WhatsApp grupo / Slack / email) | 1 | [ ] |
| 3.4 | Expectativas alinhadas: o que o cliente FAZ vs o que a agencia FAZ | 1 | [ ] |
| 3.5 | Primeiro checkpoint de progresso agendado (max 7 dias) | 1 | [ ] |

> **RISCO se falhar:** Sem kickoff = cliente fica no escuro. Sem expectativas claras = conflito na primeira semana.

---

## Secao 4: Registro no Pipeline (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 4.1 | Cliente registrado no dashboard/pipeline com status "Onboarded" | 1 | [ ] |
| 4.2 | Todos os dados do cliente centralizados (contato, empresa, escopo, preco) | 1 | [ ] |
| 4.3 | Primeiro report agendado (max 30 dias) | 1 | [ ] |
| 4.4 | Alerta de follow-up configurado (nenhum cliente fica > 48h sem contato) | 1 | [ ] |
| 4.5 | Documentacao do onboarding salva (o que foi setado, por quem, quando) | 1 | [ ] |

> **RISCO se falhar:** Cliente fora do pipeline = esquecido. Sem docs = proximo atendimento recomeça do zero.

---

## Secao 5: Prontidao pra Entrega (3 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 5.1 | Quick win de 7 dias ja tem escopo definido e responsavel | Obrigatorio | [ ] |
| 5.2 | Construtor de agentes (tier 1) ja tem briefing do que construir | 1 | [ ] |
| 5.3 | Felipe sabe exatamente qual e o proximo passo pra esse cliente | 1 | [ ] |

> **RISCO se falhar:** Onboarding bonito mas ninguem sabe o que fazer segunda-feira. Quick win atrasado = confianca quebrada.

---

## Scoring

| Score | Status | Acao |
|-------|--------|------|
| 20-25 | APROVADO | Cliente onboarded. Iniciar entrega (quick win 7 dias) |
| 15-19 | ATENCAO | Completar itens faltantes em 24h |
| 10-14 | ALERTA | Onboarding incompleto. Nao iniciar entrega |
| < 10 | REPROVADO | Refazer onboarding. Algo estrutural falhou |

**Itens obrigatorios (6):** 1.1, 1.3, 1.5, 2.6, 3.1, 5.1
Se QUALQUER obrigatorio falhar = maximo ATENCAO, independente do score.

---

## Conexao com Pipeline

| Passou? | Proximo passo |
|---------|---------------|
| APROVADO | Iniciar entrega — quick win 7 dias (construtor-agentes) |
| ATENCAO | Completar gaps em 24h, depois iniciar entrega |
| ALERTA/REPROVADO | Resolver bloqueios antes de qualquer entrega |

## Regra de Ouro

> "O onboarding define o tom dos proximos 30 dias. Se comecar bagunçado, nunca recupera."
> Cliente bem onboarded = menos suporte, menos conflito, mais renovacao.

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Versao inicial | ops-chief |
