<template>
  <v-file-input label="Select CUBE file" @change="handleChange"></v-file-input>
  <canvas ref="canvasRef" width="512" height="512"></canvas>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CubeParser from '@knives/cube-parser';
import { readFileAsText, getImageData } from '@cube2png/utils';

const canvasRef = ref<HTMLCanvasElement>();

const handleChange = async (e: InputEvent) => {
  if (!e.target) return;

  const files = (e.target as HTMLInputElement).files;

  if (!files) return;

  const file = files[0];
  const content = await readFileAsText(file);
  const cubeParser = new CubeParser({ content });

  cubeParser.parse();

  const imageData = getImageData({
    findColor: cubeParser.lookupLinear.bind(cubeParser),
  });

  if (!canvasRef.value) throw new Error('Canvas element not found');

  const ctx = canvasRef.value.getContext('2d');

  if (!ctx) throw new Error('Canvas context not found');

  ctx.putImageData(imageData, 0, 0);
};
</script>
