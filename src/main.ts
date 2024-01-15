import App from './App.vue'
import './assets/main.scss'
import router from './router'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// ANIMATIONS
app.use(autoAnimatePlugin)
app.mount('#app')

// DYNAMIC TITLE
router.beforeEach((to) => {
  document.title = (to.meta.title as string) ?? 'Real Estate'

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})
