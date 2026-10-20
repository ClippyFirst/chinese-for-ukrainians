import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { pinyin } from 'pinyin-pro';
import { normalizePinyinSyllable } from '../src/app/pinyin.js';

// Independent lexical reference cases are sourced from Han Dian (zdic.net),
// not from zh-in-ua.csv or from the expected-output fixtures used by the app.
const fixtureUrl = new URL('./fixtures/independent-pinyin-cases.csv', import.meta.url);
const rows = (await fs.readFile(fixtureUrl, 'utf8')).trim().split(/\r?\n/u).slice(1)
  .map((line) => {
    const [id, han, expected, traditional, sourceUrl, scope] = line.split(';');
    return { id, han, expected: expected.split(' '), traditional: traditional === 'true', sourceUrl, scope };
  });

function actualPinyin(text, traditional) {
  return pinyin(text, {
    type: 'all',
    toneType: 'symbol',
    traditional,
    segmentit: 2,
  }).map((item) => {
    const normalized = normalizePinyinSyllable(item.pinyin ?? item.result ?? '');
    return normalized.base + (normalized.tone || '');
  });
}

test('independent lexical Pinyin corpus matches the pinned engine on sourced phrase readings', () => {
  assert.equal(rows.length, 6, 'expand the independent corpus deliberately, not silently');
  for (const row of rows) {
    assert.match(row.sourceUrl, /^https:\/\/zdic\.net\//u, row.id + ': missing independent source URL');
    assert.ok(row.scope.length > 0, row.id + ': missing scope note');
    assert.deepEqual(
      actualPinyin(row.han, row.traditional),
      row.expected,
      row.id + ' (' + row.han + ') disagrees with sourced expected Pinyin: ' + row.sourceUrl,
    );
  }
});

test('unsegmented polyphonic character is treated as a context-sensitive limitation, not a universal gold reading', () => {
  const readings = pinyin('长', { type: 'all', toneType: 'symbol', segmentit: 2 });
  assert.equal(readings.length, 1);
  assert.ok(readings[0].pinyin, 'the engine should expose its selected reading');
  // Han Dian records both zhǎng and cháng; this test deliberately does not assert
  // that the engine-selected isolated-character reading is the only valid reading.
});
