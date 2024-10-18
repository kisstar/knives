/**
 * 解析输入的 .cube 格式的字符串内容，并返回解析后的对象。
 *
 * @param content 待解析的字符串内容。
 * @returns 包含解析结果的对象，包含 title、type、size、domain 和 data 属性。
 */
export function parse(content: string) {
  let title = '';
  let type = '';
  let size = 0;
  const domain = [
    [0.0, 0.0, 0.0],
    [1.0, 1.0, 1.0],
  ];
  const data = [];
  const lines = content.split('\n');

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith('#') || line === '') {
      // Skip comments and empty lines
      continue;
    }

    const parts = line.split(/\s+/);

    switch (parts[0]) {
      case 'TITLE':
        title = line.slice(7, -1);
        break;
      case 'DOMAIN_MIN':
        domain[0] = parts.slice(1).map(Number);
        break;
      case 'DOMAIN_MAX':
        domain[1] = parts.slice(1).map(Number);
        break;
      case 'LUT_1D_SIZE':
        type = '1D';
        size = Number(parts[1]);
        break;
      case 'LUT_3D_SIZE':
        type = '3D';
        size = Number(parts[1]);
        break;
      default:
        data.push(parts.map(Number));
    }
  }

  return {
    title,
    type,
    size,
    domain,
    data,
  };
}
