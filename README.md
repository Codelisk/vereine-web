# vereine-web

Verwaltungswebseite der Vereineapp: Vereine (zuerst Fußballvereine) verwalten hier ihre Mitglieder und ihre
Vereinsarbeit, damit das Ehrenamt weniger Aufwand hat. Noch ein Grundgerüst ohne Fachlichkeit.

Gehört zu drei Repos, die nebeneinander liegen:

| Repo                                                   | Inhalt                                           |
| ------------------------------------------------------ | ------------------------------------------------ |
| [vereine-api](https://github.com/Codelisk/vereine-api) | Backend: .NET 11, Microsoft Orleans, Aspire      |
| [vereine-app](https://github.com/Codelisk/vereine-app) | App: .NET MAUI Blazor Hybrid für Android und iOS |
| vereine-web                                            | diese Webseite                                   |

## Stack

- [Astro](https://astro.build) 7 mit Server-Rendering über `@astrojs/node` (standalone)
- Svelte 5 für interaktive Inseln (`@astrojs/svelte`)
- TypeScript strict, Alias `@/*` für `src/*`
- `openapi-fetch` und `openapi-typescript` für den typisierten Zugriff auf vereine-api
- ESLint (flat config, Astro, Svelte, typescript-eslint), Prettier, Vitest, Playwright

TypeScript bleibt auf ^6: TS 7 (tsgo) bringt keine Compiler-API mehr mit, und `@astrojs/check` sowie
`typescript-eslint` unterstützen bisher höchstens 6.x.

## Kommandos

```bash
npm install
npm run dev                  # Dev-Server (Astro-Vorgabe localhost:4321, unter Aspire Port 4610)
npm run check                # astro check
npm run lint                 # eslint
npm run format               # prettier
npm test                     # vitest (Unit-Tests neben dem Code)
npm run test:e2e             # playwright (eigene Instanz auf 127.0.0.1:14610)
npm run build                # check + Produktions-Build nach dist/
npm start                    # gebauten Server starten (HOST/PORT aus der Umgebung)
```

Playwright braucht einmalig Chromium: `npx playwright install chromium`.

## Konfiguration

| Variable               | Wann          | Bedeutung                                                                |
| ---------------------- | ------------- | ------------------------------------------------------------------------ |
| `VEREINE_API_URL`      | Laufzeit      | Basis-URL von vereine-api, z. B. `http://localhost:5610`                 |
| `HOST`, `PORT`         | Laufzeit, Dev | Adresse und Port; Aspire setzt beide                                     |
| `ASTRO_ALLOWED_ORIGIN` | Build         | Öffentlicher Origin hinter dem Reverse Proxy (`security.allowedDomains`) |

Ungültige Werte für `PORT` oder `ASTRO_ALLOWED_ORIGIN` brechen den Start mit einer klaren Meldung ab
(`src/lib/server-config.ts`).

## Anbindung an vereine-api

Im Regelfall startet der Aspire-AppHost von `vereine-api` diese Webseite mit (Geschwister-Repo unter
`dev/repos`) und setzt `VEREINE_API_URL`, `HOST` und `PORT`.

Die API-Typen kommen aus ihrer OpenAPI-Beschreibung:

```bash
npm run api:spec    # src/lib/api/openapi.json von ${VEREINE_API_URL:-http://localhost:5610}/openapi/v1.json
npm run api:types   # src/lib/api/schema.d.ts daraus erzeugen
```

Beide Dateien werden eingecheckt, damit Build und Prüfung ohne laufende API gehen. Bis es die ersten
Endpunkte gibt, steht in `src/lib/api/client.ts` ein leerer Platzhalter-Typ.

## Aufbau

```
src/
  config/site.ts           Name und Beschreibung (Arbeitsname)
  layouts/BaseLayout.astro <head> aller Seiten
  lib/                     Logik ohne Oberfläche, Unit-Tests daneben
    api/client.ts          typisierter Client für vereine-api
    server-config.ts       PORT und ASTRO_ALLOWED_ORIGIN prüfen
  pages/                   Routen; gesund.ts für Docker und Aspire
  styles/                  tokens.css (Hell/Dunkel), global.css
tests/
  e2e/                     Playwright
  support/start-web.mjs    eigene Dev-Instanz für Playwright
```

## Docker

```bash
docker build --build-arg ASTRO_ALLOWED_ORIGIN=https://verein.example -t vereine-web .
docker run -p 4321:4321 -e VEREINE_API_URL=http://api:8080 vereine-web
```

Node 24 Alpine, per Digest gepinnt; läuft als Benutzer `node`, Healthcheck über `/gesund`.
