# chinese-for-ukrainians

A lightweight static browser tool for Chinese → Ukrainian transcription.

**Release status: public beta / research preview.** The app is deployed and usable, but the IPA layer and merged source table are still under linguistic source audit. See [publication-readiness assessment](./docs/PUBLICATION-READINESS-2026-10-18.md) before treating results as authoritative.

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
- [Contracted finals and vowel-quality audit](./docs/IPA-AUDIT-CONTRACTED-FINALS-2026-10-18.md)
- [Independent vowel-quality cross-check](./docs/IPA-AUDIT-VOWEL-QUALITY-2026-10-18.md)
- [Apical segments, rhotics, and tone adjudication](./docs/IPA-ADJUDICATION-APICALS-RHOTICS-TONES-2026-10-18.md)
- [Phonetic audit report](./docs/PHONETIC-AUDIT-2026-10-18.md)
- [Phonetic source ledger](./docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv)
- [Reference-inventory exceptions](./docs/REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md)
- [Accessibility](./docs/ACCESSIBILITY.md)
- [Release checklist](./docs/RELEASE-CHECKLIST.md)
- [Usage](./docs/USAGE.md)
- [Roadmap](./docs/ROADMAP.md)
