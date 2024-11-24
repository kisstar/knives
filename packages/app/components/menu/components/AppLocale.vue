<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in LOCALE_LIST"
        :key="index"
        @click="handleItemClick(item)"
      >
        <v-list-item-title class="cursor-pointer">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { type LocaleType } from '@app/store';

interface LocaleListItem {
  title: string;
  value: LocaleType;
}

const emits = defineEmits<(evt: 'toggle-locale', value: LocaleType) => void>();

const LOCALE_LIST: LocaleListItem[] = [
  { title: '简体中文 ', value: 'zhHans' },
  { title: 'English ', value: 'en' },
];

const handleItemClick = (item: LocaleListItem) => {
  emits('toggle-locale', item.value);
};
</script>
