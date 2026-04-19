import type { ArgsArray, KnownCommand } from '../types';
import { args } from '../utils/cli';

export async function runCommand(
  cmd: KnownCommand,
  handler: (cmdArgs: ArgsArray) => unknown | Promise<unknown>,
  {
    exit = true,
    index = 0,
  }: {
    exit?: boolean;
    index?: number;
  } = {},
) {
  const cmdIndex = index ? (args[index] === cmd ? index : -1) : args.indexOf(cmd);
  if (cmdIndex === -1) return false;

  const cmdArgs = args.slice(cmdIndex + 1) as ArgsArray;

  await handler(cmdArgs);

  if (exit) process.exit(0);

  return true;
}
