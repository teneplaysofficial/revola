import { print } from 'echo-banner';
import { displayName, name, version } from '../package.json';

await print({
  pkg: {
    name,
    displayName,
    version,
  },
});
