# Design QA — redesign branch

**final result: blocked**

## Comparison artifacts

- Source visual truth: `docs/DESIGN-SYSTEM.md` and `docs/DESIGN-REDESIGN-BRIEF-2026-10-22.md`.
- Source visual screenshot/mockup: unavailable in this session.
- Implementation screenshot: unavailable; this session can edit GitHub repository contents and inspect CI, but has no working local browser or screenshot capture channel.
- Route: converter (`index.html`) and methodology (`methodology.html`).
- Intended viewports: 320, 360, 390, 430 CSS px and desktop.
- State: empty and populated result states are defined in existing Playwright tests; visual captures of these states have not been reviewed.
- Pixel dimensions, device scale factor and density normalization: not captured.

## Evidence available

- The existing browser suite in `tests/browser/converter.spec.js` already exercises initial/empty/results/issue states, all five representations, keyboard navigation, contextual tooltips, overflow at narrow widths, reduced motion, and methodology navigation.
- New `tests/browser/design-system.spec.js` adds browser assertions for core token contrast, equal weighting of the three Ukrainian systems on desktop, mobile stacking, and shared tokens on the methodology page.
- Static CSS structure scan: balanced braces, no unclosed comments/quotes. This is only a lightweight syntax sanity check, not browser evidence.
- Independent WCAG contrast calculations for the core design tokens: ink/paper 16.04:1; muted/paper 5.27:1; accent/paper 8.87:1; white/accent 9.93:1; warning/warning-surface 5.83:1.
- GitHub Actions Quality checks run #330 for candidate SHA `65625f55feb2a1a8caea2f03fc7603f2f2fb3207` reported npm install, unit/integration tests, acoustic pipeline input guard, production build, generated mapping drift check, benchmark and release checks successful. Browser installation was still in progress at the last observation; no browser-test result is claimed here. Re-check the latest branch head and CI before handoff.

## Findings

- [P1] Rendered appearance remains unverified. Code and token checks cannot establish real typography, spacing, layout, tooltip placement, focus visibility or visual balance. Capture the actual pages at the intended viewport sizes and inspect both empty and populated states.
- [P1] The new design-specific Playwright assertions have not yet been observed passing on a completed workflow run. The test file's existence is not proof that the regression checks pass.
- [P2] No before/after screenshot comparison exists. The brief defines a design direction, not a pixel-specific source mockup; judge the implementation against the product contract rather than claiming exact visual fidelity.

## Required next iteration

1. Wait for CI on the latest branch head. If the browser tests fail, inspect the failing test output, fix the cause, and rerun.
2. Capture screenshots of the converter and methodology pages at 320, 360, 390, 430 and desktop widths.
3. Inspect typography/fallbacks for Chinese, Pinyin tone diacritics, IPA and Ukrainian; page and card spacing; token usage/contrast; text and control copy; tooltip/focus/empty/results/issue states.
4. Check keyboard-only operation, reduced motion, long mixed-script content, copy/example/clear/speech, and console errors.
5. Record each P0/P1/P2 issue, fix it, capture the revised state at the same viewport and repeat the comparison.

## Implementation checklist

- [x] Repository-specific design contract written.
- [x] Shared redesign layer separated from base CSS.
- [x] Design-specific browser regression checks added.
- [x] QA plan and master handoff updated.
- [ ] Latest CI run fully green, including Playwright.
- [ ] Actual browser screenshots captured and reviewed.
- [ ] Post-fix visual comparison completed.

This result remains **blocked** until rendered browser evidence and a completed exact-head browser test run are available.
