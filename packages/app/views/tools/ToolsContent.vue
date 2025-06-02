<template>
  <div class="p-4">
    <tool-group v-for="group in TOOL_LIST" :key="group.id" :info="group">
      <tool-item
        v-for="tool in group.children"
        :key="tool.id"
        :info="tool"
        @tool-click="handleToolItemClick"
      ></tool-item>
    </tool-group>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { TOOL_LIST, type ToolInfo } from '@app/config';
import ToolGroup from '@app/views/tools/components/ToolGroup.vue';
import ToolItem from '@app/views/tools/components/ToolItem.vue';

const router = useRouter();

const handleToolItemClick = (tool: ToolInfo) => {
  if (tool.path) {
    router.push(tool.path);
  }
};
</script>
