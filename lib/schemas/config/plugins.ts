import z from 'zod';

export const PluginsSchema = z
  .record(z.string().min(1, 'Plugin name cannot be empty'), z.object().loose())
  .describe(
    'Defines plugins where each key is a plugin name and the value is its configuration object.',
  );
