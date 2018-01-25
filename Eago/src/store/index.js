import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    count: 0,
    search: {
      text: '',
      result: {}
    }
  },
  mutations: {
    search_text (state, string) {
      state.search.text = string
    },
    search_result (state, data) {
      state.search.result = data
    }
  }
})
