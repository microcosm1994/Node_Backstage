import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import resource from 'vue-resource'

Vue.use(Router)
Vue.use(resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
