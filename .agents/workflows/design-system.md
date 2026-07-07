---
description: Set up or tweak the workspace design system (brand colors, fonts, tokens)
---

# /design-system [brand colors / URL / tweak request]

1. Route by the argument:
   - Mentions Claude Design, an export, a zip, or importing →
     switch to `/design-import` (`.agents/skills/design-import/SKILL.md`).
   - A URL → "extract from URL" mode.
   - Colors/fonts/mood or nothing → interactive setup.
   - A specific change ("primary を濃く") → tweak mode.
2. Follow the `design-system` skill
   (`.agents/skills/design-system/SKILL.md`): update tokens.json +
   tokens.css (values only — never the schema), BRAND.md, and verify AA
   contrast.
3. Tell the user to check `design-system/preview.html`, and offer to
   re-apply tokens to existing files in `output/`.
