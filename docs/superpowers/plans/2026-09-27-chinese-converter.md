# Chinese for Ukrainians Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the documented static browser converter that accepts Simplified/Traditional Chinese, resolves Mandarin Pinyin locally, and renders the three Ukrainian transcription systems from `zh-in-ua.csv`.

**Architecture:** A small frontend keeps input scanning, script detection, pronunciation resolution, Pinyin formatting, Ukrainian mapping, and UI rendering as separate modules. The runtime passes structured token results through one canonical Pinyin representation; the CSV is transformed and validated at build time. No runtime server or database is used.

**Tech Stack:** HTML, CSS, JavaScript, a lightweight static build tool only if needed for bundling/testing, a documented Mandarin pronunciation data/library source, and a test runner/browser test tool chosen during Task 1. No framework is required.

**Spec:** `docs/superpowers/specs/2026-09-27-chinese-converter-design.md`

## Global Constraints

- Normal conversion runs entirely in the browser.
- `zh-in-ua.csv` is the source of truth for Ukrainian mappings.
- Pinyin is the canonical intermediate representation.
- Phrase/word pronunciation resolution precedes character-level fallback.
- Unresolved or ambiguous pronunciation must never be fabricated.
- Simplified/Traditional selection does not mutate input.
- Punctuation, whitespace, line breaks, Latin text, numbers, and emoji are preserved.
- The three Ukrainian systems are parallel systems, not ranked alternatives.
- User-controlled text is rendered safely and never evaluated.
- MVP has no translation, OCR, speech recognition, accounts, database, analytics, or runtime API.
- Every output is independently copyable.
- Static output must be deployable without a backend.
- Current CSV state must be validated live; obsolete duplicate-defect assumptions must not be encoded into tests.

## Review Focus

1. Polyphonic Chinese such as context-dependent characters must use lexical/contextual pronunciation when supported, with an explicit ambiguity/unresolved result otherwise. — Owned by Task 4 integration tests.
2. Traditional characters must be processed directly or through a demonstrably safe pronunciation-compatible path; script selection must not mutate source text. — Owned by Task 3 tests.
3. Shared-only Han text must produce an **undetermined** Auto classification rather than an invented script. — Owned by Task 3 tests.
4. Blank transcription cells must remain blank source data and produce an explicit missing-mapping state rather than borrowing another system. — Owned by Task 5 tests.
5. Mixed text with punctuation, line breaks, Latin, numbers, and emoji must reconstruct byte-for-byte at the source-text level except for converted Chinese spans. — Owned by Task 4 tests.

---

### Task 1: Freeze implementation stack and repository scaffold

**Files:**
- Create: `package.json`
- Create: `src/`
- Create: `scripts/`
- Create: `tests/`
- Create: `docs/superpowers/decisions/2026-09-27-tooling.md`
- Modify: `README.md`

**Interfaces:**
- Produces the project commands `npm test`, `npm run build`, and `npm run validate:data`.
- Establishes the exact pronunciation dependency/data source and license before application code consumes it.

- [ ] **Step 1: Write the tooling decision record** covering build tool, test runner, browser-test approach, pronunciation source, license, bundle-size implications, and static deployment target.
- [ ] **Step 2: Add minimal package/build configuration** with no unnecessary framework.
- [ ] **Step 3: Add the source/test directory skeleton** and a smoke test proving the test runner executes.
- [ ] **Step 4: Run the smoke test and production build.** Expected: PASS and a static output directory is generated.
- [ ] **Step 5: Run the data-validation command against the current CSV.** Expected: the report reflects the current file, with no stale assertion about a `pou` duplicate.
- [ ] **Step 6: Commit** with `chore: establish converter tooling`.

### Task 2: Build and validate the Ukrainian transcription data layer

**Files:**
- Create: `scripts/validate-data.*`
- Create: `scripts/generate-data.*`
- Create: `src/data/transcription.*`
- Create: `tests/data/transcription.test.*`
- Create: `data/generated/transcription.*`

**Interfaces:**
- `validateCsv(input: string) -> ValidationReport`
- `generateMappings(input: string) -> GeneratedMappings`
- `lookupTranscription(system, normalizedPinyin) -> MappingResult`

- [ ] **Step 1: Write failing parser/validator tests** for exact headers, UTF-8, field counts, current key uniqueness, aliases/special forms, and blank cells.
- [ ] **Step 2: Run data tests and verify failure.**
- [ ] **Step 3: Implement the parser without silently trimming or rewriting source output values.**
- [ ] **Step 4: Implement deterministic normalized Pinyin-key generation.**
- [ ] **Step 5: Implement generated mapping data with explicit source-row metadata and missing-value state.**
- [ ] **Step 6: Implement lookup by normalized syllable and selected system; never fall back to another system's value.**
- [ ] **Step 7: Run data tests, validator, and generation twice; verify identical generated output.**
- [ ] **Step 8: Commit** with `feat: add validated transcription data layer`.

### Task 3: Implement Unicode scanning and script detection

**Files:**
- Create: `src/app/scanner.*`
- Create: `src/app/detector.*`
- Create: `tests/app/detector.test.*`

**Interfaces:**
- `scanText(source: string) -> SourceSpan[]`
- `detectScript(source: string) -> ScriptDetection`
- `ScriptDetection.status -> "simplified" | "traditional" | "mixed" | "undetermined"`

- [ ] **Step 1: Write failing tests** for Simplified-only, Traditional-only, shared-only, mixed, no-Chinese, punctuation, and manual-mode non-mutation.
- [ ] **Step 2: Run tests and verify failure.**
- [ ] **Step 3: Implement Unicode-safe source-span scanning.**
- [ ] **Step 4: Implement deterministic exclusive-character classification.**
- [ ] **Step 5: Verify Traditional and Simplified input remains exactly unchanged by detection.**
- [ ] **Step 6: Run unit tests and commit** with `feat: add script detection`.

### Task 4: Implement canonical Mandarin pronunciation resolution

**Files:**
- Create: `src/app/pronunciation.*`
- Create: `src/app/pinyin.*`
- Create: `tests/app/pronunciation.test.*`
- Create: `tests/fixtures/pronunciation.*`

**Interfaces:**
- `resolvePronunciation(tokens: SourceSpan[], source: string) -> PronunciationToken[]`
- `normalizePinyinSyllable(value: string) -> string`
- `formatPinyin(tokens: PronunciationToken[]) -> string`

- [ ] **Step 1: Write failing golden tests** for known Simplified words, Traditional equivalents, tone-bearing syllables, neutral tone, punctuation, and at least one polyphonic/context-sensitive fixture.
- [ ] **Step 2: Run tests and verify failure.**
- [ ] **Step 3: Integrate the selected pronunciation data/library behind the `resolvePronunciation` interface.**
- [ ] **Step 4: Implement phrase/word resolution before character fallback.**
- [ ] **Step 5: Represent unresolved and ambiguous pronunciation explicitly; never fabricate Pinyin.**
- [ ] **Step 6: Implement canonical tone-number tokens and tone-mark rendering as separate operations.**
- [ ] **Step 7: Verify Traditional input coverage and document any unsupported path rather than silently converting scripts.**
- [ ] **Step 8: Run pronunciation tests and commit** with `feat: add Mandarin pronunciation pipeline`.

### Task 5: Implement three Ukrainian renderers

**Files:**
- Create: `src/app/transcribe.*`
- Create: `tests/app/transcribe.test.*`

**Interfaces:**
- `transcribe(tokens: PronunciationToken[], system: "kirnosova" | "kirnosova_tsisar" | "nanu") -> TranscriptionResult`
- `transcribeAll(tokens: PronunciationToken[]) -> Record<System, TranscriptionResult>`

- [ ] **Step 1: Write failing tests** where systems agree, where they differ, where a CSV cell is blank, and where a special key needs normalization.
- [ ] **Step 2: Run tests and verify failure.**
- [ ] **Step 3: Map each canonical syllable independently through the generated CSV data.**
- [ ] **Step 4: Apply capitalization at token boundaries rather than with whole-string replacement.**
- [ ] **Step 5: Return explicit unresolved/missing mapping metadata alongside rendered text.**
- [ ] **Step 6: Run tests and commit** with `feat: add Ukrainian transcription renderers`.

### Task 6: Compose the document conversion pipeline

**Files:**
- Create: `src/app/convert.*`
- Create: `tests/app/convert.test.*`

**Interfaces:**
- `convert(source: string, options: { scriptMode: "auto" | "simplified" | "traditional" }) -> ConversionResult`

**ConversionResult must expose:** source, detectedScript, ordered tokens, pinyin, kirnosova, kirnosovaTsisar, nanu, and issue metadata.

- [ ] **Step 1: Write failing end-to-end tests** for all four major input classes in Review Focus.
- [ ] **Step 2: Run tests and verify failure.**
- [ ] **Step 3: Compose scanner → detector → pronunciation → Pinyin renderer → three transcription renderers.**
- [ ] **Step 4: Reconstruct non-Chinese spans exactly and preserve source formatting.**
- [ ] **Step 5: Ensure repeated conversion is deterministic.**
- [ ] **Step 6: Run all unit/integration tests and commit** with `feat: compose conversion pipeline`.

### Task 7: Build the UI and interaction layer

**Files:**
- Create: `src/index.html`
- Create: `src/styles/main.css`
- Create: `src/app/ui.*`
- Create: `src/app/clipboard.*`
- Create: `tests/app/ui.test.*`

**Interfaces:**
- UI consumes `ConversionResult`; it must not independently perform Chinese pronunciation or CSV mapping.
- `copyText(value: string) -> Promise<CopyStatus>`

- [ ] **Step 1: Write UI tests** for input, script selector, empty state, result rendering, clear/example, and individual copy controls.
- [ ] **Step 2: Implement semantic page structure from the approved design spec.**
- [ ] **Step 3: Implement restrained typography, spacing, neutral surfaces, one functional accent, and parallel result panels; avoid decorative AI-landing-page patterns.**
- [ ] **Step 4: Implement Auto/Simplified/Traditional controls and character count.**
- [ ] **Step 5: Render Pinyin + three Ukrainian systems from one conversion result.**
- [ ] **Step 6: Implement copy feedback using an accessible live region.**
- [ ] **Step 7: Implement empty, resolved, partially resolved, ambiguous, and missing-mapping states.**
- [ ] **Step 8: Run UI tests and commit** with `feat: add converter interface`.

### Task 8: Accessibility, responsive behavior, and browser QA

**Files:**
- Modify: `src/styles/main.css`
- Modify: `src/index.html`
- Create: `tests/browser/converter.*`
- Create: `docs/ACCESSIBILITY.md`

- [ ] **Step 1: Add browser tests** for keyboard navigation, paste, copy, narrow viewport, and zoom.
- [ ] **Step 2: Verify semantic labels, focus visibility, tab order, live announcements, and no color-only states.**
- [ ] **Step 3: Add responsive layout with one-column mobile results and no horizontal overflow.**
- [ ] **Step 4: Add reduced-motion behavior.**
- [ ] **Step 5: Run browser tests at desktop and mobile viewports.**
- [ ] **Step 6: Commit** with `test: verify accessible responsive converter`.

### Task 9: Performance, security, and static release verification

**Files:**
- Create: `docs/RELEASE-CHECKLIST.md`
- Modify: `README.md`
- Modify: build configuration as required

- [ ] **Step 1: Add release checks** for generated-data freshness, static build output, absence of runtime API calls, and deterministic conversion.
- [ ] **Step 2: Measure conversion for 1/10/100/1000 Chinese characters and inspect bundle size.**
- [ ] **Step 3: Verify user input is rendered through safe text APIs and no analytics/telemetry is present.**
- [ ] **Step 4: Run the complete test/build/validation suite.**
- [ ] **Step 5: Manually inspect the final UI against the design spec and fix regressions.**
- [ ] **Step 6: Commit** with `chore: finalize static release checks`.

### Task 10: Documentation and handoff

**Files:**
- Modify: `README.md`
- Modify: `docs/ROADMAP.md`
- Modify: relevant architecture/data/QA documents
- Create: `docs/USAGE.md`

- [ ] **Step 1: Document local development, build, validation, and deployment.**
- [ ] **Step 2: Document pronunciation data provenance and license.**
- [ ] **Step 3: Document supported/unsupported input and uncertainty behavior.**
- [ ] **Step 4: Update roadmap from planned work to implemented capabilities.**
- [ ] **Step 5: Run final documentation link check and full release suite.**
- [ ] **Step 6: Commit** with `docs: finalize converter implementation documentation`.

## Execution order

Tasks are intentionally ordered by dependency:

1. Tooling + pronunciation-source decision
2. CSV data layer
3. Scanner/script detection
4. Pronunciation
5. Ukrainian renderers
6. Pipeline
7. UI
8. Browser/accessibility
9. Release verification
10. Documentation/handoff

Each task ends in a testable commit. Do not start UI implementation before the pronunciation-source/licensing decision and the canonical data interfaces exist.

## Self-review

- **Spec coverage:** product outcome, static architecture, pronunciation context, canonical Pinyin, CSV contract, script detection, result model, UI, accessibility, privacy/security, testing, performance, MVP boundaries, future interfaces, and acceptance criteria are all assigned to tasks.
- **Step scan:** each step has one checkable action and a concrete verification point.
- **Type consistency:** the interfaces flow from scanner/detector through pronunciation tokens, transcription renderers, and `ConversionResult` into UI.
- **Review focus:** all five high-risk uncovered input classes are pinned to explicit test tasks.
- **Proportion:** the plan specifies files, interfaces, tests, and decisions without writing implementation bodies.

