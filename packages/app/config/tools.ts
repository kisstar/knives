export interface ToolInfo {
  id: string;
  type: 'tool';
  name: string;
  description: string;
  path?: string; // 路由地址
}

export interface ToolGroup {
  type: 'group';
  id: string;
  name: string;
  description: string;
  children?: ToolInfo[];
}

export const TOOL_LIST: ToolGroup[] = [
  {
    type: 'group',
    id: '24006fdc-89b0-4066-8027-adacc31e416a',
    name: '基础工具',
    description: '一些日常使用的基础工具。',
    children: [
      {
        type: 'tool',
        id: '2a19aff5-1a5f-4acc-95e7-184763733644',
        name: 'cube2png',
        description: '可以读取本地的 cube 文件，并将其转换为 png 图片。',
        path: '/tools/cube2png',
      },
    ],
  },
];
