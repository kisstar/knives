import { parse } from '@cubeParser/parse';

interface CubeInfo {
  title: string;
  type: string;
  size: number;
  domain: number[][];
  data: number[][];
}

export default class CubeParser {
  private cube: null | CubeInfo = null;
  private content = '';

  constructor({ content }: { content: string }) {
    this.content = content;
  }

  parse() {
    this.cube = parse(this.content);
  }

  /**
   * 使用线性插值法查找颜色值
   *
   * @param r 红色分量值
   * @param g 绿色分量值
   * @param b 蓝色分量值
   * @returns 包含颜色值（RGB）的数组
   * @throws 如果 CUBE 未解析，则抛出错误
   */
  lookupLinear(r: number, g: number, b: number) {
    if (!this.cube) {
      throw new Error('Cube not parsed');
    }

    const { size } = this.cube;
    const or = r * (size - 1);
    const og = g * (size - 1);
    const ob = b * (size - 1);
    // 整数部分
    const ir = Math.trunc(or);
    const ig = Math.trunc(og);
    const ib = Math.trunc(ob);
    // 小数部分
    const fr = or % 1.0;
    const fg = og % 1.0;
    const fb = ob % 1.0;
    // 下层的点位
    const next_x = Math.min(ir + 1, size - 1);
    const next_y = Math.min(ig + 1, size - 1);
    const next_z = Math.min(ib + 1, size - 1);
    // 上层的四个像素值
    const p000 = this.lookup(ir, ig, ib);
    const p100 = this.lookup(next_x, ig, ib);
    const p010 = this.lookup(ir, next_y, ib);
    const p110 = this.lookup(next_x, next_y, ib);
    // 下层的四个像素值
    const p001 = this.lookup(ir, ig, next_z);
    const p101 = this.lookup(next_x, ig, next_z);
    const p011 = this.lookup(ir, next_y, next_z);
    const p111 = this.lookup(next_x, next_y, next_z);

    return [0, 0, 0].map((_, i) =>
      this.lerp(
        this.lerp(
          this.lerp(p000[i], p100[i], fr),
          this.lerp(p010[i], p110[i], fr),
          fg,
        ),
        this.lerp(
          this.lerp(p001[i], p101[i], fr),
          this.lerp(p011[i], p111[i], fr),
          fg,
        ),
        fb,
      ),
    );
  }

  /**
   * 根据给定的 RGB 值查找并返回对应的颜色数据。
   *
   * @param r 红色值
   * @param g 绿色值
   * @param b 蓝色值
   * @returns 返回对应的颜色数据。
   * @throws 如果颜色立方体未解析，则抛出错误。
   */
  private lookup(r: number, g: number, b: number) {
    if (!this.cube) {
      throw new Error('Cube not parsed');
    }

    const { size, data } = this.cube;
    // 计算索引：size * size * b + size * g + r;
    const index = r + size * (g + size * b);

    return data[index];
  }

  /**
   * 线性插值函数
   *
   * @param a 起始值
   * @param b 结束值
   * @param t 插值比例，范围在 0 到 1 之间
   * @returns 返回插值结果
   */
  private lerp(a: number, b: number, t: number) {
    return b * t + a * (1 - t);
  }
}
