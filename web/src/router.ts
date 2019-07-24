import VueRouter from 'vue-router';
import PublicComponent from './components/PublicComponent.vue';
import LoginComponent from "./components/LoginComponent.vue";
import RegisterComponent from "./components/RegisterComponent.vue";
import ProtectedComponent from "./components/ProtectedComponent.vue";
import LogoutComponent from "./components/LogoutComponent.vue";

const routes = [
    { path: '/', name: 'PublicComponent', component: PublicComponent },
    { path: '/Login', name: 'LoginComponent', component: LoginComponent },
    { path: '/Register', name: 'RegisterComponent', component: RegisterComponent },
    { path: '/Protected', name: 'ProtectedComponent', component: ProtectedComponent },
    { path: '/Logout', name: 'LogoutComponent', component: LogoutComponent }
]
  

const router = new VueRouter({
    routes
});

export default router;