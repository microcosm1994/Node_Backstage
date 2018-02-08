exports.install = function (Vue, options) {
  /**
   * 获取管理员配置
   * */
  Vue.prototype.getconfig = function () {
    this.$http.get('/api/seting/getconfig').then((response) => {
      if (response.data.status === 0) {
        this.$store.commit('setangleList', response.data.data[0].angleList)
        this.$store.commit('setterraceList', response.data.data[0].terraceList)
        this.$store.commit('setcountryList', response.data.data[0].countryList)
      }
    })
  }
}
