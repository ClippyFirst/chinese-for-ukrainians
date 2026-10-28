import { test, expect } from '@playwright/test';

test('regional language page exposes four script choices and keeps Chinese converter separate', async ({ page }) => {
  await page.goto('/regional-languages.html');
  await expect(page).toHaveTitle('Інші мови — романізація та IPA');
  await expect(page.getByLabel('Мова')).toHaveValue('km');
  await expect(page.getByRole('link', { name: 'Конвертер' })).toHaveAttribute('href', './index.html');
  await expect(page.getByRole('heading', { name: 'Відібрані відкриті проєкти' })).toBeVisible();
});

test('regional example produces Latin and IPA candidate with explicit research warning', async ({ page }) => {
  await page.goto('/regional-languages.html');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#regional-results')).toBeVisible();
  await expect(page.locator('#regional-roman')).not.toHaveText('');
  await expect(page.locator('#regional-ipa')).toContainText('IPA не сформовано');
  await expect(page.locator('#regional-warning')).toContainText('не повний фонологічний рушій');
  await expect(page.locator('#regional-status')).toHaveText('Дослідницький кандидат');
});

test('language switch changes the example and preserves unknown script signs visibly', async ({ page }) => {
  await page.goto('/regional-languages.html');
  await page.getByLabel('Мова').selectOption('lo');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#regional-input')).toHaveValue('ສະບາຍດີ');
  await expect(page.locator('#regional-roman')).not.toHaveText('');
  await page.getByLabel('Мова').selectOption('si');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#regional-input')).toHaveValue('ආයුබෝවන්');
  await expect(page.locator('#regional-roman')).toHaveText('aayubowan');
  await expect(page.locator('#regional-status')).toHaveText('Upstream engine: Sinhala Text Converters 1.0.5');
  await expect(page.locator('#regional-ipa')).toContainText('IPA не сформовано');
});

test('clear returns regional page to its empty state', async ({ page }) => {
  await page.goto('/regional-languages.html');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await page.getByRole('button', { name: 'Очистити' }).click();
  await expect(page.locator('#regional-input')).toHaveValue('');
  await expect(page.locator('#regional-empty')).toBeVisible();
  await expect(page.locator('#regional-results')).toBeHidden();
});

test('regional page avoids horizontal overflow at mobile widths', async ({ page }) => {
  await page.goto('/regional-languages.html');
  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth }));
    expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('Burmese uses the locally bundled Mya2Rom engine for MLCTS2 and IPA', async ({ page }) => {
  await page.goto('/regional-languages.html');
  await page.getByLabel('Мова').selectOption('my');
  await page.locator('#regional-input').fill('မြို့');
  await expect(page.locator('#regional-roman')).toHaveText('mjou.');
  await expect(page.locator('#regional-ipa')).toHaveText('mjo̰');
  await expect(page.locator('#regional-status')).toContainText('Mya2Rom');
  await expect(page.locator('#regional-warning')).toContainText('не гарантує, що романізація виведена з IPA');
});

test('regional output order is romanization, IPA, then Ukrainian candidate', async ({ page }) => {
  await page.goto('/regional-languages.html');
  const indexes = await page.locator('#regional-results .result-card .result-index').allTextContents();
  expect(indexes).toEqual(['01', '02', '03']);
  await expect(page.locator('#regional-results .result-card').nth(0)).toContainText('Романізація');
  await expect(page.locator('#regional-results .result-card').nth(1)).toContainText('IPA');
  await expect(page.locator('#regional-results .result-card').nth(2)).toContainText('Українська транскрипція');
  await page.getByLabel('Мова').selectOption('km');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#regional-ukrainian')).toContainText('Український кандидат недоступний');
});

test('Ukrainian candidate is derived from Burmese IPA and keeps unreviewed IPA marks visible', async ({ page }) => {
  await page.goto('/regional-languages.html');
  await page.getByLabel('Мова').selectOption('my');
  await page.locator('#regional-input').fill('မြို့');
  await expect(page.locator('#regional-ipa')).toHaveText('mjo̰');
  await expect(page.locator('#regional-ukrainian')).toHaveText('мйо⟦̰⟧');
});
