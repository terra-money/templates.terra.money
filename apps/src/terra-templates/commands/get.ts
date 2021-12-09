import { copyGithubDirectory } from 'copy-github-directory';
import { prompt } from 'prompts';
import { getTemplateData } from '../services/getTemplateData';

interface Option {
  source: string;
  targetDirectory?: string;
}

async function getDirectory(source: string): Promise<string> {
  const { value: directory } = await prompt({
    type: 'text',
    name: 'value',
    initial: source.replace(/:/g, '-'),
    message: `Enter your project directory. for example ( myapp or dir/myapp )`,
  });

  if (!directory) {
    throw new Error(
      `Enter your project directory. for example ( myapp or dir/myapp )`,
    );
  }

  return directory;
}

export async function get({ source, targetDirectory }: Option) {
  const directory = targetDirectory ?? (await getDirectory(source));

  let url: string;

  if (/^http/.test(source)) {
    url = source;
  } else {
    const { templates } = await getTemplateData();
    const template = templates.find(({ id }) => id === source);

    if (!template) {
      throw new Error(`Can't find template "${source}"`);
    }

    url = template.github;
  }

  try {
    await copyGithubDirectory({
      url,
      targetDirectory: directory,
    });

    console.log(`🎉 "${directory}" is created!`);
  } catch (error) {
    console.error(error);
  }
}
