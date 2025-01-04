import { invoke } from '@tauri-apps/api/core';

const setHostsContent = async (content: string) => {
  invoke('set_hosts_content', { content });
};

export { setHostsContent };
