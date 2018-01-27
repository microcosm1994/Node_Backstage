import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    title: '',
    loginStatus: '',
    user: {
      uid: '',
      name: '请登录',
      portrait: ''
    },
    search: {
      text: '',
      result: {}
    }
  },
  mutations: {
    setTitle (state, string) {
      state.title = string
    },
    setloginStatus (state, string) {
      state.loginStatus = string
    },
    setusersName (state, string) {
      state.user.name = string
    },
    setusersPortrait (state, string) {
      state.user.portrait = string
    },
    setusersUid (state, string) {
      state.user.uid = string
    },
    search_text (state, string) {
      state.search.text = string
    },
    search_result (state, data) {
      state.search.result = data
    }
  }
})
