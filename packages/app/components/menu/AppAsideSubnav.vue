<template>
  <div class="flex flex-col justify-between h-full py-5">
    <!-- top nav -->
    <div class="flex flex-col justify-center items-center mx-3">
      <div
        v-for="item in topNav"
        :key="item.key"
        class="flex flex-col justify-center items-center px-4 w-full h-10 rounded cursor-pointer duration-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <p class="text-sm">{{ item.text }}</p>
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
    icon: '',
    key: 'home',
    to: 'home',
    subConf: {
      top: [],
      bottom: [],
    },
  },
  {
    text: '工具',
    icon: '',
    key: 'tools',
    to: 'tools',
    subConf: {
      top: [],
      bottom: [],
    },
  },
];
</script>
