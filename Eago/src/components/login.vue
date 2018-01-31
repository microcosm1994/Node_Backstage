<template>
  <div class="login">
    <h1>{{title}}</h1>
    <div class="login-form">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account" @keyup.enter.native="submitForm(loginForm)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" @keyup.enter.native="submitForm(loginForm)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)">登 录</el-button>
          <el-button @click="resetForm('loginForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        title: 'Welcome to Eago',
        loginForm: {
          account: '',
          password: ''
        },
        loginRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.remind()
    },
    methods: {
      submitForm (form) {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            let self = this
            let user = {}
            user.username = form.account
            user.password = form.password
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
                if (data.data.isAdmin) {
                  this.$store.commit('setusersAdmin', true)
                } else {
                  this.$store.commit('setusersAdmin', false)
                }
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
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      login () {

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
  .login-form{
    width: 340px;
    margin: 0 auto;
    margin-top: 50px;
  }
</style>
