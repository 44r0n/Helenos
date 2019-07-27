<template>    
    <input-text 
        :labelText='labelText'
        :inputClass='inputClassStatus'                   
        :leftIcon='leftIcon'                 
        :rightIcon='rightIcon'
        :rightIconSpin='rightIconSpin'
        :type='type'             
        v-model='inputValue'                 
    />    
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import status from './status';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import inputText from '../utils/inputText.vue';
import { faInfo, faExclamation, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faSpinner, faExclamation, faInfo);

Vue.component('input-text', inputText);

@Component
export default class StatusInput extends Vue {    
    @Prop() labelText: string;
    @Prop() type: string;
    @Prop() status: status;
    @Prop() leftIcon?: IconDefinition;
    @Prop() value: string;
    

    private lastStatusClass: string;

    get rightIcon(): IconDefinition | undefined {
        switch (this.status) {
            case 'info':
                return undefined;
            case 'error':
                return faExclamation;
            case 'ok':
                return faCheck;
            case 'load':
                return faSpinner;
        }
    }

    get rightIconSpin() { return  this.status === 'load'; }

    get inputClassStatus():string {
        switch (this.status) {
            case 'info':
                this.lastStatusClass = 'is-info';
                return 'is-info';
            case 'error':
                this.lastStatusClass = 'is-danger';
                return 'is-danger';
            case 'ok':
                this.lastStatusClass = 'is-success';
                return 'is-success';
            case 'load':
                return this.lastStatusClass;
        }
    }

    get inputValue(): string {
        return this.value;
    }

    set inputValue(newValue: string) {
        this.$emit('input', newValue);
    }
}
</script>
