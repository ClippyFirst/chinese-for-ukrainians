# Targeted adjudication: ong, iong, and standalone er (2026-10-19)

**Scope:** broad practical IPA for Standard Mandarin citation-form syllables. This note compares source analyses; it does not claim to provide speaker-specific narrow phonetics.

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
