# Актуальна передача контексту — Chinese for Ukrainians

**Оновлено:** 2026-10-23, repository hygiene / documentation consolidation.  
**Репозиторій:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Master register:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)  
**Документація:** [індекс](../../INDEX.md)

## Поточний стан

- Базова гілка перед цією роботою: main, SHA `36cb27b3fd4b46b37ed1735269f5ebb3a7b28cc4`.
- Гілка цієї зміни: `chore/repository-hygiene-docs-2026-10-23`. Зміни не вносяться безпосередньо в main.
- PR #32 — [узгодження header на конвертері та методології](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/32) — merged у main commit `1bc06c5de6984880e8bbd3167f0d0e67b003bb3d`; browser CI пройшов після виправлення keyboard-focus тесту.
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


## IPA adapter continuation — 2026-10-23

The new [IPA adapter readiness gate](../../IPA-ADAPTER-READINESS.md) records the required sequence before a runtime migration. The current implementation still emits IPA and Ukrainian systems as parallel outputs; do not call it IPA-first. First inspect collisions between current broad-IPA keys and source CSV rows, then adjudicate them from primary sources before changing output generation. No phonetic mapping was changed in this branch.


The branch now includes `scripts/audit-ipa-adapter-readiness.mjs` and `tests/ipa-adapter-readiness.test.mjs`. The audit groups the current CSV aliases by broad IPA output and reports unsupported keys and collisions with divergent Ukrainian values. The test is picked up by the existing recursive test runner. The audit has not yet been run in a live repository runtime in this session; CI on the updated head is the evidence gate.


## Lockfile status recheck — 2026-10-23

The current `main:package-lock.json` is populated (27,197 characters, lockfileVersion 3, with root dependencies and package entries). The older master-register note that the lockfile contains an empty `packages` object is stale for the inspected current tree and must not be repeated as a current blocker. Exact clean-install reproducibility still requires the CI `npm ci` step to pass on the candidate SHA.


## IPA inventory audit result — 2026-10-23

Quality run [#40010328912](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40010328912) passed on commit `108f059a3903079557a4c8182164e49d4bd3208e`: 68 tests passed, zero failed. The new inventory audit found 421 CSV aliases, 417 mapped by the current broad-IPA function, 4 unsupported, and zero IPA-key collision groups under that function. This result establishes a deterministic inventory property only; it does not prove that every IPA value or Ukrainian transcription is linguistically correct. The next CI log will include the exact four unsupported keys for evidence-led review.
