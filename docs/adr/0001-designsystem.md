# ADR 0001: Designsystem nach dem Vorbild von Spotify, eine Quelle für Web und App

Status: angenommen, 2026-10-30

## Kontext

Der Owner will Verwaltungswebseite und App intuitiv und mit wenig Text gestalten, nach dem Vorbild der Spotify
Design Guidelines. Farben und Maße sollen zentral festgelegt und nirgends hart codiert sein, und Claude soll sich
dauerhaft daran halten.

Die Recherche (`docs/design/recherche.md`) zeigt:

- Die Seite `developer.spotify.com/documentation/design` ist ein Markenregelwerk für Partner, die Spotify-Inhalte
  zeigen, kein allgemeines Designsystem. Übertragbar sind die Barrierefreiheitsregeln und ein paar allgemeine Muster.
- Spotifys eigentliches System Encore ist intern, lässt sich aber aus Blogartikeln und dem Produktivcode gut
  nachvollziehen: semantische Tokens, Farbsets, Layout-Themen, wenige Bausteine, zwei Textstufen.
- Spotify-Grün, Logo, die Schriften Circular und Spotify Mix und die eigenen Icons sind Marke von Spotify. Die
  Developer Policy verbietet, Spotifys Kernerlebnis nachzubauen.
- Claude befolgt Text-Anleitungen meistens, Hooks und Lint immer. Verlässlich wird es nur mit Durchsetzung.

## Entscheidung

- **Prinzipien und Muster von Encore übernehmen, nicht die Marke.** Token-Grammatik
  `{background|text|essential|decorative}-{rolle}-{zustand}`, Farbsets (`set-base`, `set-accent`, `set-negative`,
  `set-inverted`), Layout-Thema ab 768 px, Button-Hierarchie primär/sekundär/tertiär, Pillen und Kreise,
  48-px-Tippflächen, Icons 24 px, aktiv gefüllt, Satzschreibung, Fehlertext mit nächstem Schritt.
  Eigener Akzent, Systemschrift (`system-ui`), Phosphor-Icons (MIT).
- **Hell und Dunkel gleichwertig**, Webseite und App folgen der Systemeinstellung. Begründung: Ehrenamtliche
  benutzen das Handy draußen am Platz; Spotify nennt Licht und Spiegelungen selbst als Kontrastproblem.
- **Eine Quelle in `vereine-web/design/`:** `tokens.json` (Werte, Format angelehnt an W3C Design Tokens),
  `base.css` (Bausteine), `icons.json` (Icon-Auswahl), Generator `build.ts` ohne Fremdwerkzeug. `npm run design`
  schreibt CSS, Sprite, Icon-Typen und Referenz für den Skill in dieses Repo und, wenn es daneben liegt, CSS,
  Sprite, C#-Enum, XAML-Farben, MSBuild-Eigenschaften, Android-Farben und den Skill nach vereine-app. Kein
  gemeinsames Paket: der Workspace kopiert statt einzubinden, und so bleibt jedes Repo für sich baubar.
- **Kontrast wird beim Erzeugen geprüft** (WCAG 4,5 : 1 für Text, 3 : 1 für wichtige Grafik, je Thema und Set).
  Ein zu schwacher Wert bricht `npm run design` ab, so wie Spotifys Farbalgorithmus Kontrast garantiert.
- **Durchsetzung in Schichten:**
  1. Stylelint mit `color-no-hex`, `function-disallowed-list`, `declaration-strict-value` und
     `value-no-unknown-custom-properties` gegen `tokens.css`, immer mit `--ignore-disables`. Teil von
     `npm run lint`.
  2. `npm run design:check` in `npm run lint`: erzeugte Dateien müssen zur Quelle passen.
  3. Claude-Hooks: `PreToolUse` sperrt erzeugte Dateien, `PostToolUse` lintet bzw. erzeugt nach jedem Edit neu,
     `Stop` prüft vor dem Abschluss.
  4. Typisierte Icon-Namen (`IconName` in TypeScript und C#): falsche Icons sind Compilerfehler.
  5. `npm run design:screens`: axe (WCAG 2.2 AA) und Screenshots in Hell/Dunkel, 375 und 1280 px.
  6. Subagent `design-review` mit nur lesenden Werkzeugen für größere Oberflächen.
- **Anleitung für Claude:** Skill `vereine-design` (feste Regeln zuerst, Bausteine, Texte, erzeugte Token- und
  Icon-Referenz), Rule `.claude/rules/design.md`, kurzer Abschnitt im CLAUDE.md, der auch nach dem Verdichten
  des Kontexts geladen bleibt. Der Skill sagt ausdrücklich, dass dunkle Flächen mit einem Akzent und Pillen-Buttons
  gewollt sind, weil Claude sie sonst als KI-Standard vermeidet.

## Folgen

- Seiten schreiben fast kein eigenes CSS mehr; fehlende Bausteine entstehen in `design/base.css` und gelten sofort
  für beide Oberflächen.
- Jede Änderung an `design/` erzeugt Dateien in beiden Repos. Beide werden zusammen committet.
- Stylelint und axe kommen als Entwicklungsabhängigkeiten dazu, Phosphor als feste Version (`@phosphor-icons/core`
  2.1.1). Neue Icons: Eintrag in `icons.json`, dann `npm run design`.
- Werte wie `0`, `auto`, `100%` und Prozentbreiten bleiben erlaubt; feste Längen für Abstände, Schrift, Radien und
  Schatten nicht.

## Offen

- **Akzentfarbe:** Platzhalter ist ein dunkles Rasengrün (hell `#13703a`, dunkel `#5acf88`), deutlich anders als
  Spotify-Grün, aber noch keine Markenentscheidung. Mit Logo und Namen festlegen; danach nur
  `palette`/`color.*.accent` in `tokens.json` ändern. Später möglich: Akzent je Verein aus dem Wappen, mit
  derselben Kontrastprüfung.
- **Dialog, Bottom-Sheet, Menü, Toast, Schalter, Checkbox** sind noch keine Bausteine. Sie entstehen, wenn die
  erste Seite sie braucht.
- **Visuelle Baselines** (`toHaveScreenshot`) erst, wenn es echte Seiten gibt.

## Neu bewerten, wenn

- Spotify seine Partnerregeln oder Policy zu Nachahmung ändert,
- die Webseite eine eigene Komponentenbibliothek oder ein Werkzeug wie Style Dictionary braucht, das der eigene
  Generator nicht abdeckt,
- Claude Code Hooks aus verschachtelten Repos selbst lädt (dann entfällt der Verteiler in `dev/repos/.claude`).
