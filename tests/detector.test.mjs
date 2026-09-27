import test from 'node:test';
import assert from 'node:assert/strict';
import { detectScript } from '../src/app/detector.js';
import { scanText } from '../src/app/scanner.js';

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
