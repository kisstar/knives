<template>
  <div
    class="w-60 h-24 border-x border-y rounded-lg cursor-pointer"
    @click="handleToolClick"
  >
    {{ info.name }}
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { ToolInfo } from '@app/config';

interface ToolItemProps {
  info: ToolInfo;
}

const props = defineProps<ToolItemProps>();

const router = useRouter();

const handleToolClick = () => {
  if (props.info.path) {
    router.push(props.info.path);
  }
};
</script>
