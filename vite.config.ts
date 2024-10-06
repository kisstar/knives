import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(() => {
  const appDir = fileURLToPath(new URL('./packages/app', import.meta.url));

  return {
    root: appDir,
    resolve: {
      alias: {
        '@app': appDir,
      },
    },
    plugins: [vue(), vuetify()],
  };
});
