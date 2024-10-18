import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';

export function registerNavigationGuards(router: Router): void {
  router.beforeEach((to) => {
    const { title: newTitle } = to.meta;
    const title = useTitle();

    if (newTitle) {
      title.value = newTitle;
    }
  });
}
