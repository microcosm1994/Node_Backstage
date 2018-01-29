<template>
  <div class="login">
    <h1>{{title}}</h1>
    <div><input type="text" placeholder="账号" v-model="account" @keyup.enter="login"></div>
    <div><input type="password" placeholder="密码" v-model="pwd" @keyup.enter="login"></div>
    <div class="login-btn" @click="login">
      <button>登 陆</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        title: 'Welcome to Eago',
        account: '',
        pwd: ''
      }
    },
    mounted () {
      this.remind()
    },
    methods: {
      login () {
        let self = this
        if (this.account === '' || this.pwd === '') {
          this.$message.error('请输入用户名和密码')
          return false
        }
        let user = {}
        user.username = this.account
        user.password = this.pwd
        if (user.username === 'admin') {
          this.$http({
            method: 'post',
            url: '/api/account/adminLogin',
            data: user
          }).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.$store.commit('setusersName', data.data.username)
              this.$store.commit('setusersUid', data.data._id)
              this.$store.commit('setusersPortrait', data.data.portrait)
              this.$store.commit('setloginStatus', '退出')
              this.$store.commit('setusersAdmin', true)
              this.$cookies.set('_name', data.data.username, {
                domain: 'localhost',
                path: '/'
              })
              this.$message({
                message: data.message,
                type: 'success'
              })
              self.$router.push({path: '/home'})
            } else {
              this.$message({
                message: data.message,
                type: 'error'
              })
            }
          })
        } else {
          this.$http({
            method: 'post',
            url: '/api/account/login',
            data: user
          }).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.$store.commit('setusersName', data.data.username)
              this.$store.commit('setusersUid', data.data._id)
              this.$store.commit('setusersPortrait', data.data.portrait)
              this.$store.commit('setloginStatus', '退出')
              this.$store.commit('setusersAdmin', false)
              this.$cookies.set('_name', data.data.username, {
                domain: 'localhost',
                path: '/'
              })
              this.$message({
                message: data.message,
                type: 'success'
              })
              self.$router.push({path: '/home'})
            } else {
              this.$message({
                message: data.message,
                type: 'error'
              })
            }
          })
        }
      },
      remind: function () {
        let id = this.$cookies.get('_id')
        if (id) {
          this.$message({
            message: '检测到您已登陆',
            type: 'success'
          })
          this.$router.push({path: './home'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    padding-top: 200px;
  }

  h1 {
    font-weight: 700;
    color: #0f88eb;
    font-size: 58px;
  }

  input {
    width: 360px;
    height: 50px;
    margin-top: 30px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 20px;
    box-sizing: border-box;
  }

  .login-btn {
    width: 360px;
    height: 50px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .login-btn button {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    background: #0f88eb;
    color: #fff;
    cursor: pointer;
    font-size: 24px;
    border-radius: 5px;
    margin: 0;
  }

  .login-btn button:hover {
    background: #0d79d1;
  }

  .login-btn button:active {
    background: #0f88eb;
  }
</style>
