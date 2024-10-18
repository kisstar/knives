# Cube Parser

Cube Parser is a library used to parse LUT files in Cube format.

## Usage

```js
import CubeParser from '@knives/cube-parser';

const cubeParser = new CubeParser({
  content /* The content in the .cube file */,
});

const cubeInfo = cubeParser.parse(); // 解析出 .cube 文件中的信息
const colors = cubeParser.lookupLinear(r, g, b); // 根据指定颜色（归一化后的值）从 LUT 中查找的颜色
```
