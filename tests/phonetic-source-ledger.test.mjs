import fs from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const ledgerUrl = new URL('../docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv', import.meta.url);
const HEADER = [
  'type',
  'key_or_scope',
  'system_or_layer',
  'source_url',
  'evidence_location',
  'finding',
  'status',
  'required_action',
  'notes',
];

function parseSemicolonCsvLine(line) {
  const fields = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted) {
      if (char === '"' && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"' && field.length === 0) {
      quoted = true;
    } else if (char === ';') {
      fields.push(field);
      field = '';
    } else {
      field += char;
    }
  }
  assert.equal(quoted, false, 'unterminated quoted field');
  fields.push(field);
  return fields;
}

test('phonetic source ledger is a well-formed nine-column semicolon CSV', async () => {
  const content = (await fs.readFile(ledgerUrl, 'utf8')).replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
  const lines = content.split('\n').filter((line) => line.length > 0);
  assert.ok(lines.length > 1, 'source ledger should contain a header and evidence rows');
  assert.deepEqual(parseSemicolonCsvLine(lines[0]), HEADER);
  for (const [index, line] of lines.slice(1).entries()) {
    const fields = parseSemicolonCsvLine(line);
    assert.equal(fields.length, HEADER.length, `ledger row ${index + 2} should have exactly ${HEADER.length} fields`);
    assert.ok(fields[0], `ledger row ${index + 2} should have a finding type`);
    assert.ok(fields[5], `ledger row ${index + 2} should describe evidence or a finding`);
    assert.ok(fields[6], `ledger row ${index + 2} should have a status`);
  }
});

test('NANU blanks are explicitly classified as source-absent keys', async () => {
  const content = (await fs.readFile(ledgerUrl, 'utf8')).replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
  const rows = content.split('\n').filter((line) => line.length > 0).slice(1).map(parseSemicolonCsvLine);
  const sourceAbsent = new Set(rows
    .filter((fields) => fields[2] === 'NANU' && fields[6] === 'source-absent')
    .map((fields) => fields[1]));
  for (const key of ['ê', 'fiao', 'hm', 'hng', 'kei', 'm', 'n', 'ng', 'rua', 'yo']) {
    assert.ok(sourceAbsent.has(key), `NANU key ${key} should be classified as absent from the official source inventory`);
  }
});

test('source ledger records the direct multi-speaker rhotic study and current evidence-row count', async () => {
  const content = (await fs.readFile(ledgerUrl, 'utf8')).replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
  const lines = content.split('\n').filter((line) => line.length > 0);
  const rows = lines.slice(1).map(parseSemicolonCsvLine);
  assert.equal(rows.length, 85, 'expected 85 evidence rows in the current ledger snapshot');
  const erEvidence = rows.find((fields) => fields[1] === 'standalone er / syllabic rhotic');
  assert.ok(erEvidence, 'the direct rhotic study should be represented in the ledger');
  assert.match(erEvidence[3], /10\.1515\/phon-2023-0023/u);
  const munichEvidence = rows.find((fields) => fields[1] === 'standalone er / rhotic nucleus / erhua');
  assert.ok(munichEvidence, 'the university phonetics resource should be represented in the ledger');
  assert.ok(munichEvidence[3].includes('phonetik.uni-muenchen.de'));
  assert.equal(munichEvidence[6], 'corroborative-not-decisive');
  const onsetREvidence = rows.find((fields) => fields[1] === 'onset r / prevocalic Mandarin rhotic');
  assert.ok(onsetREvidence, 'the independent onset-r articulatory study should be represented in the ledger');
  assert.ok(onsetREvidence[3].includes('10.1177/00238309251350082'));
  assert.equal(onsetREvidence[6], 'corroborative-with-variation');
  const auspeech = rows.find((fields) => fields[1] === 'candidate multi-speaker acoustic corpus / Standard Mandarin monosyllables');
  assert.ok(auspeech, 'AUSpeech should be recorded as a candidate corpus');
  assert.equal(auspeech[6], 'candidate-corpus-not-yet-audited');
  assert.ok(auspeech[3].includes('10.1038/s41597-025-04917-w'));
  const taiwan = rows.find((fields) => fields[1] === 'comparative syllable acoustics / Taiwanese Mandarin');
  assert.ok(taiwan, 'the Taiwanese acoustic dataset should be recorded with its target-variety limitation');
  assert.equal(taiwan[6], 'comparative-only-target-variety-mismatch');
  assert.ok(taiwan[5].includes('37,946 measured syllable tokens'));
});
