<template>
    <div class="columns is-mobile">
        <div class ="column is-three-fifths is-offset-one-fifth box">
            <h1 class="title">Login</h1>
            <div class="field">
                <label for="userName" class="label is-normal">User name</label>                
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
                    <button class="button is-link" :disabled=disableLoginButton @click="login">Login</button>
                </div>
                <div class="control">
                    <button class="button is-text" @click="clear">Clear form</button>
                </div>
            </div>            
            <p class="help" :class="statusClass">{{ statusMessage }}</p>
        </div>
    </div>
    <!-- <div>        
        <input class="input" placeholder="User name" type="text"  />
        <input class="input" placeholder="Password" type="password" v-model="user.password">
        <button >Log in</button>
        <button @click="clear">Clear form</button>
        <p>{{ statusMessage }}</p>
    </div> -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import router from '../router';

@Component
export default class LoginComponent extends Vue {
    user: { name: string, password: string} = { name: "", password: ""};
    disableLoginButton = false;
    statusMessage = '';

    clear() {
        this.user = { name: "", password: ""};
        this.disableLoginButton = false;
    }

    async login() {
        this.disableLoginButton = true;
        this.statusMessage = 'Loging in';
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
    }
}
</script>
