<template>
    <div>
        <input type="text" v-model="newItem.text"/>
        <button @click="addItem">Add new Item</button>
        <button @click="clearItem">ClearItem</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class AddItemComponent extends Vue {
    newItem = { id: 0, text: '' }

    clearItem() {
        this.newItem.text = '';
    }

    addItem() {
        this.$emit('addedItem', {id: 0, text: this.newItem.text });
        this.clearItem();
    }
}
</script>
