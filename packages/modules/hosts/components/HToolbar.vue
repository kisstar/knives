<template>
  <v-toolbar prominent>
    <v-menu open-on-hover>
      <template #activator="{ props }">
        <v-btn
          prepend-icon="mdi-plus"
          v-bind="props"
          @click="handleAddHostItem"
        >
          {{ t('add_conf_item') }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in TOOLBAR_MENU"
          :key="index"
          @click="handleItemClick(item)"
        >
          <v-list-item-title class="cursor-pointer">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type ToolbarMenuItem, TOOLBAR_MENU } from '@hosts/constants';

const emits = defineEmits(['add-host-item', 'add-host-group']);
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const handleAddHostItem = () => {
  emits('add-host-item');
};

const handleItemClick = (item: ToolbarMenuItem) => {
  switch (item.value) {
    case 'add-host-item':
      handleAddHostItem();
      break;
    case 'add-host-group':
      emits('add-host-group');
      break;
    default:
      break;
  }
};
</script>

<i18n lang="yaml">
en:
  add_conf_item: 'New configuration'
zhHans:
  add_conf_item: '添加配置项'
</i18n>
