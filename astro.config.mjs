// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://benshoemaker.us',
  vite: {
    // @ts-ignore - Vite version mismatch between @tailwindcss/vite and astro's bundled vite
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
