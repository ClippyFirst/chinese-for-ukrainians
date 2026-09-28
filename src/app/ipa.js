const INITIALS = [
  ['zh', 'ʈʂ'], ['ch', 'ʈʂʰ'], ['sh', 'ʂ'], ['b', 'p'], ['p', 'pʰ'], ['m', 'm'], ['f', 'f'],
  ['d', 't'], ['t', 'tʰ'], ['n', 'n'], ['l', 'l'], ['g', 'k'], ['k', 'kʰ'], ['h', 'x'],
  ['j', 'tɕ'], ['q', 'tɕʰ'], ['x', 'ɕ'], ['r', 'ɻ'], ['z', 'ts'], ['c', 'tsʰ'], ['s', 's'],
];

const FINALS = {
  a: 'a', o: 'ɔ', e: 'ɤ', ai: 'aɪ', ei: 'eɪ', ao: 'aʊ', ou: 'oʊ',
  an: 'an', en: 'ən', ang: 'ɑŋ', eng: 'əŋ', er: 'aɚ',
  i: 'i', ia: 'ja', ie: 'jɛ', iao: 'jaʊ', iu: 'joʊ', ian: 'jɛn', in: 'in', iang: 'jɑŋ', ing: 'iŋ', iong: 'jʊŋ',
  u: 'u', ua: 'wa', uo: 'wo', uai: 'waɪ', ui: 'weɪ', uan: 'wan', un: 'wən', uang: 'wɑŋ', ong: 'ʊŋ',
  ü: 'y', üe: 'ɥe', üan: 'ɥɛn', ün: 'yn',
  ya: 'ja', ye: 'jɛ', yao: 'jaʊ', you: 'joʊ', yan: 'jɛn', yin: 'in', yang: 'jɑŋ', ying: 'iŋ', yong: 'jʊŋ',
  wa: 'wa', wo: 'wo', wai: 'waɪ', wei: 'weɪ', wan: 'wan', wen: 'wən', wang: 'wɑŋ', weng: 'wəŋ',
};

const TONES = { 1: '˥', 2: '˧˥', 3: '˨˩˦', 4: '˥˩', 5: '˧' };

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
      output += token.source;
      previousWasHan = true;
      continue;
    }
    if (previousWasHan) output += ' ';
    output += rendered;
    previousWasHan = true;
  }
  return output;
}

export function pinyinToIPA(value) {
  const normalized = String(value).normalize('NFC').trim().toLowerCase();
  const toneMatch = normalized.match(/([1-5])$/u);
  const tone = toneMatch ? Number(toneMatch[1]) : extractTone(normalized);
  let syllable = toneMatch ? normalized.slice(0, -1) : stripToneMark(normalized);
  syllable = syllable.replace(/u:/g, 'ü').replace(/v/g, 'ü');

  let initial = '';
  let initialIPA = '';
  for (const [candidate, ipa] of INITIALS) {
    if (syllable.startsWith(candidate)) {
      initial = candidate;
      initialIPA = ipa;
      break;
    }
  }

  let final = syllable.slice(initial.length);
  if (!initial && final === 'yi') final = 'i';
  if (!initial && final === 'wu') final = 'u';
  if (!initial && final.startsWith('yu')) final = 'ü' + final.slice(2);
  if (initial && ['j', 'q', 'x'].includes(initial)) final = final.replace(/^u/, 'ü');

  if (['zh', 'ch', 'sh', 'r'].includes(initial) && final === 'i') return (initialIPA === 'ɻ' ? 'ɻ̩' : initialIPA) + toneContour(tone);
  if (['z', 'c', 's'].includes(initial) && final === 'i') return initialIPA + 'ɿ' + toneContour(tone);

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

function toneContour(tone) {
  return TONES[tone] || '';
}
