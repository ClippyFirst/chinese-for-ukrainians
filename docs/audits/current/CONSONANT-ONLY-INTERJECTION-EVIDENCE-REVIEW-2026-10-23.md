# Consonant-only Mandarin interjections: evidence review — 2026-10-23

## Purpose

Reassess whether the project's two intentionally unsupported Pinyin aliases, `hm` and `hng`, can be assigned a defensible broad-IPA value using newly located sources. This is an evidence review, not a runtime change.

## New evidence found

### 1. Yuen Ren Chao / Yin Binyong, *Chinese Romanization: Pronunciation and Orthography*, section on interjections

Public PDF: https://pinyin.info/readings/yin_binyong/o09_interjections.pdf

The text says that some Mandarin interjections are composed wholly of consonants and lists `ng`, `hm`, and `hng`; it says these are treated as ordinary syllables in the romanization system. This is useful primary/near-primary evidence for their status as recognized interjectional forms and for the fact that the spelling is not necessarily an invalid ordinary lexical syllable.

**It does not supply IPA symbols, articulatory descriptions, audio, a measured acoustic realization, or enough contextual detail to map each spelling to one unique segmental IPA form.** Therefore it cannot justify adding `hm` or `hng` to the IPA map by itself.

### 2. TDSF Chinese-to-Ukrainian converter documentation

https://www.tdsf.kiev.ua/convertor.php

The converter documentation says it excludes `hm`, `hng`, `m`, `mm`, `n`, and `ng` found in an Oshanin table because they are rare and their conversion can cause input ambiguity (example: a string can be parsed as two adjacent units instead of one rare form).

This is evidence of a practical converter's scope decision and input-tokenization risk. It is **not** evidence that these forms have no pronunciation, nor does it establish an IPA target. The current project must not adopt this exclusion as a linguistic rule without separately documenting its own scope.

### 3. Prior interjection-attestation source

Pinyin News: https://pinyin.info/news/2009/mandarin-interjections-in-pinyin/

This source also attests spellings such as `hm` and `hng`. It establishes written usage, but not the precise phonetic realization needed by the IPA-first adapter.

## Decision

Keep both keys deliberately unsupported in runtime:

- `hm`: no IPA value is added.
- `hng`: no IPA value is added.

This is an evidence-limited implementation decision, not a claim that the forms are invalid, unpronounceable, absent from Mandarin, or forever impossible to transcribe. Do not add a guessed mapping such as `hm → h+m̩` or `hng → h+ŋ̍` merely by concatenating plausible phone symbols. A spelling may encode a conventional interjection without uniquely specifying a context-free segmental realization.

The adapter must continue to fail closed for these keys: no Pinyin-based Ukrainian fallback, no invented IPA, and no cross-filling among Ukrainian source systems.

## Acceptance criteria to reopen the decision

Reopen only when at least one source supplies directly relevant phonetic evidence for the same Mandarin variety and interjectional use. Suitable evidence could include:

1. a scholarly phonetic/phonological description that explicitly transcribes the form in IPA and explains its scope;
2. a reputable pronunciation dictionary with audio plus a documented transcription convention; or
3. a citable, licensed speech corpus with token context and enough speaker/audio metadata to inspect the realization.

For each proposed mapping, record the exact source passage or stable item identifier, dialect/variety, discourse context, tone/intonation if specified, whether the transcription is broad or narrow, and the limits of generalization. If sources disagree or realizations vary, retain an explicit unresolved result or model the variation; do not collapse it to one value for convenience.

## Effect on current inventory and release status

No source code, mapping data, generated artifacts, or tests are changed by this evidence review. The existing inventory remains 421 Pinyin aliases, 419 IPA-supported keys, exactly two intentionally unsupported keys (`hm`, `hng`), and zero IPA-key collisions, as tested by the existing Quality workflow on the implementation PR.

This finding does not close the separate legacy Ukrainian source-image collation, third-party data-rights review, live visual/device QA, or publication-readiness gates. The service remains a public beta / research preview; no stronger release claim follows from these sources.


## Additional direct-IPA lead found during follow-up — 2026-10-23

A targeted search located a Chinese Wikibooks appendix, [现代标准汉语/附录/边缘音系](https://zh.wikibooks.org/wiki/现代标准汉语/附录/边缘音系), whose table explicitly labels an IPA column and lists:

- `hm` → `m̥m̩`, illustrated with 噷 and a high-level tone marker in the accompanying Chinese transcription;
- `hng` → `ŋ̊ŋ̍`, illustrated with 哼 as an exceptional interjectional reading.

The page describes these as marginal/edge syllables of Modern Standard Chinese and distinguishes Mainland dictionary coverage from Taiwan-standard coverage. This is materially stronger than spelling-only attestation because it supplies actual IPA strings and a stated scope.

**Evidence quality limitation:** the page is collaboratively edited and does not cite the primary dictionary, phonetic study, recording, or corpus from which these exact IPA strings were taken. A web search for the exact IPA strings did not independently surface a primary Mandarin source corroborating both mappings. A superficially similar `hng` IPA entry in a Teochew resource concerns a different Sinitic variety and must not be treated as Mandarin evidence. Mandarin dictionaries found in this pass corroborate the existence and functional use of these interjections, but the accessible entries do not themselves establish these exact IPA strings.

Therefore this is recorded as a **direct-IPA candidate requiring provenance verification**, not as an accepted primary-source adjudication. Do not change runtime behavior on the basis of this page alone. The next concrete research action is to trace the table's IPA column to its cited/underlying Mainland phonetic dictionary or scholarly phonetic description, or locate a documented Mandarin recording/corpus token whose transcription convention is inspectable. If that provenance cannot be established, keep the two forms unresolved.

This distinction avoids two opposite errors: ignoring a useful, specific IPA lead, and treating an uncited collaborative table as independently verified phonetic ground truth.
