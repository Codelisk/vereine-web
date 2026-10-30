---
paths:
  - '**/*.css'
  - '**/*.astro'
  - '**/*.svelte'
  - 'design/**'
---

# Oberfläche: Designsystem

Vor dem Schreiben Skill `vereine-design` lesen (Bausteine, Tokens, Icons, Texte). Kurzfassung:

- Werte nur als `var(--…)` aus `.claude/skills/vereine-design/tokens.md`: keine Hex-Farben, kein `rgb()`, keine
  festen `px`/`rem` für Abstand und Schrift. Stylelint lehnt alles andere ab, auch erfundene Token-Namen; der Hook
  meldet es nach jedem Edit, `npm run lint` vor dem Commit.
- Bausteine aus `src/styles/base.css` (Markup in `bausteine.md`): `page`, `button` (eine Hauptaktion je Ansicht mit
  `button-primary set-accent`), `icon-button`, `chip`, `list-row`, `card`, `section`, `empty-state`, `banner`,
  `field`, `tab-bar`. Eigenes CSS nur für die Anordnung der Seite.
- Icons nur `<Icon name="…" />` aus `@/components/Icon.astro` mit Namen aus `icons.md`; Icon-Buttons mit `aria-label`.
- Großer Titel statt Kopfleiste, zwei Textstufen (`--text-base`, `--text-subdued`), Akzent nur für Hauptaktion und
  aktiven Zustand. Hell und Dunkel gleichwertig.
- Texte kurz, Du-Form, Satzschreibung, keine Gedankenstriche (`texte.md`).
- Erzeugt, nie von Hand ändern: `src/styles/tokens.css`, `src/styles/base.css`, `public/icons.svg`,
  `src/components/icon-names.ts`, `tokens.md`, `icons.md`. Quelle ist `design/`, danach `npm run design`
  (schreibt auch vereine-app; beide Repos committen).
- Neue Seite in `tests/e2e/design.spec.ts` eintragen; `npm run design:screens` prüft Hell/Dunkel und Handy/Desktop
  mit axe und legt Screenshots unter `test-results/design/` ab. Größere Oberflächen prüft der Subagent `design-review`.
