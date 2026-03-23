# Repository Guidelines for Agents

## Purpose
- This repo is a personal portfolio built with Astro + Preact + Tailwind.
- Use these notes to keep structure, i18n, and styling consistent.

## Project Structure
- Source code lives under `src/`.
- Routes: `src/pages/` (localized routes live in `src/pages/[lang]/`).
- Layouts: `src/layouts/` (global shell, meta tags, scripts).
- Components: `src/components/` grouped by feature (about, experiences, projects, ui, icons).
- Constants: `src/constants/` (navigation, theme, i18n config, tag metadata).
- i18n data/helpers: `src/i18n/` (en.json, es.json, index.ts).
- Library helpers: `src/lib/` (language utilities).
- Static assets: `public/` (favicon, PDFs, OG images).
- Global styles: `src/styles/global.css` (imported in `Layout.astro`).

## Commands (from package.json)
- `npm install`: install dependencies.
- `npm run dev` or `npm start`: start Astro dev server (`http://localhost:4321`).
- `npm run build`: run `astro check` then build to `dist/`.
- `npm run preview`: serve production build locally.
- `npm run astro -- <cmd>`: run Astro CLI commands (ex: `npm run astro -- check`).

### Linting / Type Checking
- No ESLint/Stylelint configured; rely on `astro check` for type/markup checks.
- TypeScript is strict via `astro/tsconfigs/strict` (see `tsconfig.json`).
- If you add a new lint/format tool, document it here.

### Testing
- No unit/integration test framework is configured.
- There is no single-test command in the current setup.
- Use `npm run astro -- check` for schema/type checks after edits.
- For validation, build with `npm run build` and view with `npm run preview`.

## Code Style & Conventions
### Formatting
- Indentation: 2 spaces; UTF-8; LF line endings.
- Keep line lengths readable; wrap long Tailwind class lists across lines.
- Use semicolons and quotes consistent with the file you are editing.
- Avoid introducing formatters without repo consensus.

### Imports
- Prefer absolute imports via `@/` alias for `src/` when crossing directories.
- Group imports: external packages → internal aliases → relative paths.
- Keep import lists alphabetized within their group when feasible.
- Astro components can import other `.astro` files directly.
- Preact islands can import `.astro?raw` for inline SVG icons when needed.

### Naming
- Components: PascalCase filenames (ex: `Header.astro`, `ThemeToggle.tsx`).
- Pages: lowercase filenames or `index.astro` under route directories.
- Constants: `*.constants.*` for config-like exports.
- Types: use `type` aliases over `interface` unless extension is required.
- Booleans use `is*` / `has*` prefixes (ex: `isOpen`).

### Astro Components (.astro)
- Keep the frontmatter block concise: imports, props, derived values only.
- Prefer semantic HTML and ensure headings follow a logical order.
- Use `Fragment` or `set:html` for localized HTML content as needed.
- Use `client:*` directives only for interactive islands.
- Prefer `client:only` for islands that touch browser APIs early.
- Use `slot` props (ex: `slot="icon"`) for layout composition.
- Use `Astro.props`, `Astro.params`, and `Astro` globals safely; avoid mutation.
- For inline scripts, prefer `astro:page-load` events for DOM access.

### Preact / TypeScript (.tsx, .ts)
- Use explicit props types for exported components and helpers.
- Keep hooks at top-level; avoid conditional hooks.
- Browser APIs (localStorage, document) should be accessed in effects or guarded.
- Prefer small, focused components; shared UI belongs in `src/components/ui/`.
- Use `const` for variables by default; avoid one-letter names.

### Tailwind / CSS
- Tailwind utility-first styling is the default; avoid custom CSS unless needed.
- Group classes by purpose: layout → spacing → typography → color → state.
- Keep hover/focus/aria classes close to the base class they modify.
- Global styles live in `src/styles/global.css`; avoid scattering global CSS.

### Astro Configuration
- `astro.config.mjs` defines redirects, i18n, and view transitions.
- Keep `site` in sync with the production domain (used for sitemap/canonical).
- Respect `trailingSlash: "never"` when generating URLs.
- Use the existing `ClientRouter` for view transitions unless removed intentionally.

### Internationalization (i18n)
- Default locale is `es`; routing uses prefixed default locale.
- Always add/update keys in both `src/i18n/en.json` and `src/i18n/es.json`.
- Use `getI18N({ currentLocale })` to fetch translations in components.
- For localized pages, use `staticPathsForLang` from `src/lib/lang.ts`.
- Keep locale routing intact; avoid breaking `/es` default paths.

### Error Handling & Resilience
- Guard browser-only APIs to avoid SSR crashes.
- Prefer `try/catch` around localStorage or window-dependent code.
- Fail gracefully: if optional DOM nodes are missing, return early.
- Keep error handling lightweight; avoid console logs in production.

### Accessibility
- Provide `aria-label` for icon-only buttons and links.
- Preserve skip links and keyboard navigation patterns.
- Use `aria-current` for active navigation states when appropriate.
- Ensure color contrast remains legible after styling changes.

### Data & Content
- Prefer data-driven rendering (map over arrays) for navs and lists.
- Keep content strings in i18n files; avoid hardcoded text in components.
- External links should use `rel="noopener noreferrer"` with `target="_blank"`.

### SEO & Metadata
- Layout handles canonical/alternate/OG tags; extend there if needed.
- Ensure new pages set `title` and `description` via `Layout` props.
- Update `public/og.png` or SEO data only when intentional.

### File/Folder Discipline
- Place new icons under `src/components/icons/` and keep names descriptive.
- Feature components live under `src/components/<feature>/`.
- UI primitives go under `src/components/ui/`.
- Avoid introducing unrelated files at repo root.

## Cursor/Copilot Rules
- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` files are present.
- If such rules are added later, merge them into this guide.

## Security & Config
- Do not commit secrets or credentials.
- Use `.env.local` for any new secrets (gitignored).
- Avoid breaking locale redirects or canonical URLs.

## Change Hygiene
- Keep edits focused to the task; avoid refactors unless requested.
- Update i18n keys and content whenever user-facing text changes.
- Mention manual verification steps (build/preview) in PRs.
- No tests currently; call out when validation is skipped.

## Quick Reference
- Dev server: `npm run dev`
- Type check: `npm run astro -- check`
- Build: `npm run build`
- Preview: `npm run preview`
- Scripts live in `package.json`

## Notes for Agents
- Respect existing style in each file; keep changes minimal.
- Ask before adding new dependencies or tooling.
- Document any new command you introduce.
- Avoid large file rewrites unless explicitly requested.
- Keep this file updated if conventions change.
