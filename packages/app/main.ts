import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './styles/index.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(vuetify).mount('#app');
