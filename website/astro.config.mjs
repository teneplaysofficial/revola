// @ts-check

import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import pkg from '../package.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: pkg.homepage,
  integrations: [
    starlight({
      title: pkg.displayName,
      description: pkg.description,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/teneplaysofficial/revola' },
        { icon: 'npm', label: 'NPM', href: 'https://www.npmjs.com/package/revola' },
      ],
      editLink: {
        baseUrl: 'https://github.com/teneplaysofficial/revola/edit/main/website',
      },
      lastUpdated: true,
    }),
  ],
});
