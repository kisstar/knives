<template>
  <div class="flex justify-between w-full h-full px-6 border-b border-c-b">
    <!-- 左侧 -->
    <div class="flex items-center">
      <a class="flex items-center" href="/">
        <img
          class="mr-3"
          width="28"
          height="28"
          src="/knives.svg"
          alt="Knives"
        />
        Knives
      </a>
    </div>
    <!-- 右侧 -->
    <div class="flex items-center ml-6 pl-6">
      <app-locale @toggle-locale="handleToggleLocale"></app-locale>
      <div class="mr-4 h-2/5 border-r border-c-b"></div>
      <!-- 主题切换 -->
      <button
        class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
        type="button"
        @click="toggleTheme"
      >
        <v-icon icon="mdi-theme-light-dark"></v-icon>
      </button>
      <!-- GitHub -->
      <a
        href="https://github.com/kisstar/knives"
        target="_blank"
        class="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
      >
        <v-icon icon="mdi-github"></v-icon>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppConfigStore, useLocaleStore } from '@app/store';
import { type LocaleType } from '@app/store';
import AppLocale from '@app/components/menu/components/AppLocale.vue';

const appConfigStore = useAppConfigStore();
const localeStore = useLocaleStore();

function toggleTheme() {
  const theme = appConfigStore.theme;

  if (theme === 'light') {
    appConfigStore.setTheme('dark');
  } else {
    appConfigStore.setTheme('light');
  }
}

function handleToggleLocale(value: LocaleType) {
  localeStore.setLocale(value);
}
</script>
