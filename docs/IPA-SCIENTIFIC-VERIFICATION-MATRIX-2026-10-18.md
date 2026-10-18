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
| Inventory coverage | 403 keys from the University of Washington (UW) chart must map to a non-empty output | Coverage establishes that a mapping exists, not that it is correct | partially verified | Keep coverage gate separate from linguistic accuracy gates |
| Initials: aspiration | Pinyin b/p, d/t, g/k, j/q, zh/ch, z/c pairs use unaspirated/aspirated IPA pairs | The existing cross-check covers one tone-1 example per onset family; the source is a broad chart, not an acoustic gold standard | partially verified | Add class-level expected outputs and check the symbols against independent descriptions of Standard Mandarin |
| Velar and glottal fricatives | h → [x] | Realization varies by context and speaker; [x] is a broad convention | convention decision needed | Explicitly define the broad target and test examples without claiming narrow realization |
| Palatal initials | j/q/x → [tɕ, tɕʰ, ɕ] | Conventional broad IPA; exact place/diacritics vary across analyses | partially verified | Confirm with an independent phonetics source and document the chosen level of detail |
| Retroflex series | zh/ch/sh → [ʈʂ, ʈʂʰ, ʂ]; r → [ɻ] | Published work describes Mandarin rhotics as articulatorily variable; a single [ɻ] should not be presented as a universal narrow realization | convention decision needed | State broad representation; add separate evidence for onset r and syllabic/rhotic contexts |
| Apical vowels after z/c/s vs zh/ch/sh/r | [ɹ̩] vs [ɻ̩] | The literature disputes whether the apical segments are vowels or approximant-like sonorants; [ɿ]/[ʅ] are common sinological symbols, not IPA | convention decision needed | Choose a defensible broad IPA analysis, cite the articulatory/acoustic evidence, and test all seven forms |
| Simple vowels | a, o, e, i, u, ü | Current mappings are a/ɔ/ɤ/i/u/y; sources differ in vowel quality symbols and the status of Mandarin vowel categories | partially verified | Compare the full class against two sources with explicit conventions; avoid equating Pinyin letters with IPA |
| Diphthongs | ai/ei/ao/ou → aɪ/eɪ/aʊ/oʊ | Notation is conventional and should represent the glide trajectory, not merely copy Pinyin | partially verified | Verify each final class, including tone-marked input and all legal onset combinations |
| Nasal finals | an/en/ang/eng and derived finals | Converter uses a/ɑ and ə distinctions; chart conventions differ | partially verified | Check place/quality and the derived i-/u-/ü-series as separate classes |
| i-series finals | ia/ie/iao/iu/ian/in/iang/ing/iong | Uses j glides and several conventional vowel qualities; some finals combine glide and vowel analyses | convention decision needed | Verify all finals and their zero-initial aliases separately; pay special attention to iong/yong and iou/you |
| u-series finals | ua/uo/uai/ui/uan/un/uang/ong | Uses w glides; ui/un are contracted Pinyin spellings and ong has a convention-sensitive vowel | convention decision needed | Validate underlying/contracted analyses against independent sources; ensure zero-initial and onset forms are consistent |
| ü-series finals | ü/üe/üan/ün | Source chart gives üe as yɛ; in the project's glide notation this is ɥɛ. The prior ɥe mapping omitted the open-mid vowel quality and is corrected in this branch. Other ü-final classes still need class-wide adjudication. | partially verified | Keep regression cases for n/l/j/q/x/y forms; verify üan/ün and all legal combinations independently |
| Pinyin o after b/p/m/f | context-specific uɔ; standalone o stays distinct | UW chart and PolyU guide support the short/weak u component in bo/po/mo/fo | partially verified | Keep four regression cases; separately adjudicate standalone o and rare/interjectional status |
| Zero-initial y/w spellings | y/w aliases normalize to vowel/glide outputs | Orthography is not a direct phoneme sequence; mappings are partly convention-based | partially verified | Compare each legal zero-initial family against its onset counterpart and independently validate expected output |
| er and erhua | standalone er → əɹ; productive erhua is not implemented as a general connected-speech process | UW pages differ in their displayed notation for standalone er; erhua has context-sensitive segmental effects | convention decision needed / out of scope | Record the standalone convention; explicitly mark word-level erhua as out of scope unless implemented separately |
| Syllabic nasals m/n/ng | m̩/n̩/ŋ̍ | Edge forms are not ordinary CV syllables and have limited lexical distribution | partially verified | Confirm symbol choice and source scope; add dedicated fixtures, not just generic inventory tests |
| Tones 1–4 | ˥, ˧˥, ˨˩˦, ˥˩ appended to every syllable | Tone letters encode canonical contours, not every speaker's realization; third tone is context-sensitive | partially verified | Keep citation-form tests, document contour convention, and test no tone / numbered / marked input equivalence |
| Neutral tone | no fixed contour for tone 0/5 | Neutral-tone pitch and duration depend on context; absence of a contour is a design choice for this segmental/citation layer | verified as a scope decision | Preserve this behavior; never describe neutral tone as a fixed mid-level tone |
| Third-tone sandhi | not applied | Academic descriptions confirm third-tone sandhi and contextual realization; this layer currently renders lexical/citation tones | out of scope | Keep it explicit in UI/docs; any future surface-tone mode must be a separate contextual engine with its own tests |
| yi/bu tone alternations and other connected-speech effects | not applied | These require lexical, syntactic/prosodic and contextual analysis | out of scope | Do not add context-free rewrites to this converter |

## High-priority testable questions

1. **Ü-final allomorphs:** Are `nüe` and `lüe` rendered as `nɥe/lɥe` or as a vowel sequence such as `nyɛ/lyɛ` under the project's declared broad convention? Resolve from phonetic sources, not intuition.
2. **Apical segments:** Is `ɹ̩/ɻ̩` the most defensible broad IPA representation for the dental and retroflex apical segments, given articulatory/acoustic work arguing for approximant-like segments? If changing it, document the analysis and migration impact.
3. **R onset:** Does the chosen `ɻ` adequately represent broad Standard Mandarin onset r, or should the broad convention use a different rhotic symbol? Treat this separately from the apical segment.
4. **Vowel qualities:** Confirm `a` vs `ɑ`, `e` vs `ɤ/ə`, `o` vs `ɔ`, and `ong` / `iong` independently. The UW chart is a convention reference, not an automatic IPA gold file.
5. **Contracted spellings:** Validate `iu/ui/un` and `you/wei/wen` as coherent phonetic representations, while preserving distinctions between orthographic spelling and surface segment sequence.
6. **Tones:** Confirm that the chosen tone-letter contours are explicitly defined as citation-form broad targets; keep sandhi outside this function.

## Evidence base to consult

- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
- University of Washington, *Mandarin IPA finals*: https://courses.washington.edu/chin342/ipa/finals.html
- Hong Kong Polytechnic University, *Simple Finals*: https://www.polyu.edu.hk/bepth/introduction-to-phonetics/simple-finals/
- Lee-Kim, Sang-Im (2014), *Revisiting Mandarin 'apical vowels': An articulatory and acoustic study*: https://scholar.nycu.edu.tw/en/publications/revisiting-mandarin-apical-vowels-an-articulatory-and-acoustic-st/
- *What R Mandarin Chinese /ɹ/s? Acoustic and articulatory features of Mandarin Chinese rhotics* (2024): https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/
- University of Munich, *Mandarin* (tone contours and tone-sandhi demonstrations): https://www.phonetik.uni-muenchen.de/studium/skripten/languagedemos/Demos/mandarin.html
- *The role of phonological alternation in speech production: evidence from Mandarin tone sandhi*: https://pmc.ncbi.nlm.nih.gov/articles/PMC4066894/

## Completion criteria

The IPA layer can be called **scientifically verified within its declared scope** only when:
1. every implemented segmental class and every legal initial–final combination is covered by evidence-backed expected outputs;
2. convention-sensitive cases have a written decision and independent source support;
3. unsupported or marginal forms are classified and do not silently inherit ordinary-syllable rules;
4. the four citation tone contours, tone-mark parsing, neutral tone and punctuation formatting have explicit tests;
5. all unresolved cases are either resolved or visibly documented as exceptions;
6. tests pass after the fixture is independently reviewed; passing tests alone are not the evidence of correctness.


## New evidence from the second review pass

A direct comparison of the project's ordinary-IPA convention with the University of Washington final and syllable charts found a concrete mismatch in `üe`: the chart uses `yɛ`, while the converter had `ɥe`. Because the project maps the chart's glide symbol `y` to `ɥ`, the vowel quality `ɛ` must be retained. The branch changes this to `ɥɛ` and expands regression tests to `nüe`, `lüe`, `jue`, `que`, `xue`, and `yue`.

This is a source-backed correction to one final class. It does **not** mean the whole ü-series is certified: `üan`, `ün`, and the complete set of legal onset-final combinations remain subject to independent class review. See [the adjudication note](./IPA-ADJUDICATION-APICALS-RHOTICS-TONES-2026-10-18.md) and [the convention decision record](./IPA-CONVENTION-DECISION-2026-10-18.md).
