# IPA adjudication notes: apical segments, Mandarin r, and tone scope

**Date:** 2026-10-18  
**Status:** evidence reviewed; final notation decision still pending where noted.  
**Scope:** broad practical IPA for standard Putonghua, not narrow transcription of an individual speaker.

## 1. Apical segments in zhi/chi/shi/ri and zi/ci/si

### Evidence

Lee-Kim (2014), a peer-reviewed articulatory and acoustic study in the *Journal of the International Phonetic Association*, investigated the segments after dental and retroflex sibilants that occur instead of ordinary high front [i]. Ultrasound showed that the segments are homorganic with the preceding dental or retroflex sibilants. Acoustic measurements found periodic waveforms and clear formant structures without inherent frication noise. The author argues for a sonorant-approximant analysis rather than treating them as voiced fricatives.

Source:
- Lee-Kim, Sang-Im (2014), “Revisiting Mandarin ‘apical vowels’: An articulatory and acoustic study,” *Journal of the International Phonetic Association* 44(3), 261–282. https://doi.org/10.1017/S0025100314000267
- Publisher abstract: https://www.cambridge.org/core/journals/journal-of-the-international-phonetic-association/article/abs/revisiting-mandarin-apical-vowels-an-articulatory-and-acoustic-study/DA325F52844304100950A8B4FEAF6240
- Author/institution record: https://scholar.nycu.edu.tw/en/publications/revisiting-mandarin-apical-vowels-an-articulatory-and-acoustic-st/

### What this supports

- The converter should not map these syllables to an ordinary high front [i].
- A sonorant/approximant analysis is evidence-backed.
- The distinction between the dental/alveolar series and retroflex series should remain visible in the chosen notation.

### What it does not settle by itself

- A broad IPA output must decide whether to use a syllabic approximant notation such as [ɹ̩] / [ɻ̩], add a dental diacritic, or adopt another explicit transcription convention.
- The paper's articulatory analysis is not a universal claim that all speakers produce identical tongue shapes.
- A sinological [ɿ]/[ʅ] notation must not be described as ordinary IPA without qualification.

### Current implementation and decision

The converter currently returns:
- zhi/chi/shi: [ʈʂɻ̩], [ʈʂʰɻ̩], [ʂɻ̩]
- ri: [ɻ̩]
- zi/ci/si: [tsɹ̩], [tsʰɹ̩], [sɹ̩]

This is a documented broad convention, but it is not yet fully adjudicated against the dental-place detail in Lee-Kim's analysis. Do **not** claim the seven exact strings are uniquely required by the paper. The notation decision must explicitly state what detail the broad layer preserves and what it abstracts away.

### Required tests after the decision

- Verify all seven forms as distinct cases.
- Assert that none is rendered as plain [i].
- Assert that the chosen convention is consistent for onset and syllabic segment notation.
- Add a note that these are broad targets, not speaker-specific narrow IPA.

## 2. Pinyin onset r versus syllabic/apical ri

### Evidence

Chen, Whalen, and Mok (2024) studied Mandarin rhotics in prevocalic (syllable-onset), syllabic, and postvocalic/r-suffix positions using ultrasound and acoustic measures. Their sample included 18 northern Chinese speakers. The study found:
- onset rhotics were produced with bunched tongue shapes in their sample;
- onset rhotics sometimes had frication noise at the beginning and sometimes did not;
- syllabic and postvocalic rhotics showed both bunched and retroflex tongue shapes;
- the first three formants did not significantly distinguish the bunched and retroflex articulations in the study;
- the authors discuss the continuing debate between an approximant and a voiced-fricative analysis for onset /r/.

Source:
- Chen, Shuwen, Douglas H. Whalen, and Peggy Pik Ki Mok (2024), “What R Mandarin Chinese /ɹ/s? Acoustic and articulatory features of Mandarin Chinese rhotics,” *Phonetica* 81(5), 509–552. https://doi.org/10.1515/phon-2023-0023
- Open full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/

### Consequence for this converter

The existing onset mapping r → [ɻ] is a practical broad choice, not a universal narrow description. The 2024 study does not justify collapsing onset r and the apical segment in ri into one unqualified rule: the segment positions and observed articulatory patterns differ. Keep separate regression cases for:
- ru / ra / re (onset r before a vowel);
- ri (syllabic/apical segment);
- er (syllabic rhotic vowel);
- erhua (postvocalic rhotic suffix), which remains outside this simple syllable converter unless explicitly implemented.

### Decision status

**Convention decision needed.** Retain the current broad onset mapping for now, but describe it as an approximation. Do not make it more narrowly retroflex without stronger justification.

## 3. Lexical citation tones versus surface tones

### Evidence

Chen, Wiltshire, Li, and Wayland (2019; published online 2020) quantify third-tone sandhi in Standard Mandarin and Nanjing Mandarin. In Standard Mandarin, the first T3 in a T3+T3 disyllabic context changes toward a rising T2-like surface contour; the paper also shows that surface F0 contours and underlying pitch targets need not be equivalent.

Source:
- “A quantitative analysis of tone sandhi in Standard Mandarin and Nanjing Mandarin based on surface pitch contours and underlying pitch targets,” *International Journal of Chinese Linguistics* 6(2), 183–220. https://doi.org/10.1075/ijchl.18011.che
- PolyU research record: https://research.polyu.edu.hk/en/publications/a-quantitative-analysis-of-tone-sandhi-in-standard-mandarin-and-n/

### Consequence

The current IPA function attaches a citation-form contour to each syllable independently. It must not claim to predict the surface tone of connected speech. The third-tone contour [˨˩˦] is a pedagogical/citation target, not a promise that every third-tone syllable in a sentence has a full falling-rising contour.

### Decision status

**Scope decision supported.** Keep sandhi out of this function. The UI and documentation must continue to say that connected-speech tone changes are not modeled. Any future surface-tone feature needs contextual input, prosodic grouping, and its own evidence-backed test corpus.

## 4. Release-gating recommendation

Do not promote the IPA layer to “fully scientifically verified” while:
1. the seven apical outputs have no explicit convention decision grounded in the above evidence;
2. onset r, syllabic ri, standalone er, and erhua are not distinguished in the written scope;
3. the 403-key test still proves coverage rather than class-complete accuracy;
4. no independent expected-output fixture covers each final class and legal initial-final combination.

The implementation should change only when an adjudication record identifies the evidence, the precise decision, representative fixtures, and any trade-off in broadness versus phonetic detail.

## 4. Source-backed broad choice for onset r

The University of Washington syllable chart represents Pinyin onset `r` with [ɹ], not [ɻ]. The 2024 Chen, Whalen, and Mok study also found bunched (rather than tip-up retroflex) tongue shapes for onset rhotics in its 18-speaker sample, while observing optional initial frication. These sources do not prove that every speaker uses [ɹ], but they make a universal retroflex approximant [ɻ] an unnecessarily narrow default for this broad converter.

**Branch decision:** use [ɹ] for the onset mapping `r`, while keeping the syllabic apical/rhotic form `ri` separate as [ɻ̩]. Keep `er` as the project's current broad [əɹ] convention. Erhua remains outside the scope of this syllable-level function.

Sources:
- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
- Chen, Whalen, and Mok (2024): https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/

This is a broad-transcription convention decision supported by published evidence, not a claim that the surface sound is invariant across all speakers or contexts.
