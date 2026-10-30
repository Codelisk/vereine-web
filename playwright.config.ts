import { defineConfig, devices } from '@playwright/test';

// Eigene Testinstanz auf 14610, unabhängig von einem laufenden Dev-Server (4610).
// Ohne vereine-api: die Seiten dürfen dafür nichts von ihr brauchen, bis es einen Fake gibt.
const port = 14610;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    locale: 'de-AT',
    timezoneId: 'Europe/Vienna',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node tests/support/start-web.mjs',
    url: `http://127.0.0.1:${port}/gesund`,
    reuseExistingServer: false,
    env: { TEST_WEB_PORT: String(port) },
  },
});
