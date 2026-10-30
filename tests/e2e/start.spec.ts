import { expect, test } from '@playwright/test';

test('Gesundheitsprüfung antwortet ohne vereine-api', async ({ request }) => {
  const response = await request.get('/gesund');
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('ok');
});

test('Startseite zeigt die Vereinsverwaltung', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Vereinsverwaltung');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vereinsverwaltung');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
});
