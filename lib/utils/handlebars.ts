import Handlebars from 'handlebars';
import { countChars } from 'js-utils-kit';
import colors from 'use-colors';

Handlebars.registerHelper('green', (t: string) => colors.green(t));
Handlebars.registerHelper('cyan', (t: string) => colors.cyan(t));
Handlebars.registerHelper('yellow', (t: string) => colors.yellow(t));
Handlebars.registerHelper('magenta', (t: string) => colors.magenta(t));
Handlebars.registerHelper('bold', (t: string) => colors.bold(t));
Handlebars.registerHelper('dim', (t: string) => colors.dim(t));

Handlebars.registerHelper('padRight', (str: string, len: number) => {
  const s = String(str);
  return s + ' '.repeat(Math.max(len - countChars(colors.strip(s)), 0));
});

/** Compiles and renders a Handlebars template with the provided data */
export function renderTemplate(template: string | Buffer, data: unknown = {}) {
  return Handlebars.compile(template, {
    noEscape: true,
  })(data);
}
