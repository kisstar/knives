import { shallowReactive, type App } from 'vue';

// 需要指导前一个消息的信息（如底部距离顶部的距离），所以需要使用列表
export const instances = shallowReactive<App[]>([]);

const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance._props?.id === id);
  const current = instances[idx];
  let prev: App | undefined;

  if (idx > 0) {
    prev = instances[idx - 1];
  }

  return { current, prev };
};

export const getLastInstanceOffset = (id: string): number => {
  const { prev } = getInstance(id);

  if (!prev) return 0;

  return prev._instance?.exposed?.bottom.value || 0;
};
