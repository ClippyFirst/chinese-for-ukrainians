import test from 'node:test';
import assert from 'node:assert/strict';
import { pinyinToIPA } from '../src/app/ipa.js';

// These are source-informed regression fixtures for the project's declared
// broad-IPA convention, not a narrow-phonetic gold standard. PolyU documents
// the Pinyin spelling contractions iou→iu, uei→ui, and uen→un; the exact
// phonetic detail (especially the realization of iu across tones) remains
// convention-sensitive and is tracked in the linked audit note.
test('keeps contracted finals and their zero-initial spellings distinct', () => {
  const expected = [
    ['liu1', 'ljoʊ˥'],
    ['you2', 'joʊ˧˥'],
    ['dui1', 'tweɪ˥'],
    ['wei2', 'weɪ˧˥'],
    ['dun1', 'twən˥'],
    ['wen2', 'wən˧˥'],
    ['ong1', 'ʊŋ˥'],
    ['iong1', 'jʊŋ˥'],
    ['yong4', 'jʊŋ˥˩'],
    ['jiong1', 'tɕjʊŋ˥'],
  ];
  for (const [pinyin, ipa] of expected) {
    assert.equal(pinyinToIPA(pinyin), ipa, pinyin);
  }
});

test('keeps tone-marked and numbered spellings equivalent for contracted and nasal finals', () => {
  const pairs = [
    ['liú', 'liu2'],
    ['liǔ', 'liu3'],
    ['duì', 'dui4'],
    ['wěn', 'wen3'],
    ['dūn', 'dun1'],
    ['xiōng', 'xiong1'],
    ['yǒng', 'yong3'],
  ];
  for (const [marked, numbered] of pairs) {
    assert.equal(
      pinyinToIPA(marked),
      pinyinToIPA(numbered),
      `tone-marked and numbered forms differ: ${marked} vs ${numbered}`,
    );
  }
});
