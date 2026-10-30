# CLAUDE.md: vereine-web

Verwaltungswebseite der Vereineapp: hier verwalten Vereine (zuerst Fußballvereine) ihre Mitglieder und ihre
Vereinsarbeit. Astro mit Server-Rendering (Node-Adapter), interaktive Teile als Svelte-5-Inseln. Daten kommen
ausschließlich aus `vereine-api` über deren OpenAPI-Beschreibung. Noch ohne Fachlichkeit: die Anforderungen
folgen.

Es gelten die Workspace-Regeln aus `/srv/business/vereineapp/CLAUDE.md` (öffentliches Repo, keine Secrets,
gezielte Tests, keine Abwärtskompatibilität, Nutzertexte ohne Gedankenstriche).

## Kommandos

```bash
npm run check && npm run lint            # vor jedem Commit (astro check + eslint)
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
- `src/styles/tokens.css`: Design-Tokens, Hell und Dunkel folgen dem System. Farben nur über Tokens.
- `tests/e2e/`: Playwright gegen eine eigene Dev-Instanz.

## Regeln

- **Daten nur über vereine-api.** Kein eigener Zustand, keine Datenbank, keine Fachlogik in der Webseite. Die
  API-Typen kommen aus `src/lib/api/schema.d.ts` (erzeugt, eingecheckt), nie von Hand nachgebaut. Nach
  Änderungen an Endpunkten der API `npm run api:spec && npm run api:types` und beide Dateien committen.
- **Umgebung über `astro:env`.** Neue Variablen ins `env.schema` in `astro.config.mjs`, nie `process.env` im
  Seitencode. Geheimnisse mit `access: 'secret'`.
- **Oberfläche:** deutsch, kurz, für Ehrenamtliche ohne Technikwissen auf den ersten Blick verständlich.
  Barrierefrei (semantisches HTML, Fokus sichtbar, Kontrast), Handy zuerst.
- **Astro-APIs nicht raten:** Astro-Doku-MCP (`astro-docs`, in `.mcp.json`) nutzen, bevor neue Astro-Funktionen
  entstehen.
- **TypeScript bleibt auf ^6:** TS 7 (tsgo) hat keine Compiler-API mehr, `@astrojs/check` und `typescript-eslint`
  verlangen bis 6.x. Heben, sobald beide TS 7 unterstützen.
- Commits als Conventional Commits auf Deutsch.
