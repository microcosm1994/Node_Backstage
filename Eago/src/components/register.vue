<template>
  <div class="register">
    <h1>{{title}}</h1>
    <div><input type="text" placeholder="账号" v-model="account"></div>
    <div><input type="password" placeholder="密码" v-model="pwd"></div>
    <p><a href="javascript:;"><router-link to="./login">返回登陆</router-link></a></p>
    <div class="register-btn" v-on:click="register()">
      <button>注 册</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        title: '注册账号',
        account: '',
        pwd: ''
      }
    },
    methods: {
      register () {
        let self = this
        if (this.account === '' || this.pwd === '') {
          this.$message.error('请填写用户名和密码')
          return false
        }
        let user = {
          username: this.account,
          password: this.pwd
        }
        this.$http.post('/api/account/register', user).then((response) => {
          let data = response.data
          if (data.status === 0) {
            self.$router.push({path: '/login'})
          } else {
            this.$message.error(data.message)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register {
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

  .register-btn {
    width: 360px;
    height: 50px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .register-btn button {
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

  .register-btn button:hover {
    background: #0d79d1;
  }

  .register-btn button:active {
    background: #0f88eb;
  }
</style>
