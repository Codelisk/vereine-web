// @ts-check
import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import { defineConfig, envField } from 'astro/config';
import { env } from 'node:process';
import { parseAllowedOrigin, parsePort } from './src/lib/server-config.ts';

const allowedOrigin = parseAllowedOrigin(env.ASTRO_ALLOWED_ORIGIN);
const port = parsePort(env.PORT);

// Verwaltungswebseite der Vereine: jede Route wird pro Request gerendert (Node-Adapter),
// interaktive Teile kommen später als Svelte-5-Inseln.
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [svelte()],
  // Unter dem AppHost von vereine-api (Aspire) kommen HOST und PORT aus der Umgebung;
  // `astro dev` liest sie nicht selbst. Ohne die Variablen gelten die Astro-Vorgaben.
  // Der gebaute Node-Adapter liest HOST/PORT ohnehin zur Laufzeit.
  server: {
    ...(env.HOST ? { host: env.HOST } : {}),
    ...(port !== undefined ? { port } : {}),
  },
  security: {
    // Exakte Forwarded-Host-Grenze für den Reverse Proxy; der standardmäßige
    // checkOrigin-CSRF-Schutz bleibt aktiv.
    allowedDomains: allowedOrigin ? [allowedOrigin] : [],
  },
  env: {
    schema: {
      /** Basis-URL von vereine-api (z. B. http://localhost:5610). `secret`, damit Astro sie zur Laufzeit liest. */
      VEREINE_API_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
        url: true,
      }),
    },
  },
});
