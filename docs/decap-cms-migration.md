# Plan de Migración a Decap CMS (castri.dev)

Este documento define el plan detallado para integrar Decap CMS en el portfolio (Astro v5 + Tailwind v4), manteniendo el sitio SSG en Netlify y usando Functions solo para OAuth con GitHub. No incluye blog ni testimonios. El contenido gestionado será: About, Projects y Experience (todas las entradas actuales), con resumen, detalle (Markdown) y flag de visibilidad para el overview.

## Alcance y Principios
- Mantener i18n JSON para labels/SEO/menú; el contenido largo pasa a Markdown.
- Estructura por idioma: `content/es/...` y `content/en/...`.
- Overview en Home (usa `summary` y `show_in_overview`).
- Páginas de detalle por idioma (usan `body` en Markdown).
- Hosting: Netlify; dominio producción: `castri.dev`.
- Backend CMS: GitHub + OAuth propio (sin Netlify Identity).

---

## Arquitectura Objetivo
- Astro SSG + Netlify Functions solo para `/oauth/*` (output híbrido).
- Admin CMS en `/admin` con Decap (CDN) y `public/admin/config.yml`.
- Contenido editable en Markdown más campos estructurados (frontmatter).
- Capa de lectura (`src/lib/content.ts`) con `import.meta.glob` y parser de frontmatter.

---

## Checklist por Fases

1) Preparación
- [ ] Confirmar repo GitHub del portfolio (`<owner>/<repo>`) y rama `main`.
- [ ] Confirmar dominio prod `castri.dev`.
- [ ] Verificar Astro v5 y Tailwind v4 (ya OK).

2) Adapter Netlify (sin tocar UI)
- [ ] Instalar: `npm i -D @astrojs/netlify`
- [ ] Editar `astro.config.mjs` (ver borrador más abajo):
  - `adapter: netlify()` y `output: 'hybrid'`.
  - Mantener i18n actual: `defaultLocale: 'es'` sin prefijo.

3) Endpoints OAuth (GitHub) con CSRF `state`
- [ ] Crear `src/pages/oauth/index.ts` y `src/pages/oauth/callback.ts` con `export const prerender = false;` (ver borrador).
- [ ] Añadir validación de `state` (cookie HttpOnly + SameSite=Lax; `Secure` en prod).
- [ ] Crear OAuth App en GitHub:
  - Callback: `https://castri.dev/oauth/callback` (y `http://localhost:4321/oauth/callback` en dev si aplica).
- [ ] Variables en Netlify: `OAUTH_GITHUB_CLIENT_ID` y `OAUTH_GITHUB_CLIENT_SECRET`.

4) UI del CMS
- [ ] Crear `src/pages/admin.html` que carga Decap por CDN (ver borrador).
- [ ] Crear `public/admin/config.yml` (prod) y `public/admin/config.local.yml` (dev) (ver borradores).
- [ ] Carpeta de medios: `public/uploads/`.

5) Estructura de Contenido
- [ ] Crear carpetas: `content/es/{projects,experience}/`, `content/en/{projects,experience}/`.
- [ ] Crear `content/es/about.md` y `content/en/about.md`.
- [ ] Migrar TODOS los proyectos y experiencias actuales a `.md` con frontmatter (ver modelos).

6) Loader de Contenido y Markdown
- [ ] Crear `src/lib/content.ts` (tipos, parser y funciones `getAbout`, `getProjects`, `getProject`, `getExperience`, `getExperienceItem`).
- [ ] Crear `src/lib/markdown.ts` con `renderMarkdown()` (p.ej., `marked`).

7) Integración en UI (sin romper i18n)
- [ ] About: adaptar `AboutMe.astro` para consumir `body` (HTML) desde loader.
- [ ] Projects: overview en Home usando `getProjects(locale, { onlyOverview: true })` (usa `summary`).
- [ ] Experience: overview en Home usando `getExperience(locale, { onlyOverview: true })` (usa `summary`).
- [ ] Páginas de detalle: rutas por idioma para projects y experience (ver rutas).

8) Validación Local
- [ ] `npm run astro -- check`, `npm run build`, `npm run preview`.
- [ ] CMS local: `/admin/?config=/admin/config.local.yml` → login → crear/editar → verificar commit en GitHub.
- [ ] Home muestra overview (filtrado por `show_in_overview`, ordenado por `order`).
- [ ] Páginas de detalle renderizan Markdown e imágenes.

9) Producción y Hardening
- [ ] Probar `/admin` en `castri.dev` con OAuth.
- [ ] Verificar build tras commit vía CMS.
- [ ] Revisar cookies (`Secure` en prod) y scopes del OAuth App.

10) Documentación
- [ ] Actualizar README: edición en `/admin`, estructura de contenido, campos clave y flujo OAuth.

---

## Modelos de Datos (Frontmatter)

About (por idioma):
```yaml
# content/es/about.md
---
title: "Sobre mí"
description: "Descripción SEO opcional"
image: "/uploads/about.jpg" # opcional
---

Contenido largo en Markdown…
```

Project (por idioma):
```yaml
# content/es/projects/<slug>.md
---
title: "Nombre del proyecto"
summary: "Resumen corto para el overview"
image: "/uploads/proyecto.jpg"
code_url: "https://github.com/..."
site_url: "https://..."
tags:
  - astro
  - typescript
order: 10
show_in_overview: true
published: true
---

Detalle en Markdown (para la página de detalle)…
```

Experience (por idioma):
```yaml
# content/es/experience/<slug>.md
---
company: "Empresa XYZ"
role: "Rol/Posición"
period: "2020–2023"
location: "Remoto" # opcional
logo: "/uploads/empresa.png" # opcional
tags:
  - frontend
  - react
summary: "Resumen corto para overview"
order: 20
show_in_overview: true
published: true
---

Detalle en Markdown (para la página de detalle)…
```

---

## Borrador `astro.config.mjs`

```js
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import netlify from '@astrojs/netlify/functions'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://castri.dev',
  integrations: [preact(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  output: 'hybrid',
  adapter: netlify(),
  viewTransitions: true,
})
```

---

## Borrador `/src/pages/admin.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3/dist/decap-cms.js"></script>
  </body>
  </html>
```

---

## Borradores `public/admin/config.yml` (producción) y `config.local.yml` (desarrollo)

Producción (`public/admin/config.yml`):
```yaml
backend:
  name: github
  repo: <owner>/<repo> # TODO: completar
  branch: main
  base_url: https://castri.dev
  site_domain: castri.dev
  auth_endpoint: oauth

media_folder: public/uploads
public_folder: /uploads

collections:
  - name: pages_es
    label: Páginas (ES)
    editor: { preview: false }
    files:
      - label: Sobre mí
        name: about
        file: content/es/about.md
        fields:
          - { label: Título, name: title, widget: string }
          - { label: Descripción, name: description, widget: text, required: false }
          - { label: Imagen, name: image, widget: image, required: false }
          - { label: Contenido, name: body, widget: markdown }

  - name: pages_en
    label: Pages (EN)
    editor: { preview: false }
    files:
      - label: About
        name: about
        file: content/en/about.md
        fields:
          - { label: Title, name: title, widget: string }
          - { label: Description, name: description, widget: text, required: false }
          - { label: Image, name: image, widget: image, required: false }
          - { label: Body, name: body, widget: markdown }

  - name: projects_es
    label: Proyectos (ES)
    folder: content/es/projects
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Título, name: title, widget: string }
      - { label: Resumen, name: summary, widget: text }
      - { label: Detalle, name: body, widget: markdown }
      - { label: Imagen, name: image, widget: image, required: false }
      - { label: Código URL, name: code_url, widget: string, required: false }
      - { label: Sitio URL, name: site_url, widget: string, required: false }
      - { label: Tags, name: tags, widget: list, required: false, field: { label: Tag, name: tag, widget: string } }
      - { label: Orden, name: order, widget: number, value_type: int, min: 0 }
      - { label: Mostrar en Home, name: show_in_overview, widget: boolean, default: true }
      - { label: Publicado, name: published, widget: boolean, default: true }

  - name: projects_en
    label: Projects (EN)
    folder: content/en/projects
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Summary, name: summary, widget: text }
      - { label: Detail, name: body, widget: markdown }
      - { label: Image, name: image, widget: image, required: false }
      - { label: Code URL, name: code_url, widget: string, required: false }
      - { label: Site URL, name: site_url, widget: string, required: false }
      - { label: Tags, name: tags, widget: list, required: false, field: { label: Tag, name: tag, widget: string } }
      - { label: Order, name: order, widget: number, value_type: int, min: 0 }
      - { label: Show in Home, name: show_in_overview, widget: boolean, default: true }
      - { label: Published, name: published, widget: boolean, default: true }

  - name: experience_es
    label: Experiencia (ES)
    folder: content/es/experience
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Empresa, name: company, widget: string }
      - { label: Rol, name: role, widget: string }
      - { label: Periodo, name: period, widget: string }
      - { label: Ubicación, name: location, widget: string, required: false }
      - { label: Logo, name: logo, widget: image, required: false }
      - { label: Tags, name: tags, widget: list, required: false, field: { label: Tag, name: tag, widget: string } }
      - { label: Resumen, name: summary, widget: text }
      - { label: Detalle, name: body, widget: markdown }
      - { label: Orden, name: order, widget: number, value_type: int, min: 0 }
      - { label: Mostrar en Home, name: show_in_overview, widget: boolean, default: true }
      - { label: Publicado, name: published, widget: boolean, default: true }

  - name: experience_en
    label: Experience (EN)
    folder: content/en/experience
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Company, name: company, widget: string }
      - { label: Role, name: role, widget: string }
      - { label: Period, name: period, widget: string }
      - { label: Location, name: location, widget: string, required: false }
      - { label: Logo, name: logo, widget: image, required: false }
      - { label: Tags, name: tags, widget: list, required: false, field: { label: Tag, name: tag, widget: string } }
      - { label: Summary, name: summary, widget: text }
      - { label: Detail, name: body, widget: markdown }
      - { label: Order, name: order, widget: number, value_type: int, min: 0 }
      - { label: Show in Home, name: show_in_overview, widget: boolean, default: true }
      - { label: Published, name: published, widget: boolean, default: true }
```

Desarrollo (`public/admin/config.local.yml`):
```yaml
backend:
  name: github
  repo: <owner>/<repo> # TODO: completar
  branch: main
  base_url: http://localhost:4321
  site_domain: localhost:4321
  auth_endpoint: oauth

media_folder: public/uploads
public_folder: /uploads

# Misma definición de collections que en producción
collections: [ ... ]
```

> Nota: En desarrollo, abrir `/admin/?config=/admin/config.local.yml` para forzar el archivo local.

---

## Borradores Endpoints OAuth (`/src/pages/oauth/*`)

`/src/pages/oauth/index.ts`:
```ts
export const prerender = false;
import type { APIRoute } from 'astro';

function randomState(len = 32) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function cookie(name: string, value: string, maxAge = 600, secure = true) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${maxAge}`,
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export const GET: APIRoute = ({ redirect, url }) => {
  const clientId = (import.meta as any).env?.OAUTH_GITHUB_CLIENT_ID || process.env.OAUTH_GITHUB_CLIENT_ID || '';
  const scope = (import.meta as any).env?.GITHUB_OAUTH_SCOPE || process.env.GITHUB_OAUTH_SCOPE || 'repo,user';
  const state = randomState();
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;
  const headers = new Headers();
  const isSecure = url.protocol === 'https:';
  headers.append('Set-Cookie', cookie('oauth_state', state, 600, isSecure));
  return new Response(null, { status: 302, headers: new Headers([["Location", authUrl], ["Set-Cookie", headers.get('Set-Cookie')!]]) });
};
```

`/src/pages/oauth/callback.ts`:
```ts
export const prerender = false;
import type { APIRoute } from 'astro';

const tokenUrl = 'https://github.com/login/oauth/access_token';

function getCookie(req: Request, name: string) {
  const raw = req.headers.get('cookie') || '';
  const m = raw.match(new RegExp(`${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export const GET: APIRoute = async ({ url, redirect, request }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = getCookie(request, 'oauth_state');
  if (!code || !state || !cookieState || state !== cookieState) {
    return redirect('/?error=csrf_state_mismatch');
  }

  const client_id = (import.meta as any).env?.OAUTH_GITHUB_CLIENT_ID || process.env.OAUTH_GITHUB_CLIENT_ID || '';
  const client_secret = (import.meta as any).env?.OAUTH_GITHUB_CLIENT_SECRET || process.env.OAUTH_GITHUB_CLIENT_SECRET || '';

  try {
    const res = await fetch(tokenUrl, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, client_id, client_secret }),
    });
    if (!res.ok) return redirect('/?error=token_exchange_failed');
    const body = (await res.json()) as { access_token?: string };
    const token = body.access_token || '';
    if (!token) return redirect('/?error=no_token');

    const content = { token, provider: 'github' };
    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage('authorization:github:success:${'${JSON.stringify(content)}'}', message.origin);
          window.removeEventListener('message', receiveMessage, false);
        };
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      </script>
    `;
    return new Response(script, { headers: { 'Content-Type': 'text/html' } });
  } catch (e) {
    return redirect('/?error=oauth_exception');
  }
};
```

---

## Borrador Loader de Contenido (`/src/lib/content.ts`) y Markdown (`/src/lib/markdown.ts`)

`/src/lib/content.ts` (esqueleto):
```ts
type Locale = 'es' | 'en';

type Frontmatter = Record<string, unknown>;

export interface PageContent<T extends Frontmatter = Frontmatter> {
  locale: Locale;
  path: string;
  slug?: string;
  frontmatter: T & {
    title?: string;
    description?: string;
    image?: string;
  };
  body: string;
}

const rawFiles = import.meta.glob('/content/**/*.md', { as: 'raw', eager: true }) as Record<string, string>;

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  if (!raw.startsWith('---')) return { frontmatter: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: {}, body: raw };
  const fmBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s+/, '');
  const lines = fmBlock.split(/\r?\n/);
  const fm: Frontmatter = {};
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let value: unknown = m[2]?.trim();
    if (typeof value === 'string') {
      value = value.replace(/^['"]|['"]$/g, '');
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (/^\d+$/.test(value)) value = Number(value);
    }
    fm[key] = value;
  }
  return { frontmatter: fm, body };
}

function getRaw(path: string) { return rawFiles[path]; }
function ensureLocale(locale: string): asserts locale is Locale {
  if (!['es', 'en'].includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
}

export async function getAbout<T extends Frontmatter = Frontmatter>(locale: Locale): Promise<PageContent<T>> {
  ensureLocale(locale);
  const path = `/content/${locale}/about.md`;
  const raw = getRaw(path);
  if (!raw) throw new Error(`Content not found: ${path}`);
  const { frontmatter, body } = parseFrontmatter(raw);
  return { locale, path, frontmatter: frontmatter as T, body };
}

export interface ProjectItem extends PageContent {
  slug: string;
  order?: number;
  show_in_overview?: boolean;
  published?: boolean;
}

export async function getProjects(locale: Locale, opts: { onlyOverview?: boolean } = {}): Promise<ProjectItem[]> {
  ensureLocale(locale);
  const prefix = `/content/${locale}/projects/`;
  const entries = Object.entries(rawFiles).filter(([p]) => p.startsWith(prefix) && p.endsWith('.md'));
  const items = entries.map(([path, raw]) => {
    const { frontmatter, body } = parseFrontmatter(raw);
    const slug = path.replace(prefix, '').replace(/\.md$/, '');
    const order = (frontmatter.order as number) ?? 0;
    const show = (frontmatter.show_in_overview as boolean) ?? false;
    const published = (frontmatter.published as boolean) ?? true;
    return { locale, path, slug, frontmatter, body, order, show_in_overview: show, published } as ProjectItem;
  });
  let filtered = items.filter((i) => i.published !== false);
  if (opts.onlyOverview) filtered = filtered.filter((i) => i.show_in_overview);
  filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return filtered;
}

export async function getProject(locale: Locale, slug: string): Promise<ProjectItem> {
  ensureLocale(locale);
  const path = `/content/${locale}/projects/${slug}.md`;
  const raw = getRaw(path);
  if (!raw) throw new Error(`Project not found: ${path}`);
  const { frontmatter, body } = parseFrontmatter(raw);
  return { locale, path, slug, frontmatter, body } as ProjectItem;
}

export interface ExperienceItem extends PageContent {
  slug: string;
  order?: number;
  show_in_overview?: boolean;
  published?: boolean;
}

export async function getExperience(locale: Locale, opts: { onlyOverview?: boolean } = {}): Promise<ExperienceItem[]> {
  ensureLocale(locale);
  const prefix = `/content/${locale}/experience/`;
  const entries = Object.entries(rawFiles).filter(([p]) => p.startsWith(prefix) && p.endsWith('.md'));
  const items = entries.map(([path, raw]) => {
    const { frontmatter, body } = parseFrontmatter(raw);
    const slug = path.replace(prefix, '').replace(/\.md$/, '');
    const order = (frontmatter.order as number) ?? 0;
    const show = (frontmatter.show_in_overview as boolean) ?? false;
    const published = (frontmatter.published as boolean) ?? true;
    return { locale, path, slug, frontmatter, body, order, show_in_overview: show, published } as ExperienceItem;
  });
  let filtered = items.filter((i) => i.published !== false);
  if (opts.onlyOverview) filtered = filtered.filter((i) => i.show_in_overview);
  filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return filtered;
}

export async function getExperienceItem(locale: Locale, slug: string): Promise<ExperienceItem> {
  ensureLocale(locale);
  const path = `/content/${locale}/experience/${slug}.md`;
  const raw = getRaw(path);
  if (!raw) throw new Error(`Experience not found: ${path}`);
  const { frontmatter, body } = parseFrontmatter(raw);
  return { locale, path, slug, frontmatter, body } as ExperienceItem;
}
```

`/src/lib/markdown.ts` (esqueleto):
```ts
import { marked } from 'marked';
export function renderMarkdown(md: string): string {
  return marked.parse(md ?? '');
}
```

---

## Rutas de Detalle (a crear)

- Español (sin prefijo):
  - `src/pages/proyectos/[slug].astro`
  - `src/pages/experiencia/[slug].astro`
- Inglés:
  - `src/pages/en/projects/[slug].astro`
  - `src/pages/en/experience/[slug].astro`

Notas de implementación:
- `getStaticPaths`: generar desde `getProjects`/`getExperience` (solo publicados).
- En el `Page` cargar `getProject`/`getExperienceItem` y renderizar `renderMarkdown(body)`.
- Mantener labels desde i18n y usar frontmatter para title/description/imágenes.

---

## Validación y DoD

Validación Local:
- `npm run astro -- check`, `npm run build`, `npm run preview` sin errores.
- `/admin/?config=/admin/config.local.yml` → login OAuth → crear/editar → commit visible.
- Home muestra overview (filtrado por `show_in_overview`, ordenado por `order`).
- Páginas de detalle renderizan Markdown y medios.

Producción:
- `/admin` operativo en `castri.dev`, flujo OAuth correcto.
- Commits del CMS disparan build y despliegue visible.

Definición de Hecho:
- CMS operativo (About/Projects/Experience, ambos idiomas).
- Overview y detalle funcionando con flags y orden.
- Seguridad OAuth: `state` validado; cookies `SameSite=Lax` (+ `Secure` en prod).

---

## Riesgos y Mitigaciones
- OAuth/Functions: bajo uso; coste práctico ≈ 0 (free tier). Añadir validación `state` para CSRF.
- Migración contenido: hacer por fases; mantener i18n JSON para labels por si se requiere fallback.
- Media paths: usar `public/uploads` y referenciar con rutas absolutas (`/uploads/...`).

---

## Siguientes Pasos
- Aprobación de este plan.
- Completar `<owner>/<repo>` en config.
- Ejecutar Fase 2 → 3 → 4… siguiendo el checklist.

