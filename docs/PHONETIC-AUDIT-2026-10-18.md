# First-pass phonetic and source audit — 2026-10-18

## Status and scope

This is a reproducible first-pass audit, not a claim that all 420 rows have been individually re-derived from the three source systems. The repository has 420 CSV data rows. The table is a practical transcription inventory, not a dictionary of all Chinese words or all context-dependent pronunciations.

Reviewed:
- canonical `zh-in-ua.csv`;
- Pinyin-to-IPA implementation in `src/app/ipa.js`;
- CSV validation in `src/data/transcription.js`;
- existing IPA regression tests;
- accessible primary/bibliographic sources for the Ukrainian systems and a university Mandarin syllable-to-IPA chart.

## Findings fixed in this branch

### F-01 — Latin-script contamination in a Ukrainian output (CSV row 240)

The Kirnosova cell for `nüe` contained `нюe`, where the final character was Latin `e`, not Cyrillic `е`. This is a data-integrity defect, even though the strings can look identical in many fonts.

Correction: changed it to `нюе`.

Prevention: CSV validation now rejects Latin-script letters in the three Ukrainian output columns. This check is deliberately scoped to output cells; Pinyin keys are expected to use Latin script.

### F-02 — Pinyin finals `o`, `uo`, `wo`, and `er` disagreed with the selected reference chart

The University of Washington Mandarin syllable chart gives `o` as [uɔ], `uo` as [uɔ], the zero-initial syllable `wo` as [uɔ], and `er` as [əɹ]. The previous implementation used [ɔ], [wo], [wo], and [aɚ], respectively. Those are materially different outputs under the reference convention selected for this project.

Correction: aligned these four mappings with the cited chart and added regression tests. Broad IPA conventions can differ across references, so the site should continue to label its IPA as a practical transcription and name the reference convention rather than imply a single uniquely canonical narrow transcription.

Evidence: University of Washington, “Mandarin Chinese Syllables”: https://courses.washington.edu/chin342/ipa/syllables.html

### F-03 — Neutral tone was rendered as a fixed mid-level contour

The IPA function previously mapped tone 5 to `˧`. That is too categorical for Mandarin neutral tone: its surface pitch is context-sensitive and is affected especially by the preceding tone. A fixed mid-level contour can therefore be misleading in an output presented as practical IPA.

Correction: tones 1–4 retain their citation-form contours; tone 5 and numeric tone 0 no longer receive a fixed contour. Numeric suffix normalization now accepts 0 as well as 1–5.

Scope note: this does not implement neutral-tone duration, contextual pitch, tone sandhi, or full connected-speech phonetics. The app should not imply that it does.

Evidence:
- Hong Kong Polytechnic University, “Neutral Tone”: https://www.polyu.edu.hk/bepth/introduction-to-phonetics/tones/neutral-tone/
- Lee & Zee, “Prosodic characteristics of the neutral tone in Beijing Mandarin”: https://scholars.cityu.edu.hk/en/publications/prosodic-characteristics-of-the-neutral-tone-in-beijing-mandarin/

## Primary-source review

### Kirnosova (2009)

N. A. Kirnosova, “Засади транскрибування китайської лексики українською мовою,” *Сходознавство*, 45–46 (2009), pp. 38–57. National Library of Ukraine for V. I. Vernadsky catalogue record:
https://irbis-nbuv.gov.ua/cgi-bin/irbis64_r_81/cgiirbis_64.exe?C21COM=S&FT_PREFIX=&FT_REQUEST=&I21DBN=REF&P21DBN=REF&S21ALL=%28%3C.%3EU%3D%D0%A8171.13%24%3C.%3E%29&S21CNR=20&S21FMT=fullwebr&S21REF=10&S21STN=1&Z21ID=

Full-text file currently indexed at:
https://nasplib.isofts.kiev.ua/bitstreams/e3cc5ddf-1548-45ff-856c-55cb34f722c7/download

The direct file endpoint returned HTTP 403 to the audit browser, so a complete row-by-row collation against this article is not marked as completed in this audit.

### Kirnosova–Tsisar (2019)

N. A. Kirnosova and N. Z. Tsisar, “Вихідні положення транскрипції з китайської мови на українську,” in *Питання сходознавства в Україні* (2019), pp. 65–67 in the PDF pagination.

Full source:
https://hnpu.edu.ua/sites/default/files/files/Kaf_vsesv_hist/Zb_Shodoznavstvo/Shodoznavsnvo_2019.pdf

Specific evidence located:
- PDF pp. 65–66: the system is intended as practical Ukrainian transcription, not as a substitute for studying Chinese phonetics; the authors distinguish Pinyin spelling from the sound values it represents.
- PDF pp. 66–67: explanation of medial/terminal i and u, Ukrainian й/в adaptations, the treatment of i in iou/iong, and the rationale for j/z/zh being rendered as дз/дз/дж in this system.

This is direct support for the system's general principles. It is not proof that every cell in the current CSV exactly matches the source; a full row/rule collation remains outstanding.

### Academic transcription system (NANU / ASTKS)

Official resource:
https://pinyin.in.ua/

The resource identifies the system as approved on 26 June 2019 by the Academic Council of the A. Yu. Krymskyi Institute of Oriental Studies of the NAS of Ukraine (protocol no. 4). The official table is the appropriate primary comparison source for the `НАНУ` column. A stable, archived copy and a row-level evidence ledger should be added before calling the entire column fully audited.

### Mandarin IPA reference

University of Washington, “Mandarin Chinese Syllables”:
https://courses.washington.edu/chin342/ipa/syllables.html

This provides a useful syllable-by-syllable Pinyin/IPA comparison, including apical vowels and finals. The project’s IPA is explicitly broad practical IPA, so transcription conventions must be stated and applied consistently; no single broad IPA convention should be described as the only possible narrow phonetic realization.

## Inventory comparison against the University of Washington chart

I parsed the chart's published syllable table and compared its Pinyin entries with the canonical CSV:
- 403 unique syllable keys in the chart;
- all 403 are represented in the CSV;
- 17 additional CSV keys are absent from that chart: `cei`, `den`, `dia`, `fiao`, `hm`, `hng`, `lo`, `m`, `me`, `n`, `ng`, `nun`, `o`, `rua`, `tei`, `yo`, and `ê`.

This is a coverage comparison, not proof that the 17 additional forms are invalid. Some are syllabic nasals or interjections/marginal forms; each should receive an explicit inventory-status label and a source before the table is described as a standard-syllable inventory.

The chart's 403 unique Pinyin keys are now stored as a source-attributed regression fixture at `tests/mandarin-syllable-inventory.mjs`; an automated test requires the IPA converter to map every one. This is a coverage gate, not a pronunciation-accuracy assertion.

A mechanical comparison of the chart's 404 populated syllable cells (403 unique keys) with the project's generated broad IPA found 244 literal string differences. This is **not** a count of 244 proven pronunciation errors; it is a review queue, because many differences are systematic notation choices. It shows that the project needs an explicit phonetic convention and evidence-backed decisions for each difference class. Examples include `ai` vs `aɪ`, `iɛ` vs `jɛ`, `aŋ` vs `ɑŋ`, `yɛ` vs `ɥe`, and `ɹ` vs `ɻ`). These are not automatically phonetic errors: the chart uses a different broad transcription convention in several places. They do, however, mean the project must state its chosen convention and review every mismatch class against a second phonetics source instead of treating raw string equality as a gold standard. The `o/uo/wo/er` changes above were selected because the prior values conflicted directly with the chosen chart's displayed values.

Source: University of Washington, “Mandarin Chinese Syllables”: https://courses.washington.edu/chin342/ipa/syllables.html

### Blank-output inventory

A programmatic pass over the corrected CSV found:
- 420 data rows and no rows with all three Ukrainian outputs blank;
- 0 blank cells in the Kirnosova column;
- 0 blank cells in the Kirnosova–Tsisar column;
- 12 blank cells in the NANU column.

The 12 NANU blanks are rows/keys: 82 `ê`, 93 `fiao`, 125 `hm`, 126 `hng`, 157 `kei`, 196 `m`, 216 `n`, 226 `ng`, 260 `pou`, 261 `pu`, 286 `rua`, and 377 `yo`. These remain explicit missing mappings; this audit does not fill them by borrowing values from another system. Their rationale should be checked against the official system's own table/rules and then documented individually.

## Important audit observations

1. The CSV contains 420 rows, including non-ordinary or marginal forms (for example `ê`, `hm`, `hng`, and syllabic `m`, `n`, `ng`) and entries with deliberately blank outputs. These should be tagged by status (standard syllable, marginal/interjection, phonetic edge form, unsupported/unresolved) rather than all being presented as equally ordinary Mandarin syllables.
2. A blank output remains a real missing mapping. Do not fill it by copying another system's value.
3. A syllable table cannot resolve a polyphonic Han character by itself. The selected Pinyin reading depends on the upstream pronunciation engine and its dictionary/context coverage.
4. The IPA layer is a finite mapping. The current regression tests cover apical vowels, selected tone-marked forms, ü normalization, unsupported `ê`, punctuation, and neutral tone. They do not yet establish exhaustive correctness for every legal Pinyin syllable.
5. A passing build or test suite verifies implemented invariants, not all linguistic decisions in the CSV.

## Remaining work before claiming a complete audit

- Collate all 420 rows against the exact published tables for each Ukrainian system; record source page/table/rule and reviewer status per row.
- Build a canonical Mandarin syllable inventory and classify each CSV key as standard, marginal, historical/edge, or unsupported. The current reference-chart comparison found all 403 chart keys present and 17 extra CSV keys requiring classification.
- Review the chart-to-project IPA differences as classes, decide and document the intended broad-IPA convention, and add evidence-backed expected-output tests. The 403-syllable fixture currently tests coverage only.
- Independently review every IPA initial/final combination, including `o`, `e`, `er`, `ong`, `iong`, `zhi/chi/shi/ri`, `zi/ci/si`, `ju/qu/xu`, `jue/que/xue`, tone-marked Pinyin, numeric tones, and neutral tone.
- Add a provenance ledger with stable key, output system, exact source URL, page/table/rule, cited evidence, review date, status, and notes for unresolved disagreement.
- Add context-sensitive polyphonic regression cases for the pinned Pinyin engine, covering simplified and traditional input.
- Publish a versioned audit report and rerun all CI checks before merging.

## Verdict

The first pass found and fixed one confirmed table character error and two IPA-layer issues (the selected reference's `o/uo/wo/er` finals and neutral-tone rendering). It also established direct access to the 2019 Kirnosova–Tsisar paper and identified the appropriate primary source for the academic system. The table is **not yet certified as fully audited**: row-by-row source evidence and exhaustive IPA coverage remain open tasks.
