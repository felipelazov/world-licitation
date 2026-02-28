---
paths: "checklists/**"
---

# Convencao de Checklists — World OS v1.0

## Principio

Todo checklist na pasta `checklists/` (raiz) e um **quality gate de projeto**.
Nao e documentacao. Nao e referencia. E um gate executavel com scoring.

**Regra fundamental:** Todo checklist DEVE ter 3 coisas:
1. **Arquivo .md** na pasta `checklists/` com scoring padronizado
2. **Comando no Maestro** (`world-os.md`) para execucao manual
3. **Trigger no protocolo** (`sinapse-protocol.md` REGRA 6) para sugestao automatica

Se faltar qualquer um dos 3, o checklist esta incompleto.

---

## Diferenca entre Camadas de Checklist

| Camada | Local | Escopo | Dono |
|--------|-------|--------|------|
| **Projeto** | `checklists/` (raiz) | Cross-squad, ciclo de vida | Maestro |
| **Squad** | `squads/squad-*/checklists/` | Interno do squad, qualidade de output | Squad-chief |
| **AIOS** | `.aios-core/development/checklists/` | Codigo, stories, desenvolvimento | Agentes AIOS |

Checklists de projeto validam o **sistema todo**. Checklists de squad validam o **trabalho individual**.

---

## Estrutura Obrigatoria de um Checklist de Projeto

### 1. Header

```markdown
# Checklist de {Tipo} — {Nome}

{Descricao em 2-3 frases: quando usar, o que garante, risco sem ele.}
```

### 2. Contexto (tabela de preenchimento)

```markdown
## Contexto

| Campo | Valor |
|-------|-------|
| Data | _____________________ |
| {campos relevantes} | _____________________ |
| Responsavel | _____________________ |
```

### 3. Secoes com Itens

Cada secao DEVE ter:
- Titulo claro
- Itens com checkbox `- [ ]`
- Bloco de risco ao final da secao (`> **Risco se falhar:**`)

```markdown
## N. Nome da Secao

- [ ] Item verificavel e objetivo
- [ ] Outro item

> **Risco se falhar:** Consequencia concreta.
```

### 4. Scoring

```markdown
## Scoring

| Secao | Itens | Score |
|-------|-------|-------|
| Secao 1 | /N | _____ |
| **TOTAL** | **/N** | _____ |

**Interpretacao:**
- **X-N:** APROVADO — Pode prosseguir
- **Y-X:** ATENCAO — Corrigir antes de avancar
- **Z-Y:** ALERTA — Gaps significativos
- **< Z:** CRITICO/BLOQUEADO/REPROVADO — Parar e resolver
```

### 5. Rodape

```markdown
**Revisado por:** ____________________
**Data:** ____________________
```

---

## Ao Criar um Novo Checklist

### Passo 1: Criar o arquivo

Criar `checklists/{nome}.md` seguindo a estrutura acima.

### Passo 2: Registrar comando no Maestro

Adicionar na tabela "Comandos de Quality Gate" em `world-os.md`:

```markdown
| `*{comando}` | `checklists/{nome}.md` | {Quando usar} |
```

### Passo 3: Registrar trigger no protocolo

Adicionar na tabela "6.1 Triggers Automaticos" em `sinapse-protocol.md` REGRA 6:

```markdown
| {Evento} | `{nome}.md` | Maestro | {Condicao} |
```

### Passo 4: Verificar

- [ ] Arquivo existe em `checklists/`
- [ ] Tem scoring padronizado (APROVADO/ATENCAO/ALERTA/CRITICO)
- [ ] Tem risco documentado por secao
- [ ] Comando existe no Maestro
- [ ] Trigger existe no protocolo
- [ ] Condicao do trigger e verificavel via `project-state.yaml`

---

## Checklists Atuais

| Checklist | Comando | Trigger | Momento |
|-----------|---------|---------|---------|
| `new-project-setup.md` | `*setup` | Apos `*init` | Inicio do projeto |
| `client-discovery.md` | `*discovery` | Intake incompleto | Pre-fase 1 |
| `phase-transition.md` | `*transition` | Fase concluida | Entre fases |
| `sinapse-quality.md` | `*sinapse-audit` | >5 pendentes | Periodico |
| `mid-project-health.md` | `*health` | 4+ sessoes | Periodico |
| `project-delivery.md` | `*delivery` | Fases concluidas | Final |

---

## Principios de Design

1. **Executavel, nao decorativo** — Cada item deve ser verificavel (sim/nao)
2. **Scoring objetivo** — Numeros, nao opinioes
3. **Risco documentado** — Todo item existe por um motivo. O risco explica qual.
4. **Graceful degradation** — Checklist melhora qualidade mas nunca bloqueia trabalho
5. **Cross-squad** — Se e interno de um squad, vai em `squads/squad-*/checklists/`, nao aqui

---

*Convencao definida em 2026-02-26 durante criacao do sistema de quality gates do World OS.*
