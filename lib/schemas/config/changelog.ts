import { COMMIT_TYPE_VALUES } from 'js-utils-kit';
import z from 'zod';
import { DEFAULT_CHANGELOG_TYPES } from '../../constants/changelog';

export const ChangelogSchema = z
  .object({
    enabled: z.boolean().default(true).describe('Whether to generate/update the changelog.'),

    file: z.string().default('CHANGELOG.md').describe('Path to the changelog file.'),

    title: z
      .string()
      .default('{{REVOLA_VERSION}} ({{REVOLA_DATE}})')
      .describe('Template for release title.'),

    includeTypes: z
      .array(z.enum(COMMIT_TYPE_VALUES))
      .meta({
        uniqueItems: true,
      })
      .refine((arr) => new Set(arr).size === arr.length, {
        message: 'IncludeTypes array must contain unique values.',
      })
      .default(DEFAULT_CHANGELOG_TYPES)
      .describe(
        'List of commit types to include in the changelog. If empty or not provided, all commit types are included. The order matters and determines how sections are organized in the final changelog.',
      ),
  })
  .partial()
  .describe('Changelog configuration');
