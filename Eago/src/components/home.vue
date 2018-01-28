<template>
  <div class="home">
    <headers></headers>
    <div class="home-container">
      <div class="home-sidebar">
        <ul>
          <li @click="">
            <a href="javascript:;">
              <router-link to="/library">素材库</router-link>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <router-link to="/add">添加素材</router-link>
            </a>
          </li>
        </ul>
      </div>
      <div class="home-route">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import headers from './head'

  export default {
    name: 'home',
    components: { headers },
    data () {
      return {
        title: 'home'
      }
    },
    mounted () {
      this.loginkeep()
    },
    methods: {
      loginkeep: function () {
        let id = this.$cookies.get('_id')
        let adminId = '5a6c277c048c364ddf629dfd'
        if (id) {
          if (id === adminId) {
            this.$http.get('/api/account/adminId?_id=' + id).then((response) => {
              let data = response.data
              if (data.status === 0) {
                this.$cookies.set('_name', data.data.username, {
                  domain: 'localhost',
                  path: '/'
                })
                this.$store.commit('setusersName', data.data.username)
                this.$store.commit('setusersUid', data.data._id)
                this.$store.commit('setusersPortrait', data.data.portrait)
                this.$store.commit('setusersAdmin', true)
              } else {
                this.$message({
                  message: '获取用户信息失败，请退出后重新登录',
                  type: 'error'
                })
              }
            })
            this.$store.commit('setloginStatus', '退出')
//            this.$router.push({path: '/home'})
          } else {
            this.$http.get('/api/account/user?_id=' + id).then((response) => {
              let data = response.data
              if (data.status === 0) {
                this.$store.commit('setusersAdmin', false)
                this.$store.commit('setusersName', data.data.username)
                this.$store.commit('setusersUid', data.data._id)
                this.$store.commit('setusersPortrait', data.data.portrait)
              } else {
                this.$message({
                  message: '获取用户信息失败，请退出后重新登录',
                  type: 'error'
                })
              }
            })
            this.$store.commit('setloginStatus', '退出')
//            this.$router.push({path: '/home'})
          }
        } else {
          this.$message({
            message: '检测到您没有登陆',
            type: 'info'
          })
          this.$store.commit('setloginStatus', '登陆')
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body{
    height: 100%;
    background: #F5F5F5;
  }
  .home{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .home-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    padding-top: 70px;
  }
  .home-sidebar{
    width: 180px;
    height: 100%;
    position: absolute;
    left: 0;
    top:0px;
    background: #394a59;
    padding-top: 70px;
  }
  .home-sidebar ul{
    width: 100%;
    height: 100%;
  }
  .home-sidebar ul li{
    width: 100%;
    height: 70px;
  }
  .home-sidebar ul li a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 70px;
    color:#fff;
    font-size: 18px;
  }
  .home-sidebar ul li a:hover{
    background: #2e3b46;
  }
  .home-route{
    width: 100%;
    padding-left: 180px;
  }
</style>
