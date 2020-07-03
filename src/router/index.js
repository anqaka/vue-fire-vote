import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../db'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/topic/:id',
    name: 'topic',
    component: () => import(/* webpackChunkName: "topic" */ '../views/Topic.vue'),
    props: true
  },
  {
    path: '/admin-dashboard',
    name: 'Admin dasboard',
    component: () => import(/* webpackChunkName: "topic" */ '../views/AdminDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next({ path: '/', query: { redirect: to.fullPath } })
  } else if (!requiresAuth && !currentUser) {
    next()
  } else {
    next()
  }
})

export default router
