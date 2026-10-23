import { test, expect } from '@playwright/test';

test.describe('methodology comparison-table access', () => {
  test('narrow viewports expose a visible scroll cue and keyboard-focusable table region', async ({ page }) => {
    await page.goto('/methodology.html');

    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 900 });
      const first = page.locator('.table-scroll').first();
      await expect(first).toBeVisible();

      const measurements = await first.evaluate((element) => {
        const table = element.querySelector('table');
        const style = getComputedStyle(element);
        const cue = getComputedStyle(element, '::after');
        return {
          regionWidth: element.getBoundingClientRect().width,
          tableWidth: table.getBoundingClientRect().width,
          overflowX: style.overflowX,
          tabIndex: element.getAttribute('tabindex'),
          cueContent: cue.content,
          cueDisplay: cue.display,
        };
      });

      expect(measurements.regionWidth, `table region should fit at ${width}px`).toBeLessThanOrEqual(width);
      expect(measurements.tabIndex).toBe('0');
      expect(['auto', 'scroll']).toContain(measurements.overflowX);
      expect(measurements.tableWidth, 'wide table must remain wider than its scroll viewport').toBeGreaterThan(measurements.regionWidth);
      expect(measurements.cueContent).toContain('Горизонтально прокрутіть таблицю');
      expect(measurements.cueDisplay).not.toBe('none');

      await first.focus();
      await expect(first).toBeFocused();
      const focusOutline = await first.evaluate((element) => getComputedStyle(element).outlineStyle);
      expect(focusOutline).not.toBe('none');
    }
  });

  test('keyboard scrolling can reveal the far-right comparison column', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/methodology.html');

    const region = page.getByRole('region', { name: 'Порівняльна таблиця систем транскрипції' });
    await region.focus();
    const before = await region.evaluate((element) => element.scrollLeft);
    for (let index = 0; index < 24; index += 1) {
      await page.keyboard.press('ArrowRight');
    }
    const after = await region.evaluate((element) => element.scrollLeft);
    const farRightColumn = await region.locator('thead th').last().evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    });

    expect(after).toBeGreaterThan(before);
    expect(farRightColumn.right).toBeLessThanOrEqual(320);
  });
});
