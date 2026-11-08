# License and data provenance scope note

**Status:** documentation audit; not legal advice.  
**Reviewed:** 2026-10-20  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians

## Ownership and license scope — maintainer confirmation, 2026-11-08

The repository owner confirms that the canonical `zh-in-ua.csv` is their original work and that they own the rights in that compilation. Its inclusion in this repository and the Python package is authorized by the owner. No separate third-party data license is required from the owner for their own CSV. The root MIT `LICENSE` applies to the project code under its terms; it does not force the owner's CSV to become MIT-licensed. The CSV remains under the owner's control unless they choose and document a separate data license. Do not describe it as third-party-derived or block this project solely on a missing CSV license file.

This confirmation concerns authorship/ownership of the CSV compilation. It does not relicense upstream software or dictionaries such as `pypinyin`, `pinyin-pro`, or `@pinyin-pro/data`, whose own notices must be preserved.

## What is directly evidenced

- The repository root contains an MIT `LICENSE` with the notice `Copyright (c) 2026 The Clippy First`.
- The application is a static browser tool. Its canonical Ukrainian transcription inventory is `zh-in-ua.csv`; the repository documents scholarly and institutional sources in `docs/PHONETIC-REPRODUCIBILITY.md`, `docs/REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md`, and `docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv`.
- `package.json` pins `pinyin-pro@3.29.4` and `@pinyin-pro/data@1.3.1`. Public package metadata identifies `pinyin-pro` as MIT-licensed and `@pinyin-pro/data@1.3.1` as ISC-licensed ([npm package metadata](https://www.npmjs.com/package/pinyin-pro?activeTab=dependencies), [jsDelivr version metadata](https://www.jsdelivr.com/package/npm/%40pinyin-pro/data?tab=files)). Preserve and comply with each package's own notice/terms; do not apply the repository's root MIT notice to the ISC package or assume its included dictionary data has no separate provenance questions.
- The repository cites scholarly publications and institutional reference materials to document the linguistic basis of decisions. The owner confirms the canonical CSV is their own compilation; individual citations remain evidence for linguistic claims, not a statement that the source publications themselves are redistributed.

## Safe interpretation

The MIT notice is the repository's declared license for the software and associated material to which the repository's copyright holder can grant those rights. The presence of this root license alone does **not** establish that every third-party text, dataset, table, transcription, package, logo, or linked source is itself MIT-licensed or that third-party rights have been cleared.

Do not describe the CSV as public domain or MIT-licensed unless its owner chooses that license. The owner-authorized use in this project is distinct from relicensing the cited publications.

## Required release hygiene

1. Preserve the root MIT notice and the upstream dependency license/notice files when distributing builds. The core `pinyin-pro@3.29.4` is published as MIT; `@pinyin-pro/data@1.3.1` is published as ISC. Verify the exact installed package archives and their included notices before a stable release.
2. Maintain source URLs, bibliographic references, and source-specific evidence in the existing provenance ledger. Keep reproduced source content limited to what has been reviewed for the intended use.
3. Before a stable release or dataset redistribution, review applicable terms for each upstream package, source table, and substantial reproduced material; record attribution or redistribution conditions and unresolved questions.
4. Keep the three Ukrainian transcription columns independent. Provenance uncertainty is not permission to fill blanks or normalize disagreements between systems.
5. Keep code and dataset rights separate: root MIT covers project code; the original CSV remains under its author's control unless a separate license is explicitly selected.

## Remaining uncertainty

This note records the CSV author's ownership and permission for its inclusion, as confirmed by the repository owner on 2026-11-08. It is not legal advice and does not assign a new license to the CSV. Upstream dependency notices remain separate.
