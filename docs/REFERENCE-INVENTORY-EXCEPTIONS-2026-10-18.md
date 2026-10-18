# Classification of Mandarin reference-inventory exceptions — 2026-10-18

## Purpose and method

The 421-row `zh-in-ua.csv` is a merged practical transcription inventory. It is not identical in scope to every published Mandarin syllable chart. This note classifies the 18 Pinyin keys present in the repository inventory but absent from the University of Washington (UW) “Mandarin Chinese Syllables” chart.

Sources compared:

- UW chart: https://courses.washington.edu/chin342/ipa/syllables.html
- N. A. Kirnosova (2009), “Засади транскрибування китайської лексики українською мовою,” table “Транскрипція китайських складів українською мовою”: https://nasplib.isofts.kiev.ua/bitstreams/e3cc5ddf-1548-45ff-856c-55cb34f722c7/download
- Official NANU / ASTKS system: https://www.oriental-studies.org.ua/uk/затверджена-академічна-система-тран/

The Kirnosova PDF text was extracted automatically. The table contains OCR/extraction corruption in several cells, so the transcribed outputs below are evidence for inventory presence, not a license to bulk-correct the CSV. Candidate output discrepancies are explicitly left unresolved until checked against the PDF page image or a reliable manual transcription.

## Exception inventory

| Pinyin key | Present in Kirnosova (2009) table? | Current CSV values (Kirnosova / Kirnosova–Tsisar / NANU) | Audit classification |
|---|---|---|---|
| `cei` | Yes (`цей`) | `цей / цей / цей` | Outside UW chart; present in Ukrainian transcription inventory |
| `den` | Yes (`день`) | `день / день / день` | Outside UW chart; present in Ukrainian transcription inventory |
| `dia` | Yes (`д'я`) | `д'я / дя / дя` | Outside UW chart; systems differ in apostrophe treatment |
| `fiao` | Yes (`фяо`) | `фяо / ф'яо / —` | Outside UW chart; present in Kirnosova; NANU cell blank |
| `hm` | Yes (extraction: `rm`; likely OCR ambiguity) | `хм / гм / —` | Outside UW chart; source output requires visual verification; NANU cell blank |
| `hng` | Yes (extraction: `x`; script ambiguous) | `х / гм / —` | Outside UW chart; source output requires visual verification; NANU cell blank |
| `lo` | Yes (`ло`) | `ло / ло / ло` | Outside UW chart; present in Ukrainian transcription inventory |
| `m` | Yes (`м`) | `м / м / —` | Syllabic/interjection-like form; outside UW chart; NANU cell blank |
| `me` | Yes (`ме`) | `ме / ме / ме` | Outside UW chart; present in Ukrainian transcription inventory |
| `n` | Yes (`н`) | `н / н / —` | Syllabic/interjection-like form; outside UW chart; NANU cell blank |
| `ng` | Yes (`н`) | `н / н / —` | Syllabic/interjection-like form; outside UW chart; NANU cell blank |
| `nun` | Yes (`нунь`) | `нунь / нвень / нунь` | Candidate data discrepancy: `нвень` in Kirnosova–Tsisar column needs source tracing; do not auto-correct from this note |
| `o` | Yes (extraction: Latin-looking `o`) | `о / о / о` | Outside UW chart; Cyrillic/Latin glyph in extracted source is ambiguous |
| `rua` | Yes (extraction: `жува`) | `жуа / жва / —` | Candidate discrepancy in both current Ukrainian outputs; verify the printed source cell before any correction; NANU cell blank |
| `tei` | Yes (`тей`) | `тей / тей / тей` | Outside UW chart; present in Ukrainian transcription inventory |
| `ten` | Not found in the 2009 table | `— / — / тень` | NANU-only row, verified against the official NANU table; do not infer missing outputs for other systems |
| `yo` | Yes (`йо`) | `йо / йо / —` | Outside UW chart; present in Kirnosova; NANU cell blank |
| `ê` | Yes (extraction: Latin-looking `e`) | `е / е / —` | Alternative Pinyin spelling represented in Kirnosova; extracted glyph is ambiguous; NANU cell blank |

`—` means an empty CSV cell.

## Findings

1. **Absence from the UW chart is not evidence of invalidity.** Seventeen of the 18 keys were located in the 2009 Kirnosova table. The remaining key, `ten`, is an independently verified NANU entry.
2. The 2009 article explicitly says the practical inventory includes 420 syllables, accounting for rarely used forms. Its scope is therefore not expected to be identical to every pedagogical or phonetic reference chart.
3. The keys `m`, `n`, and `ng` are represented as independent forms in the Ukrainian table. Their status and IPA rendering should be documented separately from ordinary consonant-plus-vowel syllables.
4. The extracted table flags at least two useful manual-review targets: `rua` (Kirnosova extraction `жува` versus current `жуа`) and `nun` (the current Kirnosova–Tsisar cell `нвень`). Neither is changed here because source-image verification is still required.
5. The extracted text cannot reliably distinguish Latin from Cyrillic look-alike glyphs in cells such as `o`, `ê`, and `hng`. Do not treat OCR output as exact character-level evidence.

## Next verification gate

Before claiming complete source collation:

- inspect the printed table cells for `rua`, `nun`, `hm`, `hng`, `o`, and `ê`;
- trace the `nun` value in the Kirnosova–Tsisar column to the actual source or commit that introduced it;
- keep UW chart coverage as a reference-coverage metric, not as the canonical validity test for the Ukrainian inventory;
- preserve source-specific blanks unless an authoritative source supplies the missing value.
