#!/usr/bin/env bash
# PostToolUse (Edit|Write): prüft die eben geschriebene Datei gegen das Designsystem und meldet Verstöße an Claude
# (Exit 2, Text auf stderr). Nach Änderungen an design/ erzeugt der Hook Tokens, Bausteine, Icons und Skill neu.
file="$(sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
cd "$root" || exit 0

case "$file" in
  "$root"/design/tokens.json | "$root"/design/base.css | "$root"/design/icons.json | "$root"/.claude/skills/vereine-design/*)
    if ! output="$(node design/build.ts 2>&1)"; then
      printf 'npm run design ist fehlgeschlagen:\n%s\n' "$output" >&2
      exit 2
    fi
    [[ "$file" == *.css ]] || exit 0 ;;
esac

case "$file" in
  "$root"/node_modules/* | "$root"/dist/*) exit 0 ;;
  *.css | *.astro | *.svelte)
    if ! output="$(npx --no-install stylelint --ignore-disables "$file" 2>&1)"; then
      printf 'Designsystem verletzt (Skill vereine-design). Jetzt beheben, nur Tokens aus tokens.md verwenden:\n%s\n' "$output" >&2
      exit 2
    fi ;;
esac
exit 0
