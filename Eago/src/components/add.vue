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
      <input type="text" v-model="sourceName" placeholder="请输入素材名称">
    </div>
    <div class="add-des add-input">
      <span>素材描述</span>
      <input type="text" v-model="des" placeholder="请输入素材描述信息">
    </div>
    <div class="add-country add-input">
      <span>素材国家</span>
      <input type="text" v-model="country" placeholder="请输入素材所属国家">
    </div>
    <button @click="save()">保存</button>
  </div>
</template>
<script>
  export default {
    name: 'add',
    data () {
      return {
        title: '添加素材',
        sourceName: '',
        des: '',
        country: '',
        dialogImageUrl: '',
        dialogVisible: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    },
    methods: {
      save: function () {
        let source = {}
        source.sourceName = this.sourceName
        source.des = this.des
        source.country = this.country
        console.log(source)
        this.$http.post('/api/resources/save', source).then((response) => {
          let data = response.data
          console.log(data)
        })
      },
      uploadsuccess (response, file, filelist) {
        console.log(response)
        console.log(file)
        if(response.status === -1){
          alert('服务器错误')
        }
      },
      uploaderr (err, file, filelist) {
        console.log(err)
        console.log(file)
        console.log(filelist)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
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
  button{
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
