import { SYSTEMS } from '../data/transcription.js';
import { lookupIpaTranscription } from '../data/ipa-transcription.js';
import { applyToneMark } from './diacritics.js';

export function transcribe(tokens, system, mappings, { showTones = true } = {}) {
  if (!SYSTEMS[system]) throw new Error(`Unknown transcription system: ${system}`);
  let output = '';
  let previousWasHan = false;
  const issues = [];

  for (const token of tokens) {
    if (token.type === 'text') {
      output += token.source;
      previousWasHan = false;
      continue;
    }
    if (previousWasHan && output && !/\s$/u.test(output)) output += ' ';
    if (token.status !== 'resolved') {
      output += token.source;
      previousWasHan = true;
      issues.push({ status: token.status, source: token.source, pinyin: token.pinyin || '' });
      continue;
    }
    const lookup = lookupIpaTranscription(mappings, system, token.ipaBase);
    if (lookup.status !== 'resolved') {
      output += token.source;
      previousWasHan = true;
      issues.push({ ...lookup, source: token.source, pinyin: token.pinyin });
      continue;
    }
    output += showTones ? applyToneMark(lookup.value, token.tone) : applyToneMark(lookup.value, 0);
    previousWasHan = true;
  }

  return { text: output, issues };
}

export function transcribeAll(tokens, mappings, { showTones = true } = {}) {
  return Object.fromEntries(
    Object.keys(SYSTEMS).map((system) => [system, transcribe(tokens, system, mappings, { showTones })]),
  );
}
