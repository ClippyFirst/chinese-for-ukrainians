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


## Independent corroboration pass — 2026-10-23

A second targeted search found two additional sources that narrow the uncertainty but do **not** yet justify runtime acceptance:

1. **Unicode WG2 document N4717, “Bopomofo”** ([PDF](https://www.unicode.org/L2/L2016/16106-n4717-bopomofo.pdf), page 2) tabulates syllabic-nasal spellings hm and hng alongside the corresponding Zhuyin forms used in *Xiàndài hànyǔ cídiǎn* (现代汉语词典) and *Guóyǔ cídiǎn* (國語辭典). This is a standards-working-group document useful for cross-checking dictionary notation and the distinction between Mainland and Taiwan dictionary conventions. It does not supply the target IPA strings, nor does the table alone establish a specific acoustic realization.

2. A searchable digitization of *Xinhua Dictionary* ([PDF](https://math.wvu.edu/~hlai2/My_Dictionary_CHN.pdf), printed page 184) glosses hm as an interjection formed by h plus a pure bilabial nasal, and hng as an interjection formed by h plus a pure velar nasal. This gives a dictionary-level articulatory description, but the accessible text does not state the exact IPA sequence, voice quality, duration, tone, or contextual variation. Because this is a digitized copy hosted outside the publisher's own platform, it is a lead for verification, not a rights-cleared project dataset.

The cross-check strengthens the conclusion that these are recognized exceptional syllabic-nasal/interjection readings rather than accidental romanization strings. It still does not independently establish that the Wikibooks values m̥m̩ and ŋ̊ŋ̍ are the right project-wide targets for the same variety, register and context. In particular, a descriptive “h + nasal” spelling is not sufficient to infer whether h represents a separate segment, a voiceless onset/transition, or another dictionary-specific convention.

### Updated evidence classification

- Orthographic/lexical existence: **corroborated** by romanization discussion and dictionary-related sources.
- Direct candidate IPA: **located** in Wikibooks, with explicit Modern Standard Chinese scope.
- Independent primary-source confirmation of those exact IPA values: **not yet established**.
- Runtime decision: **unchanged; both keys fail closed**.
- Next acceptance action: inspect the cited dictionary entry in an authoritative edition and its phonetic notation/legend, or locate a peer-reviewed phonetic analysis or documented Mandarin audio token. Record the exact edition/page/item and notation convention before changing the mapping. The Unicode WG2 table is a corroborating reference, not a substitute for phonetic verification.


## Dictionary-entry and expert-explanation cross-check — 2026-10-23

A further search found directly accessible dictionary-style entries and a report quoting the *Xinhua Dictionary* revision team:

- [漢典 entry for 噷](https://zdic.net/hant/%E5%99%B7) lists the interjectional reading hm and describes it as h combined with a pure bilabial nasal; it gives the use as an interjection expressing reprimand or prohibition. Its IPA section lists the other readings of the character, not an IPA transcription of this hm reading.
- [漢典 entry for 哼](https://zdic.net/hant/%E5%93%BC) lists hng as a separate interjectional reading and describes it as h combined with a pure velar nasal. Its IPA section's visible values are for other readings, not a direct IPA transcription of the exceptional hng reading.
- A 2026 report published by China.com.cn, [“科学回应公众关切”](https://cul.china.com.cn/2026-06/12/content_43447236.htm), quotes the revision team’s response that pure-consonant syllables including hm and hng occur in spoken interjections, that phonetics textbooks such as 《语音学教程》 discuss them, and that *Xinhua Dictionary* records these forms and briefly explains their pronunciation. This is useful attribution toward a primary dictionary and a phonetics textbook, but the report itself does not reproduce an IPA transcription or identify a specific page/edition of the textbook.

These results improve the source trail: the Wikibooks IPA candidates are consistent with dictionary descriptions of h plus a bilabial/velar nasal, and the dictionary entries establish the interjectional readings. They still do not establish the precise narrow/broad transcription, the representation of the voiceless interval, syllabic diacritic, or contextual realization independently of Wikibooks. In particular, 汉典 is a secondary dictionary portal, and its generic IPA section must not be misread as transcribing the exceptional hm/hng readings.

**Decision remains unchanged.** The candidates m̥m̩ and ŋ̊ŋ̍ are now supported by converging *descriptive* evidence but remain unverified as exact IPA targets. Next decisive action: inspect the actual *Xinhua Dictionary* 13th edition entry/legend and cited phonetics-textbook discussion, or obtain a documented Mandarin recording and phonetic analysis. Capture bibliographic details and the precise passage; then decide whether one broad IPA mapping is justified or whether context/variation needs explicit representation. Do not infer an IPA mapping merely by converting the dictionary's romanized explanation “h + nasal” into IPA.
