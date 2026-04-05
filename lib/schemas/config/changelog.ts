import z from 'zod';

export const ChangelogSchema = z
  .object({
    enabled: z.boolean().default(true).describe('Whether to generate/update the changelog.'),

    file: z.string().default('CHANGELOG.md').describe('Path to the changelog file.'),

    title: z
      .string()
      .default('{{REVOLA_VERSION}} ({{REVOLA_DATE}})')
      .describe('Template for release title.'),
  })
  .partial()
  .describe('Changelog configuration');
