import { test, expect } from '@playwright/test';

test('Pinyin tone control toggles displayed tones without changing Ukrainian outputs', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Введіть китайський текст' });
  const toggle = page.getByRole('checkbox', { name: 'Тони Pinyin' });
  const ukrainianToggle = page.getByRole('checkbox', { name: 'Тони в українському записі' });

  await input.fill('北京');
  await expect(page.locator('#result-pinyin')).toHaveText('běi jīng');
  const kirnosova = await page.locator('#result-kirnosova').textContent();
  const tsisar = await page.locator('#result-kirnosova-tsisar').textContent();
  const nanu = await page.locator('#result-nanu').textContent();

  await page.getByText('Тони Pinyin', { exact: true }).click();
  await expect(toggle).not.toBeChecked();
  await expect(page.locator('#result-pinyin')).toHaveText('bei jing');
  await expect(page.locator('#result-kirnosova')).toHaveText(kirnosova ?? '');
  await expect(page.locator('#result-kirnosova-tsisar')).toHaveText(tsisar ?? '');
  await expect(page.locator('#result-nanu')).toHaveText(nanu ?? '');

  await page.getByText('Тони в українському записі', { exact: true }).click();
  await expect(ukrainianToggle).not.toBeChecked();
  const plainKirnosova = await page.locator('#result-kirnosova').textContent();
  const plainTsisar = await page.locator('#result-kirnosova-tsisar').textContent();
  const plainNanu = await page.locator('#result-nanu').textContent();
  expect(plainKirnosova).not.toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(plainTsisar).not.toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(plainNanu).not.toMatch(/[\u0300\u0301\u0304\u030c]/u);

  await page.getByText('Тони в українському записі', { exact: true }).click();
  await expect(ukrainianToggle).toBeChecked();
  await expect(page.locator('#result-kirnosova')).not.toHaveText(plainKirnosova ?? '');
  await expect(page.locator('#result-kirnosova-tsisar')).not.toHaveText(plainTsisar ?? '');
  await expect(page.locator('#result-nanu')).not.toHaveText(plainNanu ?? '');
  expect(await page.locator('#result-kirnosova').textContent()).toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(await page.locator('#result-kirnosova-tsisar').textContent()).toMatch(/[\u0300\u0301\u0304\u030c]/u);
  expect(await page.locator('#result-nanu').textContent()).toMatch(/[\u0300\u0301\u0304\u030c]/u);
});

test('tone control is available and checked by default', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('checkbox', { name: 'Тони Pinyin' });
  const ukrainianToggle = page.getByRole('checkbox', { name: 'Тони в українському записі' });
  await expect(toggle).toBeChecked();
  await expect(ukrainianToggle).toBeChecked();
});


test('segmented script controls stay synchronized with the converter', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Введіть китайський текст' });
  await input.fill('你好');
  const traditional = page.getByRole('radio', { name: /繁 Трад./u });
  const auto = page.getByRole('radio', { name: 'Авто' });
  await expect(auto).toBeChecked();
  await page.getByText('繁 Трад.', { exact: true }).click();
  await expect(traditional).toBeChecked();
  await expect(page.locator('#script-mode')).toHaveValue('traditional');
});
