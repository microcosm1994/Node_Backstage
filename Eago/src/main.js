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
    this.getcookie()
  },
  methods: {
    getcookie: function () {
      let id = this.$cookies.get('_id')
      if (id) {
        this.$http.get('/api/account/user?_id=' + id).then((response) => {
          let data = response.data
          if (data.status === 0) {
            console.log(data)
            this.$cookies.set('_name', data.data.username, {
              domain: 'localhost',
              path: '/'
            })
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
        this.$message({
          message: '检测到您已登陆',
          type: 'success'
        })
      }
    }
  }
})
