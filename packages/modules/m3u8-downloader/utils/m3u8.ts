import { fetchFile } from '@ffmpeg/util';
import { ffmpeg } from '@m3u8-downloader/utils/ffmpeg';

/**
 * 下载 m3u8 文件，并将其转换为 mp4 文件
 * @param url m3u8 文件的 url
 * @param output 合并后的 mp4 文件的输出路径
 * @param options 选项
 * @param options.useConcat 是否使用 concat 合并 ts 文件
 * @returns 合并后的 mp4 文件的二进制数据
 */
async function downloadM3u8(
  url: string,
  output = 'output.mp4',
  options?: { useConcat?: boolean },
) {
  if (options?.useConcat) {
    const tsUrls = await parseM3u8(url);

    return concatDemuxer(tsUrls, output);
  }

  await ffmpeg.writeFile('input.m3u8', await fetchFile(url));
  await ffmpeg.exec([
    '-protocol_whitelist',
    'file,http,https,tcp,tls,crypto',
    '-i',
    'input.m3u8',
    '-c',
    'copy',
    '-bsf:a',
    'aac_adtstoasc',
    output,
  ]);

  const data = await ffmpeg.readFile(output);

  return data;
}

/**
 * 使用 ffmpeg 将 ts 文件合并为 mp4 文件
 * ref: https://github.com/ffmpegwasm/ffmpeg.wasm/issues/534
 * @param files ts 文件的 url 列表
 * @param output 合并后的 mp4 文件的输出路径
 * @returns 合并后的 mp4 文件的二进制数据
 */
async function concatDemuxer(files: string[], output = 'output.mp4') {
  const inputPaths = [];

  for (const [index, file] of files.entries()) {
    const name = `${index}.ts`;

    ffmpeg.writeFile(name, await fetchFile(file));
    inputPaths.push(`file ${name}`);
  }

  await ffmpeg.writeFile('concat_list.txt', inputPaths.join('\n'));
  await ffmpeg.exec([
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    'concat_list.txt',
    '-c',
    'copy',
    output,
  ]);

  const data = await ffmpeg.readFile(output);

  return data;
}

/**
 * 解析 m3u8 文件，返回 ts 文件的 url 列表
 * @param m3u8Url m3u8 文件的 url
 * @returns ts 文件的 url 列表
 */
async function parseM3u8(m3u8Url: string) {
  // 获取 m3u8 文件内容并处理路径
  const baseUrl = m3u8Url.substring(0, m3u8Url.lastIndexOf('/') + 1);
  const response = await fetch(m3u8Url);
  const m3u8Content = await response.text();

  // 处理 m3u8 文件中的相对路径
  const tsUrls = m3u8Content
    .split('\n')
    .map((line) => {
      if (line.startsWith('#')) return '';
      if (line.trim() === '') return '';
      if (line.startsWith('http')) return line;

      return baseUrl + line;
    })
    .filter(Boolean);

  return tsUrls;
}

export { downloadM3u8 };
