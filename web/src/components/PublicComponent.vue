<template>
    <div>
        <h1>This is the public page</h1>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PublicComponent extends Vue {
    
}
</script>
