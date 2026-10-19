import test from 'node:test';
import assert from 'node:assert/strict';
import { pinyinToIPA } from '../src/app/ipa.js';

// Regression coverage for each Pinyin onset family in the project's declared
// broad-IPA convention. The 2017 Ohio University dissertation appendix lists
// conventional phonological targets for these initials (adapted there from
// Zhao & Li 2009 and Xinhua Zidian 2011); it is a comparison reference,
// not an acoustic gold standard.
test('covers all Mandarin Pinyin onset classes in the broad-IPA converter', () => {
  const cases = [
    ['ba1', 'pa˥'], ['pa1', 'pʰa˥'], ['ma1', 'ma˥'], ['fa1', 'fa˥'],
    ['da1', 'ta˥'], ['ta1', 'tʰa˥'], ['na1', 'na˥'], ['la1', 'la˥'],
    ['ga1', 'ka˥'], ['ka1', 'kʰa˥'], ['ha1', 'xa˥'],
    ['jia1', 'tɕja˥'], ['qia1', 'tɕʰja˥'], ['xia1', 'ɕja˥'],
    ['zha1', 'ʈʂa˥'], ['cha1', 'ʈʂʰa˥'], ['sha1', 'ʂa˥'],
    ['ra1', 'ɹa˥'], ['za1', 'tsa˥'], ['ca1', 'tsʰa˥'], ['sa1', 'sa˥'],
    // Pinyin y/w are handled as zero-onset glide spellings in this converter.
    ['ya1', 'ja˥'], ['wa1', 'wa˥'],
  ];
  for (const [pinyin, expected] of cases) {
    assert.equal(pinyinToIPA(pinyin), expected, pinyin);
  }
});
