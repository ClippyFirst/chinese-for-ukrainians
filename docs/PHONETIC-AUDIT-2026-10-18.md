# First-pass phonetic and source audit — 2026-10-18

## Status and scope

This is a reproducible first-pass audit, not a claim that all 420 rows have been individually re-derived from the three source systems. The repository has 421 CSV data rows after adding the source-specific NANU entry `ten`. The table is a practical transcription inventory, not a dictionary of all Chinese words or all context-dependent pronunciations.

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
http://foreign-languages.karazin.ua/resources/38a431e26e297a45b2a1b5d0c7d34ac9.pdf

Specific evidence extracted from the primary-source PDF:
- PDF pp. 65–66: the authors explicitly define the target as practical Ukrainian transcription for ordinary Ukrainian readers, not a tool for learning Chinese phonetics. They reject mechanical Pinyin-to-Cyrillic transliteration while retaining Pinyin as an important international representation.
- PDF p. 66: they describe the Mandarin syllable as initial plus final; the final may be analysed as medial, central vowel, and terminal. In their account, medial and terminal positions contain only non-syllabic i/u, and Ukrainian й/в are proposed as the closest practical representations.
- PDF pp. 66–67: the authors discuss Ukrainian handling of i in ia/ie and nasal counterparts versus iou/iong, and justify дз/дз/дж for Pinyin j/z/zh in their practical system.
- The article is a three-page statement of principles (printed pp. 65–67); it does **not** provide a 420-syllable comparison table. Its prose supports system-level rationale, not direct cell-by-cell verification of the CSV.

The separate Kirnosova (2009) article is the source with the 420-syllable table. Its automated text extraction remains noisy, so candidate differences must be verified against page images or an independently faithful transcription before editing the Kirnosova column.

### Academic transcription system (NANU / ASTKS)

Official institutional approval page:
https://www.oriental-studies.org.ua/uk/затверджена-академічна-система-тран/

Direct official table copies linked from that page:
- PDF: https://drive.google.com/open?id=11KU4T2_TdFsIUIFw5zUYBtXfoZi01ZsM
- DOCX: https://drive.google.com/open?id=1DHC2ykDoKCX99AIu2SVAhFHJMGKmw8uI

The official text states that the system was approved on 26 June 2019 by the Academic Council of the A. Yu. Krymskyi Institute of Oriental Studies, NAS of Ukraine (protocol no. 4). I retrieved the DOCX through its direct download endpoint and compared its syllable table with the CSV's `НАНУ` column. This partial row-level collation found 410 distinct Pinyin keys in the official table. The CSV now represents all 410 with exact NANU outputs. Four existing cells were corrected: `di` was `ди` instead of `ді`; `rou` was `роу` instead of `жоу`; and the previously blank `pou` and `pu` cells were `поу` and `пу`. The official table's additional `ten — тень` entry has been added as a NANU-only row; the Kirnosova and Kirnosova—Tsisar cells are explicitly blank because corresponding mappings have not yet been verified in those sources. Regression tests check the four corrections and the source-specific `ten` entry.

This is meaningful primary-source verification, but not yet an exhaustive semantic review of every row or every transcription rule. The audit ledger records the specific comparisons and remaining work.

### Mandarin IPA reference

University of Washington, “Mandarin Chinese Syllables”:
https://courses.washington.edu/chin342/ipa/syllables.html

This provides a useful syllable-by-syllable Pinyin/IPA comparison, including apical vowels and finals. The project’s IPA is explicitly broad practical IPA, so transcription conventions must be stated and applied consistently; no single broad IPA convention should be described as the only possible narrow phonetic realization.

## Inventory comparison against the University of Washington chart

I parsed the chart's published syllable table and compared its Pinyin entries with the canonical CSV:
- 403 unique syllable keys in the chart;
- all 403 are represented in the CSV;
- 18 additional CSV keys are absent from that chart: `cei`, `den`, `dia`, `fiao`, `hm`, `hng`, `lo`, `m`, `me`, `n`, `ng`, `nun`, `o`, `rua`, `tei`, `ten`, `yo`, and `ê`.

This is a coverage comparison, not proof that the 17 additional forms are invalid. Some are syllabic nasals or interjections/marginal forms; each should receive an explicit inventory-status label and a source before the table is described as a standard-syllable inventory.

The chart's 403 unique Pinyin keys are now stored as a source-attributed regression fixture at `tests/mandarin-syllable-inventory.mjs`; an automated test requires the IPA converter to map every one. This is a coverage gate, not a pronunciation-accuracy assertion.

A mechanical comparison of the chart's 404 populated syllable cells (403 unique keys) with the project's generated broad IPA found 244 literal string differences. This is **not** a count of 244 proven pronunciation errors; it is a review queue, because many differences are systematic notation choices. It shows that the project needs an explicit phonetic convention and evidence-backed decisions for each difference class. Examples include `ai` vs `aɪ`, `iɛ` vs `jɛ`, `aŋ` vs `ɑŋ`, `yɛ` vs `ɥe`, and `ɹ` vs `ɻ`). These are not automatically phonetic errors: the chart uses a different broad transcription convention in several places. The project has now documented its chosen broad-IPA convention in [IPA-CONVENTION-DECISION-2026-10-18.md](IPA-CONVENTION-DECISION-2026-10-18.md) and added representative notation regression tests. This resolves the documentation gap, but not the need to review mapping accuracy class by class. The `o/uo/wo/er` changes match the chart's displayed values but remain provisional as phonetic claims until further evidence is collected.

Source: University of Washington, “Mandarin Chinese Syllables”: https://courses.washington.edu/chin342/ipa/syllables.html

### Blank-output inventory

A programmatic pass over the corrected CSV found:
- 421 data rows and no rows with all three Ukrainian outputs blank;
- 1 blank cell in the Kirnosova column (`ten`);
- 1 blank cell in the Kirnosova–Tsisar column (`ten`);
- 10 blank cells in the NANU column.

The 10 remaining NANU blanks are keys `ê`, `fiao`, `hm`, `hng`, `kei`, `m`, `n`, `ng`, `rua`, and `yo`. The previously blank `pou` and `pu` cells were filled from the official ASTKS table. The remaining blanks stay explicit until the official source or its rules establish whether a mapping is intended.

## Important audit observations

1. The CSV contains 421 rows, including non-ordinary or marginal forms (for example `ê`, `hm`, `hng`, and syllabic `m`, `n`, `ng`) and entries with deliberately blank outputs. These should be tagged by status (standard syllable, marginal/interjection, phonetic edge form, unsupported/unresolved) rather than all being presented as equally ordinary Mandarin syllables.
2. A blank output remains a real missing mapping. Do not fill it by copying another system's value.
3. A syllable table cannot resolve a polyphonic Han character by itself. The selected Pinyin reading depends on the upstream pronunciation engine and its dictionary/context coverage.
4. The IPA layer is a finite mapping. The current regression tests cover apical vowels, selected tone-marked forms, ü normalization, unsupported `ê`, punctuation, and neutral tone. They do not yet establish exhaustive correctness for every legal Pinyin syllable.
5. A passing build or test suite verifies implemented invariants, not all linguistic decisions in the CSV.

## Remaining work before claiming a complete audit

- Collate all 420 rows against the exact published tables for each Ukrainian system; record source page/table/rule and reviewer status per row.
- Build a canonical Mandarin syllable inventory and classify each CSV key as standard, marginal, historical/edge, or unsupported. The current reference-chart comparison found all 403 chart keys present and 18 extra CSV keys requiring classification.
- Decide the global IPA convention before treating the four final changes as final: align all relevant mappings to the selected chart, or keep a distinct convention with independently sourced justification. The 403-syllable fixture currently tests coverage only.
- Independently review every IPA initial/final combination, including `o`, `e`, `er`, `ong`, `iong`, `zhi/chi/shi/ri`, `zi/ci/si`, `ju/qu/xu`, `jue/que/xue`, tone-marked Pinyin, numeric tones, and neutral tone.
- Complete the existing provenance ledger with exact source evidence for every row in all three systems, plus review date, status, and documented resolution of disagreements.
- Add context-sensitive polyphonic regression cases for the pinned Pinyin engine, covering simplified and traditional input.
- Publish a versioned audit report and rerun all CI checks before merging.

## Verdict

The first pass found and fixed one confirmed table character error, removed a misleading fixed contour for neutral tone, and provisionally aligned four IPA finals with one reference chart. Further inspection showed that the converter and chart use systematic notation differences elsewhere, so the four final changes must not be presented as final phonetic corrections until a global IPA convention is chosen. The official ASTKS table has now been directly compared with the NANU column for its 410 listed syllables; four cell discrepancies were corrected, the source-specific `ten` entry was added, and regression tests cover those decisions. The full linguistic audit remains open. The table is **not yet certified as fully audited**: row-by-row source evidence and exhaustive IPA review remain open tasks.


## Follow-up inventory cross-check (2026-10-18)

A separate classification note now documents all 18 CSV keys absent from the University of Washington syllable chart and cross-checks them against the extracted Kirnosova (2009) table and current CSV values:

- [Reference-inventory exception classification](REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md)
- The 2009 table extraction contains 17 of those 18 keys; `ten` is absent there but independently verified in the official NANU table.
- Absence from the UW chart is explicitly treated as a scope difference, not proof that a key is invalid.
- `rua` is no longer treated as a confirmed discrepancy: the extracted 2009 PDF text says `жува`, but a published comparative table reproduces `жуа` for Kirnosova and `жва` for Kirnosova–Tsisar, matching the current CSV. This secondary corroboration makes an extraction artefact more likely; no mapping was changed. The same table corroborates the current `hm`, `hng`, `o`, and `ê` values, but is not a substitute for primary-page verification. The `nun → нвень` value is not treated as an error: a published comparative table reproduces it for Kirnosova–Tsisar, although the primary 2019 source remains preferable.
- The source ledger now links the exception note and records these two review targets.

This follow-up narrows the next manual review but does not change the overall audit status: the Kirnosova table still requires faithful cell-by-cell collation, and the IPA convention decision remains open.

## IPA convention decision and regression coverage

The converter's broad IPA notation is now documented in [IPA-CONVENTION-DECISION-2026-10-18.md](IPA-CONVENTION-DECISION-2026-10-18.md). The University of Washington explicitly describes its own chart as broad transcription and lists conventions that differ from ordinary IPA glide notation and vowel distinctions. Accordingly, the 403-key UW fixture is a coverage reference, not a literal character-by-character IPA gold standard.

Regression tests now lock representative converter choices for `ai`, `ao`, `ang`, `iong`, `yue`, and the `r/ri` distinction. This makes the current implementation's notation intentional and reviewable, but does not certify every mapping or replace a future source-backed, row-by-row phonetic audit.
## Follow-up IPA finals audit (2026-10-18, second pass)

The IPA regression suite now checks representative zero-initial and contracted Pinyin forms across several final classes: yi, wu, yu, you, yuan, yong, jiong, ei, ou, dui, dun, weng, and ong. The assertions are based on the converter's documented broad-IPA convention; they do not treat UW's broad/sinological symbols as literal ordinary-IPA gold outputs.

A source-internal discrepancy was recorded for er: UW's Finals page gives əɹ, whereas the Mandarin Syllables chart displays the standalone syllable as ər. The converter retains əɹ for now because it matches the Finals page and the existing regression test, but this should be regarded as a convention choice pending adjudication, not as a fully settled source fact. The same caution applies to ong and the contracted ui/un finals, where the UW chart's glide notation differs from the project's ordinary-IPA notation.

The expanded tests improve regression coverage but do not prove every mapping phonetically correct. Full linguistic certification remains open.
## Numeric-tone regression coverage (2026-10-18, third pass)

Added a cross-product test over all 403 syllables in the University of Washington reference fixture. For every listed syllable, it checks that numeric tones 1–4 append the configured citation-form contour and that suffixes 0 and 5 add no fixed contour. This validates parser consistency across the inventory rather than only selected examples.

This test is not a pronunciation gold standard: it uses the converter's own segmental output as a baseline and validates tone handling only. It cannot detect a vowel or consonant mapping error shared by every tone variant. Segmental evidence review remains open.
## Tone-mark parsing equivalence (2026-10-18, fourth pass)

Added regression coverage comparing tone-marked Pinyin with its numbered equivalent for first through fourth tones, common diphthongs, the `uo/ui` families, and `ü` forms (including `nǚ`, `lǜ`, `jué`, `yuán`, and `xiōng`). These checks target a separate risk from the numeric-tone cross-product: the mark-extraction and diacritic-stripping path could fail even when numeric suffixes work.

The test checks representation equivalence, not the linguistic correctness of the chosen segmental symbols or tone contours. It is paired with the all-inventory numeric-tone test and does not replace an independently annotated IPA gold set.
## Segmental audit finding: `o` and `wo` were conflated (2026-10-18)

The independent chart comparison identified a concrete mapping issue in the previous converter: `o` was represented as `uɔ`, causing `bo/po/mo/fo` to gain an extra [u]-like element, while standalone `wo` was also represented as `uɔ`, omitting the glide [w]. The implementation now maps `o` to `ɔ` and `wo` to `wo`; `uo` remains `uɔ` pending a more complete adjudication. Regression tests cover `o`, `bo`, `po`, `mo`, `fo`, `wo`, and `duo`.

Evidence: University of Washington's Mandarin syllable chart lists the labial-initial examples as [pɔ], [pʰɔ], [mɔ], [fɔ] and its finals chart lists `wo` as [wo]. The University of Hawaiʻi teaching chart independently presents the same initial-vowel contrast, though its extracted table contains other inconsistencies. Sources: https://courses.washington.edu/chin342/ipa/syllables.html ; https://courses.washington.edu/chin342/ipa/finals.html ; https://laulima.hawaii.edu/access/content/group/613e6b40-7843-4d5c-94ca-41a9e0831b95/CBasic1/u1/u1_p1.html .

This is the first source-supported segmental mapping correction in this pass. It does not close the full IPA audit; `uo`, rhotic/apical vowels, and the broader finals inventory still need independent comparison.
