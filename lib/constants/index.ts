import type { PluginKeys } from '../types/plugin';

export const CORE_PLUGINS = {} as const;

export const REVOLA_ENV = [
  'REVOLA_VERSION',
  'REVOLA_NODE_VERSION',
  'REVOLA_DENO_VERSION',
  'REVOLA_DATE',
  'REVOLA_TAG',
  'REVOLA_TAG_MAJOR',
  'REVOLA_TAG_MINOR',
  'REVOLA_PREVIOUS_VERSION',
  'REVOLA_NODE_PREVIOUS_VERSION',
  'REVOLA_DENO_PREVIOUS_VERSION',
] as const;

export const PHASE_LOGS: Partial<Record<PluginKeys, string>> = {
  pre: 'Preparing environment',
  init: 'Initializing',
  validate: 'Validating configuration',
  getVersion: 'Resolving current version',
  bumpVersion: 'Calculating next version',
  setVersion: 'Applying updated version',
  generateChangelog: 'Generating changelog',
  writeChangelog: 'Writing changelog to output',
  git: 'Performing Git operations',
  publish: 'Publishing artifacts',
  post: 'Finalizing execution',
} as const;
