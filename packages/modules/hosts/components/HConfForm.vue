<template>
  <div class="text-center pa-4">
    <v-dialog :model-value="showDialog" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        title="Use Google's location service?"
      >
        <template #actions>
          <v-spacer></v-spacer>

          <v-btn @click="handleCancel"> {{ t('cancel') }} </v-btn>
          <v-btn @click="handleAdd"> {{ t('add') }} </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const emits = defineEmits(['add-host-item', 'add-host-group']);

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const showDialog = defineModel<boolean>({ required: true });

function handleAdd() {
  emits('add-host-item');
}

function handleCancel() {
  showDialog.value = false;
}
</script>

<i18n lang="yaml">
en:
  cancel: 'Cancel'
  add: 'Add'
zhHans:
  cancel: '取消'
  add: '添加'
</i18n>
