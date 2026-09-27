import test from 'node:test';
import assert from 'node:assert/strict';
import { generateMappings, lookupTranscription, normalizePinyinKey, validateCsv } from '../../src/data/transcription.js';

const validCsv = '\uFEFF№;Піньїнь;Кірносова;Кірносова—Цісар;НАНУ\n1;bei;бей;бей;бей\n2;er/r;ер/р;ер/р;ер/р\n3;pou;поу;пов;\n';

test('normalizes aliases and tone-number syllables', () => {
  assert.equal(normalizePinyinKey(' BĚI4 '), 'běi');
  assert.equal(normalizePinyinKey('u:an3'), 'üan');
  assert.equal(normalizePinyinKey('v4'), 'ü');
});

test('validates the schema and current duplicate-free key set', () => {
  const report = validateCsv(validCsv);
  assert.equal(report.valid, true);
  assert.equal(report.rows, 3);
  assert.equal(report.aliases, 4);
});

test('rejects a synthetic duplicate normalized alias', () => {
  const report = validateCsv(validCsv.replace('2;er/r;', '2;bei/r;'));
  assert.equal(report.valid, false);
  assert.match(report.errors.join('\n'), /Duplicate normalized Pinyin key 'bei'/);
});

test('preserves blank cells as explicit missing mappings', () => {
  const mappings = generateMappings(validCsv);
  assert.deepEqual(lookupTranscription(mappings, 'kirnosova', 'pou'), {
    status: 'resolved', value: 'поу', key: 'pou', sourceRow: 3, sourceKey: 'pou'
  });
  assert.deepEqual(lookupTranscription(mappings, 'nanu', 'pou'), {
    status: 'missing', value: '', key: 'pou', sourceRow: 3, sourceKey: 'pou'
  });
});

test('resolves slash aliases independently', () => {
  const mappings = generateMappings(validCsv);
  assert.equal(lookupTranscription(mappings, 'kirnosova_tsisar', 'r').value, 'р');
});
