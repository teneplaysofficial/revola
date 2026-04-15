import z from 'zod';

export const HooksSchema = z
  .record(
    z.string().regex(/^(before|after):(init|version|git|publish|changelog)$/, {
      error: 'Hook key must match pattern',
    }),
    z.union([
      z.string().min(1, 'Command cannot be empty'),
      z.array(z.string().min(1, 'Command cannot be empty')).min(1, 'Command cannot be empty'),
    ]),
  )
  .describe(
    'Shell commands to run at various lifecycle stages. Each key is a lifecycle hook name and the value is the command(s) to run.',
  );
