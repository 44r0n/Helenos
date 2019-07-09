<template>
    <div>
        <menu-component></menu-component>
        <p>Are you sure you want to log out?</p>
        <p>
            <button @click="logout">Yes</button>
            <button @click="back">No</button>
        </p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import router from '../router';
import MenuComponent from './MenuComponent.vue';

Vue.component('menu-component', MenuComponent);

@Component
export default class LogoutComponent extends Vue {
    logout() {
        localStorage.removeItem('siteUser');
        router.push('/');
    }

    back() {
        router.go(-1);
    }
}
</script>
