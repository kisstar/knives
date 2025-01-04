import {
  DEFAULT_MAC_HOST_CONTENT_ID,
  DEFAULT_WIN_HOST_CONTENT_ID,
  type HostInfo,
} from '@hosts/constants';

export function isSystemHostGroup(groupId: string): boolean {
  return [DEFAULT_MAC_HOST_CONTENT_ID, DEFAULT_WIN_HOST_CONTENT_ID].includes(
    groupId,
  );
}

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
