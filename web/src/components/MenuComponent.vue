<template>        
    <ul>
        <li><router-link to="/">Go to public page</router-link></li>
        <li><router-link to="/Register">Go to register</router-link></li>
        <li v-show="!registered"><router-link to="/Login">Go to login</router-link></li>
        <li v-show="registered"><router-link to="/Logout">Go to logout</router-link></li>
        <li v-show="registered"><router-link to="/Protected">Go to protected zone</router-link></li>            
    </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class MenuComponent extends Vue {
    registered = false;

    @Watch('$route')
    onRouteChanged() {
        this.registered = localStorage.getItem('siteUser') !== null;
    }
}
</script>