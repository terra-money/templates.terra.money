import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  //resolve: {
  //  alias: {
  //    'styled-components':
  //      'styled-components/dist/styled-components.browser.esm.js',
  //  },
  //},
  //server: {
  //  https: {
  //    cert: process.env.LOCALHOST_HTTPS_CERT,
  //    key: process.env.LOCALHOST_HTTPS_KEY,
  //    //@ts-ignore https://github.com/vitejs/vite/pull/3895
  //    maxSessionMemory: 100,
  //  },
  //},
  plugins: [reactRefresh(), tsconfigPaths(), svgr()],
  //build: {
  //  rollupOptions: {
  //    input: {
  //      main: path.resolve(__dirname, 'index.html'),
  //      subpage: path.resolve(__dirname, 'subpage.html'),
  //    },
  //  },
  //},
});
