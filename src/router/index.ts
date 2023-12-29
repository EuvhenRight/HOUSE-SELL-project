import { createRouter, createWebHistory } from 'vue-router'
import About from '../page/AboutView.vue'
import Home from '../page/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: 'About'
      }
    }
  ]
})

export default router
