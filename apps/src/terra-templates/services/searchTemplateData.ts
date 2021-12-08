import { TemplatesJson } from './getTemplateData';

function matchText(texts: string[], keywords: string[]): boolean {
  return texts.some((text) =>
    keywords.some((keyword) => text.toLowerCase().indexOf(keyword) > -1),
  );
}

export function searchTemplateData(
  data: TemplatesJson,
  text: string,
): TemplatesJson {
  const keywords = text.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');

  const templates = data.templates.filter(
    ({ title, categories, tags = [] }) => {
      return (
        matchText([title], keywords) ||
        matchText(categories, keywords) ||
        matchText(tags, keywords)
      );
    },
  );

  const serise = data.serise.filter(({ title }) =>
    matchText([title], keywords),
  );

  return {
    templates,
    serise,
  };
}
