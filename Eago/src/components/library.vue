<template>
  <div calss="library">
    <h1>{{title}}</h1>
    <div class="library-container">
        <div class="source" v-for="item in source" :data-id="item._id">
          <el-button type="text" @click="outerVisible = true">
          <div class="source-photo" @click="getdetailed(item._id,$event)">
            <img v-bind:src="item.titlepage.url" alt="">
          </div>
          <h3>{{item.sourceName}}</h3>
          <p>{{item.des}}</p>
          <p>{{item.country}}</p>
          </el-button>
        </div>
    </div>
    <div class="source-modal">
      <el-dialog
        :title="sourceModal.sourceName"
        :before-close="close"
        :close-on-click-modal="true"
        :visible.sync="outerVisible">
        <el-dialog
          width="50%"
          :title="picdetailed.name"
          :visible.sync="innerVisible"
          append-to-body>
          <span>{{picdetailed.creatTime}}</span>
          <img :src="picdetailed.url" alt="">
        </el-dialog>
        <div class="source-modal-picture" v-for="item in sourceModal.list">
          <el-button type="primary" @click="innerVisible = true, getpic(item.url, item.name, item.creatTime, item.id)">
            <img :src="item.url" alt="">
          </el-button>
        </div>
        <div class="source-modal-detailed">
          <el-input
            placeholder="请输入内容"
            v-model="sourceModal.des"
            v-on:change="change()"
            :disabled="isUpdate">
            ></el-input>
          <el-input
            placeholder="请输入内容"
            v-model="sourceModal.country"
            v-on:change="change()"
            :disabled="isUpdate">
            ></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <button class="update-btn" @click="update">{{updatebtn}}</button>
          <button class="update-btn" @click="del(sourceModal._id)">删 除</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'library',
    data () {
      return {
        title: '素材库',
        source: '',
        sourceModal: '',
        picdetailed: {},
        isUpdate: true,
        updatebtn: '修改',
        updateChange: false,
        outerVisible: false,
        innerVisible: false
      }
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll: function () {
        this.$http.get('/api/resources/all').then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.source = data.data
          }
        })
      },
      getdetailed: function (id, e) {
        this.$http.get('/api/picture/detailed?_id=' + id).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.sourceModal = data.data[0]
          }
        })
      },
      getpic: function (url, name, creatTime, id) {
        let list = {}
        list.url = url
        list.name = name
        list.creatTime = creatTime
        list.id = id
        this.picdetailed = list
      },
      update: function () {
        this.isUpdate = !this.isUpdate
        if (this.isUpdate) {
          this.updatebtn = '修 改'
          if (this.updateChange) {
            let data = {}
            data._id = this.sourceModal._id
            data.query = this.sourceModal
            delete data.query._id
            this.$http.put('/api/picture/update', data).then((response) => {
              if (response.status === 200) {
                if (response.data.status === 0) {
                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  })
                  this.updateChange = false
                } else {
                  this.$message.error(response.data.message)
                }
              }
            })
          }
        } else {
          this.updatebtn = '保 存'
        }
      },
      change: function () {
        this.updateChange = true
        console.log(this.sourceModal)
      },
      close: function (done) {
        if (this.updateChange) {
          this.$confirm('修改内容还未保存, 是否关闭?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            done()
            this.isUpdate = true
            this.updatebtn = '修改'
            this.updateChange = false
            this.$message({
              type: 'success',
              message: '已取消修改!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '修改完成之后请点击保存'
            })
          })
        } else {
          this.isUpdate = true
          this.updatebtn = '修改'
          this.updateChange = false
          done()
        }
      },
      del: function (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/picture/del?_id=' + id).then((response) => {
            if (response.data.status === 0) {
              this.outerVisible = false
              for (let i = 0; i < this.source.length; i++) {
                if (id === this.source[i]._id) {
                  this.source.splice(i, 1)
                }
              }
              this.$message({
                message: '已删除!'
              })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style>
  .library{
    padding-top: 200px;
  }
  .library-container{
    width: 100%;
    min-width: 1000px;
    padding: 20px;
  }
  .source{
    width: 200px;
    border-radius:5px;
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
  }
  .source-photo{
    width: 200px;
    height: 200px;
    border-radius:50%;
    overflow: hidden;
    cursor: pointer;
  }
  .source-photo img{
    width: 100%;
    height: 100%;
  }
  .source-modal-picture{
    width: 200px;
    display: inline-block;
    vertical-align: middle;
  }
  .source-modal-detailed{
    width: 50%;
    margin: 0 auto;
  }
  .source-modal-detailed .el-input{
    margin-top: 20px;
  }
  .el-input.is-disabled .el-input__inner{
    color:#000;
  }
  .update-btn{
    width: 74px;
    height: 40px;
    margin: 0;
    border-radius: 3px;
    background: #fff;
    color:#606266;
    font-size:14px;
    font-weight: 500;
    border:1px solid #dcdfe6;
    line-height:1;
  }
  .update-btn:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .update-btn:active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  button, .el-button, .el-dialog__headerbtn,.el-message-box__headerbtn{
    width: auto;
    height: auto;
    margin: 0;
  }
  .el-dialog__headerbtn, .el-dialog__headerbtn:hover{
    margin: 0;
    background: none;
  }
  .source-modal-picture button,.source-modal-picture button:hover,.source-modal-picture button:active,.source-modal-picture button:focus{
    background: none;
    border: none;
  }
  .source-modal-picture img{
    width: 100%;
  }
  /*.el-dialog{*/
    /*width: 70%;*/
  /*}*/
  .el-dialog__body img{
    width: 100%;
  }
</style>
