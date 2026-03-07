import { banner } from 'echo-banner';
import { defineConfig } from 'tsdown';
import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  {
    name: 'CLI',
    entry: {
      cli: './bin/index.ts',
    },
    platform: 'node',
    format: ['esm'],
    dts: false,
    minify: true,
    outExtensions() {
      return {
        js: '.js',
      };
    },
    banner: {
      js: banner({
        pkg,
        shebang: '#!/usr/bin/env node',
      }),
    },
  },
]);
