import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

const dirMap = {
  '@app': './packages/app',
  '@cube2png': './packages/modules/cube2png',
  '@cubeParser': './packages/lib/cube-parser',
  '@shared': './packages/shared',
};
const dirAlias = Object.keys(dirMap).reduce((acc, key) => {
  acc[key] = fileURLToPath(new URL(`${dirMap[key]}`, import.meta.url));
  return acc;
}, {});

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(() => {
  return {
    root: dirAlias['@app'],
    base: '/knives',
    resolve: {
      alias: dirAlias,
    },
    plugins: [
      vue(),
      vuetify({
        styles: {
          configFile: 'styles/settings.scss',
        },
      }),
    ],
    build: {
      outDir: '../../dist',
    },
  };
});
