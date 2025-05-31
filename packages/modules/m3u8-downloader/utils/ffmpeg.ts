import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { BASE_URL } from '@m3u8-downloader/constants';

const ffmpeg = new FFmpeg();
const loadFFmpegPromise = loadFFmpeg();

async function loadFFmpeg() {
  return ffmpeg.load({
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
}

export { ffmpeg, loadFFmpegPromise };
