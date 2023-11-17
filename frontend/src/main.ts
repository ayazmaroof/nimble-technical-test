import './assets/main.sass';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase';

const app = createApp(App);

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth
  ]
})
app.use(router);


app.mount('#app');
