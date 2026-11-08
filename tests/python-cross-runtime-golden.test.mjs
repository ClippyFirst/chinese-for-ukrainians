import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pinyin } from 'pinyin-pro';

// The Python pytest suite reads this exact fixture too: both runtimes are checked
// independently against the same reviewed expected output, not against each other.
const cases = JSON.parse(await readFile(new URL('../python/tests/fixtures/cross_runtime_golden.json', import.meta.url), 'utf8'));

test('pinyin-pro matches the shared cross-runtime golden fixture', () => {
  for (const item of cases) {
    assert.equal(pinyin(item.text, { toneType: 'symbol', type: 'string' }), item.pinyin, item.text);
  }
});
