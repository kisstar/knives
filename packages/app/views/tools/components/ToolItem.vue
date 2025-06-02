<template>
  <div
    class="w-60 h-24 border-x border-y rounded-lg cursor-pointer"
    @click="handleToolClick"
  >
    {{ info.name }}
  </div>
</template>

<script setup lang="ts">
import type { ToolInfo } from '@app/config';

interface ToolItemProps {
  info: ToolInfo;
}

const props = defineProps<ToolItemProps>();
const emit = defineEmits<(evt: 'tool-click', value: ToolInfo) => void>();

const handleToolClick = () => {
  emit('tool-click', props.info);
};
</script>
