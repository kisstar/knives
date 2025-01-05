<template>
  <div class="p-4">
    <tool-group v-for="group in TOOL_LIST" :key="group.id" :info="group">
      <tool-item
        v-for="tool in group.children"
        :key="tool.id"
        :info="tool"
      ></tool-item>
    </tool-group>
  </div>
</template>

<script setup lang="ts">
import ToolGroup from '@app/views/tools/components/ToolGroup.vue';
import ToolItem from '@app/views/tools/components/ToolItem.vue';
import { TOOL_LIST } from '@app/config';
</script>
