/**
 * Vowel mappings for Singlish to Unicode conversion
 * Format: [Unicode character, Singlish pattern, Vowel modifier]
 */
export const VOWEL_MAPPINGS = [
  ['ඌ', 'oo', 'ූ'],
  ['ඕ', 'o\\)', 'ෝ'],
  ['ඕ', 'oe', 'ෝ'],
  ['ආ', 'aa', 'ා'],
  ['ආ', 'a\\)', 'ා'],
  ['ඈ', 'Aa', 'ෑ'],
  ['ඈ', 'A\\)', 'ෑ'],
  ['ඈ', 'ae', 'ෑ'],
  ['ඊ', 'ii', 'ී'],
  ['ඊ', 'i\\)', 'ී'],
  ['ඊ', 'ie', 'ී'],
  ['ඊ', 'ee', 'ී'],
  ['ඒ', 'ea', 'ේ'],
  ['ඒ', 'e\\)', 'ේ'],
  ['ඒ', 'ei', 'ේ'],
  ['ඌ', 'uu', 'ූ'],
  ['ඌ', 'u\\)', 'ූ'],
  ['ඖ', 'au', 'ෞ'],
  ['ඇ', '/\\a', 'ැ'],
  ['අ', 'a', ''],
  ['ඇ', 'A', 'ැ'],
  ['ඉ', 'i', 'ි'],
  ['එ', 'e', 'ෙ'],
  ['උ', 'u', 'ු'],
  ['ඔ', 'o', 'ො'],
  ['ඓ', 'I', 'ෛ'],
];

export const N_VOWELS = 26;

/**
 * Special consonant mappings for Singlish to Unicode conversion
 * Format: [Unicode character, Regex pattern]
 */
export const SPECIAL_CONSONANT_MAPPINGS = [
  ['ං', /\\n/g],
  ['ඃ', /\\h/g],
  ['ඞ', /\\N/g],
  ['ඍ', /\\R/g],
  ['ර්\u200D', /R/g],
  ['ර්\u200D', /\\r/g],
];

/**
 * Consonant mappings for Singlish to Unicode conversion
 * Format: [Unicode character, Singlish pattern]
 * Note: Order matters - longer patterns should be processed first
 */
export const CONSONANT_MAPPINGS = [
  ['ඬ', 'nnd'],
  ['ඳ', 'nndh'],
  ['ඟ', 'nng'],
  ['ථ', 'Th'],
  ['ධ', 'Dh'],
  ['ඝ', 'gh'],
  ['ඡ', 'Ch'],
  ['ඵ', 'ph'],
  ['භ', 'bh'],
  ['ශ', 'sh'],
  ['ෂ', 'Sh'],
  ['ඥ', 'GN'],
  ['ඤ', 'KN'],
  ['ළු', 'Lu'],
  ['ද', 'dh'],
  ['ච', 'ch'],
  ['ඛ', 'kh'],
  ['ත', 'th'],
  ['ට', 't'],
  ['ක', 'k'],
  ['ඩ', 'd'],
  ['න', 'n'],
  ['ප', 'p'],
  ['බ', 'b'],
  ['ම', 'm'],
  ['‍ය', '\\u005C' + 'y'],
  ['‍ය', 'Y'],
  ['ය', 'y'],
  ['ජ', 'j'],
  ['ල', 'l'],
  ['ව', 'v'],
  ['ව', 'w'],
  ['ස', 's'],
  ['හ', 'h'],
  ['ණ', 'N'],
  ['ළ', 'L'],
  ['ඛ', 'K'],
  ['ඝ', 'G'],
  ['ඨ', 'T'],
  ['ඪ', 'D'],
  ['ඵ', 'P'],
  ['ඹ', 'B'],
  ['ෆ', 'f'],
  ['ඣ', 'q'],
  ['ග', 'g'],
  ['ර', 'r'], // Last because we need to omit this in dealing with Rakaransha
];

/**
 * Special character mappings for Singlish to Unicode conversion
 * Format: [Unicode character, Singlish pattern]
 */
export const SPECIAL_CHAR_MAPPINGS = [
  ['ෲ', 'ruu'],
  ['ෘ', 'ru'],
];

/**
 * Rakaransha marker (්‍ර)
 */
export const RAKARANSHA = '්‍ර';

