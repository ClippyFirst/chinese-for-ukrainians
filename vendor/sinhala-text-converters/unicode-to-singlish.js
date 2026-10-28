import {
  VOWEL_MAPPINGS,
  N_VOWELS,
  SPECIAL_CONSONANT_MAPPINGS,
  CONSONANT_MAPPINGS,
  SPECIAL_CHAR_MAPPINGS,
  RAKARANSHA,
} from './constants.js';

/**
 * Converts Unicode Sinhala to Singlish (Sinhala written in English)
 * @param text - The Unicode Sinhala text to convert
 * @param options - Optional conversion options including callback for unexpected inputs
 * @returns The converted Singlish text
 */
export function unicodeToSinglish(text, options = {}) {
  if (!text) {
    return text;
  }

  let result = text;
  const onUnexpectedInput = options?.onUnexpectedInput;

  // Helper to create regex from pattern string
  const createRegex = (pattern) => {
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  };

  // Process in reverse order of singlishToUnicode
  // Start with vowels (standalone)
  for (let i = VOWEL_MAPPINGS.length - 1; i >= 0; i--) {
    const [vowelUni, vowel] = VOWEL_MAPPINGS[i];
    result = result.replace(createRegex(vowelUni), vowel);
  }

  // Process consonants with HAL (්) - must come before consonant+vowel combinations
  for (let i = CONSONANT_MAPPINGS.length - 1; i >= 0; i--) {
    const [consonantUni, consonant] = CONSONANT_MAPPINGS[i];
    const halPattern = consonantUni + '්';
    result = result.replace(createRegex(halPattern), consonant);
  }

  // Process consonants + vowel modifiers (reverse order - longer patterns first)
  // Build all combinations and sort by length
  const consonantVowelCombos = [];
  for (let i = 0; i < CONSONANT_MAPPINGS.length; i++) {
    const [consonantUni, consonant] = CONSONANT_MAPPINGS[i];
    for (let j = 0; j < N_VOWELS; j++) {
      const [vowelUni, vowel, vowelModifier] = VOWEL_MAPPINGS[j];
      const unicodePattern = consonantUni + vowelModifier;
      const singlishPattern = consonant + vowel;
      consonantVowelCombos.push([unicodePattern, singlishPattern]);
    }
  }
  // Sort by length (longest first) to avoid partial matches
  consonantVowelCombos.sort((a, b) => b[0].length - a[0].length);
  
  for (const [unicodePattern, singlishPattern] of consonantVowelCombos) {
    result = result.replace(createRegex(unicodePattern), singlishPattern);
  }

  // Process consonants + Rakaransha + vowel modifiers
  // First: consonant + r + vowel
  const rakaranshaVowelCombos = [];
  for (let j = 0; j < CONSONANT_MAPPINGS.length; j++) {
    const [consonantUni, consonant] = CONSONANT_MAPPINGS[j];
    for (let i = 0; i < VOWEL_MAPPINGS.length; i++) {
      const [, vowel, vowelModifier] = VOWEL_MAPPINGS[i];
      const unicodePattern = consonantUni + RAKARANSHA + vowelModifier;
      const singlishPattern = consonant + 'r' + vowel;
      rakaranshaVowelCombos.push([unicodePattern, singlishPattern]);
    }
  }
  rakaranshaVowelCombos.sort((a, b) => b[0].length - a[0].length);
  
  for (const [unicodePattern, singlishPattern] of rakaranshaVowelCombos) {
    result = result.replace(createRegex(unicodePattern), singlishPattern);
  }

  // Then: consonant + r (without vowel)
  for (let j = CONSONANT_MAPPINGS.length - 1; j >= 0; j--) {
    const [consonantUni, consonant] = CONSONANT_MAPPINGS[j];
    const pattern = consonantUni + RAKARANSHA;
    const replacement = consonant + 'r';
    result = result.replace(createRegex(pattern), replacement);
  }

  // Process consonants + special characters
  const specialCharCombos = [];
  for (let i = 0; i < SPECIAL_CHAR_MAPPINGS.length; i++) {
    const [specialCharUni, specialChar] = SPECIAL_CHAR_MAPPINGS[i];
    for (let j = 0; j < CONSONANT_MAPPINGS.length; j++) {
      const [consonantUni, consonant] = CONSONANT_MAPPINGS[j];
      const unicodePattern = consonantUni + specialCharUni;
      const singlishPattern = consonant + specialChar;
      specialCharCombos.push([unicodePattern, singlishPattern]);
    }
  }
  specialCharCombos.sort((a, b) => b[0].length - a[0].length);
  
  for (const [unicodePattern, singlishPattern] of specialCharCombos) {
    result = result.replace(createRegex(unicodePattern), singlishPattern);
  }

  // Process special consonants (reverse order)
  // Map Unicode characters back to their Singlish patterns
  const specialConsonantReverseMap = [
    ['ං', '\\n'],
    ['ඃ', '\\h'],
    ['ඞ', '\\N'],
    ['ඍ', '\\R'],
    ['ර්\u200D', 'R'],
    ['ර්\u200D', '\\r'],
  ];
  
  for (const [unicode, singlish] of specialConsonantReverseMap) {
    result = result.replace(createRegex(unicode), singlish);
  }

  return result;
}

