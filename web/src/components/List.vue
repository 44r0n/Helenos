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
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TodoItem from "./TodoItem.vue";
Vue.component('todo-item', TodoItem);
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
    ]
}
</script>

