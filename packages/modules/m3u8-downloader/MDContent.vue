<template>
  <div class="px-4 pt-4">
    <div class="flex justify-between items-center">
      <div class="w-8/12">
        <v-text-field
          v-model="videoURL"
          :placeholder="t('download_placeholder')"
          :messages="message"
        ></v-text-field>
      </div>
      <v-btn-group variant="outlined" divided>
        <v-btn @click="transcode">{{ t('download') }}</v-btn>
      </v-btn-group>
    </div>
    <video v-if="video" class="pt-2" :src="video" controls></video>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { downloadBlob } from '@knives/shared';
import {
  ffmpeg,
  loadFFmpegPromise,
  downloadM3u8,
} from '@m3u8-downloader/utils';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const message = ref('');
const video = ref('');
const videoURL = ref('');

async function transcode() {
  message.value = 'Loading ffmpeg-core.js';
  ffmpeg.on('log', ({ message: msg }) => {
    message.value = msg;
  });
  await loadFFmpegPromise;

  message.value = 'Start transcoding';
  const data = await downloadM3u8(videoURL.value, 'output.mp4', {
    useConcat: true,
  });

  message.value = 'Complete transcoding';
  const blob = new Blob([(data as Uint8Array).buffer], { type: 'video/mp4' });
  video.value = URL.createObjectURL(blob);

  message.value = 'Downloading';
  downloadBlob(blob, { filename: 'output.mp4' });
  message.value = 'Download complete';
}

onUnmounted(() => {
  window.URL.revokeObjectURL(video.value);
});
</script>

<i18n lang="yaml">
en:
  download: 'Download'
  download_placeholder: 'Please enter the playback address'
zhHans:
  download: '下载'
  download_placeholder: '请输入播放地址'
</i18n>
