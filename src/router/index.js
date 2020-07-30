import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'Home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account/:username',
    name: 'Account',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/manage',
    name: 'Manage',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/test/' // 若没有部署在服务器的前端根目录，则需要修改
})

router.beforeResolve((to, from, next) => {
  console.log(from.name)
  if (to.meta.requireAuth && !(store.getters.getLoginState.isAuthenticated === 'true')) {
    store.commit('changeLoginDialogState', true)
    next({ name: from.name })
  } else next()
})

export default router
