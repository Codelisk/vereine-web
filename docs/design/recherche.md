# Recherche: Designsystem nach dem Vorbild von Spotify

Stand: 2026-10-30. Grundlage für das Designsystem in `design/` und den Skill `vereine-design`. Die Entscheidung
selbst steht in `docs/adr/0001-designsystem.md`.

Kennzeichnung: **[Doku]** von Spotify veröffentlicht, **[Live]** am 2026-10-30 im Produktiv-CSS/JS von Spotify
beobachtet, **[Dritte]** fremde Analyse, **[Schluss]** eigene Folgerung. Quellen am Ende (S1 bis S30, C1 bis C20).

## 1. Was die Spotify-Seite ist

`developer.spotify.com/documentation/design` heißt „Design & Branding Guidelines“ und ist das Regelwerk für
Partner, die **Spotify-Inhalte** zeigen (Musik, Cover, Wiedergabe, Logo). Jeder Abschnitt beginnt mit „When does
this apply?“, und jede Antwort hängt an Spotify-Inhalten. Mit „By using these resources, you accept our Developer
Terms of Service“ ist sie Teil des Entwickler-Vertrags [S14, S31].

Sie enthält **kein** Raster, keine Abstands- oder Schriftskala, keine Komponenten, keine Tokens und keine
Designprinzipien. Das eigentliche Designsystem von Spotify heißt **Encore** und ist intern („Encore isn't publicly
available“ [S1]). spotify.design leitet seit 2026 auf open.spotify.com um; die Artikel sind nur noch über das
Internet Archive erreichbar.

### Was davon für eine Vereins-App gilt

| Übertragbar                                                                | Nur für Spotify-Inhalte                                    |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Systemschrift der Plattform statt eigener Schrift                          | Attribution, Logo-Pflicht, Cover-Regeln                    |
| Kleine Radius-Skala (4 px klein, 8 px groß) für Bilder und Karten          | Regale mit höchstens 20 Einträgen, kein Konkurrent daneben |
| Keine Texte oder Bedienelemente über Bildern (Wappen, Mannschaftsfotos)    | Buttons „OPEN SPOTIFY“, „PLAY ON SPOTIFY“                  |
| Kürzen nur, wenn der volle Text erreichbar bleibt                          | `PlaybackRestrictions`, Premium-Hinweis, 15-s-Sprung       |
| Zeichenbudget je Feld (wichtig für lange deutsche Wörter und Vereinsnamen) | Explicit-Kennzeichnung                                     |
| Gesperrte Aktionen ausblenden oder sagen, warum gesperrt                   | Spotifys Logo- und Farbregeln                              |
| Kurze Bestätigungen beim Umschalten („Hinzugefügt“, „Entfernt“)            | Namensregeln                                               |
| Die ganze Barrierefreiheits-Seite (unten)                                  |                                                            |
| Daten selbst löschen per Button (passt zur DSGVO) [S32]                    |                                                            |

### Barrierefreiheit [S33]

Allgemeine WCAG-2.1-Liste, vollständig übernommen:

- Tippflächen 44 × 44 pt (iOS) bzw. 48 × 48 dp (Android).
- Kontrast 4,5 : 1 für Text, 3 : 1 für wichtige Icons.
- Icon-Buttons brauchen eine Beschriftung; deaktivierte Buttons sagen, warum.
- Nie nur Farbe als Unterscheidung.
- Systemeinstellungen vor App-Einstellungen (Schriftgröße, weniger Bewegung), höchstens drei Blitze je Sekunde.
- Saubere Überschriften-Hierarchie, Fokus in Dialogen führen, semantische Elemente, mit Screenreader testen.
- Der Absatz „Order of actions“ widerspricht sich selbst (erst „am wenigsten zerstörerisch zuerst“, im Beispiel
  „OK vor CANCEL“). Wir folgen texte.md: Bestätigen mit eindeutigem Verb, Abbrechen als Tertiär-Button.

## 2. Spotifys Marke ist geschützt

- „Your logo should not include, or look similar to the Spotify logo or any of its brand elements (e.g. Spotify
  Green, the circle, and the waves)“ [S14].
- Developer Policy III: keine Produkte, die „mimic, or replicate or attempt to replace a core user experience of
  Spotify“ [S34]. Terms of Use: alle „Spotify Brand Features“ gehören Spotify, ohne Nutzungsrecht [S35, S36].
- Schrift **Spotify Mix** ist eine Auftragsschrift „designed just for us“ [S13], Vorgänger **Circular** ist eine
  kommerzielle Lineto-Schrift [S37]. Spotifys Icons sind im Haus gezeichnet [S5].
- Markenfarben laut Partner-Grafik: Grün #1ED760, Weiß, Schwarz #121212 [S14].
- [Schluss, keine Rechtsberatung] Allgemeine Muster sind nicht geschützt: semantische Tokens, dunkle Flächen um
  #121212 (auch Materials Standard [S27]), 4/8-px-Radien, Pillen-Buttons, Tab-Leiste unten. Gefährlich ist die
  **Kombination** aus Grün, rundem Play-Button und Spotify-Layout. Also: Prinzipien und Muster übernehmen, eigene
  Akzentfarbe, eigenes Logo, Systemschrift, offene Icons.

## 3. Encore: was Spotify wirklich tut

### Prinzipien

- **Relevant, Human, Unified** seit 2020 [S3]: „the right info at the right time“; „Human experiences are intuitive
  and conversational. It's not human when things are overly clever, technical, or overly functional“; „we start by
  reusing rather than reinventing“.
- **Inhalt zuerst, dunkle Oberfläche** seit 2014: eine UI, „where the content can come forward and everything else
  can slip away“ [S18].
- **Bewegung** „with purpose“, als Rückmeldung, mit Freude [S7]. „Not accessible? Not usable.“ [S10]

### Aufbau

- System aus Systemen: **Encore Foundation** (Farbe, Schrift, Bewegung, Abstand, Texte, Barrierefreiheit, Tokens) ist
  Pflicht für jedes Produkt, darüber Encore Web, Encore Mobile und lokale Systeme [S1, S12].
- Lehre von 2022: „Non-semantic design tokens offer limited value.“ Spotify konnte das Grün nicht abdunkeln, weil
  unklar war, wo das Token steckt. Daraus wurden **semantische Token-Ebenen** und ein Algorithmus, der aus wenigen
  Eingaben ein Farbthema „with guaranteed accessible color contrast“ erzeugt [S2].
- Tokens werden aus dem Code nach Figma synchronisiert, Code ist die Quelle [S2, S12].

### Tokens im Produktivcode [Live, S20]

- **Benennung** `{Kategorie}-{Rolle}[-{Zustand}]`: `background-base|highlight|press`, dazu `elevated-*` und
  `tinted-*`; `text-`, `essential-` (Icons, Rahmen, die man sehen muss), `decorative-` (Trenner) mit den Rollen
  `base`, `subdued`, `bright-accent`, `negative`, `warning`, `positive`, `announcement`. Hover heißt `highlight`,
  gedrückt `press`.
- **Farbsets** binden dieselben Tokens für einen Teilbaum neu: `encore-base-set`, `-bright-accent-set`,
  `-negative-set`, `-inverted-light-set`, `-over-media-set` und weitere. Ein Button nimmt einfach
  `background-base` seines Sets; ob er grün oder rot ist, entscheidet das Set.
- **Layout-Themen** an 768 px: Schrift, Abstände und Ränder werden für kleine und mittlere Geräte neu gebunden.
- Ein zweites Produkt (Spotify for Artists) nutzt **dieselben Token-Namen mit violettem Akzent** (#4100f4 hell)
  [Live, S21]. Genau so tauschen wir den Akzent.

| Token (Auszug)                             | Dunkel              | Hell                  |
| ------------------------------------------ | ------------------- | --------------------- |
| background-base                            | #121212             | #fff                  |
| background-highlight / press               | #1f1f1f / #000      | #f5f5f5 / #e2e2e2     |
| background-elevated-base                   | #1f1f1f             | #fff                  |
| background-tinted-base / highlight / press | Weiß 10 / 14 / 21 % | Schwarz 8 / 12 / 19 % |
| text-base / text-subdued                   | #fff / #b3b3b3      | #000 / #656565        |
| essential-subdued                          | #7c7c7c             | #818181               |

### Schrift [Live, S20]

| Stil           | Handy / ab 768 px | Stärke |
| -------------- | ----------------- | ------ |
| headline-large | 48 / 96 px        | 800    |
| title-large    | 32 / 48 px        | 700    |
| title-medium   | 24 / 32 px        | 700    |
| title-small    | 20 / 24 px        | 700    |
| body-medium    | 16 px             | 400    |
| body-small     | 13 / 14 px        | 400    |
| marginal       | 11 / 12 px        | 400    |

- Keine Sperrung, so gut wie keine Großbuchstaben, Titel mit `text-wrap: balance`. Listen laufen auf 14 px, Titel
  fett. Buttons wechselten von GROSS zu Satzschreibung: 20 bis 30 % weniger Platz, „less shouty, more human“, besser
  übersetzbar [S4].

### Maße und Formen [Live, S20]

- Abstände 4 bis 64 px, Basis 16 px; Ränder 16 px am Handy, 24 bis 64 px am Desktop.
- **Bedienhöhe 48 px** (32 klein, 56 groß).
- Radien 4 und 8 px, Pille 9999 px. Buttons und Chips sind Pillen, Icon-Buttons Kreise. Personen rund,
  Alben eckig mit Radius: die Form sagt, was es ist [Live, Dritte S16].
- Tiefe über hellere Flächen, Schatten nur für schwebende Ebenen (Menü, Dialog).
- Icons: zwei Vorlagen, **24 px mit 2 px Strich** und 16 px mit 1,5 px. Spotify machte sie kräftiger, weil Icons
  zunehmend Text-Buttons ersetzen; **aktiv heißt gefüllt** [S5].
- Bewegung: 50 bis 300 ms, Kurve `cubic-bezier(.3,0,0,1)`, Hover-Vergrößerung 1,04 nur bei
  `prefers-reduced-motion: no-preference`.

### Bausteine [Live, S20, S22]

- **Buttons:** Primär = Fläche des Akzent-Sets, Sekundär = getönte Fläche, Tertiär = nur Text. Größen 32/48/56 px.
  Die Hierarchie ist plattformübergreifend gleich [S12].
- **Chips:** Pille, getönt; gewählt = invertiertes Set (hell auf dunkel und umgekehrt). Gruppe scrollt waagrecht.
- **Listenzeile:** Bild 1 : 1, Titel plus eine Zeile Nebentext, einzeilig mit „…“, Hover und Druckfläche.
- **Leerer Zustand:** Icon im Kreis, Titel, ein kurzer Satz, ein Button.
- **Banner:** getönt, Icon, ein Satz; Farbe aus dem Set (negativ, Warnung, Hinweis).
- **Navigation am Handy:** Tab-Leiste mit Icon und kurzem Wort; Kopfzeilen auf allen Tabs gleich [S8].

### Wie Spotify mit wenig Text auskommt

- Inhalt nach vorn, Rahmen zurück: „build more without adding more“, „much less clutter“ [S8, S18].
- Icons statt Text-Buttons, aber mit stabilen Metaphern [S5].
- **Nur zwei Textstufen** (`text-base`, `text-subdued`), Akzent nur für Ausnahmen. Hierarchie über Größe und
  Stärke, nicht über Farbe oder Großbuchstaben [S4, S20].
- Relevanz statt Vollständigkeit; Details erst auf Wunsch (Mini-Player, einklappbare Bibliothek) [S3, S6, S8].
- Fehlertexte: „The best error message is no error message.“ Sonst sagen, was passiert ist, und einen nächsten
  Schritt anbieten, ohne Fachjargon, laut vorlesen [S9].
- Rückmeldung ohne Worte: Animation, Haptik [S7].

### Hell und Dunkel

Spotify ist dunkel zuerst, weist aber selbst darauf hin, dass schwacher Kontrast „situationally impact anyone,
depending on environmental conditions like lighting and reflections“ [S4]. Ehrenamtliche stehen mit dem Handy am
Platz in der Sonne. [Schluss] Beide Themen gleichwertig, die App folgt der Systemeinstellung.

## 4. Wie Claude sich verlässlich an ein Designsystem hält

Kernaussage der Claude-Code-Doku: CLAUDE.md, Skills und Prompts befolgt Claude „nearly every time“, Hooks, Tests
und CI immer. „If something has to happen every time, make it a hook.“ [C1] Daraus folgt die Reihenfolge:

| Rang | Technik                                        | Art               | Umsetzung hier                                                                                                                                        |
| ---- | ---------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Linter in Claudes Edit-Schleife                | erzwungen         | Stylelint (Web) und `check-design.sh` (App) nach jedem Edit per `PostToolUse`-Hook, vor dem Abschluss per `Stop`-Hook, im Build und in `npm run lint` |
| 2    | Eine Quelle für Tokens, Namen nicht erfindbar  | erzwungen         | `design/tokens.json`, Generator, `value-no-unknown-custom-properties` bzw. VDS005, erzeugte Dateien per `PreToolUse` gesperrt                         |
| 3    | Konkreter Skill plus kurzer Block im CLAUDE.md | Anleitung         | Skill `vereine-design` mit `paths`, Abschnitt „Designsystem“ im CLAUDE.md, Rule `.claude/rules/design.md`                                             |
| 4    | Gerendertes Ergebnis prüfen                    | Prüfung           | `npm run design:screens`: axe und Screenshots in Hell/Dunkel bei 375 und 1280 px                                                                      |
| 5    | Unabhängiger Review-Subagent                   | Prüfung           | Subagent `design-review`, nur lesende Werkzeuge                                                                                                       |
| 6    | Feste Bausteine statt Freihand                 | Anleitung + Typen | `base.css`, `Icon.astro`/`Icon.razor` mit typisierten Icon-Namen (TS-Typ, C#-Enum)                                                                    |
| 7    | Beispiele                                      | Anleitung         | Markup je Baustein in `bausteine.md`, Textmuster in `texte.md`                                                                                        |
| 8    | Plan vor dem Bau                               | Anleitung         | Skill: erst Bausteine und ASCII-Skizze, dann Code                                                                                                     |

Die Reihenfolge ist eine Abwägung aus den Quellen, kein gemessener Vergleich; einen solchen hat niemand
veröffentlicht.

### Belege und Details

- **Hooks:** `PostToolUse` mit Exit 2 zeigt Claude stderr, die Änderung ist schon geschehen, Claude korrigiert im
  selben Zug. `Stop` mit Exit 2 verhindert das Aufhören; `stop_hook_active` verhindert Schleifen. `PreToolUse` mit
  Exit 2 blockiert vorher [C2, C3]. Praxisbeispiele: alma/widgets PR #327 [C11], Tech Arion [C12]. Hardik Pandya
  kam mit Token-Prüfung im CI von 418 hart codierten Werten in 28 Dateien auf 0 [C13].
- **Konkret statt Adjektive:** Allgemeine Wünsche wie „clean and minimal“ „shift the model to a different fixed
  palette“, „the model follows explicit specs precisely“ [C4, C5]. „Avoid a generic AI look“ tauscht nur einen
  Standard gegen einen anderen; benannte Muster wirken [C6].
- **Rohwerte gehören nicht in den Regeltext:** „the agent copies whichever value it saw last“ [C12]. Darum nennen
  Skill und Rules nur Token-Namen, die Werte stehen in `tokens.md` (erzeugt).
- **Was nach dem Verdichten des Kontexts bleibt:** Das CLAUDE.md im Projektwurzelverzeichnis und Rules ohne `paths`
  werden neu geladen, Rules mit `paths` erst wieder beim nächsten passenden Datei-Zugriff [C7]. Von geladenen Skills
  kommen die ersten 5.000 Token zurück [C8]. Darum stehen die festen Regeln oben im Skill und kurz im CLAUDE.md.
- **Länge:** CLAUDE.md unter 200 Zeilen, „Longer files consume more context and reduce adherence“ [C9]; SKILL.md
  unter 500 Zeilen, Details eine Ebene tiefer [C10]. IFScale: selbst das beste Modell erreicht bei 500 Anweisungen
  nur 68 %, frühe Anweisungen werden bevorzugt [C14].
- **Ton:** keine GROSSBUCHSTABEN oder „IMPORTANT“, „Piling on emphasis mostly makes Claude over-apply the rule“
  [C1]. Begründungen mitgeben, damit Claude verallgemeinern kann [C15]. Geltungsbereich ausdrücklich nennen („jede
  Seite und jede Komponente“), weil aktuelle Modelle wörtlich folgen [C4]. Keine Widersprüche zwischen CLAUDE.md,
  Rules und Skill [C9]. Am Ende eine Fertig-Checkliste mit Prüfschleife [C10].
- **Prüfung am Bild:** „Claude stops when the work looks done“; ein Screenshot ist ein gültiger Nachweis [C1].
  Messen schlägt Ansehen: Weiß auf Weiß fiel erst über berechnete Styles auf [C16]. Viewports ausdrücklich nennen,
  sonst prüft Claude nur Desktop [C17]. Wir nutzen axe (misst Kontrast und Namen) plus Screenshots.
- **Review-Agent:** Vorbild ist OneRedOak `design-review` (Schweregrade Blocker, Hoch, Mittel, Kleinigkeit;
  Probleme statt Vorschriften) [C18]. Ein frischer Prüfer hilft, „because it hasn't seen your reasoning“; wer
  Fehler suchen soll, findet immer etwas, darum klare Schwelle [C1]. Werkzeuge per `tools:` beschränken [C19].
- **Konflikt mit Claudes Standardgeschmack:** Anthropics Skill `frontend-design` nennt „near-black background with a
  single bright acid-green … accent“ als typischen KI-Standard, die Opus-5.5-Doku nennt Pillen-Buttons [C6, C20].
  Das ist nah am Spotify-Bild. Darum sagt der Skill ausdrücklich, dass diese Entscheidungen gewollt sind, und das
  allgemeine Plugin `frontend-design` bleibt draußen.

### Stolpersteine bei Stylelint

- `declaration-strict-value` lässt Funktionen wie `rgb()` per Standard durch, darum zusätzlich
  `function-disallowed-list`.
- `/* stylelint-disable */` hebelt Regeln aus; Hook, Stop-Hook und `npm run lint` laufen mit `--ignore-disables`.
- Kommagetrennte Token-Listen (`box-shadow: var(--a), var(--b)`) prüft das Plugin einzeln; `ignoreValues` erlaubt
  `var(--…),`.
- Was kein Linter sieht: Styles aus Razor-Ausdrücken, Astro-`style={{…}}`, Style-Strings in C#. Die App-Prüfung
  sperrt darum Inline-Styles ganz (VDS004).

### Grenze der Hooks im Workspace

Claude Code lädt Hooks nur aus dem `.claude/` des Startverzeichnisses. Skills, CLAUDE.md und Rules aus
Unterordnern laden beim Zugriff nach, Hooks nicht [C3, C7]. Wird Claude in `dev/repos` gestartet statt im Repo,
übernimmt ein Verteiler in `dev/repos/.claude` (außerhalb der Repos) die Weiterleitung an die Repo-Hooks. Build und
`npm run lint` greifen unabhängig davon.

## 5. Folgerungen für Vereineapp

1. **System übernehmen, nicht das Aussehen:** Token-Grammatik, Farbsets, zwei Layout-Themen, Button-Hierarchie,
   Bausteine, Textregeln. Eigener Akzent statt Spotify-Grün, Systemschrift, Phosphor-Icons (MIT, Strich und
   Gefüllt nebeneinander) [S30].
2. **Hell und Dunkel gleichwertig**, App und Webseite folgen dem System.
3. **Eine Quelle** (`vereine-web/design`) für Web und App, Kontrast beim Erzeugen geprüft wie Spotifys Algorithmus.
4. **Deutsche Texte:** Satzschreibung, keine Sperrung, Layouts für 40 % längeren Text, Du-Form.
5. **Handy zuerst:** 48 px Tippfläche, Tab-Leiste mit Icon und einem Wort, Icons 24 px, aktiv gefüllt.
6. **Durchsetzen statt bitten:** Lint und Build blockieren, Hooks melden sofort, Review-Agent prüft am Bild.

## Quellen

Spotify und Design (abgerufen 2026-10-30; spotify.design nur noch im Internet Archive):

- S1 Reimagining Design Systems at Spotify (2020): https://web.archive.org/web/2025/https://spotify.design/article/reimagining-design-systems-at-spotify
- S2 Can I get an Encore? (2022): https://web.archive.org/web/2025/https://spotify.design/article/can-i-get-an-encore-spotifys-design-system-three-years-on
- S3 Introducing Spotify's New Design Principles (2020): https://web.archive.org/web/2025/https://spotify.design/article/introducing-spotifys-new-design-principles
- S4 Better in Black (2021): https://web.archive.org/web/2025/https://spotify.design/article/better-in-black-rethinking-our-most-important-buttons
- S5 Refreshing our Icon System (2022): https://web.archive.org/web/2025/https://spotify.design/article/refreshing-our-icon-system-the-why-and-how-behind-the-changes
- S6 Designing a new Foundation: Spotify for Desktop (2021): https://web.archive.org/web/2025/https://spotify.design/article/designing-a-new-foundation-spotify-for-desktop
- S7 Bringing the Spotify Heart to Life (2020): https://web.archive.org/web/2025/https://spotify.design/article/bringing-the-spotify-heart-to-life
- S8 Small but Mighty, Now Playing Bar (2021): https://web.archive.org/web/2025/https://spotify.design/article/small-but-mighty-weve-rolled-out-changes-to-the-now-playing-bar
- S9 The Art of the Error Message (2018): https://web.archive.org/web/2025/https://spotify.design/article/the-art-of-the-error-message
- S10 A Design System Isn't One-Size-Fits-All (2018): https://web.archive.org/web/2025/https://spotify.design/article/a-design-system-isnt-one-size-fits-all
- S11 Encore x Accessibility (2023): https://engineering.atspotify.com/2023/3/encore-x-accessibility-a-balancing-act
- S12 Figma Blog, Creating coherence (2023): https://www.figma.com/blog/creating-coherence-how-spotifys-design-system-goes-beyond-platforms/
- S13 Introducing Spotify Mix (2024): https://newsroom.spotify.com/2024-05-22/introducing-spotify-mix-our-new-and-exclusive-font/
- S14 Spotify Design & Branding Guidelines: https://developer.spotify.com/documentation/design (Farbgrafik: https://developer-assets.spotifycdn.com/images/guidelines/design/colors.svg)
- S15 Fonts In Use, Spotify 2024: https://fontsinuse.com/uses/63891/spotify-2024-redesign
- S16 Blake Crosley, Spotify-Leitfaden [Dritte, teils veraltet]: https://blakecrosley.com/guides/design/spotify
- S17 Desktop-Redesign (2023): https://newsroom.spotify.com/2023-06-20/spotify-desktop-experience-redesign-your-library-now-playing-views-customize/
- S18 TechCrunch, dunkles Redesign (2014): https://techcrunch.com/2014/04/01/spotify-goes-over-to-the-dark-side-with-a-new-makeover/
- S19 Shaun Bent, Design Systems London 2019: https://www.alwaystwisted.com/articles/design-systems-london-2019-shaun-bent
- S20 Web-Player-CSS (Dateiname wechselt): https://open.spotifycdn.com/cdn/build/web-player/web-player.430d3681.css
- S21 Spotify-for-Artists-CSS: https://mrkt.spotifycdn.com/artists-spotify-com/_next/static/css/420de6e8b925c83b.css
- S22 Web-Player-JS: https://open.spotifycdn.com/cdn/build/web-player/web-player.f954508a.js
- S23 Gear Patrol, Create-Tab (2025): https://www.gearpatrol.com/?p=912362
- S24 Accessibility in Design (2021): https://web.archive.org/web/2025/https://spotify.design/article/accessibility-in-design
- S25 GAAD Round-Up (2019): https://web.archive.org/web/2025/https://spotify.design/article/spotify-inclusive-design-global-accessibility-awareness-day-round-up
- S26 Designing for the World (2022): https://web.archive.org/web/2025/https://spotify.design/article/designing-for-the-world-an-introduction-to-localization
- S27 Material Components, Dark Theme: https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md
- S28 Google Fonts (Figtree, Inter, DM Sans, Plus Jakarta Sans): https://github.com/google/fonts/tree/main/ofl
- S29 Schrift-Alternativen zu Circular [Dritte]: https://fontalternatives.com/alternatives/circular/with/geometric/
- S30 Icon-Sets: https://github.com/phosphor-icons/homepage, https://github.com/tabler/tabler-icons, https://developers.google.com/fonts/docs/material_symbols, https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md
- S31 Spotify Developer Terms: https://developer.spotify.com/terms
- S32 Compliance Tips: https://developer.spotify.com/compliance-tips
- S33 Spotify Accessibility Guidelines: https://developer.spotify.com/documentation/accessibility
- S34 Spotify Developer Policy: https://developer.spotify.com/policy
- S35 Spotify Terms of Use: https://www.spotify.com/us/legal/end-user-agreement/
- S36 Spotify User Guidelines: https://www.spotify.com/us/legal/user-guidelines/
- S37 Lineto Circular: https://lineto.com/typefaces/circular

Claude und Designregeln:

- C1 Claude Code, Best Practices: https://code.claude.com/docs/en/best-practices
- C2 Claude Code, Hooks: https://code.claude.com/docs/en/hooks
- C3 Claude Code, Hooks Guide: https://code.claude.com/docs/en/hooks-guide
- C4 Prompting Claude Opus 4.8: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8
- C5 Prompting Claude Sonnet 5: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5
- C6 Prompting Claude Opus 5.5: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5
- C7 Claude Code, Context Window: https://code.claude.com/docs/en/context-window
- C8 Claude Code, Skills: https://code.claude.com/docs/en/skills
- C9 Claude Code, Memory: https://code.claude.com/docs/en/memory
- C10 Agent Skills, Best Practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- C11 alma/widgets PR #327: https://github.com/alma/widgets/pull/327
- C12 Tech Arion, Design Tokens in CLAUDE.md: https://techarion.com/blog/design-tokens-claude-md-rules-stop-generic-ai-ui
- C13 Hardik Pandya, Expose your design system to LLMs: https://hardik.substack.com/p/expose-your-design-system-to-llms
- C14 IFScale (arXiv 2507.11538): https://arxiv.org/abs/2507.11538
- C15 Claude Prompting Best Practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- C16 wmedia, Claude Code verifiziert eigene Arbeit: https://wmedia.es/en/tips/claude-code-playwright-mcp-verify-own-work
- C17 Builder.io, Playwright MCP mit Claude Code: https://www.builder.io/blog/playwright-mcp-server-claude-code
- C18 OneRedOak design-review: https://github.com/OneRedOak/claude-code-workflows/tree/main/design-review
- C19 Claude Code, Subagents: https://code.claude.com/docs/en/sub-agents
- C20 Anthropic Skill frontend-design: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- Weitere: HumanLayer, CLAUDE.md-Treue: https://www.humanlayer.dev/blog/stop-claude-from-ignoring-your-claude-md ·
  W3C Design Tokens 2025.10: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/ ·
  Stylelint-Regeln: https://stylelint.io/user-guide/rules
