/*
 * Typisierter Client für vereine-api (openapi-fetch). Die Typen kommen aus der OpenAPI-Beschreibung
 * der laufenden API; beide Dateien werden eingecheckt:
 *
 *   npm run api:spec    # src/lib/api/openapi.json von ${VEREINE_API_URL:-http://localhost:5610}
 *   npm run api:types   # src/lib/api/schema.d.ts daraus erzeugen
 */
import createClient, { type Client } from 'openapi-fetch';
import type { paths } from './schema';

export type ApiClient = Client<paths>;

/** Client gegen die Basis-URL von vereine-api (`VEREINE_API_URL` aus `astro:env/server`). */
export function createApiClient(
  baseUrl: string,
  fetch: typeof globalThis.fetch = globalThis.fetch,
): ApiClient {
  return createClient<paths>({ baseUrl, fetch });
}
