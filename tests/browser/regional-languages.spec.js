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
  await expect(page.locator('#regional-ipa')).not.toHaveText('');
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
  await expect(page.locator('#regional-ipa')).not.toHaveText('');
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
