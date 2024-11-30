<template>
  <h-toolbar
    @add-host-group="handleClickAddHostGroup"
    @add-host-item="handleClickAddHostItem"
  ></h-toolbar>
  <v-treeview
    v-model:selected="selectedHosts"
    :items="hosts"
    item-value="id"
    item-title="name"
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
    @add-host-group="handleAddHostGroup"
    @add-host-item="handleAddHostItem"
  ></h-conf-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHostsStore } from '@hosts/store';
import HToolbar from '@hosts/components/HToolbar.vue';
import HConfForm from '@hosts/components/HConfForm.vue';

const { hosts, selectedHosts } = useHostsStore();
// 添加弹窗
const showDialog = ref(false);
const addType = ref<'conf' | 'group'>('conf');

function handleClickAddHostGroup() {
  addType.value = 'group';
  showDialog.value = true;
}

function handleClickAddHostItem() {
  addType.value = 'conf';
  showDialog.value = true;
}

/**
 * 添加分组，并存储最新的用户配置
 */
function handleAddHostGroup() {
  console.log('添加分组，并存储最新的用户配置');
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
