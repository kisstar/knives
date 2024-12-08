import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { isIP } from '@knives/shared';
import { i18n } from '@app/egress';
import type { HConfFormProps } from '@hosts/components/HConfForm.vue';

const { t } = i18n.global;

export const getFormFieldInfo = (
  options: HConfFormProps,
): Parameters<typeof useForm>[0] => {
  const commonFieldInfo = {
    name(value?: string) {
      if (value?.length) return true;

      return t('hosts:empty_name_tip');
    },
    enable() {
      return true;
    },
  };
  const itemExtraFieldInfo = {
    address(value: string) {
      const isValid = isIP(value);

      if (isValid) return true;

      return t('hosts:invalid_ip_tip');
    },
    host(value?: string) {
      if (value?.length) return true;

      return t('hosts:empty_host_tip');
    },
  };

  return {
    validationSchema: computed(() => {
      if (options.hostType === 'item') {
        return {
          ...commonFieldInfo,
          ...itemExtraFieldInfo,
        };
      }

      return commonFieldInfo;
    }),
  };
};
