import { storage } from '@knives/shared';
import { APP_THEME_KEY, APP_LOCALE_KEY } from '@app/constants/local-storage';
import { allThemes, type Theme, allLocales, type LocaleType } from '@app/store';

const localTheme = storage.get(APP_THEME_KEY);
const defaultTheme = allThemes.includes(localTheme as Theme)
  ? (localTheme as Theme)
  : 'light';

const localLocale = storage.get(APP_LOCALE_KEY);
const defaultLocale = allLocales.includes(localLocale as LocaleType)
  ? (localLocale as LocaleType)
  : 'zhHans';

export const APP_NAME = 'Knives';

export { defaultTheme, defaultLocale };
