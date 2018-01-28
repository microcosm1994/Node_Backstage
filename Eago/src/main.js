// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementui from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import global from './global'
import cookie from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementui)
Vue.use(global)
Vue.use(cookie)

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
Vue.prototype.$http = axios
// Vue.http.options.emulateJSON = true
// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//   'Content-Type': 'multipart/form-data'
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.loginkeep()
  },
  methods: {
    loginkeep: function () {
      let id = this.$cookies.get('_id')
      let adminId = '5a6c277c048c364ddf629dfd'
      if (id) {
        if (id === adminId) {
          this.$http.get('/api/account/adminId?_id=' + id).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.$cookies.set('_name', data.data.username, {
                domain: 'localhost',
                path: '/'
              })
              this.$store.commit('setusersName', data.data.username)
              this.$store.commit('setusersUid', data.data._id)
              this.$store.commit('setusersPortrait', data.data.portrait)
              this.$store.commit('setusersAdmin', true)
            } else {
              this.$message({
                message: '获取用户信息失败，请退出后重新登录',
                type: 'error'
              })
            }
          })
          this.$store.commit('setloginStatus', '退出')
          this.$router.push({path: '/home'})
        } else {
          this.$http.get('/api/account/user?_id=' + id).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.$cookies.set('_name', data.data.username, {
                domain: 'localhost',
                path: '/'
              })
              this.$store.commit('setusersAdmin', false)
              console.log('set')
              this.$store.commit('setusersName', data.data.username)
              this.$store.commit('setusersUid', data.data._id)
              this.$store.commit('setusersPortrait', data.data.portrait)
            } else {
              this.$message({
                message: '获取用户信息失败，请退出后重新登录',
                type: 'error'
              })
            }
          })
          this.$store.commit('setloginStatus', '退出')
          this.$router.push({path: '/home'})
        }
      } else {
        this.$message({
          message: '检测到您没有登陆',
          type: 'info'
        })
        this.$store.commit('setloginStatus', '登陆')
        this.$router.push({path: '/login'})
      }
    }
  }
})
