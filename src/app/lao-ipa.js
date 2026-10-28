// Conservative browser port of core Lao syllable mapping/tone rules from
// byu-matrix-lab/lao2ipa (Apache-2.0). This is a partial port: not all upstream
// orthographic rewrites, cluster exceptions, or tone-marker relocation rules
// are implemented. Unknown Lao characters remain visibly bracketed.
const C = Object.freeze({
  "ກ":["k","k",null,null,"middle"],"ຂ":["kʰ","kh",null,null,"high"],
  "ຄ":["kʰ","kh",null,null,"low"],"ງ":["ŋ","ng",null,null,"low"],
  "ຈ":["tɕ","ch",null,null,"middle"],"ສ":["s","s",null,null,"high"],
  "ຊ":["s","x",null,null,"low"],"ຍ":["ɲ","ny","j","y","low"],
  "ດ":["d","d","t","t","middle"],"ຕ":["t","t",null,null,"middle"],
  "ຖ":["tʰ","th","t",null,"high"],"ທ":["tʰ","th",null,null,"low"],
  "ນ":["n","n",null,null,"low"],"ບ":["b","b","p","p","middle"],
  "ປ":["p","p",null,null,"middle"],"ຜ":["pʰ","ph",null,null,"high"],
  "ຝ":["f","f",null,null,"high"],"ພ":["pʰ","ph",null,null,"low"],
  "ຟ":["f","f",null,null,"low"],"ມ":["m","m",null,null,"low"],
  "ຢ":["j","y",null,null,"middle"],"ຣ":["r","r","n",null,"low"],
  "ລ":["l","l",null,null,"low"],"ວ":["ʋ","v","w","o","low"],
  "ຫ":["h","h",null,null,"high"],"ຮ":["h","h",null,null,"low"],
  "ອ":["","",null,null,"middle"],"ຼ":["l","l",null,null,"low"]
});
const CLUSTERS = Object.freeze({
  "ຫມ":["m","m","high"],"ຫນ":["n","n","high"],"ຫງ":["ŋ","ng","high"],
  "ຫຍ":["ɲ","ny","high"],"ຫລ":["l","l","high"],"ຫຼ":["l","l","high"],
  "ໝ":["m","m","high"],"ໜ":["n","n","high"],"ຫວ":["ʋ","v","high"],
  "ຫຣ":["r","r","high"],"ຄຣ":["kʰr","khr","low"],"ຄລ":["kʰl","khl","low"],
  "ຄວ":["kʰʋ","khv","low"],"ຖວ":["taʋ","thv","high"],
  "ຟຣ":["fr","fr","low"],"ຟຼ":["fl","fl","low"],"ຝຣ":["far","fr","high"],
  "ຝຮ":["far","fr","high"],"ຝຼ":["fal","fl","high"],"ພຣ":["pʰr","phr","low"],
  "ພລ":["pʰl","phl","low"],"ພຼ":["pʰl","phl","low"],"ຂວ":["kʰʋ","khv","high"],
  "ກວ":["kʷ","kv","middle"],"ກຣ":["kr","kr","middle"],"ກຼ":["kl","kl","middle"],
  "ຄຼ":["kʰl","khl","low"],"ປຼ":["pl","pl","middle"],"ປຣ":["pr","pr","middle"],
  "ບຣ":["br","br","middle"],"ບຼ":["bl","bl","middle"],"ດຼ":["dr","dl","middle"],
  "ດຣ":["dr","dr","middle"],"ທຼ":["tr","tl","low"],"ຕຣ":["tr","tr","middle"],
  "ທຣ":["tr","tr","low"],"ຕຼ":["tr","tl","middle"]
});
const V = Object.freeze({
  "ະ":["a","a","short"],"ັ":["a","a","short"],"ເະ":["e","e","short"],
  "ເັ":["e","e","short"],"ແະ":["ɛ","e","short"],"ແັ":["ɛ","e","short"],
  "ິ":["i","i","short"],"ໂະ":["o","o","short"],"ົ":["o","o","short"],
  "ເາະ":["ɔ","o","short"],"ັອ":["ɔ","o","short"],"ຸ":["u","ou","short"],
  "ຶ":["ɯ","u","short"],"ເິ":["ɤ","eu","short"],"າ":["aː","a","long"],
  "ເ":["eː","e","long"],"ແ":["ɛː","e","long"],"ີ":["iː","i","long"],
  "ໂ":["oː","o","long"],"ໍ":["ɔː","o","long"],"ອ":["ɔː","o","long"],
  "ູ":["uː","ou","long"],"ື":["ɯː","u","long"],"ເີ":["ɤː","eu","long"],
  "ເຍ":["iːə","ia","long"],"ຽ":["iːə","ia","long"],"ົວ":["uːə","oua","long"],
  "ົວະ":["uə","oua","short"],"ວ":["uːə","oua","long"],"ເຶອ":["ɯə","ua","short"],
  "ເືອ":["ɯːə","ua","long"],"ໃ":["aj","ai","short"],"ໄ":["aj","ai","short"],
  "ເົາ":["aw","ao","short"],"ເັຽ":["iːə","ia","short"],"ເັຍ":["iːə","ia","short"],"ຳ":["am","am","short"]
});
const PRE = new Set(["ເ","ແ","ໂ","ໃ","ໄ"]);
const TONES = new Set(["່","້","໊","໋"]);
const SPECIAL_LIVE = new Set(["ຳ","ເົາ","ໃ","ໄ"]);
const VOWEL_KEYS = Object.keys(V).sort((a,b)=>Array.from(b).length-Array.from(a).length);
const CLUSTER_KEYS = Object.keys(CLUSTERS).sort((a,b)=>Array.from(b).length-Array.from(a).length);
const CONSONANTS = new Set([...Object.keys(C),"ໝ","ໜ"]);
const VOWEL_CHARS = new Set("ະັາຳິີຶືຸູົຽເແໂໃໄໍວອຍ");
const NUMERALS = Object.freeze({"໐":"0","໑":"1","໒":"2","໓":"3","໔":"4","໕":"5","໖":"6","໗":"7","໘":"8","໙":"9"});
const TONE_CLASS = Object.freeze({
  "high":{live:"˩˧",deadLong:"˧˩",deadShort:"˧˥",tho:"˧˩"},
  "middle":{live:"˩˧",deadLong:"˧˩",deadShort:"˧˥",tho:"˥˨"},
  "low":{live:"˧˥",deadLong:"˥˨",deadShort:"˧",tho:"˥˨"}
});
const has = (obj,key) => Object.prototype.hasOwnProperty.call(obj,key);
const isConsonant = ch => CONSONANTS.has(ch);
const isVowelish = ch => VOWEL_CHARS.has(ch) || ch === "ອ";

function initialAt(chars, index) {
  const rest = chars.slice(index).join("");
  for (const key of CLUSTER_KEYS) {
    if (rest.startsWith(key)) {
      const entry = CLUSTERS[key];
      return { length:Array.from(key).length, ipa:entry[0], moh:entry[1], toneClass:entry[2], key };
    }
  }
  const ch = chars[index];
  if (has(C,ch)) return {length:1,ipa:C[ch][0],moh:C[ch][1],toneClass:C[ch][4],key:ch};
  return null;
}
function toneFor(initial, vowelKey, vowelLength, coda, marker) {
  const klass = initial?.toneClass;
  if (!klass || !TONE_CLASS[klass]) return "";
  if (marker === "໋") return "˩˧";
  if (marker === "໊") return "˧˥";
  if (marker === "່") return "˧";
  if (marker === "້") return TONE_CLASS[klass].tho;
  const dead = ["ກ","ດ","ບ"].includes(coda)
    || (!coda && vowelLength === "short" && !SPECIAL_LIVE.has(vowelKey));
  if (!dead) return TONE_CLASS[klass].live;
  return vowelLength === "long" ? TONE_CLASS[klass].deadLong : TONE_CLASS[klass].deadShort;
}
function isPunctuation(ch) {
  return !/[\u0E80-\u0EFF]/u.test(ch);
}
function transliterateWord(word) {
  const chars = Array.from(word.normalize("NFC"));
  let roman = "", ipa = "", syllables = 0, i = 0;
  while (i < chars.length) {
    const ch = chars[i];
    if (has(NUMERALS,ch)) { roman += NUMERALS[ch]; ipa += NUMERALS[ch]; i += 1; continue; }
    if (ch === "ຯ" || ch === "໌") { i += 1; continue; }
    let prefix = "";
    let onsetIndex = i;
    if (PRE.has(ch) && i + 1 < chars.length && isConsonant(chars[i+1])) {
      prefix = ch;
      onsetIndex = i + 1;
    }
    let onset = initialAt(chars,onsetIndex);
    if (!onset && has(V,ch)) {
      onset = {length:0,ipa:"",moh:"",toneClass:null,key:""};
      prefix = "";
      onsetIndex = i;
    }
    if (!onset) {
      if (isPunctuation(ch)) { roman += ch; ipa += ch; i += 1; continue; }
      roman += `⟦${ch}⟧`; ipa += `⟦${ch}⟧`; i += 1; continue;
    }
    let cursor = onsetIndex + onset.length;
    if (onset.length === 0) cursor = i;
    let vowelKey = prefix && has(V,prefix) ? prefix : "";
    let vowelEntry = vowelKey ? V[vowelKey] : null;
    let toneMarker = null;
    while (cursor < chars.length) {
      const next = chars[cursor];
      if (TONES.has(next)) { toneMarker = next; cursor += 1; continue; }
      const candidate = vowelKey + next;
      if (VOWEL_KEYS.some(key => key.startsWith(candidate))) {
        vowelKey = candidate;
        vowelEntry = has(V,vowelKey) ? V[vowelKey] : vowelEntry;
        cursor += 1;
        continue;
      }
      if (isConsonant(next)) break;
      if (isVowelish(next)) break;
      break;
    }
    if (!vowelEntry) {
      if (onset.length === 0) {
        roman += `⟦${ch}⟧`; ipa += `⟦${ch}⟧`; i += 1; continue;
      }
      vowelKey = "";
      vowelEntry = ["","","long"];
    }
    let coda = null, codaIpa = "", codaMoh = "";
    if (cursor < chars.length && isConsonant(chars[cursor])) {
      const candidate = chars[cursor];
      const after = chars[cursor+1];
      const afterAfter = chars[cursor+2];
      const nextStartsVowel = after && (PRE.has(after) || VOWEL_CHARS.has(after));
      const twoBeforeVowel = after && isConsonant(after) && afterAfter && (PRE.has(afterAfter) || VOWEL_CHARS.has(afterAfter));
      const atEnd = !after || isPunctuation(after);
      if (!nextStartsVowel && (atEnd || twoBeforeVowel || TONES.has(after))) {
        coda = candidate;
        const entry = C[candidate];
        if (entry) {
          codaIpa = entry[2] || entry[0];
          codaMoh = entry[3] || entry[1];
        } else if (candidate === "ໝ") { codaIpa="m"; codaMoh="m"; }
        else if (candidate === "ໜ") { codaIpa="n"; codaMoh="n"; }
        cursor += 1;
      }
    }
    const vowelIpa = vowelEntry[0], vowelMoh = vowelEntry[1], vowelLength = vowelEntry[2];
    const tone = toneFor(onset,vowelKey,vowelLength,coda,toneMarker);
    const openShort = !coda && vowelLength === "short" && !SPECIAL_LIVE.has(vowelKey);
    const syllableIpa = onset.ipa + vowelIpa + codaIpa + (openShort ? "ʔ" : "") + tone;
    const syllableMoh = onset.moh + vowelMoh + codaMoh;
    if (syllables > 0) ipa += ".";
    ipa += syllableIpa;
    roman += syllableMoh;
    syllables += 1;
    i = Math.max(cursor, onsetIndex + Math.max(onset.length,1));
    if (i === onsetIndex && onset.length === 0) i += 1;
  }
  return {roman,ipa};
}
export function laoTextToOutputs(text) {
  const chunks = String(text).split(/(\s+)/u);
  const roman = [], ipa = [];
  for (const chunk of chunks) {
    if (!chunk) continue;
    if (/^\s+$/u.test(chunk)) { roman.push(chunk); ipa.push(chunk); continue; }
    const result = transliterateWord(chunk);
    roman.push(result.roman);
    ipa.push(result.ipa);
  }
  return {roman:roman.join(""),ipa:ipa.join("")};
}
