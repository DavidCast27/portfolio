# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio (`https://castri.dev`). Astro 5 SSG with Preact islands and Tailwind v4. Bilingual (ES/EN), SEO-first, accessibility-conscious.

`AGENTS.md` is the canonical contributor guide for naming, formatting, and per-directory conventions — read it before non-trivial changes. `GEMINI.md` and `README.md` are condensed restatements; this file covers what's specific to operating in the codebase as an agent.

## Commands

- `npm run dev` — dev server at `http://localhost:4321`
- `npm run build` — runs `astro check` first, then builds to `dist/`
- `npm run astro -- check` — type/markup check only (faster than full build)
- `npm run preview` — serve the production build locally

There is **no test framework, no ESLint, and no Prettier**. `astro check` is the only automated verification; for UI-impacting changes, build and preview manually.

## Architecture

### Routing & i18n (load-bearing)

- `astro.config.mjs` sets `defaultLocale: 'es'`, `locales: ['es', 'en']`, `prefixDefaultLocale: true`, `trailingSlash: 'never'`, and redirects `/` → `/es`. Don't change these without intent — the SEO canonical/alternates and sitemap depend on the prefixed-default-locale shape.
- All real pages live under `src/pages/[lang]/`. The top-level `src/pages/404.astro` is a generic locale-picker; `src/pages/[lang]/404.astro` is the localized version. Both 404s are standalone (no `Layout`) and `noindex`.
- `src/lib/lang.ts` exports `staticPathsForLang()` and `staticPathsForSlugs()` — use them in `getStaticPaths` for any new localized route. Don't hand-roll the locale loop.
- `src/i18n/index.ts` exposes `getI18N({ currentLocale })`. Keys must exist in **both** `en.json` and `es.json` — there is no fallback; an `en.json`-only key will return `undefined` for ES.

### SEO

- All `<head>` metadata flows through `src/components/SEO.astro` (canonical, hreflang alternates including `x-default`, OG/Twitter, robots, JSON-LD).
- `Layout.astro` and `DetailLayout.astro` already inject default `Person` JSON-LD. Pages pass additional `jsonLd` to merge — project detail pages add `BreadcrumbList` + `SoftwareSourceCode`.
- The `site` field in `astro.config.mjs` drives canonical URLs and the sitemap. Keep it pointed at the production domain.

### Styling

- Tailwind v4 via `@tailwindcss/vite`. Design tokens are defined as OKLCH custom properties in `src/styles/global.css` (imported once in `Layout.astro`). Prefer extending tokens there over adding scattered global CSS.
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it whenever you conditionally compose Tailwind classes, especially in `class-variance-authority` variants under `src/components/ui/`.

### Components & islands

- Path alias: `@/*` → `src/*` (TS `baseUrl: "."`).
- Preact JSX is configured (`jsxImportSource: "preact"`). `.tsx` files are Preact, not React — `useState`/`useEffect` come from `preact/hooks`.
- Use `client:*` directives only on truly interactive islands (`ThemeToggle.tsx` is the canonical example). Static UI should stay in `.astro`.
- View Transitions (`ClientRouter`) is enabled in `Layout.astro`; DOM scripts that touch the page should listen to `astro:page-load`, not `DOMContentLoaded`, or they'll only fire on hard navigations.

### Content data

- Experiences: `src/data/experience.data.ts` (TS).
- Projects: `src/data/projects.data.astro` (Astro module so it can use `astro:assets` for images). Tag metadata: `src/constants/tags.constants.astro`. Adding a project means updating the data module and ensuring tag keys exist.

## Conventions worth knowing up front

- Booleans use `is*` / `has*`, components are PascalCase, constants files end in `.constants.*`, and the codebase prefers `type` aliases over `interface`. Full style notes in `AGENTS.md`.
- External links: always `rel="noopener noreferrer"` with `target="_blank"`.
- Don't introduce new dependencies, formatters, or test tooling without checking with the user — `AGENTS.md` calls this out explicitly.
