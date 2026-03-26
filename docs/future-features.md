# Futuras mejoras

Este documento recoge ideas y próximos pasos para evolucionar el portfolio. Sirve como backlog de alto nivel; cada tema puede desglosarse en issues/tareas.

## 1) Datos: experiencias y proyectos
- Objetivo: actualizar contenido y definir una fuente de datos más escalable (evitar hardcodear en archivos .ts/.astro cuando crezca).
- Opciones de fuente:
  - Markdown/MDX (content collections de Astro): fácil de versionar, buen SEO, pre-render estático, tipado con `zod`.
  - CMS Git-based (Decap CMS): edición vía UI, guarda Markdown en el repo (ver docs/decap-cms-migration.md).
  - BD externa (SQLite/Planetscale/Firestore): útil si el contenido cambia muy seguido o requiere edición colaborativa; añadir caché/ISR.
- Recomendación inicial: content collections (MD/MDX) + Decap CMS (opcional). Mantiene SSG, tipado y edición sencilla.
- Esquema propuesto (Astro content collections):
  - `src/content/projects/*.md` con frontmatter: `title`, `slug`, `summary`, `description`, `stack[]`, `features[]`, `tags[]`, `codeURL`, `webSiteURL`, `image`, `aiUsage`, `role`, `lang`.
  - `src/content/experiences/*.md` con: `title`, `date`, `description`, `actual`, `lang`.
  - Validación con `zod`; índices por idioma; `getCollection()` en páginas.
- i18n:
  - Un archivo por idioma (por slug) o frontmatter `lang` + filtrado; mantener slugs sincronizados entre idiomas.
- Migración (borrador):
  - Crear `src/content/config.ts` + colecciones `projects` y `experiences`.
  - Pasar entradas actuales desde `src/data/*.ts|astro` a Markdown con el mismo contenido.
  - Reemplazar `PROJECTS/EXPERIENCES` por `getCollection()` en componentes/páginas.
- SEO/Imágenes:
  - Mantener `astro:assets` para imágenes; en frontmatter usar import relativo o `image: ./file.webp`.
  - Ajustar OG por proyecto desde frontmatter cuando exista.
- Edición/flujo:
  - Sin CMS: PRs con cambios en `.md`.
  - Con Decap: configurar `config.yml` para colecciones y login (GitHub/Netlify), respetando i18n.

## 2) UI/Design System (DS)
- Objetivo: componentes escalables y consistentes (tokens, accesibilidad y variantes), mantener Tailwind v4.
- Tokens/temas:
  - Consolidar tokens en `global.css` (OKLCH). Documentar `--color-*` y `--radius-*`.
  - Revisar contraste y estados (hover/focus/disabled) en dark/light.
- Primitivas (ui/):
  - Button, Badge, TagPill, SocialPill, Paragraph, Breadcrumb, ThemeToggle.
  - Unificar variantes con `class-variance-authority` (CVA) + `cn`.
  - Props consistentes: `variant`, `size`, `as`, `icon`, `aria-*`.
- Accesibilidad:
  - Navegación por teclado, roles ARIA, foco visible. Evitar `hover` exclusivo.
  - Auditar `LanguageSelector` y patrones similares (menu/dialog/tooltip) si se agregan.
- Patrones:
  - Layouts y SectionContainer (spacing, tipografía, grid responsive) como base.
  - Cards/listas para proyectos/experiencias con slots para iconos/acciones.
- Iconos:
  - Centralizar catálogo; preferir `.astro` o `?raw` según uso; establecer tamaño por defecto y prop `class`.
- Movimiento:
  - Animaciones sutiles y consistentes (duración/curvas); respetar `prefers-reduced-motion`.
- Documentación interna:
  - “Story” mínima por componente en MD (props, variantes y ejemplos) dentro de `docs/`.
- Adopción incremental:
  - Migrar componentes existentes a CVA cuando se toquen; no reescribir todo de golpe.

## 3) Tareas próximas sugeridas
- Migrar datos a content collections (sin CMS) para proyectos/experiencias.
- Agregar `docs/ui-principles.md` con criterios de accesibilidad y variantes.
- Añadir JSON‑LD específico a más páginas si aplica (ej. `About`/`Person`).
- Workflow CI básico (GitHub Actions): `npm ci`, `npm run astro -- check`, `npm run build`.
- README: guía “Cómo agregar proyecto/experiencia” cuando se active content collections.

## 4) Abiertos / decisiones pendientes
- ¿`x-default` en EN o ES? (hoy EN para alinear con la landing; se puede revertir).
- ¿Decap CMS u otro flujo (PRs) para edición? ¿Requiere auth?
- ¿Nivel de granularidad en el DS (hasta inputs/forms/modals) o sólo primitivas básicas?

