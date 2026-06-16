import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/home',
      component: () => import('../views/AppView.vue')
    },
    {
      name: 'sync',
      path: '/sync',
      component: () => import('../views/SyncNuvemShopView.vue')
    }
  ],
})

export default router
