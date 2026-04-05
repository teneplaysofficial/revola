import z from 'zod';

export const JsrSchema = z
  .object({
    publish: z.boolean().default(false).describe('Whether to publish to JSR.'),

    publishArgs: z
      .array(z.enum(['--allow-dirty', '--allow-slow-types', '--no-provenance']))
      .meta({
        uniqueItems: true,
      })
      .refine((arr) => new Set(arr).size === arr.length, {
        error: 'publishArgs must not contain duplicate flags.',
      })
      .describe('Additional arguments to pass to the JSR publish command.'),

    tokenRef: z
      .string()
      .default('JSR_TOKEN')
      .describe('Environment variable name that holds the registry auth token (e.g. "JSR_TOKEN").'),

    packageManager: z
      .enum(['deno', 'npx'])
      .default('npx')
      .describe('The package manager used to invoke the JSR publish command.'),
  })
  .partial()
  .describe('jsr publish configuration');
