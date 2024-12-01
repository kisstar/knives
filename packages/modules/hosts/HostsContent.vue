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
    @update:selected="onSelect"
  >
    <template #append="{ item }">
      <v-icon
        v-if="item.hostType === 'group'"
        :title="t('add_conf_item')"
        @click.stop="handleClickAddHostItem(item)"
      >
        mdi-plus
      </v-icon>
      <v-icon
        v-if="!isSystemHostGroup(item.id)"
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
    :host-type="addType"
    @add-host-group="handleAddHostGroup"
    @add-host-item="handleAddHostItem"
  ></h-conf-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHostsStore } from '@hosts/store';
import { GenericObject } from 'vee-validate';
import HToolbar from '@hosts/components/HToolbar.vue';
import HConfForm from '@hosts/components/HConfForm.vue';
import { isSystemHostGroup } from '@hosts/utils';
import type { HostType, HostInfo } from '@hosts/constants';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
const { hosts, selectedHosts, addGround, addHost } = useHostsStore();

// 添加弹窗
const showDialog = ref(false);
const addType = ref<HostType>('item');
const currentGroup = ref<HostInfo | null>(null);

function handleClickAddHostGroup() {
  addType.value = 'group';
  showDialog.value = true;
}

function handleClickAddHostItem(item: HostInfo) {
  currentGroup.value = item;
  addType.value = 'item';
  showDialog.value = true;
}

/**
 * 添加分组，并存储最新的用户配置
 */
function handleAddHostGroup(info: GenericObject) {
  addGround(
    {
      host: info.name,
    },
    info.enable,
  );
  showDialog.value = false;
}

/**
 * 添加配置，并存储最新的用户配置
 */
function handleAddHostItem(info: GenericObject) {
  addHost(
    currentGroup.value?.id || '',
    {
      name: info.name,
      host: info.name,
      address: info.address,
    },
    info.enable,
  );
  showDialog.value = false;
}

const handleDelete = (item: HostInfo) => {
  console.log('删除', item);
};

/**
 * 存储最新的用户配置
 */
const onSelect = () => {
  console.log('存储最新的用户配置');
};
</script>

<i18n lang="yaml">
en:
  delete: 'Delete'
  add_conf_item: 'New configuration'
zhHans:
  delete: '删除'
  add_conf_item: '添加配置项'
</i18n>
