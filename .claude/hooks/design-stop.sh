#!/usr/bin/env bash
# Stop: bevor Claude fertig meldet, müssen die Design-Dateien aktuell und alle geänderten Stile sauber sein.
# Blockiert nur einmal je Antwort (stop_hook_active), damit es keine Schleife gibt.
input="$(cat)"
[[ "$input" =~ \"stop_hook_active\"[[:space:]]*:[[:space:]]*true ]] && exit 0
root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
cd "$root" || exit 0

changed="$(git status --porcelain --untracked-files=all 2>/dev/null | cut -c4- | grep -E '\.(css|astro|svelte)$|^design/' || true)"
[ -n "$changed" ] || exit 0

problems=""
output="$(node design/build.ts --check 2>&1)" || problems+="$output"$'\n'
styles="$(printf '%s\n' "$changed" | grep -E '\.(css|astro|svelte)$' | grep -vE '^(src/styles/tokens\.css|src/styles/base\.css)$' || true)"
if [ -n "$styles" ]; then
  # shellcheck disable=SC2086
  output="$(printf '%s\n' "$styles" | xargs npx --no-install stylelint --ignore-disables --allow-empty-input 2>&1)" || problems+="$output"$'\n'
fi

if [ -n "$problems" ]; then
  printf 'Noch nicht fertig: Designsystem verletzt (Skill vereine-design).\n%s' "$problems" >&2
  exit 2
fi
exit 0
