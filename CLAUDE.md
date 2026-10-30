# CLAUDE.md: vereine-web

Verwaltungswebseite der Vereineapp: hier verwalten Vereine (zuerst Fußballvereine) ihre Mitglieder und ihre
Vereinsarbeit. Astro mit Server-Rendering (Node-Adapter), interaktive Teile als Svelte-5-Inseln. Daten kommen
ausschließlich aus `vereine-api` über deren OpenAPI-Beschreibung. Noch ohne Fachlichkeit: die Anforderungen
folgen.

Es gelten die Workspace-Regeln aus `/srv/business/vereineapp/CLAUDE.md` (öffentliches Repo, keine Secrets,
gezielte Tests, keine Abwärtskompatibilität, Nutzertexte ohne Gedankenstriche).

## Kommandos

```bash
npm run check && npm run lint            # vor jedem Commit (astro check, Design-Abgleich, eslint, stylelint)
npm run design                           # nach Änderungen in design/: erzeugt Tokens, Bausteine, Icons für Web und App
npm run design:screens                   # axe und Screenshots in Hell/Dunkel, Handy/Desktop (test-results/design/)
npx vitest run <datei>                   # betroffene Unit-Tests gezielt (liegen neben dem Code)
npx playwright test <datei>              # betroffene Browser-Tests gezielt (eigene Instanz auf 14610)
npm run build                            # bei Änderungen an Oberfläche oder Konfiguration zusätzlich
npm run format                           # Prettier (Astro und Svelte)
VEREINE_API_URL=http://localhost:5610 npm run dev   # Dev-Server, Regelfall ist der AppHost von vereine-api
npm run api:spec && npm run api:types    # OpenAPI von der laufenden API holen, Typen erzeugen
```

Dev-Server im Hintergrund: `npx astro dev --background`, verwalten mit `npx astro dev stop|status|logs`.

Der AppHost von vereine-api startet `npm run dev:aspire` (`astro dev --ignore-lock`). Astro 7 schickt `astro dev`
in den Hintergrund, sobald es einen KI-Agenten erkennt; Aspire verlöre dann den Prozess. `--ignore-lock` hält ihn im
Vordergrund.

## Aufbau

- `src/pages/`: Routen. `gesund.ts` ist die Gesundheitsprüfung für Docker und Aspire und antwortet immer.
- `src/layouts/BaseLayout.astro`: `<head>` aller Seiten.
- `src/lib/`: Logik ohne Oberfläche, mit Unit-Test daneben (`*.test.ts`). `server-config.ts` prüft PORT und
  `ASTRO_ALLOWED_ORIGIN` vor dem Start. `api/client.ts` ist der typisierte Client für vereine-api.
- `design/`: Quelle des Designsystems für Web und App (`tokens.json`, `base.css`, `icons.json`, Generator
  `build.ts`). Erzeugt `src/styles/tokens.css`, `src/styles/base.css`, `public/icons.svg`,
  `src/components/icon-names.ts` und die Gegenstücke in vereine-app.
- `src/components/Icon.astro`: Icons aus `public/icons.svg`.
- `tests/e2e/`: Playwright gegen eine eigene Dev-Instanz.

## Designsystem

Oberfläche in Web und App folgt einem Designsystem nach dem Vorbild von Spotify (Encore): dunkel und hell
gleichwertig, Inhalt statt Rahmen, große Titel, wenig Text, ein Akzent. Vor jeder Arbeit an CSS, Astro, Svelte oder
Texten auf dem Bildschirm den Skill `vereine-design` lesen. Kurz:

- **Nichts hart codiert.** Farben, Schrift, Abstände, Radien, Schatten, Dauer nur als `var(--…)` aus den Tokens.
  Stylelint (`npm run lint:css`) lehnt Hex, `rgb()`, feste Längen und unbekannte Tokens ab; Hooks melden es nach
  jedem Edit.
- **Bausteine statt eigenem CSS** (`base.css`, Markup im Skill unter `bausteine.md`). Fehlt einer: in
  `design/base.css` anlegen, nicht in der Seite.
- **Erzeugte Dateien nie von Hand ändern.** Quelle ist `design/`, danach `npm run design`; das schreibt auch
  vereine-app, beide Repos committen. Der Generator prüft den WCAG-Kontrast aller Farbsets.
- **Keine Spotify-Marke:** kein Spotify-Grün, kein Logo, keine Circular-Schrift. Übernommen sind Prinzipien und
  Muster. Hintergrund: `docs/design/recherche.md`, Entscheidung: `docs/adr/0001-designsystem.md`.
- Neue Seiten in `tests/e2e/design.spec.ts` eintragen. Größere Oberflächen vor dem Abschluss vom Subagenten
  `design-review` prüfen lassen.

## Regeln

- **Daten nur über vereine-api.** Kein eigener Zustand, keine Datenbank, keine Fachlogik in der Webseite. Die
  API-Typen kommen aus `src/lib/api/schema.d.ts` (erzeugt, eingecheckt), nie von Hand nachgebaut. Nach
  Änderungen an Endpunkten der API `npm run api:spec && npm run api:types` und beide Dateien committen.
- **Umgebung über `astro:env`.** Neue Variablen ins `env.schema` in `astro.config.mjs`, nie `process.env` im
  Seitencode. Geheimnisse mit `access: 'secret'`.
- **Oberfläche:** deutsch, kurz, für Ehrenamtliche ohne Technikwissen auf den ersten Blick verständlich.
  Barrierefrei (semantisches HTML, Fokus sichtbar, Kontrast), Handy zuerst. Details im Abschnitt Designsystem.
- **Astro-APIs nicht raten:** Astro-Doku-MCP (`astro-docs`, in `.mcp.json`) nutzen, bevor neue Astro-Funktionen
  entstehen.
- **TypeScript bleibt auf ^6:** TS 7 (tsgo) hat keine Compiler-API mehr, `@astrojs/check` und `typescript-eslint`
  verlangen bis 6.x. Heben, sobald beide TS 7 unterstützen.
- Commits als Conventional Commits auf Deutsch.
