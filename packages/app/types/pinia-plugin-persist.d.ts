import type { StateTree } from 'pinia';
import type { Persistence } from '@app/plugins/pinia-plugin-persist';

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: Persistence<S> | Persistence<S>[];
  }

  export interface PiniaCustomProperties {
    // Hydrate store from configured storage
    $hydrate: (opts?: { runHooks?: boolean }) => void;
    // Persist store into configured storage
    $persist: () => void;
  }
}
