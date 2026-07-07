---
name: design-prototype
description: Generate interactive UI prototypes, landing pages, web app mockups,
  dashboards, and marketing pages as polished standalone HTML/CSS/JS files that
  open directly in a browser. Use when the user asks for a prototype, mockup,
  landing page, LP, UI design, web page design, dashboard, or wants to see and
  iterate on a visual design (プロトタイプ / モックアップ / ランディングページ /
  UIデザイン / 画面デザイン). Applies the workspace design system automatically.
---

# UI Prototype Generation

## Goal

Produce a single, self-contained HTML file that looks like it came from a
professional product/marketing designer — not a default framework theme —
and that the user can open, click through, and iterate on.

## Before you start

1. Read `design-system/GUIDELINES.md` (craft rules) and
   `design-system/BRAND.md` (current brand).
2. Read `design-system/tokens.css` — you will inline its full contents.
3. If the request is genuinely ambiguous, ask at most 1–2 clarifying
   questions. Otherwise decide yourself and state your assumptions in one
   short list after delivering.

## Steps

1. **Content plan.** List the sections and write REAL copy for each
   (headlines, feature descriptions, CTA labels, nav items, footer). Invent
   a plausible product/company voice if the user gave none. Never lorem
   ipsum.
2. **Pick a layout archetype.**
   - Landing page: hero (one focal point) → social proof → features (3-up
     cards or alternating rows) → pricing/CTA → footer.
   - Dashboard/app: app shell (sidebar or topbar) → stat row → main
     table/chart area → detail panel.
   - Mobile-first marketing page: stacked sections, sticky CTA.
3. **Build one standalone HTML file.**
   - Inline the CURRENT `design-system/tokens.css` into
     `<style id="design-tokens">…</style>` — never `<link>` to it.
   - Reuse class patterns from `design-system/components.css` (copy the
     rules you use into the file) and the reference markup in
     `design-system/components/`.
   - Optionally load brand fonts via one Google Fonts `<link>` with
     `display=swap`; the token font stacks already have system fallbacks.
   - Semantic HTML (`header/nav/main/section/footer`), responsive
     breakpoints (~640px / ~1024px), and subtle interactions only: hover
     states, smooth scroll, a mobile nav toggle, an
     `IntersectionObserver` reveal-on-scroll if it fits the tone.
4. **Save** to `output/prototypes/YYYY-MM-DD-<slug>.html` (today's date,
   kebab-case slug). Iterations: save as `-v2`, `-v3`, … unless the user
   asks to edit in place.
5. **Tell the user** the file path, how to preview
   (`open the file, or node tools/serve.mjs`), and offer 2–3 concrete
   iteration directions (e.g. "darker hero", "denser feature grid").

## Prototype-specific craft

- The hero needs exactly one focal point: a huge headline OR a visual —
  not both fighting for attention.
- Alternate section rhythm (light / subtle-tint / light) so the page has
  visible structure when scrolling.
- Repeat the primary CTA every 2–3 screens of scroll.
- Realistic nav and footer make a prototype credible: real link labels,
  legal line, language toggle if Japanese.
- Dark themes only when the user or brand asks for one.

## Example

Request: 「タスク管理SaaSのLPを作って」
→ Sections: hero (headline 「チームのタスクを、1枚のボードに。」+ CTA
「無料で始める」), logo strip, 3 feature cards (ボード / 自動化 /
レポート), pricing (3 tiers), FAQ, footer.
→ File: `output/prototypes/2026-07-06-taskflow-lp.html`.

## Do not

- Do not use CDN CSS/JS frameworks (Bootstrap, Tailwind CDN, jQuery) — the
  file must work offline.
- Do not reference external images — use CSS gradients, inline SVG, or
  typography instead.
- Do not use lorem ipsum or gray placeholder boxes.
- Do not split into multiple files unless the user explicitly asks for a
  multi-page prototype (then create a folder
  `output/prototypes/YYYY-MM-DD-<slug>/` with an `index.html`).
- Do not introduce colors or font sizes outside the tokens.
