# Targeted adjudication: ong, iong, and standalone er (2026-10-19)

**Scope:** broad practical IPA for Standard Mandarin citation-form syllables. This note compares source analyses; it does not claim to provide speaker-specific narrow phonetics.

> **Status reconciliation (2026-10-23):** this document preserves the evidence-gathering history and its earlier provisional “remain unresolved” wording. For the practical broad-IPA release decision, that wording is superseded by [the literature-based adjudication closeout dated 2026-10-19](./IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md), which adopts `ong → ʊŋ`, `iong/yong → jʊŋ`, and standalone `er → əɹ` as documented project conventions with caveats. Do not count these three classes as current runtime-unsupported keys or restart their research without new contradictory evidence or a reproducible defect. This does not claim universal narrow-phonetic truth.

## Decision summary

| Class | Current implementation | Competing published/reference analyses | Decision |
|---|---|---|---|
| `ong` | `ʊŋ` | UW raw chart and UCL finals table write `uŋ`; Nguyen Dinh Hien (2018) argues `[uŋ]`; other phonetic inventories use `[ʊŋ]` and some analyses treat `[wəŋ]` and `[ʊŋ]` as complementary | **Remain unresolved; no code change.** The difference `u` vs `ʊ` is vowel quality, not a mere glide-notation conversion. |
| `iong` | `jʊŋ` after an initial; zero-initial `yong → jʊŋ` | UW writes `yuŋ`; UCL gives `iʊŋ`; Nguyen (2018) argues `[yŋ]`; a five-vowel analysis represents `yong/-iong` as `[jʊŋ]` | **Remain unresolved; no code change.** The sources disagree about both the segment sequence and whether the high rounded element is a vowel or part of a glide sequence. |
| standalone `er` | `əɹ` | UW writes `ər`; Nguyen argues `[ɐɹ]`; other reference inventories use `[ɚ]` and discuss `[ɐɚ]` as a common current realization | **Remain unresolved; no code change.** The broad target needs a declared choice for central-vowel quality and rhotic representation. |

## Source comparison and evidential weight

1. **University of Washington syllable/finals charts** provide a transparent broad-transcription inventory and raw strings for the 403-key fixture. They are a valuable reference witness, but the raw symbols are not automatically the project's normalized broad-IPA targets. In particular, the chart's `uŋ`, `yuŋ`, and `ər` should remain visible in the comparison table rather than being silently normalized.
   - https://courses.washington.edu/chin342/ipa/syllables.html
   - https://courses.washington.edu/chin342/ipa/finals.html
   - https://courses.washington.edu/chin342/ipa/about.html

2. **UCL dissertation, finals table** records `ong /uŋ/`, `iong /iʊŋ/`, and `er` as a distinct final. It provides a second transcription system, not necessarily direct acoustic adjudication of all disputed segments.
   - https://discovery.ucl.ac.uk/id/eprint/10103942/1/A_speech_pattern_processing_me.pdf

3. **Nguyen Dinh Hien (2018), “Research on Several Points of Modern Chinese Final,” *Journal of China Studies* 21(2), 177–186**, explicitly argues for `ong [uŋ]`, `iong [yŋ]`, and standalone `er [ɐɹ]`. This is a direct competing analysis and must be represented as such, not treated as a universal consensus.
   - https://doi.org/10.20288/JCS.2018.21.2.177
   - Searchable abstract/record: https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002367336

4. **PhonoCollection's Standard Chinese inventory** lists both an IPA-U and IPA-L column, with `ong [ʊŋ]/[uŋ]`, `iong [jʊŋ]/[iuŋ]`, and `er [ɚ]`. This is a useful synthesis/comparison source, but not a substitute for primary acoustic evidence.
   - https://github.com/untunt/PhonoCollection/blob/master/Standard%20Chinese.md

5. **PolyU's compound-final guide** treats `iong` as a separate compound final and notes lip rounding during its `i` element because of the following `ong`. This supports attention to rounding, but it does not by itself choose between `[yŋ]`, `[iʊŋ]`, or `[jʊŋ]`.
   - https://www.polyu.edu.hk/bepth/introduction-to-phonetics/compound-finals/compound-final-groups/

## Why this does not justify an automatic fix

- A transcription table can encode a phonological analysis or pedagogical convention; it is not necessarily a direct acoustic measurement.
- The `ong` dispute concerns the target vowel quality [u] vs [ʊ].
- The `iong` dispute concerns segmental structure: a rounded front vowel [y], a high-vowel sequence, or a palatal glide plus [ʊ].
- The `er` dispute concerns central-vowel quality and rhotic representation, and must not be conflated with onset `r`, syllabic `ri`, or erhua.
- The current regression tests assert deterministic implementation behavior; they do not decide which competing analysis is phonetically correct.

## Exit criteria for changing code

Do not change any of these three mappings until the review records (a) the target dialect/variety, (b) intended transcription depth, (c) at least one source with direct phonetic/acoustic evidence relevant to the exact class, (d) why the chosen symbol sequence fits that evidence better than the alternatives, and (e) regression cases for the legal onset contexts. If the evidence supports more than one accepted broad analysis, state the project's convention explicitly instead of labelling alternatives incorrect.

**Outcome:** the 36-class register remains accurate in marking these three classes unresolved. No code change is made in this pass.


## Additional direct acoustic/articulatory evidence for standalone er (2026-10-19)

Chen, Whalen & Mok (2024), *Phonetica* 81(5), 509–552, DOI [10.1515/phon-2023-0023](https://doi.org/10.1515/phon-2023-0023), is more directly relevant to `er` than the chart-only sources above. The study recorded **18 native Mandarin speakers from northern China** with ultrasound and examined rhotics in onset position, syllable-nucleus position (`er`), and postvocalic/r-suffix position. The authors explicitly describe the nucleus-position rhotic as commonly transcribed either as a rhotacized vowel **[ɚ]** or a syllabic approximant **[ɹ̩]**; their own analysis uses **[ɹ̩]** for syllabic position. They report variation in tongue shape among syllabic/postvocalic rhotics and no significant F1–F3 differences between the two tongue-shape groups.

Primary source:
- Chen, Shuwen, Douglas H. Whalen & Peggy Pik Ki Mok (2024), “What R Mandarin Chinese /ɹ/s? – acoustic and articulatory features of Mandarin Chinese rhotics,” *Phonetica* 81(5), 509–552. https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/ ; https://doi.org/10.1515/phon-2023-0023

### What this evidence changes—and what it does not

- It upgrades the evidence base from competing tables to a direct multi-speaker articulatory/acoustic study of Mandarin rhotics in the relevant syllable position.
- It supports keeping `er` conceptually separate from onset `r` and from erhua. It also makes **[ɚ]** and **[ɹ̩]** explicit alternatives that should be evaluated against the project's chosen broad-output convention.
- It does **not** directly adjudicate whether this project's practical broad output should be `əɹ`, `ɚ`, or `ɹ̩`: the study describes a transcription convention and measures rhotic articulation, but does not supply a universal one-string broad-IPA target for all Standard Mandarin speakers. Its participants are northern Chinese speakers, and rhotic realization varies.
- Therefore the implementation remains unchanged for now. `er → əɹ` is still a provisional project convention, not a verified consensus mapping. A later decision should compare the three options for user interpretability, segmental consistency, and compatibility with the declared broad-IPA layer, and then add tests for `er` separately from onset `r`/`ri` and erhua.


## Follow-up literature screen: what current acoustic studies can and cannot decide (2026-10-19)

A targeted search for acoustic/formant work on the exact `ong` and `iong` finals found a recent open-access paper, “Acoustic Inspired Brain-to-Sentence Decoder for Logosyllabic Language” (*Cyborg and Bionic Systems*, 2025; DOI [10.34133/cbsystems.0257](https://doi.org/10.34133/cbsystems.0257); full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC12038182/).

### Relevance assessment

- The paper treats `ong` and `iong` as members of the Mandarin compound-final inventory and extracts F1/F2 features.
- Its reported simple-final experiment covers six simple finals and shows clustering; when compound finals are added, classification drops to 15.46% and is reported as not significantly above chance (P = 0.14).
- The reported results do **not** isolate a controlled `ong` comparison of [u] versus [ʊ], nor do they discriminate [yŋ] from [iʊŋ] or [jʊŋ] for `iong`. The paper is therefore not direct adjudicating evidence for the disputed mappings.
- The paper is retained here as a screened-out candidate, not promoted as a source that supports either transcription. It should not be added as affirmative evidence in the source ledger unless a specific table/experiment directly relevant to these contrasts is identified.

### Updated evidence conclusion

The targeted search has not yet found a high-quality multi-speaker acoustic study that directly distinguishes the project's exact competing hypotheses for both finals. Existing sources provide meaningful competing phonological analyses and teaching conventions, but those are not equivalent to a controlled acoustic adjudication. In particular:

1. `ong`: the [u] vs [ʊ] question requires vowel-quality measurements from the relevant standard-Mandarin population, with the vowel portion separated from effects of the velar nasal coda and tone.
2. `iong`: the [yŋ] vs [iʊŋ]/[jʊŋ] question requires temporal evidence as well as formants—especially whether there is a stable front-rounded vowel target, a changing vowel trajectory, or a separate palatal glide interval. A single midpoint F1/F2 measurement would not by itself establish the segment sequence.
3. The corpus should sample more than one onset class and tone, or explicitly model those factors; a single lexical token cannot support a class-wide rule.

**Implementation decision unchanged:** keep `ong → ʊŋ` and `iong → jʊŋ` as provisional declared outputs, not as fully scientifically verified targets. No mapping change is justified by this search result.


## Additional rhotic evidence pass (2026-10-19)

### Standalone `er`: broaden the competing-source set, not the conclusion

The University of Munich phonetics resource represents the rhotic nucleus as [ɚ] and separately illustrates productive rhotacization of existing finals (erhua). This is an independent teaching-source witness for [ɚ] as a legitimate broad representation. It does not decide between the project's [əɹ], Nguyen Dinh Hien's [ɐɹ], [ɚ], and syllabic-rhotic [ɹ̩] analyses.

- University of Munich, *Mandarin*: https://www.phonetik.uni-muenchen.de/studium/skripten/languagedemos/Demos/mandarin.html
- Chen, Whalen & Mok (2024), *What R Mandarin Chinese /ɹ/s?*, *Phonetica* 81(5), DOI https://doi.org/10.1515/phon-2023-0023. Their ultrasound/acoustic study includes 18 speakers from northern China and examines onset, syllabic, and postvocalic rhotics. It demonstrates articulatory variability and discusses [ɚ] versus [ɹ̩], but does not establish a universal project-specific broad string.
- Luo (first published online 2025), *The Articulatory and Acoustic Variability in Putonghua Onset /r/*, *Language and Speech* 69(2), DOI https://doi.org/10.1177/00238309251350082. This study concerns onset /r/, not standalone er: it reports tip-up retroflex and tip-down bunched postures, with onset /r/ most often produced without frication and characterized by low F3. It supports treating [ɹ] as a broad convention, but cannot adjudicate the standalone-rhotic nucleus.

**Separation rule:** onset `r-`, apical `-i` after `r/zh/ch/sh/z/c/s`, standalone `er`, and productive erhua are distinct categories. Evidence for one category must not be used as if it directly determined the transcription of another.

**Updated conclusion:** standalone `er → əɹ` remains provisional. The evidence base is now broader, but no single output is elevated to verified until the target variety and broad-transcription convention explicitly choose among the competing representations.
