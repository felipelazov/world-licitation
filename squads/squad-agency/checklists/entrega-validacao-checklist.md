# Checklist: Entrega e Validacao — QG-IAOS-004

**Squad:** squad-agency
**Quality Gate:** QG-IAOS-004 — Entrega Validada
**Aplicar apos:** Entrega completa ao cliente (7-30 dias pos-onboarding)
**Agente responsavel:** ia-agency-chief (coordena), construtor-agentes (executa)
**Threshold:** 22/27 = APROVADO

---

## Secao 1: Solucao Funcional (6 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 1.1 | Solucao rodando em producao (nao em staging/teste) | Obrigatorio | [ ] |
| 1.2 | Quick win de 7 dias entregue e funcionando | Obrigatorio | [ ] |
| 1.3 | Todas as features do escopo implementadas | 1 | [ ] |
| 1.4 | Solucao testada com dados reais do cliente | 1 | [ ] |
| 1.5 | Performance aceitavel (tempo de resposta, uptime) | 1 | [ ] |
| 1.6 | Fallbacks configurados (o que acontece quando o bot nao sabe responder?) | 1 | [ ] |

> **RISCO se falhar:** Solucao em staging = cliente nao usa. Sem fallback = experiencia ruim no primeiro erro.

---

## Secao 2: Treinamento do Cliente (4 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 2.1 | Cliente sabe usar a solucao de forma autonoma | Obrigatorio | [ ] |
| 2.2 | Treinamento realizado (ao vivo ou video gravado) | 1 | [ ] |
| 2.3 | FAQ ou guia rapido entregue ao cliente | 1 | [ ] |
| 2.4 | Cliente consegue resolver problemas simples sozinho | 1 | [ ] |

> **RISCO se falhar:** Sem treinamento = dependencia eterna do builder. Cada duvida vira ticket de suporte.

---

## Secao 3: Metricas e Monitoramento (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 3.1 | Metricas de sucesso configuradas (as mesmas da proposta/ROI) | Obrigatorio | [ ] |
| 3.2 | Dashboard ou relatorio de metricas acessivel ao cliente | 1 | [ ] |
| 3.3 | Baseline definido (numeros antes da solucao) | 1 | [ ] |
| 3.4 | Meta de 30 dias definida (numeros esperados) | 1 | [ ] |
| 3.5 | Alerta automatico se metricas caem abaixo do threshold | 1 | [ ] |

> **RISCO se falhar:** Sem metricas = nao sabe se esta funcionando. Sem baseline = nao consegue provar ROI. Sem prova de ROI = cliente cancela.

---

## Secao 4: Documentacao (4 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 4.1 | Documentacao tecnica entregue (o que foi construido, como funciona) | 1 | [ ] |
| 4.2 | Credenciais e acessos documentados e compartilhados com seguranca | 1 | [ ] |
| 4.3 | Arquitetura da solucao documentada (fluxo, integracoes, dependencias) | 1 | [ ] |
| 4.4 | Handoff doc: o que o cliente precisa saber se trocar de fornecedor | 1 | [ ] |

> **RISCO se falhar:** Sem docs = lock-in forcado (ruim pra reputacao). Cliente preso nao e cliente feliz.

---

## Secao 5: Zero Dependencia (4 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 5.1 | Solucao funciona sem intervencao do construtor (autonoma) | Obrigatorio | [ ] |
| 5.2 | Cliente tem acesso a TODAS as ferramentas e contas usadas | 1 | [ ] |
| 5.3 | Nenhuma credencial pessoal do builder na solucao | 1 | [ ] |
| 5.4 | Plano de contingencia se algo quebrar (quem chamar, o que fazer) | 1 | [ ] |

> **RISCO se falhar:** Dependencia do builder = nao escala. Se o builder ficar doente, o cliente para.

---

## Secao 6: Satisfacao e Continuidade (4 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 6.1 | Cliente expressou satisfacao (verbal, escrita ou NPS) | 1 | [ ] |
| 6.2 | NPS >= 8 (se coletado) | 1 | [ ] |
| 6.3 | Proximo ciclo de acompanhamento agendado (report mensal) | 1 | [ ] |
| 6.4 | Oportunidade de upsell identificada (se aplicavel) | 1 | [ ] |

> **RISCO se falhar:** Sem NPS = nao sabe se cliente ta feliz. Sem acompanhamento = churn silencioso.

---

## Scoring

| Score | Status | Acao |
|-------|--------|------|
| 22-27 | APROVADO | Entrega completa. Mover para acompanhamento mensal |
| 17-21 | ATENCAO | Completar lacunas em 7 dias (provavelmente docs ou treinamento) |
| 12-16 | ALERTA | Entrega incompleta. Nao mover para acompanhamento |
| < 12 | REPROVADO | Entrega falhou. Replanejar com ia-agency-chief |

**Itens obrigatorios (5):** 1.1, 1.2, 2.1, 3.1, 5.1
Se QUALQUER obrigatorio falhar = maximo ATENCAO, independente do score.

---

## Conexao com Pipeline

| Passou? | Proximo passo |
|---------|---------------|
| APROVADO | Acompanhamento mensal. Report + otimizacao + upsell |
| ATENCAO | Sprint de completude (7 dias), depois acompanhamento |
| ALERTA/REPROVADO | Ficar na fase de entrega ate resolver |

## Regra de Ouro

> "Entrega boa = case pra portfolio. Entrega ruim = anti-case que se espalha 3x mais rapido."
> O objetivo nao e entregar. E entregar algo que o cliente MOSTRA pros outros.

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Versao inicial | ops-chief |
