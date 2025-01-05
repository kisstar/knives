<template>
  <div class="flex flex-col">
    <div class="pt-1 pb-4">{{ info.name }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ToolGroup } from '@app/config';

interface ToolGroupProps {
  info: ToolGroup;
}

defineProps<ToolGroupProps>();
</script>
