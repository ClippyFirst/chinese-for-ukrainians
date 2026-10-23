import { transcriptionMap } from '../generated/transcription-map.js';
import { pinyinToIPA } from '../app/ipa.js';

export function normalizeIpaKey(value) {
  return String(value ?? '').normalize('NFC').trim();
}

export function createIpaTranscriptionMap(sourceMappings, ipaResolver = pinyinToIPA) {
  const result = {};
  for (const [system, sourceEntries] of Object.entries(sourceMappings)) {
    const targetEntries = {};
    for (const [pinyinKey, entry] of Object.entries(sourceEntries)) {
      const ipaKey = normalizeIpaKey(ipaResolver(pinyinKey));
      if (!ipaKey) continue;
      if (Object.hasOwn(targetEntries, ipaKey)) {
        throw new Error('IPA key collision in ' + system + ': ' + pinyinKey + ' and ' + entry.sourceKey);
      }
      targetEntries[ipaKey] = Object.freeze({ ...entry, pinyinKey });
    }
    result[system] = Object.freeze(targetEntries);
  }
  return Object.freeze(result);
}

export const ipaTranscriptionMap = createIpaTranscriptionMap(transcriptionMap);

export function lookupIpaTranscription(mappings, system, ipaValue) {
  const key = normalizeIpaKey(ipaValue);
  if (!key) return { status: 'unsupported-ipa', value: '', key };
  const entry = mappings[system]?.[key];
  if (!entry) return { status: 'unresolved', value: '', key };
  if (entry.missing) return { status: 'missing', value: '', key, sourceRow: entry.sourceRow, sourceKey: entry.sourceKey, pinyinKey: entry.pinyinKey };
  return { status: 'resolved', value: entry.value, key, sourceRow: entry.sourceRow, sourceKey: entry.sourceKey, pinyinKey: entry.pinyinKey };
}
