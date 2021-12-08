import { getGithubRawUrl } from '../useReadMe';

describe('replaceReadMeUrl()', () => {
  test('should replace to raw url', () => {
    expect(
      getGithubRawUrl(
        'https://github.com/terra-money/wallet-provider/blob/main/templates/create-react-app',
      ),
    ).toBe(
      'https://raw.githubusercontent.com/terra-money/wallet-provider/main/templates/create-react-app',
    );

    expect(
      getGithubRawUrl('https://github.com/iamssen/terra-smart-contract-basic'),
    ).toBe(
      'https://raw.githubusercontent.com/iamssen/terra-smart-contract-basic/main',
    );
  });
});
