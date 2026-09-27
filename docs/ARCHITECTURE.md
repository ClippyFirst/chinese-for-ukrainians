# Chinese for Ukrainians — Architecture

## Architecture decision

Use a static, client-side web application.

There is no application server and no runtime database.

Recommended initial stack:
- plain HTML;
- modern CSS;
- vanilla JavaScript;
- a small bundled/build-time Mandarin pronunciation dependency or vendored pronunciation data;
- CSV converted at build time into a machine-friendly JSON module.

A framework is not required for this product. If a framework is later introduced, it must solve a real maintainability problem rather than add complexity.

## Logical pipeline

Chinese input
→ Unicode normalization / token scan
→ script detector
→ Mandarin pronunciation resolver
→ canonical Pinyin tokens
→ Pinyin renderer
→ three Ukrainian renderers
→ aligned result model
→ UI result panels

The canonical intermediate representation is important: the three Ukrainian systems must not be derived independently from raw Chinese characters.

## Data layers

### Source data
zh-in-ua.csv remains the human-readable source of truth for Ukrainian transcription mappings.

### Generated data
A build script should transform CSV into a validated JSON/JS module containing:
- pinyin;
- kirnosova;
- kirnosova_tsisar;
- nanu;
- source row number;
- validation flags.

The generated file must never be hand-edited.

### Pronunciation data
Chinese character/word pronunciation data should be kept separate from Ukrainian transcription data.

This separation allows replacing the Pinyin engine without changing Ukrainian tables, adding Cantonese later, and testing each layer independently.

## Context-sensitive pronunciation

Chinese characters are not a safe one-to-one pronunciation mapping.

The architecture must support:
- word-level dictionary lookup;
- polyphonic character resolution;
- fallback character-level lookup;
- explicit ambiguity states.

A production-quality converter must not assume that character-by-character Pinyin is always correct.

## Script handling

Script detection is an input classification feature, not a conversion requirement.

Recommended detector:
1. Maintain sets of known Simplified-only and Traditional-only Han characters.
2. Scan input.
3. Count exclusive signals.
4. Return simplified, traditional, mixed, or undetermined.

Traditional input should be processed directly by the pronunciation layer where possible. Do not first convert Traditional to Simplified merely to obtain Pinyin unless the pronunciation engine explicitly requires it and the conversion is demonstrably safe.

## Canonical token model

Conceptually:

{
  source: "北京",
  characters: ["北", "京"],
  pinyin: [
    { syllable: "bei", tone: 3 },
    { syllable: "jing", tone: 1 }
  ],
  displayPinyin: "Běijīng",
  ukrainian: {
    kirnosova: "Бейцзін",
    kirnosovaTsisar: "Бейдзін",
    nanu: "Бейцзін"
  },
  status: "resolved"
}

## Rendering rules

Pinyin:
- canonical internal form should use lowercase syllable + numeric tone;
- display renderer adds tone marks;
- neutral tone must be represented consistently.

Ukrainian:
- remove tone information before lookup;
- map normalized syllable to the selected CSV column;
- preserve case based on source token boundaries;
- never use generic string replacement for multi-syllable text.

## Alignment

Keep a token array instead of generating four unrelated strings.

This enables synchronized highlighting, per-syllable debugging, future hover explanations, and correct punctuation preservation.

## Build-time validation

A validation script must fail CI/build when:
- required CSV columns are missing;
- a row has an invalid number of fields;
- a Pinyin key violates the current uniqueness policy without an explicit reviewed exception;
- required output is unexpectedly empty;
- Unicode normalization changes a source value;
- generated data differs from the CSV.

Known intentional exceptions must be declared in a machine-readable allowlist.

## Static deployment

The site must produce a directory that can be served by GitHub Pages or any static hosting provider.

No environment variables or secrets are required for the MVP.

## Suggested repository structure

/
├── docs/
│   ├── PRODUCT-REQUIREMENTS.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── DATA-SPEC.md
│   ├── QA-PLAN.md
│   └── ROADMAP.md
├── data/
│   └── generated/
├── scripts/
│   └── validate-data.*
├── src/
│   ├── index.html
│   ├── styles/
│   ├── app/
│   │   ├── input.*
│   │   ├── detector.*
│   │   ├── pronunciation.*
│   │   ├── transcribe.*
│   │   └── clipboard.*
│   └── main.*
├── tests/
└── zh-in-ua.csv

Do not create this entire structure until implementation starts; this document is the target architecture.

## Security

Treat pasted text as untrusted input:
- never inject it with innerHTML;
- render text through textContent;
- do not execute or evaluate user content;
- avoid unnecessary third-party scripts;
- keep the site CSP-compatible.

## Architectural trade-off

A pure static site is ideal for the requested MVP because conversion is deterministic and does not require user accounts or persistent state.

The difficult part is not hosting. It is pronunciation resolution. The architecture must therefore spend complexity on the Chinese pronunciation layer and keep the UI deliberately simple.
