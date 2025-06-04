import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 我的爱情模块
    {
      path: '/love',
      name: 'love',
      component: () => import('../views/love/index.vue'),
      children: [
        {
          path: '',
          name: 'love-home',
          component: () => import('../views/love/HomePage.vue')
        },
        {
          path: 'confession',
          name: 'love-confession',
          component: () => import('../views/love/ConfessionPage.vue')
        },
        {
          path: 'memories',
          name: 'love-memories',
          component: () => import('../views/love/MemoriesPage.vue')
        }
      ]
    },
    // 保留原来的路径以保持兼容性
    {
      path: '/confession',
      redirect: '/love/confession'
    },
    {
      path: '/memories',
      redirect: '/love/memories'
    },
    // 基金投资模块
    {
      path: '/investment',
      name: 'investment',
      component: () => import('../views/investment/index.vue'),
      children: [
        {
          path: '',
          name: 'investment-home',
          component: () => import('../views/investment/HomePage.vue')
        },
        {
          path: 'details',
          name: 'investment-details',
          component: { render: () => h('div', '基金详情页面开发中...') }
        },
        {
          path: 'portfolio',
          name: 'investment-portfolio',
          component: { render: () => h('div', '投资组合页面开发中...') }
        }
      ]
    },
    // 奥特曼专区
    {
      path: '/ultraman',
      name: 'ultraman',
      component: () => import('../views/ultraman/index.vue'),
      children: [
        {
          path: '',
          name: 'ultraman-home',
          component: () => import('../views/ultraman/HomePage.vue')
        },
        {
          path: 'gallery',
          name: 'ultraman-gallery',
          component: { render: () => h('div', '奥特曼图鉴页面开发中...') }
        },
        {
          path: 'monsters',
          name: 'ultraman-monsters',
          component: { render: () => h('div', '怪兽图鉴页面开发中...') }
        }
      ]
    }
  ]
})

export default router
