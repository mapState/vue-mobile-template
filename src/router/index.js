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
    component: () => import(/* webpackChunkName: "home" */ '../views/index.vue'),
      meta: {
        title: '云祝福'
    }
  },
  {
    path: '/blessing',
    name: 'blessing',
    component: () => import(/* webpackChunkName: "home" */ '../views/blessing.vue'),
    meta: {
      title: '云祝福'
    }
  },
  {
    path: '/answer',
    name: 'answer',
    component: () => import(/* webpackChunkName: "home" */ '../views/answer.vue'),
    meta: {
      title: '云祝福'
    }
  },
  {
    path: '/break',
    name: 'break',
    component: () => import(/* webpackChunkName: "home" */ '../views/break.vue'),
    meta: {
      title: '云祝福'
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
