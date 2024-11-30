import { Store as TauriStore } from '@tauri-apps/plugin-store';

export interface StoreEngine {
  set(key: string, value: unknown): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
}

class Store {
  private _store: Promise<StoreEngine | null> = Promise.resolve(null);

  constructor(storeEngine: Promise<StoreEngine | null>) {
    this._store = storeEngine;
  }

  set(key: string, value: unknown): Promise<void> {
    return this._store.then((store) => store?.set(key, value));
  }

  get<T>(key: string): Promise<T | undefined> {
    return this._store.then((store) => store?.get<T>(key));
  }
}

/**
 * Settings are persisted in <Application Data>/settings.json.
 */
const store = new Store(TauriStore.load('settings.json', { autoSave: true }));

export { store };
