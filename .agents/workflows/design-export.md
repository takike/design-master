---
description: Export a deliverable to PDF or PPTX
---

# /design-export <file.html> [pdf|pptx|both]

1. Resolve the file (search `output/` if a bare name was given). Default
   format: decks → both, documents/prototypes → pdf.
2. Follow the `design-export` skill
   (`.agents/skills/design-export/SKILL.md`): run the prerequisites
   check, then `node tools/export-pdf.mjs` and/or
   `node tools/export-pptx.mjs`.
3. Report the output path(s) and page/slide counts. On failure, apply the
   skill's troubleshooting table before asking the user anything.
