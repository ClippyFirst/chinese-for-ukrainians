import test from 'node:test';
import assert from 'node:assert/strict';
import { pinyinToIPA } from '../src/app/ipa.js';

// Hand-adjudicated cross-class fixtures. The references below support the
// broad phonetic analyses and the spelling/final classes, but do not imply
// that every speaker realizes every item identically. Expected strings follow
// the project's declared ordinary-IPA convention documented in
// docs/IPA-CONVENTION-DECISION-2026-10-18.md.
const cases = [
  // Rounded-palatal and front-rounded finals after palatal initials.
  ['jue1', 'tɕɥɛ˥'],
  ['que2', 'tɕʰɥɛ˧˥'],
  ['xue4', 'ɕɥɛ˥˩'],
  ['juan1', 'tɕɥɛn˥'],
  ['quan2', 'tɕʰɥɛn˧˥'],
  ['xun4', 'ɕyn˥˩'],
  ['jun1', 'tɕyn˥'],
  // Iong/ong family, including all three spellings/classes used by the app.
  ['jiong1', 'tɕjʊŋ˥'],
  ['qiong2', 'tɕʰjʊŋ˧˥'],
  ['xiong4', 'ɕjʊŋ˥˩'],
  ['yong2', 'jʊŋ˧˥'],
  ['chong1', 'ʈʂʰʊŋ˥'],
  ['song4', 'sʊŋ˥˩'],
  ['hong2', 'xʊŋ˧˥'],
  ['weng1', 'wəŋ˥'],
  // Contracted iu/ui/un compared across several onset classes.
  ['liu2', 'ljoʊ˧˥'],
  ['qiu1', 'tɕʰjoʊ˥'],
  ['jiu4', 'tɕjoʊ˥˩'],
  ['gui1', 'kweɪ˥'],
  ['zui4', 'tsweɪ˥˩'],
  ['shui3', 'ʂweɪ˨˩˦'],
  ['lun2', 'lwən˧˥'],
  ['dun1', 'twən˥'],
  ['jun4', 'tɕyn˥˩'],
  // Nasal finals and palatal/retroflex contrasts.
  ['ran2', 'ɹan˧˥'],
  ['ren4', 'ɹən˥˩'],
  ['rang1', 'ɹɑŋ˥'],
  ['zheng1', 'ʈʂəŋ˥'],
  ['zeng4', 'tsəŋ˥˩'],
  ['zhuang1', 'ʈʂwɑŋ˥'],
  ['chuang2', 'ʈʂʰwɑŋ˧˥'],
  ['shuang4', 'ʂwɑŋ˥˩'],
  // Diphthongs across labial, palatal, alveolar and retroflex onset families.
  // The [ɑ]-type nucleus in ao/iao follows OSU and Liu (2026); the acoustic study is single-speaker evidence.
  ['bao3', 'pɑʊ˨˩˦'],
  ['pao2', 'pʰɑʊ˧˥'],
  ['mao1', 'mɑʊ˥'],
  ['jiao1', 'tɕjɑʊ˥'],
  ['qiao2', 'tɕʰjɑʊ˧˥'],
  ['xiao4', 'ɕjɑʊ˥˩'],
  ['zhao1', 'ʈʂɑʊ˥'],
  ['chao2', 'ʈʂʰɑʊ˧˥'],
  ['shao4', 'ʂɑʊ˥˩'],
  ['rao3', 'ɹɑʊ˨˩˦'],
  // Pinyin o/uō spellings with contextual behavior.
  ['bo1', 'puɔ˥'],
  ['fo2', 'fuɔ˧˥'],
  ['huo3', 'xuɔ˨˩˦'],
  ['shuo4', 'ʂuɔ˥˩'],
];

test('cross-checks high-risk legal initial–final combinations against the declared broad-IPA convention', () => {
  for (const [pinyin, expected] of cases) {
    assert.equal(pinyinToIPA(pinyin), expected, pinyin);
  }
});
