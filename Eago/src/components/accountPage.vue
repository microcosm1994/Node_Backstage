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
  </div>
</template>
<script>
  export default {
    name: 'accountPage',
    data () {
      return {
        title: '账号管理',
        accountList: []
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
