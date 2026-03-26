# Portfolio (Astro + Preact + Tailwind)

Sitio personal con i18n (ES/EN), SEO optimizado, y diseño accesible. Construido con Astro 5, Preact para islas interactivas y Tailwind v4.

## Stack
- Astro 5, Preact 10, TypeScript estricto
- Tailwind CSS v4 (tokens OKLCH en `src/styles/global.css`)
- Sitemap (`@astrojs/sitemap`), View Transitions, fuente Onest

## Scripts
- `npm install`: instalar dependencias
- `npm run dev` / `npm start`: dev server en `http://localhost:4321`
- `npm run astro -- check`: type/markup checks
- `npm run build`: `astro check` + build a `dist/`
- `npm run preview`: servir el build en local

## Estructura
```text
src/
├── assets/               # imágenes y recursos (proyectos, etc.)
├── components/
│   ├── about/            # sección Sobre mí
│   ├── experiences/      # timeline laboral
│   ├── home/             # hero/home
│   ├── projects/         # lista ítems de proyectos
│   ├── icons/            # íconos .astro
│   └── ui/               # UI atómica (Button, Badge, etc.)
├── constants/            # navegación, tema, i18n, tags
├── data/                 # datos: experiencias, proyectos
├── i18n/                 # en.json, es.json, helper getI18N
├── layouts/              # Layout.astro, DetailLayout.astro
├── lib/                  # utilidades (idiomas, utils)
├── pages/                # rutas Astro
│   ├── 404.astro         # 404 genérica (selector ES/EN)
│   └── [lang]/           # rutas localizadas (es/en)
│       ├── 404.astro     # 404 por idioma (CTA home)
│       ├── index.astro   # home
│       └── projects/[slug].astro  # detalle de proyecto
├── styles/global.css     # tokens + theme mapping
└── components/SEO.astro  # meta canonical/alternates OG/Twitter/JSON-LD
```

## i18n
- Locales: `es` (por defecto) y `en` con prefijo en ruta (`/es`, `/en`).
- Helpers: `getI18N({ currentLocale })` y `staticPathsForLang/staticPathsForSlugs` en `src/lib/lang.ts`.
- Agrega/edita textos en `src/i18n/en.json` y `src/i18n/es.json` (mantén las mismas claves).

## SEO & Metadatos
- Componente `src/components/SEO.astro`: 
  - Props: `title`, `description?`, `lang`, `canonical?`, `noindex?`, `ogImage?`, `ogType?`, `twitter?`, `alternates?`, `jsonLd?`.
  - Canonical y `hreflang` alternates; OG/Twitter; robots; inyección de JSON‑LD.
- `Layout.astro` y `DetailLayout.astro` inyectan JSON‑LD de tipo `Person` por defecto.
- Páginas de proyecto añaden `BreadcrumbList` + `SoftwareSourceCode`.

## Accesibilidad
- Skip link, navegación con `aria-current` y scroll‑spy.
- Selector de idioma accesible: botón con `aria-haspopup`, `aria-expanded`, soporte de teclado y Escape.
- Botón de tema (isla Preact) guarda preferencia y sincroniza `theme-color`.

## Datos & Contenido
- Experiencias: `src/data/experience.data.ts`.
- Proyectos: `src/data/projects.data.astro` (imágenes con `astro:assets`, tags en `src/constants/tags.constants.astro`).

## Desarrollo
1. `npm install`
2. `npm run dev` → `http://localhost:4321`
3. Cambios tipados: `npm run astro -- check`
4. Producción: `npm run build && npm run preview`

## Notas
- Tailwind v4 con tokens en OKLCH; evita CSS global salvo necesidad.
- Rutas: `trailingSlash: "never"`, `site: https://castri.dev`, redirección `/ -> /es`.
- No se incluyen tests; valida con `astro check` + build/preview.
