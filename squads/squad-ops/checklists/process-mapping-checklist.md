# Checklist de Mapeamento de Processos

**Objetivo:** Validar qualidade e completude de processos mapeados
**Agente:** process-mapper
**Padrao:** Mapeamento completo com zero pontos cegos operacionais

---

## 1. IDENTIFICACAO DO PROCESSO

- [ ] Nome do processo claro e objetivo
- [ ] Objetivo descrito em 1-2 frases
- [ ] Gatilho de inicio (trigger) identificado
- [ ] Condicao de encerramento definida
- [ ] Frequencia de execucao documentada
- [ ] Criticidade avaliada: baixa | media | alta | critica
- [ ] Dono do processo (process owner) identificado

**Criterio:** Qualquer pessoa entende O QUE o processo faz e QUANDO acontece.

---

## 2. ATORES E RESPONSABILIDADES

- [ ] Todos os atores humanos listados (pessoa ou papel)
- [ ] Todos os sistemas/ferramentas envolvidos listados
- [ ] Atores externos identificados (clientes, fornecedores)
- [ ] Responsavel (R) definido para cada etapa
- [ ] Aprovador (A) definido para decisoes
- [ ] Nenhuma etapa sem responsavel

**Criterio:** Zero ambiguidade sobre quem faz o que.

---

## 3. FLUXO E ETAPAS

- [ ] Todas as etapas numeradas sequencialmente
- [ ] Cada etapa tem input e output definidos
- [ ] Transicoes entre etapas sao claras
- [ ] Pontos de decisao marcados com criterios objetivos
- [ ] Caminhos de excecao mapeados (cenarios de erro)
- [ ] Loops identificados com max iteracoes definido
- [ ] Deadlocks potenciais resolvidos

**Criterio:** Possivel seguir o fluxo do inicio ao fim sem duvidas.

---

## 4. INPUTS, OUTPUTS E DEPENDENCIAS

- [ ] Inputs do processo documentados (dados, documentos, aprovacoes)
- [ ] Outputs documentados (entregas, registros, notificacoes)
- [ ] Formato dos dados especificado onde relevante
- [ ] Dependencias externas mapeadas
- [ ] Nenhum input aparece do nada, nenhum output desaparece

**Criterio:** Rastreabilidade completa de dados.

---

## 5. EXCECOES E RISCOS

- [ ] Pelo menos 3 cenarios de excecao documentados
- [ ] Procedimento de fallback para cada excecao
- [ ] Escalacao definida (para quem, quando)
- [ ] Pontos unicos de falha (SPOF) identificados
- [ ] Gargalos conhecidos documentados
- [ ] Plano de contingencia para riscos altos

**Criterio:** Ninguem fica travado quando algo da errado.

---

## GATE DE QUALIDADE

| Secao | Status | Observacoes |
|-------|--------|-------------|
| 1. Identificacao | [ ] PASS [ ] FAIL | |
| 2. Atores | [ ] PASS [ ] FAIL | |
| 3. Fluxo | [ ] PASS [ ] FAIL | |
| 4. Inputs/Outputs | [ ] PASS [ ] FAIL | |
| 5. Excecoes | [ ] PASS [ ] FAIL | |

**STATUS GERAL:** [ ] APROVADO [ ] PRECISA REVISAO [ ] BLOQUEADO

---

**Versao:** 1.0.0 | **Responsavel:** ops-chief
