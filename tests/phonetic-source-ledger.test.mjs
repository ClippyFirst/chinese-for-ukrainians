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
