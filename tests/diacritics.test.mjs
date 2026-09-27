import test from 'node:test';
import assert from 'node:assert/strict';
import { applyToneMark } from '../src/app/diacritics.js';

test('adds Chinese-style tone marks to Ukrainian vowels', () => {
  assert.equal(applyToneMark('а', 1), 'а̄');
  assert.equal(applyToneMark('а', 2), 'а́');
  assert.equal(applyToneMark('а', 3), 'а̌');
  assert.equal(applyToneMark('а', 4), 'а̀');
  assert.equal(applyToneMark('и', 2), 'и́');
});

test('marks the first Ukrainian vowel in a transcription syllable', () => {
  assert.equal(applyToneMark('бей', 3), 'б̌ей');
  assert.equal(applyToneMark('чжоу', 4), 'ч̀жоу');
});

test('tone 5 and missing tones leave transcription unchanged', () => {
  assert.equal(applyToneMark('бей', 5), 'бей');
  assert.equal(applyToneMark('бей', 0), 'бей');
  assert.equal(applyToneMark('бей'), 'бей');
});

test('does not stack duplicate tone marks', () => {
  assert.equal(applyToneMark('а́', 4), 'а̀');
});
