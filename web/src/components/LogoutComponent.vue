<template>
    <div class="container">        
        <p>Are you sure you want to log out?</p>
        <p>
            <button class="button is-success" @click="logout"><fa-icon :icon="['fas','check']" />&nbsp; Yes</button>
            <button class="button is-danger" @click="back"><fa-icon :icon="['fas','ban']" />&nbsp; No</button>
        </p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import router from '../router';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faBan);

Vue.component('fa-icon', FontAwesomeIcon);

@Component
export default class LogoutComponent extends Vue {
    logout() {
        localStorage.removeItem('siteUser');
        this.$emit('userLogedOut');
        router.push('/');
    }

    back() {
        router.go(-1);
    }
}
</script>
