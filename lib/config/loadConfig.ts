import { join } from 'node:path';
import arglet from 'arglet';
import { isFile, isObject, readJsonFile } from 'js-utils-kit';
import colors from 'use-colors';
import z from 'zod';
import zylog from 'zylog';
import { CONFIG_FILES } from '../constants/paths';
import { ctx } from '../ctx';
import { ConfigSchema } from '../schemas/config';
import type { Config, Json } from '../types';
import { jiti } from '../utils/jiti';

export async function loadConfig() {
  let userConfig: Config = {};

  zylog.debug('Loading Revola configuration');

  for (const file of CONFIG_FILES) {
    zylog.trace(`Checking for config file: ${colors.cyan`${file}`}`);

    const filePath = join(ctx.cwd, file);

    if (!(await isFile(filePath))) {
      zylog.trace(`Config file not found: ${colors.yellow`${file}`}`);
      continue;
    }

    zylog.debug(`Config file found: ${colors.green`${file}`}`);

    if (file.endsWith('.json')) {
      try {
        userConfig = await readJsonFile(filePath);
        zylog.debug(`Config file loaded successfully: ${colors.green`${filePath}`}`);
      } catch (err) {
        zylog.error(`Failed to read config file: ${colors.red`${filePath}`}`);
        throw err;
      }
    } else {
      const mod = await jiti.import<{ default: Config }>(filePath);
      const exported = mod.default;

      if (isObject(exported)) {
        userConfig = exported;
        zylog.debug(`Config file loaded successfully: ${colors.green`${filePath}`}`);
      } else zylog.error(`Config file does not export an object: ${colors.red`${filePath}`}`);
    }

    break;
  }

  if (!Object.keys(userConfig).length) {
    zylog.debug('No config file found, trying to load config from package.json');

    const packageJsonPath = join(ctx.cwd, 'package.json');

    if (await isFile(packageJsonPath)) {
      try {
        const packageJson = await readJsonFile<Json>(packageJsonPath);

        if (isObject(packageJson.revola)) {
          userConfig = packageJson.revola;
          zylog.debug(
            `Config loaded from package.json successfully: ${colors.green`${packageJsonPath}`}`,
          );
        } else
          zylog.debug(
            `No ${colors.cyan`revola`} field found in package.json: ${colors.yellow`${packageJsonPath}`}`,
          );
      } catch (err) {
        zylog.error(`Failed to read package.json file: ${colors.red`${packageJsonPath}`}`);
        throw err;
      }
    } else zylog.debug(`package.json file not found: ${colors.yellow`${packageJsonPath}`}`);
  }

  if (!Object.keys(userConfig).length)
    zylog.debug('No configuration found, using default settings');

  zylog.debug('Applying CLI overrides');
  const mergedConfig = arglet(userConfig);
  zylog.trace(`CLI merged config:\n${JSON.stringify(mergedConfig, null, 2)}`);

  zylog.debug('Validating configuration');
  const parsed = ConfigSchema.safeParse(mergedConfig);

  if (!parsed.success) {
    zylog.error(`Invalid configuration:\n ${z.prettifyError(parsed.error)}`);
    process.exit(1);
  }

  zylog.info('Configuration validated successfully');
  zylog.trace(`Final config:\n${JSON.stringify(parsed.data, null, 2)}`);

  return parsed.data;
}
