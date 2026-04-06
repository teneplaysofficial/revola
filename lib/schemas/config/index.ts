import z from 'zod';
import { pkg } from '../../constants/paths';
import { ChangelogSchema } from './changelog';
import { LogLevelEnum, PresetEnum } from './enums';
import { GitSchema } from './git';
import { HooksSchema } from './hooks';
import { JsrSchema } from './jsr';
import { NpmSchema } from './npm';
import { PluginsSchema } from './plugins';
import { VersionSchema } from './version';

export const ConfigSchema = z
  .object({
    $schema: z
      .url()
      .default(`https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/schema.json`)
      .describe('Path to the JSON schema for IDE autocompletion.'),

    logLevel: LogLevelEnum.default('info').describe(
      'Controls the verbosity of Revola logging output.',
    ),

    preset: z
      .union([
        PresetEnum,
        z
          .array(PresetEnum.exclude(['git']))
          .meta({
            uniqueItems: true,
          })
          .refine((arr) => new Set(arr).size === arr.length, {
            message: 'Preset array must contain unique values.',
          }),
      ])
      .default('node')
      .describe('Preset configuration allowing a single value or a unique array values.'),

    version: VersionSchema.default(VersionSchema.parse({})),

    git: GitSchema.default(GitSchema.parse({})),

    npm: NpmSchema.default(NpmSchema.parse({})),

    jsr: JsrSchema.default(JsrSchema.parse({})),

    changelog: ChangelogSchema.default(ChangelogSchema.parse({})),

    hooks: HooksSchema,

    plugins: PluginsSchema,
  })
  .describe('Revola Configuration')
  .partial()
  .strict();
