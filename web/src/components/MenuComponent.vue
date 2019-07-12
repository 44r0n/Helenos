<template>     
<nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a @click="toogle" role="button" class="navbar-burger burger" :class="activeClass" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div class="navbar-menu" :class="activeClass">
        <div class="navbar-start">
            <router-link class="navbar-item" to="/">Public page</router-link>
            <router-link class="navbar-item" to="/Protected" v-show="registered"> <fa-icon :icon="['fas','user-shield']" /> &nbsp;Protedted zone</router-link>
        </div>
        
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <router-link class="button is-primary" to="/Register">Register</router-link>
                    <router-link class="button is-light" to="/Login" v-show="!registered"> <fa-icon :icon="['fas','sign-in-alt']" /> &nbsp; Login</router-link>
                    <router-link class="button is-light" to="/Logout" v-show="registered"> <fa-icon :icon="['fas','sign-out-alt']" /> &nbsp;Logout</router-link>
                </div>
            </div>
        </div>
    </div>
</nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSignInAlt, faSignOutAlt, faUserShield);

Vue.component('fa-icon', FontAwesomeIcon);

@Component
export default class MenuComponent extends Vue {
    registered = localStorage.getItem('siteUser') !== null;
    activeClass = '';

    @Watch('$route')
    onRouteChanged() {
        this.registered = localStorage.getItem('siteUser') !== null;
    }

    toogle() {
        console.log('toogle');
        
        this.activeClass = this.activeClass === '' ? 'is-active' : '';
    }
}
</script>