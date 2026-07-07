# design-master — Agent Rules

This repository is a **design workspace**: a Claude Design-style
environment for Google Antigravity (and other AGENTS.md-compatible
agents). Requests for prototypes, landing pages, slide decks, one-pagers,
or branding must produce polished HTML deliverables by following the
skills in `.agents/skills/`.

## Directory map

| Path | Purpose |
|---|---|
| `design-system/` | Single source of truth for the brand: `tokens.json` + `tokens.css` (design tokens), `components.css`, `components/` (canonical markup), `GUIDELINES.md` (craft rules), `BRAND.md` (brand sheet), `preview.html` (style guide) |
| `imports/` | Drop zone for design systems exported from Claude Design (`/design-import` consumes these) |
| `.agents/skills/` | Skills: design-prototype, design-slides, design-onepager, design-system, design-import, design-export |
| `.agents/workflows/` | Slash commands wrapping those skills |
| `tools/` | `export-pdf.mjs`, `export-pptx.mjs`, `serve.mjs` |
| `output/` | Generated deliverables: `prototypes/`, `slides/`, `onepagers/` |

## Hard rules

1. **Every deliverable is a single standalone HTML file.** All CSS/JS
   inlined; the current `design-system/tokens.css` is copied into a
   `<style id="design-tokens">` block. Never `<link>` to the design
   system from a deliverable (only `design-system/preview.html` and
   `design-system/components/*` may link relatively).
2. **Read `design-system/GUIDELINES.md` and `design-system/BRAND.md`
   before generating anything visual.** Use only token colors, sizes,
   and fonts.
3. **Output naming:** `output/<type>/YYYY-MM-DD-<slug>.html`. Never
   overwrite — iterate as `-v2`, `-v3`, … unless the user asks to edit
   in place. Exports (`.pdf`/`.pptx`) sit next to their source HTML.
4. **No lorem ipsum, no placeholder boxes, no external images/CDNs.**
   Write realistic domain-appropriate content; draw visuals with CSS
   gradients and inline SVG.
5. **Decks and one-pagers follow their template contracts**
   (`.agents/skills/design-slides/resources/deck-template.html`,
   `.agents/skills/design-onepager/resources/onepager-template.html`) —
   the export tools in `tools/` depend on them.
6. **Language:** reply to the user in the user's language. Write
   deliverable content in the language of the request unless told
   otherwise. Font stacks must keep their Japanese fallbacks.

## Quality bar (short version — GUIDELINES.md is the full version)

- Modular type scale, max 2 font families, headings 1.1–1.2 line-height.
- 4px spacing grid; between-section space ≫ within-section space.
- 60-30-10 color usage; one accent; WCAG AA contrast (4.5:1 body).
- No default-Bootstrap look, no centered-everything, no shadow spam.

## Preview & export

```bash
node tools/serve.mjs                 # http://localhost:8000 (or open files directly)
node tools/export-pdf.mjs  <file.html>   # PDF (deck → 16:9 pages, docs → A4)
node tools/export-pptx.mjs <deck.html>   # PPTX (decks only)
```

First-time setup: `npm install`; then `npx playwright install chromium`
**only if** `PLAYWRIGHT_BROWSERS_PATH` is not set (when it is set,
browsers are pre-installed — never reinstall them).
