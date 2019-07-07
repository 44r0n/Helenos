import Vue from "vue";
import VueRouter from 'vue-router'
import HelloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";
import Tutorial from "./components/Tutorial.vue";
import List from "./components/List.vue";
import Click from "./components/Click.vue";
import WatchComponent from "./components/WatchComponent.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/HelloComponent', name: 'HelloComponent', component: HelloComponent },
    { path: '/HelloDecoratorComponent', name: 'HelloDecoratorComponent', component: HelloDecoratorComponent },
    { path: '/Tutorial', name: 'Tutorial', component: Tutorial },
    { path: '/List', name: 'List', component: List },
    { path: '/Click', name: 'Click', component: Click },
    { path: '/Watch', name: 'Watch', component: WatchComponent }
  ]
  

  const router = new VueRouter({
    routes // short for `routes: routes`
  });

  const app = new Vue({
    router
  }).$mount('#app')
  
  // Now the app has started!