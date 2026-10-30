---
name: vereine-design
description: Designsystem der Vereineapp, angelehnt an Spotify (Encore). Tokens, Farbsets, Bausteine, Icons, Texte. Vor jeder Arbeit an Oberfläche, CSS, Astro, Svelte, Razor oder Texten auf dem Bildschirm in vereine-web und vereine-app lesen.
when_to_use: Neue Seite, Komponente, Liste, Formular, Dialog, Button, Farbe, Abstand, Schrift, Icon, Hell/Dunkel, leerer Zustand, Fehlermeldung, Beschriftung.
paths: "**/*.css, **/*.astro, **/*.svelte, **/*.razor, **/wwwroot/index.html, **/design/**"
---

# Designsystem der Vereineapp

Gilt für jede Oberfläche: Verwaltungswebseite (vereine-web: Astro, Svelte) und App (vereine-app: Blazor Hybrid).
Vorbild ist Spotify: ruhige Flächen, große fette Titel, Icons statt Text, Listen mit Bild links, Pillen-Buttons,
eine Akzentfarbe nur für die Hauptaktion. Ziel: Ehrenamtliche ohne Technikwissen verstehen jede Ansicht auf den
ersten Blick, auch draußen am Platz mit dem Handy.

## Feste Regeln (Hooks, Lint und Build prüfen sie)

1. **Jeder Wert ist ein Token.** Farbe, Schrift, Abstand, Radius, Schatten, Ebene und Dauer nur als `var(--…)` aus
   [tokens.md](tokens.md). Keine Hex-Werte, kein `rgb()`/`hsl()`, keine benannten Farben, keine festen `px`/`rem` für
   Abstände und Schrift. Grund: nur so wirken Hell/Dunkel, Farbsets und spätere Markenänderungen überall gleich.
2. **Keine erfundenen Tokens.** Fehlt eins, in `vereine-web/design/tokens.json` mit `$description` ergänzen,
   `npm run design` in vereine-web, beide Repos committen. `var(--color-primary)` o. ä. gibt es nicht.
3. **Erzeugte Dateien nie von Hand ändern:** `tokens.css`, `base.css`, `icons.svg`, `icon-names.ts`, `IconName.cs`,
   `Tokens.xaml`, `Tokens.props`, `colors.xml`, `tokens.md`, `icons.md` und in vereine-app dieser ganze Skill.
   Quelle ist `vereine-web/design/` (tokens.json, base.css, icons.json) und dieser Skill in vereine-web.
4. **Bausteine zuerst.** Button, Icon-Button, Chip, Listenzeile, Karte, Abschnitt, leerer Zustand, Banner,
   Eingabefeld, Tab-Leiste und Seite kommen aus `base.css`, Markup in [bausteine.md](bausteine.md). Eigenes CSS nur
   für die Anordnung einer Seite. Wird etwas an zwei Stellen gebraucht, gehört es als Baustein nach `design/base.css`.
5. **Icons nur aus [icons.md](icons.md)** über die Icon-Komponente, nie eigene SVGs, Emojis oder Zeichen wie ✕.
6. **Komponenten kennen keine Farbe, nur Rollen.** Die Farbe kommt aus dem Set (`set-accent`, `set-negative`,
   `set-inverted`) am Element oder an einem Elternelement. Nie Farben je Thema in Komponenten schreiben.
7. **Keine Inline-Styles** (`style="…"`) und keine `<style>`-Blöcke in Razor. Web: `<style>` im Astro-/Svelte-
   Baustein, App: `*.razor.css`.

Bewusste Entscheidungen, auch wenn allgemeine Ratschläge anderes sagen: dunkle Flächen mit einem Akzent,
Pillen-Buttons, große fette Titel und Icons ohne Text sind hier gewollt. Dieser Skill gilt vor allgemeinen
Design-Vorlieben. Nicht übernehmen: Spotify-Grün, Spotify-Logo, die Schriften Circular und Spotify Mix, Spotifys
eigene Icons und Spotifys Bildschirme 1:1 (Marke von Spotify, siehe Recherche).

## So sieht es aus

- **Inhalt zuerst.** Die Fläche bleibt ruhig (`--background-base`), Namen, Wappen und Termine tragen die Seite.
  Gruppen trennt Abstand (`--space-5`, `--space-6`), nicht Linien und Kästen. Trennlinien nur `--decorative-subdued`.
- **Großer Titel statt Kopfleiste.** Jede Seite beginnt mit `h1` (`--font-size-title-large`, fett schwarz), darunter
  höchstens eine Zeile `.subdued`. Keine farbigen Balken, keine Logos im Kopf.
- **Ein Akzent je Ansicht.** Genau eine Hauptaktion als `button button-primary set-accent`. Akzent sonst nur als
  Zustand: aktiver Tab, Schalter an, Fortschritt (`--text-bright-accent`, `--essential-bright-accent`). Nie als Deko.
- **Zwei Textstufen.** `--text-base` für Wichtiges, `--text-subdued` für alles andere. Hierarchie über Größe und
  Stärke (`--font-weight-regular`, `-bold`, `-black`), nie über Großbuchstaben, Unterstreichen oder bunte Schrift.
- **Formen sagen, was es ist.** Personen rund (`.list-row-media.round`, `--radius-round`), Dinge (Wappen, Mannschaft,
  Dokument) als abgerundetes Quadrat (`--radius-sm`). Buttons und Chips als Pille, Icon-Buttons als Kreis.
- **Höhe über Helligkeit.** Karten, Leisten, Dialoge liegen auf `--background-elevated-base`. Schatten
  (`--elevation-1`, `--elevation-2`) nur für schwebende Ebenen: Menü, Dialog, Bottom-Sheet, Toast.
- **Bewegung kurz und mit Zweck.** Drücken gibt nach (`--scale-press`), die Hauptaktion wächst bei Hover leicht
  (`--scale-hover`). Dauer `--duration-fast` bis `--duration-slow`. `base.css` schaltet Bewegung bei
  `prefers-reduced-motion` ab, eigene Animationen ebenso.
- **Hell und Dunkel.** Beide Themen sind gleichwertig und folgen der Systemeinstellung: Trainer stehen in der Sonne,
  Kassiere sitzen abends am Laptop. Jede Ansicht in beiden prüfen.

## Ohne viel Text

- **Navigation:** Icon plus ein kurzes Wort (Tab-Leiste, Seitenleiste), aktiv mit gefülltem Icon (`filled`).
- **Bekannte Aktionen nur als Icon:** Suchen, Schließen, Mehr, Bearbeiten, Zurück, Neu. Immer mit `aria-label`.
- **Ein Satz statt Absatz.** Kein Erklärtext über Formularen; die Beschriftung steht am Feld, ein Hinweis nur, wenn
  ohne ihn Fehler passieren.
- **Nach und nach zeigen.** Liste: Name und eine Zeile Nebentext. Details auf Tippen. Seltenes hinter „Mehr“
  (`dots-three`). Das Nächste zuerst: nächster Termin, offene Zusagen, fällige Beiträge.
- **Leer ist kein Fehler:** leerer Zustand mit Icon, Titel, einem Satz und der einen Aktion, die weiterhilft.
- Wortwahl, Fehlermeldungen, Bestätigungen und Datumsformat: [texte.md](texte.md).

## Seitenmuster

Handy zuerst (375 px), dann ab 768 px (`--font-size-title-*` und `--space-page` wachsen von selbst).

```
App: Liste                         App: Detail                      Web ab 768 px
┌──────────────────────────┐      ┌──────────────────────────┐     ┌────────┬─────────────────────────┐
│ Mitglieder         (🔍)  │ h1   │ (‹)                (⋯)   │     │ ⌂ Start│ Mitglieder   [+ Mitglied]│
│ 48 aktiv                 │      │      ( Avatar 96 )       │     │ 👥 Mitgl│ 48 aktiv                │
│ (Alle)(Aktiv)(Passiv)    │ chip │ Max Muster               │ h1  │ 📅 Term.│ (Alle)(Aktiv)(Passiv)   │
│ (●) Anna Berger      ›   │ row  │ Tormann · seit 2019      │     │        │ (●) Anna Berger  U17  › │
│ (●) Ben Huber        ›   │      │ [ Anrufen ] [ Nachricht ]│     │        │ (●) Ben Huber    Kampf› │
│ …                        │      │ Termine                  │ h2  │        │ …                       │
│ [   + Mitglied       ]   │ pri. │ ▢ Sa 1. Nov · Heimspiel  │     │ ⚙ Einst│                         │
│ ⌂    👥    📅    ⋯       │ tabs │ …                        │     │        │                         │
└──────────────────────────┘      └──────────────────────────┘     └────────┴─────────────────────────┘
```

- Seite: `<main class="page">` (Web) bzw. `<div class="page">` in der App, Kopf `.page-header`.
- Abschnitte: `.section` mit `.section-header` (h2 links, „Alle anzeigen“ rechts).
- Hauptaktion auf dem Handy unten (`button-block` oder `button-large`), auf der Webseite rechts neben dem Titel.
- Tab-Leiste mit höchstens fünf Zielen; auf der Webseite ab 768 px eine Seitenleiste mit denselben Icons.

## Farbsets

| Set | Wofür | Markup |
|---|---|---|
| `base` | Standard, gilt ohne Klasse | nichts |
| `accent` | die eine Hauptaktion je Ansicht | `class="button button-primary set-accent"` |
| `negative` | Löschen, Austragen, nur mit Bestätigung | `class="button button-danger set-negative"` |
| `inverted` | gewählter Chip, Toast, Tooltip | `class="chip set-inverted" aria-pressed="true"` |

Ein Set belegt alle Rollen neu, für das Element und seine Kinder: in `set-accent` ist `--background-base` die
Akzentfläche und `--text-base` die Schrift darauf. Deshalb verwenden Bausteine nur Rollen. Kontrast für alle Sets in
beiden Themen prüft `npm run design` (Text 4.5:1, Icons und Bedienränder 3:1); Werte mit zu wenig Kontrast lassen
sich gar nicht erzeugen.

## Bedienung und Barrierefreiheit

- Tippflächen mindestens `--size-touch` (48 px), auch bei kleinen Buttons (umgebende Zeile oder Polster).
- Semantik: `button` für Aktionen, `a` für Wege, `h1` bis `h3` ohne Sprünge, Listen als `ul`/`li`.
- Fokus sichtbar über `--focus-ring` (macht `base.css`); nie `outline: none` ohne Ersatz.
- Farbe nie allein: Fehler, Status und Auswahl immer auch mit Icon oder Text.
- Deaktiviert nur mit Grund daneben („Erst Mannschaft wählen“), sonst ausblenden.
- Lange deutsche Wörter und Vereinsnamen: Layout verträgt 40 % mehr Text; abgeschnitten (`…`) nur, wenn der volle Text
  einen Tipp entfernt ist.

## Vorgehen bei neuer Oberfläche

1. Vor dem Code: ASCII-Skizze für 375 px und die Liste der Bausteine und Tokens, die vorkommen.
2. Aus [bausteine.md](bausteine.md) zusammensetzen. Neue Rolle oder neuer Wert: erst `design/tokens.json`.
3. Prüfen: Web `npm run lint` (Stylelint, Token-Abgleich), App `dotnet build` (bricht bei Verstößen ab). Die Hooks
   melden Verstöße schon beim Schreiben, der Stop-Hook vor dem Fertigmelden.
4. Ansehen in Hell und Dunkel, 375 px und 1280 px. Web: `npm run design:screens` (Screenshots in
   `test-results/design/`), App: Skill `maui-devflow-debug`.
5. Größere Oberflächen vor dem Fertigmelden vom Subagenten `design-review` prüfen lassen
   (`.claude/agents/design-review.md` im jeweiligen Repo). Ist er nicht geladen (Sitzung außerhalb des Repos
   gestartet), einen allgemeinen Subagenten mit dem Inhalt dieser Datei als Auftrag starten.

## Fertig, wenn

- [ ] Kein fester Wert, kein unbekanntes Token (Lint bzw. Build grün).
- [ ] Großer Titel, höchstens eine Hauptaktion mit `set-accent`, sonst keine Akzentflächen.
- [ ] Nur Bausteine aus `base.css` plus Seitenlayout; Icons nur aus icons.md, Icon-Buttons mit `aria-label`.
- [ ] Texte nach [texte.md](texte.md): kurz, Du-Form, Satzschreibung, keine Gedankenstriche.
- [ ] Hell und Dunkel, 375 px und 1280 px angesehen; nichts läuft über, Tippflächen 48 px.
- [ ] Leerer Zustand, Laden und Fehler bedacht.

## Plattform

**vereine-web (Astro, Svelte)**
- Einstieg `src/styles/global.css` lädt `tokens.css` und `base.css`.
- Icon: `<Icon name="house" />` aus `@/components/Icon.astro` (Typ `IconName`, falscher Name ist ein Typfehler).
  In Svelte-Inseln: `<svg class="icon" aria-hidden="true"><use href="/icons.svg#house" /></svg>`.
- Seitenspezifisches CSS im `<style>` der Komponente, nur Tokens. Stylelint prüft `.css`, `.astro` und `.svelte`.

**vereine-app (Blazor Hybrid)**
- `wwwroot/index.html` lädt `tokens.css`, `base.css`, `app.css`; `app.css` nur für App-Spezifisches.
- Icon: `<Icon Name="IconName.House" />`, aktiv mit `Filled="true"` (`Components/Design`).
- Komponenten-CSS in `*.razor.css`. XAML nur für den Rahmen, Farben dort aus `Tokens.xaml`, Icon und Splash aus
  `Tokens.props`. `tools/check-design.sh` prüft CSS, Razor, XAML, HTML und csproj in jedem Build.

## Werte ändern

- Farbe, Größe, Abstand: `vereine-web/design/tokens.json` (Rohfarben in `palette`, Rollen je Thema und Set in
  `color`, Werte ab 768 px in `$extensions.medium`).
- Baustein: `vereine-web/design/base.css`. Icon: `vereine-web/design/icons.json` (Name von phosphoricons.com).
- Dieser Skill: `vereine-web/.claude/skills/vereine-design/`.
- Danach `npm run design` in vereine-web: schreibt Webseite und App (`../vereine-app`), prüft Kontrast. Beide Repos
  committen. `npm run lint` meldet, wenn erzeugte Dateien nicht zur Quelle passen.

Hintergrund und Quellen: `vereine-web/docs/design/recherche.md`.
