import { lookupTranscription, SYSTEMS } from '../data/transcription.js';

export function transcribe(tokens, system, mappings) {
  if (!SYSTEMS[system]) throw new Error(`Unknown transcription system: ${system}`);
  let output = '';
  const issues = [];

  for (const token of tokens) {
    if (token.type === 'text') {
      output += token.source;
      continue;
    }
    if (token.status !== 'resolved') {
      output += token.source;
      issues.push({ status: token.status, source: token.source, pinyin: token.pinyin || '' });
      continue;
    }
    const lookup = lookupTranscription(mappings, system, token.normalizedPinyin);
    if (lookup.status !== 'resolved') {
      output += token.source;
      issues.push({ ...lookup, source: token.source, pinyin: token.pinyin });
      continue;
    }
    output += lookup.value;
  }

  return { text: output, issues };
}

export function transcribeAll(tokens, mappings) {
  return Object.fromEntries(
    Object.keys(SYSTEMS).map((system) => [system, transcribe(tokens, system, mappings)]),
  );
}
