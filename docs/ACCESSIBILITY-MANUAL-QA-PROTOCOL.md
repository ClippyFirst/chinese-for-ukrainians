# Manual accessibility and device QA protocol

**Status: BLOCKED pending a human-operated device session.** This document is an execution record template and test protocol, not evidence that manual tests have passed.

Automated Playwright checks and screenshot inspection are regression guards only. Do not convert them into screen-reader or physical-device sign-off.

## Required test matrix

Record the exact app commit, date, tester, device, OS, browser, assistive-technology version, language/voice, and result for every row. Use the deployed site or a local production build of the exact tested commit.

| Platform | Assistive technology | Browser / environment | Required checks |
|---|---|---|---|
| Windows 11 | NVDA current stable | Firefox and Chrome | Landmarks, headings, form labels, script selector, result updates, copy status, keyboard-only operation |
| Windows 11 | JAWS current supported release (if available) | Chrome or Edge | Same core flow; verify announcements and focus order |
| macOS current supported | VoiceOver | Safari | Rotor/landmarks, controls, live updates, keyboard navigation, zoom |
| iOS current supported | VoiceOver | Safari | Touch exploration, focus order, rotor, result updates, orientation, 200%/system text enlargement |
| Android current supported | TalkBack | Chrome | Touch exploration, focus order, result updates, orientation, text scaling |
| Keyboard-only desktop | No screen reader | Firefox and Chrome | Tab/Shift+Tab, Enter/Space, visible focus, no traps, logical order |
| Mobile physical devices | Native screen reader | Safari iOS / Chrome Android | Real speech output, viewport, on-screen keyboard, copy/paste and touch target usability |

## Repeatable task script

1. Load the converter at its initial state. Confirm page language, title, main landmark, and heading structure.
2. Navigate from browser chrome using only the keyboard or screen-reader navigation commands. Confirm every interactive control has a meaningful accessible name and visible focus.
3. Change the script selection (Simplified, Traditional, Auto where available). Confirm the selected state is announced and source text is not rewritten.
4. Enter the Chinese text 银行 and activate conversion. Confirm the output cards and their headings are discoverable, and that the live region announces a useful result without reading the entire page unexpectedly.
5. Enter a mixed-script example with punctuation and Latin text. Confirm non-Han text and spacing remain intelligible.
6. Activate each copy control. Confirm the correct output is copied and success/failure feedback is announced. Test actual clipboard permissions; mocked browser clipboard tests do not count.
7. Use the example and clear controls. Confirm focus does not disappear or jump unexpectedly.
8. Repeat with a long input and an unsupported/uncertain reading. Confirm unresolved output is not announced as a confident transcription.
9. Zoom to 200% and 400% on desktop; enlarge text on mobile. Confirm no content or controls become unreachable.
10. Rotate the phone, open the on-screen keyboard, and repeat the main conversion/copy flow.
11. Record defects with steps, expected/actual announcement, screenshot or short recording where permitted, and severity. Retest fixes on the same AT/browser combination.

## Sign-off rules

- Mark each platform row PASS, FAIL, or NOT TESTED; never infer pass from another platform.
- A release-level manual accessibility sign-off requires at least NVDA + VoiceOver + TalkBack coverage, keyboard-only operation, and real clipboard/speech-output checks.
- JAWS is recommended where available; record unavailability rather than silently omitting it.
- A tester may record a justified platform-specific exception, but must not claim universal screen-reader compatibility.
- Do not store personal speech recordings or user data in the repository.

## Current evidence

- Automated accessibility/browser regression: 61 Playwright tests passed on the verified PR #52 head.
- Screenshot inspection: limited 320px mobile and 1280px desktop captures reviewed; no obvious clipping observed.
- Manual NVDA, JAWS, VoiceOver, TalkBack, physical-device, speech-output, and real clipboard checks: NOT TESTED in this execution environment.
