import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: 'Welcome',
    children: [
      {
        path: 'Welcome',
        component: () => import('../views/Welcome.vue')
      },
      {
        path: 'users',
        component: () => import('../views/list.vue')
      },
      {
        path: 'categories',
        component: () => import('../views/categories.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/list.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token && to.path != '/login') {
    next('/login')
  } else if (token && to.path == '/login') {
    next('/')
  } else {
    next()
  }
})

export default router
