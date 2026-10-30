import { dev } from 'astro';

// Die programmatische API erlaubt eine eigene Testinstanz neben einem lokalen Dev-Server;
// dessen Konfiguration und Prozess bleiben unberührt.
await dev({
  server: { host: '127.0.0.1', port: Number.parseInt(process.env.TEST_WEB_PORT ?? '14610', 10) },
});
