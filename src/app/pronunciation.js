import { normalizePinyinSyllable } from './pinyin.js';

let engine = null;

export function configurePronunciationEngine(nextEngine) {
  engine = nextEngine;
}

function requireEngine() {
  if (!engine) throw new Error('Pronunciation engine is not configured.');
  return engine;
}

export function resolvePronunciation(tokens, source, options = {}) {
  const pinyinEngine = requireEngine();
  const result = [];

  for (const span of tokens) {
    if (span.type === 'text') {
      result.push(span);
      continue;
    }

    const items = pinyinEngine(span.source, {
      type: 'all',
      toneType: 'symbol',
      traditional: Boolean(options.traditional),
      segmentit: 2,
    });

    if (!Array.isArray(items)) throw new Error('Pronunciation engine returned an unexpected result.');

    for (let offset = 0; offset < items.length; offset += 1) {
      const item = items[offset];
      const sourceChar = item.origin ?? span.source[offset];
      const pinyin = item.pinyin ?? item.result ?? '';
      const normalized = normalizePinyinSyllable(pinyin);
      const unresolved = !item.isZh || !normalized.base;
      const alternatives = Array.isArray(item.polyphonic) ? item.polyphonic : [];
      result.push({
        source: sourceChar,
        start: span.start + offset,
        end: span.start + offset + sourceChar.length,
        type: 'han',
        pinyin: unresolved ? '' : `${normalized.base}${normalized.tone || ''}`,
        tone: normalized.tone,
        normalizedPinyin: normalized.base,
        status: unresolved ? 'unresolved' : 'resolved',
        resolution: alternatives.length > 1 ? 'contextual' : 'character',
        alternatives,
      });
    }
  }

  return result;
}
