<template>
    <div class="columns is-mobile">
        <div class ="column is-three-fifths is-offset-one-fifth box">
            <h1 class="title">Login</h1>            
            <status-input
                labelText='User name:'
                :leftIcon='userIcon'
                :status='inputUserNameStatus'
                type='text'
                v-model='user.name'
            />                
            <status-input 
                type='password'
                labelText='Password:'
                :leftIcon='passwordIcon'
                :status='inputPasswordStatus'
                v-model='user.password'
            />
            <p class="help is-danger" >{{ statusMessage }}</p>
            <div class="field is-grouped is-grouped-right" style="padding-top: 12px">
                <p class="control">
                    <button class="button is-link" :class="loadingClass" :disabled=disableLoginButton @click="login"><fa-icon :icon="['fas','sign-in-alt']" /> &nbsp;Login</button>
                </p>
                <p class="control">
                    <button class="button is-dark is-outlined" @click="clear">Clear form</button>
                </p>
            </div>            
            
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import router from '../router';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCheck, faUnlockAlt, faSpinner, faExclamation, faInfo, faUserAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import status from './statusComponents/status';
import statusMessage from './statusComponents/statusMessage.vue';
import statusInput from './statusComponents/statusInput.vue';

library.add(faUser, faUnlockAlt, faSignInAlt);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('status-message', statusMessage);
Vue.component('status-input', statusInput);

@Component
export default class LoginComponent extends Vue {
    user: { name: string, password: string} = { name: "", password: ""};
    disableLoginButton = false;
    statusMessage = '';
    inputUserNameStatus: status = 'info';
    inputPasswordStatus: status = 'info';
    loadingClass = '';
    userIcon = faUser;
    passwordIcon = faUnlockAlt;

    clear() {
        this.user = { name: "", password: ""};
        this.disableLoginButton = false;
    }

    async login() {
        this.disableLoginButton = true;   
        this.loadingClass = 'is-loading';
        this.statusMessage = '';
        if(this.user.name.length < 4 || this.user.password.length < 8) {
            setTimeout(() => {
                this.statusMessage = 'Invalid credentials';
                this.loadingClass = '';
                this.disableLoginButton = false;    
            }, 500);
            
            return;
        }


        try {            
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/user/login', {
                UserName: this.user.name,
                Password: this.user.password
            });
            localStorage.setItem('siteUser', axiosResponse.data.Token);
            this.$emit('userLogedIn');
            router.push('Protected');
        } 
        catch (error) {
            this.statusMessage = error.response.data.message;           
        }

        this.disableLoginButton = false;
        this.loadingClass = '';
    }
}
</script>
