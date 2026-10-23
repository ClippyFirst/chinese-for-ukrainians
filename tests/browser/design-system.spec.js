import { test, expect } from '@playwright/test';

function parseHex(value) {
  const hex = value.trim().replace(/^#/, '');
  const expanded = hex.length === 3 ? [...hex].map((part) => part + part).join('') : hex;
  if (!/^[0-9a-f]{6}$/iu.test(expanded)) throw new Error(`Expected a hex color, received ${value}`);
  return [0, 2, 4].map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16) / 255);
}

function luminance(hex) {
  const channels = parseHex(hex).map((channel) => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('redesign color tokens preserve WCAG AA contrast for core text and action pairs', async ({ page }) => {
  await page.goto('/');
  const tokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      ['--ink', '--muted', '--paper', '--accent', '--warning', '--warning-soft']
        .map((name) => [name, styles.getPropertyValue(name).trim()]),
    );
  });

  const pairs = [
    ['primary text on page', tokens['--ink'], tokens['--paper']],
    ['secondary text on page', tokens['--muted'], tokens['--paper']],
    ['accent label on page', tokens['--accent'], tokens['--paper']],
    ['white text on accent action', '#ffffff', tokens['--accent']],
    ['warning text on warning surface', tokens['--warning'], tokens['--warning-soft']],
  ];

  for (const [label, foreground, background] of pairs) {
    const ratio = contrastRatio(foreground, background);
    expect(ratio, `${label} contrast ratio was ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
  }

  const primaryButton = page.getByRole('button', { name: 'Приклад' });
  await expect(primaryButton).toHaveCSS('background-color', 'rgb(23, 63, 138)');
  await expect(primaryButton).toHaveCSS('color', 'rgb(255, 255, 255)');
});

test('three Ukrainian result systems remain equally weighted at desktop and supported mobile widths', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();

  const cards = page.locator('.ukrainian-grid > .result-card');
  await expect(cards).toHaveCount(3);
  const desktopBoxes = await cards.evaluateAll((items) => items.map((item) => {
    const rect = item.getBoundingClientRect();
    return { y: rect.y, width: rect.width };
  }));
  const desktopWidths = desktopBoxes.map((box) => box.width);
  expect(Math.max(...desktopWidths) - Math.min(...desktopWidths)).toBeLessThanOrEqual(1);
  expect(Math.max(...desktopBoxes.map((box) => box.y)) - Math.min(...desktopBoxes.map((box) => box.y))).toBeLessThanOrEqual(1);

  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    const boxes = await cards.evaluateAll((items) => items.map((item) => {
      const rect = item.getBoundingClientRect();
      return { y: rect.y, width: rect.width };
    }));
    expect(boxes[1].y, `second result should stack at ${width}px`).toBeGreaterThan(boxes[0].y);
    expect(boxes[2].y, `third result should stack at ${width}px`).toBeGreaterThan(boxes[1].y);
    expect(Math.max(...boxes.map((box) => box.width)) - Math.min(...boxes.map((box) => box.width)))
      .toBeLessThanOrEqual(1);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `document overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.body, `body overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('shared redesign tokens load on the methodology page without changing its content contract', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/methodology.html');
  await expect(page.getByRole('heading', { name: /Різні розв'язки/u })).toBeVisible();

  const styles = await page.evaluate(() => ({
    accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
    paper: getComputedStyle(document.documentElement).getPropertyValue('--paper').trim(),
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(styles.accent).toBe('#173f8a');
  expect(styles.paper).toBe('#f3f2ee');
  expect(styles.document).toBeLessThanOrEqual(styles.viewport);
});
