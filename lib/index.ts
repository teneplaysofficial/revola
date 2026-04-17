import type { Config, Ctx, Plugin } from './types';

export type { Config, Ctx, Plugin };

/**
 * Revola Configuration.
 *
 * @example
 * ```ts
 * import { defineConfig } from 'revola';
 *
 * export default defineConfig({
 *   // your config here
 * });
 * ```
 */
export function defineConfig(config: Config): Config {
  return config;
}
