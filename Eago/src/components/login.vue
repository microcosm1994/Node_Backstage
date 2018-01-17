<template>
  <div class="login">
    <h1>{{title}}</h1>
    <div><input type="text" placeholder="账号" v-model="account"></div>
    <div><input type="password" placeholder="密码" v-model="pwd"></div>
    <div class="login-btn" v-on:click="login()">
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
    methods: {
      login () {
        let self = this
        let user = {
          username: this.account,
          password: this.pwd
        }
        console.log(user)
        this.$http.post('/api/account/login', user).then((response) => {
          console.log(response.data)
          let data = response.data
          if (data.status === 0) {
            self.$router.push({path: '/home'})
          }
        })
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
