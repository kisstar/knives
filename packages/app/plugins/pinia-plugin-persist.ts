import type { PiniaPluginContext, StateTree, Store, StoreGeneric } from 'pinia';
import { pick as pickFn, omit as omitFn, cloneDeep } from 'lodash-es';
import type { Store as PersistStore } from '@knives/bridge';

export interface Persistence {
  store: PersistStore;
  key: string;
  pick?: string[];
  omit?: string[];
  beforeHydrate?: (context: PiniaPluginContext) => void;
  afterHydrate?: (context: PiniaPluginContext) => void;
}

async function hydrateStore(
  store: Store,
  {
    store: persistStore,
    key,
    pick,
    omit,
    beforeHydrate,
    afterHydrate,
  }: Persistence,
  context: PiniaPluginContext,
  runHooks = true,
) {
  try {
    if (runHooks) beforeHydrate?.(context);

    const fromStorage = await persistStore.get(key);

    if (fromStorage) {
      const picked = pick ? pickFn(fromStorage, pick) : fromStorage;
      const omitted = omit ? omitFn(picked, omit) : picked;

      store.$patch(omitted);
    }
    if (runHooks) afterHydrate?.(context);
  } catch (error) {
    console.error('[pinia-plugin-persist]', error);
  }
}

async function persistState(
  state: StateTree,
  { store: persistStore, key, pick, omit }: Persistence,
) {
  try {
    const picked = pick ? pickFn(state, pick) : state;
    const omitted = omit ? omitFn(picked, omit) : picked;
    const toStorage = cloneDeep(omitted);

    await persistStore.set(key, toStorage);
  } catch (error) {
    console.error('[pinia-plugin-persist]', error);
  }
}

export function createPersistence(context: PiniaPluginContext, auto: boolean) {
  const {
    pinia,
    store,
    options: { persist = auto },
  } = context;
  if (!persist) return;
  // HMR handling, ignore stores created as 'hot' stores
  if (!(store.$id in pinia.state.value)) {
    // @ts-expect-error `_s` is a stripped @internal
    const originalStore: StoreGeneric = pinia._s.get(
      store.$id.replace('__hot:', ''),
    );

    if (originalStore) Promise.resolve().then(() => originalStore.$persist());
    return;
  }

  const persistences = Array.isArray(persist)
    ? persist
    : persist === true
      ? [{}]
      : [persist];

  store.$hydrate = ({ runHooks = true } = {}) => {
    persistences.forEach((p) => {
      hydrateStore(store, p, context, runHooks);
    });
  };

  store.$persist = () => {
    persistences.forEach((p) => {
      persistState(store.$state, p);
    });
  };

  persistences.forEach((p) => {
    hydrateStore(store, p, context);

    store.$subscribe((_mutation, state) => persistState(state, p), {
      detached: true,
    });
  });
}

export function PiniaPersistPlugin(context: PiniaPluginContext) {
  return createPersistence(context, false);
}
