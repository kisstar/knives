import localforage from 'localforage';
import { isTauri } from '@bridge/platform';
import { tauriStoreDriver } from '@bridge/store/tauri-driver';

export interface StoreEngine {
  setItem<T>(key: string, value: T): Promise<T>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

class Store {
  private _store: StoreEngine;

  constructor(storeEngine: StoreEngine) {
    this._store = storeEngine;
  }

  set<T>(key: string, value: T): Promise<T> {
    return this._store.setItem<T>(key, value);
  }

  get<T>(key: string): Promise<T | null> {
    return this._store.getItem<T>(key);
  }

  delete(key: string): Promise<void> {
    return this._store.removeItem(key);
  }

  clear(): Promise<void> {
    return this._store.clear();
  }
}

interface StoreOptions {
  storeName: string;
}

function createStore(options: StoreOptions) {
  const { storeName } = options;
  const driver = isTauri ? tauriStoreDriver._driver : localforage.INDEXEDDB;

  const store = localforage.createInstance({
    driver,
    name: 'K_APP',
    storeName,
  });

  return new Store(store);
}

/**
 * Settings are persisted in <Application Data>/settings.json.
 */
const store = createStore({
  storeName: 'settings',
});

export { store, createStore, type Store };
