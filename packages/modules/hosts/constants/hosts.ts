export type HostType = 'item' | 'group';

export interface HostInfo {
  hostType: HostType;
  id: string;
  groupId?: string;
  name: string;
  host: string;
  address: string;
  children?: HostInfo[];
}

export const DEFAULT_MAC_HOST_HEADER = `
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
`;

export const DEFAULT_WIN_HOST_HEADER = `
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
# 102.54.94.97 rhino.acme.com # source server
# 38.25.63.10 x.acme.com # x client host
# localhost name resolution is handled within DNS itself.
# 127.0.0.1 localhost
# ::1 localhost
`;

export const DEFAULT_MAC_HOST_CONTENT_ID =
  '5ca2ad20-e52c-4204-ab7a-81c0c864f584';

export const DEFAULT_WIN_HOST_CONTENT_ID =
  'e90da8b7-b430-4f15-b932-0146f32690b6';

export const DEFAULT_MAC_HOST_CONTENT: HostInfo[] = [
  {
    hostType: 'group',
    id: DEFAULT_MAC_HOST_CONTENT_ID,
    host: 'System',
    name: 'System',
    address: '',
    children: [
      {
        hostType: 'item',
        id: '4411cd2a-dc9c-490b-a622-857d84ce2900',
        groupId: DEFAULT_MAC_HOST_CONTENT_ID,
        name: 'localhost',
        host: 'localhost',
        address: '127.0.0.1',
      },
      {
        hostType: 'item',
        id: 'ba7ae182-14c1-4bff-a38d-36dea6f0bebb',
        groupId: DEFAULT_MAC_HOST_CONTENT_ID,
        name: 'broadcasthost',
        host: 'broadcasthost',
        address: '255.255.255.255',
      },
      {
        hostType: 'item',
        id: 'af4e5bc3-2470-456b-beee-595178d94628',
        groupId: DEFAULT_MAC_HOST_CONTENT_ID,
        name: 'localhost',
        host: 'localhost',
        address: '::1',
      },
    ],
  },
];

export const DEFAULT_WIN_HOST_CONTENT: HostInfo[] = [
  {
    hostType: 'group',
    id: DEFAULT_WIN_HOST_CONTENT_ID,
    host: 'System',
    name: 'System',
    address: '',
    children: [],
  },
];

export const DEFAULT_MAC_SELECTED_HOSTS = [DEFAULT_MAC_HOST_CONTENT_ID];

export const DEFAULT_WIN_SELECTED_HOSTS = [DEFAULT_WIN_HOST_CONTENT_ID];
