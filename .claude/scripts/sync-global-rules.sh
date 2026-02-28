#!/bin/bash
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Sync Global Rules — World OS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Copia .claude/global-rules.md → ~/.claude/CLAUDE.md
# Roda automaticamente via hook ou manualmente: bash .claude/scripts/sync-global-rules.sh
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE="$SCRIPT_DIR/../rules/global-rules.md"
TARGET="$HOME/.claude/CLAUDE.md"

if [ ! -f "$SOURCE" ]; then
  echo "Erro: $SOURCE nao encontrado"
  exit 1
fi

mkdir -p "$HOME/.claude"

# Compara antes de copiar
if [ -f "$TARGET" ] && diff -q "$SOURCE" "$TARGET" > /dev/null 2>&1; then
  echo "Global rules ja esta em sync."
else
  cp "$SOURCE" "$TARGET"
  echo "Global rules sincronizado: $TARGET"
fi
