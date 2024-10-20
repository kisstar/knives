<template>
  <div class="flex flex-col justify-between h-full py-5">
    <!-- top nav -->
    <div class="flex flex-col justify-center items-center">
      <div
        v-for="item in topNav"
        :key="item.key"
        class="flex flex-col justify-center items-center mb-0.5 w-14 h-14 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
      >
        <img width="24" height="24" :src="item.img" :alt="item.text" />
        <p class="text-xs pt-1">{{ item.text }}</p>
      </div>
    </div>
    <!-- bottom nav -->
    <div class="flex justify-center"></div>
  </div>
</template>

<script lang="ts" setup>
import homeIcon from '@app/assets/images/icons/home.svg';
import toolIcon from '@app/assets/images/icons/tool.svg';

const topNav = [
  {
    text: '首页',
    img: homeIcon,
    activeImg: homeIcon,
    key: 'home',
    to: 'home',
    subConf: {
      top: [],
      bottom: [],
    },
  },
  {
    text: '工具',
    img: toolIcon,
    activeImg: toolIcon,
    key: 'tools',
    to: 'tools',
    subConf: {
      top: [],
      bottom: [],
    },
  },
];
</script>
