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


## Provenance breakthrough: the apparent IPA match is explicitly speculative — 2026-10-23

A targeted exact-string search found an important source-trail limitation that changes how the Wikibooks table must be interpreted:

- The article [以《切韵》风格划分普通话韵部的尝试](https://read01.com/zh-sg/O308A7z.html), originally attributed to a Zhihu column and dated 2017-12-05, gives the exact notations `hŋ̍ (= ŋ̊ŋ̍)` for hng and `hm̩ (= m̊m̩)` for hm. However, the author explicitly frames the work as a personal, experimental transcription of their own Mandarin accent (lines 22–24, 35–37) and warns that it is not a final account and may contain errors (lines 297–298). Crucially, at lines 226 and 230, the author says the distinctions are being made based on the spellings and calls the split effectively an artificial “category-filling” exercise (“凑数”). Thus this is **not independent phonetic validation** of the IPA strings; it appears to be an explicit warning against treating them as measured or authoritative targets.
- The same article says the *Xinhua Dictionary* lists the spellings/characters (lines 221–230), but does not cite a dictionary IPA transcription or provide an instrumental analysis for these exceptional readings.
- The [International Phonetic Association historical-chart archive](https://www.internationalphoneticassociation.org/IPAcharts/IPA_charts_H/IPA_charts_H.html) documents historical uses of digraphs such as `hm`/`hŋ` for voiceless nasals in other transcription contexts. That is general notation history only: it neither establishes Mandarin interjection pronunciation nor validates the two-part syllabic sequences in the Wikibooks table.

### Revised evidence assessment

The Wikibooks table is still a direct-IPA *listing*, but the exact-string cross-match with the personal 2017 article reveals a plausible non-primary provenance, and that article explicitly describes its own analysis as spelling-driven and provisional. Unless an edit-history/source trail establishes a separate, authoritative basis for the table, the values `m̥m̩` and `ŋ̊ŋ̍` must be treated as **unverified candidate transcriptions with a concrete risk of circular derivation**, not as corroborated targets. Two websites repeating the same strings would not count as independent sources if one may derive from the other.

This is a meaningful narrowing of the blocker: we now have a plausible explanation for where the IPA candidates came from, and why their presence in a table is insufficient. The decisive next step is to inspect the Wikibooks revision history/source references and authoritative *Xinhua Dictionary* entry/phonetic notation, or obtain a peer-reviewed Mandarin phonetic description or documented recording. Until that establishes the exact realization, keep both runtime keys unsupported.

### Additional institutional corroboration and CI closure — 2026-10-24

New sources were checked after the prior assessment:

- Shaanxi Normal University's Language and Writing site, [普通话音系介绍](https://yywz.snnu.edu.cn/info/1116/2092.htm), explicitly describes Mandarin interjections such as `hm` (喑欠) and `hng` (哼) as exceptional syllables consisting only of consonants. This is useful institutional corroboration for their existence/classification, but it supplies no IPA for either item.
- Inner Mongolia Normal University's Putonghua training/testing site, [普通话语音分析](https://pc.imnu.edu.cn/info/1063/1097.htm), lists `hm` and `hng` among rare syllables omitted from a common syllable inventory, again without an IPA target or detailed articulation for the two forms.
- The dictionary entry [漢典: 噷](https://zdic.net/hant/%E5%99%B7) glosses the `hm` reading as `h` combined with a pure bilabial nasal and identifies its interjection use as admonishing/prohibiting. The entry does not supply a corresponding IPA transcription for this reading.
- The dictionary entry [漢典: 哼](https://zdic.net/hans/%E5%93%BC) describes the `hng` interjection as expressing doubt, contempt, disagreement, or disbelief. It does not give IPA for that reading. These dictionary pages corroborate lexical function and broad articulatory descriptions, not the candidate segment sequence.

Evidence distinction: institutional/educational and dictionary sources independently support that these are recognised exceptional interjections and that their written forms are not ordinary vowel-bearing Pinyin syllables. They do **not** independently establish `hm → m̥m̩` or `hng → ŋ̊ŋ̍`. In particular, descriptions such as “h + pure bilabial nasal” do not by themselves decide whether the realization should be represented as a single voiceless nasal, a sequence of a voiceless segment plus a syllabic voiced nasal, or another temporally/phonatorily structured realization. No audio sample with reliable provenance and a documented transcription convention was found in this pass.

### Exact-head CI result

Quality workflow [#40023287308](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40023287308) completed successfully on commit `a768c69f0c3ccdafb871f210767d71daba03a4c0`. All steps in the `verify` job passed: dependency installation/audit, unit and integration tests, acoustic-pipeline input guards, production build, generated-map determinism, conversion benchmark, release constraints, browser installation and browser regression tests, and QA/dependency-audit artifact uploads. This verifies that exact documentation-only branch head. It does not certify phonetic truth or substitute for manual device/accessibility review.

### Updated disposition

- Evidence that the two spellings/interjections exist: **DONE_VERIFIED**.
- Exact IPA target and provenance: **BLOCKED / evidence-limited**; acceptance criterion remains an authoritative phonetic notation or primary phonetic study / inspectable recording with documented conventions.
- Runtime/data/tests: unchanged; both keys remain unsupported.
- Do not merge PR #40 solely because CI is green. Keep the public beta/research-preview status and other independent release gates (data rights, legacy source-image collation, manual visual/accessibility/device QA).

### Scope control: conversational `hm` research is not evidence for lexical `hm` (2026-10-24)

A targeted search surfaced Qi Liu, “Prosody and Function of hm in Mandarin Conversation: Minimal Affirmatives vs. Backchannels” (SSRN, posted 2025-08-30; [paper landing/PDF](https://papers.ssrn.com/sol3/Delivery.cfm/9177254b-1b8d-460b-b9b4-07324f648523-MECA.pdf?abstractid=5421590&mirid=1)). Its abstract describes a corpus of 150 telephone conversations and prosodic comparisons of conversational `hm` tokens (pitch, duration, intensity). The PDF endpoint returned HTTP 403 in this research session, so methods, transcription conventions, and individual token realizations could not be inspected.

**Scope decision:** do not treat this study as direct evidence for the dictionary/romanization exceptional interjection `hm` associated with 噷. A discourse token conventionally written `hm` may be a hum-like nasal vocalization with context-dependent phonation/prosody; the shared Latin string alone does not establish that it is the same lexical item or phonetic target as consonant-only Pinyin `hm`. The study's accessible abstract does not give a directly inspectable IPA target for 噷, nor does it identify its tokens as that dictionary item. It is therefore a lead for a future source check, not accepted phonetic evidence for the converter.

A 2023 peer-reviewed study, Lee Mikyoung, “A study of the characteristics and types of interjections in Chinese” (*Journal of Chinese Language and Literature* 94:287–315, [DOI](https://doi.org/10.15792/clsyn..94.202312.287)), studies the Modern Chinese Dictionary's interjection inventory and notes irregular phonetic combinations in interjections. The accessible abstract does not supply an IPA treatment of the specific entries 噷/`hm` and 哼/`hng`; it cannot validate either proposed mapping.

A 2026 article hosted by Tongji University on conversational repair focuses on 啊 and 嗯 and discusses a Taiwanese [hãː] repair interjection. This is a different interactional phenomenon and is not evidence for Mandarin lexical `hm`/`hng` in the converter. [Source](https://wkxuebao.tongji.edu.cn/dqml/n2026/d37j_d1q/yyxyj.htm).

These exclusions are deliberate evidence hygiene: near-matches, discourse spellings, cross-dialect forms, and studies about interjection function must not be promoted to a source-specific IPA mapping without token-level identity and transcription provenance.


## Exact-head automated verification closure — 2026-10-24

Quality workflow [#40026479394](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40026479394) completed successfully on commit 7351044c8c051a248c6990c4b86d087b24266a35, the branch head for this evidence review. All 16 principal verification steps passed: dependency installation/audit disposition, unit and integration tests, acoustic-pipeline input guards, production build, generated-map determinism, conversion benchmark, release constraints, browser installation/regression tests, and QA/dependency-audit artifact uploads.

This closes the **automated exact-head CI** question only. It does not validate the proposed IPA strings or complete manual visual/accessibility/device review. The source-provenance blocker is unchanged: hm → m̥m̩ and hng → ŋ̊ŋ̍ remain unverified candidates, and both runtime keys must remain unsupported. No runtime/data/test behavior was changed by this review.


### Additional dictionary and dialect-scope cross-check — 2026-10-24

A targeted follow-up checked sources that could help prevent a false cross-variety match:

- Taiwan Ministry of Education, *Dictionary of Chinese Variant Forms*, entry [噷](https://dict.variants.moe.edu.tw/dictView.jsp?ID=81049&la=0), lists the readings xīn and hēn (Zhuyin ㄒㄧㄣ / ㄏㄣ), with historical/lexical explanations, but does not list the exceptional Mandarin hm reading in this entry. This is direct evidence about the scope of that particular Taiwan dictionary, not proof that Mainland Mandarin lacks the interjection; it supports the already noted variety boundary.
- The [Chinese Text Project dictionary entry for 噷](https://ctext.org/dictionary.pl?char=%E5%99%B7&if=gb&remap=gb) lists Mandarin readings xīn/hēn and Cantonese am1/hm1, alongside a CC-CEDICT gloss for hm. Its Cantonese hm1 is a **different variety-specific reading** and must not be used as phonetic evidence for Mainland Mandarin hm.
- A further character-reference site [Shidianguji](https://www.shidianguji.com/character/%E5%99%B7) lists hm as an interjection reading and gives a functional gloss, but no inspectable IPA or acoustic method. It corroborates the romanized reading/function, not the proposed IPA sequence.
- The [Shaanxi Normal University overview](https://yywz.snnu.edu.cn/info/1116/2092.htm) and [Inner Mongolia Normal University overview](https://pc.imnu.edu.cn/info/1063/1097.htm) independently describe hm/hng as exceptional consonant-only syllables; neither supplies direct IPA for these exact readings.

**Updated conclusion:** the additional sources sharpen lexical and dialect scope but do not move the IPA acceptance gate. The proposed m̥m̩ and ŋ̊ŋ̍ remain candidates reported by a community-maintained appendix, not independently validated targets. Keep both mappings unsupported until a primary phonetic source or a properly documented, inspectable recording resolves the actual segmental/phonation sequence and reading identity.


### Adjacent release-gate observation: visual-QA screenshot inspection — 2026-10-24

While checking the CI artifact, I inspected the generated converter and methodology screenshots. This is a limited static-image review, not a claim of live-device/accessibility certification.

- `methodology-320.png` and `methodology-360.png`: both comparison tables extend beyond the visible viewport; right-hand columns are clipped in the captured images. This is an actionable responsive-layout issue.
- Acceptance test: at 320px and 360px, all table content must remain reachable and readable using a keyboard-accessible horizontal-scroll container with a clear affordance, or a responsive semantically equivalent layout. Add a regression test and inspect regenerated screenshots.
- `converter-results-320.png`: result cards stack vertically without an obvious similar clipping issue. `methodology-desktop-1280.png`: comparison table appears fully visible at desktop width.

This finding is recorded as an independent release blocker, not included in the IPA-only PR's runtime scope. It does not change the phonetic evidence disposition for `hm` or `hng`.