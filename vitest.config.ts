import { defineConfig } from 'vitest/config';

// Reine TypeScript-Unit-Tests neben dem Code; der @/-Alias entspricht tsconfig.json.
export default defineConfig({
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
