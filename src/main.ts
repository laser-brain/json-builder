import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import JsonProperty from '@/components/json-builder/json-property.vue';
import App from './App.vue';

library.add(faPlus);

createApp(App)
  .use(createPinia())
  .use(Quasar)
  .component('fa-icon', FontAwesomeIcon)
  .component('json-property', JsonProperty)
  .mount('#app');
