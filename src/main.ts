import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

import signalRHub from '@/business/signalR-plugin';
import events from '@/business/signalR-events';

import JsonProperty from '@/components/json-builder/json-property.vue';
import App from './App.vue';

library.add(faPlus);

createApp(App)
  .use(createPinia())
  .use(Quasar)
  .use(signalRHub, { url: 'https://localhost:5001/api/signalR/dynamic-classes', events })
  .component('fa-icon', FontAwesomeIcon)
  .component('json-property', JsonProperty)
  .mount('#app');
