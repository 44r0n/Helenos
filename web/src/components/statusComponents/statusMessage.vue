<template>
    <p class="help" :class="classStatus" >
        <fa-icon :icon="[icon.prefix, icon.iconName]" :spin="iconSpin"/>                   
        <slot></slot>
    </p>    
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faSpinner, faExclamation, faInfo } from '@fortawesome/free-solid-svg-icons';
import status from './status';

library.add(faCheck, faSpinner, faExclamation, faInfo);

@Component
export default class StatusMessage extends Vue {   
    @Prop() status: status;    

    get classStatus(): string {
        switch (this.status) {
            case 'info':
                return 'is-info';
            case 'error':
                return 'is-danger';
            case 'ok':
                return 'is-success';
            case 'load':
                return 'is-dark';
        }
        return '';
    }

    get icon(): IconDefinition {
        switch (this.status) {
            case 'info':
                return faInfo;
            case 'error':
                return faExclamation;
            case 'ok':
                return faCheck;
            case 'load':
                return faSpinner;
        }
    }

    get iconSpin() { return  this.status === 'load'; }
};
</script>

