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
