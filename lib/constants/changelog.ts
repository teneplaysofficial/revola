import type { CommitType } from 'js-utils-kit';

export const DEFAULT_CHANGELOG_TYPES: CommitType[] = [
  'BREAKING CHANGE',
  'feat',
  'fix',
  'perf',
  'refactor',
  'docs',
  'deps',
  'ci',
  'chore',
] as const;
