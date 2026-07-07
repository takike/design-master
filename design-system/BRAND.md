# Brand Sheet

> **Status: Google Core Brand (v2)** — imported via `/design-import`.

| Field | Value |
|---|---|
| Brand name | Google Core Brand |
| Source | takike/design-system → `google-core-brand/` (a `/design-sync`-style bundle) |
| Imported from | `imports/google-core-brand/` (archived copy; original guidelines in its `design-system.md`) |
| Last updated | 2026-07-07 |

A "Google-style" presentation system (white canvas + the four Google
colors + Google Sans), reconstructed from public brand guidelines. It is
NOT official Google material — never use the Google logo or brand assets
in deliverables.

## Personality

White-dominant, calm, flat, friendly-round. Color is a garnish: ~90% of
any screen is white + grey, ~10% brand color.

## Core palette (fills / shapes — the 500 series, always in logo order)

Blue `#4285F4` → Red `#EA4335` → Yellow `#FBBC04` → Green `#34A853`

- Colored **text on white uses the 600-series or deeper**: Blue 600
  `#1A73E8` (= `--color-primary`), Red 600 `#D93025` (= `--color-accent`),
  Green 600 `#1E8E3E`, Yellow 800 `#EA8600`.
- Light washes for card backgrounds: Blue `#E8F0FE`, Red `#FCE8E6`,
  Yellow `#FEF7E0`, Green `#E6F4EA` — text on them stays Grey 900.
- Greys: text `#202124` (never `#000`), secondary `#5F6368`, hairline
  `#DADCE0`, card fill `#F8F9FA`.
- ⚠ `--color-warning` `#F29900` is **not AA on white** (2.25:1) — use it
  only with an icon + text label, never as small text or thin lines on
  white (per the imported guidelines).

## Typography

- Stack: `'Google Sans', 'Google Sans Text', Roboto, 'Helvetica Neue',
  Arial, 'Noto Sans JP', sans-serif` (Google Sans is not publicly
  licensed — Roboto via Google Fonts is the sanctioned web fallback).
- Weights **400 / 500 / 700 only**. Headings are Regular (400) — that IS
  the look. 500 for emphasis/buttons, 700 for numbers at most.
- Sentence case everywhere (no ALL CAPS). Headings left-aligned; centered
  only on title/divider/closing slides.

## Slide language (see `components/slide-*.html` for the 10 patterns)

- One message and ONE accent color per slide, rotating in logo order
  (blue → red → yellow → green).
- Four-color dot row (4 circles, ~20–28px, 16px gap) as a signature on
  title/closing slides only.
- Dark slides (Grey 900 + white text) only for section dividers and
  closing. Body slides are always white.
- Bullets use accent-colored round dots; max 5 items per slide.
- Charts: use the validated categorical palette in
  `components/chart-palette.html` — fixed slot order, no cycling; 7+
  series fold into "Other" grey. Slot 3 `#EA8600` requires direct labels
  on white.

## Do

- White background, generous margins, left-aligned Regular headings.
- Rounded shapes: 24px card radius, pill buttons/chips, dots.
- When in doubt, remove elements — whitespace is the brand.

## Don't

- No pure black, no ALL CAPS, no bold-everything headings.
- No gradients (that is the Gemini/AI vocabulary, not core brand).
- No drop shadows / 3D / skeuomorphism (rare `0 1px 3px` at most).
- No Yellow 500 thin lines or small text on white.
- No scattering all four colors outside charts and brand moments.
