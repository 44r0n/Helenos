<template>
    <div class="columns is-mobile">        
        <div class ="column is-three-fifths is-offset-one-fifth box">
            <h1 class="title">Register</h1>   
            <status-input
                labelText='User name:'
                :leftIcon='userIcon'
                :status='inputUserNameStatus'   
                type='text'             
                v-model='user.name'
             />             
            <status-message :status="emptyStatus">The user name cannot be empty.</status-message>
            <status-message :status="fourCharactersUserStatus">The user name must have at least 4 characters.</status-message>    
            <status-message :status="uniqueUserStatus">The user name bust be unique.</status-message>                
            <status-input 
                type='password'
                labelText='Password:'
                :leftIcon='passwordIcon'
                :status='inputPasswordStatus'
                v-model='user.password'
            />
            <status-input 
                type='password'
                labelText='Repeat password:'
                :leftIcon='passwordIcon'
                :status='inputPasswordStatus'
                v-model='user.repeatPassword'
            />
            <status-message :status='emptyPasswordStatus'>The password cannot be empty.</status-message>
            <status-message :status='eightCharactersPasswordStatus'>The password must contain at least 8 characters.</status-message>
            <status-message :status='equalPasswordStatus'>The two passwods must match</status-message>
            <div class="field is-grouped is-grouped-right">
                <p class="control">
                    <button class="button is-link" :class="loadingClass" :disabled=disableRegisterButton @click="register">Register</button>
                </p>
                <p class="control">
                    <button class="button is-dark is-outlined" @click="clear">Clear form</button>
                </p>
            </div>            
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from "lodash";
import axios from 'axios';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCheck, faUnlockAlt, faSpinner, faExclamation, faInfo } from '@fortawesome/free-solid-svg-icons';
import status from './statusComponents/status';
import statusMessage from './statusComponents/statusMessage.vue';
import statusInput from './statusComponents/statusInput.vue';

library.add(faUser, faUnlockAlt);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('status-message', statusMessage);
Vue.component('status-input', statusInput);

@Component
export default class RegisterComponent extends Vue {
    user = { name: "", password: "", repeatPassword: ""};
    loadingClass = '';                 
    inputUserNameStatus: status = 'info';
    emptyStatus: status = 'info';    
    fourCharactersUserStatus: status = 'info';
    uniqueUserStatus: status = 'info';
    debouncedGetAvailableUser: (() => Promise<void>) & _.Cancelable;
    userIcon = faUser;

    passwordIcon = faUnlockAlt;
    inputPasswordStatus: status = 'info';
    emptyPasswordStatus: status = 'info';
    eightCharactersPasswordStatus: status = 'info';
    equalPasswordStatus: status = 'info';
    debouncedCheckPassword: (() => Promise<void>) & _.Cancelable;

    clearingUserName = false;    
    clearingPassword = false;
    clearingRepeatPassword = false;

    @Watch('user.name')
    onUserNameChanged(val: string, oldValue: string) {  
        if(this.clearingUserName === false) {                  
            this.emptyStatus = 'load';        
            this.fourCharactersUserStatus = 'load';
            this.inputUserNameStatus = 'load';
            this.uniqueUserStatus = 'load';
            this.debouncedGetAvailableUser();
        } else {
            this.clearingUserName = false;
        }
    }    

    @Watch('user.password')
    onPasswordChanged(val: string, oldValue: string) {
        if(this.clearingPassword === false) {
            this.setLoadPassword();
        } else {
            this.clearingPassword = true;
        }
    }

    @Watch('user.repeatPassword')
    onRepeatPasswordChange(val: string, oldValue: string) {
        if(this.clearingRepeatPassword === false) {
            this.setLoadPassword();
        } else {
            this.clearingRepeatPassword = true;
        }
    }

    private setLoadPassword() {
        this.inputPasswordStatus = 'load';
        this.emptyPasswordStatus = 'load';
        this.eightCharactersPasswordStatus = 'load';
        this.equalPasswordStatus = 'load';
        this.debouncedCheckPassword();
    }

    created() {
        this.debouncedGetAvailableUser = _.debounce(this.checkUser, 500);
        this.debouncedCheckPassword = _.debounce(this.checkPassword, 500);
    }

    async checkUser() {        
        if (this.user.name.length === 0) {  
            this.emptyStatus = 'error';                  
            this.fourCharactersUserStatus = 'error';
            this.inputUserNameStatus = 'error';
            this.uniqueUserStatus = 'error';
        } else if (this.user.name.length < 4) {            
            this.emptyStatus = 'ok';                   
            this.fourCharactersUserStatus = 'error';
            this.inputUserNameStatus = 'error';
            this.uniqueUserStatus = 'error';            
        } else if (!await this.checkAvailableUser(this.user.name)) {
            this.emptyStatus = 'ok';
            this.fourCharactersUserStatus = 'ok';
            this.inputUserNameStatus = 'error';
            this.uniqueUserStatus = 'error';            
        }
        else {         
            this.emptyStatus = 'ok';
            this.fourCharactersUserStatus = 'ok';
            this.inputUserNameStatus = 'ok';
            this.uniqueUserStatus = 'ok';            
        }                       
    }

    async checkPassword() {
        if(this.user.password.length === 0) {
            this.emptyPasswordStatus = 'error';
            this.eightCharactersPasswordStatus = 'error';
            this.equalPasswordStatus = 'error';
            this.inputPasswordStatus = 'error';
        } else if (this.user.password.length < 8 ) {
            this.emptyPasswordStatus = 'ok';
            this.eightCharactersPasswordStatus = 'error';
            this.equalPasswordStatus = 'error';
            this.inputPasswordStatus = 'error';
        } else if (this.user.password !== this.user.repeatPassword) {
            this.emptyPasswordStatus = 'ok';
            this.eightCharactersPasswordStatus = 'ok';
            this.equalPasswordStatus = 'error';
            this.inputPasswordStatus = 'error';
        } else {
            this.emptyPasswordStatus = 'ok';
            this.eightCharactersPasswordStatus = 'ok';
            this.equalPasswordStatus = 'ok';
            this.inputPasswordStatus = 'ok';
        }
    }

    private async checkAvailableUser(userName: string): Promise<boolean> {
        try {
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/user/userNameAvailable', {
                UserName: userName
            });
            return axiosResponse.data.available;
        }
        catch(error) {
            console.error(error.response.data.message);
            return false;
        }
    }

    clear() {
        this.user.name = "";
        this.user.password = "";
        this.user.repeatPassword = "";
        this.emptyStatus = 'info';                  
        this.fourCharactersUserStatus = 'info';
        this.inputUserNameStatus = 'info';
        this.uniqueUserStatus = 'info';   
        this.emptyPasswordStatus = 'info';
        this.eightCharactersPasswordStatus = 'info';
        this.equalPasswordStatus = 'info';
        this.inputPasswordStatus = 'info';    
        this.clearingUserName = true;
        this.clearingPassword = true;
        this.clearingRepeatPassword = true;
    }

    get disableRegisterButton(): boolean {        
        return (this.inputUserNameStatus !== 'ok' || this.inputPasswordStatus !== 'ok');
    }

    async register() {        
        this.loadingClass = 'is-loading';           

        try {
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/user/register', {
                UserName: this.user.name,
                Password: this.user.password
            });
            console.log(`Your new user id is ${axiosResponse.data.user}`);
            this.clear();                                 
        }
        catch(error) {
            console.error(error.response.data.message);                                    
        }

        this.loadingClass = ''; 
    }
}
</script>
