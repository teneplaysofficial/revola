import { isCI } from 'js-utils-kit';
import { args, hasFlag } from './utils/cli';

export const ctx = {
  /**  Current working directory where the CLI is executed */
  cwd: process.cwd(),
  /** Indicates if running in a CI environment */
  isCI,
  /** CLI arguments */
  args,
  /** Indicates whether execution should be simulated without side effects */
  dryRun: hasFlag(['--dry-run', '-d']),
};
