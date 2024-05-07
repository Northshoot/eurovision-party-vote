import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
// Import FontAwesome icon library and specific icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(faGlobeEurope)
library.add(faYoutube)


const app = createApp(App);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
