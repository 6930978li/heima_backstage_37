import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login.vue'
import Index from '@/pages/index.vue'
import Welcome from '@/pages/welcome.vue'
import PostList from '@/pages/postList.vue'
import PostAdd from '@/pages/postAdd.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/index',
      component: Index,
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'Welcome',
          path: 'wel',
          component: Welcome
        },
        {
          name: 'PostList',
          path: 'postList',
          component: PostList
        },
        {
          name: 'PostAdd',
          path: 'postAdd',
          component: PostAdd
        }
      ]

    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('heima_backstage_37_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
