import test from 'node:test';
import assert from 'node:assert/strict';
import { transcribe, transcribeAll } from '../src/app/transcribe.js';

const mappings = {
  kirnosova: {
    chong: { value: 'чун', missing: false, sourceRow: 40, sourceKey: 'chong' },
    pou: { value: 'поу', missing: false, sourceRow: 260, sourceKey: 'pou' },
    bei: { value: 'бей', missing: false, sourceRow: 11, sourceKey: 'bei' },
  },
  kirnosova_tsisar: {
    chong: { value: 'чон', missing: false, sourceRow: 40, sourceKey: 'chong' },
    pou: { value: 'пов', missing: false, sourceRow: 260, sourceKey: 'pou' },
    bei: { value: 'бей', missing: false, sourceRow: 11, sourceKey: 'bei' },
  },
  nanu: {
    chong: { value: 'чун', missing: false, sourceRow: 40, sourceKey: 'chong' },
    pou: { value: '', missing: true, sourceRow: 260, sourceKey: 'pou' },
    bei: { value: 'бей', missing: false, sourceRow: 11, sourceKey: 'bei' },
  },
};

const token = (source, pinyin, type = 'han') => ({
  source,
  type,
  pinyin,
  normalizedPinyin: pinyin.replace(/[1-5]$/u, ''),
  status: 'resolved',
});

test('renders one Ukrainian system independently', () => {
  const result = transcribe([token('chong', 'chong2')], 'kirnosova', mappings);
  assert.equal(result.text, 'чун');
  assert.deepEqual(result.issues, []);
});

test('keeps system differences instead of selecting a fallback winner', () => {
  const all = transcribeAll([token('chong', 'chong2')], mappings);
  assert.equal(all.kirnosova.text, 'чун');
  assert.equal(all.kirnosova_tsisar.text, 'чон');
  assert.equal(all.nanu.text, 'чун');
});

test('marks a blank CSV cell as missing without borrowing another system', () => {
  const result = transcribe([token('pou', 'pou2')], 'nanu', mappings);
  assert.equal(result.text, 'pou');
  assert.equal(result.issues[0].status, 'missing');
});

test('preserves punctuation and Latin text around Chinese spans', () => {
  const result = transcribe([
    token('bei', 'bei3'),
    token('!', '!', 'text'),
    token('world', 'world', 'text'),
  ], 'kirnosova', mappings);
  assert.equal(result.text, 'бей!world');
});
