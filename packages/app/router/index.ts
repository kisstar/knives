import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@app/router/routes';
import { registerNavigationGuards } from '@app/router/guards';

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

registerNavigationGuards(router);
