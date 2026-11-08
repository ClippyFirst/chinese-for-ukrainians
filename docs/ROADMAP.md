# Дорожня карта Chinese for Ukrainians

Це перелік напрямів, а не альтернативний task register. Поточні статуси, acceptance criteria та докази ведуться лише в [master execution register](./audits/current/MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md).

## Реалізований вебпродукт

- Статичний браузерний конвертер китайського тексту в Pinyin, широку IPA та три незалежні українські системи.
- Автоматичне/ручне визначення спрощеного й традиційного письма.
- Pinyin → сегментний IPA → три окремі IPA-keyed українські адаптери.
- Канонічний CSV, детермінований JS generator, перевірка колізій, provenance та явні missing/unresolved стани.
- Методологічна сторінка, посібник користувача, unit/integration/browser тести, CI та GitHub Pages deployment.

Статус вебпродукту: **public beta / research preview**. Автоматизовані тести не є доказом фонетичної правильності кожного запису, очищення прав на всі джерела або завершення ручного assistive-technology QA.

## Поточний пріоритет: Python library + CLI

Python-рушій задуманий як окремий спосіб використання того самого продукту, а не як сервер для сайту або другий незалежний набір лінгвістичних правил.

Цільова архітектура, структура пакета й покроковий план описані в:
- [Python engine architecture](./PYTHON-ENGINE-ARCHITECTURE.md)
- [Repository structure](./REPOSITORY-STRUCTURE.md)
- [Design specification](./superpowers/specs/2026-11-08-python-engine-design.md)
- [Implementation plan](./superpowers/plans/2026-11-08-python-engine.md)

**Статус:** документацію та контракт підготовлено; Python package, CLI, wheel і PyPI release ще не реалізовані. Не називати їх доступними до проходження всіх packaging/CI acceptance gates.

## Інші пріоритети

1. **Дані та наукові докази:** продовжувати первинну перевірку значень і джерел; додавати лише перевірені word-level приклади; не заповнювати пропуски автоматично.
2. **Права на джерела:** завершити source-by-source review для відтворених таблиць, словників і third-party datasets.
3. **Доступність:** ручна перевірка screen reader, клавіатури, фізичного speech output і clipboard permissions на реальних пристроях.
4. **Публікація:** перевірити citation metadata, авторство, пакетну назву, dependency notices та відтворюваність перед будь-яким релізом або DOI.
5. **Підтримуваність:** оновлювати README, архітектуру, roadmap і handoff разом із кодом; не підтримувати паралельні master plans.

## Поза поточним scope

- Переклад змісту, OCR, акаунти, серверний API та база даних.
- Cantonese/Jyutping, Zhuyin та інші мови.
- Автоматична акустична сертифікація без перевіреного корпусу записів.
- PyPI publication до завершення packaging, licensing і metadata gates.

Не починати нові мовні продукти в цьому репозиторії. Для іншої мови використовувати її окремий репозиторій і власний мовний рушій.
