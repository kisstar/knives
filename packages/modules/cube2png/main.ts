import { APP_NAME, AppMenu, router } from '@app/egress';

const register = () => {
  router.addRoute('tools', {
    path: 'cube2png',
    name: 'cube2png',
    components: {
      headerBar: () => AppMenu,
      content: () => import('@cube2png/C2PContent.vue'),
    },
    meta: {
      title: `${APP_NAME} | Cube2PNG`,
    },
  });
};

register();
