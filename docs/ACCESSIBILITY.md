# Accessibility checklist

The converter is designed as a keyboard-first utility rather than a visual-only demo.

- The text input has a semantic label. Script choice is a native, keyboard-operable radio group for Auto, Simplified and Traditional modes.
- All actions are native buttons and remain reachable by keyboard.
- Focus states are visible without relying on color alone; system-help buttons expose their tooltip text through `aria-describedby` and work on keyboard focus.
- Result content is rendered as text, not injected HTML.
- Copy feedback is announced through an `aria-live` region.
- The result cards remain parallel; no system is encoded as a visual winner.
- The interface stacks to one column on narrow screens.
- The layout is regression-tested for horizontal overflow at 320, 360, 390 and 430 CSS pixels.
- Reduced-motion preferences are respected.
- Empty, result and issue panels respect the native `hidden` attribute and do not overlap.
- Small helper text uses darker colors to improve contrast.
- User input is never evaluated as HTML or script.

Browser acceptance tests live in `tests/browser/converter.spec.js`.
