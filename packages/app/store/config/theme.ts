import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';
import { storage } from '@knives/shared';
import { APP_THEME_KEY } from '@app/constants';

export type Theme = 'light' | 'dark';

export const allThemes: Theme[] = ['light', 'dark'];

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light');
  const vuetifyTheme = useTheme();

  function setTheme(newTheme: Theme) {
    vuetifyTheme.global.name.value = newTheme;
    document.documentElement.classList.remove(theme.value);
    document.documentElement.classList.add(newTheme);
    theme.value = newTheme;
    storage.set(APP_THEME_KEY, newTheme);
  }

  return {
    // state
    theme,
    // actions
    setTheme,
  };
});
