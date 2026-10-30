# Texte auf dem Bildschirm

Wer liest: Ehrenamtliche in österreichischen Amateur-Fußballvereinen, oft nebenbei, am Handy, am Platz. Jeder Text
muss beim ersten Blick sitzen.

## Grundregeln

- **Deutsch, Du-Form, kurz.** Ein Satz statt zwei, zwei Wörter statt fünf. Lieber zwei kurze Sätze als einer mit
  Nebensatz.
- **Keine Gedankenstriche** („—“, „ – “) als Satzzeichen. Stattdessen Punkt, Komma oder Doppelpunkt.
- **Satzschreibung**, nie GROSSBUCHSTABEN, auch nicht in Buttons und Tabs.
- **Vereinssprache statt Technik:** „Mitglied“, „Mannschaft“, „Training“, „Beitrag“, nicht „Datensatz“, „Entität“,
  „Eintrag synchronisieren“, „Request“, „Fehlercode“.
- **Kein Erklärtext, wenn ein Icon, eine Beschriftung oder ein Beispiel reicht.**
- **Zeichen:** Mittelpunkt „ · “ trennt Angaben in einer Zeile („U17 · Mittelfeld“), „…“ für Gekürztes.

## Muster

| Wo | So | Nicht so |
|---|---|---|
| Hauptaktion | „Mitglied anlegen“ | „Neues Mitglied hinzufügen“, „OK“ |
| Zweitaktion | „Abbrechen“, „Später“ | „Vorgang abbrechen“ |
| Tab | „Start“, „Mitglieder“, „Termine“, „Mehr“ | „Mitgliederverwaltung“ |
| Seitentitel | „Mitglieder“ | „Übersicht der Mitglieder“ |
| Nebentext | „48 aktiv · 3 neu“ | „Es gibt derzeit 48 aktive Mitglieder.“ |
| Leer | „Noch keine Termine“ + „Lege das erste Training an.“ | „Keine Daten vorhanden.“ |
| Erfolg (Toast) | „Gespeichert“, „Max ist dabei“ | „Der Vorgang wurde erfolgreich abgeschlossen!“ |
| Feldhinweis | „Wie im Pass“ | „Bitte geben Sie hier den Vornamen ein.“ |
| Icon-Button (`aria-label`) | „Suchen“, „Schließen“, „Mehr Aktionen“ | „Lupe“, „X“, „Icon“ |

## Fehlermeldungen

Die beste Fehlermeldung ist keine: Eingaben früh einschränken (Datumsauswahl statt Freitext, passende Tastatur).
Sonst nach Spotifys Regel:

1. **Was ist passiert**, in Vereinssprache: „Speichern hat nicht geklappt.“
2. **Was jetzt**, als Button, nicht als Satz: „Nochmal versuchen“.
3. Bei Eingaben direkt am Feld (`.field-error`) mit Beispiel: „Bitte eine E-Mail-Adresse wie name@beispiel.at
   eingeben.“

Keine Schuld beim Nutzer („Sie haben … falsch eingegeben“), keine Codes, keine Ausrufezeichen. Ohne Netz:
„Keine Verbindung. Wir speichern, sobald du wieder online bist.“

## Bestätigen und Löschen

- Rückgängig machbar: sofort tun, Toast mit „Rückgängig“.
- Nicht rückgängig machbar: Dialog. Titel als Frage mit dem Namen („Max Muster entfernen?“), ein Satz zur Folge
  („Seine Termine und Zahlungen bleiben gespeichert.“), Buttons „Entfernen“ (`button-danger set-negative`) und
  „Abbrechen“ (`button-tertiary`). Nie „Ja“/„Nein“.

## Zahlen, Datum, Geld

- Gebietsschema `de-AT`: in TypeScript `Intl.DateTimeFormat('de-AT', …)`/`Intl.NumberFormat('de-AT', …)`, in C#
  `CultureInfo.GetCultureInfo("de-AT")`. Das ergibt österreichische Formen wie „Jänner“.
- Datum kurz und relativ, wo es hilft: „Heute 18:30“, „Morgen“, „Sa 1. Nov“. Mit Jahr nur, wenn es nicht das
  laufende ist.
- Uhrzeit 24 h ohne „Uhr“ in Listen („15:00“), mit „Uhr“ im Satz („um 15 Uhr“).
- Geld: „25 €“, mit Cent nur, wenn nötig („12,50 €“).

## Länge

Deutsche Wörter und Vereinsnamen sind lang („Spielgemeinschaft Unterbergern-Oberndorf“). Layouts vertragen 40 %
mehr Text; Titel umbrechen (`text-wrap: balance` macht `base.css`), Zeilen in Listen kürzen mit `…`, Buttons nie.
