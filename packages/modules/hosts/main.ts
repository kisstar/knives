import { APP_NAME, AppMenu, router } from '@app/egress';
import HostsContent from '@hosts/HostsContent.vue';

const register = () => {
  router.addRoute('tools', {
    path: 'hosts',
    name: 'hosts',
    components: {
      headerBar: AppMenu,
      content: HostsContent,
    },
    meta: {
      title: `${APP_NAME} | Hosts`,
    },
  });
};

register();
