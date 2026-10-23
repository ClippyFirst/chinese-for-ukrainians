# Edge-form research reconciliation — 2026-10-23

## Why this record exists

The repository repeatedly surfaced the same unusual Pinyin forms in separate audits. This led to a misleading impression that every previously discussed form was still an unresolved release blocker. This reconciliation separates (A) forms the current runtime cannot map to IPA, (B) forms whose Ukrainian source rows have known values but need better primary-source verification, and (C) IPA classes whose broad-IPA release convention was already adopted in the 2026-10-19 closeout.

This is a state reconciliation, not a claim that the source dataset is fully linguistically or legally verified.

## Runtime facts checked against current main

The implementation in `src/app/ipa.js` uses a finite `FINALS` map plus explicit special forms. The adapter audit in `scripts/audit-ipa-adapter-readiness.mjs` reports 421 Pinyin aliases, 417 keys with IPA output, four unsupported keys and no IPA-key collision groups. The production adapter has no Pinyin fallback for a missing IPA key.

The four unsupported keys are `ê` (CSV row 82), `hm` (125), `hng` (126), and `yo` (378). This is a code-coverage fact, not a statement that the forms are newly discovered or have never been researched.

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
