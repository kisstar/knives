import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { PiniaPersistPlugin, vuetify } from '@app/plugins';
import { router } from '@app/router';
import { i18n } from '@app/locales';
import App from '@app/App.vue';
import '@knives/cube2png';
import '@knives/hosts';
import '@app/styles/index.scss';

const pinia = createPinia();
const app = createApp(App);

pinia.use(PiniaPersistPlugin);
app.use(router).use(pinia).use(i18n).use(vuetify).mount('#app');
