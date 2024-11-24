import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const dirMap = {
  '@app': './packages/app',
  '@cube2png': './packages/modules/cube2png',
  '@hosts': './packages/modules/hosts',
  '@cubeParser': './packages/lib/cube-parser',
  '@shared': './packages/shared',
  '@browser': './packages/browser',
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
      VueI18nPlugin({
        include: [
          fileURLToPath(
            new URL('./packages/app/locales/lang/**', import.meta.url),
          ),
        ],
      }),
    ],
    build: {
      outDir: '../../dist',
    },
  };
});
