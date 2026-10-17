import test from 'node:test';
import assert from 'node:assert/strict';
import { pinyinProEngine, traditionalToSimplified } from '../src/app/pinyin-pro-adapter.js';
import { scanText } from '../src/app/scanner.js';
import { configurePronunciationEngine, resolvePronunciation } from '../src/app/pronunciation.js';
function readPinyin(text, traditional = false) {
  configurePronunciationEngine(pinyinProEngine);
  return resolvePronunciation(scanText(text), text, { traditional }).filter((token) => token.type === 'han').map((token) => token.pinyin);
}
test('tests actual pinned pinyin-pro output for common polyphonic phrase contexts', () => {
  assert.deepEqual(readPinyin('银行'), ['yin2', 'hang2']);
  assert.deepEqual(readPinyin('重庆'), ['chong2', 'qing4']);
  assert.deepEqual(readPinyin('音乐'), ['yin1', 'yue4']);
  assert.deepEqual(readPinyin('长大'), ['zhang3', 'da4']);
});
test('loads the Traditional dictionary and resolves Traditional phrase input', () => {
  assert.ok(Object.keys(traditionalToSimplified).length > 0);
  assert.deepEqual(readPinyin('銀行', true), ['yin2', 'hang2']);
});
