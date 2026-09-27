import test from 'node:test';
import assert from 'node:assert/strict';

import { transcriptionMap } from '../src/generated/transcription-map.js';
import { transcribeAll } from '../src/app/transcribe.js';

const tokens = [
  { type: 'han', source: '茲', pinyin: 'zi1', tone: 1, normalizedPinyin: 'zi', status: 'resolved' },
  { type: 'han', source: '多', pinyin: 'duo1', tone: 1, normalizedPinyin: 'duo', status: 'resolved' },
  { type: 'han', source: '爾', pinyin: 'er3', tone: 3, normalizedPinyin: 'er', status: 'resolved' },
  { type: 'han', source: '布', pinyin: 'bu4', tone: 4, normalizedPinyin: 'bu', status: 'resolved' },
  { type: 'han', source: '尼', pinyin: 'ni2', tone: 2, normalizedPinyin: 'ni', status: 'resolved' },
  { type: 'han', source: '夫', pinyin: 'fu1', tone: 1, normalizedPinyin: 'fu', status: 'resolved' },
];

test('Ukrainian transcription is separated by syllables and contains no slash alternatives', () => {
  const result = transcribeAll(tokens, transcriptionMap);

  assert.equal(result.kirnosova.text, 'цзӣ дуо̄ е̌р бу̀ ні́ фӯ');
  assert.equal(result.kirnosova_tsisar.text, 'дзӣ дво̄ е̌р бу̀ ні́ фӯ');
  assert.equal(result.nanu.text, 'цзӣ дуо̄ е̌р бу̀ ні́ фӯ');

  for (const system of Object.values(result)) {
    assert.equal(system.text.includes('/'), false);
  }
});
