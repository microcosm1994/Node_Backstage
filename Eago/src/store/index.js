import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    title: '',
    loginStatus: '',
    user: {},
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
    setuser (state, obj) {
      state.user = obj
    },
    search_text (state, string) {
      state.search.text = string
    },
    source (state, data) {
      state.source = data
    }
  }
})
