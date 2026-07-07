---
description: Generate an HTML slide deck (PDF/PPTX exportable) from a brief
---

# /design-slides <brief>

1. Treat the argument as the deck brief (topic, audience, rough slide
   count). If empty, ask for one.
2. Follow the `design-slides` skill
   (`.agents/skills/design-slides/SKILL.md`). For decks over 8 slides,
   show the outline first and confirm.
3. Save to `output/slides/YYYY-MM-DD-<slug>.html`.
4. Report the path, preview instructions (open in browser, navigate with
   ←/→), and offer `/design-export` for PDF/PPTX.
