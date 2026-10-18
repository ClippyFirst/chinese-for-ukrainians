# Publication-readiness assessment — 2026-10-18

## Decision

**Suitable for a public beta / research-preview release, not yet suitable to advertise as a fully linguistically validated or academically certified transcription service.**

The app is already deployed as a static GitHub Pages site. This assessment distinguishes operational publication readiness from completion of the underlying phonetic research.

## What is ready for public use

- Static client-side workflow; no user account or backend is required for conversion.
- Simplified/traditional/automatic script mode and preservation of surrounding text.
- Parallel display of Pinyin, broad practical IPA, and the three separately labelled Ukrainian transcription columns.
- Copy controls, visible issue handling, source/methodology page, user guide, and issue-reporting route.
- CSV validation for duplicate normalized keys, row structure, and Latin-script contamination in Ukrainian output cells.
- Unit/integration, production-build, release-constraint, and browser-regression workflows in GitHub Actions.
- Public source links and an explicit record of unresolved evidence in the audit and source ledger.

## Required public-facing qualifications

1. Describe IPA as **broad practical IPA / phonetic approximation**, not narrow phonetic transcription. Neutral tone is not assigned a fixed contour; tone sandhi and all connected-speech effects are not implemented.
2. Explain that Pinyin reading depends on the pronunciation engine's lexicon and context. Polyphonic characters, rare words, names, and domain-specific readings may require manual verification.
3. Present the three Ukrainian outputs as separate source-specific systems. Do not imply they have been fully re-derived from primary sources row by row.
4. Preserve blank source values. Do not fill a missing cell from another system or imply that an empty cell means the syllable is impossible.
5. Keep the research audit accessible and invite issue reports for disputed output.

The current interface's IPA explanation was updated to make the first qualification visible, and a browser regression test now guards against reintroducing the incorrect fixed-mid-level-neutral-tone wording.

## Remaining scientific work — not a blocker for a clearly labelled beta

- Visually collate all rows of Kirnosova (2009) against the original table. Automated PDF extraction has Latin/Cyrillic look-alike and table-cell errors; it is not a reliable authority for mass edits.
- Review all IPA final classes against independent references with their transcription conventions stated, and create an independently adjudicated gold fixture. Current inventory tests prove coverage and internal consistency, not that every segmental symbol is correct.
- Verify marginal or source-specific keys, especially `ten`, `yo`, and standalone `o`, against primary lexicographic or authorial evidence.
- Revisit the published examples and table summaries after the manual source collation, and record every confirmed correction as a regression test.

## Release gate

Before announcing a stable release, confirm all of the following against the latest main commit:

- [ ] Quality workflow passes unit/integration tests, production build, release constraints, and browser tests.
- [ ] GitHub Pages deployment succeeds and the deployed home and methodology pages load.
- [ ] The visible interface accurately describes IPA scope and neutral-tone limitations.
- [ ] The 421-row table validates; source-specific blanks and the `ten` exception are preserved.
- [ ] A maintainer has manually reviewed the public wording, mobile layout, external links, and issue-reporting path.

## Recommended public label

Use **“Public beta — Chinese-to-Ukrainian transcription comparison tool”** or **“Research preview”**. Avoid “fully validated”, “perfectly accurate”, “official converter”, or claims that all outputs have been independently certified. The official status of the ASTKS source system does not make this third-party implementation an official service of the Institute of Oriental Studies or NAS of Ukraine.
