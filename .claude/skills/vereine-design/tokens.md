# Token-Referenz

<!-- Erzeugt aus vereine-web/design mit `npm run design`. Nicht von Hand ändern. -->

Jeder Wert in CSS kommt aus dieser Liste, immer als `var(--name)`. Fehlt ein Token, wird es in
`vereine-web/design/tokens.json` ergänzt (`npm run design`), nie im Komponenten-CSS erfunden.

## Farben

Rollen gelten in jedem Set. Ohne Klasse gilt `base`; ein Element mit `class="set-…"` setzt für sich und
alle Kinder andere Werte für dieselben Rollen. Komponenten nutzen nur die Rollen, nie Rohfarben.

### Set `base` (Standard)

Standard für Seiten. Ohne Klasse gilt dieses Set.

| Token | Hell | Dunkel | Wofür |
|---|---|---|---|
| `--background-base` | `#ffffff` | `#0f1210` | Fläche des Sets: Seitenhintergrund, im Set `accent` die Fläche der Hauptaktion. |
| `--background-highlight` | `#f0f3f1` | `#1f2420` | Hover auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-press` | `#e4e9e6` | `#080a09` | Gedrückt auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-elevated-base` | `#f6f8f7` | `#1a1e1b` | Erhöhte Fläche: Karte, Leiste, Menü, Dialog, Bottom-Sheet. |
| `--background-elevated-highlight` | `#ebefec` | `#262b27` | Hover auf erhöhter Fläche. |
| `--background-elevated-press` | `#dde3df` | `#111412` | Gedrückt auf erhöhter Fläche. |
| `--background-tinted-base` | `#10131114` | `#ffffff1a` | Getönte Fläche, wirkt auf jedem Untergrund: Eingabefeld, Chip, Zweitaktion, Platzhalter. |
| `--background-tinted-highlight` | `#1013111f` | `#ffffff24` | Hover auf getönter Fläche. |
| `--background-tinted-press` | `#10131130` | `#ffffff36` | Gedrückt auf getönter Fläche. |
| `--text-base` | `#111412` | `#f4f7f5` | Haupttext, Titel, Beschriftung von Bedienelementen. |
| `--text-subdued` | `#59635c` | `#a7b1aa` | Nebentext: Untertitel, Metadaten, Zähler, inaktive Tabs. |
| `--text-bright-accent` | `#13703a` | `#5acf88` | Akzent als Text: aktiver Tab, gewählter Filter, Link. |
| `--text-negative` | `#b3261e` | `#f97a6b` | Text einer Fehlermeldung. |
| `--text-warning` | `#8a5a00` | `#f2c35b` | Text einer Warnung. |
| `--text-positive` | `#13703a` | `#5acf88` | Text einer Erfolgsmeldung. |
| `--text-announcement` | `#1f5fbf` | `#8ab4ff` | Text eines Hinweises (Info). |
| `--essential-base` | `#111412` | `#f4f7f5` | Icons und Ränder, die man sehen muss: Eingabefeld im Fokus, Checkbox, Fokusring. |
| `--essential-subdued` | `#7b857e` | `#7b857e` | Icons und Bedienränder in Ruhe: Rand eines Eingabefelds, inaktives Icon. |
| `--essential-bright-accent` | `#178045` | `#5acf88` | Aktives Icon, Schalter an, Fortschritt, gewählte Option. |
| `--essential-negative` | `#cc3324` | `#f97a6b` | Icon oder Rand bei Fehler. |
| `--essential-warning` | `#a86f00` | `#f2c35b` | Icon oder Rand bei Warnung. |
| `--essential-positive` | `#178045` | `#5acf88` | Icon oder Rand bei Erfolg. |
| `--essential-announcement` | `#2b6fd6` | `#8ab4ff` | Icon oder Rand bei Hinweis (Info). |
| `--decorative-base` | `#111412` | `#f4f7f5` | Schmuck ohne Bedeutung in voller Stärke (selten). |
| `--decorative-subdued` | `#d9dfdb` | `#2b312d` | Trennlinie, dezenter Rand ohne Bedienfunktion. |
| `--shadow` | `#10131126` | `#00000080` | Schattenfarbe; nur über `--elevation-…` verwenden. |

### Set `accent` (`class="set-accent"`)

Akzentfläche für die eine Hauptaktion je Ansicht (Button, aktiver Chip, Hervorhebung). Text darauf nimmt wieder `--text-base`.

| Token | Hell | Dunkel | Wofür |
|---|---|---|---|
| `--background-base` | `#13703a` | `#5acf88` | Fläche des Sets: Seitenhintergrund, im Set `accent` die Fläche der Hauptaktion. |
| `--background-highlight` | `#0f6131` | `#6cd795` | Hover auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-press` | `#0b5229` | `#48c078` | Gedrückt auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-elevated-base` | `#0f6131` | `#6cd795` | Erhöhte Fläche: Karte, Leiste, Menü, Dialog, Bottom-Sheet. |
| `--background-elevated-highlight` | `#0b5229` | `#7ddea3` | Hover auf erhöhter Fläche. |
| `--background-elevated-press` | `#0e4424` | `#48c078` | Gedrückt auf erhöhter Fläche. |
| `--background-tinted-base` | `#ffffff1f` | `#06201214` | Getönte Fläche, wirkt auf jedem Untergrund: Eingabefeld, Chip, Zweitaktion, Platzhalter. |
| `--background-tinted-highlight` | `#ffffff2e` | `#0620121f` | Hover auf getönter Fläche. |
| `--background-tinted-press` | `#ffffff3d` | `#06201230` | Gedrückt auf getönter Fläche. |
| `--text-base` | `#ffffff` | `#062012` | Haupttext, Titel, Beschriftung von Bedienelementen. |
| `--text-subdued` | `#dcf2e3` | `#0b3a1f` | Nebentext: Untertitel, Metadaten, Zähler, inaktive Tabs. |
| `--text-bright-accent` | `#ffffff` | `#062012` | Akzent als Text: aktiver Tab, gewählter Filter, Link. |
| `--text-negative` | `#ffe3df` | `#4a0d09` | Text einer Fehlermeldung. |
| `--text-warning` | `#fff1c7` | `#4a3300` | Text einer Warnung. |
| `--text-positive` | `#ffffff` | `#062012` | Text einer Erfolgsmeldung. |
| `--text-announcement` | `#e2ecff` | `#0b2e66` | Text eines Hinweises (Info). |
| `--essential-base` | `#ffffff` | `#062012` | Icons und Ränder, die man sehen muss: Eingabefeld im Fokus, Checkbox, Fokusring. |
| `--essential-subdued` | `#a8d9b8` | `#0e4424` | Icons und Bedienränder in Ruhe: Rand eines Eingabefelds, inaktives Icon. |
| `--essential-bright-accent` | `#ffffff` | `#062012` | Aktives Icon, Schalter an, Fortschritt, gewählte Option. |
| `--essential-negative` | `#ffe3df` | `#4a0d09` | Icon oder Rand bei Fehler. |
| `--essential-warning` | `#fff1c7` | `#4a3300` | Icon oder Rand bei Warnung. |
| `--essential-positive` | `#ffffff` | `#062012` | Icon oder Rand bei Erfolg. |
| `--essential-announcement` | `#e2ecff` | `#0b2e66` | Icon oder Rand bei Hinweis (Info). |
| `--decorative-base` | `#ffffff` | `#062012` | Schmuck ohne Bedeutung in voller Stärke (selten). |
| `--decorative-subdued` | `#178045` | `#2f9e5c` | Trennlinie, dezenter Rand ohne Bedienfunktion. |
| `--shadow` | `#0000003d` | `#00000066` | Schattenfarbe; nur über `--elevation-…` verwenden. |

### Set `negative` (`class="set-negative"`)

Fläche für zerstörende Aktionen (Löschen, Austragen). Nur mit Bestätigung.

| Token | Hell | Dunkel | Wofür |
|---|---|---|---|
| `--background-base` | `#b3261e` | `#f97a6b` | Fläche des Sets: Seitenhintergrund, im Set `accent` die Fläche der Hauptaktion. |
| `--background-highlight` | `#9c1f18` | `#ff8b7d` | Hover auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-press` | `#861a14` | `#ec6a5b` | Gedrückt auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-elevated-base` | `#c22e20` | `#ff8b7d` | Erhöhte Fläche: Karte, Leiste, Menü, Dialog, Bottom-Sheet. |
| `--background-elevated-highlight` | `#b3261e` | `#ff9a8d` | Hover auf erhöhter Fläche. |
| `--background-elevated-press` | `#9c1f18` | `#ec6a5b` | Gedrückt auf erhöhter Fläche. |
| `--background-tinted-base` | `#ffffff1f` | `#2b090514` | Getönte Fläche, wirkt auf jedem Untergrund: Eingabefeld, Chip, Zweitaktion, Platzhalter. |
| `--background-tinted-highlight` | `#ffffff2e` | `#2b09051f` | Hover auf getönter Fläche. |
| `--background-tinted-press` | `#ffffff3d` | `#2b090530` | Gedrückt auf getönter Fläche. |
| `--text-base` | `#ffffff` | `#2b0905` | Haupttext, Titel, Beschriftung von Bedienelementen. |
| `--text-subdued` | `#ffe3df` | `#4a0d09` | Nebentext: Untertitel, Metadaten, Zähler, inaktive Tabs. |
| `--text-bright-accent` | `#ffffff` | `#2b0905` | Akzent als Text: aktiver Tab, gewählter Filter, Link. |
| `--text-negative` | `#ffffff` | `#2b0905` | Text einer Fehlermeldung. |
| `--text-warning` | `#fff1c7` | `#4a3300` | Text einer Warnung. |
| `--text-positive` | `#dcf2e3` | `#062012` | Text einer Erfolgsmeldung. |
| `--text-announcement` | `#e2ecff` | `#0b2e66` | Text eines Hinweises (Info). |
| `--essential-base` | `#ffffff` | `#2b0905` | Icons und Ränder, die man sehen muss: Eingabefeld im Fokus, Checkbox, Fokusring. |
| `--essential-subdued` | `#ffbdb5` | `#5e120d` | Icons und Bedienränder in Ruhe: Rand eines Eingabefelds, inaktives Icon. |
| `--essential-bright-accent` | `#ffffff` | `#2b0905` | Aktives Icon, Schalter an, Fortschritt, gewählte Option. |
| `--essential-negative` | `#ffffff` | `#2b0905` | Icon oder Rand bei Fehler. |
| `--essential-warning` | `#fff1c7` | `#4a3300` | Icon oder Rand bei Warnung. |
| `--essential-positive` | `#dcf2e3` | `#062012` | Icon oder Rand bei Erfolg. |
| `--essential-announcement` | `#e2ecff` | `#0b2e66` | Icon oder Rand bei Hinweis (Info). |
| `--decorative-base` | `#ffffff` | `#2b0905` | Schmuck ohne Bedeutung in voller Stärke (selten). |
| `--decorative-subdued` | `#cc3324` | `#d9473a` | Trennlinie, dezenter Rand ohne Bedienfunktion. |
| `--shadow` | `#0000003d` | `#00000066` | Schattenfarbe; nur über `--elevation-…` verwenden. |

### Set `inverted` (`class="set-inverted"`)

Umgekehrtes Thema für kurze Einblendungen über dem Inhalt: Toast, Tooltip.

| Token | Hell | Dunkel | Wofür |
|---|---|---|---|
| `--background-base` | `#0f1210` | `#ffffff` | Fläche des Sets: Seitenhintergrund, im Set `accent` die Fläche der Hauptaktion. |
| `--background-highlight` | `#1f2420` | `#f0f3f1` | Hover auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-press` | `#080a09` | `#e4e9e6` | Gedrückt auf Zeilen und Flächen, die auf `background-base` liegen. |
| `--background-elevated-base` | `#1a1e1b` | `#f6f8f7` | Erhöhte Fläche: Karte, Leiste, Menü, Dialog, Bottom-Sheet. |
| `--background-elevated-highlight` | `#262b27` | `#ebefec` | Hover auf erhöhter Fläche. |
| `--background-elevated-press` | `#111412` | `#dde3df` | Gedrückt auf erhöhter Fläche. |
| `--background-tinted-base` | `#ffffff1a` | `#10131114` | Getönte Fläche, wirkt auf jedem Untergrund: Eingabefeld, Chip, Zweitaktion, Platzhalter. |
| `--background-tinted-highlight` | `#ffffff24` | `#1013111f` | Hover auf getönter Fläche. |
| `--background-tinted-press` | `#ffffff36` | `#10131130` | Gedrückt auf getönter Fläche. |
| `--text-base` | `#f4f7f5` | `#111412` | Haupttext, Titel, Beschriftung von Bedienelementen. |
| `--text-subdued` | `#a7b1aa` | `#59635c` | Nebentext: Untertitel, Metadaten, Zähler, inaktive Tabs. |
| `--text-bright-accent` | `#5acf88` | `#13703a` | Akzent als Text: aktiver Tab, gewählter Filter, Link. |
| `--text-negative` | `#f97a6b` | `#b3261e` | Text einer Fehlermeldung. |
| `--text-warning` | `#f2c35b` | `#8a5a00` | Text einer Warnung. |
| `--text-positive` | `#5acf88` | `#13703a` | Text einer Erfolgsmeldung. |
| `--text-announcement` | `#8ab4ff` | `#1f5fbf` | Text eines Hinweises (Info). |
| `--essential-base` | `#f4f7f5` | `#111412` | Icons und Ränder, die man sehen muss: Eingabefeld im Fokus, Checkbox, Fokusring. |
| `--essential-subdued` | `#7b857e` | `#7b857e` | Icons und Bedienränder in Ruhe: Rand eines Eingabefelds, inaktives Icon. |
| `--essential-bright-accent` | `#5acf88` | `#178045` | Aktives Icon, Schalter an, Fortschritt, gewählte Option. |
| `--essential-negative` | `#f97a6b` | `#cc3324` | Icon oder Rand bei Fehler. |
| `--essential-warning` | `#f2c35b` | `#a86f00` | Icon oder Rand bei Warnung. |
| `--essential-positive` | `#5acf88` | `#178045` | Icon oder Rand bei Erfolg. |
| `--essential-announcement` | `#8ab4ff` | `#2b6fd6` | Icon oder Rand bei Hinweis (Info). |
| `--decorative-base` | `#f4f7f5` | `#111412` | Schmuck ohne Bedeutung in voller Stärke (selten). |
| `--decorative-subdued` | `#2b312d` | `#d9dfdb` | Trennlinie, dezenter Rand ohne Bedienfunktion. |
| `--shadow` | `#00000080` | `#10131126` | Schattenfarbe; nur über `--elevation-…` verwenden. |

## Weitere Tokens

### font-family

| Token | Wert | Wofür |
|---|---|---|
| `--font-family-base` | `system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | Alle Texte. |
| `--font-family-mono` | `ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace` | Nur Codes und Kennungen (IBAN, Mitgliedsnummer). |

### font-size

| Token | Wert | Wofür |
|---|---|---|
| `--font-size-headline` | `2.5rem`, ab 768px: `4rem` | Kennzahl oder Begrüßung im Fokus, höchstens einmal je Seite. |
| `--font-size-title-large` | `2rem`, ab 768px: `3rem` | Seitentitel (h1). |
| `--font-size-title-medium` | `1.5rem`, ab 768px: `2rem` | Abschnittstitel (h2). |
| `--font-size-title-small` | `1.25rem`, ab 768px: `1.5rem` | Titel von Karte, Dialog, Bottom-Sheet (h3). |
| `--font-size-body` | `1rem` | Fließtext, Buttons, Eingabefelder, Titel in Listenzeilen (fett). |
| `--font-size-body-small` | `0.875rem` | Nebentext in Listen, Untertitel, kleine Buttons, Chips. |
| `--font-size-marginal` | `0.75rem` | Tab-Beschriftung, Badge, Zeitstempel. Nie für Sätze. |

### font-weight

| Token | Wert | Wofür |
|---|---|---|
| `--font-weight-regular` | `400` | Fließtext, Nebentext. |
| `--font-weight-bold` | `700` | Titel, Buttons, Zeilentitel, aktive Tabs. |
| `--font-weight-black` | `800` | Nur große Seitentitel und Kennzahlen. |

### line-height

| Token | Wert | Wofür |
|---|---|---|
| `--line-height-tight` | `1.15` | Große Titel (2xl, 3xl). |
| `--line-height-snug` | `1.3` | Überschriften, Zeilentitel, Buttons. |
| `--line-height-normal` | `1.5` | Fließtext. |

### space

| Token | Wert | Wofür |
|---|---|---|
| `--space-1` | `0.25rem` | Icon zu Text, sehr eng. |
| `--space-2` | `0.5rem` | Innerhalb einer Gruppe: Chip zu Chip, Titel zu Untertitel. |
| `--space-3` | `0.75rem` | Innenabstand kleiner Elemente, Listenzeile oben und unten. |
| `--space-4` | `1rem` | Innenabstand von Karten und Listenzeilen. |
| `--space-5` | `1.5rem` | Zwischen Gruppen und Abschnitten. |
| `--space-6` | `2rem` | Zwischen großen Abschnitten, Seitenrand ab Tablet. |
| `--space-7` | `3rem` | Abstand über dem Seitentitel, leere Zustände. |
| `--space-8` | `4rem` | Sehr großer Abstand, Kopfbereich ab Desktop. |
| `--space-page` | `1rem`, ab 768px: `2rem` | Seitenrand links und rechts. |

### radius

| Token | Wert | Wofür |
|---|---|---|
| `--radius-sm` | `4px` | Kleine Bilder, Wappen in Listen, Badges. |
| `--radius-md` | `8px` | Karten, Bilder, Eingabefelder, Menüs. |
| `--radius-lg` | `16px` | Dialoge, Bottom-Sheets, große Karten. |
| `--radius-pill` | `999px` | Buttons, Chips, Suchfeld, Toast. |
| `--radius-round` | `50%` | Avatare, runde Icon-Buttons. |

### size

| Token | Wert | Wofür |
|---|---|---|
| `--size-touch` | `48px` | Mindestgröße jeder Tippfläche (Android 48 dp, iOS 44 pt). |
| `--size-control-sm` | `32px` | Höhe kleiner Buttons und Chips; Tippfläche trotzdem 48 px. |
| `--size-control-md` | `48px` | Höhe von Buttons und Eingabefeldern. |
| `--size-control-lg` | `56px` | Höhe der einen großen Hauptaktion einer Seite. |
| `--size-icon-sm` | `16px` | Icon im Fließtext, Badge. |
| `--size-icon-md` | `24px` | Standard-Icon: Tab-Leiste, Listenzeile, Icon-Button. |
| `--size-icon-lg` | `32px` | Icon im leeren Zustand, große Kachel. |
| `--size-avatar-sm` | `32px` | Avatar oder Wappen in dichten Listen. |
| `--size-avatar-md` | `48px` | Avatar oder Wappen in Listenzeilen. |
| `--size-avatar-lg` | `96px` | Avatar oder Wappen im Kopf einer Detailseite. |
| `--size-content-max` | `72rem` | Maximale Inhaltsbreite der Webseite. |
| `--size-sidebar` | `17rem` | Breite der Seitenleiste der Webseite ab Desktop. |

### elevation

| Token | Wert | Wofür |
|---|---|---|
| `--elevation-1` | `0 4px 12px var(--shadow)` | Schwebende Leiste, Toast, Kopfleiste beim Scrollen. |
| `--elevation-2` | `0 16px 24px var(--shadow), 0 6px 8px var(--shadow)` | Menü, Dialog, Bottom-Sheet. |

### focus

| Token | Wert | Wofür |
|---|---|---|
| `--focus-ring` | `0 0 0 2px var(--background-base), 0 0 0 4px var(--essential-base)` | Für `:focus-visible` an allen Bedienelementen. |

### ring

| Token | Wert | Wofür |
|---|---|---|
| `--ring-subdued` | `inset 0 0 0 1px var(--essential-subdued)` | Bedienrand in Ruhe: Eingabefeld, Umriss-Button. |
| `--ring-base` | `inset 0 0 0 1px var(--essential-base)` | Bedienrand bei Hover. |
| `--ring-strong` | `inset 0 0 0 2px var(--essential-base)` | Eingabefeld im Fokus, gewählte Karte. |
| `--ring-negative` | `inset 0 0 0 2px var(--essential-negative)` | Eingabefeld mit Fehler. |

### duration

| Token | Wert | Wofür |
|---|---|---|
| `--duration-fast` | `100ms` | Hover, Drücken. |
| `--duration-normal` | `200ms` | Farbwechsel, Ein- und Ausblenden, Tab-Wechsel. |
| `--duration-slow` | `300ms` | Bottom-Sheet, Dialog, Seitenübergang. |

### easing

| Token | Wert | Wofür |
|---|---|---|
| `--easing-standard` | `cubic-bezier(0.3, 0, 0, 1)` | Zustandswechsel: Hover, Drücken, Farbe. |
| `--easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Etwas erscheint: Dialog, Bottom-Sheet, Toast. |
| `--easing-exit` | `cubic-bezier(0.8, 0, 1, 1)` | Etwas verschwindet. |

### scale

| Token | Wert | Wofür |
|---|---|---|
| `--scale-press` | `0.96` | Beim Drücken (`:active`) geben Buttons, Icon-Buttons und Tabs leicht nach. |
| `--scale-hover` | `1.04` | Hauptaktion bei Hover (nur Maus, nur ohne reduzierte Bewegung). |

### opacity

| Token | Wert | Wofür |
|---|---|---|
| `--opacity-disabled` | `0.4` | Deaktivierte Bedienelemente. Daneben steht immer, warum. |

### layer

| Token | Wert | Wofür |
|---|---|---|
| `--layer-sticky` | `10` | Mitlaufende Kopf- und Tab-Leiste. |
| `--layer-overlay` | `100` | Menü, Dialog, Bottom-Sheet samt Abdunklung. |
| `--layer-toast` | `1000` | Toast über allem. |
