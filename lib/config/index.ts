import zylog from 'zylog';
import type { Config } from '../types';
import { hasFlag } from '../utils/cli';
import { loadConfig } from './loadConfig';

const config: Config = {};

export async function setConfig() {
  if (hasFlag(['--debug', '-D'])) zylog.level = 'debug';
  if (hasFlag(['--trace', '-T'])) zylog.level = 'trace';

  Object.assign(config, await loadConfig());
}

export default config;
