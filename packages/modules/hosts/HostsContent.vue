<template>
  <!-- 操作栏 -->
  <h-toolbar @add-host-group="handleClickAddHostGroup"></h-toolbar>
  <!-- 配置详情 -->
  <v-treeview
    v-model:selected="selectedHosts"
    :items="hosts"
    item-title="host"
    item-value="id"
    return-object
    selectable
    select-strategy="classic"
    false-icon="mdi-bookmark-outline"
    true-icon="mdi-bookmark"
    indeterminate-icon="mdi-bookmark-minus"
  >
    <template #title="{ item }">
      <template v-if="item.hostType === 'group'">
        {{ item.name }}
      </template>
      <v-row v-else no-gutters>
        <v-col>
          {{ item.address }}
        </v-col>
        <v-col>
          {{ item.host }}
        </v-col>
        <v-col>
          {{ item.name }}
        </v-col>
      </v-row>
    </template>
    <template #append="{ item }">
      <v-icon
        v-if="item.hostType === 'group' && !isSystemHost(item)"
        :title="t('add_conf_item')"
        @click.stop="handleClickAddHostItem(item)"
      >
        mdi-plus
      </v-icon>
      <v-icon v-if="!isSystemHost(item)" @click.stop="handleEdit(item)">
        mdi-file-edit-outline
      </v-icon>
      <v-icon
        v-if="!isSystemHost(item)"
        class="ml-1"
        :title="t('delete')"
        @click.stop="handleDelete(item)"
      >
        mdi-delete-outline
      </v-icon>
    </template>
  </v-treeview>
  <!-- 添加配置弹窗 -->
  <h-conf-form
    v-model="showDialog"
    :host-type="hostType"
    :form-type="formType"
    :host-info="currentHost && formType === 'modify' ? currentHost : undefined"
    @add-host-group="handleAddHostGroup"
    @add-host-item="handleAddHostItem"
    @modify-host-item="handleUpdate"
    @modify-host-group="handleUpdate"
  ></h-conf-form>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useHostsStore } from '@hosts/store';
import { GenericObject } from 'vee-validate';
import HToolbar from '@hosts/components/HToolbar.vue';
import HConfForm from '@hosts/components/HConfForm.vue';
import { isSystemHost, getHostsContent } from '@hosts/utils';
import { setHostsContent } from '@hosts/invokers';
import type { HostType, HostInfo } from '@hosts/constants';
import type { FormType } from '@hosts/types';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
const hostsStore = useHostsStore();
const { addGroup, addHostItem, removeHost, updateHost } = hostsStore;
const { hosts, selectedHosts } = storeToRefs(hostsStore);

// 添加弹窗
const showDialog = ref(false);
const hostType = ref<HostType>('item');
const formType = ref<FormType>('add');
const currentHost = ref<HostInfo | null>(null);

function handleClickAddHostGroup() {
  formType.value = 'add';
  hostType.value = 'group';
  showDialog.value = true;
}

function handleClickAddHostItem(item: HostInfo) {
  currentHost.value = item;
  formType.value = 'add';
  hostType.value = 'item';
  showDialog.value = true;
}

const handleEdit = (item: HostInfo) => {
  formType.value = 'modify';
  hostType.value = item.hostType;
  currentHost.value = item;
  showDialog.value = true;
};

/**
 * 添加分组，并存储最新的用户配置
 */
function handleAddHostGroup(info: GenericObject) {
  addGroup({
    name: info.name,
  });
  showDialog.value = false;
}

/**
 * 添加配置，并存储最新的用户配置
 */
function handleAddHostItem(info: GenericObject) {
  addHostItem(
    currentHost.value?.id || '',
    {
      name: info.name,
      host: info.host,
      address: info.address,
    },
    info.enable,
  );
  showDialog.value = false;
}

const handleDelete = (item: HostInfo) => {
  removeHost(item);
};

const handleUpdate = (info: GenericObject) => {
  if (currentHost.value) {
    updateHost(
      currentHost.value,
      {
        name: info.name,
        host: info.host,
        address: info.address,
      },
      info.enable,
    );
  }
  showDialog.value = false;
};

const debouncedSetHostsContent = debounce(setHostsContent, 500);

/**
 * 存储最新的用户配置
 */
watch(
  () => hostsStore.$state.selectedHosts.length,
  () => {
    const content = getHostsContent(
      hostsStore.hosts,
      hostsStore.selectedHostsMap,
    );

    debouncedSetHostsContent(content);
  },
);
</script>

<i18n lang="yaml">
en:
  delete: 'Delete'
  add_conf_item: 'New configuration'
zhHans:
  delete: '删除'
  add_conf_item: '添加配置项'
</i18n>
