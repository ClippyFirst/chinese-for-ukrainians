# Chinese for Ukrainians — Product & Technical Design Specification

**Date:** 2026-09-27  
**Status:** Design approved for documentation; implementation not started  
**Scope:** Static Chinese → Pinyin → Ukrainian transcription converter

## 1. Problem and outcome

The product is a small browser utility for Ukrainian-speaking users who need to read, compare, or prepare Chinese names and text.

The primary task is deliberately narrow:

1. paste or type Chinese text;
2. select Simplified, Traditional, or Auto;
3. resolve Mandarin pronunciation;
4. display Hanyu Pinyin;
5. display the same pronunciation through the three Ukrainian transcription systems represented in `zh-in-ua.csv`;
6. copy any result without sending the source text to a server.

The application is a transcription/conversion tool, not a translator. It must never imply that a Ukrainian transcription is a translation of the Chinese meaning.

## 2. Design principles

- **Static first:** normal conversion runs locally in the browser.
- **One pronunciation model:** Pinyin is the canonical intermediate representation shared by all three Ukrainian renderers.
- **Context before characters:** pronunciation resolution must support words and phrases, not only isolated-character lookup.
- **No silent guessing:** unresolved or ambiguous pronunciation is surfaced rather than fabricated.
- **Source fidelity:** `zh-in-ua.csv` remains the source of truth for Ukrainian mappings.
- **Parallel systems:** Kirnosova, Kirnosova–Tsisar, and NANU are presented as parallel systems, not ranked choices.
- **Text preservation:** whitespace, punctuation, line breaks, Latin text, numbers, and emoji survive conversion.
- **Minimal interface:** typography, spacing, rules, and alignment provide hierarchy; avoid generic AI-landing-page patterns.

## 3. Architecture

### 3.1 Runtime pipeline

```
Input text
  ↓
Unicode-safe scanner
  ↓
Script detector
  ↓
Chinese tokenization / pronunciation resolver
  ↓
Canonical Pinyin tokens
  ↓
┌──────────────┬─────────────────────┐
│ Pinyin UI    │ Ukrainian renderers  │
│              │ Kirnosova            │
│              │ Kirnosova–Tsisar     │
│              │ NANU                 │
└──────────────┴─────────────────────┘
  ↓
Aligned result model
  ↓
Result UI + copy
```

The UI must consume a structured result rather than four independently generated strings.

### 3.2 Recommended implementation stack

Use a small static frontend with modern HTML, CSS, and JavaScript. A lightweight build tool is acceptable if it improves testing and asset generation; no application framework is required by the product itself.

Build-time responsibilities:
- parse and validate `zh-in-ua.csv`;
- generate deterministic browser data;
- bundle pronunciation resources;
- run unit/data tests.

Runtime responsibilities:
- read user text;
- detect script;
- resolve pronunciation;
- map canonical Pinyin syllables;
- render and copy results.

No runtime API, database, authentication, telemetry, or server-side conversion is required for MVP.

## 4. Pronunciation engine

### 4.1 Core requirement

Chinese orthography is not a one-character/one-pronunciation system. The resolver therefore needs a layered strategy:

1. phrase/word dictionary lookup;
2. known multi-character expression lookup;
3. polyphonic resolution using lexical context;
4. character-level fallback;
5. unresolved state when no reliable pronunciation is available.

The exact dictionary/library must be selected before implementation based on:
- Mandarin coverage;
- Simplified and Traditional support;
- phrase-level/polyphonic quality;
- browser compatibility;
- package/data size;
- license and redistribution terms;
- offline operation.

The pronunciation dependency must be documented in a dedicated provenance/licensing record before release.

### 4.2 Canonical representation

Internally, store syllables in a machine-stable form such as:

`bei3 jing1`

Each syllable has:
- base syllable;
- tone number (1–5, with 5 representing neutral tone where applicable);
- source span;
- resolution status.

Human-facing Pinyin is rendered separately with tone marks:

`Běijīng`

This prevents tone-mark formatting from contaminating Ukrainian mapping lookup.

### 4.3 Ukrainian mapping

For each resolved Mandarin syllable:
- normalize the Pinyin key;
- remove tone information;
- resolve the key against the selected CSV system;
- retain the exact source value;
- preserve source token capitalization at the output layer.

Never perform generic substring replacement over a complete Pinyin string. For example, `bei` must be mapped as a syllable token, not as an arbitrary substring inside another token.

## 5. CSV contract

`zh-in-ua.csv` has five columns:

- `№`
- `Піньїнь`
- `Кірносова`
- `Кірносова—Цісар`
- `НАНУ`

The three Ukrainian columns are independent.

The repository's current dataset has been corrected so that the previously discussed duplicate Pinyin-key problem is no longer treated as an active data defect. Documentation and validation must reflect the current file rather than preserve obsolete duplicate warnings.

Data validation still checks:
- required headers;
- UTF-8 and delimiter handling;
- row shape;
- normalized key uniqueness;
- intentionally blank cells;
- aliases and special syllable forms;
- deterministic generated output.

A validation allowlist is permitted only for explicitly reviewed source-data exceptions.

## 6. Script detection

Script selection describes the input; it does not alter it.

Auto mode scans Han characters and classifies the text as:
- **Спрощене** — Simplified-only evidence exists and no Traditional-only evidence exists;
- **Традиційне** — Traditional-only evidence exists and no Simplified-only evidence exists;
- **Змішане** — both kinds of exclusive evidence occur;
- **Не визначено** — only shared characters or no classifiable Han characters occur.

The detector must not claim certainty from characters shared by both scripts.

A manual mode may bypass classification, but must still preserve the exact input.

## 7. Token and result model

A conceptual result:

```text
Document
 ├─ source spans
 ├─ non-Chinese spans
 └─ Chinese spans
      ├─ source text
      ├─ resolved pronunciation
      │    ├─ Pinyin
      │    └─ tone
      └─ Ukrainian mappings
           ├─ Kirnosova
           ├─ Kirnosova–Tsisar
           └─ NANU
```

Each token should retain its original source span. This enables:
- exact whitespace/punctuation reconstruction;
- synchronized highlighting later;
- per-syllable diagnostics;
- future “why this output?” explanations.

## 8. UI specification

### 8.1 Page

The page is a single-purpose tool.

Header:
- title: **Chinese → українська**
- subtitle: **Pinyin і три українські системи транскрипції**

Main:
1. input section;
2. script control;
3. conversion status;
4. results section.

Footer:
- short source/data note;
- link to project/data documentation where appropriate.

### 8.2 Input

Label: **Введіть китайський текст**

Textarea:
- multiline;
- comfortable CJK font fallback;
- visible focus;
- approximately 8–10 lines on mobile;
- accepts paste and keyboard input.

Script control:
- Авто
- Спрощене
- Традиційне

Actions:
- Очистити
- Приклад

Character count is informational and should not interfere with editing.

### 8.3 Results

Show four parallel result rows/panels:

| System | Output | Action |
|---|---|---|
| Pinyin | tone-marked Pinyin | Скопіювати |
| Кірносова | Ukrainian transcription | Скопіювати |
| Кірносова—Цісар | Ukrainian transcription | Скопіювати |
| НАНУ | Ukrainian transcription | Скопіювати |

Pinyin is first because it is the shared canonical pronunciation layer, not because it is being ranked against the Ukrainian systems.

A **Скопіювати все** action may be provided after the individual controls.

### 8.4 States

**Empty:** explain that Chinese text can be entered or pasted.

**Working:** only use a progress indicator if pronunciation resolution actually becomes asynchronous or expensive. Do not show fake loading.

**Resolved:** show all four outputs.

**Partially resolved:** show available output and visibly mark unresolved source spans.

**Ambiguous:** explain that pronunciation could not be selected deterministically and preserve the source text.

**Data mapping missing:** identify the affected syllable/system rather than silently borrowing another system's value.

**No Chinese input:** leave results empty and preserve non-Chinese text behavior.

### 8.5 Mobile

At narrow widths:
- stack results vertically;
- keep copy buttons reachable;
- prevent horizontal scrolling;
- retain clear system labels;
- keep the input control visually dominant.

## 9. Accessibility

Required:
- semantic landmarks;
- associated form labels;
- keyboard-only operation;
- visible focus;
- logical tab order;
- accessible copy buttons;
- `aria-live` status for copy/conversion messages;
- no information conveyed by color alone;
- support zoom to 200%;
- reduced-motion support.

Focus styling must remain visible against every surface.

## 10. Privacy and security

Normal conversion must not transmit user input.

Rendering must use safe text APIs rather than HTML injection.

The application must:
- avoid `innerHTML` for user-controlled text;
- never evaluate pasted content;
- avoid unnecessary third-party scripts;
- remain compatible with a restrictive Content Security Policy;
- contain no analytics/telemetry in MVP.

## 11. Testing strategy

### Data
- parse CSV;
- verify headers;
- verify current row count;
- verify key uniqueness;
- verify reviewed blanks;
- verify generated data determinism.

### Unit
- script detector;
- Pinyin normalization;
- tone conversion;
- mapping lookup;
- token reconstruction;
- unresolved/ambiguous states.

### Integration
Golden fixtures should cover:
- Simplified;
- Traditional;
- mixed script;
- shared-only/undetermined script;
- punctuation and line breaks;
- Latin/numbers/emoji;
- polyphonic words;
- unresolved characters;
- mappings where the three systems differ.

### Browser
Verify:
- typing/paste;
- clear/example;
- copy;
- copy-all;
- keyboard navigation;
- mobile layout;
- zoom;
- reduced motion;
- live announcements.

### Regression
Every corrected transcription row that affects output gets a regression fixture.

## 12. Performance targets

The application should feel instantaneous for ordinary paragraphs.

Targets:
- meaningful UI quickly after static assets load;
- no per-character network requests;
- no server round trip;
- pronunciation data loaded once;
- test conversion at 1, 10, 100, and 1000 Chinese characters.

Dictionary size must be treated as a real product constraint: do not ship a large corpus when a materially smaller dataset can provide equivalent supported coverage.

## 13. Implementation boundaries

### In MVP
- Chinese text input;
- Simplified/Traditional/Auto;
- Mandarin Pinyin;
- three Ukrainian systems;
- copy;
- preserved formatting;
- unresolved/ambiguous states;
- accessibility;
- static deployment.

### Explicitly out of MVP
- translation;
- OCR;
- speech recognition;
- Cantonese/Jyutping;
- accounts;
- server API;
- database;
- analytics;
- automatic rewriting.

## 14. Future-compatible interfaces

The following should remain replaceable:
- pronunciation provider;
- script detector;
- Pinyin display formatter;
- Ukrainian transcription renderer;
- clipboard adapter.

This permits later additions such as Cantonese, Zhuyin, Wade–Giles, or additional Ukrainian systems without redesigning the core result model.

## 15. Acceptance criteria

The implementation is ready for release only when:

1. Simplified and Traditional examples resolve correctly.
2. Auto detection distinguishes exclusive, mixed, and undetermined cases.
3. Pinyin is generated from a documented pronunciation source.
4. The three Ukrainian systems use the repository CSV rather than duplicated hard-coded tables.
5. Context-sensitive/polyphonic pronunciation is handled by the selected engine or explicitly marked unresolved.
6. Punctuation, whitespace, line breaks, Latin text, and numbers are preserved.
7. Every output can be copied exactly.
8. No normal conversion request leaves the browser.
9. Data, unit, integration, accessibility, and browser tests pass.
10. Static output can be served without a backend.

## 16. Decisions still required before implementation

Only implementation-level decisions remain:
- exact pronunciation dependency/data source and license;
- exact build tool;
- exact test runner/browser test stack;
- whether GitHub Pages is the first deployment target.

These decisions must be documented before dependencies are added.
