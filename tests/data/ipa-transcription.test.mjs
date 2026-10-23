import test from 'node:test';
import assert from 'node:assert/strict';
import { createIpaTranscriptionMap, ipaTranscriptionMap, lookupIpaTranscription } from '../../src/data/ipa-transcription.js';
import { pinyinToIPA } from '../../src/app/ipa.js';

test('production adapter map is keyed by segmental IPA and retains source provenance', () => {
  const ipa = pinyinToIPA('bei');
  const result = lookupIpaTranscription(ipaTranscriptionMap, 'kirnosova', ipa);
  assert.equal(result.status, 'resolved');
  assert.equal(result.value, 'бей');
  assert.equal(result.pinyinKey, 'bei');
  assert.equal(result.sourceRow, 11);
});

test('blank mappings remain missing in their own system', () => {
  const ipa = pinyinToIPA('pou');
  assert.equal(lookupIpaTranscription(ipaTranscriptionMap, 'nanu', ipa).status, 'missing');
  assert.equal(lookupIpaTranscription(ipaTranscriptionMap, 'kirnosova', ipa).value, 'поу');
});

test('unsupported phonetic tokens stay unresolved instead of falling back to Pinyin', () => {
  assert.equal(lookupIpaTranscription(ipaTranscriptionMap, 'kirnosova', '').status, 'unsupported-ipa');
  assert.equal(lookupIpaTranscription(ipaTranscriptionMap, 'kirnosova', 'not-an-ipa-key').status, 'unresolved');
});

test('future IPA-key collisions fail loudly instead of overwriting a source row', () => {
  const source = { kirnosova: {
    first: { value: 'а', missing: false, sourceRow: 1, sourceKey: 'first' },
    second: { value: 'б', missing: false, sourceRow: 2, sourceKey: 'second' },
  } };
  assert.throws(() => createIpaTranscriptionMap(source, () => 'same-ipa'), /IPA key collision/u);
});
