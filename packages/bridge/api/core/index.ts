import { invoke as tauriInvoke } from '@tauri-apps/api/core';
import { isTauri } from '@bridge/platform';

export const invoke = isTauri ? tauriInvoke : () => Promise.resolve();
