import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ '../views/index.vue')
  },
  {
    path: '/blessing',
    name: 'blessing',
    component: () => import(/* webpackChunkName: "home" */ '../views/blessing.vue')
  },
  {
    path: '/answer',
    name: 'answer',
    component: () => import(/* webpackChunkName: "home" */ '../views/answer.vue')
  },
  {
    path: '/break',
    name: 'break',
    component: () => import(/* webpackChunkName: "home" */ '../views/break.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
