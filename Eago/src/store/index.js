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
      portrait: '',
      isAdmin: false
    },
    source: [],
    search: {
      text: ''
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
    setusersAdmin (state, string) {
      state.user.isAdmin = string
    },
    setusersUid (state, string) {
      state.user.uid = string
    },
    search_text (state, string) {
      state.search.text = string
    },
    source (state, data) {
      state.source = data
    }
  }
})
