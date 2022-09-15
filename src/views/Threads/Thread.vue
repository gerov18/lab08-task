<template>
    <div v-for="message of thread" :key="message.id" class="thread">
        <h1>{{ message.id }}</h1>        
    </div>
</template>

<script>
import Message from './Message.vue';

export default {
    data() {
        props: ['thread']
        
        message: []
    },
    mounted() { 
        fetch('http://localhost:3000/threads')
        .then((res) => res.json())
        .then(data => this.threads = data)
        .catch(err => console.log(err.message))
    },
    components: {
    Message,
    Message
}

}
</script>

<style>



</style>