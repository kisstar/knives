<template>
  <h-toolbar
    @add-host-group="handleAddHostGroup"
    @add-host-item="handleAddHostItem"
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
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HToolbar from '@hosts/components/HToolbar.vue';
import {
  DEFAULT_MAC_HOST_CONTENT,
  DEFAULT_MAC_SELECTED_HOSTS,
} from '@hosts/constants';

const userHosts = null;
const userSelectedHosts = null;
const hosts = ref(userHosts || DEFAULT_MAC_HOST_CONTENT);
const selectedHosts = ref(userSelectedHosts || DEFAULT_MAC_SELECTED_HOSTS);

const handleAddHostGroup = () => {
  console.log('添加分组，并存储最新的用户配置');
};

const handleAddHostItem = () => {
  console.log('添加配置项，并存储最新的用户配置');
};

const onSelect = () => {
  console.log('存储最新的用户配置', hosts.value, selectedHosts.value);
};

onMounted(() => {
  console.log('获取用户配置更新到局部变量中');
});
</script>
