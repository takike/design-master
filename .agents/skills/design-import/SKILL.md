---
name: design-import
description: Import a design system exported from Claude Design (claude.ai/design)
  into this workspace so all prototypes, slides, and one-pagers use that brand.
  Use when the user mentions importing/bringing in a design system, a Claude
  Design export, a design-system zip or folder, or /design-sync output
  (Claude Designのデザインシステムを取り込む / インポート / 読み込み /
  デザインシステムを反映). Accepts a .zip or an extracted folder in imports/.
---

# Import a Claude Design Design System

## Goal

Take a design-system bundle exported from Claude Design and make it THE
design system of this workspace — updating `design-system/` so every
future deliverable (and, on request, existing ones) uses the imported
brand.

## What a Claude Design export looks like

A `.zip` (or folder) typically containing:

- `tokens.json` — colors, type scale, spacing, radii
- component HTML files — canonical button, card, nav variants
- `guidelines.md` — voice, layout rules, do/don't list

Folder layouts vary (files may sit at the root, under `design-system/`,
or under component subfolders). A folder produced by Claude Code's
`/design-sync` has the same content — treat it identically. **Detect by
content, not by path.**

## Steps

1. **Locate the bundle.** Check, in order: a path the user gave;
   `imports/` (newest `.zip` or subfolder). If a `.zip`, extract it to
   `imports/<name>/`. If nothing is found, ask the user to export from
   Claude Design (project → Export → download) and drop the file into
   `imports/`, or copy in their `/design-sync` folder.
2. **Inventory the bundle.** Find every `*.json` that looks like tokens
   (keys like colors/typography/spacing), every `*.html`/`*.css`
   component file, and every markdown guideline file. List what you found
   before changing anything.
3. **Map tokens → local schema.** Update VALUES in
   `design-system/tokens.json` (the schema — key names — never changes):
   - colors → `color.*` (bg, surface, text, text-muted, primary,
     primary-contrast, accent, border, success/warning/danger)
   - typography → `font.*` and `typescale.*`
   - spacing/radii/shadows → `space.*`, `radius.*`, `shadow.*`
   - If the bundle has no `tokens.json`, extract tokens from its CSS
     (custom properties, repeated color literals, font-family rules).
   - Missing values: keep the current defaults and report exactly which
     tokens were inherited vs imported.
   - Font stacks: append Japanese + system fallbacks if the imported
     stack lacks them.
4. **Contrast check.** Verify AA (4.5:1 body on bg/surface, 3:1 large).
   Flag failures and propose the minimal darken/lighten fix — do not
   silently pass or silently change the brand color; ask.
5. **Regenerate `design-system/tokens.css`** 1:1 from tokens.json; bump
   `meta.version`, set `meta.name` to the brand name and `meta.source`
   to e.g. `Claude Design export (imports/<name>, 2026-07-06)`.
6. **Import components.** Copy the bundle's component HTML into
   `design-system/components/` (replace same-named files, keep others).
   Where an imported component defines styling that our
   `components.css` classes cover (buttons, cards, badges…), update those
   class rules to match the imported look — still consuming only tokens.
7. **Merge guidelines.** Brand voice/personality/do-don't → `BRAND.md`
   (record source + date). Layout/visual rules → the "Brand notes"
   section at the end of `design-system/GUIDELINES.md`. NEVER overwrite
   the universal sections of GUIDELINES.md.
8. **Verify & report.** Tell the user to open
   `design-system/preview.html`; summarize what was imported, inherited,
   and any contrast fixes. Then **offer to re-apply the new tokens to
   existing files in `output/`** (rewrite their
   `<style id="design-tokens">` blocks) — only with the user's OK.

## Re-importing (brand updated in Claude Design)

Same flow. Treat it as a diff: report which token values changed, replace
previously-imported components, and re-offer propagation to `output/`.

## Do not

- Do not change the token schema or CSS variable names.
- Do not overwrite the universal craft sections of `GUIDELINES.md`.
- Do not delete the user's bundle from `imports/` (it is the audit trail).
- Do not apply a palette that fails AA without flagging it.
- Do not modify `output/` files without explicit OK.
