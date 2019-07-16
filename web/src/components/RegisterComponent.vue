<template>
    <div class="columns is-mobile">        
        <div class ="column is-three-fifths is-offset-one-fifth box">
            <h1 class="title">Register</h1>    
            <input-text 
                :labelText='"User name:"' 
                :inputClass="userNameInputClassStatus" 
                :leftIcon="userIcon" 
                :rightIcon="userRightIcon"
                :rightIconSpin="userLoading"
                v-model="user.name" />
            <status-message :status="emptyStatus">
                The user name cannot be empty.
            </status-message>
            <status-message :status="fourCharactersUserStatus">
                The user name must have at least 4 characters.
            </status-message>                    
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
import inputText from './utils/inputText.vue';
import statusMessage from './utils/statusMessage.vue';
import status from './utils/status';

library.add(faUser, faCheck, faUnlockAlt, faSpinner, faExclamation, faInfo);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('input-text', inputText);
Vue.component('status-message', statusMessage);

@Component
export default class RegisterComponent extends Vue {
    user: { name: string, password: string } = { name: "", password: ""};
    disableRegisterButton = true;            
    userNameInputClassStatus = 'is-info';
    userLoading = false;
    emptyStatus: status = 'info';    
    fourCharactersUserStatus: status = 'info';
    debouncedGetAvailableUser: (() => Promise<void>) & _.Cancelable;
    userIcon = faUser;
    userRightIcon?: IconDefinition = undefined;

    @Watch('user.name')
    onUserNameChanged(val: string, oldValue: string) {        
        // if(val.length === 0) {
        //     this.helperTextIcon = 'exclamation';
        //     this.statusClass = 'is-danger';
        // }
        this.userLoading = true;
        this.userRightIcon = faSpinner;
        this.emptyStatus = 'load';        
        this.fourCharactersUserStatus = 'load';
        this.debouncedGetAvailableUser();
    }    

    created() {
        this.debouncedGetAvailableUser = _.debounce(this.getAvailableUser, 500);
    }

    async getAvailableUser() {
        if (this.user.name.length === 0) {  
            this.setUserInput('is-danger', faExclamation);
            this.emptyStatus = 'error';                  
            this.fourCharactersUserStatus = 'error';
        } else if (this.user.name.length < 4) {
            this.setUserInput('is-danger', faExclamation);
            this.emptyStatus = 'ok';                   
            this.fourCharactersUserStatus = 'error';
        }
        else {         
            this.setUserInput('is-success', faCheck);
            this.emptyStatus = 'ok';
            this.fourCharactersUserStatus = 'ok';
        }

        this.userLoading = false;        
    }

    private setUserInput(className: string, icon: IconDefinition) {
        this.userNameInputClassStatus = className;
        this.userRightIcon = icon;
    }

    clear() {
        this.user = { name: "", password: ""};
        this.disableRegisterButton = false;
        (this.$refs.userName as HTMLElement).focus();   
    }

    async register() {
        this.disableRegisterButton = true;                    

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
        this.disableRegisterButton = false;
    }
}
</script>
