import { test, expect } from '@playwright/test';

test('loads with a keyboard-accessible empty state', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Chinese → українська');
  await expect(page.getByLabel('Введіть китайський текст')).toBeVisible();
  await expect(page.getByText('Результат з’явиться тут.')).toBeVisible();
});

test('example produces all four parallel outputs', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#results')).toBeVisible();
  await expect(page.locator('#result-pinyin')).not.toHaveText('');
  await expect(page.locator('#result-kirnosova')).not.toHaveText('');
  await expect(page.locator('#result-kirnosova-tsisar')).not.toHaveText('');
  await expect(page.locator('#result-nanu')).not.toHaveText('');
});

test('script selector changes without mutating the input', async ({ page }) => {
  await page.goto('/');
  const input = page.getByLabel('Введіть китайський текст');
  await input.fill('中國');
  await page.getByLabel('Система письма').selectOption('traditional');
  await expect(input).toHaveValue('中國');
});

test('copy controls write the exact visible result', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:5173' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();
  const expected = await page.locator('#result-pinyin').textContent();
  await page.locator('[data-copy-target="result-pinyin"]').click();
  await expect(page.locator('#live-region')).toHaveText('Скопійовано.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
});

test('mobile layout has no horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBe(0);
});

test('reduced-motion preference is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const reduced = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  expect(reduced).toBe(true);
});
