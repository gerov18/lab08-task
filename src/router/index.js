import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Thread from '../views/Threads/Thread.vue'
import Message from '../views/Threads/Message.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/views/Threads/Thread.vue',
    name: 'Thread',
    component: Thread
  },
  {
    path: '/views/Threads/Thread.vue',
    name: 'Message',
    component: Message
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
