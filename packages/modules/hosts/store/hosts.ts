import { computed, ref } from 'vue';
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
  const selectedHostsMap = computed(() => {
    return new Map(selectedHosts.value.map((id) => [id, true]));
  });

  store.get<HostInfo[]>(HOSTS_CONTENT_KEY).then((res) => {
    if (res) {
      hosts.value = res;
    }
  });

  const addGroup = (group: Pick<HostInfo, 'name'>, active: boolean) => {
    const id = uuid();

    hosts.value.push({
      hostType: 'group',
      id,
      name: group.name,
      host: group.name,
      address: '',
      children: [],
    });

    if (active) {
      selectedHosts.value.push(id);
    }
  };
  const addHostItem = (
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
      groupId,
      name: hostInfo.name,
      host: hostInfo.host,
      address: hostInfo.address,
    });

    if (active) {
      selectedHosts.value.push(id);
    }
  };
  const removeHost = (item: HostInfo) => {
    if (item.hostType === 'group') {
      let ids = item.children?.map((child) => child.id);

      ids ??= [];
      ids.push(item.id);
      hosts.value = hosts.value.filter((host) => host.id !== item.id);
      selectedHosts.value = selectedHosts.value.filter(
        (id) => !ids.includes(id),
      );
    } else {
      const group = hosts.value.find((host) => host.id === item.groupId);

      if (group) {
        group.children ??= [];
        group.children = group.children.filter((child) => child.id !== item.id);
      }

      selectedHosts.value = selectedHosts.value.filter((id) => id !== item.id);
    }
  };
  const updateHost = (
    target: HostInfo,
    hostInfo: Partial<Pick<HostInfo, 'host' | 'address' | 'name'>>,
    active: boolean,
  ) => {
    const isSelected = selectedHostsMap.value.get(target.id);

    Object.assign(target, hostInfo);

    if (active) {
      if (!isSelected) {
        selectedHosts.value.push(target.id);
      }
    } else {
      if (isSelected) {
        selectedHosts.value = selectedHosts.value.filter(
          (id) => id !== target.id,
        );
      }
    }
  };

  return {
    // state
    selectedHosts,
    hosts,
    // actions
    addGroup,
    addHostItem,
    removeHost,
    updateHost,
  };
});
