import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  
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
        component: () => import('../components/board/postwrite.vue')
      },
      {
        path: ':post_id',
        component: () => import('../components/board/postview.vue')
      }
      
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
