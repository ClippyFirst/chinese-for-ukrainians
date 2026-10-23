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
- IPA-first адаптер реалізовано в гілці PR #34: кожен resolved token несе сегментний IPA-ключ; три українські карти індексуються за IPA та зберігають provenance CSV. Колізії кидають помилку, а чотири непідтримані форми не отримують Pinyin-fallback. Чекаємо CI на точному HEAD перед злиттям.
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

Quality run [#40010328912](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40010328912) passed on commit `108f059a3903079557a4c8182164e49d4bd3208e`: 68 tests passed, zero failed. The new inventory audit found 421 CSV aliases, 417 mapped by the current broad-IPA function, 4 unsupported, and zero IPA-key collision groups under that function. This result establishes a deterministic inventory property only; it does not prove that every IPA value or Ukrainian transcription is linguistically correct. The audit subsequently identified the exact four keys below.


## IPA-first adapter implementation — 2026-10-23

PR #34: https://github.com/ClippyFirst/chinese-for-ukrainians/pull/34. Runtime changes are isolated in `src/data/ipa-transcription.js`, `src/app/pronunciation.js`, `src/app/transcribe.js` and `src/main.js`. The canonical CSV remains Pinyin-keyed source data; the runtime adapters use segmental IPA keys and preserve source row/key provenance. Missing system cells remain missing. Unsupported IPA keys are unresolved instead of falling back to Pinyin. PR #34 merged as `21b3e440fa8631a82273802f1880e31c9e8f7135`. Quality run #40012228389 passed 72 tests and all configured gates on the code-identical PR head; main's exact-SHA Quality run #40012724723 is completed successfully on the exact main SHA in Quality run #40012724723, including browser regression tests.


The executable audit identifies the unsupported aliases precisely: `ê` (CSV row 82), `hm` (row 125), `hng` (row 126) and `yo` (row 378). Keep these unresolved until a primary-source decision is recorded; do not add a fallback mapping just to increase coverage.


## Current main after IPA adapter merge

- Main SHA: `21b3e440fa8631a82273802f1880e31c9e8f7135`.
- PR #32 shared header: merged and Pages deployment succeeded.
- PR #33 repository hygiene, documentation consolidation and IPA inventory audit: merged; Pages deployment succeeded.
- PR #34 IPA-keyed Ukrainian adapters: merged; the adapter now consumes segmental IPA and preserves source provenance. Four unsupported forms remain unresolved by design.
- Current main Quality and Pages runs: Quality `40012724723`, Pages `40012724825`; verify both final conclusions before marking the release candidate complete.


## Edge-form research reconciliation — 2026-10-23

Use [EDGE-FORM-RESEARCH-RECONCILIATION-2026-10-23.md](./EDGE-FORM-RESEARCH-RECONCILIATION-2026-10-23.md) as the current compact record. Do not restart the full research on these forms or present all old disputed classes as current blockers.

- **Actual unsupported runtime keys:** ê (CSV row 82), hm (125), hng (126), yo (378). Current audit: 421 aliases, 417 mapped, 4 unsupported, 0 collision groups. No mapping was changed.
- **Existing Ukrainian values:** ê → е/е/blank; hm → хм/гм/blank; hng → х/гм/blank; yo → йо/йо/blank. The NANU blanks are source-inventory gaps, not an invitation to cross-fill.
- **Prior work reused:** Kirnosova table OCR limitations and secondary corroboration for hm/hng are already in REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md and the source ledger. The earlier rua → жува OCR anomaly was not accepted as sufficient evidence to replace CSV жуа.
- **Not current unsupported keys:** standalone o maps to ɔ (labial-conditioned bo/po/mo/fo → uɔ); rua maps under the finite function; ong, iong/yong, üan/yuan and standalone er have selected broad-IPA conventions in the 2026-10-19 closeout. The earlier targeted note's “unresolved” language is historical and superseded for the practical release decision.
- **Next genuine work:** verify original source-table images for hm/hng where available; establish scope/attestation and exact IPA or explicit exclusion for all four runtime gaps; add source-backed IPA/adapter tests. Do not fabricate IPA merely to make coverage counts green.
- docs/IPA-ADAPTER-READINESS.md, docs/PHONETIC-REPRODUCIBILITY.md and the dated targeted IPA note now state this reconciliation. See the canonical audit for per-form evidence and acceptance criteria.
