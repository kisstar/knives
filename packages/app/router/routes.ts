import { AppLayout } from '@app/components/layout';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    redirect: '/tools',
    children: [],
  },
  {
    path: '/tools',
    name: 'tools',
    component: AppLayout,
  },
];
