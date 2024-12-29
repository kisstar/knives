import { APP_NAME, AppMenu, router } from '@app/egress';

const register = () => {
  router.addRoute('tools', {
    path: 'm3u8-downloader',
    name: 'm3u8-downloader',
    components: {
      headerBar: () => AppMenu,
      content: () => import('@m3u8-downloader/MDContent.vue'),
    },
    meta: {
      title: `${APP_NAME} | m3u8 downloader`,
    },
  });
};

register();
