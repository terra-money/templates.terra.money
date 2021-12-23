export interface TemplatesJson {
  templates: Array<{
    id: string;
    title: string;
    symbols: string[];
    images: string[];
    github: string;
    categories: ('smart_contract' | 'web_app')[];
    tags?: string[];
    forks?: string[];
  }>;
  serise: Array<{
    id: string;
    title: string;
    templates: string[];
  }>;
}

export interface TemplateData extends TemplatesJson {}

const URL = 'https://terra-money.github.io/templates/templates.json';

export async function getTemplateData(): Promise<TemplateData> {
  return fetch(URL).then((res) => res.json());
}
