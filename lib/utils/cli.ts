import type { KnownCommand, KnownFlag } from '../types';

export const args = process.argv.slice(2);

/** Checks if a specific command exists in the CLI arguments */
export function hasCommand(cmd: KnownCommand, index: number = 0) {
  return index ? args[index] === cmd : args.includes(cmd);
}

/** Checks if one or more flags are present in the CLI arguments */
export function hasFlag(flag: KnownFlag | KnownFlag[]) {
  const Flags = Array.isArray(flag) ? flag : [flag];
  return Flags.some((f) => args.includes(f));
}
