import { ref } from 'vue';
import { defineStore } from 'pinia';
import { uuid } from '@shared/id';
import { store } from '@knives/bridge';
import {
  DEFAULT_MAC_HOST_CONTENT,
  DEFAULT_MAC_SELECTED_HOSTS,
  HOSTS_CONTENT_KEY,
} from '@hosts/constants';
import type { HostInfo } from '@hosts/constants';

export const useHostsStore = defineStore('hosts', () => {
  const hosts = ref(DEFAULT_MAC_HOST_CONTENT);
  const selectedHosts = ref(DEFAULT_MAC_SELECTED_HOSTS);

  store.get<HostInfo[]>(HOSTS_CONTENT_KEY).then((res) => {
    if (res) {
      hosts.value = res;
    }
  });

  const addGround = (group: Pick<HostInfo, 'host'>, active: boolean) => {
    const id = uuid();

    hosts.value.push({
      hostType: 'group',
      id,
      name: group.host,
      host: group.host,
      address: '',
      children: [],
    });

    if (active) {
      selectedHosts.value.push(id);
    }
  };
  const addHost = (
    groupId: string,
    hostInfo: Pick<HostInfo, 'host' | 'address' | 'name'>,
    active: boolean,
  ) => {
    const id = uuid();
    const group = hosts.value.find((item) => item.id === groupId);

    if (!group) {
      // error log
      return;
    }

    group.children ??= [];
    group.children.push({
      hostType: 'item',
      id,
      name: hostInfo.name,
      host: hostInfo.host,
      address: hostInfo.address,
    });

    if (active) {
      selectedHosts.value.push(id);
    }
  };

  return {
    // state
    selectedHosts,
    hosts,
    // actions
    addGround,
    addHost,
  };
});
