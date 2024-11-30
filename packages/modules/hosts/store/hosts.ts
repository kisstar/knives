import { ref } from 'vue';
import { defineStore } from 'pinia';
import { store } from '@knives/bridge';
import type { HostInfo } from '@hosts/constants';

import {
  DEFAULT_MAC_HOST_CONTENT,
  DEFAULT_MAC_SELECTED_HOSTS,
  HOSTS_CONTENT_KEY,
} from '@hosts/constants';

export const useHostsStore = defineStore('hosts', () => {
  const hosts = ref(DEFAULT_MAC_HOST_CONTENT);
  const selectedHosts = ref(DEFAULT_MAC_SELECTED_HOSTS);

  store.get<HostInfo[]>(HOSTS_CONTENT_KEY).then((res) => {
    if (res) {
      hosts.value = res;
    }
  });

  return {
    // state
    selectedHosts,
    hosts,
    // actions
  };
});
