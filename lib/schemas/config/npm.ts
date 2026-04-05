import z from 'zod';

export const NpmSchema = z
  .object({
    publish: z.boolean().default(true).describe('Whether to publish to npm.'),

    registry: z
      .url()
      .default('https://registry.npmjs.org/')
      .describe('The npm registry URL to publish to.'),

    tokenRef: z
      .string()
      .default('NPM_TOKEN')
      .describe('Environment variable name that holds the registry auth token.'),

    packageManager: z
      .enum(['npm', 'pnpm', 'yarn', 'bun'])
      .default('npm')
      .describe('The package manager used to invoke the npm publish command.'),

    tag: z
      .string()
      .default('latest')
      .describe('The dist-tag to publish under (e.g. latest, next, beta).'),

    access: z
      .enum(['public', 'restricted'])
      .default('public')
      .describe('Package access level on npm.'),

    provenance: z
      .boolean()
      .default(false)
      .describe('Whether to publish with npm provenance (requires CI environment).'),
  })
  .partial()
  .describe('npm publish configuration');
