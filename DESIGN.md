# DESIGN

Design system reference for `castri.dev`. Source of truth lives in code (`src/styles/global.css` and `src/components/ui/`); this file is the readable index. When code and this file disagree, code wins — update this file.

## Foundations

### Color (OKLCH)

All color is OKLCH so neutrals can be tinted toward the primary hue (285–290°) without drifting. **Never `#000` or `#fff`.** Every neutral carries chroma 0.005–0.05 toward the brand hue.

| Role | Light | Dark | Use |
|---|---|---|---|
| `background` | `oklch(0.96 0.02 290)` | `oklch(0.24 0.04 290)` | Page surface |
| `foreground` | `oklch(0.22 0.03 285)` | `oklch(0.98 0.01 290)` | Default text |
| `card` | `oklch(1 0 0)` | `oklch(0.28 0.04 290)` | Raised surfaces |
| `muted` | `oklch(0.965 0.016 290)` | `oklch(0.3 0.03 290)` | Quiet backdrops |
| `muted-foreground` | `oklch(0.5 0.02 285)` | `oklch(0.75 0.02 290)` | Secondary text |
| `accent` | `oklch(0.96 0.02 290)` | `oklch(0.32 0.05 290)` | Hover backdrops (used at `/20` opacity) |
| `border` | `oklch(0.9 0.01 290)` | `oklch(1 0 0 / 13%)` | Hairlines, outlines |
| `primary` | `oklch(0.646 0.222 41.116)` | `oklch(0.705 0.213 47.604)` | The single accent — names, current state, CTAs |
| `ring` | `oklch(0.74 0.2 41)` | `oklch(0.6 0.22 41)` | Focus indicator |
| `success` / `warning` / `info` / `destructive` | semantic | semantic | Status badges only |

**Strategy: Restrained.** Primary occupies ≤10% of any surface. Hover backdrops use `accent/20`. The orange is reserved for the protagonist of a screen — it is not decoration.

### Typography

Display family: **Onest** (humanist sans, loaded via `@fontsource/onest`).

Semantic ramp exposed as Tailwind v4 utilities (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-meta`). All sizes use `clamp()` for fluid scaling between mobile and desktop, ratio ≥1.25 between steps.

| Token | Size (clamp min ↔ max) | Line height | Use |
|---|---|---|---|
| `text-display` | 32 ↔ 48px | 1.05 | Hero name only |
| `text-h1` | 24 ↔ 36px | 1.1 | Page title (project detail) |
| `text-h2` | 20 ↔ 30px | 1.2 | Section heading |
| `text-h3` | 18 ↔ 20px | 1.4 | Item title (project, experience) |
| `text-body` | 16px | 1.6 | Body copy |
| `text-meta` | 14px | 1.5 | Captions, date stamps, secondary metadata |

Body copy is capped at `max-w-prose` (≈65ch). Hierarchy contrast uses scale + weight (`font-semibold`/`font-bold`), not color tricks.

### Spacing & rhythm

Sections use a consistent vertical rhythm via `SectionContainer`: `pb-12 md:pb-16`. Items within a section use `mb-6 md:mb-12`. Headings use `mb-4` (subsection) or `mb-6 md:mb-8` (section).

Containers cap at `max-w-4xl` with `px-6 md:px-8`. The body itself is `md:max-w-4xl mx-auto` so the layout is centered and reading-friendly on every viewport.

### Radius

| Token | Value |
|---|---|
| `--radius` | `0.65rem` |
| `rounded-sm` | `radius - 0.15rem` |
| `rounded-md` | `radius` |
| `rounded-lg` | `radius + 0.15rem` |

Pills use `rounded-full`.

### Elevation (shadow)

Two semantic shadow tokens, both tinted toward `foreground` (so dark mode reads correctly without re-deriving):

| Token | Use |
|---|---|
| `shadow-card` | Project images, media frames |
| `shadow-elevated` | Popovers, language menu, modal-like surfaces |

No glassmorphism. No decorative glows.

### Motion

Eased out, never bounced. Curves: `ease-out-quart` (default) and `ease-out-expo` (snappier). Durations: `duration-fast` (150ms), `duration-base` (220ms), `duration-slow` (400ms).

Hover transforms are limited to `scale-110` on interactive primitives. CSS layout properties are **not** animated.

## Components

UI primitives live in `src/components/ui/`. Every primitive uses `class-variance-authority` for variants and `cn()` (clsx + tailwind-merge) from `src/lib/utils.ts` for className composition.

| Primitive | Purpose |
|---|---|
| `Button.astro` | Default text button. Variants: `default` (primary), `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `sm`, `md`, `lg`, `icon`. |
| `IconButton.astro` (+ `icon-button.styles.ts`) | Bordered icon-only trigger with hover scale. Used by the theme toggle, the mobile menu toggle, and similar surfaces. |
| `NavLink.astro` | The bordered nav-link pattern. Variants: `primary` (header desktop), `primaryLarge` (header mobile), `muted` (footer), `menuitem` (language menu items). Honors `aria-current`. |
| `Pill.astro` | Rounded chip. Variants: `social` (renders `<a>` for outbound social/CTA links) and `tag` (renders `<li>`, color via `class` prop). |
| `Badge.astro` | Status badge. Tones: `green`, `yellow`, `info`, `destructive`, `neutral`. |
| `Paragraph.astro` | Body copy. Variants: `default`, `lead` (hero intro), `meta` (captions). |
| `Breadcrumb.astro` | Detail-page breadcrumb. |
| `LanguageSelector.astro` | Accessible language menu. Trigger uses Button's outline pattern. |
| `ThemeToggle.tsx` | Preact island for the theme toggle; reuses `iconButtonVariants`. |
| `MediaFrame.astro` | Rounded image container with `aspect-video` and `shadow-card`. |
| `SectionHeading.astro` | `h1` / `h2` / `h3` with optional icon slot. Variants: `section`, `subsection`, `detail`. |
| `ListItemHeader.astro` | Responsive header for project / experience items. |
| `DetailSection.astro` | Labeled cell for project-detail grid. Wraps `SectionHeading` + content. |
| `TagList.astro` | `<ul>` wrapper for tag pill rows. |

`SectionContainer.astro` (one level above `ui/`) composes a `<section>` + `SectionHeading` + an icon slot for the home page.

## Layout shell

`Layout.astro` (homepage) and `DetailLayout.astro` (project detail) share:

- The doctype, `<head>`, font, SEO component, theme-color meta, and the inline anti-flash theme script (extracted to `src/components/ThemeScript.astro`).
- Body container `bg-background text-foreground w-full md:max-w-4xl mx-auto`.
- The skip-link, localized via `i18n.a11y.skip_to_content`.
- The footer.

`Layout.astro` additionally renders `Header` and `<ClientRouter />` for view transitions. `DetailLayout.astro` does neither — detail pages have no top nav and use a static `<main>`.

## Accessibility

- Skip link is the first focusable element on every page.
- Every interactive primitive shows `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` consistently.
- The header uses `aria-current="true"` driven by a scroll-spy, and the styling is keyed off that attribute via Tailwind `aria-current:` variants.
- The language menu implements roving focus with ↑/↓/Home/End/Escape/click-outside.
- Color contrast targets WCAG AA at minimum across both themes.

## Banned patterns

- `#000` / `#fff` literals.
- Side-stripe borders (`border-l-4 border-primary` accents). Use full borders, leading icons, or no accent.
- Gradient text (`bg-clip-text` on a gradient).
- Glassmorphism as default styling.
- Hero-metric SaaS templates ("10x faster · 50+ features · ⭐").
- Modals as a first reach. Use inline disclosure first.
- Em dashes anywhere — copy or code comments.

## Source of truth pointers

- Color & ramp tokens: `src/styles/global.css`
- `cn()` helper: `src/lib/utils.ts`
- Variant system reference: `src/components/ui/Button.astro`
- i18n keys: `src/i18n/{en,es}.json` (must stay in lockstep)
- Layout container width: `src/layouts/Layout.astro` (`md:max-w-4xl`)
