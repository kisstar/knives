import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vuetify from '@app/plugins/vuetify';
import { router } from '@app/router';
import '@cube2png/main';
import App from '@app/App.vue';
import '@app/styles/index.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).use(vuetify).mount('#app');
