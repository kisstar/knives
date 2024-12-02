<template>
  <div class="flex justify-between items-center px-4 pt-4">
    <div class="w-6/12">
      <v-file-input
        accept=".cube"
        label="Select a CUBE file"
        prepend-icon="mdi-file"
        @change="handleChange"
      >
      </v-file-input>
    </div>
    <v-btn :disabled="!cubeInfo" @click="handleExport"> 导出 LUT </v-btn>
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
import { downloadBlob } from '@knives/shared';

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

async function handleChange(e: InputEvent) {
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
}

function handleExport() {
  if (!canvasRef.value) throw new Error('Canvas element not found');

  canvasRef.value.toBlob(function (blob) {
    if (!blob) return;

    downloadBlob(blob, { filename: 'cube.png' });
  });
}
</script>
