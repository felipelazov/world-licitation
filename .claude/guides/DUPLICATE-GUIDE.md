# Duplicate Guide — Clonando o Projeto Matriz

> Como criar uma nova instância do World OS para um cliente

---

## TL;DR (Rápido)

```bash
npm run duplicate-for-client -- "Nome do Cliente" "Seu Segmento"
```

Pronto! Sua pasta nova está criada com tudo configurado.

---

## Como Funciona

### Antes da Duplicação

Você tem:
```
world/                    ← Projeto MATRIZ
├── new-readme.template.md
├── new-setup.template.md
├── new-client-config.template.yaml
├── project-state.yaml
└── squads/...
```

### Durante a Duplicação

O script:
1. Clona a pasta MATRIZ inteira
2. Substitui `{CLIENT_NAME}` e `{CLIENT_SEGMENT}` em todos os arquivos template
3. Renomeia `.template.md` → `.md`
4. Deixa tudo pronto para o cliente usar

### Depois da Duplicação

Você tem:
```
world-seu-cliente/        ← Projeto NOVO (pronto para usar)
├── README.md             (preenchido com nome do cliente)
├── SETUP.md              (preenchido com segmento)
├── client-config.yaml    (preenchido com dados básicos)
├── project-state.yaml    (preenchido com contexto do cliente)
└── squads/...            (tudo igual)
```

---

## Exemplos

### Exemplo 1: Cliente SaaS

```bash
npm run duplicate-for-client -- "Acme Corp" "SaaS B2B"
```

Gera:
- Pasta: `world-acme-corp/`
- README.md com: "Welcome to Acme Corp — World OS"
- client-config.yaml: nome = "Acme Corp", segmento = "SaaS B2B"

### Exemplo 2: E-commerce

```bash
npm run duplicate-for-client -- "João's Shop" "E-commerce"
```

Gera:
- Pasta: `world-joaos-shop/`
- README.md com: "Welcome to João's Shop — World OS"
- client-config.yaml: nome = "João's Shop", segmento = "E-commerce"

### Exemplo 3: Agência

```bash
npm run duplicate-for-client -- "Creative Agency XYZ" "Marketing/Design"
```

Gera:
- Pasta: `world-creative-agency-xyz/`
- Tudo preenchido automaticamente

---

## O Que Muda em Cada Arquivo

### README.md
```markdown
# {CLIENT_NAME} — World OS

**Cliente:** {CLIENT_NAME}
**Segmento:** {CLIENT_SEGMENT}
**Criado:** {CREATION_DATE}
```

↓ Vira ↓

```markdown
# Acme Corp — World OS

**Cliente:** Acme Corp
**Segmento:** SaaS B2B
**Criado:** 2026-02-25
```

### client-config.yaml
```yaml
cliente:
  nome: {CLIENT_NAME}
  segmento: {CLIENT_SEGMENT}
```

↓ Vira ↓

```yaml
cliente:
  nome: Acme Corp
  segmento: SaaS B2B
```

### project-state.yaml
```yaml
projeto:
  nome: {CLIENT_NAME}
  cliente: {CLIENT_NAME}
  segmento: {CLIENT_SEGMENT}
```

↓ Vira ↓

```yaml
projeto:
  nome: Acme Corp
  cliente: Acme Corp
  segmento: SaaS B2B
```

---

## Próximos Passos (Para o Cliente)

Depois que duplicação completa:

```bash
cd world-seu-cliente/

# Opcional: inicializar git
git init
git add .
git commit -m "Initial commit: World OS for {CLIENT_NAME}"

# Abrir no Claude Code
code .
```

Aí o cliente:
1. Lê README.md
2. Segue SETUP.md
3. Ativa `/world-os` para começar

---

## Troubleshooting

**P: Erro "Missing arguments"**
R: Use assim: `npm run duplicate-for-client -- "Nome" "Segmento"`

**P: Pasta não criou**
R: Verifique permissões na pasta onde está rodando o script.

**P: Templates não foram preenchidos**
R: Verifique que `new-readme.template.md`, `new-setup.template.md`, `new-client-config.template.yaml` existem.

**P: Posso customizar o script?**
R: Sim! Edite `scripts/duplicate-for-client.js` conforme necessário.

---

## Checklist: Matriz Bem Configurada

Antes de duplicar clientes, verifique:

- [ ] `new-readme.template.md` existe e tem `{CLIENT_NAME}`, `{CLIENT_SEGMENT}`, `{CREATION_DATE}`
- [ ] `new-setup.template.md` existe e tem as mesmas variáveis
- [ ] `new-client-config.template.yaml` existe e tem as mesmas variáveis
- [ ] `project-state.yaml` tem `{CLIENT_NAME}` e `{CLIENT_SEGMENT}`
- [ ] `scripts/duplicate-for-client.js` é executável
- [ ] `package.json` tem `"duplicate-for-client"` em scripts

Se tudo ✅, bora duplicar!

---

## Customização Avançada

Se quiser adicionar mais variáveis ao template (além de CLIENT_NAME, CLIENT_SEGMENT, CREATION_DATE, PROJECT_PATH):

1. Edite `scripts/duplicate-for-client.js`
2. Adicione a variável em `templateVars`:
```javascript
const templateVars = {
  CLIENT_NAME: clientName,
  CLIENT_SEGMENT: clientSegment,
  SUA_VARIAVEL: "seu valor aqui",
  // ...
};
```
3. Use `{SUA_VARIAVEL}` nos templates

---

*Última atualização: 2026-02-25*
