# Chinese for Ukrainians — Design System

## Design direction

The product should feel like a small linguistic utility, not a generic AI landing page.

Principles:
- functional;
- typographic;
- calm;
- information-dense but not cramped;
- visually grounded in Chinese and Ukrainian writing systems;
- no decorative AI gradients, chat bubbles, robot imagery, or unnecessary illustrations.

The primary visual hierarchy is created by typography, spacing, rules, and aligned comparison panels.

## Page structure

Desktop:

Header
  brand / short description

Main
  input card
    script selector
    Pinyin tone control
    textarea
    character count
    actions

  results
    Pinyin
    Kirnosova
    Kirnosova–Tsisar
    NANU

Footer
  data/source note

On mobile, results become a vertical stack.

## Header

Keep the header compact.

Suggested title:
Chinese → українська

Suggested subtitle:
Pinyin і три українські системи транскрипції

Do not use a large marketing hero. The tool itself is the hero.

## Input controls

The script selector should be a segmented control or radio group:
- Авто;
- Спрощене;
- Традиційне.

Use explicit labels; do not rely on flag icons.

Pinyin tone control:
- use a native checkbox;
- label it `Показувати тони Pinyin`;
- default to checked;
- place it with the script selector in the same control group;
- changing it must update Pinyin while preserving the three Ukrainian outputs.

Textarea:
- generous height;
- visible border;
- monospaced or high-legibility CJK-compatible font for Chinese input;
- sample placeholder such as 北京大学.

Actions:
- Очистити;
- Приклад.

## Results

Each result should be a distinct but visually related panel.

Panel anatomy:
- system name;
- one-line explanatory label;
- output text;
- copy button.

Pinyin should be visually first because it is the canonical intermediate representation.

The three Ukrainian systems should be aligned as a comparison group, not presented as ranked alternatives.

## Comparison affordance

Use a compact table-like layout on desktop:

| System | Result | Copy |
|---|---|---|
| Pinyin | Běijīng | copy |
| Кірносова | Бейцзін | copy |
| Кірносова—Цісар | Бейдзін | copy |
| НАНУ | Бейцзін | copy |

Do not visually imply that one system is more correct merely by ordering or color. They are parallel systems. Pinyin can be first because it is the shared intermediate representation.

## Typography

Use a Unicode-capable sans-serif stack for interface text.

Recommended conceptual stack:
- UI: system sans;
- Chinese: system CJK sans fallback;
- Pinyin/results: a readable sans with strong Latin/Cyrillic support.

Avoid decorative display fonts.

Use large result text (roughly 1.15–1.35rem desktop) and comfortable line height.

## Color

Use a restrained neutral palette with one functional accent.

Color roles:
- background;
- surface;
- border;
- primary text;
- secondary text;
- accent;
- success;
- error.

Do not assign separate colors to the three Ukrainian systems. They are parallel systems, not categories with different status.

Contrast must meet WCAG AA for normal text.

## Spacing

Use a small spacing scale, e.g. 4 / 8 / 12 / 16 / 24 / 32 / 48 px.

The interface should have generous outer margins and tighter internal grouping.

## Responsive behavior

Desktop:
- max content width around 960–1100 px;
- input and results use the full content column;
- comparison can use a four-row table.

Mobile:
- one column;
- easily reachable copy controls;
- textarea at least 8–10 lines;
- no horizontal scrolling.

## Accessibility

Required:
- semantic main, header, footer;
- labels associated with controls;
- keyboard navigation;
- visible focus ring;
- aria-live status for conversion/copy feedback;
- buttons with text or accessible names;
- no color-only information;
- reduced-motion media query.

## Interaction style

No animations are required for conversion.

Micro-interactions should be subtle:
- copy confirmation;
- focus;
- input validation.

Avoid loading spinners for operations expected to complete locally in milliseconds.

## Content tone

Use concise Ukrainian.

Preferred labels:
- Введіть китайський текст
- Письмо
- Авто
- Спрощене
- Традиційне
- Показувати тони Pinyin
- Результат
- Скопіювати
- Скопійовано
- Очистити
- Приклад

## Design acceptance criteria

A reviewer should understand what to do within 3 seconds:
1. paste Chinese text;
2. choose script mode or leave Auto;
3. optionally disable Pinyin tones;
4. read four outputs.

No secondary feature should compete with the converter.
