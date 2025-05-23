import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/plugins/firebase'

// Firebaseの認証状態を監視
let currentUser: any = null
onAuthStateChanged(auth, (user) => {
  currentUser = user // 認証状態が変更された時にcurrentUserを更新
})
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

// 認証状態に基づくルート遷移の制御
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/' && !currentUser) {
//     // ログインしていない場合、ログイン画面にリダイレクト
//     next('/')
//   } else {
//     // ログインしている場合はそのまま遷移
//     next()
//   }
// })

export default router
