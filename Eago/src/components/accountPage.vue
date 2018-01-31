<template>
  <div class="accountPage">
    <h1>{{this.title}}</h1>
    <el-table
      :data="accountList"
      style="width: 80%;margin: 0 auto;">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>所属职员: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="account-modal">
      <el-dialog
        title="编辑账号"
        :visible.sync="accountModal"
        width="30%"
        center>
        <el-form :model="accountForm" :rules="accountRules" ref="accountForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input v-model="accountForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="accountForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accountForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="">修 改</el-button>
    <el-button type="primary" @click="accountModal = false">关 闭</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'accountPage',
    data () {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.accountForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        title: '账号管理',
        accountModal: false,
        accountList: [],
        accountForm: {
          username: '',
          password: '',
          isAdmin: '',
          checkPass: ''
        },
        accountRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ],
          isAdmin: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.getAccount()
    },
    methods: {
      getAccount: function () {
        this.$http.get('/api/account/getaccount').then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.accountList = data.data
          }
        })
      },
      handleEdit (index, row) {
        this.accountForm.isAdmin = row.isAdmin
        this.accountForm.username = row.username
        this.accountModal = true
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>
<style>
  .cell{
    text-align: center;
  }
</style>
