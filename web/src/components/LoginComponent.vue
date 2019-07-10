<template>
    <div>        
        <input class="input" placeholder="User name" type="text" v-model="user.name" />
        <input class="input" placeholder="Password" type="password" v-model="user.password">
        <button :disabled=disableLoginButton @click="login">Log in</button>
        <button @click="clear">Clear form</button>
        <p>{{ statusMessage }}</p>
    </div>
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
