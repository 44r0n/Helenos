<template>
    <div class="field">
        <label class="label">{{ labelText }}</label>                
        <div class="control" :class="iconClass" >
            <input class="input" :class="inputClass" type="text" ref="input" :value="value" @input="$emit('input', $event.target.value)" />            
            <span v-if="leftIcon !== undefined" class="icon is-small is-left" >
                <fa-icon :icon="[leftIcon.prefix, leftIcon.iconName]" />
            </span>
            <span v-if="rightIcon !== undefined" class="icon is-small is-right">
                <fa-icon :icon="[rightIcon.prefix, rightIcon.iconName]" :spin="rightIconSpin"/>
            </span>
        </div>        
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component
export default class InputText extends Vue {    
    @Prop() labelText: string;
    @Prop() inputClass?: string;
    @Prop() value: string;
    @Prop() leftIcon?: IconDefinition;
    @Prop() rightIcon?: IconDefinition;
    @Prop() rightIconSpin?: boolean;

    get iconClass(): string {
        const leftIconClass = this.leftIcon !== undefined ? 'has-icons-left' : '';
        const rightIconClass = this.rightIcon !== undefined ? 'has-icons-right' : '';
        return leftIconClass + ' ' + rightIconClass;
    }

    //TODO: sustituir por 4 estados: info, error, ok, load en un componente nuevo
}
</script>
