import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/confession',
      name: 'confession',
      // 表白信页面
      component: () => import('../views/ConfessionView.vue')
    },
    {
      path: '/memories',
      name: 'memories',
      // 回忆页面
      component: () => import('../views/MemoriesView.vue')
    }
  ]
})

export default router
