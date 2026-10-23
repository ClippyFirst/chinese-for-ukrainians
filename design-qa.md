# Design QA — redesign branch

**Automated gate: DONE_VERIFIED. Manual visual gate: BLOCKED.**

## Scope and acceptance

- Pages: `index.html` (converter) and `methodology.html`.
- Viewports covered by the design-specific browser test: desktop 1280px and mobile widths 320, 360, 390 and 430 CSS px.
- Product invariants: preserve IPA output, three equally weighted Ukrainian systems, copy/example/clear/speech controls, uncertainty states, and methodology navigation.
- No pixel-specific source mockup exists; evaluate against the repository design brief, not pixel-perfect matching.

## Verified evidence

- Quality workflow run [#332](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39855942886) passed on code commit `b47e1caa9342fddd1fafed5427328f8a0cb98cca`. All workflow steps succeeded, including install, unit/integration tests, acoustic-pipeline input guard, production build, generated-mapping determinism/drift check, conversion benchmark, release constraints, browser installation and browser tests.
- The run #332 browser log explicitly reports **38 tests, 38 passed, 0 failed**. The suite includes the design-specific checks for core token contrast, action colors, equal result-card widths, mobile stacking/no horizontal overflow at 320/360/390/430px, and shared methodology-page tokens.
- Quality workflow run [#333](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39856093650) passed on documentation-only follow-up commit `a4d28ffb88db1cf92641b525ff1122ba3562f4b7`, including browser tests.
- Quality workflow run [#335](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39856361199) passed on branch head `fe71f0ce042e67af6d9d8d9b01d9a6e8b4602213`; every workflow step completed successfully, including browser regression tests. Its job log reports **38 passed (19.6s)**.
- Core design token contrast ratios independently calculated: ink/paper 16.04:1; muted/paper 5.27:1; accent/paper 8.87:1; white/accent 9.93:1; warning/warning-surface 5.83:1. This validates those pairs only, not every rendered text element.
- A lightweight CSS structure scan found balanced braces and no unclosed quote/comment. This is not a standards-compliant CSS parser.
- `src/styles/main.css` was kept identical to the default branch; the redesign is isolated in `src/styles/redesign.css`. Converter algorithms, mapping data, generated mappings and runtime dependencies were not changed.

## Outstanding findings

- [P1 — BLOCKED] No rendered screenshot was captured or reviewed in this execution session. Consequently, actual font fallback, spacing, visual hierarchy, tooltip placement, focus appearance and cross-browser rendering are not manually verified.
- [P2 — BLOCKED] No before/after screenshot comparison exists. This is not a pixel-fidelity task because no reference mockup was supplied.
- Local clone/browser execution was blocked by inability to resolve `github.com` in the local container. The connected screenshot-scraping service reported insufficient credits, so no screenshot result is claimed.

## Screenshot evidence pipeline added — 2026-10-23

- Added `tests/browser/design-visual-evidence.spec.js`. It captures full-page screenshots of the converter empty state, populated example/results state, and methodology page at 320, 360, 390, 430 and 1280 CSS px.
- Added a GitHub Actions artifact step named `redesign-visual-qa` with a seven-day retention period. The artifact is emitted even if later workflow steps fail, when screenshots exist.
- This change makes screenshot evidence collectable despite local DNS and screenshot-service limitations. It does **not** itself count as manual visual approval. The new workflow run must pass, the artifact must exist, and the images must be inspected before the visual gate can be closed.

## Manual visual QA still required

1. Capture the converter and methodology pages at 320, 360, 390, 430 and desktop widths.
2. Inspect empty, populated-result and uncertainty/issue states; Chinese characters, Pinyin tone diacritics, IPA and Ukrainian text; card/page spacing; tooltip and keyboard-focus visibility.
3. Exercise keyboard-only navigation, reduced motion, long mixed-script content, copy/example/clear/speech controls and methodology navigation; inspect console errors.
4. Record concrete P0/P1/P2 findings, fix actual defects, and re-run the affected browser checks.
5. Reconcile this document and the master handoff with the observed screenshot evidence.

## Checklist

- [x] Repository-specific design contract exists.
- [x] Shared redesign layer is separate from base CSS and loaded on both pages.
- [x] Design-specific browser tests cover contrast, card weighting, four mobile widths and methodology-page styling.
- [x] CI on the latest checked branch head passed all defined workflow steps, including **38/38 browser tests**.
- [x] Canonical handoff and QA record updated with actual CI evidence.
- [ ] Rendered browser screenshots captured and manually reviewed.
- [ ] Any screenshot-derived findings fixed and rechecked.

**Overall outcome:** automated implementation/regression gates are green; visual design acceptance is still **BLOCKED** on real rendered screenshots and manual review. Do not describe the redesign as fully visually approved, merged, or deployed.
