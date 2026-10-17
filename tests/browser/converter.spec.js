import { test, expect } from '@playwright/test';

test('loads the current interface with exactly one initial state', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('中文 / УКРАЇНСЬКА');
  await expect(page.getByRole('textbox', { name: 'Введіть китайський текст' })).toBeVisible();
  await expect(page.getByText('Тут з’явиться результат')).toBeVisible();
  await expect(page.locator('#empty-state')).toBeVisible();
  await expect(page.locator('#results')).toBeHidden();
  await expect(page.locator('#issue-state')).toBeHidden();
});

test('example produces Pinyin, IPA and all three Ukrainian systems without overlapping states', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#results')).toBeVisible();
  await expect(page.locator('#empty-state')).toBeHidden();
  await expect(page.locator('#issue-state')).toBeHidden();
  for (const id of ['result-pinyin', 'result-ipa', 'result-kirnosova', 'result-kirnosova-tsisar', 'result-nanu']) {
    await expect(page.locator(`#${id}`)).not.toHaveText('');
  }
});

test('script radio group changes mode without mutating source input', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Введіть китайський текст' });
  await input.fill('中國');
  await page.getByText('繁 Трад.', { exact: true }).click();
  await expect(page.locator('#script-traditional')).toBeChecked();
  await expect(input).toHaveValue('中國');
});

test('copy controls write the exact visible result', async ({ page }) => {
  await page.addInitScript(() => {
    window.__copiedText = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text) => { window.__copiedText = text; } },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();
  const expected = await page.locator('#result-pinyin').textContent();
  await page.locator('[data-copy-target="result-pinyin"]').click();
  await expect(page.locator('#live-region')).toHaveText('Скопійовано.');
  await expect.poll(() => page.evaluate(() => window.__copiedText)).toBe(expected);
});

test('clear returns to the empty state and hides issue feedback', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await page.getByRole('button', { name: 'Очистити' }).click();
  await expect(page.locator('#source-input')).toHaveValue('');
  await expect(page.locator('#empty-state')).toBeVisible();
  await expect(page.locator('#results')).toBeHidden();
  await expect(page.locator('#issue-state')).toBeHidden();
});

test('keyboard users can reach the input and open contextual system help', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Введіть китайський текст' });
  await page.keyboard.press('Tab');
  await expect(input).toBeFocused();

  await page.getByRole('button', { name: 'Приклад' }).click();
  const helpButton = page.getByRole('button', { name: 'Довідка: Кірносова 2009' });
  await expect(helpButton).toHaveAttribute('aria-describedby', 'tip-kirnosova');
  await helpButton.focus();
  await expect(page.locator('#tip-kirnosova')).toBeVisible();
});

test('mobile layout has no horizontal overflow at supported narrow widths', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();

  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    const helpButton = page.locator('.info-tip').first();
    await helpButton.focus();
    const tooltip = await page.locator('#tip-kirnosova').boundingBox();
    expect(tooltip, `tooltip should render at ${width}px`).not.toBeNull();
    expect(tooltip.x, `tooltip begins outside viewport at ${width}px: ${JSON.stringify(tooltip)}`).toBeGreaterThanOrEqual(0);
    expect(tooltip.x + tooltip.width, `tooltip ends outside viewport at ${width}px: ${JSON.stringify(tooltip)}`).toBeLessThanOrEqual(width);
    await page.locator('#source-input').focus();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `document overflows at ${width}px: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(width);
    expect(dimensions.body, `body overflows at ${width}px: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(width);
  }
});

test('reduced-motion preference is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const reduced = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  expect(reduced).toBe(true);
});
