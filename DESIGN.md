# KazSaq Showcase — design system

Brief: публичная витрина концепт-демо для клиентов SMB в Казахстане. Режим Persuade. Одна работа экрана — открыть демо и представить «это мой бизнес». 3D не используется.

Direction: «ночная степь» на хабе (ink + sky + gold). Внутри демо — собственные палитры концептов (кофейня warm editorial; салон soft rose). Motion: liquid bulge tabs, hero line reveals, page crossfade+blur.

## Colour (hub)

```css
:root {
  --ink: #0B1220;
  --ink-2: #131C2E;
  --paper: #F7F5F0;
  --line-dark: #26324A;
  --on-ink: #F5F7FA;
  --on-ink-muted: #A9B4C6;
  --sky: #38BDF8;
  --sky-deep: #0369A1;
  --gold: #F2C14E;
}
```

## Type

- Display: Unbounded 600/700
- Text: Manrope 400/500/600/700
- Body ≥ 16px, line-height 1.5

## Motion

- Ease: `cubic-bezier(.16,1,.3,1)`
- Hero lines: 700–900ms mask reveal
- Tabs liquid: 420ms springy indicator + SVG goo filter
- Page enter: 480ms opacity + translateY(18) + blur(6→0)
- `prefers-reduced-motion`: cut to opacity only, no bulge morph

## Rules

- Концепты помечены «Концепт-проект»
- Не выдавать вымышленные бренды за клиентов
- Редактор: имя, акцент, город, WhatsApp — URL + localStorage
- Touch targets ≥ 44px, focus visible
