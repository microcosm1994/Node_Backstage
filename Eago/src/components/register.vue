<template>
  <div class="register">
    <h1>{{title}}</h1>
    <el-alert
      title="管理员拥有本后台管理系统所有账号的管理权限，请谨慎操作！"
      center
      type="info">
    </el-alert>
    <el-alert
      title="因后台系统不对外开放，所以简化了一些不必要的操作流程。"
      center
      type="info">
    </el-alert>
    <el-alert
      title="用户名应尽量使用公司职员英文名为账号"
      center
      type="info">
    </el-alert>
    <div><input type="text" placeholder="账号" v-model="account"></div>
    <div><input type="password" placeholder="密码" v-model="pwd"></div>
    <el-dialog title="请输入管理员密码" :visible.sync="dialogFormVisible">
      <el-form :model="Administrators">
        <el-form-item label="管理员密码" :label-width="formLabelWidth">
          <el-input v-model="Administrators.password"  type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="this.testAdmin">生成账号</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <div class="register-btn" v-on:click="register()">
      <button>生成账号</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        title: '生成账号',
        account: '',
        pwd: '',
        dialogFormVisible: false,
        Administrators: {
          username: 'admin',
          password: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      register () {
        let id = this.$cookies.get('_id')
        let adminId = '5a6c277c048c364ddf629dfd'
        if (this.account === '' || this.pwd === '') {
          this.$message.error('请填写用户名和密码')
          return false
        }
        if (id === adminId) {
          this.dialogFormVisible = true
        } else {
          this.$message.error('你不是管理员，无法生成账号，请联系管理员为你生成账号')
        }
      },
      testAdmin: function () {
        let userAdmin = {}
        userAdmin.username = this.Administrators.username
        userAdmin.password = this.Administrators.password
        let user = {
          username: this.account,
          password: this.pwd
        }
        this.$http({
          method: 'post',
          url: '/api/account/adminLogin',
          data: userAdmin
        }).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              message: data.message,
              type: 'success'
            })
            this.$http.post('/api/account/register', user).then((response) => {
              let data = response.data
              if (data.status === 0) {
                this.$message({
                  message: data.message,
                  type: 'success'
                })
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
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
