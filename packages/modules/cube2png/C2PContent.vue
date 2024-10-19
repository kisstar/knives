<template>
  <div class="pl-4 pt-4 w-6/12">
    <v-file-input
      accept=".cube"
      label="Select a CUBE file"
      prepend-icon="mdi-file"
      @change="handleChange"
    >
    </v-file-input>
  </div>

  <div class="flex px-14">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
    <v-card v-if="cubeInfo" class="ml-4" :title="cubeInfo.title || 'Cube File'">
      <v-list :items="items"></v-list>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue';
import CubeParser, { type CubeInfo } from '@knives/cube-parser';
import { readFileAsText, getImageData } from '@cube2png/utils';

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');
const cubeInfo = ref<CubeInfo | null>(null);
const items = computed<Record<string, string>[]>(() => {
  if (!cubeInfo.value) return [];

  const includeKeys = ['type', 'size'];

  return Object.keys(cubeInfo.value)
    .filter((key) => includeKeys.includes(key))
    .map((key) => {
      return {
        title: `${key}: ${cubeInfo.value?.[key as keyof CubeInfo] as string} `,
      };
    });
});

const handleChange = async (e: InputEvent) => {
  if (!e.target) return;

  const files = (e.target as HTMLInputElement).files;

  if (!files) return;

  const file = files[0];
  const content = await readFileAsText(file);
  const cubeParser = new CubeParser({ content });

  cubeInfo.value = cubeParser.parse();

  const imageData = getImageData({
    findColor: cubeParser.lookupLinear.bind(cubeParser),
  });

  if (!canvasRef.value) throw new Error('Canvas element not found');

  const ctx = canvasRef.value.getContext('2d');

  if (!ctx) throw new Error('Canvas context not found');

  ctx.putImageData(imageData, 0, 0);
};
</script>
