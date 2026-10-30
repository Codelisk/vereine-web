# Bausteine

Alle Klassen kommen aus `base.css` (Quelle `vereine-web/design/base.css`). Das Markup ist in Astro, Svelte und Razor
gleich; nur das Icon schreibt sich je Plattform anders:

| Plattform | Icon | Aktiv (gefüllt) |
|---|---|---|
| Astro | `<Icon name="house" />` | `<Icon name="house" filled />` |
| Svelte | `<svg class="icon" aria-hidden="true"><use href="/icons.svg#house" /></svg>` | `#house-fill` |
| Razor | `<Icon Name="IconName.House" />` | `<Icon Name="IconName.House" Filled="true" />` |

Größen: `size="small"`/`IconSize.Small` (16 px im Text), Standard 24 px, `large` 32 px. In den Beispielen unten steht
die Astro-Form.

## Seite

```html
<main class="page">                      <!-- App: <div class="page">, das <main> liefert das Layout -->
  <header class="page-header">
    <h1>Mitglieder</h1>
    <p class="subdued">48 aktiv</p>
  </header>
  <!-- Abschnitte -->
</main>
```

Eine Kennzahl im Fokus (z. B. offene Beiträge): `<p class="headline">12</p>`, höchstens einmal je Seite.

## Buttons

```html
<button class="button button-primary set-accent">Mitglied anlegen</button>   <!-- eine je Ansicht -->
<button class="button button-secondary">Exportieren</button>
<button class="button button-tertiary">Abbrechen</button>
<button class="button button-danger set-negative">Entfernen</button>          <!-- nur im Bestätigungsdialog -->
<a class="button button-secondary" href="/termine">Alle Termine</a>           <!-- Weg statt Aktion: <a> -->
```

- Zusätze: `button-small` (32 px, in Zeilen und Karten), `button-large` (56 px, die eine große Aktion einer Seite),
  `button-block` (volle Breite, Handy unten).
- Mit Icon: `<button class="button button-primary set-accent"><Icon name="plus" />Mitglied</button>`.
- Text: Verb, höchstens drei Wörter, Satzschreibung (texte.md).

## Icon-Button

```html
<button class="icon-button" aria-label="Suchen"><Icon name="magnifying-glass" /></button>
<button class="icon-button" aria-label="Mehr Aktionen"><Icon name="dots-three" /></button>
```

48 px Tippfläche, rund, ohne Fläche. `aria-label` ist Pflicht und sagt die Aktion, nicht das Icon („Schließen“,
nicht „X“). Umschalter: `aria-pressed="true"` macht ihn hell; dazu das gefüllte Icon.

## Chips (Filter, Auswahl)

```html
<div class="chip-group" role="group" aria-label="Status">
  <button class="chip set-inverted" aria-pressed="true">Alle</button>
  <button class="chip" aria-pressed="false">Aktiv</button>
  <button class="chip" aria-pressed="false">Passiv</button>
</div>
```

Gewählt immer `set-inverted` plus `aria-pressed="true"`, nie `set-accent`. Die Gruppe scrollt waagrecht.

## Listenzeile

Das Arbeitspferd für Mitglieder, Termine, Spiele, Beiträge.

```html
<ul class="list">
  <li>
    <a class="list-row" href="/mitglieder/42">
      <span class="list-row-media round"><img src="…" alt="" /></span>   <!-- Person: round -->
      <span class="list-row-text">
        <span class="list-row-title">Anna Berger</span>
        <span class="list-row-subtitle">U17 · Mittelfeld</span>
      </span>
      <span class="list-row-end"><Icon name="caret-right" size="small" /></span>
    </a>
  </li>
</ul>
```

- Links Bild, Wappen (`list-row-media`, abgerundetes Quadrat) oder Icon (`<span class="list-row-media"><Icon … /></span>`).
- Mitte: Titel und genau eine Zeile Nebentext, beide werden mit `…` gekürzt; der volle Text steht im Detail.
- Rechts höchstens eins: Pfeil, kurze Angabe („Sa 15:00“), Status-Icon oder `icon-button` „Mehr Aktionen“.
- Ganze Zeile tippbar: `<a class="list-row">` für Wege, `<button class="list-row">` für Aktionen. Ohne Ziel `<div>`.

## Karte und Abschnitt

```html
<section class="section" aria-labelledby="naechste">
  <header class="section-header">
    <h2 id="naechste">Nächste Termine</h2>
    <a href="/termine">Alle anzeigen</a>
  </header>
  <a class="card" href="/termine/7">
    <h3>Heimspiel gegen SV Musterdorf</h3>
    <p class="subdued">Sa 1. Nov · 15:00 · Sportplatz</p>
  </a>
</section>
```

Karten für Dinge, die man als Ganzes antippt (Termin, Mannschaft). Für viele gleichartige Einträge Listenzeilen
statt Karten.

## Leerer Zustand

```html
<section class="empty-state" aria-labelledby="leer">
  <span class="empty-state-icon"><Icon name="users-three" /></span>
  <h2 id="leer">Noch keine Mitglieder</h2>
  <p>Lege das erste Mitglied an oder lade eine Liste hoch.</p>
  <button class="button button-primary set-accent">Mitglied anlegen</button>
</section>
```

## Banner (Hinweis, Warnung, Fehler, Erfolg)

```html
<div class="banner banner-warning" role="status">
  <Icon name="warning-circle" />
  <p>3 Beiträge sind seit 30 Tagen offen.</p>
</div>
```

Ton: `banner-negative` (`role="alert"`), `banner-warning`, `banner-positive`, `banner-announcement`. Icon passend:
`warning-circle`, `check`, `info`. Ein Satz, optional ein `button-small`.

## Eingabefeld und Suche

```html
<label class="field">
  <span class="field-label">Vorname</span>
  <input class="input" name="vorname" autocomplete="given-name" />
  <span class="field-hint">Wie im Pass</span>                         <!-- nur wenn nötig -->
</label>

<label class="field">
  <span class="field-label">E-Mail</span>
  <input class="input" type="email" aria-invalid="true" aria-describedby="email-fehler" />
  <span class="field-error" id="email-fehler">Bitte eine E-Mail-Adresse wie name@beispiel.at eingeben.</span>
</label>

<div class="search">
  <Icon name="magnifying-glass" />
  <input class="input" type="search" placeholder="Mitglied suchen" aria-label="Mitglied suchen" />
</div>
```

Beschriftung immer sichtbar über dem Feld, nie nur als Platzhalter. Passendes `type`, `inputmode` und
`autocomplete` setzen, damit das Handy die richtige Tastatur zeigt.

## Tab-Leiste (App, Webseite auf dem Handy)

```html
<nav class="tab-bar" aria-label="Hauptnavigation">
  <a class="tab" href="/" aria-current="page"><Icon name="house" filled /><span>Start</span></a>
  <a class="tab" href="/mitglieder"><Icon name="users-three" /><span>Mitglieder</span></a>
  <a class="tab" href="/termine"><Icon name="calendar-blank" /><span>Termine</span></a>
  <a class="tab" href="/mehr"><Icon name="dots-three" /><span>Mehr</span></a>
</nav>
```

Höchstens fünf Ziele, ein Wort je Tab. Aktiv: `aria-current="page"` und gefülltes Icon. In der App liegt die Leiste
im `MainLayout` unter dem Inhalt.

## Was es (noch) nicht gibt

Dialog, Bottom-Sheet, Menü, Toast, Schalter und Checkbox sind noch keine Bausteine. Wird einer gebraucht: erst in
`vereine-web/design/base.css` als Baustein anlegen (Rollen und Sets wie oben, Schatten `--elevation-2`, Ebene
`--layer-overlay` bzw. `--layer-toast`, Einblenden mit `--duration-slow` und `--easing-enter`), hier dokumentieren,
`npm run design`, dann verwenden. Für die App vorher prüfen, ob `shiny-controls` ihn schon hat, und ihn dann mit
den Tokens gestalten.
