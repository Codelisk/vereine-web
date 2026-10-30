// Designsystem als Regel (Skill `vereine-design`): Farben, Schrift, Radien, Schatten, Ebenen und Abstände kommen nur
// aus den Design-Tokens (`src/styles/tokens.css`, erzeugt aus `design/tokens.json`). Feste Werte sind Lint-Fehler.

/** Schlüsselwörter, die kein Token brauchen. */
const keywords = [
  '0',
  'none',
  'auto',
  'normal',
  'inherit',
  'initial',
  'unset',
  'revert',
  'transparent',
  'currentColor',
  'currentcolor',
];

/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-declaration-strict-value', 'stylelint-value-no-unknown-custom-properties'],
  ignoreFiles: [
    'dist/**',
    '.astro/**',
    'node_modules/**',
    'playwright-report/**',
    'test-results/**',
    'src/styles/tokens.css',
  ],
  overrides: [{ files: ['**/*.astro', '**/*.svelte', '**/*.html'], customSyntax: 'postcss-html' }],
  rules: {
    'color-no-hex': [
      true,
      { message: 'Fester Farbwert. Nimm ein Farb-Token, z. B. var(--text-base).' },
    ],
    'color-named': ['never', { message: 'Benannte Farbe. Nimm ein Farb-Token.' }],
    'function-disallowed-list': [
      ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color'],
      {
        message:
          'Farbfunktion mit festen Werten. Nimm ein Farb-Token; color-mix() nur mit var(--…).',
      },
    ],
    'scale-unlimited/declaration-strict-value': [
      [
        '/color$/',
        'background',
        'fill',
        'stroke',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'border-radius',
        'box-shadow',
        'z-index',
        'transition-duration',
        'animation-duration',
      ],
      {
        // Listen aus Tokens (box-shadow: var(--ring-strong), var(--focus-ring)) prüft das Plugin je Teil.
        ignoreValues: [...keywords, '/^var\\(--[a-z0-9-]+\\),$/'],
        message: '${property} ohne Token: "${value}". Nimm var(--…) aus src/styles/tokens.css.',
      },
    ],
    // Erfundene Tokens (var(--color-txt)) sind Fehler; erlaubt sind die aus tokens.css und im selben Block definierte.
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: ['src/styles/tokens.css'],
        message:
          'Unbekanntes Token %s. Erlaubt sind die aus tokens.css (Skill vereine-design, tokens.md).',
      },
    ],
    'declaration-property-value-disallowed-list': [
      {
        '/^(margin|padding|gap|row-gap|column-gap|inset)/': [
          '/(^|[^a-z0-9.-])-?\\d*\\.?\\d+(px|rem|em|pt)\\b/',
        ],
      },
      { message: 'Fester Abstand. Nimm var(--space-…).' },
    ],
  },
};
