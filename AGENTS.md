# vereine-web: Einstieg für Codex

Lies zuerst `CLAUDE.md` vollständig: Zweck, Kommandos, Aufbau und Regeln gelten unverändert. Die Regeln aus
`/srv/business/vereineapp/CLAUDE.md` (öffentliches Repo, Secrets, Scratch, gezielte Tests) gelten ebenfalls.

Oberfläche nur nach dem Designsystem: Skill `.agents/skills/vereine-design/SKILL.md` lesen, bevor CSS, Astro,
Svelte oder Bildschirmtexte entstehen. Farben und Maße nur als Tokens (`var(--…)`), Bausteine aus `base.css`,
erzeugte Dateien nie von Hand ändern (Quelle `design/`, dann `npm run design`).

```bash
npm run check && npm run lint     # vor jedem Commit, mit Design-Abgleich und Stylelint
npm run design:screens            # axe und Screenshots in Hell/Dunkel nach Oberflächenänderungen
npx vitest run <datei>            # betroffene Unit-Tests gezielt
npx playwright test <datei>       # betroffene Browser-Tests gezielt
```

Astro-Doku über den MCP-Server `astro-docs` (`.codex/config.toml`), Volltext: https://docs.astro.build
