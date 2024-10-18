import { APP_NAME } from '@app/constants';
import { router } from '@app/egress';

const render = () => {
  router.addRoute('tools', {
    path: 'cube2png',
    name: 'cube2png',
    components: {
      content: () => import('@cube2png/C2PContent.vue'),
    },
    meta: {
      title: `${APP_NAME} | Cube2PNG}`,
    },
  });
};

render();
