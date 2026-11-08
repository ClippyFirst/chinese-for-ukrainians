import test from 'node:test';
import assert from 'node:assert/strict';
import { detectScript } from '../src/app/detector.js';
import { scanText } from '../src/app/scanner.js';
import { traditionalToSimplified } from '../src/app/pinyin-pro-adapter.js';
import fs from 'node:fs/promises';

const traditionalMap = { 國: '国', 學: '学', 愛: '爱' };

test('detects Simplified Chinese from exclusive simplified characters', () => {
  assert.equal(detectScript('中国', traditionalMap).status, 'simplified');
});

test('detects Traditional Chinese from exclusive traditional characters', () => {
  assert.equal(detectScript('中國', traditionalMap).status, 'traditional');
});

test('detects mixed script without rewriting the source', () => {
  const source = '中国與國';
  const result = detectScript(source, { 國: '国', 與: '与' });
  assert.equal(result.status, 'mixed');
  assert.equal(source, '中国與國');
});

test('returns undetermined for shared-only Han text and for non-Chinese text', () => {
  assert.equal(detectScript('中文', traditionalMap).status, 'undetermined');
  assert.equal(detectScript('Hello, 123!', traditionalMap).status, 'undetermined');
});

test('scans Han text without splitting surrogate-pair characters', () => {
  const spans = scanText('汉𠀀!');
  assert.deepEqual(
    spans.map(({ source, type }) => [source, type]),
    [['汉𠀀', 'han'], ['!', 'text']],
  );
});


test('shared generated script fixture classifies real package dictionary entries', async () => {
  const cases=JSON.parse(await fs.readFile(new URL('./fixtures/script_detection.json',import.meta.url),'utf8'));
  for (const item of cases) assert.equal(detectScript(item.text,traditionalToSimplified).status,item.status,item.text);
});

test('real dictionary distinguishes common traditional, simplified, mixed and shared text', () => {
  assert.equal(detectScript('中國',traditionalToSimplified).status,'traditional');
  assert.equal(detectScript('中国',traditionalToSimplified).status,'simplified');
  assert.equal(detectScript('中国與國',traditionalToSimplified).status,'mixed');
  assert.equal(detectScript('中文',traditionalToSimplified).status,'undetermined');
});


test('generated Python script map stays byte-for-byte aligned with the pinned npm data package', async () => {
  const generated=JSON.parse(await fs.readFile(new URL('../python/src/zhua/data/traditional-to-simplified.json',import.meta.url),'utf8'));
  assert.deepEqual(generated,traditionalToSimplified);
});
