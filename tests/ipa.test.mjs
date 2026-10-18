import test from 'node:test';
import assert from 'node:assert/strict';
import { formatIPA, pinyinToIPA } from '../src/app/ipa.js';
import { MANDARIN_REFERENCE_SYLLABLES } from './mandarin-syllable-inventory.mjs';
test('retains syllabic apical vowels in retroflex and alveolar sibilant syllables', () => {
  assert.equal(pinyinToIPA('zhi1'), 'ʈʂɻ̩˥');
  assert.equal(pinyinToIPA('chi2'), 'ʈʂʰɻ̩˧˥');
  assert.equal(pinyinToIPA('shi4'), 'ʂɻ̩˥˩');
  assert.equal(pinyinToIPA('ri3'), 'ɻ̩˨˩˦');
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
  assert.equal(formatIPA([{ type: 'han', source: '你', pinyin: 'ni3' }, { type: 'han', source: '好', pinyin: 'hao3' }, { type: 'text', source: '，hello!' }]), 'ni˨˩˦ xaʊ˨˩˦，hello!');
});

test('does not assign a fixed pitch contour to neutral tone', () => {
  assert.equal(pinyinToIPA('ma5'), 'ma');
  assert.equal(pinyinToIPA('ma0'), 'ma');
  assert.equal(pinyinToIPA('ma1'), 'ma˥');
});

test('maps o, uo, and er finals using the documented Mandarin IPA reference', () => {
  assert.equal(pinyinToIPA('bo1'), 'puɔ˥');
  assert.equal(pinyinToIPA('duo2'), 'tuɔ˧˥');
  assert.equal(pinyinToIPA('wo3'), 'uɔ˨˩˦');
  assert.equal(pinyinToIPA('er4'), 'əɹ˥˩');
});

test('maps every syllable in the University of Washington reference inventory', () => {
  assert.equal(MANDARIN_REFERENCE_SYLLABLES.length, 403);
  for (const syllable of MANDARIN_REFERENCE_SYLLABLES) {
    assert.notEqual(pinyinToIPA(syllable), '', `unmapped reference syllable: ${syllable}`);
  }
});

test('keeps the documented IPA glide and vowel notation distinct from UW conventions', () => {
  assert.equal(pinyinToIPA('ai1'), 'aɪ˥');
  assert.equal(pinyinToIPA('ao2'), 'aʊ˧˥');
  assert.equal(pinyinToIPA('ang4'), 'ɑŋ˥˩');
  assert.equal(pinyinToIPA('iong1'), 'jʊŋ˥');
  assert.equal(pinyinToIPA('yue1'), 'ɥe˥');
  assert.equal(pinyinToIPA('ri1'), 'ɻ̩˥');
  assert.equal(pinyinToIPA('ru1'), 'ɻu˥');
});

test('covers contracted and zero-initial Pinyin forms across final classes', () => {
  // Source inventory: University of Washington, Mandarin Chinese Syllables.
  // Expected strings use this project’s documented broad-IPA convention,
  // not literal character-for-character copies of UW's sinological notation.
  assert.equal(pinyinToIPA('yi1'), 'i˥');
  assert.equal(pinyinToIPA('wu1'), 'u˥');
  assert.equal(pinyinToIPA('yu1'), 'y˥');
  assert.equal(pinyinToIPA('you2'), 'joʊ˧˥');
  assert.equal(pinyinToIPA('yuan3'), 'ɥɛn˨˩˦');
  assert.equal(pinyinToIPA('yong4'), 'jʊŋ˥˩');
  assert.equal(pinyinToIPA('jiong1'), 'tɕjʊŋ˥');
  assert.equal(pinyinToIPA('ei1'), 'eɪ˥');
  assert.equal(pinyinToIPA('ou1'), 'oʊ˥');
  assert.equal(pinyinToIPA('dui1'), 'tweɪ˥');
  assert.equal(pinyinToIPA('dun1'), 'twən˥');
  assert.equal(pinyinToIPA('weng1'), 'wəŋ˥');
  assert.equal(pinyinToIPA('ong1'), 'ʊŋ˥');
});
