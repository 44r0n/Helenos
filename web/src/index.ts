import Vue from "vue";
import VueRouter from 'vue-router'
import HelloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/HelloComponent', name: 'HelloComponent', component: HelloComponent },
    { path: '/HelloDecoratorComponent', name: 'HelloDecoratorComponent', component: HelloDecoratorComponent }
  ]
  

  const router = new VueRouter({
    routes // short for `routes: routes`
  });

  const app = new Vue({
    router
  }).$mount('#app')
  
  // Now the app has started!