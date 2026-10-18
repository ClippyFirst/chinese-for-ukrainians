import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pinyinToIPA } from '../src/app/ipa.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixturePath = path.join(root, 'tests/fixtures/uw-mandarin-syllables-ipa-reference.csv');
const outputPath = path.join(root, 'docs/IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv');
const checkOnly = process.argv.includes('--check');
const quote = (value) => '"' + String(value ?? '').replace(/"/gu, '""') + '"';
const initials = ['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s'];
const aliases = {yi:'i',ya:'ia',ye:'ie',yao:'iao',you:'iou',yan:'ian',yang:'iang',yin:'in',ying:'ing',yong:'iong',yu:'ü',yue:'üe',yuan:'üan',yun:'ün',wu:'u',wa:'ua',wo:'uo',wai:'uai',wei:'uei',wan:'uan',wang:'uang',wen:'uen',weng:'ueng'};
const statuses = {ong:'unresolved',iong:'unresolved','üan':'unresolved',er:'unresolved',ao:'convention-decision-needed',ang:'convention-decision-needed',iang:'convention-decision-needed',uang:'convention-decision-needed','üe':'convention-decision-needed',uo:'source-aligned-for-sampled-cases','ün':'source-aligned-for-sampled-alias','ü':'convention-conversion',ai:'convention-conversion',ei:'convention-conversion',ou:'convention-conversion',ia:'convention-conversion',ie:'convention-conversion',iao:'convention-conversion',ua:'convention-conversion',uai:'convention-conversion',ueng:'convention-conversion'};
function finalClass(p) {
  if (p === 'er') return 'er';
  const initial = initials.find((item) => p.startsWith(item)) ?? '';
  let final = p.slice(initial.length);
  if (!initial && aliases[p]) return aliases[p];
  if (['j','q','x'].includes(initial)) final = final.replace(/^u/u, 'ü');
  if (['b','p','m','f'].includes(initial) && final === 'o') return 'uo';
  if (final === 'iu') final = 'iou';
  if (final === 'ui') final = 'uei';
  if (final === 'un') final = 'uen';
  return final;
}
function parseFixture(text) {
  return text.trim().split(/\r?\n/u).slice(1).map((line) => {
    const [pinyin, uw, kind] = line.split(';');
    return { pinyin, uw, kind };
  });
}
const records = parseFixture(await fs.readFile(fixturePath, 'utf8')).map(({pinyin,uw,kind}) => {
  const current = pinyinToIPA(pinyin);
  const fc = finalClass(pinyin);
  const relation = current === uw ? 'literal-match' : 'different-symbol-string';
  const status = statuses[fc] ?? 'partially-corroborated-or-pending';
  const note = current === uw
    ? 'Literal string match only; the UW chart is one broad transcription witness, not a complete gold standard.'
    : 'String difference is not automatically a phonetic error; map transcription conventions and adjudicate against independent evidence.';
  return [pinyin,uw,current,kind,relation,status,fc,note];
});
if (records.length !== 403) throw new Error('Expected 403 source keys; found ' + records.length);
const missing = records.filter((r) => !r[2]);
if (missing.length) throw new Error('Converter returned no IPA for: ' + missing.map((r) => r[0]).join(', '));
const csv = [['pinyin','uw_ipa_raw','current_ipa_broad','source_kind','literal_relation','class_adjudication_status','normalized_final_class','note'].join(';'), ...records.map((r) => r.map(quote).join(';')), ''].join('\n');
if (checkOnly) {
  const existing = await fs.readFile(outputPath, 'utf8');
  if (existing !== csv) { console.error('Differential is stale; run npm run audit:ipa:uw'); process.exitCode = 1; }
  else console.log('UW IPA differential current: 403 keys; ' + records.filter((r) => r[4] === 'literal-match').length + ' literal matches; no missing converter outputs.');
} else {
  await fs.writeFile(outputPath, csv, 'utf8');
  console.log('Wrote 403 rows to docs/IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv');
}
