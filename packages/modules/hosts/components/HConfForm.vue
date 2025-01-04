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
            v-if="hostType === 'item'"
            v-model="enable"
            v-bind="enableAttrs"
            :label="t('enable')"
            :error-messages="errors.enable"
            type="checkbox"
          ></v-checkbox>
        </form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="submit"> {{ t('confirm') }} </v-btn>
        <v-btn @click="cancel"> {{ t('cancel') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { useHostsStore } from '@hosts/store';
import { getFormFieldInfo } from '@hosts/components/form';
import type { HostType, HostInfo } from '@hosts/constants';

export interface HConfFormProps {
  hostType: HostType;
  formType: 'add' | 'modify';
  hostInfo?: HostInfo;
}

const props = defineProps<HConfFormProps>();
const emits = defineEmits([
  'add-host-item',
  'add-host-group',
  'modify-host-item',
  'modify-host-group',
]);
const hostsStore = useHostsStore();
const showDialog = defineModel<boolean>({ required: true });

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
const { errors, defineField, handleSubmit, resetForm, setValues } = useForm(
  getFormFieldInfo(props),
);
const [address, addressAttrs] = defineField('address');
const [host, hostAttrs] = defineField('host');
const [name, nameAttrs] = defineField('name');
const [enable, enableAttrs] = defineField('enable');

const title = computed(() => {
  if (props.formType === 'add') {
    return props.hostType === 'item' ? t('add_conf_item') : t('add_conf_group');
  }

  return props.hostType === 'item' ? t('mod_conf_item') : t('mod_conf_group');
});

const submit = handleSubmit((values) => {
  if (props.formType === 'add') {
    emits(
      props.hostType === 'item' ? 'add-host-item' : 'add-host-group',
      values,
    );
  } else {
    emits(
      props.hostType === 'item' ? 'modify-host-item' : 'modify-host-group',
      values,
    );
  }

  resetForm();
});
const cancel = () => {
  showDialog.value = false;
  resetForm();
};

watch(
  [() => props.hostInfo, () => showDialog.value],
  ([currentHost, showDialog]) => {
    // 在修改配置项时，当显示弹窗时，将当前配置项的值设置到表单中
    if (currentHost && props.formType === 'modify' && showDialog) {
      setValues({
        address: currentHost.address || '',
        enable: hostsStore.selectedHosts.includes(currentHost.id),
        host: currentHost.host || '',
        name: currentHost.name || '',
      });
    }
  },
);
</script>

<i18n lang="yaml">
en:
  add_conf_item: 'New configuration'
  add_conf_group: 'New group'
  mod_conf_item: 'Modify configuration'
  mod_conf_group: 'Modify group'
  address: 'Address'
  host: 'Hosts'
  name: 'Name'
  enable: 'Enable'
  cancel: 'Cancel'
  confirm: 'Confirm'
zhHans:
  add_conf_item: '添加配置项'
  add_conf_group: '添加分组'
  mod_conf_item: '修改配置项'
  mod_conf_group: '修改分组'
  address: '地址'
  host: '主机'
  name: '名称'
  enable: '启用'
  cancel: '取消'
  confirm: '确认'
</i18n>
