import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

test('methodology page is a static, linked, source-aware page', async () => {
  const html = await fs.readFile(path.join(root, 'methodology.html'), 'utf8');
  assert.match(html, /<html lang="uk">/u);
  assert.match(html, /href="\.\/index\.html"/u);
  assert.match(html, /Кірносова—Цісар/u);
  assert.match(html, /АСТКС/u);
  assert.match(html, /zh-in-ua\.csv/u);
  assert.match(html, /pinyin\.in\.ua/u);
  assert.match(html, /не оцінює системи/u);
  assert.match(html, /Як передають китайські склади українською мовою/u);
  assert.match(html, /Один склад у піньїнь/u);
  assert.match(html, /Як аналізувати розбіжності/u);
  assert.match(html, /Content-Security-Policy/u);
});

test('homepage links to methodology and Vite builds both pages', async () => {
  const index = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const vite = await fs.readFile(path.join(root, 'vite.config.js'), 'utf8');
  const releaseCheck = await fs.readFile(path.join(root, 'scripts/release-check.mjs'), 'utf8');
  assert.match(index, /methodology\.html/u);
  assert.match(index, /Китайський текст — <em>українська передача вимови\.<\/em>/u);
  assert.match(index, /Тут з’являться результати/u);
  assert.match(index, /Усі права захищено/u);
  assert.match(vite, /methodology\.html/u);
  assert.match(vite, /index\.html/u);
  assert.match(releaseCheck, /methodology\.html/u);
  assert.match(releaseCheck, /sourceFiles\.push\(index, methodology\)/u);
});

test('methodology examples match the canonical CSV columns', async () => {
  const html = await fs.readFile(path.join(root, 'methodology.html'), 'utf8');
  const csv = await fs.readFile(path.join(root, 'zh-in-ua.csv'), 'utf8');
  for (const row of [
    ['chong', 'чун', 'чон', 'чун'],
    ['chuo', 'чуо', 'чво', 'чо'],
    ['ji', 'цзі', 'дзі', 'цзі'],
    ['jia', 'цзя', 'дзя', 'цзя'],
    ['jie', 'цзє', 'дзє', 'цзє'],
    ['ou', 'оу', 'ов', 'оу'],
    ['chou', 'чоу', 'чов', 'чоу'],
    ['dou', 'доу', 'дов', 'доу'],
    ['duo', 'дуо', 'дво', 'до'],
    ['shuo', 'шуо', 'шво', 'шо'],
    ['bie', "б'є", "б'є", 'бє'],
    ['mie', "м'є", "м'є", 'мє'],
    ['pie', "п'є", "п'є", 'пє'],
  ]) {
    const [pinyin, kirnosova, tsisar, nanu] = row;
    assert.ok(csv.includes(`${pinyin};${kirnosova};${tsisar};${nanu}`), `CSV row missing for ${pinyin}`);
    assert.ok(html.includes(pinyin), `HTML example missing for ${pinyin}`);
    assert.ok(html.includes(kirnosova), `Kirnosova output missing for ${pinyin}`);
    assert.ok(html.includes(tsisar), `Kirnosova–Tsisar output missing for ${pinyin}`);
    assert.ok(html.includes(nanu), `NANU output missing for ${pinyin}`);
  }
});
