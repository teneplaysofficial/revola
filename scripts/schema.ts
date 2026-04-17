import { mkdir, writeFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { join, resolve } from 'node:path';
import { stringifyJson } from 'js-utils-kit';
import semver from 'semver';
import z from 'zod';
import { pkg } from '../lib/constants/paths';
import { ConfigSchema } from '../lib/schemas/config';

const SCHEMA_FILE = 'schema.json';
const baseDir = resolve('website/public/schemas');
const parsed = semver.parse(pkg.version);
const schema = z.toJSONSchema(ConfigSchema, { target: 'draft-7' });

if (!parsed) process.exit(1);

async function writeSchema(dir: string) {
  const fullPath = join(baseDir, dir);
  await mkdir(fullPath, { recursive: true });
  return writeFile(
    join(fullPath, SCHEMA_FILE),
    stringifyJson(schema, {
      space: 0,
    }),
  );
}

const majorVer = `${parsed.major}`;
const minorVer = `${parsed.major}.${parsed.minor}`;
const isPrerelease = parsed.prerelease.length > 0;
const preTag = isPrerelease ? String(parsed.prerelease[0]) : null;

await Promise.all([
  writeFile(SCHEMA_FILE, stringifyJson(schema)),
  writeFile(
    'website/public/default.config.json',
    `${JSON.stringify(ConfigSchema.parse({}), null, 2)}${EOL}`,
  ),
  writeSchema(parsed.version),
  ...(!isPrerelease ? [writeSchema(majorVer), writeSchema(minorVer), writeSchema('latest')] : []),
  ...(isPrerelease && typeof preTag === 'string' ? [writeSchema(preTag)] : []),
]);
