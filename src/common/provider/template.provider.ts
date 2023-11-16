import handlebars from 'handlebars';
import { join } from 'path';
import { readFile, stat } from 'fs';
import { promisify } from 'util';
import config from '../../config/template.config';
import { get } from 'lodash';

const asyncReadFile = promisify(readFile);
const asyncStat = promisify(stat);

export type PopulatedTemplates = {
  html: string;
  text: string;
};

interface TemplateEngine {
  populate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<PopulatedTemplates>;
}

async function getTemplate(name: string) {
  async function _readFile(path, options) {
    try {
      const fileStr = await asyncStat(path);
      if (!fileStr.isFile()) throw new Error('File not found');
      return asyncReadFile(path, options);
    } catch (e) {}
  }
  const [html, text] = await Promise.all([
    _readFile(join('src/modules/email/templates', 'html', `${name}.html`), {
      encoding: 'utf-8',
    }),
    _readFile(join('src/modules/email/templates', 'txt', `${name}.txt`), {
      encoding: 'utf-8',
    }),
  ]);
  return { html, text };
}

class HandlebarsAdapter implements TemplateEngine {
  async populate(templateName: string, context: Record<string, any>) {
    const { html, text } = await getTemplate(templateName);

    const hblText = handlebars.compile(text);
    const hblHtml = handlebars.compile(html);

    return { html: hblHtml(context), text: hblText(context) };
  }
}

export class TemplateProvider {
  private engine: TemplateEngine;

  constructor({ engine }: { engine: string } = config) {
    const engines = { handlebars: HandlebarsAdapter };

    const Engine = get(engines, engine, engines.handlebars);
    this.engine = new Engine();
  }

  public populate(templateName: string, context: Record<string, any>) {
    Object.assign(context);
    return this.engine.populate(templateName, context);
  }
}
