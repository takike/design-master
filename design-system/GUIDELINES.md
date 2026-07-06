# Design Guidelines

Read this file before generating any deliverable. These are the universal
craft rules for this workspace. Brand-specific rules live in `BRAND.md`
(imported brand guidelines are merged there — they never override this file's
universal principles).

## Typography

- Use at most **2 font families** per deliverable: one for display/headings
  (`--font-display`), one for body (`--font-sans`).
- Follow the modular type scale in `tokens.css` (`--text-xs` … `--text-5xl`).
  Never invent in-between sizes.
- Line height: **1.5–1.7 for body**, **1.1–1.2 for headings**.
  For Japanese body text use **1.8** and add
  `font-feature-settings: "palt"` for proportional kana/kanji spacing.
- Body text measure: **65–75 characters** (Japanese: ~35–40 characters,
  `max-width: 40em` is a safe cap). Never full-width paragraphs.
- Avoid justified text (especially in Japanese — causes bad spacing).
- Weight contrast beats size contrast: pair 700 headings with 400 body
  before reaching for a bigger size.

## Spacing

- Everything sits on the **4px grid** (`--space-*` tokens). No arbitrary
  values like `13px` or `1.3rem`.
- Whitespace communicates hierarchy: the gap **between** sections must be
  visibly larger than gaps **within** a section (e.g. `--space-16` between
  vs `--space-4` within).
- Section vertical padding: at least `--space-16` on desktop.
- When in doubt, add more whitespace, not more decoration.

## Color

- **60-30-10 rule**: ~60% neutral background, ~30% surface/secondary,
  ~10% primary/accent. Accent (`--color-accent`) is a garnish — one or two
  spots per screen, never large fills.
- One primary, one accent. Never introduce ad-hoc colors; derive tints with
  `color-mix(in srgb, var(--color-primary) 10%, transparent)`.
- Never pure black (`#000`) on pure white (`#fff`) — the tokens already
  provide softened values.
- **WCAG AA contrast**: 4.5:1 for body text, 3:1 for large text (≥24px or
  ≥19px bold). Muted text must still pass 4.5:1 against its background.
- Dark backgrounds are for hero/divider moments, not whole documents,
  unless the brand or user asks for a dark theme.

## Layout

- Max content width **1200px**, centered (`.container`).
- Design mobile-first for prototypes; use CSS grid/flex with sensible
  breakpoints (~640px, ~1024px).
- Align to a 12-column mental grid; avoid centering everything — strong
  left alignment with generous margins reads as more professional.
- Every screen needs a clear focal point (one dominant element).

## Imagery & graphics

- No external image URLs — they 404 offline and in exports. Use CSS
  gradients, SVG patterns/illustrations, emoji (sparingly), or pure
  typography instead of stock-photo placeholders.
- Charts: inline SVG or CSS bars, styled with tokens. Label directly rather
  than relying on legends when possible.
- Icons: inline SVG (e.g. simple 24px stroke icons drawn by hand), never
  icon-font CDNs.

## Anti-patterns (never do these)

- Default-Bootstrap look: blue `#007bff`, default border-radius everywhere,
  centered everything, `box-shadow` on every element.
- Lorem ipsum or gray placeholder boxes — always write realistic,
  domain-appropriate content.
- More than 2 font families, more than 1 accent color, drop shadows as
  decoration rather than elevation.
- Tiny unreadable footer text (<12px), text over busy backgrounds without
  a scrim.
- CDN frameworks (Bootstrap/Tailwind CDN, reveal.js) — deliverables must be
  fully self-contained.

## Brand notes

<!-- /design-import merges brand-specific guidance below this line. -->

None yet — using the Neutral Default system. Run `/design-import` to bring
in your Claude Design system, or `/design-system` to build one.
