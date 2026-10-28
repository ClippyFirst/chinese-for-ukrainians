// Conservative browser-side Sinhala G2P adapter.
// Rule inventory adapted from VoiceLK ML's MIT-licensed model_engine/g2p.py.
// This port intentionally omits its Python tokenizer and domain lexicon; it is
// a research candidate, not a claim of parity with the upstream service.
const CONSONANTS = Object.freeze({
  "ක":"k","ඛ":"k","ග":"g","ඝ":"g","ඞ":"ŋ",
  "ච":"tʃ","ඡ":"tʃ","ජ":"dʒ","ඣ":"dʒ","ඤ":"ɲ",
  "ට":"ʈ","ඨ":"ʈ","ඩ":"ɖ","ඪ":"ɖ","ණ":"ɳ",
  "ත":"t̪","ථ":"t̪","ද":"d̪","ධ":"d̪","න":"n",
  "ප":"p","ඵ":"p","බ":"b","භ":"b","ම":"m",
  "ය":"j","ර":"r","ල":"l","ව":"ʋ","ශ":"ʃ","ෂ":"ʃ",
  "ස":"s","හ":"h","ළ":"ɭ","ෆ":"f","ඥ":"gn",
  "ඟ":"ŋg","ඦ":"ɲdʒ","ඬ":"ɳɖ","ඳ":"nd̪","ඹ":"mb"
});
const VOWELS = Object.freeze({
  "අ":"a","ආ":"aː","ඇ":"æ","ඈ":"æː","ඉ":"i","ඊ":"iː",
  "උ":"u","ඌ":"uː","එ":"e","ඒ":"eː","ඔ":"o","ඕ":"oː",
  "ඍ":"ru","ඎ":"ruː"
});
const MODIFIERS = Object.freeze({
  "්":"","ා":"aː","ැ":"æ","ෑ":"æː","ි":"i","ී":"iː",
  "ු":"u","ූ":"uː","ෙ":"e","ේ":"eː","ො":"o","ෝ":"oː",
  "ෞ":"au","ෛ":"ai","ෘ":"ru","ෲ":"ruː"
});
const FINALS = Object.freeze({"ං":"ŋ","ඃ":"h"});

function phonemizeWord(word) {
  const chars = Array.from(word.normalize("NFC"));
  const segments = [];
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    if (Object.hasOwn(CONSONANTS, ch)) {
      const consonant = CONSONANTS[ch];
      const next = chars[i + 1];
      if (next && Object.hasOwn(MODIFIERS, next)) {
        segments.push({ consonant, vowel: MODIFIERS[next], kind: next === "්" ? "hal" : "vowel" });
        i += 1;
      } else {
        segments.push({ consonant, vowel: "a", kind: "inherent" });
      }
    } else if (Object.hasOwn(VOWELS, ch)) {
      segments.push({ consonant: "", vowel: VOWELS[ch], kind: "vowel" });
    } else if (Object.hasOwn(FINALS, ch)) {
      segments.push({ consonant: FINALS[ch], vowel: "", kind: "coda" });
    } else if (Object.hasOwn(MODIFIERS, ch) && ch !== "්") {
      segments.push({ consonant: "", vowel: MODIFIERS[ch], kind: "vowel" });
    } else if (ch === "\u200d" || ch === "්") {
      // Joiner and a standalone virama carry no independent phoneme here.
    } else {
      segments.push({ consonant: `⟦${ch}⟧`, vowel: "", kind: "unknown" });
    }
  }

  // Rule-based inherent-vowel reduction, adapted from VoiceLK G2P's
  // implementation of the Sinhala schwa rules cited to Wasala et al. (2006).
  let seenVowel = false;
  for (let i = 0; i < segments.length; i += 1) {
    const current = segments[i];
    if (current.kind !== "inherent") {
      seenVowel = seenVowel || current.kind === "vowel";
      continue;
    }
    const next = segments[i + 1];
    const previous = segments[i - 1];
    const keep = !seenVowel
      || Boolean(next && (next.kind === "hal" || next.kind === "coda"))
      || Boolean(next && next.consonant === "h")
      || Boolean(current.consonant === "r" && previous && previous.kind === "hal");
    if (!keep) current.vowel = "ə";
    seenVowel = true;
  }
  return segments.map(({ consonant, vowel }) => consonant + vowel).join("");
}

export function sinhalaTextToIpa(text) {
  return String(text).split(/(\s+)/u).map(token =>
    token.replace(/[\u0D80-\u0DFF\u200D]+/gu, word => phonemizeWord(word))
  ).join("");
}
