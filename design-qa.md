# Design QA — redesign branch

**Automated gate: DONE_VERIFIED. Screenshot capture and representative manual visual review: DONE_VERIFIED. Broader interactive/accessibility review: PARTIAL.**

## Scope and acceptance

- Pages: `index.html` (converter) and `methodology.html`.
- Viewports covered: desktop 1280px and mobile widths 320, 360, 390 and 430 CSS px.
- Product invariants: preserve IPA output, three equally weighted Ukrainian systems, copy/example/clear/speech controls, uncertainty states, and methodology navigation.
- No pixel-specific source mockup exists; evaluate against the repository design brief, not pixel-perfect matching.

## Verified evidence

- Quality workflow run [#332](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39855942886) passed on code commit `b47e1caa9342fddd1fafed5427328f8a0cb98cca`. Its browser log reports **38 tests, 38 passed, 0 failed**.
- Quality workflow run [#333](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39856093650) passed on documentation-only follow-up commit `a4d28ffb88db1cf92641b525ff1122ba3562f4b7`.
- Quality workflow run [#335](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39856361199) passed on branch head `fe71f0ce042e67af6d9d8d9b01d9a6e8b4602213`; its browser log reports **38 passed**.
- Quality workflow run [#341](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39913387187) completed with **success** for the screenshot-evidence change. Its browser log reports **40 tests: 39 passed, 1 skipped, 0 failed**. The skip is the intended non-Chromium skip for the one canonical screenshot set. All workflow steps succeeded, including unit/integration tests, acoustic-pipeline input guards, production build, generated-mapping determinism, benchmark, release constraints, browser tests and artifact upload.
- CI artifact [`redesign-visual-qa`](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39913387187) exists (artifact ID `12484115632`, 4,786,132 bytes; 15 PNG files). It contains empty converter, example/results converter and methodology screenshots at all five viewport widths. Artifact expires 2026-10-30.
- Downloaded and inspected the artifact: overview contact sheet of all 15 screenshots and full-resolution examples of the converter results at 320px and 1280px, plus methodology at 320px and 1280px. The inspected renders show the expected hierarchy, responsive stacking, readable Chinese/Pinyin/IPA/Ukrainian output, and no apparent horizontal overflow or clipped major controls at the sampled widths. Methodology is a long, dense page but its sections and tables remain in the document flow. This is representative visual review, not a complete cross-browser or interaction/accessibility audit.
- Design-specific browser tests cover core token contrast, action colors, equal result-card widths, mobile stacking/no horizontal overflow at 320/360/390/430px, and shared methodology-page tokens.
- Core design token contrast ratios independently calculated: ink/paper 16.04:1; muted/paper 5.27:1; accent/paper 8.87:1; white/accent 9.93:1; warning/warning-surface 5.83:1. This validates those pairs only, not every rendered text element.
- A lightweight CSS structure scan found balanced braces and no unclosed quote/comment. This is not a standards-compliant CSS parser.
- `src/styles/main.css` was kept identical to the default branch; the redesign is isolated in `src/styles/redesign.css`. Converter algorithms, mapping data, generated mappings and runtime dependencies were not changed.

## Outstanding findings

- [P2 — PARTIAL] A representative screenshot review is complete, but full manual interaction review remains: keyboard-only navigation, visible focus in rendered states, copy/example/clear/speech controls, issue/uncertainty states, tooltip placement, reduced-motion behavior, long mixed-script input and browser-console errors have not all been exercised manually.
- [P2 — DEFERRED] No before/after screenshot comparison exists. This is not a pixel-fidelity task because no reference mockup was supplied.
- [P2 — NOTE] CI's `npm ci` output reports one high-severity dependency advisory. It does not fail the workflow and was not introduced or changed by the redesign branch; investigate separately before a security-sensitive release. Do not run `npm audit fix --force` blindly.

## Screenshot evidence pipeline — 2026-10-23

- Added `tests/browser/design-visual-evidence.spec.js`. It captures full-page screenshots of the converter empty state, populated example/results state, and methodology page at 320, 360, 390, 430 and 1280 CSS px.
- Added a GitHub Actions artifact step named `redesign-visual-qa` with a seven-day retention period.
- The initial run of the new screenshot test failed before producing screenshots because Playwright's non-exact role locator matched both the page-level H1 and the input-section H2. This was a test-selector ambiguity, not evidence of a rendering defect.
- Corrected the assertion to target the exact accessible heading name `Китайський текст` with `exact: true`. Run #341 then passed and successfully uploaded the artifact.

## Follow-up manual QA still required

1. Exercise keyboard-only navigation, focus visibility, copy/example/clear/speech controls and methodology navigation.
2. Inspect issue/uncertainty states, long mixed-script content and tooltip placement; check reduced-motion behavior and browser console errors.
3. Record concrete P0/P1/P2 findings, fix actual defects, and re-run affected browser checks.
4. Investigate the existing high-severity dependency advisory without blindly applying breaking upgrades.

## Checklist

- [x] Repository-specific design contract exists.
- [x] Shared redesign layer is separate from base CSS and loaded on both pages.
- [x] Design-specific browser tests cover contrast, card weighting, four mobile widths and methodology-page styling.
- [x] CI passes all defined workflow gates, including **39 passed, 1 intended skip, 0 failed** in the 40-test browser run.
- [x] Canonical screenshots captured and artifact downloaded.
- [x] Contact sheet of all screenshots and representative full-resolution desktop/mobile renders visually inspected.
- [x] QA record updated with actual CI and screenshot evidence.
- [ ] Full manual interactive/accessibility review completed.
- [ ] Dependency advisory investigated and disposition recorded.

**Overall outcome:** redesign is **automated-test green and screenshot-reviewed at representative mobile/desktop widths**. The visual screenshot gate is no longer blocked. Broader interactive/accessibility review and the pre-existing dependency advisory remain open; do not describe the work as merged, deployed, or fully release-approved.


## Latest dependency and interaction gate — 2026-10-23

- Quality workflow [#347](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39927362230) verified the patched dependency install and build, but its first expanded browser run exposed an invalid keyboard-focus assertion; this run is **not** counted as a pass.
- Updated `vite` from `8.3.1` to `8.3.5` in `package.json` and `package-lock.json`. The audit report in workflow [#347](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39927362230) records **0 vulnerabilities** for the installed dependency tree.
- Corrected the browser test to assert the actual radio-group interaction: arrow-key navigation changes the selected option. The prior test incorrectly expected the hidden radio input to become the focused element.
- Quality workflow [#349](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39934516492), on commit `26919731d9ea753870e338b16a1babf8360936bd`, completed with **success**. Unit/integration tests, Python acoustic-pipeline guards, production build, generated-mapping determinism, benchmark, release constraints, browser tests and both artifacts all passed.
- New evidence artifact links: [visual QA screenshots](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39934516492/artifacts) and [dependency audit report](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39934516492/artifacts).
- The automated interaction gate now passes, but the PR's broader manual review remains **PARTIAL**: no full assistive-technology audit or human end-to-end check of speech synthesis, actual clipboard write permission, every uncertainty/error state, long mixed-script content and browser console cleanliness has been recorded. Do not mark the PR fully release-approved on CI alone.
