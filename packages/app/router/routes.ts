import { AppLayout } from '@app/components/layout';
import { APP_NAME } from '@app/constants';
import { AppMenu } from '@app/components/menu';
import { ToolsContent } from '@app/views/tools';
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
    redirect: '/tools/home',
    children: [
      {
        path: 'home',
        name: 'tools-home',
        components: {
          headerBar: AppMenu,
          content: ToolsContent,
        },
        meta: {
          title: `${APP_NAME} | 工具`,
        },
      },
    ],
  },
];
