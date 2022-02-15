import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

library.add(faPlus);

createApp(App)
  .use(createPinia())
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
