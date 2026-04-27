# PRODUCT

Personal portfolio at `https://castri.dev`. The design **is** the product.

## Register

`brand`

## Users

The primary audience is **hiring managers, tech leads, and senior engineers** evaluating candidates for senior individual-contributor roles at fintech and scaled product teams. They land here from LinkedIn, a CV link, or a recruiter forwarding the URL. They give the page roughly 30 seconds to decide whether to keep reading.

Secondary audience is **peers and the open-source community** who arrive from a shared project link or a search and want to see how the work is built.

Both audiences read in either Spanish (default) or English. Both are technical. Neither is impressed by buzzwords.

## Product purpose

Convince a senior hiring conversation in 30 seconds that David Castrillón is a credible senior frontend-focused fullstack engineer worth interviewing — and supply the receipts (projects, experience, code links) for the deeper read that follows.

It is **not** a creative agency site, **not** a UI/UX designer's portfolio, **not** a freelance services storefront, and **not** a personal blog.

## Brand

David Castrillón Gonzales — frontend-focused fullstack engineer, 8+ years across fintech and e-commerce. Currently at Yuno. Open-source contributor.

The brand stands for **craft**: fast, accessible, maintainable interfaces, end-to-end ownership, transparent practices (including how AI is used in the work). Quietly confident, technically specific, evidence over claims.

## Voice

- **Professional, technical, calm.** No exclamation marks, no emoji, no marketing superlatives ("amazing", "world-class", "passionate about excellence").
- **Specific over vague.** Names exact frameworks (React, TypeScript, Go, Selenium) instead of "modern stack". Names roles, scope, and outcomes instead of "passionate developer".
- **Bilingual parity.** Spanish and English copy must carry the same tone and density. Spanish is the default; English is not a translation afterthought.
- **First person, restrained.** "I build…", not "We craft solutions…". Avoid "delivering value" / "transformative" / "synergies".
- **Em dashes are forbidden.** Use commas, colons, semicolons, or parentheses.

## Anti-references

The portfolio must not look or read like:

- A SaaS marketing landing — no hero-metric grids, no "trusted by" logos, no "Get started" gradient CTAs.
- A creative-agency reel — no oversized typography stunts, no full-bleed video backgrounds, no manifesto-style copy.
- A bootcamp-graduate template — no "Hi, I'm David, a passionate developer 👋", no "skills" bar charts, no rainbow tag salad.
- A dark-mode-by-reflex dev portfolio — dark mode is *the default* here for a specific reason (technical readers, low-light evening browsing), not category mimicry. Light mode must be equally polished.
- A design-portfolio Behance clone — this is an engineering portfolio. Visual taste is in the *restraint*, not the spectacle.

## Strategic principles

1. **Evidence over claims.** Show the project, the stack, the role, the link to code. Don't say "I'm great at X"; show X.
2. **Calm and confident.** Restrained color, generous rhythm, careful typography. The portfolio looks like a senior engineer reads it back to themselves and isn't embarrassed.
3. **Accessibility is brand.** Skip links, keyboard navigation, `aria-current`, focus rings, color contrast. These are not concessions; they are part of the craft the portfolio is selling.
4. **Bilingual is brand.** ES/EN parity is a daily reminder that the engineer ships for real audiences in two languages, not a feature toggle.
5. **No drift.** When something new is added, it consumes existing primitives and tokens. Visual consistency is a proxy for engineering discipline; inconsistency is the loudest negative signal.

## Color strategy

**Restrained.** Tinted neutrals (chroma 0.005–0.05 toward the primary hue 285–290°) with a single warm accent (orange, ~oklch(0.65 0.22 41)) used at ≤10% of any surface. The accent marks the protagonist of a screen — name, primary action, current nav item, item titles — and nothing else.

This is a deliberate choice, not the default. It signals: "the work is the protagonist, not the decoration." Future redesigns may push to Committed; this iteration explicitly does not.

## Theme

Dark by default. Reasoning: the typical reader is a senior engineer reading on a 27" monitor late in the workday, often after a long screen-time stretch; dark surfaces with tinted neutrals reduce strain in that scene. Light mode is treated as a first-class equal — neither is a fallback.

The user's choice persists in `localStorage` and is applied before paint via an inline script to prevent flashes.
