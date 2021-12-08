const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // TODO remove CRA preset after the vite storybook builder is stable
    {
      name: '@storybook/preset-create-react-app',
      options: {
        scriptsPackageName: path.dirname(
          require.resolve('react-scripts/package.json'),
        ),
      },
    },
  ],
};
