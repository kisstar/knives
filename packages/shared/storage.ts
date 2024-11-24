import { isString } from 'lodash-es';

class Storage {
  set(key: string, value: unknown) {
    let data = value;

    if (!isString(value)) {
      data = JSON.stringify(value);
    }

    localStorage.setItem(key, data as string);
  }

  get<T = unknown>(
    key: string,
    options: { parse?: boolean; def?: T } = {},
  ): T | null {
    const value = localStorage.getItem(key);
    const { parse, def } = options;

    if (value) {
      if (parse) {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      } else {
        return value as T;
      }
    } else {
      return def ?? null;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export const storage = new Storage();
