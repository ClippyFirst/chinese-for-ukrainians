# chinese-for-ukrainians

A lightweight static browser tool for Chinese → Ukrainian transcription.

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
npm install
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

Поточний source містить 420 рядків даних і 421 нормалізований alias. Дубльованих нормалізованих Pinyin-ключів немає. У стовпці НАНУ є 12 навмисно порожніх клітинок; вони зберігаються як missing mapping і не замінюються значеннями інших систем.

Після зміни CSV: npm run validate:data та npm run generate:data.

## Документація

- [User guide](./docs/USER-GUIDE.md)
- [Product requirements](./docs/PRODUCT-REQUIREMENTS.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Design system](./docs/DESIGN-SYSTEM.md)
- [Data specification](./docs/DATA-SPEC.md)
- [QA plan](./docs/QA-PLAN.md)
- [Accessibility](./docs/ACCESSIBILITY.md)
- [Release checklist](./docs/RELEASE-CHECKLIST.md)
- [Usage](./docs/USAGE.md)
- [Roadmap](./docs/ROADMAP.md)
