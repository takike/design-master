---
name: design-export
description: Export HTML deliverables from this workspace to PDF or PPTX
  (PowerPoint). Use when the user asks to export, convert, print, share, or
  hand off a deck, one-pager, or prototype (PDF化 / パワポにして / PPTXで /
  エクスポート / 印刷用 / 共有用ファイル). Runs the Node scripts in tools/.
---

# Export Deliverables (PDF / PPTX)

## Goal

Turn a generated HTML deliverable into the file the user actually shares:
PDF for documents and decks, PPTX for decks that need editing/presenting
in PowerPoint, Keynote, or Google Slides.

## What exports to what

| Deliverable | PDF | PPTX |
|---|---|---|
| Slide deck (`doc-type: deck`) | ✔ one slide per page | ✔ one slide per 16:9 page (WYSIWYG image + heading in speaker notes) |
| One-pager (`doc-type: document`) | ✔ A4 pages | — |
| Prototype (no doc-type) | ✔ A4 (best-effort; prototypes are for browsers) | — |

## Prerequisites check (run before exporting)

1. `node_modules/` missing → run `npm install`.
2. Chromium: if `PLAYWRIGHT_BROWSERS_PATH` is set, browsers are
   pre-installed — do NOT run playwright install. Otherwise, if the
   export fails with "Executable doesn't exist", run
   `npx playwright install chromium` once.

## Commands

```bash
node tools/export-pdf.mjs  <file.html> [out.pdf]    # PDF (deck or A4 by doc-type)
node tools/export-pptx.mjs <deck.html> [out.pptx]   # PPTX (decks only)
```

Outputs default to the same basename next to the source file. After
exporting, report the output path and the page/slide count the script
printed.

## Troubleshooting

- **"not a design-master deck (window.__deck API missing)"** — the file
  doesn't follow the deck template contract. Fix the deck to match
  `.agents/skills/design-slides/resources/deck-template.html` (doc-type
  meta, `.slide` sections, engine script), then retry.
- **Fonts look wrong in the export** — the scripts already wait for
  `document.fonts.ready`; if a Google Fonts `<link>` is unreachable
  (offline), the token fallback stacks render instead. That is expected.
- **A one-pager spills onto a second PDF page** — content overflows its
  `.page`; tighten spacing or move content, don't shrink below 10px text.
- **PPTX text isn't editable** — by design: slides are inserted as
  pixel-perfect images so the deck looks identical everywhere; headings
  are in the speaker notes for searchability. If the user needs fully
  editable PPTX, say so honestly and offer the PDF alongside.

## Do not

- Do not run `npx playwright install` when `PLAYWRIGHT_BROWSERS_PATH` is
  set.
- Do not export a deck to PPTX by screenshotting manually — always use
  `tools/export-pptx.mjs`.
- Do not overwrite a user's existing export without mentioning it.
