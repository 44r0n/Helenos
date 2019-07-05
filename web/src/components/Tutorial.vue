<template>
    <div>
        <h1>{{message}}</h1>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Tutorial extends Vue {
	message: string = 'Hello Vue!';
}
</script>

