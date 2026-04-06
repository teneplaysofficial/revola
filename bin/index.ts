import { readFile } from 'node:fs/promises';
import { print } from 'echo-banner';
import { detectPM, resolveModuleRelative } from 'js-utils-kit';
import updateNotifier from 'update-notifier';
import colors from 'use-colors';
import zylog from 'zylog';
import config, { setConfig } from '../lib/config';
import { EXAMPLES, KNOWN_COMMANDS, KNOWN_FLAGS } from '../lib/constants/cli';
import { pkg } from '../lib/constants/paths';
import { ctx } from '../lib/ctx';
import { hasFlag } from '../lib/utils/cli';
import { renderTemplate } from '../lib/utils/handlebars';

const { displayName, name, version } = pkg;

if (hasFlag(['--version', '-v'])) {
  console.log(version);
  process.exit(0);
}

await print({
  pkg: {
    name,
    displayName,
    version,
  },
});

if (hasFlag('--no-color')) zylog.enableColors(0);

if (hasFlag(['--help', '-h'])) {
  console.log(
    renderTemplate(
      await readFile(resolveModuleRelative('../templates/help.hbs', import.meta.url), 'utf-8'),
      {
        name,
        KNOWN_COMMANDS,
        KNOWN_FLAGS,
        EXAMPLES,
      },
    ),
  );
  process.exit(0);
}

if (!ctx.isCI) {
  const notifier = updateNotifier({
    pkg,
  });

  const pm = await detectPM({
    lockfile: false,
    packageJson: false,
  });

  notifier.notify({
    boxenOptions: {
      title: displayName,
      borderColor: 'yellowBright',
      padding: 1,
      borderStyle: 'round',
    },
    message: `Update available ${colors.dim(notifier.update?.current)} → ${colors.blue(notifier.update?.latest)}

Run ${colors.magenta`${pm.name ?? 'npm'} i${pm.name == null ? ' -g ' : ' '}${notifier.update?.name}`} to update.

${colors.dim('More info: ')} ${colors.cyan.underline(pkg.homepage)}`,
  });
}

await setConfig();

zylog.level = config.logLevel ?? 'info';

if (ctx.isCI) zylog.info('Running in CI environment');
if (ctx.dryRun) zylog.warn('Dry run mode enabled no changes will be applied');
