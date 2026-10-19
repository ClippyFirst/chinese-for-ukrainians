import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MANDARIN_REFERENCE_SYLLABLES } from './mandarin-syllable-inventory.mjs';

// Raw source snapshot of the University of Washington Mandarin syllable chart:
// https://courses.washington.edu/chin342/ipa/syllables.html
// Accessed 2026-10-18. These are UW's own broad/dialectological symbols, not
// normalized ordinary-IPA gold outputs for the converter. This test checks
// provenance and key coverage only; it intentionally does not assert that
// current converter strings equal the source strings.

const source = readFileSync(new URL('./fixtures/uw-mandarin-syllables-ipa-reference.csv', import.meta.url), 'utf8')
  .trim()
  .split(/\r?\n/u);
const [header, ...rows] = source;
const parsed = rows.map((row, index) => {
  const fields = row.split(';');
  assert.equal(fields.length, 3, `source row ${index + 2} must have three fields`);
  const [pinyin, uwIPA, sourceKind] = fields;
  assert.ok(pinyin, `missing Pinyin key at row ${index + 2}`);
  assert.ok(uwIPA, `missing raw UW IPA at row ${index + 2}`);
  assert.ok(sourceKind, `missing provenance kind at row ${index + 2}`);
  return { pinyin, uwIPA, sourceKind };
});

test('retains a source-backed raw UW IPA record for every reference syllable', () => {
  assert.equal(header, 'pinyin;uw_ipa;source_kind');
  assert.equal(parsed.length, 403);
  assert.equal(new Set(parsed.map((row) => row.pinyin)).size, parsed.length);
  assert.deepEqual(
    [...parsed.map((row) => row.pinyin)].sort(),
    [...MANDARIN_REFERENCE_SYLLABLES].sort(),
    'raw source fixture keys must match the 403-syllable coverage inventory exactly',
  );
  assert.ok(parsed.every((row) => row.sourceKind === 'syllable-chart-cell' || row.sourceKind.startsWith('zero-initial-alias:')));
});

test('preserves representative raw source forms without silently normalizing notation', () => {
  const byKey = new Map(parsed.map((row) => [row.pinyin, row]));
  assert.equal(byKey.get('bo').uwIPA, 'puɔ');
  assert.equal(byKey.get('wo').uwIPA, 'uɔ');
  assert.equal(byKey.get('jue').uwIPA, 'tɕyɛ');
  assert.equal(byKey.get('yue').uwIPA, 'yɛ');
  assert.equal(byKey.get('yong').uwIPA, 'yuŋ');
  assert.equal(byKey.get('dong').uwIPA, 'tuŋ');
  assert.equal(byKey.get('weng').uwIPA, 'uəŋ');
});
