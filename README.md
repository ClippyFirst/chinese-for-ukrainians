# chinese-for-ukrainians

A lightweight static browser tool for Chinese → Ukrainian transcription.

## What it does

Enter Simplified or Traditional Chinese and get, locally in the browser:

- Hanyu Pinyin with tone marks by default;
- Hanyu Pinyin without tone marks when the option is disabled;
- Кірносова;
- Кірносова—Цісар;
- НАНУ.

The three Ukrainian systems are shown in parallel. The application does not rank them and does not translate the input.

## Local development

Requirements: Node.js >= 22.12.0.

```bash
npm install
npm run validate:data
npm test
npm run dev
```

Production build:

```bash
npm run build
npm run check:release
```

Browser QA:

```bash
npx playwright install
npm run test:browser
```

Optional pronunciation benchmark:

```bash
npm run benchmark
```

## Data

`zh-in-ua.csv` is the source of truth for the three Ukrainian transcription systems.

The current source contains 420 data rows and 421 normalized aliases. The current data has no duplicate normalized Pinyin keys. Twelve source cells in the НАНУ column are intentionally blank; these are preserved as missing mappings rather than silently replaced.

Run `npm run validate:data` after editing the CSV. Run `npm run generate:data` to regenerate `src/generated/transcription-map.js`.

## Architecture

```text
input
  → Unicode-safe scanner
  → Simplified/Traditional detector
  → Mandarin pronunciation resolver
  → canonical Pinyin tokens
  → Pinyin renderer (tones optional)
  → three independent Ukrainian renderers
  → result UI
```

Normal conversion does not call a server or upload user text. User-controlled output is rendered with DOM text APIs rather than HTML injection.

## Documentation

- [Product requirements](./docs/PRODUCT-REQUIREMENTS.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Design system](./docs/DESIGN-SYSTEM.md)
- [Data specification](./docs/DATA-SPEC.md)
- [QA plan](./docs/QA-PLAN.md)
- [Accessibility](./docs/ACCESSIBILITY.md)
- [Release checklist](./docs/RELEASE-CHECKLIST.md)
- [Usage](./docs/USAGE.md)
- [Roadmap](./docs/ROADMAP.md)
- [Tooling decision](./docs/superpowers/decisions/2026-09-27-tooling.md)
- [Approved implementation plan](./docs/superpowers/plans/2026-09-27-chinese-converter.md)
- [Approved design specification](./docs/superpowers/specs/2026-09-27-chinese-converter-design.md)
