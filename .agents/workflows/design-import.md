---
description: Import a design system exported from Claude Design (zip/folder in imports/)
---

# /design-import [path to zip or folder]

1. Locate the bundle: the given path, or the newest `.zip`/folder in
   `imports/`. If none, ask the user to export their design system from
   Claude Design (or copy their `/design-sync` folder) into `imports/`.
2. Follow the `design-import` skill
   (`.agents/skills/design-import/SKILL.md`): inventory the bundle, map
   tokens into `design-system/tokens.json` + `tokens.css` (values only),
   copy components into `design-system/components/`, merge guidelines
   into `BRAND.md` + the "Brand notes" section of `GUIDELINES.md`, and
   run the AA contrast check.
3. Report what was imported vs inherited, point the user at
   `design-system/preview.html`, and offer to re-apply the brand to
   existing files in `output/`.
