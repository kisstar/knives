<template>
  <v-toolbar prominent>
    <v-btn prepend-icon="mdi-plus" @click="handleAddHostItem">
      {{ t('add_conf_group') }}
    </v-btn>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const emits = defineEmits(['add-host-group']);
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const handleAddHostItem = () => {
  emits('add-host-group');
};
</script>

<i18n lang="yaml">
en:
  add_conf_group: 'New group'
zhHans:
  add_conf_group: '添加分组'
</i18n>
