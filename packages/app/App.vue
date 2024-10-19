<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { APP_THEME_KEY } from '@app/constants';
import { allThemes, useAppConfigStore, type Theme } from '@app/store';

const appConfigStore = useAppConfigStore();

const localTheme = localStorage.getItem(APP_THEME_KEY);
const defaultTheme = allThemes.includes(localTheme as Theme)
  ? (localTheme as Theme)
  : 'light';

appConfigStore.setTheme(defaultTheme);
</script>
