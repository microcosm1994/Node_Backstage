import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import eago from '@/components/eago'
import add from '@/components/add'
import library from '@/components/library'
import register from '@/components/register'
import accountPage from '@/components/accountPage'
import setings from '@/components/setings'
import personal from '@/components/personal'
// import resource from 'vue-resource'

Vue.use(Router)
// Vue.use(resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          name: 'eago',
          component: eago
        },
        {
          path: '/add',
          name: 'add',
          component: add
        },
        {
          path: '/library',
          name: 'library',
          component: library
        },
        {
          path: '/register',
          name: 'register',
          component: register
        },
        {
          path: '/accountPage',
          name: 'accountPage',
          component: accountPage
        },
        {
          path: '/setings',
          name: 'setings',
          component: setings
        },
        {
          path: '/personal',
          name: 'personal',
          component: personal
        }
      ]
    }
  ]
})
