<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { storage } from '@knives/shared';
import { APP_THEME_KEY, APP_LOCALE_KEY } from '@app/constants';
import {
  allThemes,
  useAppConfigStore,
  type Theme,
  allLocales,
  useLocaleStore,
  type LocaleType,
} from '@app/store';

const appConfigStore = useAppConfigStore();
const localeStore = useLocaleStore();

const localTheme = localStorage.getItem(APP_THEME_KEY);
const defaultTheme = allThemes.includes(localTheme as Theme)
  ? (localTheme as Theme)
  : 'light';
const localLocale = storage.get(APP_LOCALE_KEY);
const defaultLocale = allLocales.includes(localLocale as LocaleType)
  ? (localLocale as LocaleType)
  : 'zhHans';

appConfigStore.setTheme(defaultTheme);
localeStore.setLocale(defaultLocale);
</script>
