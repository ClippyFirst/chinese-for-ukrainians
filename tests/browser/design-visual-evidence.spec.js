import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

const outputDirectory = 'artifacts/visual-qa';
const viewports = [
  { label: '320', width: 320, height: 844 },
  { label: '360', width: 360, height: 844 },
  { label: '390', width: 390, height: 844 },
  { label: '430', width: 430, height: 932 },
  { label: 'desktop-1280', width: 1280, height: 900 },
];

test('capture reviewable screenshots for the redesign acceptance gate', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Capture one canonical set, not duplicate screenshots per browser project.');
  await mkdir(outputDirectory, { recursive: true });

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Китайський текст', exact: true })).toBeVisible();
    await page.screenshot({
      path: `${outputDirectory}/converter-empty-${viewport.label}.png`,
      fullPage: true,
      animations: 'disabled',
    });

    await page.getByRole('button', { name: 'Приклад' }).click();
    await expect(page.locator('#results')).toBeVisible();
    await page.screenshot({
      path: `${outputDirectory}/converter-results-${viewport.label}.png`,
      fullPage: true,
      animations: 'disabled',
    });

    await page.goto('/methodology.html');
    await expect(page.getByRole('heading', { name: /Різні розв'язки/u })).toBeVisible();
    await page.screenshot({
      path: `${outputDirectory}/methodology-${viewport.label}.png`,
      fullPage: true,
      animations: 'disabled',
    });
  }
});


test('keyboard navigation and focus visibility cover core conversion controls', async ({ page }) => {
  await page.goto('/');
  await page.locator('#source-input').focus();
  await expect(page.locator('#source-input')).toBeFocused();
  await page.keyboard.type('你好');
  await expect(page.locator('#results')).toBeVisible();

  for (const selector of ['#script-auto', '#script-simplified', '#script-traditional', '#show-pinyin-tones', '#show-ukrainian-tones', '#speak-button', '#example-button', '#clear-button']) {
    const control = page.locator(selector);
    await control.focus();
    await expect(control).toBeFocused();
    await expect(control).toHaveCSS('outline-style', 'solid');
  }

  const methodology = page.getByRole('link', { name: /Методики/u });
  await methodology.focus();
  await expect(methodology).toBeFocused();
  await expect(methodology).toHaveCSS('outline-style', 'solid');
});

test('clear, copy affordances, tooltip focus and reduced-motion styles remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#results')).toBeVisible();
  await expect(page.locator('#result-pinyin')).not.toBeEmpty();
  await expect(page.getByRole('button', { name: 'Копіювати' }).first()).toBeVisible();

  const tooltip = page.getByRole('button', { name: /Довідка: Кірносова 2009/u });
  await tooltip.focus();
  await expect(tooltip).toBeFocused();
  await expect(tooltip).toHaveCSS('outline-style', 'solid');

  await page.getByRole('button', { name: 'Очистити' }).click();
  await expect(page.locator('#source-input')).toHaveValue('');
  await expect(page.locator('#empty-state')).toBeVisible();
  await expect(page.locator('#results')).toBeHidden();
});
