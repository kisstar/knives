import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocaleStore, useThemeStore } from '@app/store/config/index';

export const useAppConfigStore = defineStore('appConfig', () => {
  const themeStore = useThemeStore();
  const localeStore = useLocaleStore();

  const theme = computed(() => themeStore.theme);
  const locale = computed(() => localeStore.locale);

  return {
    // getters
    theme,
    locale,
    // actions
    setTheme: themeStore.setTheme,
    setLocale: localeStore.setLocale,
  };
});
