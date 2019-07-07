<template>
    <div>
        <p>{{ message }}</p>
        <input type="text" v-model="message">
        <button @click="reverseMessage">Reverse message</button>
        <p>Preview reversed message: {{ previewReversed }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Click extends Vue {
    message: String = "Hello vue.js";

    reverseMessage() {
        this.message = this.message.split('').reverse().join('');
    }

    get previewReversed(): string {
        return this.message.split('').reverse().join('');
    }
}
</script>
