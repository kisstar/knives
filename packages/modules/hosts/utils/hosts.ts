import {
  DEFAULT_MAC_HOST_CONTENT_ID,
  DEFAULT_WIN_HOST_CONTENT_ID,
} from '@hosts/constants';

export function isSystemHostGroup(groupId: string): boolean {
  return [DEFAULT_MAC_HOST_CONTENT_ID, DEFAULT_WIN_HOST_CONTENT_ID].includes(
    groupId,
  );
}
