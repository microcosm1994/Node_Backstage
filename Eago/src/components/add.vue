<template>
  <div class="add">
    <h1>{{title}}</h1>
    <div class="add-photo">
      <el-upload
        action="/api/picture/upload"
        :headers="headers"
        list-type="picture-card"
        :on-success="uploadsuccess"
        :on-error="uploaderr"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div class="add-name add-input">
      <span>素材名称</span>
      <input type="text" v-model="source.sourceName" placeholder="请输入素材名称">
    </div>
    <div class="add-des add-input">
      <span>素材描述</span>
      <input type="text" v-model="source.des" placeholder="请输入素材描述信息">
    </div>
    <div class="add-country add-input">
      <span>素材国家</span>
      <input type="text" v-model="source.country" placeholder="请输入素材所属国家">
    </div>
    <button class="save-btn" @click="save()">保存</button>
  </div>
</template>
<script>
  export default {
    name: 'add',
    data () {
      return {
        title: '添加素材',
        list: [],
        source: {
          sourceName: '',
          des: '',
          country: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    },
    methods: {
      save: function () {
        if (this.source.sourceName === '' || this.source.des === '' || this.source.country === '') {
          this.$alert('请把所有要求必填的内容填写完成再点击保存', '有必填内容没有输入', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: '请继续填写素材'
              })
            }
          })
          return false
        }
        let result = {}
        result.sourceName = this.source.sourceName
        result.des = this.source.des
        result.country = this.source.country
        result.list = this.list
        result.titlepage = this.list[0]
        this.$http.post('/api/resources/save', result).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$confirm('保存成功，接下来你要去哪里？', '提示', {
              confirmButtonText: '去素材库',
              cancelButtonText: '继续添加素材',
              type: 'success'
            }).then(() => {
              this.$http.get('/api/resources/all').then((response) => {
                let data = response.data
                if (data.status === 0) {
                  this.$store.commit('search_result', data.data)
                  this.$store.commit('setTitle', '素材库')
                  this.$router.push({path: './library'})
                }
              })
            }).catch(() => {
              this.$router.go(0)
            })
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      uploadsuccess (response, file, filelist) {
        if (response.status === 200) {
          let data = {
            name: response.data.name,
            url: response.data.url,
            creatTime: response.data.creatTime,
            id: file.uid
          }
          this.list.push(data)
        }
      },
      uploaderr (err, file, filelist) {
        if (err) {
          this.$message({
            message: '服务器错误,' + file.name + '上传失败',
            type: 'error'
          })
        }
      },
      handleRemove (file, fileList) {
        let list = this.list
        let removeId = file.uid
        for (let i = 0; i < list.length; i++) {
          if (removeId === list[i].id) {
            list.splice(i, 1)
          }
        }
        this.list = list
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>
<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .add{
    width: 100%;
    height: 100%;
    min-width: 1200px;
  }
  .add-photo{
    width: 750px;
    margin: 0 auto;
  }
  .add-input{
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .add-input span{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 500;
  }
  .add-input input{
    width: 450px;
    height: 50px;
    margin-left: 20px;
    padding-left: 10px;
    font-size: 20px;
  }
  .save-btn{
    width: 320px;
    border:none;
    outline: none;
    background: #0f88eb;
    color:#fff;
    height: 50px;
    border-radius:5px;
    font-size: 24px;
    margin: 50px auto;
    cursor: pointer;
  }
  button:hover{
    background: #00a0df;
  }
  button:active{
    background: #0f88eb;
  }
</style>
