# Design redesign contract — 2026-10-22

Status: implementation brief and acceptance contract for the redesign branch.

Target: the existing Chinese → Ukrainian transcription web tool. This is not a marketing landing page, translation service, chatbot, or new product architecture.

## 1. Product invariants

1. Preserve the current browser-only/static architecture, Content Security Policy, and local processing promise. Do not introduce telemetry, third-party runtime calls, accounts, a backend, remote fonts, or new production dependencies for visual polish.
2. Preserve the source text byte-for-byte at the UI boundary as currently handled by the app; design changes must not rewrite Chinese input.
3. Keep Simplified, Traditional, Mixed and Undetermined script states and the existing script selector contract. Never present script inference as certain when it is not.
4. Preserve independent Pinyin-tone and Ukrainian-tone controls.
5. Keep Pinyin and IPA distinct, labelled pronunciation representations. Preserve the existing IPA panel and its limitations/explanation; do not silently remove it to simplify the layout.
6. Preserve all three Ukrainian output systems as peers: Kirnosova, Kirnosova–Tsisar, and NANU. Never imply a quality ranking, borrow missing mappings across systems, or invent output.
7. Preserve independent copy actions, example, clear, speech control, methodology navigation, feedback link, unresolved-data notices, and live-region feedback.
8. Retain accurate statements that this is transcription/pronunciation support, not semantic translation, and that ordinary processing is local.

## 2. Visual direction

The product should feel like a carefully typeset linguistic reference instrument: editorial, precise, calm, compact, and recognizably designed. Typography, alignment, hierarchy, whitespace and fine rules do the work. No generic AI/SaaS hero, gradients, glassmorphism, ornamental illustrations, oversized empty hero, unnecessary animations, or decorative metrics.

- Use a restrained Chinese-lucky red accent for actions and focus, neutral paper and surface colors, dark readable ink, and muted warm warning states. Red is a cultural visual reference, not a status signal or a ranking of transcription systems.
- Accent communicates interaction/focus, not superiority of a transcription system. Use red sparingly for interactive emphasis; keep warning states visually distinct and continue to pair them with text and iconography.
- Keep the Chinese input as the dominant workspace; make Pinyin/IPA easy to scan; present the three Ukrainian systems with equal visual weight.
- Avoid a card for every minor label. Use borders and surfaces only where they clarify grouping.
- Keep the heading expressive but responsive; no forced single-line text or horizontal overflow.
- Prefer local/system font stacks and CJK-capable fallbacks. Do not require a remote font request.
- Keep the page width appropriate for a working tool rather than a broad promotional landing page.

## 3. Information architecture

1. Header: product identity, methodology link, local-processing cue; concise heading and accurate explanation.
2. Input workspace: section label, character count, multiline input, Unicode/local-processing hints.
3. Controls: script mode, independently controlled Pinyin/Ukrainian tones, speech action, example and clear. Controls must remain associated with their labels and usable with keyboard/touch.
4. Empty state: instructive but understated.
5. Results: Pinyin and IPA as separately labelled pronunciation layers; then three equally weighted Ukrainian-system results. Every copy action stays with its result.
6. Issue/uncertainty state: visible, non-destructive, not communicated by color alone.
7. Feedback and footer: retain methodology/issue links and concise project/privacy information.

## 4. Responsive behavior

- Support 320, 360, 390, 430 CSS-pixel widths and larger mobile, tablet and desktop layouts.
- At narrow widths, use one-column result cards and stacked/wrapping controls; preserve usable tap targets and prevent horizontal page overflow.
- At wider widths, group controls coherently and keep the three Ukrainian results visually equal. Do not compress explanatory IPA copy into a narrow column.
- Long Chinese, Pinyin, IPA, Ukrainian, Latin text, punctuation and multiline input must wrap without clipping.
- Tooltips/popovers must remain within the viewport, be keyboard discoverable, and not cover essential controls without a dismissal path.

## 5. Accessibility and interaction

- Keep semantic landmarks and heading order, explicit accessible names, native inputs, visible focus indicators and screen-reader status feedback.
- Never rely on color alone to convey selected script, unresolved output, or copy status.
- Maintain sufficient text and control contrast, including small metadata and muted copy.
- Respect prefers-reduced-motion. Motion must never be required to understand state.
- Focus must remain visible and not be hidden by overflow/scroll containers.
- Preserve correct hidden/empty/results/issue states and ensure CSS never overrides the HTML hidden attribute.
- Ensure script selection and tone switches remain keyboard-operable and their displayed state matches the app state.

## 6. Content and language

- Interface language: Ukrainian. Chinese characters, Hanyu Pinyin tone diacritics, IPA symbols and Ukrainian Cyrillic must all render correctly.
- Use clear, literal labels. Avoid promotional superlatives and claims of perfect accuracy.
- Use the names of transcription systems consistently across cards, methodology links, accessible labels and documentation.
- Do not relabel Pinyin/IPA as translation.

## 7. Engineering constraints

- Reuse the existing Vite/static structure, existing CSS file and app components; no framework migration.
- Do not change conversion algorithms, mapping CSV, generated mapping artifacts, pronunciation engine, scientific claims or source-data policy as part of visual-only changes.
- Keep the existing CSP intact and do not add external requests.
- Prefer CSS tokens and component-level rules over scattered one-off overrides. Avoid duplicate/conflicting selectors when practical.
- Do not remove existing functionality to simplify a layout.

## 8. Verification gates

A redesign is not complete just because the stylesheet or a test file exists.

Required checks after implementation:
- inspect diff for accidental changes to conversion/data behavior and protected UI elements;
- `npm ci`;
- `npm run validate:data`;
- `npm test`;
- `npm run build`;
- `npm run check:release`;
- `npm run test:browser`;
- review generated-artifact drift;
- browser review at 320/360/390/430px plus desktop, including empty/results/issue states, script selection, both tone switches, copy, example, clear, speech and methodology navigation;
- check keyboard-only operation, focus visibility, reduced motion, long/mixed-script text and browser console errors;
- compare screenshots before/after where a browser is available.

If a command or live browser cannot run in the implementation environment, record it as BLOCKED with the exact reason. Do not claim it passed.

## 9. Skill-role mapping

- frontend-design: distinct, intentional visual direction and implementation polish.
- ui-ux-pro-max: information hierarchy, component consistency and responsive patterns.
- web-design-guidelines: accessibility, semantics, responsive behavior and interaction review.
- Impeccable: systematic critique and removal of visual inconsistencies.
- frontend-ui-engineering: production-minded CSS, component integration and regression safety.

These are review lenses unless the corresponding skill is actually available and invoked. Never claim an unavailable skill was installed or executed.

## 10. Acceptance criteria

- All product invariants in section 1 remain true.
- Design system, CSS and actual markup agree on colors, hierarchy and responsive behavior.
- No generic AI/SaaS styling; no system is visually ranked above another.
- No horizontal overflow at 320/360/390/430px.
- All current functional controls and links remain present and wired.
- Automated tests/build/release checks pass on the exact candidate commit, or each unavailable check is explicitly blocked.
- The resulting PR describes actual changes and reports real test evidence, not intended or assumed outcomes.
