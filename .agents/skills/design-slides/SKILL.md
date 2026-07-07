---
name: design-slides
description: Generate presentation slide decks as standalone HTML with keyboard
  navigation and 16:9 slides, exportable to PDF and PPTX. Use when the user asks
  for slides, a deck, a presentation, pitch deck, keynote, or company/product
  briefing (スライド / プレゼン資料 / ピッチデック / 発表資料 / 提案プレゼン).
  Applies the workspace design system automatically.
---

# Slide Deck Generation

## Goal

Produce a single HTML slide deck that previews in the browser (arrow-key
navigation) and exports 1:1 to PDF and PPTX via `tools/`.

## Before you start

1. Read `design-system/GUIDELINES.md` and `design-system/BRAND.md`.
2. Read `resources/deck-template.html` in this skill directory — every deck
   starts from it.
3. Read `design-system/tokens.css` — inline the current version into the
   deck's `#design-tokens` block (the template ships with a possibly stale
   copy).

## Steps

1. **Outline first.** Write the narrative: title → agenda (if >6 slides) →
   one idea per slide → summary/CTA. For decks over 8 slides, show the
   user the outline and get a nod before building.
2. **Copy the template structure** from `resources/deck-template.html`.
   Keep the TEMPLATE CONTRACT intact (see below). Replace the
   `#design-tokens` block with the current `design-system/tokens.css`.
3. **Write the slides** inside `<main class="deck">`, one
   `<section class="slide">` each. Put deck-specific CSS in
   `#slide-styles`.
4. **Save** to `output/slides/YYYY-MM-DD-<slug>.html`. Iterations get
   `-v2`, `-v3`, … unless the user asks to edit in place.
5. **Report** the path, preview instructions (open in browser, ←/→ keys),
   and mention `/design-export` for PDF/PPTX.

## Template contract (export tooling depends on this — never break it)

- `<meta name="doc-type" content="deck">` stays in `<head>`.
- Every slide is a direct `<section class="slide">` child of
  `<main class="deck">`, designed at exactly **1280×720**.
- The `#deck-engine` style block and the navigation `<script>` (which
  exposes `window.__deck = { count, current, goTo }`) are kept verbatim.
- Content must fit inside a slide — no scrolling inside slides.

## Slide craft

- Max ~40 words per slide, max 6 bullet lines. If it doesn't fit, split
  the slide or cut text.
- Big numbers as stat callouts (huge value + small muted label), not
  buried in sentences.
- Consistent header pattern on content slides (same position/size), and a
  footer with brand + page number (the template's `.pageno` fills itself).
- Use section-divider slides (primary background) every 4–6 content
  slides to pace long decks.
- Charts: inline SVG or CSS bar/column compositions styled with tokens —
  label values directly on the marks.
- Title and divider slides may go bold (full-bleed primary background);
  content slides stay light for readability.
- Japanese decks: headings may be short noun phrases; body 1.6–1.8 line
  height; avoid full-width paragraphs on slides.

## Skeleton example

```html
<section class="slide title-slide"> … </section>
<section class="slide">
  <h2>市場規模は3年で2倍</h2>
  <div style="display:flex; gap:var(--space-16);"> …stats… </div>
  <div class="footer"><span>Acme</span><span class="pageno"></span></div>
</section>
<section class="slide divider"> <h2>プロダクト</h2> </section>
```

## Do not

- Do not use reveal.js or any CDN dependency.
- Do not let content overflow 1280×720 (no scrollable slides).
- Do not change fonts or the token palette per slide.
- Do not remove or rename `window.__deck`, `.slide`, or the doc-type meta.
