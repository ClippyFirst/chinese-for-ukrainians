# Документація Chinese for Ukrainians

Це канонічний навігатор документації. Для актуальних статусів використовуйте master register і handoff; датовані аудити нижче зберігаються як дослідницькі записи, а не як кілька конкурентних планів.

## Користувачам

- [Посібник користувача](./USER-GUIDE.md) — введення тексту, вибір письма, тони, копіювання, межі інструмента.
- [Методологія на сайті](https://clippyfirst.github.io/chinese-for-ukrainians/methodology.html) — опис IPA-конвенції та українських систем.

## Розробка та продукт

- [Вимоги продукту](./PRODUCT-REQUIREMENTS.md) — scope і acceptance criteria.
- [Архітектура](./ARCHITECTURE.md) — runtime pipeline, модулі та межі відповідальності.
- [Специфікація даних](./DATA-SPEC.md) — формат CSV і правила mapping.
- [Дизайн-система](./DESIGN-SYSTEM.md) та [редизайн-brief](./DESIGN-REDESIGN-BRIEF-2026-10-22.md).
- [QA plan](./QA-PLAN.md) — що перевіряють тести й що вони не доводять.
- [Release checklist](./RELEASE-CHECKLIST.md) — умови релізного рішення.
- [Roadmap](./ROADMAP.md) — наступні напрями, не заміна master register.
- [Доступність](./ACCESSIBILITY.md).
- [Ліцензія та походження даних](./LICENSE-AND-DATA-PROVENANCE.md).
- [Фонетична відтворюваність і докази](./PHONETIC-REPRODUCIBILITY.md).

## Актуальні робочі реєстри

- [Master execution plan / audit register](./audits/current/MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md) — єдиний основний реєстр завдань, статусів і acceptance criteria.
- [Chat handoff](./audits/current/CHAT-HANDOFF.md) — поточний стан, відомі обмеження та наступні кроки.
- [Design QA evidence](./audits/current/DESIGN-QA-2026-10-22.md) — CI runs, скриншоти та залишкові accessibility/interaction перевірки.

## Дослідницькі докази

- [Оцінка готовності до публікації](./PUBLICATION-READINESS-2026-10-18.md).
- [Рішення щодо IPA-конвенції](./IPA-CONVENTION-DECISION-2026-10-18.md).
- [Матриця наукової верифікації IPA](./IPA-SCIENTIFIC-VERIFICATION-MATRIX-2026-10-18.md) та [closeout](./IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md).
- [Літературний closeout IPA](./IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md) — актуальний критерій широкої IPA; він не заявляє універсальної вузької акустичної точності.
- [Класова ад’юдикація IPA](./IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md) і цільові записи щодо фіналей, апікальних сегментів, rhotics, тонів та якості голосних.
- [UW IPA differential CSV](./IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv) та [методологія диференціала](./IPA-UW-403-DIFFERENTIAL-METHODOLOGY-2026-10-18.md).
- [Фонетичний source ledger](./PHONETIC-SOURCE-LEDGER-2026-10-18.csv), [фонетичний аудит](./PHONETIC-AUDIT-2026-10-18.md) та [винятки інвентарю джерел](./REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md).
- [Акустичний дослідницький інструментарій](../research/ipa-acoustic/README.md).

Датовані файли є незамінними доказами походження рішень, якщо на них посилаються тести, README або master register. Не видаляйте їх лише через дату або те, що вони не імпортуються в runtime.
