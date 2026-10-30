/*
 * Designsystem der Vereineapp: liest design/tokens.json und erzeugt daraus alle Ziele für Webseite und App.
 * Reine Funktionen ohne Dateizugriff; build.ts schreibt bzw. prüft die Dateien.
 *
 * Aufbau von tokens.json (angelehnt an das DTCG-Format: `$value`, `$type`, `$description`, Aliase `{pfad.zum.token}`):
 * - `palette`: Rohfarben. Nur Quelle für Aliase, sie landen nie im CSS.
 * - `color.<thema>.<set>.<rolle>`: semantische Farben. Thema `light`/`dark`, Set `base`, `accent` … wie die
 *   Farbsets von Spotify Encore: Komponenten nutzen nur die Rollen, das umgebende Set bestimmt die Werte.
 * - `native.xaml|msbuild|android.<name>`: Farben für den nativen App-Rahmen (MAUI, Icon, Splash, Android).
 * - alles andere (space, radius, font-size …): ein CSS-Token je Blatt, Name = Pfad mit Bindestrichen.
 *   `$extensions.medium` setzt den Wert ab 768 px Breite (Tablet, Desktop), wie die Layout-Themen von Encore.
 */

export interface Token {
  path: string[];
  value: string;
  type: string | undefined;
  description: string | undefined;
  /** Wert ab `mediumWidth` (Tablet, Desktop). */
  medium: string | undefined;
}

export type TokenTree = { [key: string]: TokenTree | string | undefined };

export interface DesignSystem {
  /** Alle Tokens mit aufgelösten Aliasen. */
  tokens: Token[];
  themes: string[];
  sets: string[];
  /** `$description` an `color.<standardthema>.<set>`: wofür das Set da ist. */
  setDescriptions: Map<string, string>;
}

export const defaultTheme = 'light';
export const baseSet = 'base';
/** Ab dieser Breite gelten die `medium`-Werte (Encore: medium devices). */
export const mediumWidth = '768px';

const aliasPattern = /^\{([^{}]+)\}$/;

/** Liest den Token-Baum, löst Aliase auf und prüft, dass jedes Set dieselben Rollen hat. */
export function loadDesignSystem(tree: TokenTree): DesignSystem {
  const raw: Token[] = [];
  collect(tree, [], undefined, raw);
  const byPath = new Map(raw.map((token) => [token.path.join('.'), token]));

  const tokens = raw.map((token) => ({ ...token, value: resolve(token, byPath, []) }));

  const color = tokens.filter((token) => token.path[0] === 'color');
  const themes = unique(color.map((token) => token.path[1]!));
  const sets = unique(color.map((token) => token.path[2]!));
  if (!themes.includes(defaultTheme)) throw new Error(`color.${defaultTheme} fehlt.`);
  if (sets[0] !== baseSet) throw new Error(`Das erste Set muss "${baseSet}" sein.`);

  const roles = (theme: string, set: string) =>
    color
      .filter((token) => token.path[1] === theme && token.path[2] === set)
      .map((token) => token.path.slice(3).join('-'))
      .sort();
  const expected = roles(defaultTheme, baseSet);
  for (const theme of themes) {
    for (const set of sets) {
      const actual = roles(theme, set);
      const missing = expected.filter((role) => !actual.includes(role));
      const extra = actual.filter((role) => !expected.includes(role));
      if (missing.length > 0 || extra.length > 0) {
        throw new Error(
          `color.${theme}.${set} braucht genau die Rollen von color.${defaultTheme}.${baseSet}.` +
            (missing.length > 0 ? ` Fehlt: ${missing.join(', ')}.` : '') +
            (extra.length > 0 ? ` Zu viel: ${extra.join(', ')}.` : ''),
        );
      }
    }
  }

  const light = (tree.color as TokenTree | undefined)?.[defaultTheme] as TokenTree | undefined;
  const setDescriptions = new Map(
    sets.map((set) => [set, String((light?.[set] as TokenTree | undefined)?.$description ?? '')]),
  );

  return { tokens, themes, sets, setDescriptions };
}

function collect(node: TokenTree, path: string[], inheritedType: string | undefined, out: Token[]) {
  const type = typeof node.$type === 'string' ? node.$type : inheritedType;
  if ('$value' in node) {
    if (typeof node.$value !== 'string')
      throw new Error(`${path.join('.')}: $value muss ein Text sein.`);
    const extensions = node.$extensions as TokenTree | undefined;
    out.push({
      path,
      value: node.$value,
      type,
      description: typeof node.$description === 'string' ? node.$description : undefined,
      medium: typeof extensions?.medium === 'string' ? extensions.medium : undefined,
    });
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (typeof child !== 'object' || child === null) {
      throw new Error(
        `${[...path, key].join('.')}: erwartet eine Gruppe oder ein Token mit $value.`,
      );
    }
    collect(child, [...path, key], type, out);
  }
}

function resolve(token: Token, byPath: Map<string, Token>, seen: string[]): string {
  const alias = aliasPattern.exec(token.value)?.[1];
  if (alias === undefined) return token.value;
  const id = token.path.join('.');
  if (seen.includes(id)) throw new Error(`Alias-Schleife: ${[...seen, id].join(' → ')}`);
  const target = byPath.get(alias);
  if (!target) throw new Error(`${id}: Alias {${alias}} zeigt auf kein Token.`);
  return resolve(target, byPath, [...seen, id]);
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

/** CSS-Name eines Tokens: Pfad ohne Gruppe `color.<thema>.<set>`, mit Bindestrichen. */
export function cssName(token: Token): string {
  const path = token.path[0] === 'color' ? token.path.slice(3) : token.path;
  return `--${path.join('-')}`;
}

function cssTokens(system: DesignSystem): Token[] {
  return system.tokens.filter((token) => !['palette', 'color', 'native'].includes(token.path[0]!));
}

function colorTokens(system: DesignSystem, theme: string, set: string): Token[] {
  return system.tokens.filter(
    (token) => token.path[0] === 'color' && token.path[1] === theme && token.path[2] === set,
  );
}

/** Rolle `color-scheme` ist kein Token, sondern die CSS-Eigenschaft für Formularelemente und Scrollleisten. */
function colorDeclarations(
  system: DesignSystem,
  theme: string,
  set: string,
  indent: string,
): string[] {
  return colorTokens(system, theme, set).map((token) =>
    cssName(token) === '--color-scheme'
      ? `${indent}color-scheme: ${token.value};`
      : `${indent}${cssName(token)}: ${token.value};`,
  );
}

function setSelector(set: string): string {
  return set === baseSet ? `:root,\n.set-${set}` : `.set-${set}`;
}

/**
 * tokens.css für Webseite und App (identischer Inhalt).
 *
 * Ein Custom Property mit `var()` wird dort aufgelöst, wo es deklariert ist. Tokens wie `--focus-ring`, die auf
 * Farben verweisen, stehen deshalb an jedem Set noch einmal; sonst trüge ein Fokusring im Set `accent` die Farbe
 * von `base`.
 */
export function renderCss(system: DesignSystem, header: string): string {
  const plain = cssTokens(system).filter((token) => !token.value.includes('var(--'));
  const derived = cssTokens(system).filter((token) => token.value.includes('var(--'));

  const lines: string[] = [`/* ${header} */`, '', ':root {'];
  for (const token of plain) lines.push(`  ${cssName(token)}: ${token.value};`);
  lines.push('}');

  if (derived.length > 0) {
    lines.push(
      '',
      `${[setSelector(baseSet), ...system.sets.slice(1).map(setSelector)].join(',\n')} {`,
    );
    for (const token of derived) lines.push(`  ${cssName(token)}: ${token.value};`);
    lines.push('}');
  }

  const medium = cssTokens(system).filter((token) => token.medium !== undefined);
  if (medium.length > 0) {
    lines.push('', `@media (min-width: ${mediumWidth}) {`, '  :root {');
    for (const token of medium) lines.push(`    ${cssName(token)}: ${token.medium};`);
    lines.push('  }', '}');
  }

  for (const set of system.sets) {
    lines.push(
      '',
      `${setSelector(set)} {`,
      ...colorDeclarations(system, defaultTheme, set, '  '),
      '}',
    );
  }
  for (const theme of system.themes.filter((theme) => theme !== defaultTheme)) {
    lines.push('', `@media (prefers-color-scheme: ${theme}) {`);
    for (const [index, set] of system.sets.entries()) {
      if (index > 0) lines.push('');
      lines.push(
        `  ${setSelector(set).replace('\n', '\n  ')} {`,
        ...colorDeclarations(system, theme, set, '    '),
        '  }',
      );
    }
    lines.push('}');
  }
  return `${lines.join('\n')}\n`;
}

function nativeTokens(system: DesignSystem, target: 'xaml' | 'msbuild' | 'android'): Token[] {
  return system.tokens.filter((token) => token.path[0] === 'native' && token.path[1] === target);
}

function nativeColor(token: Token): string {
  const hex = parseHex(token.value, token.path.join('.'));
  // MAUI und Android lesen #AARRGGBB; deckende Farben ohne Alpha.
  return `#${toHex(hex.alpha)}${toHex(hex.r)}${toHex(hex.g)}${toHex(hex.b)}`
    .toUpperCase()
    .replace(/^#FF/, '#');
}

/** Resources/Styles/Tokens.xaml: Farben für den MAUI-Rahmen (Hintergrund hinter der BlazorWebView). */
export function renderXaml(system: DesignSystem, header: string): string {
  const entries = nativeTokens(system, 'xaml').map(
    (token) => `    <Color x:Key="${token.path[2]}">${nativeColor(token)}</Color>`,
  );
  return [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    `<!-- ${header} -->`,
    '<ResourceDictionary xmlns="http://schemas.microsoft.com/dotnet/2021/maui"',
    '                    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml">',
    ...entries,
    '</ResourceDictionary>',
    '',
  ].join('\n');
}

/** Resources/Styles/Tokens.props: MSBuild-Eigenschaften für App-Icon und Splash im csproj. */
export function renderProps(system: DesignSystem, header: string): string {
  const entries = nativeTokens(system, 'msbuild').map(
    (token) => `    <${token.path[2]}>${nativeColor(token)}</${token.path[2]}>`,
  );
  return [
    '<Project>',
    `  <!-- ${header} -->`,
    '  <PropertyGroup>',
    ...entries,
    '  </PropertyGroup>',
    '</Project>',
    '',
  ].join('\n');
}

/** Platforms/Android/Resources/values/colors.xml: Farben des Android-Themes. */
export function renderAndroid(system: DesignSystem, header: string): string {
  const entries = nativeTokens(system, 'android').map(
    (token) => `    <color name="${token.path[2]}">${nativeColor(token)}</color>`,
  );
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<!-- ${header} -->`,
    '<resources>',
    ...entries,
    '</resources>',
    '',
  ].join('\n');
}

/** Token-Referenz für den Skill vereine-design: was es gibt und wofür. */
export function renderReference(system: DesignSystem, header: string): string {
  const describe = (token: Token) => (token.description ?? '').replaceAll('|', '\\|');
  const lines: string[] = [
    '# Token-Referenz',
    '',
    `<!-- ${header} -->`,
    '',
    'Jeder Wert in CSS kommt aus dieser Liste, immer als `var(--name)`. Fehlt ein Token, wird es in',
    '`vereine-web/design/tokens.json` ergänzt (`npm run design`), nie im Komponenten-CSS erfunden.',
    '',
    '## Farben',
    '',
    `Rollen gelten in jedem Set. Ohne Klasse gilt \`${baseSet}\`; ein Element mit \`class="set-…"\` setzt für sich und`,
    'alle Kinder andere Werte für dieselben Rollen. Komponenten nutzen nur die Rollen, nie Rohfarben.',
    '',
  ];

  const themes = system.themes;
  for (const set of system.sets) {
    lines.push(
      `### Set \`${set}\`${set === baseSet ? ' (Standard)' : ` (\`class="set-${set}"\`)`}`,
      '',
    );
    const setDescription = system.setDescriptions.get(set);
    if (setDescription) lines.push(setDescription, '');
    lines.push(
      `| Token | ${themes.map((theme) => (theme === 'light' ? 'Hell' : theme === 'dark' ? 'Dunkel' : theme)).join(' | ')} | Wofür |`,
      `|---|${themes.map(() => '---').join('|')}|---|`,
    );
    for (const token of colorTokens(system, defaultTheme, set)) {
      const name = cssName(token);
      if (name === '--color-scheme') continue;
      const values = themes.map(
        (theme) =>
          `\`${colorTokens(system, theme, set).find((other) => cssName(other) === name)?.value ?? ''}\``,
      );
      const base = colorTokens(system, defaultTheme, baseSet).find(
        (other) => cssName(other) === name,
      );
      lines.push(
        `| \`${name}\` | ${values.join(' | ')} | ${describe(token) || describe(base ?? token)} |`,
      );
    }
    lines.push('');
  }

  const groups = unique(cssTokens(system).map((token) => token.path[0]!));
  lines.push('## Weitere Tokens', '');
  for (const group of groups) {
    lines.push(`### ${group}`, '', '| Token | Wert | Wofür |', '|---|---|---|');
    for (const token of cssTokens(system).filter((other) => other.path[0] === group)) {
      const value = `\`${token.value.replaceAll('|', '\\|')}\``;
      const medium = token.medium === undefined ? '' : `, ab ${mediumWidth}: \`${token.medium}\``;
      lines.push(`| \`${cssName(token)}\` | ${value}${medium} | ${describe(token)} |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

// ── Kontrast (WCAG 2.2, Stufe AA) ─────────────────────────────────────────────

interface Rgba {
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export function parseHex(value: string, where: string): Rgba {
  const match = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(value);
  if (!match) throw new Error(`${where}: Farbe "${value}" muss #rrggbb oder #rrggbbaa sein.`);
  const rgb = match[1]!;
  return {
    r: Number.parseInt(rgb.slice(0, 2), 16),
    g: Number.parseInt(rgb.slice(2, 4), 16),
    b: Number.parseInt(rgb.slice(4, 6), 16),
    alpha: match[2] === undefined ? 255 : Number.parseInt(match[2], 16),
  };
}

function toHex(value: number): string {
  return Math.round(value).toString(16).padStart(2, '0');
}

/** Legt eine halbtransparente Farbe auf einen deckenden Hintergrund. */
function over(color: Rgba, background: Rgba): Rgba {
  const a = color.alpha / 255;
  return {
    r: color.r * a + background.r * (1 - a),
    g: color.g * a + background.g * (1 - a),
    b: color.b * a + background.b * (1 - a),
    alpha: 255,
  };
}

function luminance({ r, g, b }: Rgba): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.040_45 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground: Rgba, background: Rgba): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light! + 0.05) / (dark! + 0.05);
}

/** Welche Rolle auf welchen Flächen lesbar sein muss. Text 4.5:1, Icons und Bedienränder 3:1. */
export const contrastRules: { foreground: RegExp; backgrounds: string[]; minimum: number }[] = [
  {
    foreground: /^--text-base$/,
    backgrounds: [
      '--background-base',
      '--background-highlight',
      '--background-press',
      '--background-elevated-base',
      '--background-elevated-highlight',
      '--background-tinted-base',
    ],
    minimum: 4.5,
  },
  {
    foreground: /^--text-(subdued|bright-accent|negative|warning|positive|announcement)$/,
    backgrounds: ['--background-base', '--background-highlight', '--background-elevated-base'],
    minimum: 4.5,
  },
  {
    foreground: /^--essential-/,
    backgrounds: ['--background-base', '--background-elevated-base'],
    minimum: 3,
  },
];

export interface ContrastFailure {
  theme: string;
  set: string;
  foreground: string;
  background: string;
  ratio: number;
  minimum: number;
}

export function checkContrast(system: DesignSystem): ContrastFailure[] {
  const failures: ContrastFailure[] = [];
  for (const theme of system.themes) {
    for (const set of system.sets) {
      const tokens = new Map(
        colorTokens(system, theme, set)
          .filter((token) => cssName(token) !== '--color-scheme')
          .map((token) => [cssName(token), parseHex(token.value, token.path.join('.'))]),
      );
      const page = tokens.get('--background-base')!;
      if (page.alpha !== 255)
        throw new Error(`color.${theme}.${set}.background-base muss deckend sein.`);
      for (const rule of contrastRules) {
        for (const [name, foreground] of tokens) {
          if (!rule.foreground.test(name)) continue;
          for (const backgroundName of rule.backgrounds) {
            const surface = tokens.get(backgroundName);
            if (!surface) continue;
            const background = over(surface, page);
            const ratio = contrastRatio(over(foreground, background), background);
            if (ratio < rule.minimum) {
              failures.push({
                theme,
                set,
                foreground: name,
                background: backgroundName,
                ratio,
                minimum: rule.minimum,
              });
            }
          }
        }
      }
    }
  }
  return failures;
}

// ── Icons (Phosphor, SVG-Sprite) ──────────────────────────────────────────────

export interface IconSource {
  name: string;
  meaning: string;
  /** SVG der Kontur in Stärke bold (assets/bold/<name>-bold.svg): etwa 2 px Strich bei 24 px wie bei Spotify. */
  outline: string;
  /** SVG der gefüllten Form (assets/fill/<name>-fill.svg). */
  fill: string;
}

function symbol(id: string, svg: string): string {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1];
  const body = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(svg)?.[1]?.trim();
  if (!viewBox || !body) throw new Error(`Icon ${id}: kein lesbares SVG.`);
  return `  <symbol id="${id}" viewBox="${viewBox}">${body}</symbol>`;
}

/** icons.svg für Webseite und App: je Icon `<name>` (Kontur) und `<name>-fill` (aktiv). Farbe kommt aus CSS. */
export function renderSprite(icons: IconSource[], header: string): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg"><!-- ${header} Icons: Phosphor Icons, MIT-Lizenz, phosphoricons.com -->`,
    ...icons.flatMap((icon) => [
      symbol(icon.name, icon.outline),
      symbol(`${icon.name}-fill`, icon.fill),
    ]),
    '</svg>',
    '',
  ].join('\n');
}

/** Icon-Liste für den Skill vereine-design. */
export function renderIconReference(icons: IconSource[], header: string): string {
  return [
    '# Icons',
    '',
    `<!-- ${header} -->`,
    '',
    'Nur diese Icons sind erlaubt (Phosphor Icons, MIT). Kontur in Ruhe, gefüllt (`-fill`) für den aktiven Zustand,',
    'z. B. den gewählten Tab. Neues Icon: in `vereine-web/design/icons.json` mit Bedeutung eintragen, `npm run design`.',
    'Namen und Vorschau: https://phosphoricons.com',
    '',
    '| Name | Bedeutung |',
    '|---|---|',
    ...icons.map((icon) => `| \`${icon.name}\` | ${icon.meaning} |`),
    '',
  ].join('\n');
}

function pascalCase(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** src/components/icon-names.ts: Icon-Namen als Typ, damit Icon.astro nur erlaubte Namen annimmt. */
export function renderIconNamesTs(icons: IconSource[], header: string): string {
  return [
    `// ${header}`,
    '',
    '/** Erlaubte Icons (Phosphor, Skill vereine-design, icons.md). */',
    'export const iconNames = [',
    ...icons.map((icon) => `  '${icon.name}', // ${icon.meaning}`),
    '] as const;',
    '',
    'export type IconName = (typeof iconNames)[number];',
    '',
  ].join('\n');
}

/** Components/Design/IconName.cs: Icon-Namen als Enum für Icon.razor, ohne Reflection (NativeAOT). */
export function renderIconNamesCs(icons: IconSource[], header: string): string {
  return [
    `// ${header}`,
    'namespace Vereine.App.Components.Design;',
    '',
    '/// <summary>Erlaubte Icons (Phosphor, Skill vereine-design, icons.md).</summary>',
    'public enum IconName',
    '{',
    ...icons.flatMap((icon) => [
      `    /// <summary>${icon.meaning}</summary>`,
      `    ${pascalCase(icon.name)},`,
    ]),
    '}',
    '',
    'public static class IconNameExtensions',
    '{',
    '    extension(IconName name)',
    '    {',
    '        /// <summary>Id im Sprite wwwroot/icons.svg; die gefüllte Form hat zusätzlich "-fill".</summary>',
    '        public string SpriteId => name switch',
    '        {',
    ...icons.map((icon) => `            IconName.${pascalCase(icon.name)} => "${icon.name}",`),
    '            _ => throw new ArgumentOutOfRangeException(nameof(name), name, null),',
    '        };',
    '    }',
    '}',
    '',
  ].join('\n');
}
