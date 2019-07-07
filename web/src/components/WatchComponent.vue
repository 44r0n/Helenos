<template>
    <div>
        <p>Ask a yes/no question:</p>
        <input type="text" v-model="question">
        <p>{{ answer }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import axios from 'axios';

@Component
export default class WatchComponent extends Vue {
    question: string = '';
    answer: string = 'I cannot give you an answer until you ask a question!';
    debouncedGetAnswer: (() => Promise<void>) & _.Cancelable;

    @Watch('question')
    onQuestionChanged(val: string, oldVal: string) {
        this.answer = 'Waiting you to stop typing...';
        this.debouncedGetAnswer();
    }

    created() {        
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
    }

    async getAnswer() {
        if(this.question.indexOf('?') === -1) {
            this.answer = 'Questions usually contain a question mark ;-)';
            return;
        }

        if(this.question.length === 0) {
            this.answer = 'I cannot give you an answer until you ask a question!';
        }

        this.answer = 'Thinking...';
    
        try {
            const axiosResponse = await axios.get('https://yesno.wtf/api');
            this.answer = axiosResponse.data.answer;
        } 
        catch (error) {
            this.answer = 'Error processing request';
            console.error(error);
        }
        
    }
}
</script>