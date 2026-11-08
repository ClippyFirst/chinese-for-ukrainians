# План перевірок і критерії якості

Цей документ описує перевірки, які потрібно запускати, а не стверджує, що кожна з них виконувалася в кожному середовищі. Поточний результат має бути прив'язаний до конкретного SHA та GitHub Actions run; див. [актуальний handoff](./audits/current/CHAT-HANDOFF.md).

## Обов'язкові автоматизовані перевірки

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

## Покриття

### Дані та конвертація
- CSV-схема, ширина рядків, нормалізовані ключі, дублікати та допустимі пропуски;
- Unicode Han-сканування та збереження сторонніх символів, пунктуації й пробілів;
- визначення спрощеного, традиційного, змішаного та невизначеного письма;
- нормалізація Pinyin, тонові знаки та незалежні перемикачі тонів;
- IPA-мапінг, апікальні голосні, класи фіналей і маркери непідтримуваних форм;
- інтеграція з зафіксованою версією pinyin-pro;
- незалежні українські стовпці, відсутні відповідники та відсутність fallback між системами;
- детермінованість генератора й диференційна перевірка UW IPA-джерела.

### Браузер
Playwright покриває стани порожнього/заповненого результату, п'ять подань (Pinyin, IPA і три українські системи), вибір письма, копіювання та live-region, приклад/очищення, незалежні перемикачі тонів, клавіатурну взаємодію, UI інтеграцію мовлення через mock, reduced motion, дизайн-токени, рівну вагу українських карток і горизонтальне переповнення на 320/360/390/430/1280 CSS px. Скриншоти можуть зберігатися як CI artifact; це не повний assistive-technology аудит.

### Додаткові перевірки
- research/ipa-acoustic містить окремий дослідницький інструментарій для акустичних вимірювань. Наявність скрипта або тесту не означає, що вимірювання виконано чи що IPA акустично валідовано.
- npm run benchmark вимірює час конвертації для 1, 10, 100 і 1000 символів; це performance check, а не тест мовної точності.
- npm run check:release перевіряє обмеження статичного застосунку.

## Інваріанти
- Не-китайські символи, пробіли та пунктуація зберігаються.
- Копіювання повертає точний вміст відповідної картки.
- Перемикання письма не переписує оригінал.
- Повторна конвертація та generated map детерміновані.
- Одна українська система ніколи не заповнює порожню клітинку іншої.
- Невідома вимова або непідтримувана форма не перетворюється мовчки на вигаданий результат.
- Тестова узгодженість не прирівнюється до фонетичної істини.

## Межі приймання
Зелений CI підтверджує лише визначені автоматизовані гейти на відповідному commit SHA. Він не доводить правильності всіх CSV-значень, очищення прав на сторонні джерела, роботу фізичного аудіовиходу, поведінку системного clipboard у кожному браузері або повну доступність для assistive technology. Ці критерії мають окремі записи в release checklist і master register.


## Accessibility regression automation — 2026-11-08

`tests/browser/accessibility.spec.js` adds browser checks for accessible names on interactive controls, valid `aria-describedby`/`aria-labelledby` references, page landmarks, language metadata, live regions, keyboard operation of script selection and the example action, and 200% text resizing without horizontal page overflow. These checks are automated regression guards; they do not replace manual NVDA/JAWS/VoiceOver/TalkBack testing, physical-device speech output, or real clipboard permission checks.


### Screenshot review — 2026-11-08

The generated visual QA artifact (`redesign-visual-qa`, run `42466148142`) was inspected at 320px mobile and 1280px desktop for the converter, with a 320px methodology-page capture also reviewed. No obvious clipped content or horizontal overflow was visible in these captures. This is a limited visual screenshot review, not physical-device testing, browser zoom certification, or screen-reader/assistive-technology sign-off.
