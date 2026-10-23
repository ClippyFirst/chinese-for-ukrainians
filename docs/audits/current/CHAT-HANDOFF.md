# Актуальна передача контексту — Chinese for Ukrainians

**Оновлено:** 2026-10-23, repository hygiene / documentation consolidation.  
**Репозиторій:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Master register:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)  
**Документація:** [індекс](../../INDEX.md)

## Поточний стан

- Базова гілка перед цією роботою: main, SHA `36cb27b3fd4b46b37ed1735269f5ebb3a7b28cc4`.
- Гілка цієї зміни: `chore/repository-hygiene-docs-2026-10-23`. Зміни не вносяться безпосередньо в main.
- PR #32 — [узгодження header на конвертері та методології](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/32); залишений окремо, щоб не змішувати UI-зміну з технічним прибиранням.
- PR #5 — застарілий UI diff, який прибирає потрібний IPA output і навігацію до методології; не зливати без перебазування, відновлення контракту й повного проходження тестів.
- Продукт залишається **public beta / research preview**. Успішний CI не доводить фонетичної правильності кожного запису або очищення прав на всі джерела.

## Архітектурні факти

- CSV zh-in-ua.csv — канонічне джерело трьох українських систем; src/generated/transcription-map.js — генерований файл, його не видаляти й не редагувати вручну.
- Pinyin та IPA мають окремі представлення; українські системи зараз читаються з трьох окремих CSV-стовпців за нормалізованим Pinyin-ключем. Вони не адаптуються з IPA. Справжній IPA-first pipeline лишається окремою архітектурною задачею.
- Три українські системи незалежні. Не заповнювати пропуски між ними.
- Датовані IPA audits, UW differential, source ledger і research/ipa-acoustic — дослідницькі докази/інструменти, а не зайві артефакти лише через те, що вони не є runtime-модулями.
- docs/USER-GUIDE.md — єдиний канонічний посібник користувача; дубльований docs/USAGE.md вилучено. Design QA перенесено в docs/audits/current/DESIGN-QA-2026-10-22.md.

## Команди

Потрібен Node.js >= 22.12.0.

~~~bash
npm ci
npm run validate:data
npm test
npm run build
git diff --exit-code -- src/generated/transcription-map.js
npm run check:release
npm run benchmark
npx playwright install
npm run test:browser
~~~

У цьому середовищі немає незалежного локального clone/runtime, тому локальне виконання npm-команд не заявляється. Для змін у репозиторії потрібен успішний Quality workflow на точному PR HEAD; історичні run-и не замінюють його.

## Реальні залишкові блокери

1. **IPA-first architecture:** спроєктувати й протестувати справжній IPA adapter boundary, не змінюючи мовні рішення без джерел.
2. **Права на дані:** пройти source-by-source умови використання; MIT LICENSE не поширюється автоматично на всі сторонні матеріали.
3. **Ручний QA:** screen reader/assistive technology, фізичне озвучення та реальні clipboard permissions.
4. **Корпус невизначених форм:** додати стабільну fixture лише на основі перевіреного прикладу.
5. **Citation metadata:** не вигадувати автора, ORCID чи DOI.
6. **CI:** перевірити workflow саме для цього PR і звірити фінальний SHA.

## Дії після цього PR

1. Перевірити лінки README → docs/INDEX → canonical docs, відсутність посилань на видалений docs/USAGE.md та коректність переміщеного Design QA.
2. Дочекатися зеленого Quality workflow на точному HEAD.
3. Злити лише цей ізольований cleanup PR після успішної перевірки; не зливати PR #5 автоматично.
4. Окремо вирішувати архітектурний IPA-first refactor і source rights, не маскувати їх документацією.
