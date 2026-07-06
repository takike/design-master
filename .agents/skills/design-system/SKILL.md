---
name: design-system
description: Create or update the workspace design system (brand colors, fonts,
  type scale, spacing, components) that is automatically applied to every
  prototype, slide deck, and one-pager. Use when the user wants to set brand
  colors, extract a brand from a website URL, change fonts or theme, or tweak
  a token (ブランド設定 / ブランドカラー変更 / テーマ変更 / フォント変更).
  For importing a design system exported from Claude Design, use the
  design-import skill instead.
---

# Design System Setup & Editing

## Goal

Keep `design-system/` — the single source of truth that every deliverable
inlines — consistent, accessible, and matching the user's brand.

**If the user wants to bring in a design system from Claude Design
(claude.ai/design), stop and follow the `design-import` skill instead.**

## The files you manage

| File | Role |
|---|---|
| `design-system/tokens.json` | Machine-readable tokens (schema is FIXED) |
| `design-system/tokens.css` | Same tokens as CSS custom properties — 1:1 with tokens.json |
| `design-system/components.css` | Component classes consuming only the tokens |
| `design-system/components/*.html` | Canonical component reference markup |
| `design-system/BRAND.md` | Human-readable brand sheet |
| `design-system/GUIDELINES.md` | Universal craft rules (do not weaken) + a "Brand notes" section |
| `design-system/preview.html` | Style guide page for visual verification |

## Modes

### (a) Interactive setup — "set up our brand"

1. Ask for: brand name, 1–3 brand colors (hex, or a mood like
   "techy / warm / luxury / playful"), font preference (or pick suitable
   Google Fonts with Japanese support, e.g. Noto Sans JP pairings).
2. Derive the full palette from the primary via HSL shifts: `bg` (very
   light tint or warm neutral), `surface`, `border`, muted text, and
   status colors harmonized with the primary's hue.
3. **Verify WCAG AA** (4.5:1 body text on bg/surface; 3:1 large text).
   Auto-fix by darkening/lightening and tell the user what you adjusted.
4. Apply (see "Applying changes").

### (b) Extract from a URL — "match our website"

1. Fetch the page; read inline styles/linked CSS for `--*` variables,
   color literals, and `font-family` declarations. Prefer the site's own
   design tokens when present.
2. Identify: primary (buttons/links), accent, background/surface, text
   colors, heading + body fonts.
3. Present the proposed token set (hex swatch list) for confirmation
   before applying.

### (c) Tweak — "make the primary darker"

Change the requested value(s) only; re-check the AA pairs it affects.

## Applying changes

1. Update `tokens.json` values (never the schema — key names and CSS
   variable names are a stable contract with skills, templates, and
   tools).
2. Regenerate `tokens.css` to match 1:1, bump `meta.version`, set
   `meta.name`/`meta.source`.
3. Update `BRAND.md` (name, personality, do/don't) and, if fonts changed,
   the Google Fonts `<link>` guidance comment in `tokens.css`.
4. Tell the user to open `design-system/preview.html` to verify.
5. **Offer to re-apply the new tokens to existing deliverables** in
   `output/` (rewrite each file's `<style id="design-tokens">` block).
   This is how brand changes propagate — do it only with the user's OK.

## Do not

- Do not change the token schema (add/rename/remove keys or CSS variable
  names).
- Do not ship a palette that fails AA without flagging it explicitly.
- Do not edit `GUIDELINES.md`'s universal sections — brand-specific notes
  go under its "Brand notes" heading or in `BRAND.md`.
- Do not touch files in `output/` without the user's OK.
