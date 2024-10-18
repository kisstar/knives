/**
 * 将文件以文本形式读取并返回其内容。
 *
 * @param file 要读取的文件对象
 * @returns 一个 Promise，该 Promise 解析为文件内容的字符串表示形式，如果读取失败，则拒绝为错误消息
 */
export function readFileAsText(file: File) {
  const reader = new FileReader();
  const p = new Promise<string>((resolve, reject) => {
    reader.addEventListener('load', () => {
      const content = reader.result;

      if (typeof content !== 'string') {
        reject('Fail to read file.');
      } else {
        resolve(content);
      }
    });
  });

  reader.readAsText(file);

  return p;
}

/**
 * 根据提供的 findColor 函数生成一个 512x512 的 LUT 图。
 *
 * @param options 一个包含 findColor 函数的对象
 * @param options.findColor 一个函数，接受三个介于 0 到 1 之间的浮点数（分别代表 R, G, B 的归一化值），
 * 返回一个新的 R, G, B 值的数组。这些值也将被归一化到 0 到 1 之间。
 * @returns 一个 ImageData 对象，包含生成的 LUT 图。
 */
export function getImageData(options: {
  findColor: (r: number, g: number, b: number) => number[];
}) {
  const { findColor } = options;
  // 输出 512*512 标准大小的 LUT 图
  const imageData = new ImageData(512, 512);
  const data = imageData.data;
  const channel_count = 4;

  // 图片总共占据了 64 个格子（B 通道的值）
  for (let b = 0; b < 64; b++) {
    // 每个格子的横轴包含 64 种 R 通道的值
    for (let r = 0; r < 64; r++) {
      // 每个格子的纵轴包含 64 种 G 通道的值
      for (let g = 0; g < 64; g++) {
        // 除以 63 是为了将值进行归一化处理
        const [newR, newG, newB] = findColor(r / 63, g / 63, b / 63);
        // b % 8 表示在第几列格子内，每个格子内包含 64 个像素点
        // r 表示在格子内的第几列，求的的 x 则表示当前像素点的横坐标
        const x = r + (b % 8) * 64;
        // Math.floor(b / 8) 表示在第几行格子内，，每个格子内包含 64 个像素点
        // g 表示在格子内的第几行，求的的 y 则表示当前像素点的纵坐标
        const y = g + Math.floor(b / 8) * 64;
        // 图片每行有 512 个像素点，一共 y 行，再加上 x 也是当前像素点的索引
        // 而在图片数据中每个像素点有 4 个通道，所以需要乘上 4
        const i = channel_count * (x + 512 * y); // 计算当前像素点在图片数据中的索引

        data[i + 0] = Math.round(newR * 255);
        data[i + 1] = Math.round(newG * 255);
        data[i + 2] = Math.round(newB * 255);
        data[i + 3] = 255; // A 通道的值固定为 255
      }
    }
  }

  return imageData;
}
