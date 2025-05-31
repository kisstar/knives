import {
  DEFAULT_MAC_HOST_CONTENT_ID,
  DEFAULT_WIN_HOST_CONTENT_ID,
  type HostInfo,
} from '@hosts/constants';

/**
 * 判断给定主机信息是否属于系统主机
 *
 * @param hostInfo 主机信息对象
 * @returns 如果属于系统主机则返回 true，否则返回 false
 */
export function isSystemHost(hostInfo: HostInfo): boolean {
  const systemHostGroupIds = [
    DEFAULT_MAC_HOST_CONTENT_ID,
    DEFAULT_WIN_HOST_CONTENT_ID,
  ];

  return (
    systemHostGroupIds.includes(hostInfo.id) ||
    systemHostGroupIds.includes(hostInfo.groupId || '')
  );
}

/**
 * 根据提供的 hosts 信息列表和选中的 hosts ID 集合，生成相应的 hosts 内容字符串
 *
 * @param content hosts 信息列表，包含地址和主机名等信息
 * @param selectedHostsMap 选中的 hosts ID 集合，用于筛选需要生成的 hosts 内容
 * @param resultContent 当前生成的 hosts 内容字符串，默认为空字符串
 * @returns 生成的 hosts 内容字符串
 */
export function getHostsContent(
  content: HostInfo[],
  selectedHostsMap: Map<string, boolean>,
  resultContent = '',
): string {
  if (!content.length) return resultContent;

  for (const item of content) {
    if (item.children) {
      resultContent = getHostsContent(
        item.children,
        selectedHostsMap,
        resultContent,
      );
    } else {
      if (selectedHostsMap.get(item.id)) {
        resultContent += `${item.address} ${item.host}\n`;
      }
    }
  }

  return resultContent;
}
