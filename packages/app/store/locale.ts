import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { APP_LOCALE_KEY } from '@app/constants';
import { storage } from '@knives/shared';

export type LocaleType = 'zhHans' | 'en';

export const allLocales: LocaleType[] = ['zhHans', 'en'];

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<LocaleType>('zhHans');
  const { locale: i18nLocale } = useI18n({ useScope: 'global' });

  function setLocale(newLang: LocaleType) {
    i18nLocale.value = newLang;
    storage.set(APP_LOCALE_KEY, newLang);
  }

  return {
    // state
    locale,
    // actions
    setLocale,
  };
});
