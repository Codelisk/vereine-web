/** Gesundheitsprüfung für Docker und Aspire: antwortet immer, auch ohne vereine-api. */
import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response('ok', { headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' } });
