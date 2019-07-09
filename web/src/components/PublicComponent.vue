<template>
    <div>
        <menu-component></menu-component>
        <p>This is the public page</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MenuComponent from './MenuComponent.vue';

Vue.component('menu-component', MenuComponent);

@Component
export default class PublicComponent extends Vue {
    
}
</script>
