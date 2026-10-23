# Актуальна передача контексту — Chinese for Ukrainians

**Оновлено:** 2026-10-23, repository hygiene / documentation consolidation.  
**Репозиторій:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Master register:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)  
**Документація:** [індекс](../../INDEX.md)

## Поточний стан

- Базова гілка перед цією роботою: main, SHA `36cb27b3fd4b46b37ed1735269f5ebb3a7b28cc4`.
- Гілка цієї зміни: `chore/repository-hygiene-docs-2026-10-23`. Зміни не вносяться безпосередньо в main.
- PR #32 — [узгодження header на конвертері та методології](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/32) — merged у main commit `1bc06c5de6984880e8bbd3167f0d0e67b003bb3d`; browser CI пройшов після виправлення keyboard-focus тесту.
- PR #5 — closed as superseded (2026-10-23), не злитий. Його index.html прибирає IPA-вихід і посилання на методологію; гілку збережено для довідки.
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


Edge-form scope decision (branch `fix/mandarin-edge-form-scope-2026-10-23`): `ê` maps to `ɛ`, supported by the open-content Mandarin reference's interjectional entry; `yo` maps to `jɔ` under an explicit broad-IPA project convention for an attested exceptional interjection. `hm` and `hng` stay deliberately unsupported: spelling/interjection attestation is not enough to determine exact IPA. New regression tests assert all four decisions, including unresolved behavior for `hm`/`hng`. This is not complete until CI and the inventory audit pass on the branch.


## Current main after IPA adapter merge

- Main SHA: `21b3e440fa8631a82273802f1880e31c9e8f7135`.
- PR #32 shared header: merged and Pages deployment succeeded.
- PR #33 repository hygiene, documentation consolidation and IPA inventory audit: merged; Pages deployment succeeded.
- PR #34 IPA-keyed Ukrainian adapters: merged; the adapter now consumes segmental IPA and preserves source provenance. Two consonant-only interjection spellings (`hm`, `hng`) remain intentionally unresolved by design; `ê` and `yo` now have explicit broad-IPA rules, subject to CI verification.
- Current main Quality and Pages runs: Quality `40012724723`, Pages `40012724825`; verify both final conclusions before marking the release candidate complete.


## IPA marginal interjection closeout — 2026-10-23

PR #38 merged to `main` as `fba393964757459df4bd6d7c435fe7b99c8b9286`. Quality run [#40019246182](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40019246182) passed on tested head `bc3d3088f3ef4158b9159a48fb6e80e219b4cc7a`. The regression suite now requires 421 aliases, exactly two unsupported keys (`hm`, `hng`), and zero IPA-key collisions. `ê → ɛ` is based on a source explicitly giving [ɛ] for certain interjections; `yo → jɔ` is an explicitly declared broad-IPA project convention for an attested exceptional interjection. `hm` and `hng` remain deliberately unresolved rather than guessed. This is a bounded implementation closeout, not proof of narrow phonetics or completion of source-image verification, licensing, or device QA.


## Consonant-only interjection evidence review — 2026-10-23

- Follow-up branch: `research/consonant-only-interjection-evidence-2026-10-23`, based on current `main`; evidence-review commit `99baf80cf0ded596fd04f7c2fe410802e528cd52`.
- Added [CONSONANT-ONLY-INTERJECTION-EVIDENCE-REVIEW-2026-10-23.md](./CONSONANT-ONLY-INTERJECTION-EVIDENCE-REVIEW-2026-10-23.md) and linked it from [docs index](../../INDEX.md).
- New source: *Chinese Romanization: Pronunciation and Orthography*, interjections section (https://pinyin.info/readings/yin_binyong/o09_interjections.pdf), says `ng`, `hm`, and `hng` are consonant-only Mandarin interjections treated as ordinary syllables in that romanization description. This establishes orthographic/functional status, not IPA realization.
- TDSF converter documentation (https://www.tdsf.kiev.ua/convertor.php) excludes rare `hm`/`hng` forms due to input ambiguity. This is a converter scope/tokenization choice, not a phonetic analysis.
- Decision unchanged: `hm` and `hng` remain unsupported; do not guess IPA or permit Pinyin fallback. Reopen only on direct, context-relevant phonetic evidence (explicit IPA, audio with a documented convention, or citable corpus material).
- The attempt to search more sources through the connected Firecrawl service failed because its account has insufficient credits. This is a tool limitation, not evidence that no sources exist. Public web search did find the PDF above.
- Verification status: documentation-only branch; no local clone or npm/browser execution was available. Quality run `40019784515` for merged PR #39 was still in progress at the last check (unit/integration, acoustic input guards, build, generated-map determinism, benchmark and release constraints passed; browser installation was still running). Do not claim that workflow completed.
- Global release gates remain open: primary-page source collation for legacy Ukrainian cells, source-by-source rights review, manual accessibility/device QA, and visual QA in a live browser. Product remains public beta / research preview.


## Direct IPA source lead — 2026-10-23

- Follow-up on PR #40 found the [Wikibooks edge-phonology appendix](https://zh.wikibooks.org/wiki/现代标准汉语/附录/边缘音系), which explicitly lists `hm → m̥m̩` and `hng → ŋ̊ŋ̍` in an IPA column for marginal Modern Standard Chinese forms.
- This is a concrete direct-IPA lead, not yet independently verified primary evidence: the page does not cite the dictionary/study/audio/corpus behind those values. Exact-string web searches did not find a second primary Mandarin source for both forms; a similar Teochew result is not transferable to Mandarin.
- Updated [the evidence review](./CONSONANT-ONLY-INTERJECTION-EVIDENCE-REVIEW-2026-10-23.md) and [master execution register](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md). Runtime mappings and tests remain unchanged; `hm` and `hng` stay unresolved until provenance is established.
- Branch `research/consonant-only-interjection-evidence-2026-10-23`, latest commit to be verified after CI; PR #40 remains the documentation-only research vehicle. Exact-head Quality run for prior PR head `d65750bb3349331aeed6a3024a93ffe082aeaacb` passed (run [40020859654](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40020859654)); this does not cover the subsequent documentation commits.


### Independent source cross-check — 2026-10-23

- Quality workflow [#40021606811](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40021606811) completed successfully on commit `fc4eb62417383387160e7c8a8af391f9ab143009`.
- Further evidence search found [Unicode WG2 N4717 (Bopomofo)](https://www.unicode.org/L2/L2016/16106-n4717-bopomofo.pdf), p. 2: it cross-tabulates hm/hng with dictionary Zhuyin forms, but does not give IPA. A searchable [Xinhua Dictionary digitization](https://math.wvu.edu/~hlai2/My_Dictionary_CHN.pdf), printed p. 184, describes hm as h + a bilabial nasal and hng as h + a velar nasal, but the accessible text does not settle exact IPA, voice quality or contextual variation.
- Updated the evidence review and master register to capture these sources. They corroborate the dictionary/lexical status, not the exact Wikibooks IPA candidates. Runtime and tests remain unchanged; do not mark hm/hng supported until an authoritative notation key, primary phonetic description, or inspectable Mandarin audio/corpus record resolves the realization.
- The latest documentation commits need their own exact-head Quality result; the previous successful run does not automatically verify later commits.


### Dictionary / expert-source follow-up — 2026-10-23

- Added to the evidence review: [漢典 噷](https://zdic.net/hant/%E5%99%B7) and [漢典 哼](https://zdic.net/hant/%E5%93%BC) describe the exceptional hm/hng interjections as h plus a pure bilabial/velar nasal. Their visible IPA entries are for other readings of the characters, not hm/hng.
- A [2026 report quoting the Xinhua Dictionary revision team](https://cul.china.com.cn/2026-06/12/content_43447236.htm) confirms that pure-consonant interjections including hm/hng are recognized and points to phonetics textbooks, but does not provide the needed IPA or a specific textbook page.
- This strengthens lexical/articulatory triangulation but does not independently verify Wikibooks' exact IPA strings. Runtime remains unchanged and fail-closed. Next step is authoritative Xinhua 13th-edition entry/notation legend or a traceable phonetics-textbook passage, with exact edition/page, before deciding mapping scope.
- Quality runs for the preceding commits are still not proof for this newest commit. Check the exact-head workflow before closing PR #40.


### IPA candidate provenance finding — 2026-10-23

- Exact-string search located a 2017 personal experimental article, [以《切韵》风格划分普通话韵部的尝试](https://read01.com/zh-sg/O308A7z.html), listing the same `hm`/`hng` IPA strings as Wikibooks. The author explicitly says the work is a provisional transcription of their own accent and says the special distinctions were inferred from spelling and effectively made to fill categories. This is **not** independent phonetic validation and raises a concrete circular-provenance risk.
- Wikibooks revision history shows the edge-phonology appendix was split from the general syllable page on 2026-07-23; the visible page does not cite a primary phonetic source. [IPA historical charts](https://www.internationalphoneticassociation.org/IPAcharts/IPA_charts_H/IPA_charts_H.html) only provide general historical notation background, not Mandarin-specific confirmation.
- Updated the evidence review and master register. Exact IPA remains unverified; runtime unchanged, both keys still fail closed. Next decisive step is to inspect authoritative *Xinhua Dictionary* phonetic notation/legend or a primary phonetic analysis / documented Mandarin recording, not to count repeated copies of the same IPA strings as corroboration.
- CI on commit `fc4eb62417383387160e7c8a8af391f9ab143009` passed, but that run predates these documentation changes. Latest head still needs its own final Quality conclusion.

## Latest exact-head CI result — 2026-10-23

- Quality workflow [#40023287308](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40023287308) completed successfully on branch-head commit `a768c69f0c3ccdafb871f210767d71daba03a4c0`; every `verify` step passed, including unit/integration tests, acoustic input guards, production build, generated-map determinism, benchmark, release constraints, browser installation/regression tests and QA artifact uploads.
- This confirms that tested head. The additional evidence-register and master-register commits made after it are documentation-only; the current branch head must not be called exact-head green until a new run associated with that later head completes.
- This CI result validates the tested repository state only. It does not validate the IPA candidates `hm → m̥m̩` and `hng → ŋ̊ŋ̍`; their provenance remains unverified and potentially circular. Both runtime keys stay unsupported.
- Keep PR #40 as a research/evidence review, not a runtime-mapping change. Do not merge on CI status alone while C2U-IPA-014's phonetic acceptance criterion is unresolved.
- Next genuine blocker: obtain an authoritative dictionary notation key/page, primary phonetic analysis, or inspectable Mandarin recording/corpus item with documented transcription conventions and context. If none is available, record the evidence limit and preserve fail-closed behavior. Global release gates remain source-data rights, legacy source-image collation, and manual visual/accessibility/device QA.

## Evidence sweep update — 2026-10-24

- Checked [Shaanxi Normal University Language and Writing site](https://yywz.snnu.edu.cn/info/1116/2092.htm): it explicitly recognises Mandarin interjections `hm` and `hng` as exceptional consonant-only syllables. It does not provide their IPA.
- Checked [Inner Mongolia Normal University Putonghua training/testing site](https://pc.imnu.edu.cn/info/1063/1097.htm): it lists both among rare syllables omitted from a common inventory, with no IPA.
- Checked [漢典 噷](https://zdic.net/hant/%E5%99%B7) and [漢典 哼](https://zdic.net/hans/%E5%93%BC): they corroborate lexical function and broad descriptions, but not the IPA strings `m̥m̩` or `ŋ̊ŋ̍`.
- Updated the consonant-only interjection evidence review and master register. Exact IPA remains **BLOCKED / evidence-limited**; both runtime keys remain unsupported.
- The last confirmed green Quality run is #40023287308 on `a768c69f0c3ccdafb871f210767d71daba03a4c0`. It passed all automated checks, including browser tests. Since the latest register updates are later commits, a new run is needed for exact-head CI.
- Next genuine acceptance criterion: an authoritative IPA/phonetic notation or a primary phonetic study / inspectable recording with documented transcription conventions. Do not infer a final target from orthography or repeat a potentially circular candidate.
