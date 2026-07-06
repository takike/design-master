---
description: Generate a UI prototype / landing page from a brief
---

# /design-prototype <brief>

1. Treat the argument as the design brief (product, audience, tone). If
   empty, ask for a one-line brief.
2. Follow the `design-prototype` skill
   (`.agents/skills/design-prototype/SKILL.md`) end to end.
3. Save to `output/prototypes/YYYY-MM-DD-<slug>.html`.
4. Report the file path, how to preview it (open in browser or
   `node tools/serve.mjs`), your assumptions, and 2–3 iteration ideas.
