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


## Consolidated interaction gate — 2026-10-23

The prior test set verified keyboard focus and the presence of copy/speech controls, but did not prove the resulting side effects. Added one consolidated browser regression batch to exercise:
- each of the five copy actions against the exact target text and the live-region success message;
- independent Pinyin-tone and Ukrainian-tone changes, asserting each control leaves the other representation unchanged;
- speech API invocation and the button's accessible active/stop state using a deterministic browser API mock (this validates integration behavior, not the user's installed Chinese voice or physical audio output);
- long mixed-script input at 320/360/390/430/1280 CSS px, checking no document/body horizontal overflow and no uncaught page exceptions.

These are regression tests, not a substitute for manual assistive-technology review or a real-device audio/clipboard permission check. The rare-character issue state still needs a stable, corpus-grounded fixture before it can be counted as covered. The latest full verification result must be read from the workflow attached to the final branch SHA; earlier successful runs are historical evidence only.


## Consolidated gate findings and corrective batch — 2026-10-23

- Workflow [#351](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39951570103) ran the expanded browser suite on `d40d29533fff40e4917d5ab6c2094f60098ff123`. All non-browser gates passed; browser tests reported **47 passed, 4 failed, 1 skipped** across Chromium and mobile projects.
- The two failures repeated across projects had two concrete causes: the tone-control test attempted to click visually hidden checkbox inputs through an overlaid switch track; and long mixed-script content caused an 8px horizontal overflow at the 1280px viewport.
- Corrective batch changes the test to click the visible accessible switch label and constrains result metadata grid tracks and long metadata strings to prevent intrinsic-width overflow. The next workflow on the corrected SHA is the acceptance gate; this failed run remains recorded as a failure, not a pass.
- Speech API behavior is mocked in CI and does not establish actual audio output on a physical device. Manual screen-reader and uncertain-pronunciation fixture coverage remain outstanding.


## Follow-up result and viewport overflow fix — 2026-10-23

- Workflow [#352](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39952763417) ran on `c020cd61d1952da63376c982d7b928d1d1aba2b8`. **49 browser tests passed, 2 failed, 1 intentionally skipped**; all preceding workflow gates passed and both visual/dependency artifacts uploaded.
- Both failures were the same real layout defect at 1280 CSS px: the document was 1288px wide. Inspection identified the absolutely positioned contextual-help tooltip: its desktop `left: 0` anchoring let the last result card's tooltip extend beyond the viewport even while hidden.
- The next correction anchors the tooltip to the right edge of its trigger and caps its width against the viewport. This addresses the source of the overflow rather than suppressing the test with `overflow-x: hidden`.
- The run's npm audit JSON artifact should be inspected with the next gate; do not infer its vulnerability count from earlier runs. Physical audio and assistive-technology testing remain outside automated CI evidence.


## Final exact-head gate and screenshot review — 2026-10-23

- The current acceptance run is [quality workflow #353](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39961683974), completed with **success** on exact branch head `6951e0f14cd74473b20e75d1f986a0fd498e380d`.
- Browser suite: **52 tests total; 51 passed, 1 intentional skip, 0 failed**. The skipped test is the canonical screenshot capture that is intentionally not repeated in the non-Chromium project.
- All workflow gates completed successfully: dependency installation and audit capture, unit/integration tests, Python acoustic-pipeline input guards, production build, generated mapping determinism, conversion benchmark, release constraints, browser regressions, and artifact uploads.
- Downloaded and inspected the exact-head npm audit JSON: `total: 0` (0 info, low, moderate, high, critical; empty vulnerability list). This supersedes the earlier stale note about a high-severity advisory; that earlier observation belonged to an older dependency tree/run and must not be presented as the current result.
- Downloaded the exact-head `redesign-visual-qa` artifact (15 PNGs) and assembled/inspected a contact sheet spanning empty converter, populated results, and methodology at 320, 360, 390, 430 and 1280 CSS px. No apparent clipped major controls or horizontal overflow were visible at the contact-sheet scale; this remains representative screenshot review, not a substitute for inspecting every page pixel or performing manual assistive-technology testing.
- Existing browser automation verifies basic keyboard traversal to the methodology link and input, focus-triggered contextual help, reduced-motion preference exposure, copy side effects, clear/example controls, speech UI integration with a mock, uncertainty-state behavior where exercised, and viewport overflow. This is automated evidence only.
- The final tooltip fix is validated by the exact-head overflow regression: the contextual-help popover is right-anchored and width-capped; no global `overflow-x: hidden` suppression was added.
- Remaining evidence-limited items: manual screen-reader/assistive-technology review; real-device audio and browser clipboard permission behavior; and a stable corpus-grounded rare/unresolved mapping fixture. No unsupported linguistic example has been invented. No merge or deployment is claimed.

**Exact-head disposition:** automated release gates **DONE_VERIFIED**; screenshot artifact and representative contact-sheet review **DONE_VERIFIED**; broader accessibility/real-device review **PARTIAL**; corpus-grounded uncertainty fixture **TODO**. Overall: automated-test green, not fully release-approved.


## Chinese-lucky red accent revision — 2026-10-23

- **Requested visual change:** replace the previous blue interaction accent with restrained red, reflecting the user's preference for red as a Chinese cultural symbol of good fortune.
- **Implementation:** updated shared CSS tokens to `--accent: #b4232f`, `--accent-dark: #8f1722`, `--accent-soft: #fff0f0`, and `--focus: #b4232f`; updated the Pinyin panel border and tone-key accent to coordinate without changing the three Ukrainian systems' equal visual weight.
- **Regression coverage:** updated the browser color-token expectations and retained the WCAG AA contrast assertions for accent text and white text on the primary action. The tests must run against this exact branch head before merge.
- **Scope:** no conversion logic, source data, output mapping, runtime dependencies, or script inference changed. This is a visual-token and documentation adjustment only.
- **Cultural framing:** red is used as a restrained cultural design reference, not as an assertion that every Chinese user shares one preference, and not as a semantic status color.
- **Status:** implementation prepared; CI and deployment remain unverified until the new branch's workflow completes and the change is merged.
