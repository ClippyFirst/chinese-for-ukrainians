# Classification of Mandarin reference-inventory exceptions — 2026-10-18

## Purpose and method

The 421-row `zh-in-ua.csv` is a merged practical transcription inventory. It is not identical in scope to every published Mandarin syllable chart. This note classifies the 18 Pinyin keys present in the repository inventory but absent from the University of Washington (UW) “Mandarin Chinese Syllables” chart.

Sources compared:

- UW chart: https://courses.washington.edu/chin342/ipa/syllables.html
- N. A. Kirnosova (2009), “Засади транскрибування китайської лексики українською мовою,” table “Транскрипція китайських складів українською мовою”: https://nasplib.isofts.kiev.ua/bitstreams/e3cc5ddf-1548-45ff-856c-55cb34f722c7/download
- Official NANU / ASTKS system: https://www.oriental-studies.org.ua/uk/затверджена-академічна-система-тран/

The Kirnosova PDF text was extracted automatically. The table contains OCR/extraction corruption in several cells, so the extracted outputs below are evidence for inventory presence, not a license to bulk-correct the CSV. A secondary published comparison table (EverybodyWiki, which is not an independent primary source) was then checked for several disputed rows. It reproduces the current values for `hm`, `hng`, `o`, `ê`, and `rua`; therefore the isolated PDF extraction `rua → жува` is likely an extraction artefact, not sufficient evidence to change `жуа`. Primary page-image verification is still outstanding.

## Exception inventory

| Pinyin key | Present in Kirnosova (2009) table? | Current CSV values (Kirnosova / Kirnosova–Tsisar / NANU) | Audit classification |
|---|---|---|---|
| `cei` | Yes (`цей`) | `цей / цей / цей` | Outside UW chart; present in Ukrainian transcription inventory |
| `den` | Yes (`день`) | `день / день / день` | Outside UW chart; present in Ukrainian transcription inventory |
| `dia` | Yes (`д'я`) | `д'я / дя / дя` | Outside UW chart; systems differ in apostrophe treatment |
| `fiao` | Yes (`фяо`) | `фяо / ф'яо / —` | Outside UW chart; present in Kirnosova; NANU cell blank |
| `hm` | Yes (PDF extraction is inconsistent) | `хм / гм / —` | Secondary comparison reproduces `хм / гм`; primary-page visual verification still desirable; NANU cell blank |
| `hng` | Yes (PDF extraction returns Latin-looking `x`) | `х / гм / —` | Secondary comparison reproduces `х / гм`; extraction's Latin-looking glyph is not trusted; NANU cell blank |
| `lo` | Yes (`ло`) | `ло / ло / ло` | Outside UW chart; present in Ukrainian transcription inventory |
| `m` | Yes (`м`) | `м / м / —` | Syllabic/interjection-like form; outside UW chart; NANU cell blank |
| `me` | Yes (`ме`) | `ме / ме / ме` | Outside UW chart; present in Ukrainian transcription inventory |
| `n` | Yes (`н`) | `н / н / —` | Syllabic/interjection-like form; outside UW chart; NANU cell blank |
| `ng` | Yes (`н`) | `н / н / —` | Syllabic/interjection-like form; outside UW chart; NANU cell blank |
| `nun` | Yes (`нунь`) | `нунь / нвень / нунь` | Confirmed source-specific difference: the published comparative table lists `нвень` for Kirnosova–Tsisar; retain it, do not normalize to other systems |
| `o` | Yes (PDF extraction returns Latin-looking `o`) | `о / о / о` | Secondary comparison reproduces Cyrillic `о` in both columns; keep current CSV values |
| `rua` | Yes (PDF extraction says `жува`; secondary comparison says `жуа / жва`) | `жуа / жва / —` | Secondary table corroborates current CSV values; treat `жува` as likely extraction artefact, not a confirmed discrepancy; NANU cell blank |
| `tei` | Yes (`тей`) | `тей / тей / тей` | Outside UW chart; present in Ukrainian transcription inventory |
| `ten` | Not found in the 2009 table | `— / — / тень` | NANU-only row, verified against the official NANU table; do not infer missing outputs for other systems |
| `yo` | Yes (`йо`) | `йо / йо / —` | Outside UW chart; present in Kirnosova; NANU cell blank |
| `ê` | Yes (PDF extraction returns Latin-looking `e`) | `е / е / —` | Secondary comparison reproduces `е / е`; keep current values while noting NANU cell blank |

`—` means an empty CSV cell.

## Findings

1. **Absence from the UW chart is not evidence of invalidity.** Seventeen of the 18 keys were located in the 2009 Kirnosova table. The remaining key, `ten`, is an independently verified NANU entry.
2. The 2009 article explicitly says the practical inventory includes 420 syllables, accounting for rarely used forms. Its scope is therefore not expected to be identical to every pedagogical or phonetic reference chart.
3. The keys `m`, `n`, and `ng` are represented as independent forms in the Ukrainian table. Their status and IPA rendering should be documented separately from ordinary consonant-plus-vowel syllables.
4. The `rua` discrepancy is **not confirmed**: PDF text extraction returns `жува`, but the published comparison table reproduces `жуа` for Kirnosova and `жва` for Kirnosova–Tsisar, matching the current CSV. Retain the current values unless a clear primary-page image contradicts them. The same comparison corroborates the current `hm`, `hng`, `o`, and `ê` cells, but it is secondary evidence rather than a substitute for the original table. By contrast, `nun` is **not** a confirmed discrepancy: the published comparative table reproduces `нвень` in the Kirnosova–Tsisar column, so that source-specific value should be retained. The original conference proceedings are discoverable at [the Karazin University PDF](http://foreign-languages.karazin.ua/resources/38a431e26e297a45b2a1b5d0c7d34ac9.pdf); the full proceedings PDF is accessible, although reliable page-targeted extraction of pp. 65–66 remains to be completed.
5. The extracted text cannot reliably distinguish Latin from Cyrillic look-alike glyphs in cells such as `o`, `ê`, and `hng`. The secondary table helps resolve the likely intended Cyrillic values, but it is not an independent primary witness. Do not treat OCR output as exact character-level evidence.

## Next verification gate

Before claiming complete source collation:

- inspect the printed table cells for `rua`, `hm`, `hng`, `o`, and `ê` if page-image access becomes available; secondary comparison currently corroborates the CSV, so do not alter these cells based on OCR alone;
- keep `nun → нвень` for Kirnosova–Tsisar as supported by the published comparative table;
- keep UW chart coverage as a reference-coverage metric, not as the canonical validity test for the Ukrainian inventory;
- preserve source-specific blanks unless an authoritative source supplies the missing value.
