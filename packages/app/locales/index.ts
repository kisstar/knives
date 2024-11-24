import { type I18nOptions, createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { en, zhHans } from 'vuetify/locale';

function i18nOptions(): I18nOptions {
  return {
    locale: 'zhHans',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
      en: {
        $vuetify: {
          ...en,
        },
        ...(messages?.en ?? {}),
      },
      zhHans: {
        $vuetify: {
          ...zhHans,
        },
        ...(messages?.zhHans ?? {}),
      },
    },
  };
}

export const i18n = createI18n<false>(i18nOptions());
