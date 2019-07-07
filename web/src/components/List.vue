<template>
    <div>
        <ol>
            <li v-for="todo in todos" :key="todo.text">
                {{ todo.text }}
            </li>
        </ol>
        <ol>
            <todo-item
                v-for="item in groceryList"
                :todo="item"
                :key="item.id"></todo-item>
        </ol>
        <AddItemComponent @addedItem="addItem"></AddItemComponent>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TodoItem from "./TodoItem.vue";
import AddItemComponent from "./AddItemComponent.vue";

Vue.component('todo-item', TodoItem);
Vue.component('AddItemComponent', AddItemComponent);

@Component
export default class List extends Vue {
    todos = [
        { text: 'Learn Javascript' },
        { text: 'Learn Typescript' },
        { text: 'Learn Vue' },
        { text: 'Now, you can build something awesome'}
    ];

    groceryList = [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
    ];    

    addItem(args: any) {
        let newItem = args as {id: number, text: string};
        newItem.id = this.groceryList.length;
        this.groceryList.push(newItem);
    }
}
</script>

