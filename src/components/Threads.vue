<template>
  <div v-for="(thread, threadIndex) in threads" :key="threadIndex" class="thread"
            :class="[
                thread.length > 1 ? 'thread-collapsed' : '',
            ]"
        @click="toggleCollapse(threadIndex)">
            <div v-if="collapsed && thread.length > 1" :class="{ 'msg-bar' : ' '}">
                <h1 v-for="(message, messageIndex) in thread" :key="message.id"
                    :class="[
                        messageIndex == 0 ?  '' : 'bar-hide',
                        message.score <= 5 ?  'bar-low' : 'bar-high'
                    ]"
                >{{thread.length}} messages</h1>
            </div>
            <div v-for="message in thread" :key="message.id" class="message">
                <div class="message-content">
                    <h1 :class="[
                        message.score >= 6 ? 'title-high' : 'low'
                    ]"
                    >{{ message.subject }}</h1>
                    <p>{{ message.question }}</p>
                    <p>{{ message.text }}</p>
                </div>
                <div class="message-info">
                    <p>{{ message.team }}</p>
                    <p>{{ message.created_at }}</p>
                </div>                
            </div>
        </div>
        <button @click="test">k</button>
</template>

<script>
export default {
    data(){
        return{
            threads: []
        }
    },
    mounted(){
        fetch("http://localhost:3000/threads")
            .then((res) => res.json())
            .then(data => this.threads = data)
            .catch(err => console.log(err.message));
            console.log(this.threads[0])
            // console.log()
            
    }
}
</script>

<style>

</style>