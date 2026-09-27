import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPinyin, toToneMarked, toToneNumberless } from '../src/app/pinyin.js';

const tokens = [
  { type: 'han', source: '北', pinyin: 'bei3', normalizedPinyin: 'bei3', status: 'resolved' },
  { type: 'han', source: '京', pinyin: 'jing1', normalizedPinyin: 'jing1', status: 'resolved' },
  { type: 'text', source: '！' },
];

test('renders Pinyin with tone marks by default', () => {
  assert.equal(formatPinyin(tokens), 'běi jīng！');
});

test('renders the same Pinyin without tone marks when disabled', () => {
  assert.equal(formatPinyin(tokens, { showTones: false }), 'bei jing！');
});

test('tone display changes presentation only', () => {
  assert.equal(toToneMarked('lü4'), 'lǜ');
  assert.equal(toToneNumberless('lǜ'), 'lü');
  assert.equal(toToneNumberless('lü4'), 'lü');
});
