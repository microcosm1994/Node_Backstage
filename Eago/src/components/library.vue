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
        <p>{{sourceModal.des}}</p>
        <p>{{sourceModal.country}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">关 闭</el-button>
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
            console.log(this.sourceModal)
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
