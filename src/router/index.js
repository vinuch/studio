import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // Routes with * are used as routing names in BottomNav. Don't change
  {
    name: 'About',
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    name: 'Dashboard', // *
    path: '/dash',
    component: () => import(/* webpackChunkName: "forgot_password" */ '../views/Dashboard.vue')
  },
  {
    name: 'ForgotPassword',
    path: '/forgot_password',
    component: () => import(/* webpackChunkName: "forgot_password" */ '../views/auth/ForgotPassword.vue')
  },
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Inventory', // *
    path: '/inventory',
    component: () => import(/* webpackChunkName: "login" */ '../views/Inventory.vue')
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    name: 'Manage', // *
    path: '/manage',
    component: () => import(/* webpackChunkName: "login" */ '../views/Manage.vue')
  },
  {
    name: 'Orders', // *
    path: '/orders',
    component: () => import(/* webpackChunkName: "login" */ '../views/Orders.vue')
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
