# Plan de mejoras del portfolio

Este documento recoge el plan priorizado de mejoras, el estado de cada bloque y los criterios de aceptación. Sirve como guía para continuar el trabajo sin perder contexto.

## Prioridades

- P0 — SEO/A11y y rendimiento rápido
  - Enlaces externos seguros (`rel="noopener noreferrer"`); `download` solo en CV.
  - Metas por idioma para `og:url` y `twitter:url`; `viewport` con `initial-scale=1`.
  - Imágenes con `loading="lazy"`, `decoding="async"` y dimensiones donde aplique.
  - Menú accesible: `aria-expanded`, cierre con Escape, evitar bloqueo de scroll accidental, semántica con `<ul><li>`, resaltar link activo con `aria-current`.

- P1 — Contenido, i18n y SEO estructural
  - Correcciones lingüísticas en `es/en` (tildes, typos, nombres propios). “Webside”→“Website”, “Porfolio”→“Portfolio”, etc.
  - `alt` e imagen/OG por locale cuando aplique.
  - `link rel="canonical"` y `hreflang` para `es`/`en`.
  - `@astrojs/sitemap` y `public/robots.txt`.

- P2 — DX y refactors
  - ESLint + Prettier y scripts `lint`, `format`, `typecheck`.
  - Alias `@/` en `tsconfig` para imports.
  - Renombrados coherentes: `experiencies`→`experiences`, `Lenguage`→`Language`, `NETLYFY`→`NETLIFY`, `UniteStates`→`UnitedStates`.
  - Mover `src/data/projects.data.astro` a `.ts` y mejorar tipos (por ej. `Icon` como componente, no `JSX.Element`).

## Estado actual

- P0 completado
  - [x] Enlaces externos seguros y `download` solo en CV.
    - `src/components/ui/SocialPill.astro`
    - `src/components/home/Home.astro`
  - [x] SEO por idioma (mínimo viable): `og:url` y `twitter:url` dinámicos; `viewport` con `initial-scale=1`.
    - `src/layouts/Layout.astro`
  - [x] Imágenes optimizadas: `loading`/`decoding` y dimensiones en avatar; `loading`/`decoding` en proyectos.
    - `src/components/home/Home.astro`
    - `src/components/projects/ProjectItem.astro`
  - [x] Header accesible y semántico: `aria-expanded`, cierre con Escape, control de clases (`translate-y-0`/`-translate-y-full`) y `overflow-hidden`, navegación con `<ul><li>`, scroll spy para `aria-current`.
    - `src/components/Header.astro`

## Pendiente (siguiente lote)

- P1 Contenido/i18n
  - [ ] Revisar y corregir `src/i18n/es.json`, `src/i18n/en.json` (tildes, typos, consistencia: “González”, “Website”, etc.).
  - [ ] Corregir textos en `src/data/experience.data.ts` y `src/data/projects.data.astro` (ortografía y estilo).
  - [ ] Localizar `alt` de imágenes y strings visibles.

- P1 SEO estructural
  - [x] Añadir `canonical` + `hreflang` en `Layout.astro` según locale.
  - [x] Agregar `public/sitemap.xml` y `public/robots.txt`.
  - [ ] (Opcional) Integrar `@astrojs/sitemap` si se prefiere sitemap generado.

## Criterios de aceptación

- Enlaces: todos los `target="_blank"` usan `rel="noopener noreferrer"`; `download` solo para el CV.
- Menú: `aria-expanded` correcto; cierra con Escape y al pulsar un item; no bloquea scroll salvo cuando está abierto.
- Imágenes: `loading`, `decoding` y dimensiones cuando aplique; `alt` localizado.
- SEO: `og:url`/`twitter:url` correctos por locale; `canonical`/`hreflang` añadidos; sitemap y robots presentes.
- Contenido: textos en `es/en` sin errores ni inconsistencias.
- DX/Refactors: lint/format funcionales; alias `@/` operativos; tipos mejorados sin `as` innecesarios.

## Comandos útiles

- `npm run dev` — servidor de desarrollo (`http://localhost:4321`).
- `npm run build` — `astro check` + build de producción.
- `npm run preview` — previsualizar `dist/`.

## Notas y decisiones

- i18n: mantener claves en `src/i18n/*.json`; evitar HTML salvo casos controlados; documentar si se integrará CMS.
- OG Image: preferible servir desde `public/` en lugar de CDN externo temporal.
- Mantener routing i18n (`es` por defecto sin prefijo) alineado al `astro.config.mjs`.
