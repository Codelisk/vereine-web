#!/usr/bin/env bash
# PreToolUse (Edit|Write): erzeugte Design-Dateien nie von Hand ändern. Die Quelle liegt in design/.
# Liest nur tool_input.file_path aus dem Hook-JSON (ohne jq: auf dem Server nicht installiert).
file="$(sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"

case "$file" in
  "$root/src/styles/tokens.css" | "$root/src/styles/base.css" | "$root/public/icons.svg" | \
  "$root/src/components/icon-names.ts" | \
  "$root/.claude/skills/vereine-design/tokens.md" | "$root/.claude/skills/vereine-design/icons.md")
    echo "Erzeugte Datei, nicht von Hand ändern. Werte in design/tokens.json, Bausteine in design/base.css, Icons in design/icons.json ändern; der Hook erzeugt danach alles neu (npm run design)." >&2
    exit 2 ;;
esac
exit 0
