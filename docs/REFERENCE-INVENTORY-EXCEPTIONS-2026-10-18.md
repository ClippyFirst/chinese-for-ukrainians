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

`—` means an empty CSV cell. For the ten NANU blanks (`ê`, `fiao`, `hm`, `hng`, `kei`, `m`, `n`, `ng`, `rua`, `yo`), comparison with the official 410-key NANU/ASTKS inventory shows that each key is absent from the official table. These are source-coverage gaps, not unreviewed values in rows the official table actually lists. Keep them blank unless a revised authoritative source adds them.

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

## Follow-up inventory classification from independent syllable inventories (2026-10-18)

A further cross-check was made against two public inventories that explicitly distinguish ordinary Mandarin syllables from rare, dialectal, interjectional, or dictionary-only readings:

- PinyinJS, **Syllables**: https://pinyinjs.dev/syllables/ — its dictionary inventory explicitly calls out rare forms including cei, fiao, lo, rua, and tei; it notes that lo is tone-limited and separates dictionary readings from the attested standard inventory.
- **Mandarin-Chinese-Syllable-Dataset**: https://github.com/danielwei0214/Mandarin-Chinese-Syllable-Dataset — its description annotates several uncovered syllables with provenance such as rare characters, polyphonic characters, and dialect pronunciations. This is a community dataset, not a normative standard, so it is corroborating inventory evidence rather than a formal ruling.

### Updated status labels

| Key(s) | Best-supported status | Evidence and limits |
|---|---|---|
| cei | Rare/dictionary-attested | The syllable inventories classify it as rare; a dataset note associates it with an uncommon character. Do not treat it as a common standard syllable. |
| den | Dialectal/rare reading | The dataset associates it with 扽. It is outside the UW teaching chart and should be tagged as dialectal rather than silently deleted. |
| dia | Dialectal reading | The dataset associates it with 嗲. |
| fiao | Rare/dictionary-attested edge form | PinyinJS explicitly includes it among rare dictionary syllables; no claim is made here about ordinary Putonghua frequency. |
| hm, hng | Interjectional/onomatopoeic or syllabic-nasal edge forms | The community inventory links hng to an alternative reading of 嗯 and hm to a rare character. Keep distinct from ordinary CV syllables. |
| lo | Polyphonic, tone-limited reading | PinyinJS identifies 咯 (lo) as a reading and reports neutral-tone-only use in its inventory. |
| m, n, ng | Syllabic nasal / interjectional edge forms | These have dictionary and phonological references but are not ordinary consonant-plus-vowel syllables; the IPA layer must treat them explicitly. |
| me | Attested but outside the UW chart's scope | Preserve the source-specific transcription. Its tone and lexical distribution need a separate tone-aware inventory check before describing it as unrestricted. |
| nun | Rare-character reading | The community dataset associates it with 黁. Keep it as a rare attested form, not a productive standard syllable. |
| o | Marginal standalone/interjectional form | Preserve the Ukrainian source-table entry but keep its IPA and inventory policy separate from ordinary syllables and from labial-conditioned bo/po/mo/fo. |
| rua | Rare-character reading | The community dataset associates it with 挼; this supports treating it as rare/lexical rather than as an ordinary productive syllable. |
| tei | Dialectal/rare reading | The dataset associates it with 忒; PinyinJS also lists it as rare. |
| yo | Unresolved marginal form | The sources reviewed here do not establish its exact lexical/tone status. Retain it as source-attested, but do not label it a standard syllable without further evidence. |
| ê | Dictionary/interjection edge form | It is present in specialist dictionary inventories but is not part of the ordinary UW syllable chart. It remains unsupported in the IPA converter and should continue to be marked as such. |

### Special caution: ten

The current CSV contains a NANU/ASTKS mapping for **ten → тень**, but the standard/rare syllable inventories reviewed here list **tei**, not **ten**, among the unusual T-series forms. The 2009 Kirnosova PDF extraction does not show a ten row, while a 2013 public Ukrainian transcription table and the current official ASTKS table do contain ten. This is a **source-specific unresolved entry**, possibly a legacy table convention or a typographical/key error; the evidence does not justify either silently deleting it or claiming it is a standard Mandarin Pinyin syllable.

Action taken: no CSV value was changed. The existing ten row remains source-faithful to the official ASTKS table, but future UI or documentation should label it as source-specific/unresolved until the original table and the system authors' intended spelling can be confirmed. The Kirnosova and Kirnosova–Tsisar cells remain blank because their corresponding ten mappings have not been verified.

Sources for the special caution:
- Public Ukrainian transcription table listing ten — тень: https://www.epochtimes.com.ua/china/chinese-characters/znayomtesya-nova-ukrayinska-sistema-transkriptsiyi-kitayskikh-ieroglifiv-107641.html
- Official interactive ASTKS resource and approval statement: https://pinyin.in.ua/
- Standard syllable-combination chart: https://pinyin.info/rules/initials_finals.html

This classification improves inventory provenance but is not a replacement for a primary Chinese dictionary citation for every rare key. In particular, yo and the precise status of standalone o remain unresolved.
