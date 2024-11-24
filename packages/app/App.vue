<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useAppConfigStore } from '@app/store';
import { defaultTheme, defaultLocale } from '@app/constants';

const appConfigStore = useAppConfigStore();

appConfigStore.setTheme(defaultTheme);
appConfigStore.setLocale(defaultLocale);
</script>
