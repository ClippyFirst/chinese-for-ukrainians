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
  }

  // Radio groups are one Tab stop; arrow keys change the selected option.
  await page.locator('#script-auto + span').click();
  await page.locator('#script-auto').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#script-simplified')).toBeChecked();

  const methodology = page.getByRole('link', { name: /Методики/u });
  await methodology.focus();
  await expect(methodology).toBeFocused();
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

  await page.getByRole('button', { name: 'Очистити' }).click();
  await expect(page.locator('#source-input')).toHaveValue('');
  await expect(page.locator('#empty-state')).toBeVisible();
  await expect(page.locator('#results')).toBeHidden();
});


test('each copy action writes its own result and announces success', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (value) => { window.__clipboardWrites ??= []; window.__clipboardWrites.push(value); } },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();

  const targets = ['result-pinyin', 'result-ipa', 'result-kirnosova', 'result-kirnosova-tsisar', 'result-nanu'];
  for (let index = 0; index < targets.length; index += 1) {
    const target = page.locator(`#${targets[index]}`);
    const expected = await target.textContent();
    await page.locator(`[data-copy-target="${targets[index]}"]`).click();
    await expect(page.locator('#live-region')).toHaveText('Скопійовано.');
    await expect.poll(() => page.evaluate(() => window.__clipboardWrites?.at(-1))).toBe(expected);
  }
  expect(await page.evaluate(() => window.__clipboardWrites)).toHaveLength(5);
});

test('Pinyin and Ukrainian tone controls change their own output independently', async ({ page }) => {
  await page.goto('/');
  await page.locator('#source-input').fill('你好，中国！');
  const pinyin = page.locator('#result-pinyin');
  const ukrainian = page.locator('#result-kirnosova');
  const pinyinWithTones = await pinyin.textContent();
  const ukrainianWithTones = await ukrainian.textContent();

  await page.locator('#show-pinyin-tones').uncheck();
  const pinyinWithoutTones = await pinyin.textContent();
  expect(pinyinWithoutTones).not.toBe(pinyinWithTones);
  await expect(ukrainian).toHaveText(ukrainianWithTones);

  await page.locator('#show-pinyin-tones').check();
  await page.locator('#show-ukrainian-tones').uncheck();
  const ukrainianWithoutTones = await ukrainian.textContent();
  expect(ukrainianWithoutTones).not.toBe(ukrainianWithTones);
  await expect(pinyin).toHaveText(pinyinWithTones);
});

test('speech control invokes the browser speech API and exposes its active state', async ({ page }) => {
  await page.addInitScript(() => {
    class MockUtterance {
      constructor(text) { this.text = text; }
    }
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: MockUtterance });
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        getVoices: () => [{ lang: 'zh-CN' }],
        cancel: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        speak: (utterance) => {
          window.__spokenText = utterance.text;
          queueMicrotask(() => utterance.onstart?.());
        },
      },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Приклад' }).click();
  await page.locator('#speak-button').click();
  await expect(page.locator('#speak-button')).toHaveText('Зупинити');
  await expect(page.locator('#speak-button')).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => page.evaluate(() => window.__spokenText)).toBe('你好，世界！');
  await page.locator('#speak-button').click();
  await expect(page.locator('#speak-button')).toHaveText('Прослухати');
  await expect(page.locator('#speak-button')).toHaveAttribute('aria-pressed', 'false');
});

test('long mixed-script input remains visible without horizontal overflow or uncaught page errors', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  for (const width of [320, 360, 390, 430, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#source-input').fill(('你好，世界！ Zhōngguó — Україна / IPA: tɕʰ / 𠮷 🙂\n').repeat(8));
    await expect(page.locator('#results')).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `document overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.body, `body overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.locator('#result-pinyin')).toBeVisible();
    await expect(page.locator('#result-ipa')).toBeVisible();
  }
  expect(pageErrors).toEqual([]);
});
