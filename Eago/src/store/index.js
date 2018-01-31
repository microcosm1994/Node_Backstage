import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    title: '',
    loginStatus: '',
    user: {},
    source: [],
    page: {},
    sourceCount: 0,
    search: {
      label: '',
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
    search (state, obj) {
      state.search.text = obj
    },
    source (state, data) {
      state.source = data
    },
    page (state, obj) {
      state.page = obj
    },
    sourceCount (state, number) {
      state.sourceCount = number
    }
  }
})
