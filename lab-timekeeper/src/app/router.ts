import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./routes/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./routes/HomeView.vue'),
    },
  ],
})

export default router
