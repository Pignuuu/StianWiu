import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '../views/DefaultView.vue'

const routes = [
  {
    path: '/',
    name: 'default',
    component: DefaultView
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes
})

export default router
