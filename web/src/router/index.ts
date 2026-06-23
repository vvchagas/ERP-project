import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/AppView.vue')
    },
    {
      name: 'home-legacy',
      path: '/home',
      component: () => import('../views/AppView.vue')
    },
    {
      name: 'sync',
      path: '/sync',
      component: () => import('../views/SyncNuvemShopView.vue')
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('../views/AboutView.vue')
    }
  ],
})

export default router
