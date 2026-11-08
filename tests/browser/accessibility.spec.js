import { test, expect } from '@playwright/test';

test('core controls, landmarks and dynamic announcements expose accessible names', async ({ page }) => {
  await page.goto('/');
  const audit = await page.evaluate(() => {
    const visible = (el) => !el.closest('[aria-hidden="true"]');
    const named = (el) => Boolean(
      el.getAttribute('aria-label')
      || el.getAttribute('aria-labelledby')?.split(/\\s+/u).every((id) => document.getElementById(id))
      || el.labels?.length
      || el.textContent?.trim()
      || el.getAttribute('title'),
    );
    const controls = [...document.querySelectorAll('button, a[href], textarea, input:not([type="hidden"]), select')]
      .filter(visible)
      .map((el) => ({ tag: el.tagName, id: el.id, text: el.textContent.trim(), named: named(el) }));
    const dangling = [...document.querySelectorAll('[aria-describedby], [aria-labelledby]')]
      .flatMap((el) => ['aria-describedby', 'aria-labelledby'].flatMap((attr) => (
        (el.getAttribute(attr) || '').split(/\\s+/u).filter(Boolean)
          .filter((id) => !document.getElementById(id)).map((id) => ({ attr, id }))
      )));
    return {
      controls,
      dangling,
      mainCount: document.querySelectorAll('main').length,
      navLabel: document.querySelector('nav')?.getAttribute('aria-label'),
      footerLabel: document.querySelector('footer')?.getAttribute('aria-label'),
      liveRegions: [...document.querySelectorAll('[aria-live]')].map((el) => el.getAttribute('aria-live')),
      lang: document.documentElement.lang,
      h1Count: document.querySelectorAll('h1').length,
    };
  });
  expect(audit.controls.filter((x) => !x.named), JSON.stringify(audit.controls)).toEqual([]);
  expect(audit.dangling).toEqual([]);
  expect(audit.mainCount).toBe(1);
  expect(audit.navLabel).toBeTruthy();
  expect(audit.footerLabel).toBeTruthy();
  expect(audit.liveRegions).toContain('polite');
  expect(audit.lang).toBe('uk');
  expect(audit.h1Count).toBe(1);
});

test('keyboard interaction changes script mode and runs the example without a pointer', async ({ page }) => {
  await page.goto('/');
  const traditional = page.getByRole('radio', { name: /Трад/u });
  await traditional.focus();
  await page.keyboard.press('Space');
  await expect(traditional).toBeChecked();
  const example = page.getByRole('button', { name: 'Приклад' });
  await example.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#results')).toBeVisible();
  await expect(page.locator('#source-input')).toHaveValue('你好，世界！');
});

test('large text resize retains access to controls and results without horizontal page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto('/');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await expect(page.getByRole('textbox', { name: 'Введіть китайський текст' })).toBeVisible();
  await page.getByRole('button', { name: 'Приклад' }).click();
  await expect(page.locator('#result-pinyin')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
});
