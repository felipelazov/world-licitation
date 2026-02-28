# Checklist: Proposta Comercial — QG-IAOS-002

**Squad:** squad-agency
**Quality Gate:** QG-IAOS-002 — Proposta Aprovada
**Aplicar apos:** Task proposta-comercial (geracao + review)
**Agente responsavel:** ia-agency-chief
**Threshold:** 22/28 = APROVADO

---

## Secao 1: Base em Dados Reais (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 1.1 | Proposta construida a partir do diagnostico validado (QG-IAOS-001 APROVADO) | Obrigatorio | [ ] |
| 1.2 | Dream outcome escrito na VOZ DO CLIENTE (nao do agente) | 1 | [ ] |
| 1.3 | Problema articulado reflete exatamente o gargalo do diagnostico | 1 | [ ] |
| 1.4 | Dados de receita do cliente usados nos calculos de ROI | 1 | [ ] |
| 1.5 | Nenhum dado inventado ou generico — tudo vem do diagnostico | 1 | [ ] |

> **RISCO se falhar:** Proposta generica = cliente nao se reconhece = nao converte.

---

## Secao 2: Grand Slam Offer (6 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 2.1 | Dream Outcome claro e especifico (mensuravel) | Obrigatorio | [ ] |
| 2.2 | Solucoes empilhadas (value stack) com minimo 3 componentes | 1 | [ ] |
| 2.3 | Cada solucao resolve uma objecao especifica | 1 | [ ] |
| 2.4 | Resultado mensuravel com numero (economia, ganho, tempo) | Obrigatorio | [ ] |
| 2.5 | Ratio valor percebido / preco >= 3:1 | 1 | [ ] |
| 2.6 | Nome da oferta e proprio e memoravel (nao generico) | 1 | [ ] |

> **RISCO se falhar:** Oferta fraca = objecao de preco. Sem value stack = comparacao com freelancer barato.

---

## Secao 3: Precificacao e Garantia (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 3.1 | Preco alinhado com catalogo do squad (R$2-10k setup + recorrente) | 1 | [ ] |
| 3.2 | Preco baseado em valor entregue, NAO em horas | 1 | [ ] |
| 3.3 | Garantia presente (minimo 30 dias) | Obrigatorio | [ ] |
| 3.4 | Garantia remove risco do comprador de forma clara | 1 | [ ] |
| 3.5 | Condicoes da garantia explicitas (o que o cliente precisa fazer) | 1 | [ ] |

> **RISCO se falhar:** Sem garantia = risco no comprador = objecao. Preco por hora = commoditizacao.

---

## Secao 4: Timeline e Entrega (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 4.1 | Timeline semanal definida (semana 1, 2, 3, 4) | 1 | [ ] |
| 4.2 | Quick win de 7 dias destacado como primeiro entregavel | Obrigatorio | [ ] |
| 4.3 | Cada semana tem entregavel tangivel e verificavel | 1 | [ ] |
| 4.4 | Prazo maximo de 30 dias para entrega completa | 1 | [ ] |
| 4.5 | Marcos de validacao com cliente definidos (checkpoints) | 1 | [ ] |

> **RISCO se falhar:** Sem timeline = cliente nao sabe quando cobra. Sem quick win = ansiedade nos primeiros 7 dias.

---

## Secao 5: Revisao e Envio (4 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 5.1 | Felipe revisou e aprovou antes do envio | Obrigatorio | [ ] |
| 5.2 | Proposta formatada profissionalmente (sem erros, layout limpo) | 1 | [ ] |
| 5.3 | Canal de envio definido (WhatsApp PDF preferencial) | 1 | [ ] |
| 5.4 | Follow-up agendado (max 48h apos envio) | 1 | [ ] |

> **RISCO se falhar:** Proposta enviada sem review = erro de preco ou promessa. Sem follow-up = proposta morre.

---

## Secao 6: Alinhamento Estrategico (3 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 6.1 | Proposta alinhada com capacidade atual de entrega | 1 | [ ] |
| 6.2 | Solucao proposta esta no catalogo de servicos (WhatsApp Bot / Automacao / Dashboard / Custom) | 1 | [ ] |
| 6.3 | Margem de lucro >= 60% (considerando custo de ferramentas e tempo) | 1 | [ ] |

---

## Scoring

| Score | Status | Acao |
|-------|--------|------|
| 22-28 | APROVADO | Enviar proposta ao cliente |
| 17-21 | ATENCAO | Ajustar pontos fracos antes do envio |
| 12-16 | ALERTA | Reescrever proposta com suporte do ia-agency-chief |
| < 12 | REPROVADO | Refazer proposta do zero. Provavelmente diagnostico era fraco |

**Itens obrigatorios (5):** 1.1, 2.1, 2.4, 3.3, 4.2, 5.1
Se QUALQUER obrigatorio falhar = maximo ATENCAO, independente do score.

---

## Conexao com Pipeline

| Passou? | Proximo passo |
|---------|---------------|
| APROVADO | Enviar proposta + agendar follow-up |
| ATENCAO | Corrigir e resubmeter para review |
| Cliente aceitou | Iniciar onboarding-cliente (task) |
| Cliente recusou | Registrar motivo + nutrir via conteudo |

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Versao inicial | ops-chief |
