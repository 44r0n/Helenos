<template>
    <div class="field">
        <label class="label">{{ labelText }}</label>                
        <div class="control">
            <input class="input" :class="inputClass" type="text" ref="input" :value="value" @input="$emit('input', $event.target.value)" />
            <!-- TODO: comprobador de nombres según tecleas. Con WATCH -->
            <!-- <span class="icon is-small is-left" >
                <fa-icon :icon="['fas', 'user']" />
            </span> -->
            <!-- <span class="icon is-small is-right">
                <fa-icon v-if="userNameLoad" :icon="['fas', 'spinner']"value  spin/>
                <fa-icon v-if="userNameError" :icon="['fas', 'excalamation']" />
                <fa-icon v-if="userNameOk" :icon="['fas', 'check']" />
            </span> -->
        </div>
        <!-- <p class="help" :class="emptyStatusClass" >
            <fa-icon v-if="!loading" :icon="['fas', emptyHelperTextIcon ]" />
            <fa-icon v-if="loading" :icon="['fas', 'spinner' ]" spin />
            The user name cannot be empty</p> -->
        <!-- <p class="help" :class="statusClass" ><fa-icon :icon="['fas', helperTextIcon ]" /> The user name must have at least 4 characters</p>
        <p class="help" :class="statusClass" ><fa-icon :icon="['fas', helperTextIcon ]" /> The user name must be unique</p> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InputText extends Vue {
    // @Prop() labelFor: string;
    @Prop() labelText: string;
    @Prop() inputClass?: string;
    @Prop() value: string;
}
</script>
