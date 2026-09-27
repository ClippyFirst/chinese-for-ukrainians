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
  await expect(page.locator('#result-kirnosova')).toHaveText('бей');
  await expect(page.locator('#result-kirnosova-tsisar')).toHaveText('бей');
  await expect(page.locator('#result-nanu')).toHaveText('бей');

  await ukrainianToggle.check();
  await expect(page.locator('#result-kirnosova')).toHaveText('бе̌й');
  await expect(page.locator('#result-kirnosova-tsisar')).toHaveText('бе̌й');
  await expect(page.locator('#result-nanu')).toHaveText('бе̌й');
});

test('tone control is available and checked by default', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('checkbox', { name: 'Показувати тони Pinyin' });
  const ukrainianToggle = page.getByRole('checkbox', { name: 'Показувати тони в українській транскрипції' });
  await expect(toggle).toBeChecked();
  await expect(ukrainianToggle).toBeChecked();
});
