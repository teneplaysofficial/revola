import z from 'zod';

export const ReleaseTypeEnum = z.enum(['major', 'minor', 'patch']).describe('Stable release types');

export const PreReleaseTypeEnum = z
  .enum(['premajor', 'preminor', 'prepatch'])
  .describe('Prerelease types');

export const PreReleaseTagEnum = z
  .enum([
    'alpha',
    'beta',
    'canary',
    'dev',
    'draft',
    'edge',
    'experimental',
    'insider',
    'internal',
    'next',
    'nightly',
    'pre',
    'preview',
    'prototype',
    'rc',
    'snapshot',
    'test',
    'unstable',
  ])
  .describe('Allowed prerelease identifiers.');

export const ReleasePhaseEnum = z.enum(['prerelease', 'release']).describe('Meta release types');

export const AnyReleaseTypeEnum = z
  .union([ReleaseTypeEnum, PreReleaseTypeEnum, ReleasePhaseEnum])
  .describe('Valid release types following semantic versioning conventions');
