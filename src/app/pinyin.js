const TONE_MARKS = {
  ā: ['a', 1], á: ['a', 2], ǎ: ['a', 3], à: ['a', 4],
  ē: ['e', 1], é: ['e', 2], ě: ['e', 3], è: ['e', 4],
  ī: ['i', 1], í: ['i', 2], ǐ: ['i', 3], ì: ['i', 4],
  ō: ['o', 1], ó: ['o', 2], ǒ: ['o', 3], ò: ['o', 4],
  ū: ['u', 1], ú: ['u', 2], ǔ: ['u', 3], ù: ['u', 4],
  ǖ: ['ü', 1], ǘ: ['ü', 2], ǚ: ['ü', 3], ǜ: ['ü', 4],
};

export function normalizePinyinSyllable(value) {
  const original = String(value).normalize('NFC').trim().toLowerCase();
  const numberTone = original.match(/([1-5])$/u);
  let base = numberTone ? original.slice(0, -1) : original;
  let tone = numberTone ? Number(numberTone[1]) : 0;
  if (!numberTone) {
    for (const char of base) {
      const mark = TONE_MARKS[char];
      if (mark) { base = base.replace(char, mark[0]); tone = mark[1]; break; }
    }
  }
  return { base: base.replace(/v/g, 'ü').replace(/u:/g, 'ü'), tone };
}

export function formatPinyin(tokens) {
  let output = '';
  let previousWasHan = false;
  for (const token of tokens) {
    if (token.type === 'text') { output += token.source; previousWasHan = false; continue; }
    const rendered = toToneMarked(token.pinyin);
    if (!rendered) continue;
    if (previousWasHan) output += ' ';
    output += rendered;
    previousWasHan = true;
  }
  return output;
}

export function toToneMarked(value) {
  const { base, tone } = normalizePinyinSyllable(value);
  if (!tone || tone === 5) return base;
  const vowelIndex = findToneVowel(base);
  if (vowelIndex === -1) return base;
  const vowel = base[vowelIndex];
  const marks = { a: ['ā','á','ǎ','à'], e: ['ē','é','ě','è'], i: ['ī','í','ǐ','ì'], o: ['ō','ó','ǒ','ò'], u: ['ū','ú','ǔ','ù'], ü: ['ǖ','ǘ','ǚ','ǜ'] };
  return `${base.slice(0, vowelIndex)}${marks[vowel][tone - 1]}${base.slice(vowelIndex + 1)}`;
}

function findToneVowel(base) {
  if (base.includes('a')) return base.indexOf('a');
  if (base.includes('e')) return base.indexOf('e');
  if (base.includes('ou')) return base.indexOf('o');
  for (let i = base.length - 1; i >= 0; i -= 1) if ('aeiouü'.includes(base[i])) return i;
  return -1;
}
