import { dev } from 'astro';

// Die programmatische API erlaubt eine eigene Testinstanz neben einem lokalen Dev-Server;
// dessen Konfiguration und Prozess bleiben unberührt. Ohne Dev-Toolbar, damit sie nicht in
// Screenshots und axe-Prüfungen landet.
await dev({
  server: { host: '127.0.0.1', port: Number.parseInt(process.env.TEST_WEB_PORT ?? '14610', 10) },
  devToolbar: { enabled: false },
});
