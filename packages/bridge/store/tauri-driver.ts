import localforage from 'localforage';
import { Store as TauriStore, type Store } from '@tauri-apps/plugin-store';
import { isTauri } from '@bridge/platform';

type LocalForageDriver = Parameters<typeof localforage.defineDriver>[0];

interface TauriStoreDriver extends LocalForageDriver {
  _store: Promise<Store> | null;
}

const storeDriver: TauriStoreDriver = {
  _driver: 'TAURI_STORE',
  _support: isTauri,
  _store: null,

  _initStorage(options: LocalForageOptions) {
    const { storeName } = options;

    this._store = TauriStore.load(`${storeName}.json`, { autoSave: true });
  },

  clear() {
    return this._store?.then((store) => store.clear()) || Promise.resolve();
  },

  async getItem<T>(key: string): Promise<T | null> {
    if (!this._store) {
      return null;
    }

    const store = await this._store;
    const value = await store.get<T>(key);

    return value === void 0 ? null : value;
  },

  /**
   * Iterates over each key-value pair in the storage.
   * @param iteratorCallback {Function} Callback that is called for each key and value in store.
   * @returns {U} Result of the iterator callback.
   */
  async iterate<T, U>(
    iteratorCallback: (value: T, key: string, iterationNumber: number) => U,
  ) {
    const keys = await this.keys();
    let result: U | undefined;

    for (let i = 0; i < keys.length; i += 1) {
      const value = await this.getItem<T>(keys[i]);

      result = iteratorCallback(value as T, keys[i], i);

      if (result) {
        return result;
      }
    }

    return result as U;
  },

  async key(n: number) {
    const keys = await this.keys();

    return keys[n];
  },

  keys() {
    return this._store?.then((store) => store.keys()) || Promise.resolve([]);
  },

  length() {
    return this._store?.then((store) => store.length()) || Promise.resolve(0);
  },

  async removeItem(key: string) {
    if (!this._store) {
      return;
    }

    const store = await this._store;

    store.delete(key);
  },

  async setItem<T>(key: string, value: T) {
    if (!this._store) {
      return Promise.reject(new Error('Store not initialized'));
    }

    const store = await this._store;

    store.set(key, value);

    return value;
  },
};

// Add the driver to localForage.
localforage.defineDriver(storeDriver);

export const tauriStoreDriver = storeDriver;
