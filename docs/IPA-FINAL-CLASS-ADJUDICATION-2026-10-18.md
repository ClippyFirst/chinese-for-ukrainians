# Class-by-class IPA adjudication register (2026-10-18)

**Status:** working audit register; not a claim of complete scientific validation.  
**Target:** `src/app/ipa.js`, broad ordinary-IPA rendering of Standard Mandarin citation-form syllables.  
**Reference inventory:** 403 Pinyin keys captured verbatim from the University of Washington (UW) syllable chart in `tests/fixtures/uw-mandarin-syllables-ipa-reference.csv`.

## How to read this register

- **Source-aligned** means a source string and the implementation agree under the stated transcription convention for the listed example; it does not certify every member of the class.
- **Convention conversion** means the strings differ for a documented symbol/convention reason, not necessarily in the intended sound.
- **Partially corroborated** means one or more sources describe the class, but the exact output or every onset-conditioned realization is not independently established.
- **Unresolved** means sources disagree on segment sequence or vowel quality. Do not treat the current implementation or a regression fixture as a gold standard.
- **Not a complete legal-combination matrix:** the 403-key source fixture establishes a reference key set, not that every class × onset pair has an independent phonetic source.

## 1. Finals: class-by-class register

| # | Canonical final(s) | Current broad output rule | Source comparison / representative witness | Status | Next adjudication task |
|---:|---|---|---|---|---|
| 1 | `a` | `a` | UW gives `a`; Ohio State University (OSU) distinguishes [a] from [ɑ] in its vowel chart | partially corroborated | Keep separate from `ang`; check `a/an/ian/uan` across onset contexts |
| 2 | `o` | `ɔ`; after b/p/m/f use `uɔ` | UW has standalone `o` and labial `bo/po/mo/fo → uɔ`; OSU notes conditioned [uɔ] realization | partially corroborated | Preserve conditioned labial allophone; verify standalone `o` with another primary phonetic source |
| 3 | `e` | `ɤ` | UW uses [ɤ]; OSU lists [ɤ] and conditioned variants | partially corroborated | Compare `e` after each onset family; do not equate spelling with a single universal narrow vowel |
| 4 | `i` | `i` | UW uses `i` in ordinary contexts but uses sinological symbols after sibilants/retroflexes; Lee-Kim (2014) supports a sonorant/approximant analysis of the apical series | partially corroborated; broad convention decided with caveat | Keep ordinary `i` separate from the apical series `zi/ci/si/zhi/chi/shi/ri`; see [apical/rhotic adjudication](./IPA-ADJUDICATION-APICALS-RHOTICS-TONES-2026-10-18.md) |
| 5 | `u` | `u` | UW broadly uses `u`; the exact [u]/[ʊ] distinction is unresolved in some nasal finals | partially corroborated | Audit standalone `u` separately from `ong`, `ong`-like nuclei and glide sequences |
| 6 | `ü` | `y` | UW and UCL table use [y] for the front-rounded vowel | convention conversion | Verify input normalization and output consistency after n/l vs j/q/x/y |
| 7 | `ai` | `aɪ` | UW writes `ai`; project explicitly marks the offglide | convention conversion | Keep declared ordinary-IPA convention and check onset contexts/tone-mark parsing |
| 8 | `ei` | `eɪ` | UW writes `ei`; OSU chart uses [eɪ] | convention conversion | Check the starting-vowel symbol against the chosen broad convention |
| 9 | `ao` | `aʊ` | UW writes `au`; OSU chart uses [ɑʊ] | convention decision needed | Resolve whether the project standardizes [aʊ] or [ɑʊ] and apply consistently |
| 10 | `ou` | `oʊ` | UW writes `ou`; OSU uses [oʊ], while UCL's table gives a different starting-vowel convention | convention conversion | Document diphthong convention and avoid mixing symbol systems within a class |
| 11 | `an` | `an` | UW writes `an`; OSU distinguishes [a]/[ɑ] in vowel quality | partially corroborated | Compare with `ang`, `ian`, `uan`, `üan`; use same evidence level across derived finals |
| 12 | `en` | `ən` | UW writes `ən`; OSU/teaching sources support central-vowel notation | partially corroborated | Check `en/uen/un` and contextual reductions without conflating spelling contraction |
| 13 | `ang` | `ɑŋ` | UW writes `aŋ`; OSU distinguishes [a]/[ɑ] | convention decision needed | Need explicit decision whether this is a broad vowel-quality contrast or a convention-only distinction |
| 14 | `eng` | `əŋ` | UW writes `əŋ`; broad agreement on central vowel and velar nasal | partially corroborated | Cross-check `eng/ing/ong` as distinct final classes, including onset contexts |
| 15 | `ong` | `ʊŋ` | UW chart gives `uŋ`; UCL table gives `uŋ`; Nguyen Dinh Hien (2018) argues [uŋ] | unresolved | Decide [u] vs [ʊ] from final-specific phonetic evidence; do not change by glyph substitution alone |
| 16 | `ia` | `ja` | UW writes `ia` in its glide convention | convention conversion | Check onset + medial analysis and distinguish [i] glide notation from [j] |
| 17 | `ie` | `jɛ` | UW writes `iɛ`; UCL gives `iɛ` in its own convention | convention conversion | Confirm [j] glide convention and [ɛ] nucleus in the complete onset inventory |
| 18 | `iao` | `jaʊ` | UW writes `iau`; OSU uses [aʊ]-type diphthong notation | convention conversion | Verify [a] vs [ɑ] and glide notation consistently across `iao/iao` contexts |
| 19 | `iou` (`iu` in contracted Pinyin) | `joʊ` after onset; `you → joʊ` | UW source entries often preserve `iou`; PolyU notes the medial `o` is especially conspicuous in tones 3/4 | partially corroborated | Audit underlying `iou` vs written `iu`; add separate source-backed checks for zero-initial `you` |
| 20 | `ian` | `jɛn` | UW uses `iɛn`; PolyU notes a raised/closer articulation relative to `an` | partially corroborated | Check [j] vs [i] notation and vowel quality across palatal, alveolar, retroflex, and labial-velar onsets |
| 21 | `in` | `in` | UW writes `in`; recent acoustic/perceptual work shows `in/ing` can be confused in dialect acquisition, but that is not a gold transcription | partially corroborated | Verify the target Standard Mandarin quality, not just perceptual contrast |
| 22 | `iang` | `jɑŋ` | UW writes `iaŋ`; project uses [j] and distinguishes [ɑ] | convention decision needed | Adjudicate [a]/[ɑ] and glide notation jointly; compare with `ian/ang/uang` |
| 23 | `ing` | `iŋ` | UW writes `iŋ`; independent acoustic evidence confirms this is distinct from `in`, but does not dictate one IPA string for every context | partially corroborated | Check every legal onset family and ensure it is not collapsed into `in` |
| 24 | `iong` | `jʊŋ` after j/q/x; zero-initial alias `yong → jʊŋ` | UW writes `yuŋ`; UCL table gives `iʊŋ`; Nguyen Dinh Hien (2018) argues [yŋ] | unresolved | Resolve whether the sequence is [y], [ɥu], [jʊ], or [iʊ] in the chosen target convention; require final-specific phonetic evidence |
| 25 | `ua` | `wa` | UW writes `ua` under its glide convention | convention conversion | Document [w] vs [u] glide notation and check all legal onset combinations |
| 26 | `uo` | `uɔ` | UW writes `uɔ`; project output aligns for representative `duo/guo/huo/wo` | source-aligned for sampled cases | Verify every legal onset context, including the Pinyin spelling contraction `o` after b/p/m/f |
| 27 | `uai` | `waɪ` | UW writes `uai`; project writes [w] plus explicit offglide | convention conversion | Confirm [a] vs [ɑ] and [w] notation across the u-medial family |
| 28 | `uei` (`ui` in contracted Pinyin) | `weɪ` | UW writes `uei`; PolyU notes the `e` element is especially conspicuous in tones 3/4 | partially corroborated | Check `uei/ui` spelling and tone-conditioned realization; do not imply a tone-blind narrow output |
| 29 | `uan` | `wan` | UW writes `uan`; OSU vowel distinctions raise a convention question for [a]/[ɑ] | partially corroborated | Cross-check with `an/ian/üan` and preserve onset legality |
| 30 | `uen` (`un` in contracted Pinyin) | `wən` | UW writes `uən`; PolyU identifies the contraction `uen → un` | partially corroborated | Verify underlying-vs-surface representation and zero-initial `wen` separately |
| 31 | `uang` | `wɑŋ` | UW writes `uaŋ`; project uses [ɑ] | convention decision needed | Adjudicate [a]/[ɑ] across `ang/iang/uang` rather than independently guessing each row |
| 32 | `ueng` | `wəŋ` | UW uses `uəŋ` for `weng`; project treats `u` as [w] glide | convention conversion | Verify zero-initial alias `weng` and distinguish from `ong` |
| 33 | `üe` | `ɥɛ` | UW gives `yɛ`; UCL gives `yɛ`; project uses [ɥ] for glide and [ɛ] for nucleus | convention decision needed | Confirm glide-vs-vowel analysis, especially after n/l and in j/q/x contexts |
| 34 | `üan` | `ɥɛn` | UCL table gives `yɑn`; UW uses `yɛn` in zero-initial alias `yuan` | unresolved | The [ɛ]/[ɑ] difference is substantive; adjudicate final quality and [y]/[ɥ] analysis before changing code |
| 35 | `ün` | `yn` | UW gives `yn` in zero-initial alias `yun`; UCL gives `yn` | source-aligned for sampled alias | Confirm the same vowel quality after every legal onset; check j/q/x spelling normalization |
| 36 | `er` | `əɹ` | UW gives `ər`; Nguyen Dinh Hien (2018) argues [ɐɹ]; some references use [ɚ] | unresolved | Choose a target convention for central vowel and rhoticity; keep standalone er separate from onset r and erhua |

The machine-readable inventory/differential is available in [the 403-key CSV](./IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv); its interpretation, snapshot counts, and regeneration procedure are documented in [the differential methodology note](./IPA-UW-403-DIFFERENTIAL-METHODOLOGY-2026-10-18.md). The CSV is reproducible and complete for the captured key inventory, but it does not make the keys independent gold-standard judgments.

## 2. Cross-class review grid

The 403-key chart is the current **inventory backbone**, not a 403-row gold IPA table. Use the following strata to ensure a class is not verified only in one easy context.

| Stratum | Onset families / examples | High-risk finals | What must be checked |
|---|---|---|---|
| Zero-initial aliases | `yi, ya, ye, yao, you, yin, ying, yong, yu, yue, yuan, yun; wu, wa, wo, wei, wen, weng` | i/ü aliases, `iong`, u-medial aliases | Orthographic alias rules are not phonetic evidence; compare output separately with raw source forms |
| Labials | b/p/m/f: `bo, po, mo, fo, bai, bei, ban, bang` | conditioned `o/uo`, diphthongs, nasal finals | Confirm context-conditioned `uɔ`; do not extrapolate it to standalone `o` |
| Alveolars | d/t/n/l/z/c/s: `dui, dun, zui, zun, si` | `iu/ui/un`, apical `-i`, `a/ɑ` | Separate the apical series from ordinary [i]; compare contraction rules across onsets |
| Velars | g/k/h: `ge, gong, gui, guo, hong` | `e/eng/ong`, `uo`, u-medial | Resolve [u] vs [ʊ] in `ong`; keep `eng` separate |
| Palatals | j/q/x: `jue, juan, jun, jiong, qiong, xiong` | ü-final family, `iong`, `ian/iang` | Audit Pinyin `u` → `ü` normalization and glide/nucleus analysis independently |
| Retroflexes | zh/ch/sh/r: `zhi, zheng, zhuang, rong, ri` | apical `-i`, `e/eng`, diphthongs, rhotics | Keep onset r, syllabic ri, and erhua separate; confirm aspiration and apical analysis |
| Derived nasal finals | `an/en/ang/eng/ong` across all legal families | `ian/in/iang/ing/iong; uan/un/uang/ueng; üan/ün` | Compare related classes together so [a]/[ɑ], [u]/[ʊ], and [y]/[ɥ] decisions remain consistent |
| Diphthongs and contractions | `ai/ei/ao/ou; iao/iu; uai/ui` | `iu/ui/un` | Compare underlying final with written contracted spelling; test tone-mark and numeric-tone inputs separately |

## 3. Source hierarchy and limitations

1. **UW syllable chart and its transcription note** — inventory and raw broad transcription witness; its field-specific symbols must not be compared literally with ordinary IPA without an explicit mapping: [syllable chart](https://courses.washington.edu/chin342/ipa/syllables.html), [transcription note](https://courses.washington.edu/chin342/ipa/about.html).
2. **UCL dissertation, *A Speech Pattern Processing Method for Chinese Lis*** — its table lists several competing final analyses, including `ong /uŋ/`, `iong /iʊŋ/`, `üe /yɛ/`, `üan /yɑn/`, `ün /yn/`; it is a secondary academic work and not a speaker-sampled acoustic gold table: [PDF](https://discovery.ucl.ac.uk/id/eprint/10103942/1/A_speech_pattern_processing_me.pdf).
3. **Ohio State University vowel chart** — useful for vowel categories and conditioned allophony, but does not provide an expected IPA string for every legal syllable: [PDF](https://ielp.ehe.osu.edu/files/2025/09/IPA_Mandarin.pdf).
4. **PolyU BEPTH compound finals** — useful for the spelling/production classes and tone-sensitive visibility of the `iou/uei` elements; pedagogical rather than acoustic gold data: [compound-final groups](https://www.polyu.edu.hk/bepth/introduction-to-phonetics/compound-final-groups/).
5. **Nguyen Dinh Hien (2018)** — direct competing analysis for `ong/iong/er`: [DOI](https://doi.org/10.20288/JCS.2018.21.2.177). Do not treat it as automatically decisive without comparing target transcription depth and evidence.
6. **Recent acoustic research on dialect deviations** — useful to identify acoustically confusable finals, but non-target dialect speakers' deviations are not direct gold targets for Standard Mandarin: [Applied Sciences (2026)](https://doi.org/10.3390/app16083675).

## 4. Exit criteria before calling a class verified

For each class:
- identify at least one source that explicitly describes the relevant segment sequence or vowel quality;
- record source dialect, speaker sample, and transcription depth where known;
- cross-check convention-sensitive choices against an independent source;
- include representative legal combinations across every onset family that accepts the final, not only a hand-picked easy example;
- test tone-mark and numeric-tone parsing separately from phonetic adjudication;
- distinguish Pinyin orthography, phonological analysis, broad IPA, and narrow acoustic realization;
- do not promote expected outputs derived from the implementation itself to independent gold data.

**Current conclusion:** the class inventory is now explicit, but many classes remain partially verified or convention-sensitive. This register is a roadmap for adjudication, not a certification that all 403 outputs are correct.
