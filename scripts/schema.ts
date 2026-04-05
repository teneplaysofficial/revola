import { writeFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import z from 'zod';
import { ConfigSchema } from '../lib/schemas/config';

writeFile(
  'schema.json',
  `${JSON.stringify(
    z.toJSONSchema(ConfigSchema, {
      target: 'draft-7',
    }),
    null,
    2,
  )}${EOL}`,
);

writeFile(
  'website/public/default.config.json',
  `${JSON.stringify(ConfigSchema.parse({}), null, 2)}${EOL}`,
);
