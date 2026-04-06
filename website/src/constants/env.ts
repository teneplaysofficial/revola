export const REVOLA_ENV = {
  REVOLA_VERSION: {
    description:
      'The primary version being released. This value is resolved based on the active preset (e.g. node, deno, or git) and acts as the main version reference across the release.',
    example: '1.2.0',
    usage: ['Changelog titles', 'Commit messages', 'Default tag generation'],
  },

  REVOLA_NODE_VERSION: {
    description:
      "The version resolved for Node.js (npm) releases. Used when the 'node' preset is enabled.",
    example: '1.2.0',
    usage: ['npm publishing', 'package.json version'],
  },

  REVOLA_DENO_VERSION: {
    description:
      "The version resolved for Deno (JSR) releases. Used when the 'deno' preset is enabled.",
    example: '1.2.0',
    usage: ['JSR publishing'],
  },

  REVOLA_DATE: {
    description: 'The release date in ISO format (YYYY-MM-DD).',
    example: '2026-04-06',
    usage: ['Changelog entries', 'Release notes'],
  },

  REVOLA_TAG: {
    description: 'The full Git tag created for the release, including any configured prefix.',
    example: 'v1.2.0',
    usage: ['Git tagging', 'CI workflows'],
  },

  REVOLA_TAG_MAJOR: {
    description: 'The major version tag (e.g. v1). Useful for maintaining rolling major tags.',
    example: 'v1',
    usage: ['Major version aliasing'],
  },

  REVOLA_TAG_MINOR: {
    description: 'The minor version tag (e.g. v1.2). Useful for maintaining rolling minor tags.',
    example: 'v1.2',
    usage: ['Minor version aliasing'],
  },

  REVOLA_PREVIOUS_VERSION: {
    description: 'The previous primary version before the current release.',
    example: '1.1.0',
    usage: ['Diff generation', 'Release comparison'],
  },

  REVOLA_NODE_PREVIOUS_VERSION: {
    description: 'The previous Node.js (npm) version before the current release.',
    example: '1.1.0',
    usage: ['npm version comparison'],
  },

  REVOLA_DENO_PREVIOUS_VERSION: {
    description: 'The previous Deno (JSR) version before the current release.',
    example: '1.1.0',
    usage: ['JSR version comparison'],
  },
} as const;
