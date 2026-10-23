# Edge-form research reconciliation — 2026-10-23

## Why this record exists

The repository repeatedly surfaced the same unusual Pinyin forms in separate audits. This led to a misleading impression that every previously discussed form was still an unresolved release blocker. This reconciliation separates (A) forms the current runtime cannot map to IPA, (B) forms whose Ukrainian source rows have known values but need better primary-source verification, and (C) IPA classes whose broad-IPA release convention was already adopted in the 2026-10-19 closeout.

This is a state reconciliation, not a claim that the source dataset is fully linguistically or legally verified.

## Runtime facts checked against current main

The implementation in `src/app/ipa.js` uses a finite `FINALS` map plus explicit special forms. The adapter audit in `scripts/audit-ipa-adapter-readiness.mjs` reports 421 Pinyin aliases, 417 keys with IPA output, four unsupported keys and no IPA-key collision groups. The production adapter has no Pinyin fallback for a missing IPA key.

The four unsupported keys are `ê` (CSV № 82), `hm` (№ 125), `hng` (№ 126), and `yo` (№ 378). This is a code-coverage fact, not a statement that the forms are newly discovered or have never been researched.

The numbers below refer to the CSV's first column (№), not physical line numbers in the file.

## Per-form reconciliation

| Form | IPA runtime | Existing Ukrainian CSV values (Kirnosova / Kirnosova–Tsisar / NANU) | Prior research already done | Actual remaining question |
|---|---|---|---|---|
| `ê` | Unsupported | `е / е / blank` | Previously compared with reference inventories; absence from the official NANU/ASTKS key set was recorded in the source ledger. Open-content reference material associates `ê` with [ɛ] in certain interjections, but that does not settle all tones or the project's exact typed IPA output. | Decide whether the project's target scope includes this special interjectional syllable, and if yes, document the exact source-backed IPA and tone treatment. Do not fill NANU. |
| `hm` | Unsupported | `хм / гм / blank` | Kirnosova table presence was recorded; OCR extraction was explicitly flagged as noisy; a secondary comparison reproduced the current Ukrainian values. NANU key-set absence is already documented. | Verify the original Kirnosova page image for the source transcription if possible, then separately adjudicate the phonetic/IPA representation. Do not treat OCR text as acoustic evidence. |
| `hng` | Unsupported | `х / гм / blank` | Kirnosova table presence was recorded; OCR output contained an unreliable Latin-looking glyph; secondary comparison reproduced current values; NANU key-set absence is documented. | Verify the original source cell and independently decide the IPA representation. Preserve the two Ukrainian-system values and NANU blank. |
| `yo` | Unsupported | `йо / йо / blank` | Already included in the edge-form audit and adapter readiness list. A generic decomposition into `y + o` is not valid evidence because Pinyin zero-initial spelling and exceptional interjectional forms are not necessarily a productive segment sequence. | Verify attestation/scope and the existing Ukrainian source row; either add a source-backed explicit IPA rule or document why the form remains unresolved/out of scope. |

### Do not conflate with other previously discussed forms

| Form/class | Current IPA output | Current release decision |
|---|---|---|
| `o` | `ɔ`; `bo/po/mo/fo` use `uɔ` | Supported. Labial-conditioned correction was source-aligned to the UW syllable chart and tested. Standalone `o` is still an edge inventory item, not an unsupported IPA key. |
| `rua` | `ɹwa` | Supported by the finite function. The CSV `жуа` value was retained; conflicting OCR `жува` was judged insufficient evidence to edit the row. This does not claim the form is a common productive Standard Mandarin syllable. |
| `ong` | `ʊŋ` | The broad-IPA release convention was adopted in the 2026-10-19 literature-based closeout; alternate published analyses remain documented. |
| `iong/yong` | `jʊŋ` | The broad-IPA release convention was adopted in the 2026-10-19 closeout; the old targeted note's unresolved status is historical and superseded for release purposes. |
| `üan/yuan` | `ɥɛn` | Broad-IPA convention adopted in the 2026-10-19 closeout; competing UCL notation remains documented. |
| standalone `er` | `əɹ` | Broad-IPA project convention adopted in the 2026-10-19 closeout. It is not a claim of universal narrow phonetic realization. |
| `m/n/ng` | `m̩/n̩/ŋ̍` | Explicit special mappings already exist. |

## Evidence hierarchy and guardrails

1. Use primary phonetic descriptions or studies for IPA analysis; a Ukrainian transcription table is evidence for that transcription system, not necessarily a complete IPA description.
2. Use original page images for disputed OCR-extracted table cells. Secondary comparison tables can corroborate a candidate but are not primary evidence.
3. Keep missing values in each Ukrainian system independent. The NANU blanks for forms absent from its official key set are source-coverage gaps, not permission to borrow another system's value.
4. Keep IPA output, Pinyin spelling, and Ukrainian practical transcription as separate layers. A supported Ukrainian CSV cell does not imply the IPA adapter can safely reach it.
5. Do not reopen settled broad-IPA conventions merely because an older dated register used the word “unresolved.” Use the later literature-based closeout unless new contradictory evidence or a reproducible defect is found.
6. A test verifies implementation consistency, not the truth of the expected linguistic value.

## Acceptance criteria for closing the four unsupported keys

For each of `ê`, `hm`, `hng`, and `yo`, the ledger must record:
- scope and attestation (standard syllable, marginal/interjectional form, or excluded form);
- source URL and precise page/table/rule or a stable archived source snapshot;
- whether the source establishes IPA directly or only Ukrainian practical transcription;
- chosen IPA key and tone behavior, or a reasoned explicit unsupported/out-of-scope status;
- expected Ukrainian output per system, preserving source blanks;
- unit test plus adapter test proving there is no fallback or cross-system fill.

## Current conclusion

No new IPA value is added in this reconciliation because the available evidence summarized in the existing repository does not establish all four mappings to the project's acceptance standard. The meaningful correction is to stop describing prior work as if it had never happened: the source history is preserved, already-adopted IPA conventions remain adopted, and the remaining work is limited to the four actual runtime gaps and their specific evidence requirements.


## Follow-up source screen: what can now be stated about ê and yo

This source screen adds evidence to the existing research; it does not claim that a safe runtime mapping has been established.

### ê

- The Chinese Ministry of Education's public answer on the Mandarin sound system explicitly includes **ê** in the Mandarin vowel inventory: https://www.moe.gov.cn/moe_879/moe_1252/s8447/201412/t20141204_179468.html. This supports that ê is not simply a malformed CSV key.
- The open-content *Chinese (Mandarin)* reference gives ê as [ɛ] and describes it as occurring in certain interjections: https://upload.wikimedia.org/wikipedia/commons/2/20/Chinese_%28Mandarin%29.pdf. This is useful direct notation evidence for a limited interjectional use, but it does not specify every tone or guarantee that the project's untoned CSV key represents the same target instance.
- Current decision: retain unresolved status until the exact scope and tone behavior of this CSV row are documented. Do not extrapolate the regular Pinyin final e [ɤ] to ê; they are distinct entries.

### hm and hng

- The Pinyin News research note on Mandarin interjections states that some interjections consist wholly of consonants and lists **ng, hm, hng** as syllabic interjection spellings: https://pinyin.info/news/2009/mandarin-interjections-in-pinyin/. This is useful evidence of orthographic/functional status, not a segment-level IPA transcription.
- The repository's earlier source ledger already records the Kirnosova (2009) OCR problem, secondary corroboration of the Ukrainian cells, and NANU source-key absence. That history is reused here; no new claim about the exact original table glyph is made.
- Current decision: keep both IPA keys unsupported until a source supports a defensible phonetic representation and the original Ukrainian table cells are visually verified where possible. The spelling alone does not establish whether a particular utterance should be represented with [m̩], [ŋ̍], [x], [h], or a different phonetic detail.

### yo

- The Pinyin News note explicitly records the Mandarin interjection “Yo!” and distinguishes it from English “yo”: https://pinyin.info/news/2009/mandarin-interjections-in-pinyin/.
- A Mandarin Pinyin pronunciation guide describes the special spelling **yo** as the i-series glide plus o and says it occurs as an interjection: https://www.friendlyskies.net/lang/chinese/files/B-hanyu_pinyin_pronunciation_guide_20101119.pdf. This supports treating yo as an attested exceptional form rather than a nonexistent key, but it is not a direct IPA transcription.
- Current decision: the form's existence/scope is better supported than the earlier wording implied, but exact IPA is still not directly established by these sources. Do not silently derive [jɔ] from ordinary y/o rules without recording that as an explicit project convention and verifying the expected pronunciation.

### Source-screen conclusion

The search narrows the uncertainty: ê is an acknowledged vowel used in limited interjections; hm/hng are attested consonant-only interjection spellings; yo is an attested exceptional interjection. It does **not** yet provide a sufficient direct IPA target for all three classes, especially the phonetic detail of hm/hng and the target instance/tone for ê/yo. Preserve current unresolved runtime behavior until the exact convention is deliberately documented and tested.
