import { ROUTER_VIEW } from '@app/constants';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: Partial<Record<ROUTER_VIEW, boolean>>;
    title?: string;
  }
}
