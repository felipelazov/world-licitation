# Task: Checkup de Saude do Time

**Task ID:** squad-adm/team-health-check
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 40 minutos
**Agent:** patrick-lencioni-rh

---

## Proposito

Diagnosticar a saude organizacional usando o modelo das 5 Disfuncoes de Lencioni. Mapeia confianca, conflito construtivo, comprometimento, accountability e foco em resultados. Complementa com Working Genius para identificar gaps de talento. Detecta problemas de equipe ANTES que virem crises.

---

## Inputs

```yaml
obrigatorios:
  tamanho_time:
    field: "Numero de pessoas no time"
    format: "number"
    required: true
  problemas_percebidos:
    field: "Problemas ou sintomas percebidos no time"
    format: "string"
    required: true
  tempo_juntos:
    field: "Ha quanto tempo o time trabalha junto (meses)"
    format: "number"
    required: true
opcionais:
  estrutura_time:
    field: "Nomes e funcoes de cada membro"
    format: "string"
    required: false
  turnover_recente:
    field: "Alguem saiu nos ultimos 6 meses? Quem e por que?"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Diagnosticar as 5 Disfuncoes (12 min)
Avaliar cada camada da piramide (base ao topo), 3 perguntas-chave por camada, score 1-5:
- **Confianca:** Compartilham vulnerabilidades? Pedem ajuda sem medo? Seguranca psicologica?
- **Conflito:** Debates honestos ou superficiais? Falam em reuniao ou so bastidores?
- **Comprometimento:** Decisoes claras e aceitas? Time sabe o que fazer apos reuniao?
- **Accountability:** Membros cobram uns aos outros? Entregas atrasadas sao endereçadas?
- **Resultados:** Resultado coletivo e prioridade? Ego compete com objetivo do time?

### Step 2: Identificar Working Genius do Time (10 min)
Mapear os 6 tipos (Wonder, Invention, Discernment, Galvanizing, Enablement, Tenacity). Identificar tipos AUSENTES (gaps) e em EXCESSO (conflitos). Avaliar se membros estao em genio ou frustrador.

### Step 3: Mapear Gaps de Talento (8 min)
Cruzar disfuncoes + Working Genius: funcoes que ninguem faz bem, pessoas em frustrador (risco burnout), tamanho ideal vs atual, sinais de Three Miserable Job (anonymity, irrelevance, immeasurement).

### Step 4: Recomendar Acoes (10 min)
Intervencoes por disfuncao: Confianca (exercicios vulnerabilidade), Conflito (normas de debate), Comprometimento (decisoes documentadas), Accountability (scoreboard visivel), Resultados (scorecard coletivo). Acoes de Working Genius: realocar, contratar, ajustar funcoes.

---

## Output

Diagnostico de Saude do Time contendo: score por disfuncao (1-5) com evidencias e narrativa, classificacao geral (saudavel/atencao/critico), mapa de Working Genius com gaps, verificacao de Three Miserable Job signs, e plano de desenvolvimento com acoes, responsaveis e prazos.

Arquivo: `deliverables/adm/team-health-check-{YYYY-MM}.yaml`

---

## Quality Gate

- [ ] Todas as 5 disfuncoes avaliadas com score e evidencias
- [ ] Working Genius do time mapeado com gaps identificados
- [ ] Three Miserable Job signs verificados
- [ ] Minimo 3 acoes de desenvolvimento recomendadas
- [ ] Cada acao com responsavel e prazo definidos
- [ ] Diagnostico consistente (base resolve antes do topo)
- [ ] Score geral classificado corretamente
- [ ] Proximo checkup agendado
