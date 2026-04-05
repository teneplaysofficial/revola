import z from 'zod';
import type { ZylogLevel } from 'zylog';

export const LogLevelEnum = z.enum([
  'trace',
  'debug',
  'info',
  'success',
  'warn',
  'error',
  'fatal',
  'silent',
] satisfies ZylogLevel[]);

export const VersionStrategyEnum = z.enum(['semver']);

export const PresetEnum = z.enum(['node', 'deno', 'git']);
