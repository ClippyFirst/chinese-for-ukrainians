import test from 'node:test';
import assert from 'node:assert/strict';
import { buildResultLabels, exampleText } from '../src/app/ui.js';

test('builds result labels from one conversion result without ranking systems', () => {
  const labels = buildResultLabels({
    pinyin: 'nǐ hǎo',
    kirnosova: 'ні хао',
    kirnosovaTsisar: 'ні хао',
    nanu: 'ні хао',
  });
  assert.deepEqual(labels, [
    ['Pinyin', 'nǐ hǎo'],
    ['Кірносова', 'ні хао'],
    ['Кірносова—Цісар', 'ні хао'],
    ['НАНУ', 'ні хао'],
  ]);
});

test('keeps the example as a fixed source string', () => {
  assert.equal(exampleText, '你好，世界！');
});
