import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    title: '',
    search: {
      text: '',
      result: {}
    }
  },
  mutations: {
    setTitle (state, string) {
      state.title = string
    },
    search_text (state, string) {
      state.search.text = string
    },
    search_result (state, data) {
      state.search.result = data
    }
  }
})
