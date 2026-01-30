import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginVue.vue'
import RegisterVue from '@/views/RegisterVue.vue'
import TareasVue from '@/views/TareasVue.vue'
import { getCurrentUser } from '@/firebase'
import WorkspaceVue from '@/views/WorkspaceVue.vue'
const routes = [
  {
    path: '/tareas',
    component: TareasVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: LoginVue,
  },
  {
    path: '/register',
    component: RegisterVue,
  },
  {
    path: '/',
    redirect: '/tareas',
  },
  {
    path: '/workspace',
    component: WorkspaceVue,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  try {
    const user = await getCurrentUser()

    if (to.meta.requiresAuth && (!user || !user.emailVerified)) {
      return next('/login')
    }

    if ((to.path === '/login' || to.path === '/register') && user && user.emailVerified) {
      return next('/tareas')
    }

    return next()
  } catch (e) {
    return next('/login')
  }
})

export default router
