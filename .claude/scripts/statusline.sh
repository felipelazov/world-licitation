#!/bin/bash
# ============================================
# Claude Statusline — Universal v2.0
# ============================================
# Barra de status para Claude Code
# Mostra: Modelo | Contexto+Custo | Tempo | Squad | Agente | Fase | Projeto@Branch | Git
#
# Funciona em qualquer maquina — sem dependencias de estrutura de pastas.
# Requer: jq, bash 4+, git (opcional)
# ============================================

export LC_NUMERIC=C

CLAUDE_HOME="$HOME/.claude"
CACHE_DIR="$CLAUDE_HOME/session-cache"
mkdir -p "$CACHE_DIR"

# ========== LER STDIN (Claude Code JSON) ==========
STDIN_MODEL=""
if [ ! -t 0 ]; then
  STDIN_DATA=$(cat 2>/dev/null)
  STDIN_MODEL=$(echo "$STDIN_DATA" | jq -r '.model.display_name // empty' 2>/dev/null)
fi

# ========== ENCONTRAR SESSAO ATUAL ==========
CWD="$PWD"
PROJECT_DIR_ENCODED=$(echo "$CWD" | sed 's|/|-|g')

PROJ_PATH=""
for d in "$CLAUDE_HOME/projects/"*; do
  dirname=$(basename "$d")
  if [[ "$PROJECT_DIR_ENCODED" == "$dirname"* ]]; then
    PROJ_PATH="$d"
  fi
done

# Fallback: projeto mais recente
if [ -z "$PROJ_PATH" ]; then
  PROJ_PATH=$(ls -td "$CLAUDE_HOME/projects/"*/ 2>/dev/null | head -1)
fi

# Sessao mais recente (.jsonl)
CONV_FILE=""
if [ -n "$PROJ_PATH" ]; then
  CONV_FILE=$(ls -t "$PROJ_PATH"/*.jsonl 2>/dev/null | head -1)
fi

# ========== EXTRAIR DADOS DA SESSAO ==========
TOTAL_INPUT=0
TOTAL_CACHE_CREATE=0
TOTAL_CACHE_READ=0
TOTAL_OUTPUT=0
MSG_COUNT=0
FIRST_TS=""
MODEL_NAME="—"

if [ -n "$CONV_FILE" ] && [ -f "$CONV_FILE" ]; then
  # Contexto atual = input_tokens da ULTIMA resposta (o que esta na janela agora)
  LAST_USAGE=$(grep '"usage"' "$CONV_FILE" 2>/dev/null | tail -1 | \
    jq -r '.message.usage | "\(.input_tokens // 0) \(.cache_creation_input_tokens // 0) \(.cache_read_input_tokens // 0) \(.output_tokens // 0)"' 2>/dev/null)

  if [ -n "$LAST_USAGE" ]; then
    read LAST_INPUT LAST_CACHE_CREATE LAST_CACHE_READ LAST_OUTPUT <<< "$LAST_USAGE"
  fi

  CONTEXT_NOW=$((LAST_INPUT + LAST_CACHE_CREATE + LAST_CACHE_READ + LAST_OUTPUT))

  # Custo acumulado (soma de todas as mensagens)
  USAGE_ALL=$(grep '"usage"' "$CONV_FILE" 2>/dev/null | \
    jq -r '.message.usage | "\(.input_tokens // 0) \(.cache_creation_input_tokens // 0) \(.cache_read_input_tokens // 0) \(.output_tokens // 0)"' 2>/dev/null)

  if [ -n "$USAGE_ALL" ]; then
    read TOTAL_INPUT TOTAL_CACHE_CREATE TOTAL_CACHE_READ TOTAL_OUTPUT <<< \
      $(echo "$USAGE_ALL" | awk '{inp+=$1; cc+=$2; cr+=$3; out+=$4} END {printf "%d %d %d %d", inp, cc, cr, out}')
  fi

  # Mensagens do usuario
  MSG_COUNT=$(grep -c '"type":"user"' "$CONV_FILE" 2>/dev/null || echo "0")

  # Timestamp da primeira mensagem
  FIRST_TS=$(grep -o '"timestamp":"[^"]*"' "$CONV_FILE" 2>/dev/null | head -1 | sed 's/"timestamp":"//;s/"//')

  # Modelo (do .jsonl)
  MODEL_RAW=$(grep '"model"' "$CONV_FILE" 2>/dev/null | tail -1 | jq -r '.message.model // empty' 2>/dev/null)
  case "$MODEL_RAW" in
    *opus*) MODEL_NAME="Opus" ;;
    *sonnet*) MODEL_NAME="Sonnet" ;;
    *haiku*) MODEL_NAME="Haiku" ;;
    "") MODEL_NAME="—" ;;
    *) MODEL_NAME="$MODEL_RAW" ;;
  esac
fi

# Override do modelo via stdin (mais confiavel que .jsonl)
if [ -n "$STDIN_MODEL" ]; then
  case "$STDIN_MODEL" in
    *Opus*|*opus*) MODEL_NAME="Opus" ;;
    *Sonnet*|*sonnet*) MODEL_NAME="Sonnet" ;;
    *Haiku*|*haiku*) MODEL_NAME="Haiku" ;;
    *) MODEL_NAME="$STDIN_MODEL" ;;
  esac
fi

# ========== CALCULOS ==========
TOTAL_TOKENS=${CONTEXT_NOW:-0}

# Formatar tokens
if [ $TOTAL_TOKENS -ge 1000000 ]; then
  TOKENS_FMT="$(awk "BEGIN {printf \"%.1f\", $TOTAL_TOKENS/1000000}")M"
elif [ $TOTAL_TOKENS -ge 1000 ]; then
  TOKENS_FMT="$(awk "BEGIN {printf \"%.0f\", $TOTAL_TOKENS/1000}")k"
else
  TOKENS_FMT="$TOTAL_TOKENS"
fi

# Barra de progresso (200k budget, 10 blocos)
BUDGET=200000
PCT=$((TOTAL_TOKENS * 100 / BUDGET))
[ $PCT -gt 100 ] && PCT=100
BAR_WIDTH=10
FILLED=$((PCT * BAR_WIDTH / 100))
EMPTY=$((BAR_WIDTH - FILLED))
BAR=""
for ((i=0; i<FILLED; i++)); do BAR+="█"; done
for ((i=0; i<EMPTY; i++)); do BAR+="░"; done

# ========== CUSTO ESTIMADO ($) ==========
# Precos por 1M tokens (API pricing 2025)
# Opus:   Input $15,   Output $75,   Cache Write $18.75, Cache Read $1.875
# Sonnet: Input $3,    Output $15,   Cache Write $3.75,  Cache Read $0.30
# Haiku:  Input $0.80, Output $4,    Cache Write $1.00,  Cache Read $0.08
case "$MODEL_NAME" in
  Opus)   P_IN=15;   P_OUT=75; P_CW=18.75; P_CR=1.875 ;;
  Sonnet) P_IN=3;    P_OUT=15; P_CW=3.75;  P_CR=0.30 ;;
  Haiku)  P_IN=0.80; P_OUT=4;  P_CW=1.00;  P_CR=0.08 ;;
  *)      P_IN=3;    P_OUT=15; P_CW=3.75;  P_CR=0.30 ;;
esac

COST=$(awk "BEGIN {
  cost = ($TOTAL_INPUT * $P_IN + $TOTAL_CACHE_CREATE * $P_CW + $TOTAL_CACHE_READ * $P_CR + $TOTAL_OUTPUT * $P_OUT) / 1000000
  printf \"%.2f\", cost
}")

# Tempo de sessao
ELAPSED_SECS=0
if [ -n "$FIRST_TS" ] && [ "$FIRST_TS" != "null" ]; then
  if command -v gdate &>/dev/null; then
    FIRST_EPOCH=$(TZ=UTC gdate -d "$FIRST_TS" +%s 2>/dev/null)
  else
    FIRST_EPOCH=$(TZ=UTC date -j -f "%Y-%m-%dT%H:%M:%S" "${FIRST_TS%%.*}" +%s 2>/dev/null)
  fi
  NOW_EPOCH=$(date -u +%s)
  if [ -n "$FIRST_EPOCH" ] && [ "$FIRST_EPOCH" -gt 0 ] 2>/dev/null; then
    ELAPSED_SECS=$((NOW_EPOCH - FIRST_EPOCH))
    [ $ELAPSED_SECS -lt 0 ] && ELAPSED_SECS=0
  fi
fi

ELAPSED_MIN=$((ELAPSED_SECS / 60))
ELAPSED_SEC=$((ELAPSED_SECS % 60))
if [ $ELAPSED_MIN -ge 60 ]; then
  TIME_FMT="$((ELAPSED_MIN / 60))h$((ELAPSED_MIN % 60))m"
elif [ $ELAPSED_MIN -gt 0 ]; then
  TIME_FMT="${ELAPSED_MIN}m${ELAPSED_SEC}s"
else
  TIME_FMT="${ELAPSED_SEC}s"
fi

# ========== GIT ==========
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
GIT_DIFF_ALL=$(git diff --numstat HEAD 2>/dev/null; git diff --numstat --cached 2>/dev/null)
ADDITIONS=$(echo "$GIT_DIFF_ALL" | awk '{s+=$1} END {print s+0}')
DELETIONS=$(echo "$GIT_DIFF_ALL" | awk '{s+=$2} END {print s+0}')
FILE_COUNT=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
FILE_COUNT=$((FILE_COUNT + 0))

# ========== PROJETO (universal) ==========
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -n "$GIT_ROOT" ]; then
  REPO_NAME=$(basename "$GIT_ROOT")
  REL_PATH="${CWD#$GIT_ROOT}"
  REL_PATH="${REL_PATH#/}"
  if [ -n "$REL_PATH" ]; then
    PROJECT_NAME="$REPO_NAME/$(echo "$REL_PATH" | cut -d'/' -f1-2)"
  else
    PROJECT_NAME="$REPO_NAME"
  fi
else
  PROJECT_NAME=$(basename "$CWD")
fi

# ========== FASE DO PROJETO (World OS) ==========
PHASE_NAME=""
STATE_FILE="${GIT_ROOT:-$CWD}/project-state.yaml"
if [ -f "$STATE_FILE" ]; then
  # 1. Tentar fase_atual explicita
  PHASE_NAME=$(grep 'fase_atual:' "$STATE_FILE" 2>/dev/null | head -1 | sed 's/.*fase_atual:[[:space:]]*//' | tr -d '"'"'" )

  # 2. Se vazio, buscar primeira fase "em_andamento" (extrair o id)
  if [ -z "$PHASE_NAME" ]; then
    PHASE_NAME=$(grep -B3 '"em_andamento"' "$STATE_FILE" 2>/dev/null | grep '\- id:' | head -1 | sed 's/.*id:[[:space:]]*"//;s/".*//')
  fi
fi

# ========== SQUAD & AGENTE (via hook cache) ==========
CLAUDE_PID=""
WALK_PID=$$
while [ "$WALK_PID" -gt 1 ] 2>/dev/null; do
  WALK_PID=$(ps -o ppid= -p "$WALK_PID" 2>/dev/null | tr -d ' ')
  WALK_CMD=$(ps -o comm= -p "$WALK_PID" 2>/dev/null)
  if [ "$WALK_CMD" = "claude" ] || [ "$WALK_CMD" = "node" ]; then
    CLAUDE_PID="$WALK_PID"
    break
  fi
done

SESSION_KEY="${CLAUDE_PID:-unknown}"
AGENT_NAME=""
SQUAD_NAME=""

# Agente
AGENT_CACHE="$CACHE_DIR/agent-$SESSION_KEY.json"
if [ -f "$AGENT_CACHE" ]; then
  CACHED_AGENT=$(jq -r '.agent // "none"' "$AGENT_CACHE" 2>/dev/null)
  CACHED_STATUS=$(jq -r '.status // "idle"' "$AGENT_CACHE" 2>/dev/null)
  if [ -n "$CACHED_AGENT" ] && [ "$CACHED_AGENT" != "none" ] && [ "$CACHED_STATUS" = "active" ]; then
    AGENT_NAME="$CACHED_AGENT"
  fi
fi

# Squad
SQUAD_CACHE="$CACHE_DIR/squad-$SESSION_KEY.json"
if [ -f "$SQUAD_CACHE" ]; then
  CACHED_SQUAD=$(jq -r '.squad // "none"' "$SQUAD_CACHE" 2>/dev/null)
  if [ -n "$CACHED_SQUAD" ] && [ "$CACHED_SQUAD" != "none" ]; then
    SQUAD_NAME="$CACHED_SQUAD"
  fi
fi

# ========== CORES ==========
RST='\033[0m'
BOLD='\033[1m'
DIM='\033[38;5;242m'
WHITE='\033[38;5;249m'
BLUE='\033[38;5;110m'
CYAN='\033[38;5;109m'
GREEN='\033[38;5;114m'
YELLOW='\033[38;5;179m'
RED='\033[38;5;167m'
ORANGE='\033[38;5;173m'
MAGENTA='\033[38;5;139m'

# Cor dos tokens baseada no uso de contexto
TOKENS_K=$((TOTAL_TOKENS / 1000))
if [ $TOKENS_K -lt 100 ]; then
  C_TOKENS=$GREEN
elif [ $TOKENS_K -lt 150 ]; then
  C_TOKENS=$YELLOW
else
  C_TOKENS=$RED
fi

# Cor do custo
COST_INT=$(awk "BEGIN {printf \"%d\", $COST * 100}")
if [ "$COST_INT" -lt 100 ]; then
  C_COST=$GREEN
elif [ "$COST_INT" -lt 500 ]; then
  C_COST=$YELLOW
else
  C_COST=$RED
fi

# ========== MONTAR SAIDA ==========
SEP=" ${DIM}|${RST} "
OUT=""

# Modelo
OUT+="🤖 ${BOLD}${BLUE}${MODEL_NAME}${RST}${SEP}"

# Contexto: barra + porcentagem + valor + custo
OUT+="📊 ${C_TOKENS}${BAR} ${PCT}% ${TOKENS_FMT}${RST} ${C_COST}\$${COST}${RST}${SEP}"

# Tempo
OUT+="⏱ ${CYAN}${TIME_FMT}${RST}"

# Squad (so aparece se ativa)
if [ -n "$SQUAD_NAME" ]; then
  OUT+="${SEP}🏢 ${ORANGE}${SQUAD_NAME}${RST}"
fi

# Agente (so aparece se ativo)
if [ -n "$AGENT_NAME" ]; then
  OUT+="${SEP}👤 ${CYAN}${AGENT_NAME}${RST}"
fi

# Fase do projeto (so aparece se existe)
if [ -n "$PHASE_NAME" ]; then
  OUT+="${SEP}🎯 ${MAGENTA}${PHASE_NAME}${RST}"
fi

# Projeto
OUT+="${SEP}📁 ${YELLOW}${PROJECT_NAME}${RST}"

# Branch git
if [ -n "$GIT_BRANCH" ]; then
  OUT+="${SEP}🌿 ${GREEN}${GIT_BRANCH}${RST}"
fi

# Git changes (so se houver)
if [ $FILE_COUNT -gt 0 ] || [ $ADDITIONS -gt 0 ] || [ $DELETIONS -gt 0 ]; then
  OUT+="${SEP}✏️ ${WHITE}${FILE_COUNT}f${RST} ${GREEN}+${ADDITIONS}${RST} ${RED}-${DELETIONS}${RST}"
fi

echo -ne "$OUT"
