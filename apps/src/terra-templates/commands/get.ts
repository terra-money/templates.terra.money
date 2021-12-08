import { copyGithubDirectory } from 'copy-github-directory';
import { getTemplateData } from '../services/getTemplateData';

interface Option {
  source: string;
  targetDirectory: string;
}

export async function get({ source, targetDirectory }: Option) {
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
      targetDirectory,
    });

    console.log(`🎉 "${targetDirectory}" is created!`);
  } catch (error) {
    console.error(error);
  }
}
