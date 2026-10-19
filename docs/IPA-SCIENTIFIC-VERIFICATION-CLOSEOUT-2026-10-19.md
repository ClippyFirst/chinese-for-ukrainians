# IPA scientific verification — closeout of the current audit pass

**Date:** 2026-10-19  
**Branch:** `research/full-ipa-scientific-verification-2026-10-18`  
**Purpose:** record the outcome of the broad-IPA review without turning a complete audit pass into an unsupported claim of complete phonetic validation.

## Decision

**The review pass is closed; full scientific certification is not achieved.** The implementation can remain a research-preview feature with a declared broad-IPA convention and visible uncertainty. It must not be described as “fully scientifically verified,” “gold-standard IPA,” or error-free.

This is not a claim that the converter is generally unusable. It is the stricter conclusion that the current evidence does not justify a universal phonetic gold target for every class and all 403 reference keys. A complete inventory, source snapshots, reproducible differential, and passing regression tests establish coverage and software consistency; they do not substitute for independent phonetic evidence.

## What was completed

1. **Inventory/provenance baseline:** captured the University of Washington (UW) chart's 403 Pinyin keys and raw IPA strings in `tests/fixtures/uw-mandarin-syllables-ipa-reference.csv`.
2. **Reproducible differential:** committed a 403-row comparison of raw UW strings with current converter outputs, plus a generator/check command. The recorded snapshot is 403 covered keys, 0 missing outputs, 165 literal string matches, and 238 literal string differences. These are string relations, not accuracy scores.
3. **Final-class register:** reviewed all 36 canonical final classes and aliases in `IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md`.
4. **Cross-class regression:** added representative tests for high-risk combinations, including palatalized ü-spellings, nasal classes, contractions, labial `o/uo`, and `ong/iong` distinctions.
5. **Source ledger:** the ledger test currently asserts 81 evidence rows and a nine-column schema, including a record for the 2024 multi-speaker Mandarin rhotic study.
6. **Targeted dispute review:** documented the evidence conflict for `ong`, `iong`, and standalone `er`, including a follow-up literature screen for acoustic work. The candidate 2025 formant-classification paper does not directly discriminate the disputed analyses, so it was not promoted as affirmative evidence.
7. **Scope boundaries:** citation-form lexical tones remain separate from tone sandhi, neutral tone is not assigned a universal contour, and lexical tone legality is not checked by the segmental renderer.

## Evidence interpretation

The sources serve different roles and must not be treated as interchangeable:

- **UW Mandarin syllable chart and finals chart:** useful broad transcription and inventory witnesses, but their symbol conventions are not automatically identical to ordinary IPA.
- **UCL dissertation:** an independent finals-table comparison, useful for exposing competing analyses (`ong /uŋ/`, `iong /iʊŋ/`, `üan /yɑn/`, `er /ɚ/)); it is not a multi-speaker acoustic gold table.
- **OSU and PolyU teaching resources:** useful descriptions of vowel categories, final groups, contractions, and pronunciation context; they do not validate every converter output in every legal onset context.
- **Liu (2026):** quantitative evidence for context-conditioned Mandarin /a/-class realizations, including a back [ɑ]-type class before -u/-ŋ. Its reported sample is one speaker, so it supports a broad convention decision with a sample caveat rather than universal narrow transcription.
- **Nguyen Dinh Hien (2018):** a published competing analysis proposing `ong [uŋ]`, `iong [yŋ]`, and `er [ɐɹ]`. This is material disagreement, not grounds to mechanically replace current outputs.
- **Chen, Whalen & Mok (2024):** acoustic/articulatory evidence on Mandarin rhotics from 18 northern Chinese speakers. It supports treating rhotic realizations as variable and keeping onset `r`, syllabic `ri`, standalone `er`, and erhua separate; it does not establish one universal standalone-`er` transcription.
- **University of Munich phonetics resource:** independently uses `[ɚ]` for the rhotic nucleus and distinguishes restricted apical syllabic approximants from productive erhua. This confirms that `[ɚ]` is a legitimate competing broad representation; it does not, by itself, prove that the converter's `[əɹ]` is wrong or right.
- **Luo (first published online 2025), *Language and Speech*:** a separate ultrasound/acoustic study of Putonghua onset `/r/` finds both tip-up retroflex and tip-down bunched tongue postures, with little or no frication in most tokens and a low F3. This strengthens the rationale for a broad approximant-style output but confirms that `[ɹ]` must not be presented as a universal narrow realization.

## Final status by domain

| Domain | Audit outcome | Why this is not a full verification claim |
|---|---|---|
| Initial inventory and aspiration | Partially corroborated; broad convention documented | Representative class coverage is present, but the whole onset-by-final grid has not been independently checked against a phonetic gold corpus |
| Palatal, retroflex, and velar/glottal initials | Partially corroborated / convention-sensitive | Place/diacritic choices depend on broad-transcription conventions and speaker variation |
| Ordinary simple vowels | Partially corroborated | Symbol choices and conditioned allophones differ across sources; no independent gold target for every legal context |
| Diphthongs and triphthongs | Partially corroborated; some broad conventions documented | Not every class has independent acoustic corroboration across onset and tone contexts |
| Nasal finals | Mixed; `ang/iang/uang` broad [ɑ]-type choice has qualified support | `ong` remains disputed between [uŋ] and [ʊŋ] |
| i-/u-/ü-medial finals and orthographic aliases | Partially corroborated / convention conversion | The phonological sequence, glide notation, and contracted Pinyin spelling are not interchangeable; `iong` and `üan` remain unresolved |
| Apical vowels | Broad convention documented, still partially verified | [ɹ̩]/[ɻ̩] is a defensible broad analysis but not a speaker-invariant narrow realization |
| Standalone `er` and rhotics | Unresolved for standalone `er`; onset `r` convention selected | [əɹ], [ɐɹ], [ɚ], and syllabic-rhotic analyses are not equivalent; erhua is a distinct process |
| Tone suffixes | Deterministic renderer tested as a scope-specific feature | Lexical tone legality and connected-speech tone realization are not implemented by this function |
| 403-key output coverage | Complete for the captured UW key set | Coverage does not establish acoustic correctness; source-key scope is not identical to every possible marginal/interjectional form |

### Explicitly unresolved classes

- **`ong`:** current `ʊŋ`; competing `uŋ`. No change without target-population acoustic evidence and an explicit broad-transcription decision.
- **`iong/yong`:** current `jʊŋ`; sources propose or imply `yŋ`, `iʊŋ`, and other glide/nucleus analyses. A midpoint formant comparison alone would not settle the segment sequence.
- **`üan/yuan`:** current `ɥɛn`; competing source gives `yɑn`. Evidence is limited and conventions differ.
- **Standalone `er`:** current `əɹ`; alternatives include `ɐɹ`, `ɚ`, and syllabic rhotic analyses. It must not be inferred from onset `r` or erhua.
- **Apical series:** the broad `ɹ̩/ɻ̩` choice is documented, but a universal narrow phonetic claim would be unjustified.
- **Other class-level decisions:** exact `a/ɑ`, `o/ɔ`, `e/ɤ/ə`, diphthong offglides, `ü)-series glide notation, and contracted `iu/ui/un` need representative independent checks across all legal onset families before class-wide certification.

## What would be required to claim “fully scientifically verified”

These are evidence gates, not a request to change expected outputs until tests turn green:

1. **Freeze the target convention:** define the target variety (e.g. Standard Mandarin/citation forms), broad vs narrow transcription, treatment of approximant glides, rhotics, apical vowels, vowel offglides, tone letters, and whether allophonic detail is intentionally collapsed.
2. **Establish a versioned independent reference set:** for every supported legal syllable, record the source, exact passage/table/recording, target variety, tone/context, and the reason the source supports the selected output. Do not derive the expected set from `src/app/ipa.js`.
3. **Resolve convention-sensitive finals:** obtain primary evidence adequate to adjudicate `ong`, `iong`, `üan`, standalone `er`, apical vowels, and the disputed vowel symbols. For acoustic claims, use more than one native speaker and more than one lexical/onset context; analyze trajectories for diphthongal sequences rather than relying only on a single midpoint.
4. **Cover onset-conditioned behavior:** test every legal initial–final combination against independent evidence, while explicitly classifying marginal, interjectional, syllabic-nasal, and source-absent forms instead of silently treating them as ordinary CV syllables.
5. **Validate tones independently:** test numeric and diacritic input, tone-suffix rendering, neutral-tone policy, punctuation/spacing, and malformed input. Keep lexical tone legality and sandhi either separately implemented and tested or explicitly out of scope.
6. **Run the complete repository gate on the exact final commit:** unit/integration tests, generated differential check, production build, release checks, and browser/accessibility regressions. A prior green commit does not certify later commits.
7. **Review the final gold fixture independently:** the reviewer must not be the same process that authored the expected strings; report false positives/negatives and all exceptions.

## Current implementation decision

No IPA mappings were changed in this closeout. Preserve the existing provisional outputs until evidence justifies a specific change. In particular, keep `ong → ʊŋ`, `iong/yong → jʊŋ`, `üan/yuan → ɥɛn`, and standalone `er → əɹ` marked **provisional**, not verified.

The earlier branch head `6af000f8bd9ceb4d0592ee4866fa4f1b540d18ff` had a successful GitHub Actions `Quality checks` run (`39209946069`). That result validates that head only; subsequent source-ledger/test changes still need a run on the exact current head. A green workflow is software validation, not scientific certification.

## Primary links

- [Scientific verification matrix](./IPA-SCIENTIFIC-VERIFICATION-MATRIX-2026-10-18.md)
- [36-class final adjudication register](./IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md)
- [Targeted `ong` / `iong` / `er` adjudication](./IPA-ONG-IONG-ER-ADJUDICATION-2026-10-19.md)
- [Targeted `üan` adjudication](./IPA-UAN-LOW-VOWEL-ADJUDICATION-2026-10-19.md)
- [403-key differential methodology](./IPA-UW-403-DIFFERENTIAL-METHODOLOGY-2026-10-18.md)
- [Phonetic source ledger](./PHONETIC-SOURCE-LEDGER-2026-10-18.csv)
