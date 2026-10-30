/*
 * Erzeugt aus design/tokens.json alle Design-Dateien für diese Webseite und für vereine-app (Geschwister-Repo unter
 * dev/repos) und kopiert den Skill vereine-design in die App.
 *
 *   npm run design          schreiben
 *   npm run design:check    nur prüfen (Teil von `npm run lint`): Abweichung oder zu wenig Kontrast ist ein Fehler
 *
 * Ohne ../vereine-app (z. B. in einer CI nur für die Webseite) prüft und schreibt das Skript nur die Webseite.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { argv, exit } from 'node:process';
import {
  checkContrast,
  loadDesignSystem,
  renderAndroid,
  renderCss,
  renderIconNamesCs,
  renderIconNamesTs,
  renderIconReference,
  renderProps,
  renderReference,
  renderSprite,
  renderXaml,
  type IconSource,
  type TokenTree,
} from './generate.ts';

const web = resolve(import.meta.dirname, '..');
const app = resolve(web, '../vereine-app');
const skill = '.claude/skills/vereine-design';
const header = 'Erzeugt aus vereine-web/design mit `npm run design`. Nicht von Hand ändern.';
const check = argv.includes('--check');

const tree = JSON.parse(readFileSync(join(web, 'design/tokens.json'), 'utf8')) as TokenTree;
const system = loadDesignSystem(tree);

const failures = checkContrast(system);
if (failures.length > 0) {
  for (const failure of failures) {
    console.error(
      `Kontrast zu gering: ${failure.foreground} auf ${failure.background} ` +
        `(${failure.theme}, Set ${failure.set}): ${failure.ratio.toFixed(2)}:1, nötig ${failure.minimum}:1`,
    );
  }
  exit(1);
}

const phosphor = join(web, 'node_modules/@phosphor-icons/core/assets');
const icons: IconSource[] = Object.entries(
  JSON.parse(readFileSync(join(web, 'design/icons.json'), 'utf8')) as Record<string, string>,
)
  .filter(([name]) => !name.startsWith('$'))
  .map(([name, meaning]) => {
    const file = (style: string, suffix: string) => join(phosphor, style, `${name}${suffix}.svg`);
    if (!existsSync(file('bold', '-bold')))
      throw new Error(`Icon "${name}" gibt es in Phosphor nicht.`);
    return {
      name,
      meaning,
      outline: readFileSync(file('bold', '-bold'), 'utf8'),
      fill: readFileSync(file('fill', '-fill'), 'utf8'),
    };
  });

const css = renderCss(system, header);
const sprite = renderSprite(icons, header);
const outputs = new Map<string, string>([
  [join(web, 'src/styles/tokens.css'), css],
  [
    join(web, 'src/styles/base.css'),
    `/* Kopie von vereine-web/design/base.css (\`npm run design\`). Nicht von Hand ändern. */\n\n${readFileSync(join(web, 'design/base.css'), 'utf8')}`,
  ],
  [join(web, 'public/icons.svg'), sprite],
  [join(web, 'src/components/icon-names.ts'), renderIconNamesTs(icons, header)],
  [join(web, skill, 'tokens.md'), renderReference(system, header)],
  [join(web, skill, 'icons.md'), renderIconReference(icons, header)],
]);

const withApp = existsSync(join(app, 'src/Vereine.App'));
if (withApp) {
  outputs.set(join(app, 'src/Vereine.App/wwwroot/css/tokens.css'), css);
  outputs.set(
    join(app, 'src/Vereine.App/wwwroot/css/base.css'),
    outputs.get(join(web, 'src/styles/base.css'))!,
  );
  outputs.set(join(app, 'src/Vereine.App/wwwroot/icons.svg'), sprite);
  outputs.set(
    join(app, 'src/Vereine.App/Components/Design/IconName.cs'),
    renderIconNamesCs(icons, header),
  );
  outputs.set(
    join(app, 'src/Vereine.App/Resources/Styles/Tokens.xaml'),
    renderXaml(system, header),
  );
  outputs.set(
    join(app, 'src/Vereine.App/Resources/Styles/Tokens.props'),
    renderProps(system, header),
  );
  outputs.set(
    join(app, 'src/Vereine.App/Platforms/Android/Resources/values/colors.xml'),
    renderAndroid(system, header),
  );
  // Der Skill liegt hier und geht als Kopie in die App; tokens.md und icons.md kommen frisch aus `outputs`.
  for (const file of listFiles(join(web, skill))) {
    const target = join(app, skill, relative(join(web, skill), file));
    outputs.set(target, outputs.get(file) ?? readFileSync(file, 'utf8'));
  }
  for (const name of ['tokens.md', 'icons.md']) {
    outputs.set(join(app, skill, name), outputs.get(join(web, skill, name))!);
  }
}

const stale = withApp ? listFiles(join(app, skill)).filter((file) => !outputs.has(file)) : [];
const changed = [...outputs].filter(
  ([file, content]) => !existsSync(file) || readFileSync(file, 'utf8') !== content,
);

if (check) {
  if (changed.length > 0 || stale.length > 0) {
    for (const [file] of changed) console.error(`Nicht aktuell: ${relative(web, file)}`);
    for (const file of stale) console.error(`Nicht mehr im Skill: ${relative(web, file)}`);
    console.error(
      'Design-Dateien weichen von design/tokens.json ab. `npm run design` ausführen und beide Repos committen.',
    );
    exit(1);
  }
  console.log(
    `Designsystem aktuell (${outputs.size} Dateien${withApp ? ', mit vereine-app' : ', ohne vereine-app'}).`,
  );
} else {
  for (const [file, content] of changed) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
    console.log(`geschrieben: ${relative(web, file)}`);
  }
  for (const file of stale) {
    rmSync(file);
    console.log(`entfernt: ${relative(web, file)}`);
  }
  if (!withApp) console.warn('../vereine-app fehlt: nur die Webseite erzeugt.');
  console.log(
    `Designsystem: ${changed.length + stale.length} Änderung(en), ${outputs.size} Dateien.`,
  );
}

function listFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name))
    .sort();
}
