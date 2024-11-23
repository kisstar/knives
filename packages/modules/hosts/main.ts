import { APP_NAME, AppMenu, router } from '@app/egress';

const register = () => {
  router.addRoute('tools', {
    path: 'hosts',
    name: 'hosts',
    components: {
      headerBar: () => AppMenu,
      content: () => import('@hosts/HostsContent.vue'),
    },
    meta: {
      title: `${APP_NAME} | Hosts`,
    },
  });
};

register();
