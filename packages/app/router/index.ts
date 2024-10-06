import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@app/router/routes';

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
