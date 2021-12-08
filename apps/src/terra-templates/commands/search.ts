import { prompt } from 'prompts';
import { getTemplateData } from '../services/getTemplateData';
import { searchTemplateData } from '../services/searchTemplateData';
import { get } from './get';

interface Option {
  text?: string;
}

export async function search({ text }: Option) {
  const data = await getTemplateData();
  const { templates } =
    typeof text === 'string' ? searchTemplateData(data, text) : data;

  if (templates.length === 0) {
    console.log(`There's no search result`);
    return;
  }

  const { value: source } = await prompt({
    type: 'select',
    name: 'value',
    message: 'Select a template',
    choices: templates.map(({ id, title, github }) => ({
      title: `[${id}] ${title}`,
      description: github,
      value: github,
    })),
  });

  if (!source) {
    return;
  }

  const { value: targetDirectory } = await prompt({
    type: 'text',
    name: 'value',
    message: `Enter your project directory. for example ( myapp or dir/myapp )`,
  });

  if (!targetDirectory) {
    return;
  }

  await get({
    source,
    targetDirectory,
  });
}
