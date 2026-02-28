# Product Vision — Documentacao de Visao de Produto

**Projeto:** {nome_projeto}
**Cliente:** {nome_cliente}
**Data:** {YYYY-MM-DD}
**Advisor:** Steve Jobs
**Versao:** {1.0}

---

## Simplicity Statement

> {Descricao do produto em UMA FRASE. Se precisa de mais, nao ta simples o suficiente.}

---

## Features Essenciais (The Yes List)

| # | Feature | Por que e essencial | Impacto no Dream Outcome |
|---|---------|--------------------|-----------------------|
| 1 | {feature_1} | {Justificativa — por que NAO pode ficar de fora} | {Como entrega resultado pro cliente} |
| 2 | {feature_2} | {Justificativa — por que NAO pode ficar de fora} | {Como entrega resultado pro cliente} |
| 3 | {feature_3} | {Justificativa — por que NAO pode ficar de fora} | {Como entrega resultado pro cliente} |

> **Regra:** Se tem mais de 3, alguma nao e essencial. Cortar.

---

## Cut List (The 1000 No's)

| # | Feature Cortada | Razao do Corte | Contraditorio? |
|---|----------------|----------------|----------------|
| 1 | {feature_cortada_1} | {Por que foi cortada — nao e core} | {Alguem argumentaria a favor? Por que estao errados?} |
| 2 | {feature_cortada_2} | {Por que foi cortada — distrai do essencial} | {Alguem argumentaria a favor? Por que estao errados?} |
| 3 | {feature_cortada_3} | {Por que foi cortada — complexidade desnecessaria} | {Alguem argumentaria a favor? Por que estao errados?} |
| 4 | {feature_cortada_4} | {Por que foi cortada} | {Contraditorio} |
| 5 | {feature_cortada_5} | {Por que foi cortada} | {Contraditorio} |

> **Principio:** Cada corte e uma decisao de coragem. Se ninguem discorda do corte, provavelmente nao era importante o suficiente pra estar aqui.

---

## Jornada do Usuario

| Passo | O que acontece | Emocao esperada | Momento wow? |
|-------|---------------|-----------------|-------------|
| 1. {Primeiro contato} | {Descricao da experiencia} | {O que o usuario sente} | {SIM/NAO} |
| 2. {Onboarding} | {Descricao da experiencia} | {O que o usuario sente} | {SIM/NAO} |
| 3. {Primeiro uso} | {Descricao da experiencia} | {O que o usuario sente} | {SIM/NAO} |
| 4. {Resultado parcial} | {Descricao da experiencia} | {O que o usuario sente} | {SIM/NAO} |
| 5. {Resultado completo} | {Descricao da experiencia} | {O que o usuario sente} | {SIM/NAO} |
| 6. {Momento de advocacia} | {Quando o usuario conta pra alguem} | {Orgulho, surpresa} | **SIM** |

> **Teste:** Se nenhum passo tem "momento wow", o produto e funcional mas nao memoravel.

---

## Padrao de Excelencia

| Dimensao | Benchmark | Nosso padrao | Gap |
|----------|-----------|-------------|-----|
| Velocidade | {Referencia do mercado} | {Nosso target} | {O que falta} |
| Simplicidade | {Referencia do mercado} | {Nosso target} | {O que falta} |
| Estetica | {Referencia do mercado} | {Nosso target} | {O que falta} |
| Resultado | {Referencia do mercado} | {Nosso target} | {O que falta} |

---

## Decisoes Controversas

> Decisoes que exigem coragem. Se todos concordam, provavelmente nao e inovador.

| Decisao | Por que e controversa | Por que esta certa |
|---------|----------------------|-------------------|
| {decisao_1} | {O que o mercado diria contra} | {A convicção por tras} |
| {decisao_2} | {O que o mercado diria contra} | {A convicção por tras} |

---

## Conexao com Pipeline

| Campo em project-state.yaml | Valor |
|------------------------------|-------|
| `negocio.produto_core` | {Simplicity statement} |
| `negocio.features_essenciais` | [{lista}] |
| `negocio.features_cortadas` | [{lista}] |

### Sinapses a Criar

| Para | Decisao | Acao esperada |
|------|---------|---------------|
| squad-design | Features essenciais definidas | Criar experiencia visual do produto |
| squad-content-distillery | Cut list + essenciais | Comunicar o foco e a filosofia |
| squad-ops | Jornada do usuario | Mapear processos operacionais |

---

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Versao inicial | steve-jobs |
