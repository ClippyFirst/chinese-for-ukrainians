# Secondary full-table comparison — 2026-10-18

## Scope

A machine-readable text version of the full comparative table was retrieved from the EverybodyWiki article on the Kirnosova–Tsisar system:

- Source: https://uk.everybodywiki.com/Система_Кірносової—Цісар
- Table: “Таблиця транскрипції китайських складів українською мовою”
- Source type: **secondary/user-maintained transcription**, not a substitute for the 2009 primary article or the 2019 proceedings PDF.

The table has 420 numbered entries but only 419 unique Pinyin keys after extraction because the page contains two rows labelled `pou`. I compared every extracted key with the repository CSV after Unicode normalization and removal of formatting-only spaces/Markdown. This is a screening comparison, not primary-source certification.

## Results

- Repository CSV: 421 rows.
- Secondary table: 420 numbered rows, 419 unique extracted keys.
- Keys compared directly: 419.
- Repository keys not found under the same spelling in the secondary table: `pu`, `ten`.
- The `ten` row is independently listed in the official NANU/ASTKS table; it is intentionally NANU-only in the repository.
- The secondary table appears to label the `pu` row as a second `pou`. Its two `pou` rows carry conflicting values, so this is treated as a likely key/entry error in the secondary copy—not as evidence to change the repository's `pou` or `pu` mappings.
- The `er/r` row in the secondary table combines spellings and outputs (`ер/р`) in one cell, whereas the repository has the ordinary Pinyin key `er` and output `ер`. This is a granularity difference, not a confirmed mapping error.
- The secondary page's `nüe` cell contains Latin `e` in the Kirnosova column (`нюe`), while the repository now uses Cyrillic `е` (`нюе`). Do not copy the secondary page's look-alike character; the repository's data-integrity regression test correctly rejects Latin letters in Ukrainian output cells.

After separating these structural/OCR-like issues, the automated comparison produced no confirmed substantive transcription discrepancy that should be fixed without returning to a primary source. The raw mechanical diff contained three Kirnosova-column differences (`er/r`, `nüe`, duplicate `pou`) and two Kirnosova–Tsisar-column differences (`er/r`, duplicate `pou`); all five are explained above and none authorizes a bulk edit.

## Interpretation

This comparison is useful as a second witness for the published Ukrainian table and for identifying likely copying errors. It is not independent primary evidence: the online table may reproduce the source, normalize typography, or introduce its own transcription errors. A subsequent extraction of the primary 2009 PDF surfaced two additional candidates: table row 49 `chuo` extracts as `чо` while the repository/secondary copy say `чуо`; row 80 `duo` extracts as `до` while the repository/secondary copy say `дуо`. These are recorded for visual verification, not treated as confirmed errors. The remaining high-confidence gate is to inspect the original printed table, including `chuo`, `duo`, `nüe`, `pou/pu`, `rua`, and `er/r`, and record page-level evidence before changing any source-specific output.
