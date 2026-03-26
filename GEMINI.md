## Project Overview

Personal portfolio built with [Astro 5](https://astro.build/), [Preact](https://preactjs.com/) islands and [Tailwind CSS v4](https://tailwindcss.com/). Includes i18n (ES/EN), SEO via a reusable `SEO.astro` component, and accessible UI patterns.

## Building and Running

Commands:

| Command | Description |
|---|---|
| `npm install` | Install dependencies. |
| `npm run dev` | Start dev server at `localhost:4321`. |
| `npm run astro -- check` | Run Astro type/markup checks. |
| `npm run build` | Build for production to `dist/`. |
| `npm run preview` | Preview production build locally. |

## Structure & Conventions

- Components live under `src/components` and are grouped by feature; UI primitives in `src/components/ui`.
- Layouts in `src/layouts` wrap pages; localized routes live under `src/pages/[lang]` with default locale `es` and prefixed routing.
- SEO is centralized in `src/components/SEO.astro` (canonical, alternates incl. x-default, OG/Twitter, robots, JSON‑LD). `Layout.astro` / `DetailLayout.astro` inject default `Person` JSON‑LD.
- Project detail pages add `BreadcrumbList` + `SoftwareSourceCode` JSON‑LD.
- Tailwind v4 with OKLCH tokens in `src/styles/global.css`.
- No ESLint/Prettier configured; rely on `astro check` and manual style consistency.

## Accessibility

- Skip link and `aria-current` for active nav; scroll‑spy updates current section.
- Language selector: button + popup menu with `aria-haspopup`, `aria-expanded`, Escape/click-outside to close, and keyboard navigation (↑/↓/Home/End).
- Theme toggle island persists preference and syncs `theme-color`.

## 404 Pages

- Standalone (without `Layout`), centered vertically/horizontally, marked as `noindex`, with CTA back to home (localized and generic versions).
