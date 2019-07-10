<template>
    <div>
        <p>This is the public page</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PublicComponent extends Vue {
    
}
</script>
