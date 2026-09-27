import { test, expect } from '@playwright/test';

test('Pinyin tone control toggles displayed tones without changing Ukrainian outputs', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Введіть китайський текст' });
  const toggle = page.getByRole('checkbox', { name: 'Показувати тони Pinyin' });
  const ukrainianToggle = page.getByRole('checkbox', { name: 'Показувати тони в українській транскрипції' });

  await input.fill('北京');
  await expect(page.locator('#result-pinyin')).toHaveText('Běijīng');
  const kirnosova = await page.locator('#result-kirnosova').textContent();
  const tsisar = await page.locator('#result-kirnosova-tsisar').textContent();
  const nanu = await page.locator('#result-nanu').textContent();

  await toggle.uncheck();
  await expect(page.locator('#result-pinyin')).toHaveText('Beijing');
  await expect(page.locator('#result-kirnosova')).toHaveText(kirnosova ?? '');
  await expect(page.locator('#result-kirnosova-tsisar')).toHaveText(tsisar ?? '');
  await expect(page.locator('#result-nanu')).toHaveText(nanu ?? '');

  await ukrainianToggle.uncheck();
  const plainKirnosova = await page.locator('#result-kirnosova').textContent();
  const plainTsisar = await page.locator('#result-kirnosova-tsisar').textContent();
  const plainNanu = await page.locator('#result-nanu').textContent();
  expect(plainKirnosova).not.toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(plainTsisar).not.toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(plainNanu).not.toMatch(/[\u0300\u0301\u0304\u030c]/u);

  await ukrainianToggle.check();
  await expect(page.locator('#result-kirnosova')).not.toHaveText(plainKirnosova ?? '');
  await expect(page.locator('#result-kirnosova-tsisar')).not.toHaveText(plainTsisar ?? '');
  await expect(page.locator('#result-nanu')).not.toHaveText(plainNanu ?? '');
  expect(await page.locator('#result-kirnosova').textContent()).toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(await page.locator('#result-kirnosova-tsisar').textContent()).toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(await page.locator('#result-nanu').textContent()).toMatch(/[\u0300\u0301\u0304\u030c]/u);
});

test('tone control is available and checked by default', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('checkbox', { name: 'Показувати тони Pinyin' });
  const ukrainianToggle = page.getByRole('checkbox', { name: 'Показувати тони в українській транскрипції' });
  await expect(toggle).toBeChecked();
  await expect(ukrainianToggle).toBeChecked();
});


test('segmented script controls stay synchronized with the converter', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Введіть китайський текст' });
  await input.fill('你好');
  const traditional = page.getByRole('radio', { name: /繁 Tрад\./ });
  const auto = page.getByRole('radio', { name: 'Авто' });
  await expect(auto).toBeChecked();
  await traditional.check();
  await expect(traditional).toBeChecked();
  await expect(page.locator('#script-mode')).toHaveValue('traditional');
});
