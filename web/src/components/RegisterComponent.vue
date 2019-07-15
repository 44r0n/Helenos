<template>
    <div class="columns is-mobile">        
        <div class ="column is-three-fifths is-offset-one-fifth box">
            <h1 class="title">Register</h1>    
            <input-text :labelText='"Textlabel"' v-model="user.name" />
            <p>UserName: {{ user.name }}</p>
            <div class="field">
                <label for="userName" class="label">User name</label>                
                <div class="control has-icons-left has-icons-right">
                    <input class="input" :class="userNameInputClassStatus" type="text" v-model="user.name" ref="userName" />
                    <!-- TODO: comprobador de nombres según tecleas. Con WATCH -->
                    <span class="icon is-small is-left" >
                        <fa-icon :icon="['fas', 'user']" />
                    </span>
                    <span class="icon is-small is-right">
                        <fa-icon v-if="userNameLoad" :icon="['fas', 'spinner']"  spin/>
                        <fa-icon v-if="userNameError" :icon="['fas', 'excalamation']" />
                        <fa-icon v-if="userNameOk" :icon="['fas', 'check']" />
                    </span>
                </div>
                <p class="help" :class="emptyStatusClass" >
                    <fa-icon v-if="!loading" :icon="['fas', emptyHelperTextIcon ]" />
                    <fa-icon v-if="loading" :icon="['fas', 'spinner' ]" spin />
                    The user name cannot be empty</p>
                <!-- <p class="help" :class="statusClass" ><fa-icon :icon="['fas', helperTextIcon ]" /> The user name must have at least 4 characters</p>
                <p class="help" :class="statusClass" ><fa-icon :icon="['fas', helperTextIcon ]" /> The user name must be unique</p> -->
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from "lodash";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCheck, faUnlockAlt, faSpinner, faExclamation, faInfo } from '@fortawesome/free-solid-svg-icons';
import inputText from './utils/inputText.vue';

library.add(faUser, faCheck, faUnlockAlt, faSpinner, faExclamation, faInfo);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('input-text', inputText);

@Component
export default class RegisterComponent extends Vue {
    user: { name: string, password: string } = { name: "", password: ""};
    disableRegisterButton = false;
    statusMessage = '';
    statusClass = 'is-info';
    emptyStatusClass = 'is-info';
    userNameClass = '';
    userNameLoad = false;
    userNameOk = false;
    userNameError = false;
    helperTextIcon = 'info';
    emptyHelperTextIcon = 'info';
    userNameInputClassStatus = '';
    loading = false;
    debouncedGetAvailableUser: (() => Promise<void>) & _.Cancelable;

    @Watch('user.name')
    onUserNameChanged(val: string, oldValue: string) {        
        // if(val.length === 0) {
        //     this.helperTextIcon = 'exclamation';
        //     this.statusClass = 'is-danger';
        // }
        this.emptyStatusClass = 'is-dark';
        this.loading = true;
        this.debouncedGetAvailableUser();
    }    

    created() {
        this.debouncedGetAvailableUser = _.debounce(this.getAvailableUser, 500);
    }

    async getAvailableUser() {
        if (this.user.name.length === 0) {
            this.emptyStatusClass = 'is-danger';
            this.emptyHelperTextIcon = 'exclamation';
            this.userNameInputClassStatus = 'is-danger';
        }
        else {
            this.emptyStatusClass = 'is-info';
            this.emptyHelperTextIcon = 'info';
            this.userNameInputClassStatus = '';
        }

        this.loading = false;
    }

    clear() {
        this.user = { name: "", password: ""};
        this.disableRegisterButton = false;
        (this.$refs.userName as HTMLElement).focus();   
    }

    async register() {
        this.disableRegisterButton = true;
        this.statusMessage = 'Registering';             
        this.setUserNameLoad();

        try {
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/user/register', {
                UserName: this.user.name,
                Password: this.user.password
            });
            this.statusMessage = `Your new user id is ${axiosResponse.data.user}`;
            this.statusClass = 'is-success';
            this.clear();
            this.setUserNameOk(); // TODO: move to when verifies the userName availability
        }
        catch(error) {
            this.statusMessage = error.response.data.message;
            this.statusClass = 'is-danger';
            this.setUserNameError(); // TODO: move to when verifies the userName availabitiliy
        }
        this.disableRegisterButton = false;
    }

    private setUserNameLoad() {
        this.userNameLoad = true;
        this.userNameError = false;
        this.userNameOk = false;
    }

    private setUserNameOk() {
        this.userNameLoad = false;
        this.userNameError = false;
        this.userNameOk = true;
    }

    private setUserNameError() {
        this.userNameLoad = false;
        this.userNameError = true;
        this.userNameOk = false;
    }
}
</script>
