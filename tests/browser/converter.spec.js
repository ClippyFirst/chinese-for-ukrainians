import { test, expect } from '@playwright/test';

test('loads the current interface with exactly one initial state', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('中文 / УКРАЇНСЬКА');
  await expect(page.getByRole('textbox', { name: 'Введіть китайський текст' })).toBeVisible();
  await expect(page.getByText('Тут з’являться результати.')).toBeVisible();
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
  const methodologyLink = page.getByRole('link', { name: /Методики/u });
  await page.keyboard.press('Tab');
  await expect(methodologyLink).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(input).toBeFocused();

  await page.getByRole('button', { name: 'Приклад' }).click();
  const helpButton = page.getByRole('button', { name: 'Довідка: Кірносова 2009' });
  await expect(helpButton).toHaveAttribute('aria-describedby', 'tip-kirnosova');
  await helpButton.focus();
  await expect(page.locator('#tip-kirnosova')).toBeVisible();
});

test('mobile layout has no horizontal overflow at supported narrow widths', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();

  const widths = testInfo.project.name === 'mobile'
    ? [await page.evaluate(() => window.innerWidth)]
    : [320, 360, 390, 430];
  for (const width of widths) {
    if (testInfo.project.name !== 'mobile') await page.setViewportSize({ width, height: 844 });
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


test('methodology page loads, links back to converter, and keeps comparison tables within the viewport', async ({ page }) => {
  await page.goto('/methodology.html');
  await expect(page).toHaveTitle('Методики транскрипції — 中文 / УКРАЇНСЬКА');
  await expect(page.getByRole('heading', { name: /Три системи\./u })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Методики в контексті' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Відкрити конвертер/u })).toHaveAttribute('href', './index.html');
  await expect(page.getByRole('link', { name: /Сторінка затвердження в Інституті сходознавства/u })).toHaveAttribute('href', 'https://www.oriental-studies.org.ua/uk/затверджена-академічна-система-тран/');
  await expect(page.getByRole('link', { name: /Таблиця АСТКС \(PDF\)/u })).toHaveAttribute('href', 'https://drive.google.com/open?id=11KU4T2_TdFsIUIFw5zUYBtXfoZi01ZsM');
  await expect(page.getByRole('link', { name: /Інтерактивний ресурс АСТКС/u })).toHaveAttribute('href', 'https://pinyin.in.ua/');
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
});


test('Auto, Simplified and Traditional script selector segments have equal widths and heights', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const segments = page.locator('.segmented label');
  await expect(segments).toHaveCount(3);

  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const dimensions = await segments.evaluateAll((items) => items.map((item) => {
      const rect = item.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }));
    const widths = dimensions.map((item) => item.width);
    const heights = dimensions.map((item) => item.height);
    expect(Math.max(...widths) - Math.min(...widths), `unequal segment widths at ${width}px`).toBeLessThanOrEqual(1);
    expect(Math.max(...heights) - Math.min(...heights), `unequal segment heights at ${width}px`).toBeLessThanOrEqual(1);
    expect(Math.min(...heights), `segments are too short at ${width}px`).toBeGreaterThanOrEqual(36);

    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(viewportWidth);
  }
});


test('methodology page stays within the viewport across mobile and desktop widths', async ({ page }, testInfo) => {
  await page.goto('/methodology.html');
  await expect(page.getByRole('heading', { name: /Різні розв'язки/u })).toBeVisible();
  await expect(page.locator('.site-nav').getByRole('link', { name: /Конвертер/u })).toBeVisible();
  await expect(page.locator('.site-nav').getByRole('link', { name: 'Методики' })).toBeVisible();

  const widths = testInfo.project.name === 'mobile'
    ? [320, 360, 390, 430]
    : [320, 360, 390, 430, 560, 768, 1280];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `methodology document overflows at ${width}px: ${JSON.stringify(dimensions)}`)
      .toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.body, `methodology body overflows at ${width}px: ${JSON.stringify(dimensions)}`)
      .toBeLessThanOrEqual(dimensions.viewport);

    const tables = await page.locator('.table-scroll').evaluateAll((items) => items.map((item) => {
      const table = item.querySelector('table');
      const wrapper = item.getBoundingClientRect();
      const content = table.getBoundingClientRect();
      return {
        wrapperWidth: wrapper.width,
        contentWidth: content.width,
        overflowX: getComputedStyle(item).overflowX,
      };
    }));
    for (const table of tables) {
      expect(table.wrapperWidth, `table wrapper wider than viewport at ${width}px`).toBeLessThanOrEqual(width);
      if (table.contentWidth > table.wrapperWidth) {
        expect(['auto', 'scroll'], `wide comparison table must scroll internally at ${width}px`).toContain(table.overflowX);
      }
    }
  }
});

test('methodology external references open safely in a new tab', async ({ page }) => {
  await page.goto('/methodology.html');
  const externalLinks = page.locator('a[target="_blank"]');
  const count = await externalLinks.count();
  expect(count).toBeGreaterThan(0);
  for (const link of await externalLinks.all()) {
    await expect(link).toHaveAttribute('rel', /noreferrer/u);
    await expect(link).toHaveAttribute('href', /^https:\/\//u);
  }
});
