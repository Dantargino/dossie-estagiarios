# Color Usage Rules (Minimal — Corporate)

This design system uses **5 color palettes only**. Any color outside this set must not be used under any circumstance. When in doubt, use `slate`.

---

## The 5 Palettes

```css
/* Neutral — Base of everything */
--color-slate-50:  #f8f9fb;
--color-slate-100: #eef0f4;
--color-slate-200: #d8dce6;
--color-slate-300: #b3bace;
--color-slate-400: #8e97b4;
--color-slate-500: #69759a;
--color-slate-600: #535d7b;
--color-slate-700: #3e455c;
--color-slate-800: #292e3d;
--color-slate-900: #15171f;
--color-slate-950: #0d0e16;

/* Success */
--color-jade-green-50:  #e9fbf0;
--color-jade-green-100: #d3f8e1;
--color-jade-green-200: #a8f0c2;
--color-jade-green-300: #7ce9a4;
--color-jade-green-400: #51e186;
--color-jade-green-500: #25da67;
--color-jade-green-600: #1eae53;
--color-jade-green-700: #16833e;
--color-jade-green-800: #0f5729;
--color-jade-green-900: #072c15;
--color-jade-green-950: #051f0e;

/* Danger / Error */
--color-crimson-red-50:  #fff0f0;
--color-crimson-red-100: #fdd8d8;
--color-crimson-red-200: #f9adad;
--color-crimson-red-300: #f47f7f;
--color-crimson-red-400: #ef5151;
--color-crimson-red-500: #e82323;
--color-crimson-red-600: #b91c1c;
--color-crimson-red-700: #8b1515;
--color-crimson-red-800: #5c0e0e;
--color-crimson-red-900: #2e0707;
--color-crimson-red-950: #200505;

/* Warning */
--color-amber-orange-50:  #fff8f0;
--color-amber-orange-100: #feecd8;
--color-amber-orange-200: #fcd4a8;
--color-amber-orange-300: #f9b978;
--color-amber-orange-400: #f79e48;
--color-amber-orange-500: #f58318;
--color-amber-orange-600: #c46813;
--color-amber-orange-700: #934e0e;
--color-amber-orange-800: #623409;
--color-amber-orange-900: #311a05;
--color-amber-orange-950: #231203;

/* Info / Interactive */
--color-digital-blue-50:  #e5f0ff;
--color-digital-blue-100: #cce0ff;
--color-digital-blue-200: #99c2ff;
--color-digital-blue-300: #66a3ff;
--color-digital-blue-400: #3385ff;
--color-digital-blue-500: #0066ff;
--color-digital-blue-600: #0052cc;
--color-digital-blue-700: #003d99;
--color-digital-blue-800: #002966;
--color-digital-blue-900: #001433;
--color-digital-blue-950: #000e24;
```

---

## Role of Each Palette

### `slate` — Neutral (default for everything)
The base of the entire interface. Use slate for all elements that carry no semantic meaning.

**Use for:** body text, headings, labels, borders, dividers, backgrounds, sidebar, cards, icons, disabled states, placeholders, timestamps, metadata, secondary text, tooltips, empty states.

**Rule:** If you are unsure which color to use, always use slate. Color is the exception, not the rule.

---

### `jade-green` — Success only
Reserved exclusively for positive outcomes and confirmations.

**Use for:** success alerts, confirmation messages, completed steps, positive metric indicators, "saved" states, checkmark icons with semantic meaning.

**Never use for:** buttons, decorative elements, backgrounds, categories, tags without semantic meaning, charts (unless the series represents growth or positive data).

---

### `crimson-red` — Danger and Error only
Reserved exclusively for failures, errors, and destructive actions.

**Use for:** form validation errors, failed API responses, error alerts, destructive action confirmations ("Delete", "Remove", "Cancel plan"), critical system warnings.

**Never use for:** warnings that don't involve failure or destruction. Never use decoratively.

---

### `amber-orange` — Warning only
Reserved exclusively for situations that require attention but are not yet failures.

**Use for:** expiring trials, quota near limit, pending actions requiring user attention, irreversible action previews before confirmation, scheduled downtime notices.

**Never use for:** errors (use crimson-red), general information (use slate), decorative purposes.

---

### `digital-blue` — Interactive and Informational only
Reserved for elements that invite interaction or deliver neutral information.

**Use for:** text links, focused input borders, selected/active navigation states, informational alerts ("Did you know…"), skeleton loaders, focus rings.

**Never use for:** success, warning, or error states. Never use as a background fill for sections or cards. Never use decoratively.

---

## Stop Usage Guide

| Stop | Use for |
|------|---------|
| 50 | Alert / banner background tint |
| 100 | Badge and tag background |
| 200 | Border on tinted surfaces, hover on light bg |
| 300–400 | Icon fills, secondary accents |
| 500 | Default solid fill (dark mode buttons, chart lines) |
| 600 | Primary solid fill for interactive elements (light mode buttons) |
| 700 | Hover state on solid fills |
| 800 | Text on light tinted backgrounds |
| 900 | Strong text, dark mode fills |
| 950 | Darkest surfaces, dark mode deep backgrounds |

---

## Text on Colored Backgrounds

| Background stop | Text stop (same palette) |
|----------------|--------------------------|
| 50–100 | 700–800 |
| 200–300 | 800–900 |
| 500–600 | 50 |
| 700–950 | 50–100 |

Never place black (`#000`) or white (`#fff`) directly on a colored surface. Always use a stop from the same palette.

---

## Light Mode vs Dark Mode

| Element | Light mode | Dark mode |
|---------|------------|-----------|
| Page background | slate-50 | slate-950 |
| Card / surface | white | slate-900 |
| Body text | slate-900 | slate-100 |
| Secondary text | slate-600 | slate-400 |
| Placeholder | slate-400 | slate-600 |
| Border default | slate-200 | slate-700 |
| Border emphasis | slate-300 | slate-600 |
| Divider | slate-100 | slate-800 |
| Icon neutral | slate-500 | slate-400 |
| Button primary fill | digital-blue-600 | digital-blue-500 |
| Button primary text | slate-50 | slate-50 |
| Button disabled fill | slate-100 | slate-800 |
| Button disabled text | slate-400 | slate-600 |

---

## Quick Reference by UI Element

| Element | Palette | Stop (light mode) |
|---------|---------|-------------------|
| Page background | slate | 50 |
| Card background | white / slate | — / 50 |
| Body text | slate | 900 |
| Secondary text | slate | 600 |
| Placeholder | slate | 400 |
| Border default | slate | 200 |
| Divider | slate | 100 |
| Icon (no meaning) | slate | 500 |
| Text link | digital-blue | 600 |
| Focused input border | digital-blue | 500 |
| Active nav item | digital-blue | 600 |
| Info alert background | digital-blue | 50 |
| Info alert text | digital-blue | 800 |
| Info alert border | digital-blue | 200 |
| Success alert background | jade-green | 50 |
| Success alert text | jade-green | 800 |
| Success alert border | jade-green | 200 |
| Success icon | jade-green | 600 |
| Warning alert background | amber-orange | 50 |
| Warning alert text | amber-orange | 800 |
| Warning alert border | amber-orange | 200 |
| Warning icon | amber-orange | 500 |
| Error alert background | crimson-red | 50 |
| Error alert text | crimson-red | 800 |
| Error alert border | crimson-red | 200 |
| Error icon | crimson-red | 600 |
| Form field error text | crimson-red | 700 |
| Form field error border | crimson-red | 400 |
| Disabled input | slate | 100 (bg) + 400 (text) |
| Primary button | digital-blue | 600 (fill) + 50 (text) |
| Destructive button | crimson-red | 600 (fill) + 50 (text) |
| Disabled button | slate | 100 (fill) + 400 (text) |

---

## Hard Rules — Never Break These

1. **Never use color for decoration.** Color exists only to communicate meaning (success, error, warning, interactive). If an element has no semantic meaning, it must be slate.

2. **Never use more than 2 semantic colors in the same UI section.** A card cannot have a green badge, a blue link, an orange warning, and a red error at the same time. Prioritize the most critical one.

3. **Never use jade-green for buttons or primary actions.** It means success, not action. The primary action color is digital-blue.

4. **Never use crimson-red or amber-orange for non-status elements.** They must not appear in navigation, cards, avatars, tags, or any element that isn't explicitly communicating danger or warning.

5. **Never add new color palettes** without updating this file. The system is intentionally limited to 5 palettes. Adding more breaks the visual coherence.

6. **Slate is always available.** Any element that doesn't fit a semantic role gets slate, regardless of context.