import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Notifications from '@kyvg/vue3-notification';
import { BModal } from 'bootstrap-vue-3'; // Importa solo BModal

// Crear instancias de Pinia y Vuetify
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

// Crear la aplicación Vue
const app = createApp(App);

// Usar plugins
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Notifications);

// Registrar solo el componente BModal
app.component('BModal', BModal);

// Montar la aplicación
app.mount('#app');
