import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { pinyin } from 'pinyin-pro';

const cases = JSON.parse(await readFile(new URL('../python/tests/fixtures/cross_runtime_golden.json', import.meta.url), 'utf8'));

test('JavaScript pronunciation engine matches the shared golden fixture', () => {
  for (const item of cases) {
    assert.equal(pinyin(item.text, { toneType: 'symbol', type: 'string' }), item.pinyin, item.text);
  }
});

test('installed Python package matches the exact same golden fixture', () => {
  for (const item of cases) {
    const result = spawnSync('python', ['-m', 'zhua', '--json', item.text], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).pinyin, item.pinyin, item.text);
  }
});
