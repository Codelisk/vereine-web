import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Designsystem im echten Browser (Skill vereine-design): jede Seite in Hell und Dunkel, Handy und Desktop.
// axe prüft Kontrast, Namen von Icon-Buttons, Überschriften und Landmarken; die Screenshots unter
// test-results/design/ sind für den Blick des Menschen und des Subagenten design-review.
// Neue Seite: Pfad hier eintragen.
const pages = ['/'];

const schemes = ['light', 'dark'] as const;
const viewports = [
  { name: 'handy', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const path of pages) {
  for (const colorScheme of schemes) {
    for (const viewport of viewports) {
      test(`${path} ${colorScheme} ${viewport.name}: barrierefrei und im Raster`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize(viewport);
        await page.goto(path);

        const name = `${path === '/' ? 'start' : path.slice(1).replaceAll('/', '-')}-${colorScheme}-${viewport.name}`;
        await page.screenshot({ path: `test-results/design/${name}.png`, fullPage: true });

        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(result.violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual(
          [],
        );

        // Nichts läuft waagrecht über den Bildschirm hinaus.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }
}
