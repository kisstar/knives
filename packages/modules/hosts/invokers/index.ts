import { invoke } from '@knives/bridge';

const setHostsContent = async (content: string) => {
  invoke('set_hosts_content', { content });
};

export { setHostsContent };
