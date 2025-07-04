import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const dirMap = {
  '@app': './packages/app',
  '@cube2png': './packages/modules/cube2png',
  '@hosts': './packages/modules/hosts',
  '@m3u8-downloader': './packages/modules/m3u8-downloader',
  '@cubeParser': './packages/lib/cube-parser',
  '@shared': './packages/shared',
  '@browser': './packages/browser',
  '@bridge': './packages/bridge',
};
const dirAlias = Object.keys(dirMap).reduce((acc, key) => {
  acc[key] = fileURLToPath(new URL(`${dirMap[key]}`, import.meta.url));
  return acc;
}, {});

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    root: dirAlias['@app'],
    base: isDev ? '/knives' : '/',
    resolve: {
      alias: dirAlias,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use '@app/styles/mixin/bem/bem-mixin.scss' as *;
            @use '@app/styles/mixin/rem.scss' as *;
            @use '@app/styles/mixin/utils.scss' as *;`,
        },
      },
    },
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },
    // prevent vite from obscuring rust errors
    clearScreen: false,
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      // Tauri expects a fixed port, fail if that port is not available
      strictPort: true,
      // if the host Tauri is expecting is set, use it
      host: false,
      port: 5173,
    },
    // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
    envPrefix: ['VITE_', 'TAURI_ENV_*'],
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
          fileURLToPath(
            new URL('./packages/modules/*/lang/**', import.meta.url),
          ),
        ],
      }),
    ],
    build: {
      // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      target:
        process.env.TAURI_ENV_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_ENV_DEBUG,
      outDir: '../../dist',
    },
  };
});
