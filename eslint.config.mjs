import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['dist/', '.astro/', 'playwright-report/', 'test-results/', 'src/lib/api/schema.d.ts'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  svelte.configs.recommended,
  {
    // Svelte-Inseln mit <script lang="ts">: TypeScript-Parser im Skriptteil.
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.svelte'] },
    },
  },
  {
    // Konfigurationen und Test-Hilfen laufen in Node.
    files: ['*.config.{mjs,ts}', 'tests/**/*.{ts,mjs}'],
    languageOptions: { globals: globals.node },
  },
);
