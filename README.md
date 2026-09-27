# chinese-for-ukrainians

A lightweight browser-based Chinese → Ukrainian transcription tool.

## Planned static converter

The project is specified as a client-side static web application that accepts Simplified or Traditional Chinese (with Auto detection) and produces:
- Hanyu Pinyin;
- Kirnosova;
- Kirnosova–Tsisar;
- NANU.

The three Ukrainian transcription datasets are maintained in [zh-in-ua.csv](./zh-in-ua.csv).

## Documentation

- [Product requirements](./docs/PRODUCT-REQUIREMENTS.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Design system](./docs/DESIGN-SYSTEM.md)
- [Data specification](./docs/DATA-SPEC.md)
- [QA plan](./docs/QA-PLAN.md)
- [Roadmap](./docs/ROADMAP.md)

## Architecture principle

The converter is intentionally static: normal conversion happens locally in the browser. Chinese pronunciation resolution is kept as a separate layer from the Ukrainian transcription mappings so the three systems can share one canonical Pinyin representation.

## Data note

The CSV is the source of truth for the three Ukrainian systems. Keys, aliases, special forms, and blank cells are validated explicitly; current validation reflects the live CSV rather than stale defect snapshots.
