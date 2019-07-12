<template>
    <div class="columns is-mobile">        
        <div class ="column is-three-fifths is-offset-one-fifth box">
            <h1 class="title">Register</h1>    
            <div class="field">
                <label for="userName" class="label">User name</label>                
                <div class="control has-icons-left has-icons-right">
                    <!-- <input class="input is-success" type="text" v-model="user.name" ref="userName" /> -->
                    <input class="input" type="text" v-model="user.name" ref="userName" />
                    <!-- TODO: comprobador de nombres según tecleas. Con WATCH -->
                    <span class="icon is-small is-left" >
                        <fa-icon :icon="['fas', 'user']" />
                    </span>
                    <!-- <span class="icon is-small is-right">
                        <fa-icon :icon="['fas', 'check']" />
                    </span> -->
                </div>
            </div>
            <div class="field">
                <label for="password" class="label">Password</label>
                <div class="control has-icons-left">
                    <input type="password" name="password" class="input" v-model="user.password">
                    <span class="icon is-small is-left" >
                        <fa-icon :icon="['fas', 'unlock-alt']" />
                    </span>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" :disabled=disableRegisterButton @click="register">Register</button>
                </div>
                <div class="control">
                    <button class="button is-text" @click="clear">Clear form</button>
                </div>
            </div>            
            <p class="help" :class="statusClass">{{ statusMessage }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCheck, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faCheck, faUnlockAlt);

Vue.component('fa-icon', FontAwesomeIcon);

@Component
export default class RegisterComponent extends Vue {
    user: { name: string, password: string } = { name: "", password: ""};
    disableRegisterButton = false;
    statusMessage = '';
    statusClass = '';

    clear() {
        this.user = { name: "", password: ""};
        this.disableRegisterButton = false;
        (this.$refs.userName as HTMLElement).focus();   
    }

    async register() {
        this.disableRegisterButton = true;
        this.statusMessage = 'Registering';
        this.statusClass = 'is-info';
        try {
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/user/register', {
                UserName: this.user.name,
                Password: this.user.password
            });
            this.statusMessage = `Your new user id is ${axiosResponse.data.user}`;
            this.statusClass = 'is-success';
            this.clear();
        }
        catch(error) {
            this.statusMessage = error.response.data.message;
            this.statusClass = 'is-danger';
        }
        this.disableRegisterButton = false;
    }
}
</script>
