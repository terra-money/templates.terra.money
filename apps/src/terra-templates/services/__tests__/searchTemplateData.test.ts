import { TemplatesJson } from '../getTemplateData';
import { searchTemplateData } from '../searchTemplateData';
import data from './templates.json';

const templateData = data as unknown as TemplatesJson;

describe('searchTemplateData()', () => {
  test('should get search result', async () => {
    const { templates: result1 } = await searchTemplateData(
      templateData,
      'Smart',
    );

    expect(result1.map(({ id }) => id).join(',')).toBe('smart-contract:basic');

    const { templates: result2 } = await searchTemplateData(
      templateData,
      'Wallet Provider',
    );

    expect(result2.map(({ id }) => id).join(',')).toBe(
      [
        'wallet-provider:create-react-app',
        'wallet-provider:next',
        'wallet-provider:vite',
        'wallet-provider:wallet-controller',
      ].join(','),
    );
  });
});
