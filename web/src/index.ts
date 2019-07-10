import Vue from "vue";
import VueRouter from 'vue-router';
import router from './router';
import 'bulma/css/bulma.css';
import App from './components/App.vue';

Vue.use(VueRouter);
Vue.component('app', App);

const app = new Vue({
  router  
}).$mount('#app');
// Now the app has started!