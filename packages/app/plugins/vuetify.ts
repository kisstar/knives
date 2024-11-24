import { createVuetify } from 'vuetify';
import { VTreeview } from 'vuetify/labs/VTreeview';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { i18n } from '@app/locales';

export default createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  components: {
    VTreeview,
  },
});
