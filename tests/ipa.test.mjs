import test from 'node:test';
import assert from 'node:assert/strict';
import { formatIPA, pinyinToIPA } from '../src/app/ipa.js';
test('retains syllabic apical vowels in retroflex and alveolar sibilant syllables', () => {
  assert.equal(pinyinToIPA('zhi1'), 'ʈʂɻ̩˥');
  assert.equal(pinyinToIPA('chi2'), 'ʈʂʰɻ̩˧˥');
  assert.equal(pinyinToIPA('shi4'), 'ʂɻ̩˥˩');
  assert.equal(pinyinToIPA('ri3'), 'ɻɻ̩˨˩˦');
  assert.equal(pinyinToIPA('zi1'), 'tsɹ̩˥');
  assert.equal(pinyinToIPA('ci2'), 'tsʰɹ̩˧˥');
  assert.equal(pinyinToIPA('si4'), 'sɹ̩˥˩');
});
test('supports tone-marked Pinyin and ü normalization', () => {
  assert.equal(pinyinToIPA('nǚ'), 'ny˨˩˦');
  assert.equal(pinyinToIPA('lü4'), 'ly˥˩');
});
test('marks unsupported edge forms instead of copying Han into the IPA field', () => {
  assert.equal(pinyinToIPA('ê'), '');
  assert.equal(formatIPA([{ type: 'han', source: '欸', pinyin: 'ê' }]), '⟦IPA:ê⟧');
});
test('preserves punctuation and Latin text while spacing IPA syllables', () => {
  assert.equal(formatIPA([{ type: 'han', source: '你', pinyin: 'ni3' }, { type: 'han', source: '好', pinyin: 'hao3' }, { type: 'text', source: '，hello!' }]), 'ni˨˩˦ hau˨˩˦，hello!');
});
