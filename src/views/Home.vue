<template>
    <h1>Threads</h1>
    <div v-if="threads.length" class="thread-container">
        <div v-for="(thread, threadIndex) in threads" :key="thread" class="thread"
            :class="[
                thread.length > 1 && collapsed ? 'thread-collapsed' : ''
            ]"
        @click="toggleCollapse(thread)">
            <div v-if="collapsed && thread.length > 1" :class="{ 'msg-bar' : collapsed}">
                <h1>{{thread.length}} index: {{threadIndex}} messages</h1>
            </div>
            <div v-for="(message) in thread" :key="message.id" class="message" @click="toggleCollapsed(thread, threadIndex)">
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
    </div>
    <div v-else>loading messages...</div>
</template>

<script>
export default {
    data() {
        return{
            threads: [],
            thread: [],
            collapsed: true

        }
    },
    mounted() { 
        fetch('http://localhost:3000/threads')
        .then((res) => res.json())
        .then(data => this.threads = data)
        .catch(err => console.log(err.message))
    },
    methods: {
        toggleCollapse(thread, ThreadIndex){
            this.collapsed = !this.collapsed
        },
        gggg(message){
            console.log(message.text, index)
        }

        
        
    }
}


</script>

<style lang="scss">
    @import './public/style'; 
    
    .low{
        color: $low;
    }
    .bar-high{
        color: $msgBarHigh;
    }
    .title-high{
        color: $titleHigh;
    }

    .thread{
        height: 100%;
        margin-top: 40px !important;
        min-width: 320px;
        max-width: 768px;
        margin: 24px auto;
        position: relative

    }


    .message{
        @include flexPosition(center, initial);
        justify-content: space-between;
        background: white;
        height: 120px;
        width: 100%;
        margin: 10px 0;
        border-radius: 10px;
        box-shadow: 11px 12px 40px 7px rgba(0,0,0,0.2);
    }

    

    .message-content{
        width: 70%;
        @include flexPosition(space-around, flex-start);
        flex-direction: column;
        margin: 24px;
        text-align: left;
        h1{
            font-size: 18px;
            margin: 0;
        }
        p{
            margin: 0
        }
        p:last-of-type{
            margin-top: 16px;
        }
    
    }

    .message-info{
        @include flexPosition(space-around, flex-end);
        flex-direction: column;
        margin: 24px;
        text-align: right;

        p{
            margin: 0;
        }
    }

    .thread-collapsed{
        $max: 5; //max amount messages which overlap can be viewed when collapsed
        $step: 8px;

        display: grid;


        .message{
            grid-row: 1;
            grid-column: 1;
            margin: 0;
            @for $i from 2 through $max{
            &:nth-of-type(#{$i}){
                margin-top: #{-(($i - 1) * $step)};
                margin-left: #{-(($i - 1) * $step)};
            }
        }
    }

    .msg-bar{
        width: fit-content;
        margin: 0;
        background: lightblue;
        position: absolute;
        top: -24px;
        right: 36px;
        padding: 2px 38px;
        border-radius: 10px;
        h1{
            font-size: 16px;
            color: white;
            margin: 0;
        }

    .bar-high{
        background: $msgBarHigh;
    }
    }

        
    }


    

</style>




