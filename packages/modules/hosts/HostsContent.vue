<template>
  <h-toolbar @add-host-group="handleClickAddHostGroup"></h-toolbar>
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
  ></v-treeview>
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
import { useHostsStore } from '@hosts/store';
import { GenericObject } from 'vee-validate';
import HToolbar from '@hosts/components/HToolbar.vue';
import HConfForm from '@hosts/components/HConfForm.vue';
import type { HostType } from '@hosts/constants';

const { hosts, selectedHosts, addGround } = useHostsStore();

// 添加弹窗
const showDialog = ref(false);
const addType = ref<HostType>('item');

function handleClickAddHostGroup() {
  addType.value = 'group';
  showDialog.value = true;
}

// function handleClickAddHostItem() {
//   addType.value = 'conf';
//   showDialog.value = true;
// }

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
}

/**
 * 添加配置，并存储最新的用户配置
 */
function handleAddHostItem() {
  console.log('添加配置，并存储最新的用户配置');
}

/**
 * 存储最新的用户配置
 */
const onSelect = () => {
  console.log('存储最新的用户配置');
};
</script>
