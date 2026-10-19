# chinese-for-ukrainians

A lightweight static browser tool for Chinese → Ukrainian transcription.

**Release status: public beta / research preview.** The literature-based broad-IPA review is closed for publication purposes; this is not a claim of universal narrow-phonetic accuracy. See the [literature-based IPA adjudication closeout](./docs/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md), [publication-readiness assessment](./docs/PUBLICATION-READINESS-2026-10-18.md), and [methodology notes](./docs/IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md).

## Що це

**Chinese → українська** — локальний браузерний інструмент для передачі китайської вимови українськими засобами.

Введіть китайський текст і отримайте паралельно:

- Hanyu Pinyin з тонами або без них;
- Кірносова;
- Кірносова—Цісар;
- НАНУ.

Інструмент **не перекладає значення** китайського тексту і не ранжує українські системи.

## Користування

Повна покрокова інструкція: [docs/USER-GUIDE.md](./docs/USER-GUIDE.md).

Коротко: вставте китайський текст → виберіть або залиште Авто → окремо налаштуйте два режими тонів → прочитайте результати → скопіюйте потрібну систему.

## Дизайн

Інтерфейс побудований як функціональний типографічний інструмент, а не як маркетинговий або AI-лендинг: одна головна робоча область, чітка ієрархія через типографіку, лінії та відступи, китайський текст як головний об'єкт введення, Pinyin як спільний шар вимови та три українські системи як рівноправні результати.

Детальна специфікація: [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md).

## Розробка

Requirements: Node.js >= 22.12.0.

~~~bash
npm ci
npm run validate:data
npm test
npm run dev
~~~

Production build:

~~~bash
npm run build
npm run check:release
~~~

Browser QA:

~~~bash
npx playwright install
npm run test:browser
~~~

Optional pronunciation benchmark:

~~~bash
npm run benchmark
~~~

## Дані

zh-in-ua.csv — джерело українських відповідників.

Поточний `zh-in-ua.csv` містить 421 рядок даних і 421 нормалізований Pinyin-ключ без дублікатів. У колонці Кірносової та Кірносової—Цісар є по одному порожньому значенню для `ten`; у колонці НАНУ залишаються 10 порожніх значень, які не можна автоматично заповнювати з інших систем. Ці числа слід перевіряти після зміни CSV через `npm run validate:data`; після зміни таблиці запускайте також `npm run generate:data`.

## Документація

- [User guide](./docs/USER-GUIDE.md)
- [Product requirements](./docs/PRODUCT-REQUIREMENTS.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Design system](./docs/DESIGN-SYSTEM.md)
- [Data specification](./docs/DATA-SPEC.md)
- [QA plan](./docs/QA-PLAN.md)
- [Phonetic reproducibility and evidence](./docs/PHONETIC-REPRODUCIBILITY.md)
- [IPA convention decision](./docs/IPA-CONVENTION-DECISION-2026-10-18.md)
- [Scientific IPA verification matrix](./docs/IPA-SCIENTIFIC-VERIFICATION-MATRIX-2026-10-18.md)
- [IPA scientific verification closeout (2026-10-19)](./docs/IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md) — historical audit record; its stricter certification status is superseded for release decisions by the [literature-based adjudication closeout](./docs/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md), which defines the project's agreed release criterion.
- [Class-by-class IPA final adjudication register](./docs/IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md)
- [Targeted `ong` / `iong` / `er` adjudication](./docs/IPA-ONG-IONG-ER-ADJUDICATION-2026-10-19.md) — includes the 2024 multi-speaker acoustic/articulatory study of syllabic rhotics
- [Targeted `üan` low-vowel adjudication](./docs/IPA-UAN-LOW-VOWEL-ADJUDICATION-2026-10-19.md)
- [Raw UW IPA source comparison](./docs/IPA-UW-RAW-SOURCE-COMPARISON-2026-10-18.md)
- [403-key machine-generated UW IPA differential](./docs/IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv)
- [403-key differential methodology and limitations](./docs/IPA-UW-403-DIFFERENTIAL-METHODOLOGY-2026-10-18.md)

Regenerate the differential after changing the IPA converter with `npm run audit:ipa:uw`; `npm test` checks that the committed CSV matches the current converter, all 403 source keys are covered, and the source ledger retains its nine-column schema and key evidence entries.
- [Contracted finals and vowel-quality audit](./docs/IPA-AUDIT-CONTRACTED-FINALS-2026-10-18.md)
- [Independent vowel-quality cross-check](./docs/IPA-AUDIT-VOWEL-QUALITY-2026-10-18.md)
- [Apical segments, rhotics, and tone adjudication](./docs/IPA-ADJUDICATION-APICALS-RHOTICS-TONES-2026-10-18.md)
- [Independent apical-segment and tone audit](./docs/IPA-AUDIT-APICALS-TONES-SECOND-SOURCE-2026-10-18.md)
- [Phonetic audit report](./docs/PHONETIC-AUDIT-2026-10-18.md)
- [Phonetic source ledger](./docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv)
- [Reference-inventory exceptions](./docs/REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md)
- [Accessibility](./docs/ACCESSIBILITY.md)
- [Release checklist](./docs/RELEASE-CHECKLIST.md)
- [Usage](./docs/USAGE.md)
- [Roadmap](./docs/ROADMAP.md)
