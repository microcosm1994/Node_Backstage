exports.install = function (Vue, options) {
  Vue.prototype.aa = function () {
    console.log(1)
  }
}
