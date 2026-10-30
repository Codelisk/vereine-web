# vereine-web: Einstieg für Codex

Lies zuerst `CLAUDE.md` vollständig: Zweck, Kommandos, Aufbau und Regeln gelten unverändert. Die Regeln aus
`/srv/business/vereineapp/CLAUDE.md` (öffentliches Repo, Secrets, Scratch, gezielte Tests) gelten ebenfalls.

```bash
npm run check && npm run lint     # vor jedem Commit
npx vitest run <datei>            # betroffene Unit-Tests gezielt
npx playwright test <datei>       # betroffene Browser-Tests gezielt
```

Astro-Doku über den MCP-Server `astro-docs` (`.codex/config.toml`), Volltext: https://docs.astro.build
