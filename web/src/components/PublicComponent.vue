<template>
    <div class="container">   
        <font-awesome-icon :icon="['fab','galactic-republic']" size="10x" />
        <h1>This is the public page</h1>    
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGalacticRepublic);

Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component
export default class PublicComponent extends Vue {
    
}
</script>
