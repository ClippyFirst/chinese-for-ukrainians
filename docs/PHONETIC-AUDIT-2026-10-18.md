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

### F-02 — IPA convention mismatch: four finals changed provisionally, global decision still open

The University of Washington Mandarin syllable chart gives `o` as [uɔ], `uo` as [uɔ], the zero-initial syllable `wo` as [uɔ], and `er` as [əɹ]. The previous implementation used [ɔ], [wo], [wo], and [aɚ], respectively. These are literal mismatches with that chart, but a mismatch alone does not prove the previous forms are linguistically wrong: the project has not yet selected and documented one global transcription convention.

The four mappings were aligned with the chart and regression tests were added, but this is a **provisional convention-alignment change**, not a fully established phonetic correction. The same chart differs systematically from the converter in other finals (`ai`/`aɪ`, `ao`/`aʊ`, `ang`/`ɑŋ`, `iong`/`jʊŋ` vs `yuŋ`, among others) and in the treatment of `r` and apical vowels. Selectively matching only four cells risks mixing conventions. Before merge, either align the full segmental mapping to one declared source convention or retain a deliberately different IPA analysis and justify the relevant differences from additional authoritative phonetics sources.

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

The full article PDF was subsequently retrieved through the repository's bitstream content endpoint (20 pages). It includes the author's 420-syllable table and is now available for comparison. An automated extraction yields noisy text (including Latin/Cyrillic substitutions and malformed cells), so its raw differences cannot safely be treated as confirmed errors; the next stage must verify the relevant cells against page images or an independently faithful transcription before editing the Kirnosova column.

### Kirnosova–Tsisar (2019)

N. A. Kirnosova and N. Z. Tsisar, “Вихідні положення транскрипції з китайської мови на українську,” in *Питання сходознавства в Україні* (2019), pp. 65–67 in the PDF pagination.

Full source:
https://hnpu.edu.ua/sites/default/files/files/Kaf_vsesv_hist/Zb_Shodoznavstvo/Shodoznavsnvo_2019.pdf

Specific evidence located:
- PDF pp. 65–66: the system is intended as practical Ukrainian transcription, not as a substitute for studying Chinese phonetics; the authors distinguish Pinyin spelling from the sound values it represents.
- PDF pp. 66–67: explanation of medial/terminal i and u, Ukrainian й/в adaptations, the treatment of i in iou/iong, and the rationale for j/z/zh being rendered as дз/дз/дж in this system.

This is direct support for the system's general principles. The paper's complete 420-syllable table is now retrievable, but a reliable row-by-row collation of the Kirnosova column remains outstanding because automated text extraction is noisy.

### Academic transcription system (NANU / ASTKS)

Official institutional approval page:
https://www.oriental-studies.org.ua/uk/затверджена-академічна-система-тран/

Direct official table copies linked from that page:
- PDF: https://drive.google.com/open?id=11KU4T2_TdFsIUIFw5zUYBtXfoZi01ZsM
- DOCX: https://drive.google.com/open?id=1DHC2ykDoKCX99AIu2SVAhFHJMGKmw8uI

The official text states that the system was approved on 26 June 2019 by the Academic Council of the A. Yu. Krymskyi Institute of Oriental Studies, NAS of Ukraine (protocol no. 4). I retrieved the DOCX through its direct download endpoint and compared its syllable table with the CSV's `НАНУ` column. This partial row-level collation found 410 distinct Pinyin keys in the official table. After correction, 409 of those keys are present in the repository with an exact matching NANU output. Four discrepancies were corrected: `di` was `ди` instead of `ді`; `rou` was `роу` instead of `жоу`; and the previously blank `pou` and `pu` cells were `поу` and `пу`. The official table also contains `ten — тень`, which is absent from the repository's inventory; it has not been added because corresponding entries in the other two systems have not yet been sourced. A regression test now checks all four corrected values against the canonical CSV.

This is meaningful primary-source verification, but not yet an exhaustive semantic review of every row or every transcription rule. The audit ledger records the specific comparisons and remaining work.

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

A mechanical comparison of the chart's 404 populated syllable cells (403 unique keys) with the project's generated broad IPA found 244 literal string differences. This is **not** a count of 244 proven pronunciation errors; it is a review queue, because many differences are systematic notation choices. It shows that the project needs an explicit phonetic convention and evidence-backed decisions for each difference class. Examples include `ai` vs `aɪ`, `iɛ` vs `jɛ`, `aŋ` vs `ɑŋ`, `yɛ` vs `ɥe`, and `ɹ` vs `ɻ`). These are not automatically phonetic errors: the chart uses a different broad transcription convention in several places. They do, however, mean the project must state its chosen convention and review every mismatch class against a second phonetics source instead of treating raw string equality as a gold standard. The `o/uo/wo/er` changes above currently match the chart's displayed values, but remain provisional until the project adopts a consistent global convention.

Source: University of Washington, “Mandarin Chinese Syllables”: https://courses.washington.edu/chin342/ipa/syllables.html

### Blank-output inventory

A programmatic pass over the corrected CSV found:
- 420 data rows and no rows with all three Ukrainian outputs blank;
- 0 blank cells in the Kirnosova column;
- 0 blank cells in the Kirnosova–Tsisar column;
- 10 blank cells in the NANU column.

The 10 remaining NANU blanks are keys `ê`, `fiao`, `hm`, `hng`, `kei`, `m`, `n`, `ng`, `rua`, and `yo`. The previously blank `pou` and `pu` cells were filled from the official ASTKS table. The remaining blanks stay explicit until the official source or its rules establish whether a mapping is intended.

## Important audit observations

1. The CSV contains 420 rows, including non-ordinary or marginal forms (for example `ê`, `hm`, `hng`, and syllabic `m`, `n`, `ng`) and entries with deliberately blank outputs. These should be tagged by status (standard syllable, marginal/interjection, phonetic edge form, unsupported/unresolved) rather than all being presented as equally ordinary Mandarin syllables.
2. A blank output remains a real missing mapping. Do not fill it by copying another system's value.
3. A syllable table cannot resolve a polyphonic Han character by itself. The selected Pinyin reading depends on the upstream pronunciation engine and its dictionary/context coverage.
4. The IPA layer is a finite mapping. The current regression tests cover apical vowels, selected tone-marked forms, ü normalization, unsupported `ê`, punctuation, and neutral tone. They do not yet establish exhaustive correctness for every legal Pinyin syllable.
5. A passing build or test suite verifies implemented invariants, not all linguistic decisions in the CSV.

## Remaining work before claiming a complete audit

- Collate all 420 rows against the exact published tables for each Ukrainian system; record source page/table/rule and reviewer status per row.
- Build a canonical Mandarin syllable inventory and classify each CSV key as standard, marginal, historical/edge, or unsupported. The current reference-chart comparison found all 403 chart keys present and 17 extra CSV keys requiring classification.
- Decide the global IPA convention before treating the four final changes as final: align all relevant mappings to the selected chart, or keep a distinct convention with independently sourced justification. The 403-syllable fixture currently tests coverage only.
- Independently review every IPA initial/final combination, including `o`, `e`, `er`, `ong`, `iong`, `zhi/chi/shi/ri`, `zi/ci/si`, `ju/qu/xu`, `jue/que/xue`, tone-marked Pinyin, numeric tones, and neutral tone.
- Complete the existing provenance ledger with exact source evidence for every row in all three systems, plus review date, status, and documented resolution of disagreements.
- Add context-sensitive polyphonic regression cases for the pinned Pinyin engine, covering simplified and traditional input.
- Publish a versioned audit report and rerun all CI checks before merging.

## Verdict

The first pass found and fixed one confirmed table character error, removed a misleading fixed contour for neutral tone, and provisionally aligned four IPA finals with one reference chart. Further inspection showed that the converter and chart use systematic notation differences elsewhere, so the four final changes must not be presented as final phonetic corrections until a global IPA convention is chosen. The official ASTKS table has now been directly compared with the NANU column for its listed syllables; four discrepancies were corrected and regression-tested, but the full linguistic audit remains open. The table is **not yet certified as fully audited**: row-by-row source evidence and exhaustive IPA review remain open tasks.
