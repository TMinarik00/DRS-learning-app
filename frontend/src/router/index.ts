import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
    { path: '/register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
    { path: '/', component: () => import('../views/HomeView.vue'), meta: { auth: true } },
    { path: '/ucenje', component: () => import('../views/LearnView.vue'), meta: { auth: true } },
    { path: '/kviz', component: () => import('../views/QuizView.vue'), meta: { auth: true } },
    { path: '/ljestvica', component: () => import('../views/LeaderboardView.vue'), meta: { auth: true } },
    { path: '/profil', component: () => import('../views/ProfileView.vue'), meta: { auth: true } },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!auth.checked) await auth.loadUser()

  if (to.meta.auth && !auth.user) return '/login'
  if (to.meta.guest && auth.user) return '/'
})

export default router
