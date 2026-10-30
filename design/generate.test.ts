import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  checkContrast,
  contrastRatio,
  loadDesignSystem,
  parseHex,
  renderCss,
  renderXaml,
  type TokenTree,
} from './generate.ts';

/** Kleinstes gültiges System: zwei Themen, zwei Sets, eine Rolle plus Fläche. */
function tree(overrides: Partial<Record<string, string>> = {}): TokenTree {
  const set = (background: string, text: string) => ({
    'background-base': { $value: background },
    'text-base': { $value: text },
  });
  return {
    palette: { $type: 'color', white: { $value: '#ffffff' }, ink: { $value: '#111111' } },
    color: {
      light: {
        base: set('{palette.white}', overrides.lightText ?? '{palette.ink}'),
        accent: set('#13703a', '#ffffff'),
      },
      dark: { base: set('{palette.ink}', '{palette.white}'), accent: set('#5acf88', '#062012') },
    },
    space: { $type: 'dimension', '1': { $value: '0.25rem', $description: 'eng' } },
    focus: { ring: { $value: '0 0 0 2px var(--text-base)' } },
    native: { xaml: { FrameBackgroundDark: { $value: '{color.dark.base.background-base}' } } },
  };
}

describe('loadDesignSystem', () => {
  it('löst Aliase auf, auch über mehrere Stufen', () => {
    const system = loadDesignSystem(tree());
    const frame = system.tokens.find(
      (token) => token.path.join('.') === 'native.xaml.FrameBackgroundDark',
    );
    expect(frame?.value).toBe('#111111');
    expect(system.themes).toEqual(['light', 'dark']);
    expect(system.sets).toEqual(['base', 'accent']);
  });

  it('meldet einen Alias ohne Ziel', () => {
    expect(() => loadDesignSystem(tree({ lightText: '{palette.fehlt}' }))).toThrow(
      '{palette.fehlt}',
    );
  });

  it('verlangt in jedem Set dieselben Rollen', () => {
    const broken = tree();
    const dark = (broken.color as TokenTree).dark as TokenTree;
    delete (dark.accent as TokenTree)['text-base'];
    expect(() => loadDesignSystem(broken)).toThrow('Fehlt: text-base');
  });
});

describe('renderCss', () => {
  const css = renderCss(loadDesignSystem(tree()), 'Kopf');

  it('setzt Hell als Standard und Dunkel per Systemeinstellung', () => {
    expect(css).toContain(':root,\n.set-base {\n  --background-base: #ffffff;');
    expect(css).toContain(
      '@media (prefers-color-scheme: dark) {\n  :root,\n  .set-base {\n    --background-base: #111111;',
    );
    expect(css).toContain('.set-accent {\n  --background-base: #13703a;');
  });

  it('wiederholt Tokens mit Farbbezug in jedem Set, damit sie die Farben des Sets nehmen', () => {
    expect(css).toContain(':root {\n  --space-1: 0.25rem;\n}');
    expect(css).toMatch(
      /:root,\n\.set-base,\n\.set-accent \{\n {2}--focus-ring: 0 0 0 2px var\(--text-base\);\n\}/,
    );
  });

  it('lässt Rohfarben weg', () => {
    expect(css).not.toContain('--palette');
  });

  it('setzt $extensions.medium ab 768 px', () => {
    const withMedium = tree();
    withMedium['font-size'] = {
      'title-large': { $value: '2rem', $extensions: { medium: '3rem' } },
    };
    expect(renderCss(loadDesignSystem(withMedium), 'Kopf')).toContain(
      '@media (min-width: 768px) {\n  :root {\n    --font-size-title-large: 3rem;\n  }\n}',
    );
  });
});

describe('renderXaml', () => {
  it('schreibt Farben als MAUI-Ressourcen', () => {
    expect(renderXaml(loadDesignSystem(tree()), 'Kopf')).toContain(
      '<Color x:Key="FrameBackgroundDark">#111111</Color>',
    );
  });
});

describe('Kontrast', () => {
  it('rechnet wie WCAG', () => {
    expect(contrastRatio(parseHex('#000000', 't'), parseHex('#ffffff', 't'))).toBeCloseTo(21, 5);
    expect(contrastRatio(parseHex('#767676', 't'), parseHex('#ffffff', 't'))).toBeCloseTo(4.54, 2);
  });

  it('meldet zu schwachen Text', () => {
    const failures = checkContrast(loadDesignSystem(tree({ lightText: '#bbbbbb' })));
    expect(failures).toContainEqual(
      expect.objectContaining({
        theme: 'light',
        set: 'base',
        foreground: '--text-base',
        background: '--background-base',
      }),
    );
  });

  it('besteht für design/tokens.json', () => {
    const system = loadDesignSystem(
      JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf8')),
    );
    expect(checkContrast(system)).toEqual([]);
  });
});
