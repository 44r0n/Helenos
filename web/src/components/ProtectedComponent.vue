<template>
    <div>
        <h1>Protected zone</h1>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import router from '../router';

@Component
export default class ProtectedComponent extends Vue {
    message: string = '';

    created() {
        this.checkProtectedZone();
    }

    async checkProtectedZone() {
        if (localStorage.getItem('siteUser') === null) {
            this.redirect();
        }        
        
        try {
            const userToken = localStorage.getItem('siteUser');
            const axiosResponse = await axios.post('http://localhost:3000/api/v1/protected',null, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('siteUser')
                }
            });
            this.message = axiosResponse.data.message;
        } catch (error) {
            this.redirect();
            console.error(error.response.data.message);
            
        }
    }

    redirect() {
        router.push('Login');
    }
}
</script>
