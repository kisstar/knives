<template>
  <div class="flex flex-col justify-between h-full py-5">
    <!-- top nav -->
    <div class="flex flex-col justify-center items-center">
      <div
        v-for="item in topNav"
        :key="item.key"
        class="flex flex-col justify-center items-center mb-0.5 w-14 h-14 rounded cursor-pointer duration-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <v-icon :icon="item.icon"></v-icon>
        <p class="text-xs pt-1">{{ item.text }}</p>
      </div>
    </div>
    <!-- bottom nav -->
    <div class="flex justify-center"></div>
  </div>
</template>

<script lang="ts" setup>
const topNav = [
  {
    text: '首页',
    icon: 'mdi-home-variant-outline',
    key: 'home',
    to: 'home',
    subConf: {
      top: [],
      bottom: [],
    },
  },
  {
    text: '工具',
    icon: 'mdi-toolbox-outline',
    key: 'tools',
    to: 'tools',
    subConf: {
      top: [],
      bottom: [],
    },
  },
];
</script>
