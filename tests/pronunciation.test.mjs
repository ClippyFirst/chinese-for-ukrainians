import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePinyinSyllable, formatPinyin } from '../src/app/pinyin.js';
import { configurePronunciationEngine, resolvePronunciation } from '../src/app/pronunciation.js';
configurePronunciationEngine((text) => [...text].map((origin) => ({
  origin, pinyin: ({ 银: 'yín', 行: 'háng' }[origin] ?? 'mā'), isZh: true,
  polyphonic: origin === '行' ? ['háng', 'xíng'] : ['mā'],
})));
test('normalizes tone-marked and tone-number Pinyin into one canonical syllable', () => {
  assert.deepEqual(normalizePinyinSyllable('Běi'), { base: 'bei', tone: 3 });
  assert.deepEqual(normalizePinyinSyllable('bei4'), { base: 'bei', tone: 4 });
  assert.deepEqual(normalizePinyinSyllable('ma'), { base: 'ma', tone: 0 });
});
test('formats canonical tokens with tone marks and preserves non-Chinese text', () => {
  assert.equal(formatPinyin([{ type: 'han', pinyin: 'bei3' }, { type: 'han', pinyin: 'jing1' }]), 'běi jīng');
  assert.equal(formatPinyin([{ type: 'han', pinyin: 'ni3' }, { type: 'han', pinyin: 'hao3' }, { type: 'text', source: '，world' }]), 'nǐ hǎo，world');
});
test('resolves phrase readings but does not overclaim independent validation', () => {
  const result = resolvePronunciation([{ source: '银行', start: 0, end: 2, type: 'han' }], '银行', { traditional: false });
  assert.deepEqual(result.map((token) => token.pinyin), ['yin2', 'hang2']);
  assert.equal(result[1].resolution, 'engine-selected');
  assert.deepEqual(result[1].alternatives, ['háng', 'xíng']);
});
test('marks non-Chinese spans as passthrough', () => {
  const result = resolvePronunciation([{ source: 'A! ', start: 0, end: 3, type: 'text' }], 'A! ');
  assert.deepEqual(result, [{ source: 'A! ', start: 0, end: 3, type: 'text' }]);
});
