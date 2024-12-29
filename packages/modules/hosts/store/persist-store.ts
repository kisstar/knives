import { createStore } from '@knives/bridge';
import { HOSTS_STORE_NAME } from '@hosts/constants';

export const store = createStore({
  storeName: HOSTS_STORE_NAME,
});
