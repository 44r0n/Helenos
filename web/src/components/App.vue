<template>
    <div>
        <menu-component></menu-component>
        <br/>
        <br />
        <br />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import MenuComponent from './MenuComponent.vue';

Vue.component('menu-component', MenuComponent);

@Component
export default class App extends Vue {
    
}
</script>
