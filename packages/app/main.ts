import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vuetify from '@app/plugins/vuetify';
import { router } from '@app/router';
import { i18n } from '@app/locales';
import '@knives/cube2png';
import '@knives/hosts';
import App from '@app/App.vue';
import '@app/styles/index.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).use(i18n).use(vuetify).mount('#app');
