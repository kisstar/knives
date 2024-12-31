<template>
  <div class="flex justify-between items-center px-4 pt-4">
    <div class="w-8/12">
      <v-text-field
        :placeholder="t('download_placeholder')"
        :messages="message"
      ></v-text-field>
    </div>
    <v-btn-group variant="outlined" divided>
      <v-btn @click="transcode">{{ t('download') }}</v-btn>
    </v-btn-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { BASE_URL } from '@m3u8-downloader/constants';

const ffmpeg = new FFmpeg();

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

  await ffmpeg.load({
    coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(
      `${BASE_URL}/ffmpeg-core.wasm`,
      'application/wasm',
    ),
    workerURL: await toBlobURL(
      `${BASE_URL}/ffmpeg-core.worker.js`,
      'text/javascript',
    ),
  });

  message.value = 'Start transcoding';
  await ffmpeg.writeFile('input.m3u8', await fetchFile(videoURL.value));
  await ffmpeg.exec([
    '-protocol_whitelist',
    'file,http,https,tcp,tls,crypto',
    '-i',
    'input.m3u8',
    '-c',
    'copy',
    '-bsf:a',
    'aac_adtstoasc',
    'test.mp4',
  ]);

  message.value = 'Complete transcoding';
  const data = await ffmpeg.readFile('test.mp4');

  video.value = URL.createObjectURL(
    new Blob([(data as Uint8Array).buffer], { type: 'video/mp4' }),
  );
}
</script>

<i18n lang="yaml">
en:
  download: 'Download'
  download_placeholder: 'Please enter the playback address'
zhHans:
  download: '下载'
  download_placeholder: '请输入播放地址'
</i18n>
