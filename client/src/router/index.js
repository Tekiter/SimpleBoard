import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import boardUtil from '@/utils/board'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    async beforeEnter(to, from, next) {
      try {
        const boards = await boardUtil.getBoardList()
        if (boards.length > 0) {
          next(`/${boards[0]._id}`)
        }
        else {
          next('/notfound')
        }
      }
      catch (error) {
        next('/notfound')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:board_id(\\d+)',
    name: 'board',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/board/postlist.vue')
      },
      {
        path: 'write',
        component: () => import('../components/board/postwrite.vue'),
        meta: { loginRequired: true }
      },
      {
        path: ':post_id',
        component: () => import('../components/board/postview.vue')
      }
      
    ]
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
