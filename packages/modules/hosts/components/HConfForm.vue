<template>
  <v-dialog :model-value="showDialog" max-width="600" persistent>
    <v-card prepend-icon="mdi-web-box" :title="title">
      <v-card-text>
        <form>
          <v-text-field
            v-if="hostType === 'item'"
            v-model="address"
            v-bind="addressAttrs"
            :label="t('address')"
            :error-messages="errors.address"
          ></v-text-field>

          <v-text-field
            v-if="hostType === 'item'"
            v-model="host"
            :error-messages="errors.host"
            v-bind="hostAttrs"
            :label="t('host')"
          ></v-text-field>

          <v-text-field
            v-model="name"
            v-bind="nameAttrs"
            :error-messages="errors.name"
            :label="t('name')"
          ></v-text-field>

          <v-checkbox
            v-model="enable"
            v-bind="enableAttrs"
            :label="t('enable')"
            :error-messages="errors.enable"
            type="checkbox"
            value="1"
          ></v-checkbox>
        </form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="submit"> {{ t('add') }} </v-btn>
        <v-btn @click="cancel"> {{ t('cancel') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { getFormFieldInfo } from '@hosts/components/form';
import type { HostType } from '@hosts/constants';

const props = defineProps<{
  hostType: HostType;
}>();
const emits = defineEmits(['add-host-item', 'add-host-group']);
const showDialog = defineModel<boolean>({ required: true });

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
const { errors, defineField, handleSubmit } = useForm(
  getFormFieldInfo(() => props.hostType),
);
const [address, addressAttrs] = defineField('address');
const [host, hostAttrs] = defineField('host');
const [name, nameAttrs] = defineField('name');
const [enable, enableAttrs] = defineField('enable');

const title = computed(() => {
  return props.hostType === 'item' ? t('add_conf_item') : t('add_conf_group');
});

const submit = handleSubmit((values) => {
  emits(props.hostType === 'item' ? 'add-host-item' : 'add-host-group', values);
});
const cancel = () => {
  showDialog.value = false;
};
</script>

<i18n lang="yaml">
en:
  add_conf_item: 'New configuration'
  add_conf_group: 'New group'
  address: 'Address'
  host: 'Hosts'
  name: 'Name'
  enable: 'Enable'
  cancel: 'Cancel'
  add: 'Add'
zhHans:
  add_conf_item: '添加配置项'
  add_conf_group: '添加分组'
  address: '地址'
  host: '主机'
  name: '名称'
  enable: '启用'
  cancel: '取消'
  add: '添加'
</i18n>
