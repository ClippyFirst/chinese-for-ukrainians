const UKRAINIAN_VOWELS = 'аеєиіїоуюя';

const TONE_MARKS = Object.freeze({
  1: '\u0304', // macron
  2: '\u0301', // acute
  3: '\u030c', // caron
  4: '\u0300', // grave
});

const TONE_COMBINING_MARKS = /[\u0304\u0301\u030c\u0300]/gu;

export function applyToneMark(value, tone) {
  const text = String(value).normalize('NFD').replace(TONE_COMBINING_MARKS, '');
  if (!TONE_MARKS[tone]) return text.normalize('NFC');

  const characters = Array.from(text);
  const vowelIndex = characters.findIndex((char) => UKRAINIAN_VOWELS.includes(char.toLowerCase()));
  if (vowelIndex === -1) return text.normalize('NFC');

  characters[vowelIndex] += TONE_MARKS[tone];
  return characters.join('').normalize('NFC');
}
