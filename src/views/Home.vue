<template>
    <div v-if="threads.length" class="thread-container">
        <div v-for="(thread, threadIndex) in threads" :key="threadIndex" class="thread threadCollapsed"
            :class="[ thread.isCollapsed & thread.length > 1? 'thread-expanded' : '']"
        @click="toggleCollapse(thread)">
            <div v-if=" thread.length > 1" class="msg-bar" :class="{ 'bar-hide' : thread.isCollapsed}">
                <h1 v-for="(message, messageIndex) in thread" :key="message.id"
                    :class="[
                        messageIndex == thread.length-1 ?  '' : 'bar-hide',
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
                    <p>{{ moment(message.created_at).format('MMM Do') }}</p>
                </div>                
            </div>
        </div>
    </div>
    <div v-else>loading messages...</div>
</template>

<script>
let moment = require('moment')
export default {
    data() {
        return{
            moment:moment,
            threads: []
        }
    },
    mounted() { 
        fetch('http://localhost:3000/threads')
        .then((res) => res.json())
        .then(data => this.threads = data)
        .then(console.log('test mounted'))
        .catch(err => console.log(err.message))

        for(let i = 0; i < this.threads.length; i++){
            if (this.threads[i].length > 1){
                this.threads[i].isCollapsed = true
            }
        }

    },
    beforeUpdated(){
            
    },
    methods: {
        toggleCollapse(thread){
            thread.isCollapsed = !thread.isCollapsed
        }
        
        
    }
}


</script>

<style lang="scss">
    @import './public/style'; 

    body{
        overflow-x: scroll !important;
    }
    
    .low{
        color: $low;
    }
    .bar-high{
        color: $msgBarHigh;
    }
    .title-high{
        color: $titleHigh;
    }

    .thread-container{
        @include flexPosition(initial, center);
        flex-direction: column;
        min-width: 320px;
        max-width: 768px;
    }

    .thread{
        height: 100%;
        width: 100%;
        margin-top: 40px;
        
        position: relative

    }


    .message{
        @include flexPosition(center, initial);
        justify-content: space-between;
        background: white;
        height: 100%;
        width: 100%;
        min-height: 120px;
        margin: $expandedMargin;
        border-radius: 10px;
        box-shadow: 11px 12px 40px 7px rgba(0,0,0,0.2);
    }

    

    .message-content{
        width: 75%;
        @include flexPosition(space-around, flex-start);
        flex-direction: column;
        margin: 1.25em;
        margin-right: 0;
        text-align: left;
        h1{
            font-size: 1.25em;
            margin: 0;
        }
        p{
            margin: 0
        }
        p:last-of-type{
            margin-top: 1em;
        }
    
    }

    .message-info{
        @include flexPosition(initial, flex-end);
        flex-direction: column;
        margin: 1.25em;
        margin-left: 0;
        text-align: right;

        p{
            margin: 0;
        }
    }

    .threadCollapsed{
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
                margin-right: #{-(($i - 1) * $step)};
                }
            &{

            }
            }
        }
    }

    .thread-expanded{
        display: block;
        margin: 1.25em auto;
        .message{
            margin: $expandedMargin !important;
        }
    }

    .msg-bar{
        h1{
        width: fit-content;
        margin: 0;
        background: lightblue;
        position: absolute;
        top: -24px;
        right: 36px;
        padding: 2px 38px;
        border-radius: 10px;
            font-size: 1em;
            color: white;
            margin: 0;
        }
    }

    .thread:first-of-type{
        .msg-bar h1{
            top: -34px;
        }
    }

    .bar-hide{
        display: none;
    }

    .bar-low{
        background: $low !important;
    }

    .bar-high{
        background: $msgBarHigh !important;
    }



        



    

</style>




