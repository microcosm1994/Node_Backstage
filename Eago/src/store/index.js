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
    },
    angleList: [],
    terraceList: [],
    countryList: []
  },
  mutations: {
    // 搜索结果页标题
    setTitle (state, string) {
      state.title = string
    },
    // 登录状态
    setloginStatus (state, string) {
      state.loginStatus = string
    },
    // 用户
    setuser (state, obj) {
      state.user = obj
    },
    // 搜索内容
    search (state, obj) {
      state.search.text = obj
    },
    // 素材
    source (state, data) {
      state.source = data
    },
    // 页数
    page (state, obj) {
      state.page = obj
    },
    // 素材数量
    sourceCount (state, number) {
      state.sourceCount = number
    },
    // 分类
    setangleList (state, array) {
      state.angleList = array
    },
    // 平台
    setterraceList (state, array) {
      state.terraceList = array
    },
    // 国家
    setcountryList (state, array) {
      state.countryList = array
    }
  }
})
