# IPA acoustic validation execution protocol

**Created:** 2026-10-19  
**Status:** protocol ready; corpus audio has not yet been downloaded or analyzed  
**Scope:** independent acoustic/articulatory adjudication of disputed Standard Mandarin finals, then class-wide verification of the 403-key converter inventory.

## 1. Why this is the next step

The 403-key University of Washington (UW) differential proves source-key coverage and makes symbol differences reproducible. It does not establish acoustic accuracy. This protocol prevents the project's own converter, an automatic G2P model, or one teaching table from becoming its own gold standard.

The immediate unresolved cases are:

- **ong:** current [ʊŋ]; competing broad output [uŋ].
- **iong/yong:** current [jʊŋ]; competing analyses include [yŋ], [iʊŋ], and a glide-plus-nucleus sequence.
- **üan/yuan:** current [ɥɛn]; competing descriptions include a lower/backer nucleus such as [ɑ].
- **standalone er:** current [əɹ]; alternatives include [ɐɹ], [ɚ], and syllabic-rhotic analyses.

The aim is to adjudicate a declared broad transcription convention for Standard Mandarin, not to pretend that one IPA string captures every speaker's narrow phonetic realization.

## 2. Corpus decision: two resources with different roles

### Primary candidate: AUSpeech

Yang et al. (2025), *An Audio-Ultrasound Synchronized Database of Tongue Movement for Mandarin speech*, *Scientific Data* 12:607. DOI: https://doi.org/10.1038/s41597-025-04917-w

- Paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC11992241/
- Data record: https://cstr.cn/31253.11.sciencedb.18722
- Preprocessing/validation code: https://github.com/huanraozhineng1/AUSpeech_code
- Reported scope: 43 healthy native Mandarin speakers plus 11 speakers with dysarthria; 22.31 hours of synchronized audio, ultrasound tongue imaging, and text; a curated 405-item monosyllable inventory; TextGrid and .lab annotations.
- Important sampling limitation: each healthy participant produced only 15 distinct items from the 405-item set, with three repetitions per selected item. The controlled monosyllable task therefore cannot be assumed to provide 20 speakers per disputed syllable. The 375-sentence recordings per participant must also be indexed for target-final coverage, and any sentence tokens must receive manually verified boundaries. If a class fails the preregistered speaker/token threshold, leave it unresolved rather than treating the corpus as sufficient.
- The full release is reported at approximately 676 GB. Do not download the full release blindly. First inspect the data record and folder manifest, then fetch only the healthy-speaker Audio/ and Text/ files needed for the candidate syllables. Ultrasound is valuable for tongue configuration but does not directly measure lip rounding.

**Gate A — inventory feasibility:** before measuring anything, extract the 405-item list and check whether it actually contains ong, iong, üan, and standalone er, with sufficient onset/tone contexts. Then index the transcript/TextGrid files for the 375-sentence sets and count usable occurrences by class, speaker, tone, and onset. The paper's overall dataset description does not prove that every disputed item is in the controlled list or that it meets the speaker threshold. If a class is absent or undersampled, record that fact; do not infer coverage from the abstract.

### Secondary candidate: AISHELL-1 plus aligned recordings

- Corpus: https://www.openslr.org/33/
- Alignment index and TextGrid resource: https://github.com/lingjzhu/charsiu/blob/main/misc/data.md
- AISHELL-1 has 400 speakers from different accent areas, manual Chinese transcripts, and a supplementary lexicon. It is useful for expanding the number of real-world tokens, but speaker-region variation must be modeled and it is not a substitute for a controlled Standard Mandarin sample.
- Charsiu's phone alignments are automatically generated with a G2P/forced-aligner pipeline. They may be used to locate candidate audio intervals, **not** as independent proof of the phonetic sequence being tested. The disputed segments must be checked against audio and manually reviewed.

### Comparative-only dataset: Taiwanese Mandarin acoustic measurements

- Dataset: https://huggingface.co/datasets/taiwan-corpora/twsyllables
- Pin release v0.5.0, revision 6bd2504, DOI https://doi.org/10.57967/hf/10821.
- It publishes 37,946 measured syllable tokens, acoustic feature trajectories and templates, but the target variety is Taiwanese Mandarin. Its maintainers explicitly warn that tone, retroflex and nasal-final behavior do not transfer directly to mainland Putonghua.
- Use this dataset to test analysis tooling and compare methods only. Never import its measurements as gold labels for this repository's Standard Mandarin output.

## 3. Preregistered sampling and annotation rules

Before inspecting which candidate output looks best, create a dated analysis manifest with:

1. Corpus version/revision, download URL, license, file hashes, inclusion/exclusion rules, speaker metadata fields available, and the exact target variety.
2. A syllable inventory table listing every target token, Pinyin, character/word, lexical tone, onset family, final class, recording ID, speaker ID, context, and annotation status.
3. A sample-size report per class, speaker, tone, and onset. Target at least 20 healthy speakers and 3 usable repetitions per lexical item where the corpus permits; if the corpus does not meet this target, report the actual coverage and keep the relevant class provisional.
4. Manual boundary verification by two annotators who do not see the converter's expected IPA. Double-annotate at least 20% of target tokens; adjudicate disagreements and report agreement. Automatically generated phone labels are not the reference.
5. Exclusion reasons recorded explicitly (clipping, noise, overlap, uncertain lexical identity, boundary ambiguity, non-target accent where known). Do not silently discard inconvenient observations.

The acoustic analyst should be blind to whether a token is expected to support the current or competing mapping until segmentation and measurements are locked.

## 4. Measurement protocol

Use a reproducible Praat or equivalent script with version-pinned settings. Retain raw values and analysis parameters, not only plots.

- Record vowel/nucleus onset and offset, nasal-coda onset, duration, F1/F2/F3 tracks, speaker sex/age if available, lexical tone, onset, context, and recording-quality flags.
- Normalize formants within speaker using a stated method; retain unnormalized values as well.
- For diphthongal/complex finals, analyze trajectories and temporal landmarks. A single midpoint F1/F2 cannot determine whether a final contains one nucleus, a moving vowel, or a separate glide interval.
- For ong, compare its nucleus with same-speaker rounded high-back controls and relevant nasal-final controls. Test both absolute formants and normalized trajectories; do not decide [u] versus [ʊ] from spelling or one token.
- For iong/yong, compare jiong/qiong/xiong/yong where available with same-speaker front-rounded and uŋ controls. Test stable front-rounded targets versus dynamic trajectories. Acoustic formants alone do not prove a particular phonological segmentation; lip rounding is not observed by ultrasound tongue images.
- For üan/yuan, compare the nucleus trajectory with ian, uan, an, and available ü controls while accounting for onset, tone, and coda effects. Do not assume orthographic üan means a sequence of separate IPA segments.
- For standalone er, analyze the complete vowel-to-rhotic trajectory and compare with onset r, apical ri, and erhua only as distinct control categories. Do not collapse these categories.
- For each analysis, publish token counts, speaker counts, effect sizes, uncertainty intervals, plots, exclusions, and the code/configuration used.

## 5. Adjudication rules

An acoustic result does not automatically choose the project's IPA string. The string must also match the frozen broad-transcription convention. Apply these rules:

- **Convention-supported:** at least two independent suitable sources agree on the declared transcription level, and the acoustic evidence is consistent with that interpretation.
- **Acoustically supported with variation:** central tendency supports a broad mapping but speaker/context variation is material; keep the variation caveat.
- **Convention-sensitive:** sources describe different legitimate phonological or transcription analyses; explicitly select one project convention and explain the alternatives.
- **Unresolved:** sample coverage, measurement quality, or evidence does not distinguish the alternatives. Keep the implementation provisional.
- **Not covered:** no adequate target tokens in the selected corpus. Do not infer the answer from neighboring finals.

Do not choose the mapping that makes the converter pass its own tests. The final expected IPA fixture must be authored from the adjudicated source record, and a separate reviewer should inspect the evidence before the status is promoted.

## 6. From four disputes to all 403 keys

After the four disputed classes are addressed, apply the same source-and-context procedure to the remaining classes in docs/IPA-SCIENTIFIC-VERIFICATION-MATRIX-2026-10-18.md:

1. Freeze a written IPA policy: broad vs narrow, target variety, approximant symbols, vowel symbols, apical vowels, tone letters/contours, syllabic nasals, contracted Pinyin spellings and orthographic aliases.
2. Map every UW key to a normalized Pinyin syllable, its onset class, canonical final class, tone status, source convention and adjudication state.
3. Independently verify every class across all legal onset contexts. A representative test is not evidence for all combinations.
4. Maintain three separate result columns: (a) inventory/output coverage, (b) literal notation relation to each source, and (c) adjudicated phonetic status. Never report literal matches as an accuracy score.
5. Keep marginal/interjectional forms, syllabic nasals, source-absent keys, and tone-illegal combinations explicitly classified.
6. Run the full quality workflow on the exact final commit after any code, fixture or test change.

## 7. Required output files for the actual empirical pass

Do not create fake observations or hand-filled gold IPA. When corpus access and analysis have occurred, add:

- research/ipa-acoustic/manifest.json — corpus revision, licenses, hashes, software versions, target variety and inclusion rules.
- research/ipa-acoustic/token-index.csv — one row per eligible token with provenance, speaker, Pinyin, tone, context and manual boundary status.
- research/ipa-acoustic/measurements.csv — measured formant trajectories and quality flags; no derived values without the raw source fields.
- research/ipa-acoustic/adjudication.csv — hypothesis, evidence, effect/uncertainty, convention decision, reviewer and status per disputed class.
- tests/fixtures/ipa-adjudicated-reference.csv — only the independently adjudicated cases, with source and convention provenance.
- docs/IPA-ACOUSTIC-VALIDATION-REPORT.md — methods, sample flow, results, limitations and unresolved cases.

## 8. Current honest status

This repository now has a concrete, source-backed route to an empirical validation pass, but no corpus audio has yet been downloaded, segmented, or acoustically measured in this workflow. Therefore no new acoustic measurements are claimed here, no IPA mapping is changed on the strength of a dataset description, and the four disputed classes remain provisional until the protocol is executed. The repository must not claim full scientific certification before the resulting data, independent review and exact-head CI gate are complete.
