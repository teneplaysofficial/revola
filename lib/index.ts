import { init } from './commands/init';
import type { Config, Ctx, Plugin, UserConfig } from './types';

export type { Config, Ctx, Plugin, UserConfig };
export { init };

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
export function defineConfig(config: UserConfig): UserConfig {
  return config;
}
