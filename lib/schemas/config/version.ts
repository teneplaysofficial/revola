import z from 'zod';
import { ReleaseTypeEnum } from '../release/enums';
import { VersionStrategyEnum } from './enums';

export const VersionSchema = z
  .object({
    strategy: VersionStrategyEnum.default('semver').describe(
      'Determines how the next version is calculated.',
    ),

    defaultBump: ReleaseTypeEnum.default('patch').describe(
      'The default level to bump the version when using the "semver" strategy.',
    ),
  })
  .partial()
  .describe('Configuration for versioning behavior.');
