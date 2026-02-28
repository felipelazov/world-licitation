# Checklist: Diagnostico de Cliente — QG-IAOS-001

**Squad:** squad-agency
**Quality Gate:** QG-IAOS-001 — Diagnostico Validado
**Aplicar apos:** Task diagnostico-cliente (sessao de 30 min)
**Agente responsavel:** estrategista-negocios
**Threshold:** 18/22 = APROVADO

---

## Secao 1: Dados de Receita (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 1.1 | Faturamento mensal informado com numero real (nao "mais ou menos") | Obrigatorio | [ ] |
| 1.2 | Numero de clientes ativos documentado | 1 | [ ] |
| 1.3 | Produto/servico principal identificado com clareza | 1 | [ ] |
| 1.4 | Canal de aquisicao principal mapeado | 1 | [ ] |
| 1.5 | Ticket medio calculado (faturamento / clientes) | 1 | [ ] |

> **RISCO se falhar:** Sem dados de receita, a proposta nao consegue calcular ROI real. Proposta vira chute.

---

## Secao 2: Mapeamento de Processos (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 2.1 | Minimo 3 processos do dia-a-dia mapeados | Obrigatorio | [ ] |
| 2.2 | Cada processo tem: nome, frequencia, quem executa | 1 | [ ] |
| 2.3 | Processos com maior volume de tempo identificados | 1 | [ ] |
| 2.4 | Processos manuais vs automatizados diferenciados | 1 | [ ] |
| 2.5 | Gargalo principal identificado pelo CLIENTE (nao pelo agente) | 1 | [ ] |

> **RISCO se falhar:** Sem mapeamento, as oportunidades de IA sao genericas. Cliente nao se reconhece.

---

## Secao 3: Problemas e Dores (4 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 3.1 | Principal gargalo nomeado com clareza | Obrigatorio | [ ] |
| 3.2 | Custo estimado do gargalo (tempo e/ou dinheiro) | 1 | [ ] |
| 3.3 | Nivel de urgencia classificado (1-10 pelo cliente) | 1 | [ ] |
| 3.4 | Tentativas anteriores de resolver documentadas | 1 | [ ] |

> **RISCO se falhar:** Sem dor clara, nao existe urgencia. Proposta vira "nice to have".

---

## Secao 4: Oportunidades de IA (5 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 4.1 | Minimo 3 oportunidades de IA rankeadas por impacto | Obrigatorio | [ ] |
| 4.2 | Cada oportunidade tem ROI estimado (mesmo que aproximado) | 1 | [ ] |
| 4.3 | Quick win de 7 dias definido (entrega rapida e tangivel) | Obrigatorio | [ ] |
| 4.4 | Oportunidades conectam com processos mapeados (Secao 2) | 1 | [ ] |
| 4.5 | Cliente validou que as oportunidades fazem sentido pra ele | 1 | [ ] |

> **RISCO se falhar:** Oportunidades desconectadas da realidade do cliente. Proposta nao converte.

---

## Secao 5: Qualidade da Sessao (3 itens)

| # | Criterio | Peso | OK? |
|---|----------|------|-----|
| 5.1 | Sessao durou entre 25-35 minutos (nem rushed nem arrastada) | 1 | [ ] |
| 5.2 | Output YAML gerado com todos os campos preenchidos | 1 | [ ] |
| 5.3 | Cliente saiu da sessao com clarity sobre proximos passos | 1 | [ ] |

---

## Scoring

| Score | Status | Acao |
|-------|--------|------|
| 18-22 | APROVADO | Seguir para proposta-comercial |
| 14-17 | ATENCAO | Completar lacunas antes de gerar proposta |
| 10-13 | ALERTA | Reagendar sessao complementar de 15 min |
| < 10 | REPROVADO | Refazer diagnostico completo |

**Itens obrigatorios (4):** 1.1, 2.1, 3.1, 4.1, 4.3
Se QUALQUER obrigatorio falhar = maximo ATENCAO, independente do score.

---

## Conexao com Pipeline

| Passou? | Proximo passo |
|---------|---------------|
| APROVADO | Gerar proposta-comercial (task) |
| ATENCAO | Complementar dados faltantes, depois gerar proposta |
| ALERTA/REPROVADO | Reagendar sessao. NAO gerar proposta com dados incompletos |

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Versao inicial | ops-chief |
