// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://alina41946.github.io',
  base: '/chicchana-yume',

  integrations: [mdx()],
});
