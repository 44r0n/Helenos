<template>
    <div>
        <menu-component></menu-component>
        <input type="text" v-model="user.name" />
        <input type="password" v-model="user.password">
        <button :disabled=disableRegisterButton @click="register">Register</button>
        <button @click="clear">Clear form</button>
        <p>{{ statusMessage }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import MenuComponent from './MenuComponent.vue';

Vue.component('menu-component', MenuComponent);

@Component
export default class RegisterComponent extends Vue {
    user: { name: string, password: string } = { name: "", password: ""};
    disableRegisterButton = false;
    statusMessage = '';

    clear() {
        this.user = { name: "", password: ""};
        this.disableRegisterButton = false;
    }

    async register() {
        this.disableRegisterButton = true;
        this.statusMessage = 'Registering';
        try {
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/user/register', {
                UserName: this.user.name,
                Password: this.user.password
            });
            this.statusMessage = `Your new user id is ${axiosResponse.data.user}`;
        }
        catch(error) {
            this.statusMessage = error.response.data.messgage;
        }
    }
}
</script>
