# Accessibility checklist

The converter is designed as a keyboard-first utility rather than a visual-only demo.

- The input has a visible semantic label and the script selector is a real `<select>`.
- All actions are native buttons and remain reachable by keyboard.
- Focus states are visible without relying on color alone.
- Result content is rendered as text, not injected HTML.
- Copy feedback is announced through an `aria-live` region.
- The result cards remain parallel; no system is encoded as a visual winner.
- The interface stacks to one column on narrow screens.
- The layout avoids horizontal overflow at the supported mobile width.
- Reduced-motion preferences are respected.
- User input is never evaluated as HTML or script.

Browser acceptance tests live in `tests/browser/converter.spec.js`.
