// Erzeugt aus vereine-web/design mit `npm run design`. Nicht von Hand ändern.

/** Erlaubte Icons (Phosphor, Skill vereine-design, icons.md). */
export const iconNames = [
  'house', // Start, Übersicht
  'users-three', // Mitglieder, Mannschaft
  'user-circle', // Profil, eigenes Konto
  'user-plus', // Mitglied aufnehmen
  'calendar-blank', // Termine, Kalender
  'calendar-check', // Zusage, Anwesenheit
  'soccer-ball', // Spiel, Training
  'clipboard-text', // Aufgaben, Listen
  'envelope-simple', // Nachricht, E-Mail
  'phone', // Anrufen
  'currency-eur', // Beiträge, Geld
  'bell', // Benachrichtigungen
  'magnifying-glass', // Suchen
  'plus', // Neu anlegen
  'pencil-simple', // Bearbeiten
  'trash', // Löschen
  'check', // Fertig, bestätigt
  'x', // Schließen, abbrechen
  'caret-left', // Zurück
  'caret-right', // Öffnen, weiter (am Zeilenende)
  'dots-three', // Mehr Aktionen
  'gear-six', // Einstellungen
  'arrow-clockwise', // Neu laden, nochmal versuchen
  'info', // Hinweis
  'warning-circle', // Warnung, Fehler
  'sign-out', // Abmelden
] as const;

export type IconName = (typeof iconNames)[number];
