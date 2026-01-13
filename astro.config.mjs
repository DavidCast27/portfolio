import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/es"
  },
  trailingSlash: 'never',
  site: 'https://castri.dev',
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  viewTransitions: true
});
