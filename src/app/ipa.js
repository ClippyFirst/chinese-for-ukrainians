const INITIALS = [
  ['zh', 'ʈʂ'], ['ch', 'ʈʂʰ'], ['sh', 'ʂ'], ['b', 'p'], ['p', 'pʰ'], ['m', 'm'], ['f', 'f'],
  ['d', 't'], ['t', 'tʰ'], ['n', 'n'], ['l', 'l'], ['g', 'k'], ['k', 'kʰ'], ['h', 'x'],
  ['j', 'tɕ'], ['q', 'tɕʰ'], ['x', 'ɕ'], ['r', 'ɻ'], ['z', 'ts'], ['c', 'tsʰ'], ['s', 's'],
];
const FINALS = {
  a: 'a', o: 'uɔ', e: 'ɤ', ai: 'aɪ', ei: 'eɪ', ao: 'aʊ', ou: 'oʊ',
  an: 'an', en: 'ən', ang: 'ɑŋ', eng: 'əŋ', er: 'əɹ',
  i: 'i', ia: 'ja', ie: 'jɛ', iao: 'jaʊ', iu: 'joʊ', ian: 'jɛn', in: 'in', iang: 'jɑŋ', ing: 'iŋ', iong: 'jʊŋ',
  u: 'u', ua: 'wa', uo: 'uɔ', uai: 'waɪ', ui: 'weɪ', uan: 'wan', un: 'wən', uang: 'wɑŋ', ong: 'ʊŋ',
  ü: 'y', üe: 'ɥe', üan: 'ɥɛn', ün: 'yn',
  ya: 'ja', ye: 'jɛ', yao: 'jaʊ', you: 'joʊ', yan: 'jɛn', yin: 'in', yang: 'jɑŋ', ying: 'iŋ', yong: 'jʊŋ',
  wa: 'wa', wo: 'uɔ', wai: 'waɪ', wei: 'weɪ', wan: 'wan', wen: 'wən', wang: 'wɑŋ', weng: 'wəŋ',
};
const SPECIAL_IPA = Object.freeze({ m: 'm̩', n: 'n̩', ng: 'ŋ̍' });
const TONES = { 1: '˥', 2: '˧˥', 3: '˨˩˦', 4: '˥˩' };

export function formatIPA(tokens) {
  let output = '';
  let previousWasHan = false;
  for (const token of tokens) {
    if (token.type === 'text') {
      output += token.source;
      previousWasHan = false;
      continue;
    }
    const rendered = pinyinToIPA(token.pinyin);
    if (!rendered) {
      if (previousWasHan) output += ' ';
      output += `⟦IPA:${token.pinyin || token.source}⟧`;
      previousWasHan = true;
      continue;
    }
    if (previousWasHan) output += ' ';
    output += rendered;
    previousWasHan = true;
  }
  return output;
}

/**
 * Broad practical IPA from Pinyin, not narrow phonetic transcription.
 * Tones are lexical/citation-form contours; tone sandhi is not applied.
 */
export function pinyinToIPA(value) {
  const normalized = String(value).normalize('NFC').trim().toLowerCase();
  const toneMatch = normalized.match(/([0-5])$/u);
  const tone = toneMatch ? Number(toneMatch[1]) : extractTone(normalized);
  let syllable = toneMatch ? normalized.slice(0, -1) : stripToneMark(normalized);
  syllable = syllable.replace(/u:/g, 'ü').replace(/v/g, 'ü');
  if (Object.hasOwn(SPECIAL_IPA, syllable)) return SPECIAL_IPA[syllable] + toneContour(tone);
  // The standalone syllable er is not the initial r followed by final e.
  if (syllable === 'er') return FINALS.er + toneContour(tone);

  let initial = '';
  let initialIPA = '';
  for (const [candidate, ipa] of INITIALS) {
    if (syllable.startsWith(candidate)) { initial = candidate; initialIPA = ipa; break; }
  }
  let final = syllable.slice(initial.length);
  if (!initial && final === 'yi') final = 'i';
  if (!initial && final === 'wu') final = 'u';
  if (!initial && final.startsWith('yu')) final = 'ü' + final.slice(2);
  if (initial && ['j', 'q', 'x'].includes(initial)) final = final.replace(/^u/u, 'ü');

  // Keep the syllabic apical vowel; ɿ is a sinological, not IPA, convention.
  if (initial === 'r' && final === 'i') return 'ɻ̩' + toneContour(tone);
  if (['zh', 'ch', 'sh'].includes(initial) && final === 'i') return initialIPA + 'ɻ̩' + toneContour(tone);
  if (['z', 'c', 's'].includes(initial) && final === 'i') return initialIPA + 'ɹ̩' + toneContour(tone);
  const finalIPA = FINALS[final];
  if (!finalIPA) return '';
  return initialIPA + finalIPA + toneContour(tone);
}

function extractTone(value) {
  const marks = { ā: 1, á: 2, ǎ: 3, à: 4, ē: 1, é: 2, ě: 3, è: 4, ī: 1, í: 2, ǐ: 3, ì: 4, ō: 1, ó: 2, ǒ: 3, ò: 4, ū: 1, ú: 2, ǔ: 3, ù: 4, ǖ: 1, ǘ: 2, ǚ: 3, ǜ: 4 };
  for (const char of value) if (marks[char]) return marks[char];
  return 0;
}
function stripToneMark(value) {
  const replacements = { ā: 'a', á: 'a', ǎ: 'a', à: 'a', ē: 'e', é: 'e', ě: 'e', è: 'e', ī: 'i', í: 'i', ǐ: 'i', ì: 'i', ō: 'o', ó: 'o', ǒ: 'o', ò: 'o', ū: 'u', ú: 'u', ǔ: 'u', ù: 'u', ǖ: 'ü', ǘ: 'ü', ǚ: 'ü', ǜ: 'ü' };
  return [...value].map((char) => replacements[char] || char).join('');
}
function toneContour(tone) { return TONES[tone] || ''; }
