# Release checklist

Поточний статус продукту: **public beta / research preview**. Цей список визначає умови наступного релізного рішення; минулі CI результати — історичні докази, а не гарантія стану нового commit.

## Автоматизовані гейти

- [ ] Чисте встановлення з committed lockfile: npm ci.
- [ ] npm run validate:data успішний.
- [ ] npm test успішний.
- [ ] npm run build успішний і генерує карту лише з CSV.
- [ ] git diff --exit-code -- src/generated/transcription-map.js успішний після build.
- [ ] npm run check:release успішний.
- [ ] npm run benchmark виконаний, результат прив'язаний до SHA.
- [ ] npm run test:browser успішний на всіх налаштованих browser projects.
- [ ] GitHub Actions Quality run зелений на точному кандидатові релізу.
- [ ] GitHub Pages deployment, якщо публікується, відповідає тому самому SHA.

## Дані, дослідження й документація

- [ ] CSV має валідну структуру; пропуски й edge keys переглянуті за джерелами, а не заповнені припущеннями.
- [ ] Джерела, походження даних і права на повторне використання перевірені для кожного стороннього набору/файлу.
- [ ] README, методологія, user guide, architecture, QA plan та checklist описують однакову фактичну поведінку.
- [ ] IPA-конвенція має надійні джерела; широке IPA не називається вузькою акустичною транскрипцією.
- [ ] Відсутні твердження, що green tests доводять лінгвістичну істинність.

## Ручні перевірки

- [ ] Homepage і methodology перевірені в реальному браузері: 320/360/390/430/1280 CSS px.
- [ ] Keyboard-only/focus, screen-reader basics, clipboard, приклад/очищення, script selection, незалежні tone toggles та speech output перевірені.
- [ ] Невизначеність/помилки, довгий mixed-script текст, console errors і горизонтальний overflow перевірені.
- [ ] Screenshot evidence і відомі обмеження додані до QA record.

## Release metadata та права

- [ ] Авторство, версія й citation metadata підтверджені, а не вгадані.
- [ ] Ліцензія коду чітко відділена від ліцензій сторонніх даних і цитованих матеріалів.
- [ ] Release notes описують scope та обмеження; тег/DOI вказуються лише після фактичного створення.
- [ ] Повторне збирання з чистого checkout відтворює generated map і production build.

Застереження: release checker забороняє певні мережеві, evaluation та unsafe-HTML примітиви в application source як вузький захист для статичного MVP; це не універсальна оцінка безпеки всіх API.
