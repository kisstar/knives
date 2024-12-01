import { computed } from 'vue';
import { isIP } from '@knives/shared';
import { i18n } from '@app/egress';
import type { HostType } from '@hosts/constants';

const { t } = i18n.global;

export const getFormFieldInfo = (hostTypeGetter: () => HostType) => {
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

  const formFieldInfo = {
    validationSchema: computed(() => {
      if (hostTypeGetter() === 'item') {
        return {
          ...commonFieldInfo,
          ...itemExtraFieldInfo,
        };
      }

      return commonFieldInfo;
    }),
  };

  return formFieldInfo;
};
