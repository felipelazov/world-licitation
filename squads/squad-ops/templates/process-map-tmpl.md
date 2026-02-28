# Mapa de Processo: {nome_do_processo}

## Metadados

| Campo | Valor |
|-------|-------|
| **Processo** | {nome_do_processo} |
| **Dono** | {process_owner} |
| **Versao** | {versao} |
| **Data** | {YYYY-MM-DD} |
| **Criticidade** | {baixa | media | alta | critica} |
| **Frequencia** | {diaria | semanal | sob_demanda | mensal} |

---

## Objetivo

{Descricao em 2-3 frases do que o processo faz e qual valor entrega.}

---

## Atores

| Ator | Tipo | Papel no Processo |
|------|------|-------------------|
| {nome_ou_papel} | Humano | {descricao do papel} |
| {nome_sistema} | Sistema | {descricao da funcao} |
| {nome_externo} | Externo | {descricao da interacao} |

---

## Trigger

- **Evento de inicio:** {o que dispara o processo}
- **Pre-condicoes:** {o que precisa estar pronto}
- **Inputs iniciais:** {dados ou artefatos necessarios}

---

## Fluxo Principal

### Etapa 1: {nome_da_etapa}
- **Ator:** {quem executa}
- **Input:** {o que recebe}
- **Acao:** {o que faz}
- **Output:** {o que produz}

### Etapa 2: {nome_da_etapa}
- **Ator:** {quem executa}
- **Input:** {output da etapa anterior}
- **Acao:** {o que faz}
- **Output:** {o que produz}

### [DECISAO] {pergunta_de_decisao}

| Condicao | Caminho |
|----------|---------|
| {condicao_sim} | Segue para Etapa {N} |
| {condicao_nao} | Segue para Etapa {M} |

### Etapa 3: {nome_da_etapa}
- **Ator:** {quem executa}
- **Input:** {o que recebe}
- **Acao:** {o que faz}
- **Output:** {o que produz}

### [FIM] Condicao de Encerramento
- **Criterio:** {quando o processo e concluido}
- **Output final:** {entrega principal}
- **Notificacoes:** {quem e notificado}

---

## Excecoes

| Excecao | Gatilho | Acao | Escalacao |
|---------|---------|------|----------|
| {nome} | {o que causa} | {como tratar} | {para quem} |
| {nome} | {o que causa} | {como tratar} | {para quem} |

---

## Matriz RACI

| Etapa | {Ator 1} | {Ator 2} | {Ator 3} |
|-------|----------|----------|----------|
| {etapa_1} | R | I | - |
| {etapa_2} | C | R | A |

**R** = Responsavel | **A** = Aprovador | **C** = Consultado | **I** = Informado

---

## SLAs

| Metrica | Alvo | Limite |
|---------|------|--------|
| Tempo total do processo | {alvo} | {maximo} |
| Taxa de excecao | {alvo}% | {maximo}% |
