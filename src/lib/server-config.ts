/*
 * Startparameter aus der Umgebung (Aspire, Docker), geprüft bevor Astro startet. Wird von
 * astro.config.mjs importiert und läuft deshalb ohne Astro-Module.
 */

/** Port aus `PORT`: nur Ziffern, 1 bis 65535. Fehlt der Wert, gilt Astros Vorgabe (undefined). */
export function parsePort(value: string | undefined): number | undefined {
  if (value === undefined || value.trim() === '') return undefined;
  const text = value.trim();
  const port = /^[0-9]+$/.test(text) ? Number.parseInt(text, 10) : Number.NaN;
  if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT muss eine ganze Zahl zwischen 1 und 65535 sein.');
  }
  return port;
}

/** Erlaubte Domain für Astros Forwarded-Host-Prüfung (`security.allowedDomains`). */
export interface AllowedDomain {
  hostname: string;
  protocol: 'http' | 'https';
  port?: string;
}

/**
 * Origin aus `ASTRO_ALLOWED_ORIGIN` („verein.example“ oder „https://verein.example:8443“).
 * Ohne Wert gibt es keine Freigabe; ein Origin mit Pfad, Query oder Zugangsdaten bricht den Start ab.
 */
export function parseAllowedOrigin(value: string | undefined): AllowedDomain | undefined {
  const text = value?.trim();
  if (!text) return undefined;

  let origin: URL;
  try {
    origin = new URL(text.includes('://') ? text : `https://${text}`);
  } catch {
    throw new Error(invalidOrigin);
  }
  if (
    (origin.protocol !== 'http:' && origin.protocol !== 'https:') ||
    origin.username ||
    origin.password ||
    origin.pathname !== '/' ||
    origin.search ||
    origin.hash
  ) {
    throw new Error(invalidOrigin);
  }

  return {
    hostname: origin.hostname,
    protocol: origin.protocol === 'http:' ? 'http' : 'https',
    ...(origin.port ? { port: origin.port } : {}),
  };
}

const invalidOrigin =
  'ASTRO_ALLOWED_ORIGIN muss ein HTTP(S)-Origin ohne Pfad, Query oder Zugangsdaten sein.';
