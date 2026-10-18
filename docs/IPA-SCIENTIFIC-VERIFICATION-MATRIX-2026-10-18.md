# Scientific verification matrix for the broad-IPA layer

**Status:** active research audit; this is not a linguistic certification.
**Target:** `src/app/ipa.js` and the Pinyin syllable inventory consumed by the converter.
**Scope:** standard Putonghua citation-form segmental IPA and lexical tone notation. Connected-speech rules are a separate layer and are not silently implied.

## Evidence policy

A test is not evidence for its own expected value. Each expected IPA value must be supported by at least one source that explicitly states its transcription convention; convention-sensitive decisions should be cross-checked against a second independent source. Where sources use sinological symbols or a different broad transcription, record the conversion between conventions rather than requiring literal string equality. If the evidence does not decide a value, mark it unresolved and do not promote a provisional output to a gold target.

Use:
- **verified** — convention and output supported by suitable source(s), with a concrete regression fixture;
- **partially verified** — some examples or one part of the class checked, but class-wide coverage or independent corroboration is missing;
- **convention decision needed** — several legitimate analyses/transcription conventions exist;
- **unresolved** — evidence does not currently support a single expected output;
- **out of scope** — intentionally not implemented by the citation-form converter.

## Current status matrix

| Domain | Current implementation | Evidence / concern | Status | Required action |
|---|---|---|---|---|
| Inventory coverage and raw-source provenance | 403 keys from the University of Washington (UW) chart must map to a non-empty output; `tests/fixtures/uw-mandarin-syllables-ipa-reference.csv` now preserves the chart's raw IPA notation for each key | Source snapshot is checked against the 403-key inventory; raw UW symbols are not directly equal to the project's ordinary-IPA convention | partially verified | Keep coverage and source-snapshot integrity separate from normalized phonetic-accuracy gates; attach an explicit conversion/adjudication before treating any row as gold |
| Initials: aspiration | Pinyin b/p, d/t, g/k, j/q, zh/ch, z/c pairs use unaspirated/aspirated IPA pairs | `tests/ipa-initials-crosscheck.test.mjs` covers all 21 onset classes; UW's syllable chart gives the corresponding symbols, and Munich's phonetics teaching resource explicitly documents the six aspiration contrasts | partially verified | Keep the broad place/manner symbols explicit; add a multi-context corpus if the output is to be claimed as independently validated beyond representative forms |
| Velar and glottal fricatives | h → [x] | Realization varies by context and speaker; [x] is a broad convention | convention decision needed | Explicitly define the broad target and test examples without claiming narrow realization |
| Palatal initials | j/q/x → [tɕ, tɕʰ, ɕ] | Conventional broad IPA; exact place/diacritics vary across analyses | partially verified | Confirm with an independent phonetics source and document the chosen level of detail |
| Retroflex series | zh/ch/sh → [ʈʂ, ʈʂʰ, ʂ]; onset r → [ɹ] after source-backed correction | UW uses [ɹ] for onset r; a 2024 articulatory/acoustic study found bunched onset rhotics and optional frication in its sample | partially verified | Keep onset r distinct from ri, er, and erhua; retain broad-scope caveat for speaker variation |
| Apical vowels after z/c/s vs zh/ch/sh/r | [ɹ̩] vs [ɻ̩] | Lee-Kim (2014) supports a sonorant/approximant analysis; independent literature documents [ɹ̩]/[ɻ̩] as broad Standard Mandarin notation, while [ɿ]/[ʅ] are sinological symbols rather than ordinary IPA | partially verified | Broad convention decision recorded with caveat; keep all seven regression cases and avoid claiming speaker-invariant narrow IPA |
| Simple vowels | a, o, e, i, u, ü | Current mappings are a/ɔ/ɤ/i/u/y; sources differ in vowel quality symbols and the status of Mandarin vowel categories. Wu & Shih (2009) report context-conditioned acoustic/articulatory differences, but studied one Taiwan Mandarin speaker and do not provide universal gold strings | partially verified | Compare the full class against two sources with explicit conventions; avoid equating Pinyin letters with IPA and keep sample limits explicit |
| Diphthongs | ai/ei/ao/ou → aɪ/eɪ/aʊ/oʊ | Notation is conventional and should represent the glide trajectory, not merely copy Pinyin | partially verified | Verify each final class, including tone-marked input and all legal onset combinations |
| Nasal finals | an/en/ang/eng and derived finals | Converter uses a/ɑ and ə distinctions; chart conventions differ | partially verified | Check place/quality and the derived i-/u-/ü-series as separate classes |
| i-series finals | ia/ie/iao/iu/ian/in/iang/ing/iong | Uses j glides and several conventional vowel qualities; for `iong`, UW writes `yuŋ`, UCL gives `iʊŋ`, and Nguyen Dinh Hien (2018) argues for `[yŋ]`. These differ in segment sequence and vowel/glide analysis; see [targeted `ong` / `iong` / `er` adjudication](./IPA-ONG-IONG-ER-ADJUDICATION-2026-10-19.md) | unresolved for `iong`; partially verified for other classes | Verify all finals and their zero-initial aliases separately; adjudicate whether `iong/yong` contains [j], [ɥ], or [y] and whether a separate [u] nucleus is present |
| u-series finals | ua/uo/uai/ui/uan/un/uang/ong | Uses w glides; ui/un are contracted Pinyin spellings. `ong` has a substantive [u] vs [ʊ] disagreement across sources | partially verified; `ong` unresolved | Validate underlying/contracted analyses against independent sources; ensure zero-initial and onset forms are consistent; see the targeted `ong` adjudication note |
| ü-series finals | ü/üe/üan/ün | Source chart gives üe as yɛ; in the project's glide notation this is ɥɛ. The prior ɥe mapping omitted the open-mid vowel quality and is corrected in this branch. Other ü-final classes still need class-wide adjudication. | partially verified | Keep regression cases for n/l/j/q/x/y forms; verify üan/ün and all legal combinations independently |
| Pinyin o after b/p/m/f | context-specific uɔ; standalone o stays distinct | UW chart and PolyU guide support the short/weak u component in bo/po/mo/fo | partially verified | Keep four regression cases; separately adjudicate standalone o and rare/interjectional status |
| Zero-initial y/w spellings | y/w aliases normalize to vowel/glide outputs; `wo` now maps to `uɔ` per the UW syllable chart rather than `wo` | Orthography is not a direct phoneme sequence; glide notation differs by transcription convention | partially verified | Compare each legal zero-initial family against its onset counterpart and independently validate expected output; decide consistently how to render glide-like `u` in ordinary IPA |
| er and erhua | standalone `er` → `əɹ`; productive erhua is not implemented as a general connected-speech process | UW's syllable chart gives `ər` while its finals page gives `əɹ`; Nguyen argues for `[ɐɹ]`, and other broad inventories use `[ɚ]`. These differ in central-vowel quality and rhotic notation | unresolved for standalone `er`; out of scope for productive erhua | Keep standalone `er` separate from onset `r`, syllabic `ri`, and erhua; see [targeted adjudication](./IPA-ONG-IONG-ER-ADJUDICATION-2026-10-19.md) and do not imply a universal narrow target |
| Syllabic nasals m/n/ng | m̩/n̩/ŋ̍ | Edge forms are not ordinary CV syllables and have limited lexical distribution | partially verified | Confirm symbol choice and source scope; add dedicated fixtures, not just generic inventory tests |
| Tone suffix renderer | Numeric 1–4 append ˥, ˧˥, ˨˩˦, ˥˩; 0/5 append no contour | This is a deterministic formatter, not a lexicon or legal-tone validator. Not every syllable accepts every tone (PolyU notes that standalone er does not occur with first tone). | partially verified | Keep renderer tests separate from lexical tone legality; use a lexicon-backed validity layer if invalid combinations must be rejected |
| Neutral tone | no fixed contour for tone 0/5 | Neutral-tone pitch and duration depend on context; absence of a contour is a design choice for this segmental/citation layer | verified as a scope decision | Preserve this behavior; never describe neutral tone as a fixed mid-level tone |
| Third-tone sandhi | not applied | Academic descriptions confirm third-tone sandhi and contextual realization; this layer currently renders lexical/citation tones | out of scope | Keep it explicit in UI/docs; any future surface-tone mode must be a separate contextual engine with its own tests |
| yi/bu tone alternations and other connected-speech effects | not applied | These require lexical, syntactic/prosodic and contextual analysis | out of scope | Do not add context-free rewrites to this converter |

## High-priority testable questions

1. **Ü-final glide notation:** The UW chart gives `nüe/ lüe` as `nyɛ/lyɛ`; the converter now renders `nɥɛ/lɥɛ`, converting the chart's glide-like `y` to ordinary IPA `ɥ` while preserving `ɛ`. Confirm this glide-vs-vowel analysis against a second phonetic source and document whether it is appropriate after `n/l` as well as in `j/q/x/y` contexts.
2. **Apical segments:** Is `ɹ̩/ɻ̩` the most defensible broad IPA representation for the dental and retroflex apical segments, given articulatory/acoustic work arguing for approximant-like segments? If changing it, document the analysis and migration impact.
3. **R onset:** The branch now uses `ɹ`, matching the UW broad chart and avoiding an unsupported universal retroflex claim. Keep this as a broad convention, not a narrow description of all speakers.
4. **Vowel qualities:** Confirm `a` vs `ɑ`, `e` vs `ɤ/ə`, `o` vs `ɔ`, and `ong` / `iong` independently. The UW chart is a convention reference, not an automatic IPA gold file.
5. **`iong/yong` medial:** UW's chart gives `yuŋ` and explicitly says it uses `y` for the rounded-palatal glide /ɥ/; a University of Hawaiʻi teaching chart gives `iong [juŋ]` but contains apparent IPA errors elsewhere, so it is only a low-weight conflicting witness. Liu (2026, *Glossa*) treats Mandarin [j], [ɥ], and [w] as distinct glides in consonant–glide onsets, but does not directly analyze the `iong` final. Establish the intended segment sequence from a primary phonetic source before promoting the current `jʊŋ` output to gold.
6. **Contracted spellings:** Validate `iu/ui/un` and `you/wei/wen` as coherent phonetic representations, while preserving distinctions between orthographic spelling and surface segment sequence.
7. **Tones:** Confirm that the chosen tone-letter contours are explicitly defined as citation-form broad targets; keep sandhi outside this function.

## Evidence base to consult

- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
- University of Washington, *Mandarin IPA finals*: https://courses.washington.edu/chin342/ipa/finals.html
- University of Munich, *Mandarin fricatives, affricates and tone*: https://www.phonetik.uni-muenchen.de/studium/skripten/languagedemos/Demos/mandarin.html
- Hong Kong Polytechnic University, *Simple Finals*: https://www.polyu.edu.hk/bepth/introduction-to-phonetics/simple-finals/
- Ohio State University, *IPA Mandarin* vowel chart (2023; updated 2025): https://ielp.ehe.osu.edu/files/2025/09/IPA_Mandarin.pdf
- Humanities LibreTexts, *The Sound System of Mandarin*: https://human.libretexts.org/Bookshelves/Languages/Chinese/CHN101_Elementary_Mandarin_I_Textbook/01%3A_Introduction/1.01%3A_The_Sound_System_of_Mandarin
- Lee-Kim, Sang-Im (2014), *Revisiting Mandarin 'apical vowels': An articulatory and acoustic study*: https://scholar.nycu.edu.tw/en/publications/revisiting-mandarin-apical-vowels-an-articulatory-and-acoustic-st/
- *What R Mandarin Chinese /ɹ/s? Acoustic and articulatory features of Mandarin Chinese rhotics* (2024): https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/
- University of Munich, *Mandarin* (tone contours and tone-sandhi demonstrations): https://www.phonetik.uni-muenchen.de/studium/skripten/languagedemos/Demos/mandarin.html
- *The role of phonological alternation in speech production: evidence from Mandarin tone sandhi*: https://pmc.ncbi.nlm.nih.gov/articles/PMC4066894/
- Wu, Chen-Huei, and Chilin Shih (2009), “Mandarin Vowels Revisited: Evidence from Electromagnetic Articulography,” *Proceedings of the 35th Berkeley Linguistics Society*: https://doi.org/10.3765/bls.v35i1.3622. This one-speaker EMA/acoustic study supports context-conditioned vowel variation; it is not a class-complete IPA target table.
- Liu, Y. (2026), “Backness Agreement in Consonant + Glide Onsets: Evidence from Mandarin,” *Glossa* 11(1): https://doi.org/10.16995/glossa.24850. It analyzes [j], [ɥ], and [w] as distinct glides in consonant–glide onsets; it does not directly settle the `iong/yong` final.
- Nguyen Dinh Hien (2018), “Research on Several Points of Modern Chinese Final,” *Journal of China Studies* 21(2): 177–186, https://doi.org/10.20288/JCS.2018.21.2.177. The paper argues for `ong [uŋ]`, `iong [yŋ]`, and standalone `er [ɐɹ]`; it is a direct competing analysis but not a full acoustic gold table for this converter.

## Completion criteria

The IPA layer can be called **scientifically verified within its declared scope** only when:
1. every implemented segmental class and every legal initial–final combination is covered by evidence-backed expected outputs;
2. convention-sensitive cases have a written decision and independent source support;
3. unsupported or marginal forms are classified and do not silently inherit ordinary-syllable rules;
4. the four tone suffixes, tone-mark parsing, neutral tone and punctuation formatting have explicit tests, while lexical tone legality is separately validated or explicitly out of scope;
5. all unresolved cases are either resolved or visibly documented as exceptions;
6. tests pass after the fixture is independently reviewed; passing tests alone are not the evidence of correctness.


## New evidence from the second review pass

A direct comparison of the project's ordinary-IPA convention with the University of Washington final and syllable charts found a concrete mismatch in `üe`: the chart uses `yɛ`, while the converter had `ɥe`. Because the project maps the chart's glide symbol `y` to `ɥ`, the vowel quality `ɛ` must be retained. The branch changes this to `ɥɛ` and expands regression tests to `nüe`, `lüe`, `jue`, `que`, `xue`, and `yue`.

This is a source-backed correction to one final class. It does **not** mean the whole ü-series is certified: `üan`, `ün`, and the complete set of legal onset-final combinations remain subject to independent class review. See [the adjudication note](./IPA-ADJUDICATION-APICALS-RHOTICS-TONES-2026-10-18.md) and [the convention decision record](./IPA-CONVENTION-DECISION-2026-10-18.md).


A second source-backed correction in this pass changes onset `r` from `ɻ` to `ɹ`. The University of Washington chart uses `ɹ`; Chen, Whalen, and Mok (2024) found bunched onset rhotics in their sample and optional frication. This supports a less over-specific broad default. It does not settle every speaker's phonetic realization. Separate cases for onset `r`, syllabic `ri`, standalone `er`, and erhua remain necessary.


## Independent vowel-quality cross-check (2026-10-18)

Added [a separate comparison note](./IPA-AUDIT-VOWEL-QUALITY-2026-10-18.md) comparing the UW syllable chart with Ohio State University's IPA vowel chart, LibreTexts, and the PolyU pronunciation guide. The comparison supports the conditioned `uɔ` realization in `wo` and after labials, while documenting that `e`, `a/ɑ`, diphthongs, and `ong/iong` use different transcription depths across sources. Those classes remain partially verified or convention-sensitive; no blanket validation claim is made.

## Cross-class regression pass (2026-10-18)

A separate fixture, `tests/ipa-cross-class-audit.test.mjs`, now exercises high-risk combinations rather than testing each final only in isolation. It covers:
- `j/q/x + üe/üan/ün` (including orthographic `u` after palatal initials);
- `jiong/qiong/xiong/yong` versus `ong` after other initials;
- contracted `iu/ui/un` across multiple onset classes;
- `an/en/ang/eng/uang` across alveolar, retroflex and labial-velar contexts;
- diphthong combinations across palatal, alveolar and retroflex onsets;
- context-conditioned `o` after labials versus `uo` after other initials.

This is a cross-class regression layer, not a complete 403-entry gold-standard table. Its expected strings are manually authored under the declared broad-IPA convention. Independent source evidence still needs to be attached to each class before the entire matrix can be marked verified. The current 403-syllable inventory loop remains a coverage gate, not an accuracy claim.

## Additional competing transcription evidence (2026-10-18)

Nguyen Dinh Hien (2018), *Research on Several Points of Modern Chinese Final* (Journal of China Studies 21(2), 177–186; [DOI](https://doi.org/10.20288/JCS.2018.21.2.177)), argues for `ong [uŋ]`, `iong [yŋ]`, and standalone `er [ɐɹ]`. This is a direct published alternative to the current `[ʊŋ]`, `[jʊŋ]`, and `[əɹ]` outputs. It exposes two separate convention decisions: whether `iong/yong` contains a front-rounded vowel [y] or a glide [ɥ] plus a separate [u] nucleus, and which central vowel/rhotic notation to use for standalone `er`. The code is intentionally unchanged: this paper is an important competing analysis, not a speaker-sampled acoustic gold table for the full converter inventory.
