import type { PackageJson } from 'js-utils-kit';
import type z from 'zod';
import type { KNOWN_COMMANDS, KNOWN_FLAGS } from '../constants/cli';
import type { ConfigSchema } from '../schemas/config';

export type KnownCommand = (typeof KNOWN_COMMANDS)[number]['command'];

type Flags = (typeof KNOWN_FLAGS)[number];

export type KnownFlag = Flags['flag'] | Extract<Flags, { shortFlag: string }>['shortFlag'];

export type Json = Pick<PackageJson, 'version' | 'private'> & {
  revola: Config;
};

export type Config = z.infer<typeof ConfigSchema>;
