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
        name: 'Cube 2 PNG',
        description: '可以读取本地的 cube 文件，并将其转换为 png 图片。',
        path: '/tools/cube2png',
      },
      {
        type: 'tool',
        id: '75575062-a24a-4b3f-9ece-892ee75963d4',
        name: 'Hosts',
        description: '支持可视化修改系统的 hosts 文件。',
        path: '/tools/hosts',
      },
      {
        type: 'tool',
        id: '2e40a7ea-73ed-40ac-9515-50b10a514569',
        name: 'M3U8 Downloader',
        description: '将指定的 M3U8 链接下载为 MP4 文件。',
        path: '/tools/m3u8/downloader',
      },
    ],
  },
];
