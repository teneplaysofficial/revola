import type { KnownCommand, KnownFlag } from '../types';

export const KNOWN_COMMANDS = [
  {
    command: 'init',
    description: 'Initialize a new project in the current directory.',
  },
] as const satisfies {
  command: string;
  description: string;
}[];

export const KNOWN_FLAGS = [
  {
    flag: '--help',
    shortFlag: '-h',
    description: 'Show this help message and exit.',
  },
  {
    flag: '--version',
    shortFlag: '-v',
    description: 'Show the version number and exit.',
  },
  {
    flag: '--debug',
    shortFlag: '-D',
    description: 'Enable debug mode.',
  },
  {
    flag: '--trace',
    shortFlag: '-T',
    description: 'Enable trace mode.',
  },
  {
    flag: '--interactive',
    shortFlag: '-I',
    description: 'Enable interactive mode.',
  },
  {
    flag: '--ci',
    shortFlag: '-C',
    description: 'Enable CI mode.',
  },
  {
    flag: '--no-color',
    description: 'Disable colorized logs',
  },
  {
    flag: '--dry-run',
    shortFlag: '-d',
    description: 'Run without making any changes (simulate execution).',
  },
] as const satisfies {
  flag: `--${string}`;
  shortFlag?: `-${string}`;
  description: string;
}[];

export const EXAMPLES = [
  {
    title: '# Initialize a new project in the current directory',
    command: ['init'],
  },
  {
    title: '# Run the CLI in interactive mode (prompts enabled)',
    command: ['--interactive'],
  },
  {
    title: '# Run in CI mode (non-interactive, suitable for pipelines)',
    command: ['--ci'],
  },
  {
    title: '# Display help information and available commands',
    command: ['--help'],
  },
  {
    title: '# Display the current CLI version',
    command: ['--version'],
  },
  {
    title: '# Enable debug logging for troubleshooting',
    command: ['--debug'],
  },
  {
    title: '# Enable detailed trace logs (verbose output)',
    command: ['--trace'],
  },
] as const satisfies {
  title: `# ${string}`;
  command: (KnownCommand | KnownFlag)[];
}[];
