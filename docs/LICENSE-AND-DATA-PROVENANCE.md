# License and data provenance scope note

**Status:** documentation audit; not legal advice.  
**Reviewed:** 2026-10-20  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians

## What is directly evidenced

- The repository root contains an MIT `LICENSE` with the notice `Copyright (c) 2026 The Clippy First`.
- The application is a static browser tool. Its canonical Ukrainian transcription inventory is `zh-in-ua.csv`; the repository documents scholarly and institutional sources in `docs/PHONETIC-REPRODUCIBILITY.md`, `docs/REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md`, and `docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv`.
- `package.json` pins `pinyin-pro@3.29.4` and `@pinyin-pro/data@1.3.1`. Their license and notices belong to the upstream packages and must be retained/handled according to their own terms.
- The repository also cites scholarly publications, institutional tables, and external reference charts. A citation or URL establishes provenance, not permission to reproduce or relicense the source.

## Safe interpretation

The MIT notice is the repository's declared license for the software and associated material to which the repository's copyright holder can grant those rights. The presence of this root license alone does **not** establish that every third-party text, dataset, table, transcription, package, logo, or linked source is itself MIT-licensed or that third-party rights have been cleared.

Do not describe the CSV as a universally cleared, public-domain, or wholly MIT-licensed dataset without a separate evidence-based rights review. Likewise, do not infer that cited source publications have been relicensed by this repository.

## Required release hygiene

1. Preserve the root MIT notice and upstream dependency license/notice files when distributing builds, as required by their respective terms.
2. Maintain source URLs, bibliographic references, and source-specific evidence in the existing provenance ledger. Keep reproduced source content limited to what has been reviewed for the intended use.
3. Before a stable release or dataset redistribution, review applicable terms for each upstream package, source table, and substantial reproduced material; record attribution or redistribution conditions and unresolved questions.
4. Keep the three Ukrainian transcription columns independent. Provenance uncertainty is not permission to fill blanks or normalize disagreements between systems.
5. Do not add a blanket statement such as “all content is MIT-licensed” unless an authorized maintainer has verified that claim.

## Remaining uncertainty

This note is a cautious scope statement, not a completed file-by-file rights clearance. No separate rights grant from the cited publications or institutions was established during this pass. Keep the public beta / research-preview framing until a maintainer has reviewed applicable source-data reuse conditions.
