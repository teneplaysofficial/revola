import zylog from 'zylog';
import type { Config } from '../types';
import { resolveLogLevel } from '../utils';
import { loadConfig } from './loadConfig';

const config: Config = {};

export async function setConfig() {
  zylog.level = resolveLogLevel() ?? 'info';

  Object.assign(config, await loadConfig());
}

export default config;
