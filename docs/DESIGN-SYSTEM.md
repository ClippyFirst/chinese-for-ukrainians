# Chinese for Ukrainians — Design System

## Design direction

The interface is a **functional linguistic instrument**. It should feel closer to a reference tool, dictionary workstation, or typographic specimen than to a generic AI product.

### Principles

- **Function first:** the converter is the visual center.
- **Typography creates hierarchy:** scale, weight, rules, alignment and whitespace do the work.
- **Chinese and Ukrainian are both visible:** CJK input and readable Latin/Cyrillic output use appropriate fallback stacks.
- **Parallel, not ranked:** the three Ukrainian systems receive equal treatment.
- **Calm density:** information-rich without visual clutter.
- **No AI clichés:** no gradients, robot imagery, chat bubbles, glowing cards or decorative illustrations.
- **Local by default:** the small LOCAL marker communicates the privacy model.

## Visual language

| Role | Value | Purpose |
|---|---|---|
| Paper | #f3f1eb | page background |
| Surface | #ffffff | work surfaces |
| Soft surface | #faf9f5 | inputs and secondary results |
| Ink | #151719 | primary text |
| Muted | #686b6f | supporting text |
| Line | #d8d6cf | separators |
| Strong line | #b9b7af | form borders |
| Accent | #173f8a | actions and focus |
| Accent soft | #eef3fb | Pinyin surface |
| Warning | #725d22 | unresolved-data state |

The accent is functional and is not assigned to one transcription system as a sign of superiority.

## Typography

- Interface: system sans stack.
- Chinese input: CJK-compatible sans fallback.
- Main title: restrained serif stack.
- Pinyin: readable sans, slightly larger than ordinary result text.
- Ukrainian: readable Cyrillic-capable sans.

Avoid decorative display fonts and excessive uppercase text.

## Page composition

### Header

Small Chinese mark, eyebrow, optional LOCAL status, large title and one explanatory sentence. No marketing hero.

### Input

The first major block contains section marker, title, local-processing note, character count, large textarea and a compact control strip.

### Controls

Script mode, Pinyin tone display, Ukrainian tone display, flexible spacer, example and clear actions. On mobile they wrap into a practical touch-friendly layout.

### Results

Pinyin is full-width and slightly emphasized because it is the canonical pronunciation layer shared by the Ukrainian renderers. This is an architectural distinction, not a ranking.

The three Ukrainian systems occupy equal secondary cards. Each card contains an index, system name, short description, copy action and output.

## Interaction

Primary action is solid accent; quiet actions are neutral bordered controls; copy is compact and local to each result. No unnecessary animation or loading spinner is used for synchronous conversion.

Both tone controls are independent:

- Pinyin tones affect only Pinyin presentation.
- Ukrainian tones affect only Ukrainian presentation.

The empty state is understated and is not styled as an error. Data warnings use a muted warm surface rather than aggressive red.

## Responsive rules

Desktop: maximum content width 1120 px, Pinyin full-width, three Ukrainian cards in a two-column grid, controls in one strip where possible.

Tablet: same hierarchy, controls may wrap.

Mobile: 12 px side margin, one-column results, full-width script control, comfortable tone/action controls, no horizontal scrolling, stacked footer.

## Accessibility

Semantic landmarks, explicit labels, visible keyboard focus, native controls, accessible copy buttons, live status, no color-only information, reduced-motion support and readable zoomed layouts are required.

## Content rules

Preferred: «Введіть китайський текст», «Письмо», «Авто», «Спрощене», «Традиційне», «Тони Pinyin», «Тони в українській», «Результати», «Копіювати», «Приклад», «Очистити».

Avoid marketing claims, AI branding, «магія», «розумний перекладач», «100% точний» and winner-like labels.

## Design QA checklist

1. Find the Chinese input immediately.
2. See that Auto is selected.
3. Notice the two independent tone controls.
4. Run an example or paste text.
5. Read Pinyin and the three parallel Ukrainian systems.
6. Copy the desired output.

Desktop and mobile should preserve this hierarchy; only the layout changes.
