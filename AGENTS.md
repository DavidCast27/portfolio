# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/`:
  - `src/pages/` (routes). Example: `src/pages/index.astro`, `src/pages/en/index.astro`.
  - `src/components/` (UI and icons). Use PascalCase, e.g., `src/components/Header.astro`.
  - `src/layouts/` (shared shells), `src/constants/` (e.g., `i18n.constants.astro`).
  - `src/i18n/` (locale JSON and helpers): `en.json`, `es.json`.
- Static assets in `public/`.
- Config: `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run dev` (alias: `npm start`): Start Astro dev server (default `http://localhost:4321`).
- `npm run build`: Type-checks (`astro check`) then builds to `dist/`.
- `npm run preview`: Serve the production build locally.
- `npm run astro -- <cmd>`: Run Astro CLI, e.g., `npm run astro -- check`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; LF line endings.
- Files: Components PascalCase (`AboutMe.astro`, `ThemeToggle.tsx`); pages lowercase or `index.astro` under route dirs; constants in `*.constants.*`.
- TypeScript where applicable; prefer explicit props types.
- CSS: Tailwind utility-first; keep class lists readable and grouped by purpose.
- i18n: Add keys to both `src/i18n/en.json` and `src/i18n/es.json`; default locale is `es` (see `astro.config.mjs`).

## Testing Guidelines
- No formal test framework in repo. At minimum:
  - Run `npm run build` and `npm run preview` to verify pages render.
  - Run `npm run astro -- check` to catch type/markup issues.
  - For visual changes, attach a before/after screenshot in PR.

## Commit & Pull Request Guidelines
- Commits: Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as used in history.
- PRs must include:
  - Clear description and motivation; link issues (e.g., `Closes #123`).
  - Scope-limited changes with updated i18n entries when text changes.
  - Screenshots/GIFs for UI updates and notes on responsive behavior.
  - Checklist: `build` passes, no stray console logs, no dead code.

## Security & Configuration Tips
- Do not commit secrets. If adding integrations, use env vars and `.env.local` (gitignored).
- Keep locale routing intact; avoid breaking default `es` paths.
