<template>
    <div>
        <li>{{ todo.text }}</li>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class TodoItem extends Vue {
    @Prop() todo: { text: string }
}
</script>