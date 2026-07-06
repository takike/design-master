---
name: design-onepager
description: Generate print-ready one-pagers, proposals, flyers, fact sheets,
  and handouts as standalone A4 HTML documents exportable to PDF. Use when the
  user asks for a one-pager, flyer, brochure, proposal document, fact sheet,
  or handout (ワンページャー / チラシ / 提案書 / 1枚資料 / 会社概要資料 /
  配布資料). Applies the workspace design system automatically.
---

# One-pager / Document Generation

## Goal

Produce a single HTML file that previews as "paper" in the browser and
exports to a pixel-exact A4 PDF.

## Before you start

1. Read `design-system/GUIDELINES.md` and `design-system/BRAND.md`.
2. Read `resources/onepager-template.html` in this skill directory — every
   document starts from it.
3. Read `design-system/tokens.css` — inline the current version into the
   `#design-tokens` block.

## Steps

1. **Content plan.** A one-pager delivers ONE message. Decide the single
   takeaway, then structure: header (logo/brand + title) → lead → 2–4
   compact sections → footer with contact/CTA. Write real copy.
2. **Copy the template structure** from `resources/onepager-template.html`,
   keeping the TEMPLATE CONTRACT (below). Document-specific CSS goes in
   `#doc-styles`.
3. **Fit check.** Content must fit the A4 page — the `.page` box clips
   overflow by design. If it cannot fit at reasonable density, propose a
   front/back layout (add a second `<section class="page">`) instead of
   shrinking text below `--text-xs`.
4. **Save** to `output/onepagers/YYYY-MM-DD-<slug>.html` (`-v2`, `-v3` for
   iterations).
5. **Report** the path and mention `/design-export` for the A4 PDF.

## Template contract (export tooling depends on this — never break it)

- `<meta name="doc-type" content="document">` stays in `<head>`.
- Each printed page is a `<section class="page">` (210mm × 297mm,
  `overflow: hidden`); the `#page-engine` block is kept verbatim.
- Never use `vh`/`vw` units inside `.page` — they break in print.
- Control page breaks only by adding/removing `.page` sections.

## Document craft

- One-pagers are the one deliverable where **compact** spacing is right:
  tighter grid (2–3 columns), sidebars, pull-quotes, small stat blocks.
  Still on the 4px grid.
- Strong information hierarchy: the reader should get the message in 5
  seconds from headline + one visual + one number.
- Use rules/borders and background tints (`color-mix` with the primary)
  to separate zones instead of large whitespace.
- Body text 12–14px is appropriate for print; never below 10px.
- Japanese documents: `line-height: 1.7–1.8`, avoid justification,
  headings as concise noun phrases.

## Do not

- Do not use `vh`/`vw`, fixed positioning, or JS-dependent layout.
- Do not use external images or CDN assets — inline SVG and CSS only.
- Do not let content silently overflow — verify fit, or go two pages
  deliberately.
- Do not use lorem ipsum.
