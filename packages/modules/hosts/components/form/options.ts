import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { isIP, isDomain } from '@knives/shared';
import { i18n } from '@app/egress';
import type { HostType } from '@hosts/constants';

const { t } = i18n.global;

export const useFormFieldInfo = (options: {
  hostType: HostType;
}): Parameters<typeof useForm>[0] => {
  const groupFiledInfo = {
    name(value?: string) {
      if (value?.length) return true;

      return t('hosts:empty_name_tip');
    },
  };

  const itemFieldInfo = {
    address(value: string) {
      const isValid = isIP(value);

      if (isValid) return true;

      return t('hosts:invalid_ip_tip');
    },
    host(value?: string) {
      if (!value?.length) {
        return t('hosts:empty_host_tip');
      }

      const isValid = isDomain(value);

      if (isValid) {
        return true;
      } else {
        return t('hosts:invalid_host_tip');
      }
    },
  };

  return {
    validationSchema: computed(() => {
      if (options.hostType === 'item') {
        return itemFieldInfo;
      }

      return groupFiledInfo;
    }),
  };
};
